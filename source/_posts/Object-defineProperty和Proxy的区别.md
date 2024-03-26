---
title: Object.defineProperty VS Proxy 以及在Vue3中的变化 ⚖️
date: 2021-05-22 20:22:21
tags:
  - Javascript
  - Vue
---



## 前言

一提到 `Object.defineProperty ` 搞前端的应该都会想起数据响应式，Vue2 数据响应式主要原理是通过的`Object.defineProperty `去实现的，Vue3是则使用浏览器原生的 `Proxy` 方法，同样是实现数据相应是，这两组API有什么不一样的吗？通过这篇文章给大家分析下👇🏻



## Object.defineProperty VS Proxy

`Object.defineProperty` 方法会在一个对象上定义一个新属性，或者修改一个对象的现有属性并返回对象

它提供了一些 **约束对象操作的** 属性 以及  set，get 方法，因此Object.defineProperty 监听的是对象中的属性，而和`Proxy`不同的是 `new Proxy` 时传入一个对象，它内部直接监听了整个对象的操作行为，因此可以得出一下结论：

> `Object.defineProperty` 监听的是对象的属性
>
> `Proxy` 监听的是整个对象



由于`Object.defineProperty` 监听的是属性，当递归一个深层结构的对象的时候，数组里层的对象就不能遍历到了（因为`Object.defineProperty`方法不适用于数组) ，而Proxy能代理数组，所以从根源生解决了问题`Object.defineProperty` 代理的目标是对象上的属性，属性新增和删除也就监听不到了（handlers 中只有get，set方法）



以下方法在`Object.defineProperty` 中不能被监听到

>  `push`，`pop`，`shift`，`unshift`，`sort`，`reverse`，`splice`



Object.defineProperty的缺陷，由上得出结论

> `Object.defineProperty` 不能监听数组的增删改操作
>
> `Object.defineProperty` 无法监听属性的新增和删除



> `Object.defineProperty` 是对象的方法，因此只要有Javascript的地方它基本都能支持（IE9以下就不支持了）
>
> 而 Proxy 直接不支持 IE ...
>
> Proxy作为新标准将受到浏览器厂商重点持续的性能优化





## 在Vue3中的变化

1. Vue2数据驱动是使用的Object.defineProperty 去递归监听对象的，Vue3则是用的 Proxy 代理

2. Vue2是一次性递归完data对象，Vue3 是用Proxy 是在调用属性时并且值时`object`时才递归

   源码 `vue-next/packages/reactivity/src/baseHandlers.ts  `  127行

<img src="http://oss.anyways.fun/blog/4y3vnW.png" style="zoom:33%;" />



