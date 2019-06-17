---
title: webstorm配置小程序rpx格式化删除多余空格
date: 2019-06-17 15:00:56
tags:
- webstorm
- 微信小程序
---

<!--# webstorm配置小程序rpx格式化删除多余空格-->

### 设置中找到 file watchers  添加

![](http://cdn.chrischen.top//Markdown/PastedGraphic.jpg)

### 填写配置
    
![](http://cdn.chrischen.top//Markdown/PastedGraphic2.jpg)

>   program 填写 `sed`
>
>   arguments填写 `-i "" s/"\ rpx"/rpx/g $FilePath$`
>
>   Output paths to refresh 填写  `$FilePath$`

然后添加保存就完事了
