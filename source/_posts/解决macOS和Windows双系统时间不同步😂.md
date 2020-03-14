---
title: "解决macOS和Windows双系统时间不同步😂"
date: 2020-03-15 03:15:35
tags:
---

> 原文链接 👉 [黑苹果与Windows系统时间不同步的解决办法](https://osx.cx/mac-os-x-windows-systme-time.html#)

### 原因分析

安装macOS 和 Windows双系统后，发现有个问题,进入mac osx再进windows 时间就不对了这个是因为 **Windows 与 Mac缺省看待系统硬件时间的方式是不一样的**： Windows把系统硬件时间当作本地时间(local time)，即操作系统中显示的时间跟BIOS中显示的时间是一样的。

Mac把硬件时间当作 UTC，操作系统中显示的时间是硬件时间经过换算得来的，比如说北京时间是GMT+8，则系统中显示时间是硬件时间+8这样，当PC中同时有多系统共存时，就出现了问题。

假如你的mac设置的时区都为北京时间东八区，当前系统时间为9：00AM。则此时硬件中存储的实际是UTC 时间1:00AM。这时你重启进入Windows后，你会发现windows系统中显示的时间是 1:00AM，比mac中慢了八个小时。

同理，你在Windows中更改或用网络同步了系统时间后，再到mac中去看，系统就会快了8小时。

解决这个问题的方法很简单： 修改 Windows 对硬件时间的对待方式，这样只在 Windows 上修改后就无需在mac上设置了。 让 Windows 把硬件时间当作 UTC



### 解决问题

Windows下用管理员权限打开命令提示符，输入如下命令：

~~~bash
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
~~~



