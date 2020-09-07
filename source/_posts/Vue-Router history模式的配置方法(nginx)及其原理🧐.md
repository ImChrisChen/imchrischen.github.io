---
title: Vue-Router history模式的配置方法(nginx)及其原理🧐
date: 2020-05-09 02:58
tags:
- Vue
- Nginx
---

`vue-router`分为`hash`和`history`模式，前者为其默认模式，url的表现形式为`http://blog.chrischen.top#home`，比较难看。后者的url表现形式为`http://blog.chrischen.top/home`，比较美观。

但如果要使用`history`模式，我们需要在后端进行额外配置。本文将讨论如何配置以及为什么要这样配置。


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

然后就......没了！显然官方的教程讲的比较简略，并且我们参照这个教程实际上还是会遇到一些问题。

## `history`模式的配置实践及原理

**强烈建议：阅读这部分之前，先看一下nginx的[这部分文档](https://link.juejin.im/?target=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fbeginners_guide.html%23static)和[这部分文档](https://link.juejin.im/?target=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fbeginners_guide.html%23proxy)。**

既然官方文档教我们这样做了，我们就按照它说的来实践一下。

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

### 配置后端

为了达到直接访问`http://localhost:8080/home`也可以成功的目的，我们需要对后端（这里即nginx）进行一些配置。

首先想想，要怎样才能达到这个目的呢？

在传统的`hash`模式中（`http://localhost:8080#home`），即使不需要配置，静态服务器始终会去寻找`index.html`并返回给我们，然后`vue-router`会获取`#`后面的字符作为参数，对前端页面进行变换。

类比一下，在`history`模式中，我们所想要的情况就是：输入`http://localhost:8080/home`，但最终返回的也是`index.html`，然后`vue-router`会获取`home`作为参数，对前端页面进行变换。那么在nginx中，谁能做到这件事呢？答案就是`try_files`。

首先看一下[try_files](https://link.juejin.im/?target=http%3A%2F%2Fnginx.org%2Fen%2Fdocs%2Fhttp%2Fngx_http_core_module.html%23try_files)的语法：**try_files** *file ... uri*;
然后看一下官方文档对它的介绍：

> Checks the existence of files in the specified order and uses the first found file for request processing; the processing is performed in the current context. The path to a file is constructed from the file parameter according to the root and alias directives. It is possible to check directory’s existence by specifying a slash at the end of a name, e.g. “$uri/”. If none of the files were found, an internal redirect to the uri specified in the last parameter is made.

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
