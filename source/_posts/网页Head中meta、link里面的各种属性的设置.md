---
title: 网页Head中meta、link里面的各种属性的设置
date: 2019-07-20 20:12:33
tags:
      - html
---

~~~html
<head>
    <!-- 声明文档使用的字符编码 -->
    <meta charset="utf-8">
    
    <!-- 声明文档的兼容模式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"><!-- 指示ie以目前可用的最高模式显示内容 -->
    
    <!-- 定义对页面的描述 -->
    <meta name="description" content="官网首页模板">
    
    <!-- 定义页面的最新版本 -->
    <meta name="revised" content="Frank,2017/7/15"><!-- SEO优化 -->
    
    <!-- 定义针对搜索引擎的关键词 -->
    <meta name="keywords" content="官网，模板，首页，...">
    
    <!-- 定义网页的作者 -->
    <meta name="author" content="某某某">
    
    <!-- 定义网页搜索引擎索引方式 ,常见的几种取值none,noindex,nofollow,all,index和follow-->
    <meta name="robots" content="index,follow">
    
    <!-- 为移动设备添加viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    <!-- IOS设备 -->
    <!-- 添加到主屏后的标题（ios6开始） -->
    <meta name="apple-mobile-web-app-title" content="标题">

    <!-- 设置状态栏的背景颜色（前提） -->
    <meta name="apple-mobile-web-app-title" content="yes">
    <!-- 设置状态栏背景色content参数释义：default 默认值，网页内容从状态栏底部开始 
    black 状态栏背景是黑色，网页内容从状态栏底部开始 
    black-translucent 状态栏背景是黑色半透明，网页内容充满整个屏幕，顶部会被状态栏遮挡 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <!-- 是否启用webapp全屏模式 -->
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- window8 -->
    <!-- window8磁贴颜色 -->
    <meta name="msapplication-TileColor" content="#000">
    
    <!-- window8磁贴图标 -->
    <meta name="msapplication-TileImage" content="icon.png">
    
    <!-- 禁止数字自动识别为电话号码 -->
    <meta name="format-detection" content="telephone=no">
    
    <!-- 不让Android识别邮箱 -->
    <meta name="format-detection" content="email=no">
    
    <!-- 每8秒刷新一次页面 -->
    <meta http-equiv="refresh" content="n">
    
    <title>我的官网模板</title>
    
    <!-- 引入网站小图标 -->
    <!--shortcut icon,特指浏览器中地址栏左侧显示的图标，一般大小为16x16，后缀名为.icon -->
    <!-- icon，指的是图标，格式可为PNG\GIF\JPEG，尺寸一般为16x16、24x24、36x36等。-->
    <link rel="shortcut icon" href="logo.png" type="image/x-icon">
    <link rel="icon" href="logo.png" type="image/x-icon">
    
</head>
~~~

