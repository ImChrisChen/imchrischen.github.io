---
title: Hexo-cli 的使用
date: 2019-08-16 01:24:54
tags: 
  - 工具类
---

### 准备工作

-   安装Git 

-   安装Node

-   安装Hexo-cli  

    -   `npm install -g hexo-cli`

    

### 初始化项目

```bash
hexo init <项目名称>
```

新建完成后会生成以下目录

|   目录名称   |      主要内容      |
| :----------: | :----------------: |
| node_modules |    项目依赖文件    |
|    public    |   存放生成的页面   |
|  scaffolds   | 生成文章的一些模板 |
|    source    |  用来存放你的文章  |
|    themes    |        主题        |
| _config.yml  |   博客的配置文件   |



### Hexo 常用命令

```bash
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本
hexo deploy -g  #生成加部署
hexo server -g  #生成加预览
hexo clean		# 清理多余文件
命令的简写
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy

hexo g -d 		#一键部署

```