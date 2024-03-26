---
title: Vue3源码解读 - 响应式数据原理
date: 2021-05-22 06:09:33
tags:
  - Vue
---



## 前言

Vue3已经出来几个月了，API几天就上手了，想学习更深层次的东西还是的看看源码



## 从Vue创建实例开始

Vue3创建实例是用的 ` Vue.createApp` 方法，先去源码中找到 createApp，看看它做了如何处理

1. packages/vue/src/index.ts  Vue包入口文件  ->
2. packages/runtime-dom/src/index.ts  57行



## Vue.createApp做了啥？

### 创建app实例

通过 createRenderer 创建实例 调用createApp 方法生成 app 实例

### 定义 app.mount 方法

在mount方法中，又做了以下几件事情

1. 通过app.mount传入的selector，获取到DOM节点，用作Vue挂载的根节点

2. 获取模版，如果createApp有传入 render,template,就使用它们作为模版，否则就使用根节点的innerHTML作为模版

3. 调用mount 如果没有挂在过，开始挂载

   **在有在第一次渲染会走mount，以后更新都是走的patch对比 的逻辑**

4. 挂载成功后返回一个代理对象，里面包含了 data 和 setup方法return的值，如果两个方法的return的值有冲突，则会优先使用setup中的值

   <img src="http://oss.anyways.fun/blog/截屏2021-05-22 上午8.23.39.png" style="zoom:50%;" />

<img src="http://oss.anyways.fun/blog/截屏2021-05-22 上午8.24.06.png" style="zoom:50%;" />

可以看到定义两个一样的 `title`  属性已经被覆盖了，而 hd 只在data中定义 setup中没有定义就不存在覆盖的问题，所以对于模版属性 **setup的优先级是要高于data**



## Vue3数据更新操作

源码查找 packages/reactivity/src/reactive.ts  88行

1. 定义reactive方法（用户调用执行）
2. 使用`new Proxy`创建代理对象 createReactiveObject, get,set在
3. 在get中收集依赖



未完待续。。。

