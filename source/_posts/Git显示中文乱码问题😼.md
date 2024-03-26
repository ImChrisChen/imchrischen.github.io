---
title: 使用 git status 显示中文乱码问题😼
date: 2020-02-11 13:11:38 
tags:
    - Mac
    - git
categories: 
    - 工具配置  
---

## 现象

`git status`查看有改动但未提交的文件时总只显示数字串，显示不出中文文件名，非常不方便

`git log ` 却能正确显示

![](http://oss.anyways.fun/blog/HO1RNF.png)

## 寻找原因

了解后，**由于Git在默认设置下，中文文件名在工作区状态输出，中文名不能正确显示，而是显示为八进制的字符编码**。

## 解决问题

将 Git的配置项 core.quotepath 设置为false，  `quotepath ` 表示引用路径 加上--global代表全局配置

```shell
git config --global core.quotepath false
```

输入命令则自动写入到 ~/.gitconfig 文件中

![](http://oss.anyways.fun/blog/kG5ReN.png)

当然也可以直接修改 .gitconfig 进行配置等等，还可以设置alias等一些列配置

git全局配置文件 Mac 一般存放在 `~/.gitconfig` 中

## 效果

这样设置完成后，一般都能看见中文了，如果还是乱码，可以看看 shell 终端 bash ，zsh 等配置 是否设置支持中文显示

![](http://oss.anyways.fun/blog/7OIbXt.png)
