---
title: "Mac下iterm2中sz、rz的安装与使用\U0001F423"
date: 2020-03-16 20:43:54
tags: 
    - Mac
    - Linux
---

2020-03-13 

### 1. 安装lrzsz（需要装 brewhome 🤏🏻）

```bash
brew install lrzsz
```

### 2. 系统配置

**创建文件**

```bash
cd /usr/local/bin

vi iterm2-recv-zmodem.sh

vi iterm2-send-zmodem.sh
```

**创建好两个文件后分别添加内容：**

iterm2-recv-zmodem.sh

```bash
#!/bin/bash
# Author: Matt Mastracci (matthew@mastracci.com)
# AppleScript from http://stackoverflow.com/questions/4309087/cancel-button-on-osascript-in-a-bash-script
# licensed under cc-wiki with attribution required 
# Remainder of script public domain
 
osascript -e 'tell application "iTerm2" to version' > /dev/null 2>&1 && NAME=iTerm2 || NAME=iTerm
if [[ $NAME = "iTerm" ]]; then
    FILE=`osascript -e 'tell application "iTerm" to activate' -e 'tell application "iTerm" to set thefile to choose folder with prompt "Choose a folder to place received files in"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"`
else
    FILE=`osascript -e 'tell application "iTerm2" to activate' -e 'tell application "iTerm2" to set thefile to choose folder with prompt "Choose a folder to place received files in"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"`
fi
 
if [[ $FILE = "" ]]; then
    echo Cancelled.
    # Send ZModem cancel
    echo -e \\x18\\x18\\x18\\x18\\x18
    sleep 1
    echo
    echo \# Cancelled transfer
else
    cd "$FILE"
    /usr/local/bin/rz -E -e -b
    sleep 1
    echo
    echo
    echo \# Sent \-\> $FILE
fi
```

iterm2-send-zmodem.sh

```bash
#!/bin/bash
# Author: Matt Mastracci (matthew@mastracci.com)
# AppleScript from http://stackoverflow.com/questions/4309087/cancel-button-on-osascript-in-a-bash-script
# licensed under cc-wiki with attribution required 
# Remainder of script public domain
 
osascript -e 'tell application "iTerm2" to version' > /dev/null 2>&1 && NAME=iTerm2 || NAME=iTerm
if [[ $NAME = "iTerm" ]]; then
    FILE=`osascript -e 'tell application "iTerm" to activate' -e 'tell application "iTerm" to set thefile to choose file with prompt "Choose a file to send"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"`
else
    FILE=`osascript -e 'tell application "iTerm2" to activate' -e 'tell application "iTerm2" to set thefile to choose file with prompt "Choose a file to send"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"`
fi
if [[ $FILE = "" ]]; then
    echo Cancelled.
    # Send ZModem cancel
    echo -e \\x18\\x18\\x18\\x18\\x18
    sleep 1
    echo
    echo \# Cancelled transfer
else
    /usr/local/bin/sz "$FILE" -e -b
    sleep 1
    echo
    echo \# Received $FILE
fi
```

将文件写好后保存好，使用如下命令添加权限

```
chmod 777 iterm2-*  	# 把以上两个文件都添加权限（这里的*代表正则匹配的规则）
```

### iterm2 设置快捷命令

> 点击 iTerm2 的设置界面 Perference-> Profiles -> Default -> Advanced -> Triggers 的 Edit 按钮，加入以下配置

| Regular expression            | Action               | Parameters                           |
| ----------------------------- | -------------------- | ------------------------------------ |
| rz waiting to receive.**B0100 | Run Silent Coprocess | /usr/local/bin/iterm2-send-zmodem.sh |
| **B00000000000000             | Run Silent Coprocess | /usr/local/bin/iterm2-recv-zmodem.sh |

配置好后如图

![img](http://cdn.chrischen.top//Markdown/mac-rz-sz-iterm2.png)

### 使用方法

rz 上传功能 ：在bash中，也就是iTerm2终端输入rz 就会弹出文件选择框，`选择文件 choose 就开始上传，会上传到当前目录`

```bash
rz
```

sz 下载功能 ：sz fileName(你要下载的文件的名字) 回车，`会弹出窗体 我们选择要保存的地方即可`。

```bash
sz <filename>
```
