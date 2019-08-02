---
title: Mac个性化操作
date: 2019-06-12 14:46:36
tags:

- Mac
---
<!--# Mac 个性化实用命令-->

### 让Dock程序坞 即时自动显示和隐藏 (无延迟)

-   设置

```
defaults write com.apple.Dock autohide-delay -float 0 && killall Dock
```

-   恢复

```bash
defaults delete com.apple.Dock autohide-delay && killall Dock
```



### 设置使用任何来源都可以打开的应用

```shell
sudo spctl --master-disable
```



### 显示隐藏桌面图标

-   显示桌面图标

```shell
defaults write com.apple.finder CreateDesktop -bool true; killall Finder
```

-   隐藏桌面图标

```shell
defaults write com.apple.finder CreateDesktop -bool false; killall Finder
```



### **让 Finder 显示完整路径**

~~~javascript
defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
~~~



### Mac 启动台图标大小调整

1 、终端运行命令：10代表一行显示10个图标，几个可以自定义

```shell
defaults write com.apple.dock springboard-columns -int 10
```

2 、 设置完需要重新启动一下 启动台

```shell
killall Dock
```



### Mac结束进程

```shell
lsof -i:<端口号>  // 获取到对应的pid

kill <pid> 
```

