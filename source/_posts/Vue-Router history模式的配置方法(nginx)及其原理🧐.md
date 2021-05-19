---
title: Vue-Router history模式的配置方法(nginx)及其原理🧐
date: 2020-05-09 02:58
tags:
- Vue
- Nginx
---

## 背景介绍

自己在部署单页面应用(Single Page Applacation)的时候发现了一些问题

因为在很久以前 , 都是把项目打包好丢给后端or运维去部署,什么nginx配置，Jenkins配置，钩子，自动化脚本都不用管，直到有一天我在 KVM 机器 Linux上用 nginx 部署的时候，才发现一个问题...

为啥项目部署好后，一切都正常使用，但是一刷新就404了... 咋回事？？？为了弄懂其中原理. 于是就有了下面这篇文章 👇🏻

    本文用Vue的项目进行举例 , React Angular 等其他支持 SPA 的框架同理

---



## Vue路由模式

    要讲清楚这个问题，首先得从路由模式说起

`vue-router`分为`hash`和`history`模式

### hash模式 (vue-router默认模式)

url的表现形式为`http://blog.chrischen.top#home`

这种方式有些缺点：
- 比较难看 
- 使用location.search 获取不了query后面的参数

### history模式

url表现形式为 `http://blog.chrischen.top/home`

history 模式 解决了hash模式上面的一些问题，同时还有其他的一些优点
这里不细讲 history模式的区别，不然跑题了

但如果要使用`history`模式，我们需要在服务器上进行额外配置。本文将讨论如何配置以及为什么要这样配置。

## history模式的配置方法

首先要将`mode`设置为`history`：

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

然后设置后端（这里采用的nginx）：

```
location / {
  try_files $uri $uri/ /index.html;
}
```

然后就...... 没了！显然官方的教程讲的比较简略，并且我们参照这个教程实际上还是会遇到一些问题。

## `history`模式的配置实践及原理

### 只配置前端的情况

首先，我们将`mode`设置为`history`，但不配置后端。然后，假如我们的路由是长这个样子的：

```
const routes = [
    {path: '/home', component: Home},
    {path: '/', redirect: '/home'}
];
```

我们用nginx部署项目，然后在地址栏输入`http://localhost:8080`（这里配置的端口是8080），你会发现地址栏之后会变为`http://localhost:8080/home`，并且**看起来**一切正常，**似乎**路由也可以正常切换而不会发生其他问题（实际上会发生问题，后面会进行讨论）。看起来好像不需要按官网告诉我们的那样配置后端也能实现`history`模式，但如果你直接在地址栏输入`http://localhost:8080/home`，你会发现你获得了一个404页面。

那么`http://localhost:8080`为什么可以（部分）正常显示呢？道理其实很简单，你访问`http://localhost:8080`时，静态服务器（这里是nginx）会默认去目标目录（这里为`location`中`root`所指定的目录）下寻找`index.html`（这是nginx在端口后没有额外路径时的默认行为），目标目录下有这个文件吗？有！然后静态服务器返回给你这个文件，配合`vue-router`进行转发，自然可以（部分）正常显示。
但如果直接访问`http://localhost:8080/home`，静态服务器会去目标目录下寻找`home`文件，目标目录下有这个文件吗？没有！所以自然就404了。

### 配置 Nginx

为了达到直接访问`http://localhost:8080/home`也可以成功的目的，我们需要对后端（这里即nginx）进行一些配置。

首先想想，要怎样才能达到这个目的呢？

在传统的`hash`模式中（`http://localhost:8080#home`），即使不需要配置，静态服务器始终会去寻找`index.html`并返回给我们，然后`vue-router`会获取`#`后面的字符作为参数，对前端页面进行变换。

类比一下，在`history`模式中，我们所想要的情况就是：输入`http://localhost:8080/home`，但最终返回的也是`index.html`，然后`vue-router`会获取`home`作为参数，对前端页面进行变换。那么在nginx中，谁能做到这件事呢？答案就是`try_files`。

大意就是它会按照`try_files`后面的参数依次去匹配`root`中对应的文件或文件夹。如果匹配到的是一个文件，那么将返回这个文件；如果匹配到的是一个文件夹，那么将返回这个文件夹中`index`指令指定的文件。最后一个`uri`参数将作为前面没有匹配到的fallback。（注意`try_files`指令至少需要两个参数）

拿我自己的网站举个例子：

```
location / {
        root            /work/apps/blog.chrischen.top;
        index           index.html;
        try_files       $uri $uri/ /index.html;
}
```

> `$uri`是nginx中的变量，比如我访问的网址是`http://localhost:8080/home`，那么它就代表的`/home`。

在`blog.chrischen.top`这个目录中，没有子目录，只有一个`index.html`和一些压缩后的名称是hash值的.js文件。当我们请求`http://localhost:8080/home`这个地址时，首先查找有无`home`这个文件，没有；再查找有无`home`目录，也没有。所以最终会定位到第三个参数从而返回`index.html`，按照这个规则，所有路由里的url路径最后都会定位到`index.html`。`vue-router`再获取参数进行前端页面的变换，至此，我们已经可以通过`http://localhost:8080/home`这个地址进行成功地访问了。
而`$uri`这个参数的作用其实是匹配那些.js文件用的，而`$uri/`在这个例子中并没有多大用，实际上是可以去掉的。

## 最后总结

其原理就是用nginx把项目代理的SPA的根目录，并设置如果访问到其他不存在的页面,则会自己跳转到index.html页面，等于变相的把 blog.chrischen.top/home
后面的部分不做处理，然后就可以通过前端路由匹配规则进行匹配
