---
title: '🤔深刻理解localStorage sessionStorage'
date: 2019-08-16 00:16:38
tags: 
  - html
  - Javascript
---



>localStorage有效期为永久，sessionStorage有效期为顶层窗口关闭前
>
>同源文档可以读取并修改localStorage数据，sessionStorage只允许同一个窗口下的文档访问，如通过iframe引入的同源文档。

### 共同点

-   存储大小均为5M左右（不同浏览器之间存在差异）
-   都有同源策略限制
-   仅在客户端中保存，不参与和服务器的通信



### 不同点

-   生命周期
    -   `localStorage`理论上来说是永久有效的，即不主动清空的话就不会消失，即使保存的数据超出了浏览器所规定的大小，也不会把旧数据清空而只会报错。但需要注意的是，在移动设备上的浏览器或各`Native App`用到的`WebView`里，`localStorage`都是不可靠的，可能会因为各种原因（比如说退出App、网络切换、内存不足等原因）被清空。
    -   sessionStorage: 与存储数据的脚本所在的标签页的有效期是相同的。一旦窗口或者标签页被关闭，那么所有通过 sessionStorage 存储的数据也会被删除。
-   作用域
    -   `localStorage`只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。
    -   `sessionStorage`比`localStorage`更严苛一点，除了协议、主机名、端口外，还要求在同一**窗口**（也就是浏览器的标签页）下。

>    这些图可以更好的帮助理解

![](http://cdn.chrischen.top//Markdown/3793073884-56950753e65db.png)



### 数据结构

localstorage为标准的键值对（Key-Value,简称KV）数据类型，简单但也易扩展，只要以某种编码方式把想要存储进localstorage的对象给转化成字符串，就能轻松支持。举点例子：把对象转换成json字符串，就能让存储对象了；把图片转换成DataUrl（base64），就可以存储图片了。另外对于键值对数据类型来说，“键是唯一的”这个特性也是相当重要的，重复以同一个键来赋值的话，会覆盖上次的值。



### 浏览器兼容性

`注意!!!  在ios设备上无法重复setItem()，需要在setItem 前 removeItem()`

[查看浏览器兼容情况 ☞ MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)
