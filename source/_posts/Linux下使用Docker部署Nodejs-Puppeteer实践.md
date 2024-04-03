---
title: Linux下使用Docker部署Nodejs + Puppeteer实践
date: 2024-04-03 20:57:27
tags:
  - Docker
  - Nodejs
  - Puppeteer
  - Linux
---

## 前言

最近在做一个项目，需要使用Puppeteer来爬取一些数据，由于Puppeteer需要Chromium，而在Linux服务器环境下使用Chromium会安装会比较麻烦，所以我选择使用Docker来安装Puppeteer这样可以确保环境的一致性，避免出现依赖问题。

由于我的项目是用Nestjs写的，所以这里我使用Nestjs作为例子，你也可以使用其他Nodejs框架。

## 环境

- Docker
- Linux(我这里用的是Ubuntu 20.04)

## Dockerfile

```dockerfile
# 使用node 18作为基础镜像
FROM node:18

# 跳过Chromiun下载
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# 安装 Google Chrome Stable 版本 (Chrome 路径 /usr/bin/google-chrome)
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Copy the .env and .env.development files
COPY .env ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]

```

## Puppeteer launch 配置

在Linux下部署的，所以需要对Puppeteer的launch配置进行一些修改，具体如下：

- 禁用GPU `--disable-gpu`
- 使用Linux的Chrome路径 `/usr/bin/google-chrome`

```typescript
const isLinux = os.platform() === 'linux';
pupeeteer.launch({
  headless: isLinux,
  timeout: 1000 * 60,
  args: [
    isLinux ? '--disable-gpu' : undefined,    // Linux下需要禁用GPU, 否则会报错
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-sandbox',
    '--no-first-run',
  ].filter(Boolean),
  executablePath: isLinux ? '/usr/bin/google-chrome' : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})
```

## Docker Build 打包镜像

```bash
$ cd /path/to/your/project

$ docker build -t nestjs-puppeteer .
```

## Docker Run 运行镜像

```bash
docker run -d -p 3000:3000 -it --rm --name creepeer-app nestjs-puppeteer
```
