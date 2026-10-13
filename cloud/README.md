# CLHH MV 网页应用

原有创作页面在浏览器运行，素材、任务、FFmpeg、视频合并与结果保存在服务器。顶部「我的视频」支持预览、拖动进度和下载；保存目录由服务管理。

## 账号与收费

Better Auth 支持邮箱或中国大陆手机号验证码注册登录，分别通过 Resend 和腾讯云短信发送，验证码 5 分钟有效。未验证邮箱或手机号不能读取素材或创建任务。各账号按内部用户 ID 隔离文件；手机号和邮箱分别注册的账号独立，不自动合并余额。

价格为 **180 秒 ¥30**，服务器读取音频时长后报价。账本使用整数单位（1 单位 = 1/600 元），每秒 100 单位，精确到 10 毫秒向上取整；界面显示到分。例如 44 秒约 ¥7.33，180 秒正好 ¥30。生成前展示预计费用并预留余额，任务成功后结算，失败或取消退回；合并、预览和下载不额外收费。

微信 Native 扫码充值通过已有 payment-service 接入，支持 ¥0.01 测试充值，以及 ¥10、¥30、¥50、¥100、¥300。服务端使用 HMAC 签名创建订单，验证回调签名、应用、订单、币种与金额，以数据库事务实现一次入账；查询支付结果也能补齐到账状态。

## 本地开发

使用 Node.js 22 和 pnpm 11.5.1：

```sh
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
```

在 `.env.local` 设置 `CLHH_API_KEY` 和 `CLHH_APP_PASSWORD`。将 `cloud/web.env.example` 复制为 `cloud/.runtime/web.env` 并填写邮箱、腾讯云短信、认证和支付配置（该目录已忽略）。

```sh
pnpm web:build
pnpm web:start
```

打开 `http://localhost:8080`，通过邮箱或手机验证码注册。没有预置公开密码或测试登录后门。

## 数据库

Drizzle + SQLite 保存用户、会话、验证码、钱包、充值订单、报价和账本。服务启动时应用版本化迁移，启用 WAL、外键及写事务保护。数据库默认位于 `${CLHH_DATA}/accounts.sqlite`，媒体按用户 ID 保存在同目录下。

```sh
pnpm db:generate
pnpm web:test
TEST_BROWSER=1 node cloud/tests/integration.mjs
```

集成测试使用独立数据库、本地邮件、短信与支付模拟服务，覆盖真实后台引擎、队列、约 44 秒的合并结果、退款、重复回调、浏览器邮箱及手机号登录、预览下载和扫码充值界面。不会调用付费生成或发送真实邮件或短信。源码中的测试网络注入仅由测试启动命令加载。

## 部署

域名：`https://mv.staging.clhh.tech`。容器使用共享网络访问 `pay-service-api:8080`，只发布服务器回环端口 `4310`。Nginx 配置在 `cloud/nginx.conf`，使用现有 `/opt/certs/staging.clhh.tech/` 通配符证书及 acme.sh 续期部署路径。

```sh
node cloud/prepare-deploy.mjs
docker build --platform linux/amd64 -f cloud/Dockerfile -t clhh-mv:staging .
docker save clhh-mv:staging | gzip > cloud/.runtime/clhh-mv-amd64.tar.gz
```

将镜像上传服务器并 `docker load`；把 `cloud/deploy.compose.yml` 放到部署目录作为 `compose.yml`，私有配置放到 `data/service.env`，保证 UID 1000 可读写。然后：

```sh
docker compose up -d
curl -fsS http://127.0.0.1:4310/health
# 安装 nginx.conf 后：
sudo nginx -t && sudo systemctl reload nginx
```

镜像不包含真实密钥，启动时读取挂载配置生成私有引擎资源。浏览器构建不含服务密钥。`TRUST_PROXY=true` 只应在经可信 Nginx、回环端口或私有网络访问时开启，Nginx 覆盖客户端 IP 头。

当前服务器配置容器上限 2 GB、2 CPU、全局两个生成任务、最多两个后台引擎。闲置后台引擎自动退出。素材上传上限 256 MB；数据库与媒体均需定期备份。

服务重启会将原执行中任务标记为中断并释放未结算预留，不自动再次提交可能计费的生成。重新运行前检查云端结果。单实例 SQLite 部署不支持直接扩成多副本。

备份整个 `data/`（数据库活动时请使用 SQLite backup API 或停服备份，勿仅拷贝主文件而忽略 WAL）。更新前保留上一镜像标签；回滚前核对数据库迁移兼容性。不要提交 `.runtime/`、`.data/`、`.env.local` 或 `service.env`。

参考：[Better Auth 邮箱验证码](https://better-auth.com/docs/plugins/email-otp)、[Better Auth Drizzle](https://better-auth.com/docs/adapters/drizzle)、[Drizzle SQLite](https://orm.drizzle.team/docs/sqlite/get-started-sqlite)。
