---
title: mac下镜像飞速安装Homebrew教程😲「 转载 」
date: 2020-03-14 13:11:38 
categories: 工具配置
tags:
    - Mac 
    - Brew
---

https://brew.idayer.com/guide/start

# 前言
Homebrew是一款包管理工具，目前支持macOS和linux系统。主要有四个部分组成: brew、homebrew-core 、homebrew-cask、homebrew-bottles。

Homebrew是一款包管理工具，目前支持macOS和linux系统。主要有四个部分组成: brew、homebrew-core 、homebrew-cask、homebrew-bottles。



| 名称             | 说明                                |
| ---------------- | ----------------------------------- |
| brew             | Homebrew源码仓库                    |
| homebrew-core    | Homebrew核心源                      |
| homebrew-cask    | 提供MacOS应用和大型二进制文件的安装 |
| homebrew-bottles | 预编译二进制软件包                  |



本文主要介绍`Homebrew`安装方式以及如何加速访问，顺便普及一些必要的知识。

## 安装步骤

**如果有更换镜像源的想法，强烈推荐使用[镜像助手](https://link.zhihu.com/?target=https%3A//brew.idayer.com/guide/change-source)获取执行脚本。**

```bash
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install.sh)"
```

