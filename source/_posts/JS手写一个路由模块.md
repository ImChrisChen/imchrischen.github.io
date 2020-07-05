---
title: JS手写一个路由模块 🍊
date: 2020-07-05 20:37:01
tags:
  - Vue
  - Javascript
---

# JS手写一个路由模块

### Hash 模式

原理：通过 window.onhashchange监听到页面url地址的hash值变化，改变页面内容

实现要求：浏览器端自行可以实现，不用服务器端配置

> 本质上就是检测 url 的变化，截获 url 地址，然后解析来匹配路由规则。
>
> 这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发 hashchange 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。

废话不多说直接上代码完成最小化实现

[在线演示地址](http://example.chrischen.top/router-example/hash-mode/router.html#/page1)

####  html

~~~html
<body>
<a href="#/page1">page1</a>
<a href="#/page2">page2</a>
<a href="#/page3">page3</a>
<a href="#/page4">page4</a>
<div class="container"></div>
</body>
</html>
<script src="./router.js"></script>
<script>
    let container = document.querySelector('.container');
    let router = window.__router__;
    router.route('/page1', function () {
        container.innerHTML = 'page1';
    })
    router.route('/page2', function () {
        container.innerHTML = 'page2';
    })
    router.route('/page3', function () {
        container.innerHTML = 'page3';
    })
    router.route('/page4', function () {
        container.innerHTML = 'page4';
    })
</script>
~~~



#### router.js

~~~javascript
class Router {
    routes = {};
    
    constructor() {
        // 监听hash值变化
        window.addEventListener('hashchange', () => this._render());
        window.addEventListener('load', () => this._render());
    }
    
    // 每次改变路由会执行注册路由触发的回调函数
    _render() {
      	// location.hash  "#/page1"
        let hash = location.hash.slice(1) || '/';
        this.routes[hash] && this.routes[hash]();
    }
    
    // 注册路由
    route(path, callback) {
        this.routes[path] = callback
    }
}

window.__router__ = new Router();
~~~



### HTML5 History 模式

原理：xxx

14年后，因为HTML5标准发布。多了两个 API，pushState 和 replaceState，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有 onpopstate 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个#，变得更加美观。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。具体可以见：



// TODO 未完待续
