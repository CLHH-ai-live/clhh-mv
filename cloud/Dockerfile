FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ xvfb xauth ffmpeg fonts-noto-cjk libgtk-3-0 libnss3 libasound2 libgbm1 libxss1 libxtst6 libatspi2.0-0 libdrm2 libxkbcommon0 ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /opt/app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@11.5.1 --activate && pnpm install --frozen-lockfile
COPY electron ./electron
COPY renderer ./renderer
COPY config ./config
COPY scripts ./scripts
COPY cloud ./cloud
RUN mkdir -p /data /opt/app/resources/ffmpeg && cp node_modules/ffmpeg-static/ffmpeg /opt/app/resources/ffmpeg/ffmpeg && chown node:node /data /opt/app /opt/app/cloud
ENV HOST=0.0.0.0 CLHH_DATA=/data/users CLHH_RUNTIME=/data/config CLHH_ENV_FILE=/data/service.env NODE_ENV=production
USER node
EXPOSE 8080
CMD ["sh", "-c", "node cloud/entry.mjs && exec xvfb-run -a node cloud/server.mjs"]
