# CLHH MV 创作

MV 创作应用，支持图片与音频导入、音频分段、云端视频生成、分段合并和母带音轨融合。

## 网页运行

邮箱 / 手机号注册登录、微信扫码充值、按秒计费、云端文件与媒体处理，复用原有工作台页面。启动和部署步骤见 [网页部署说明](cloud/README.md)。

## 本地运行

使用 macOS arm64、Node.js 22 和 pnpm。

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
```

在 `.env.local` 中设置 `CLHH_API_KEY` 和 `CLHH_APP_PASSWORD`，然后启动：

```sh
pnpm start
```

服务配置通过本地环境变量注入。设置页提供连接测试、结果目录和并发设置。

## 打包

```sh
pnpm pack:mac
```

产物：

- `release/CLHH-MV-1.1.4-macOS-arm64.dmg`
- `release/mac-arm64/CLHH MV 创作.app`

构建脚本会组装前端组件、注入服务配置、准备 arm64 FFmpeg、生成应用图标并打包。当前采用本地临时签名，未配置 Apple Developer ID 公证。

## 目录

| 路径                        | 内容                                       |
| --------------------------- | ------------------------------------------ |
| `electron/`                 | 桌面主进程、窗口、文件操作、媒体处理和 IPC |
| `renderer/assets/index.js`  | 应用界面、工作台状态和生成流程入口         |
| `renderer/components/`      | 图片导入、设置面板、生成状态显示           |
| `renderer/assets/index.css` | 晶体主题与状态样式                         |
| `renderer/assets/`          | 动态背景与页面资源                         |
| `config/`                   | 非敏感服务配置及生成、合并逻辑校验基线     |
| `scripts/`                  | 前端组装、媒体准备、构建验证和回归检查     |

`dist/`、`release/`、FFmpeg 二进制及本地配置由构建生成，不纳入版本管理。界面组件修改后执行 `pnpm build:renderer`。

## 检查

```sh
pnpm build:renderer
pnpm verify
pnpm pack:mac
pnpm check:status
pnpm check:merge
```

状态检查使用独立配置目录与模拟连接响应。合并检查使用本地测试素材，不发起云端生成；需在 PATH 中提供 `ffprobe`，测试产物写入 `release/merge-check-*`。详见 [媒体处理说明](docs/media-processing.md)。
