---
title: Cookie 和 Session
date: 2021-05-29 15:49:50
tags:
  - 浏览器
  - 服务器
categories: 
  - web安全  
  - Cookie
  - Session
---



## Cookie

Cookie是在服务端返回数据的时候通过Set-Cookie这个header 设置到浏览器里面的一个内容，浏览器保存之后，在下一次同域的请求中，就会带上Cookie，这样就可以在一个用户的会话过程中，可以返回对应的用户的数据

### Cookie有几个特点

- 客户端存储： Cookie 数据存储在客户端浏览器中，有大小限制（一般最大为4KB）。
- 自动发送： 客户端向同一个服务器再次发起请求时，会自动携带该网站的所有Cookie。
- 跨会话持久性： Cookie可以设置过期时间，即使关闭浏览器也可以保持状态信息。
- 易于篡改： 存储在客户端，容易被用户或第三方篡改，安全性较低。
- 性能考虑： 每次HTTP请求都会携带Cookie，如果Cookie过多或过大，会增加请求的负担。


### 使用场景

跟踪用户行为，如广告定制。
保存用户偏好设置，如主题、语言等。
实现无状态的HTTP请求的某种程度上的“状态化”。

**Cookie的属性**

- 通过max-age 和 expires 设置过期时间

- Secure 只在 https 请求时发送

- 设置 HttpOnly 后 无法通过 document.cookie 访问


无法通过Javascript 去访问到，这样做是为了安全性，预防 `CSRF` 攻击 ( 跨站请求伪造 ) ，通过使用脚本注入，或者外部链接跳转等方式, 获取用户的登录信息`token` 从而达到入侵的目的，HttpOnly 禁止Javascript访问 cookie 可以很好的预防这类攻击


Nginx 设置 Cookie

下面设置代表了看，设置了多个Cookie

```nginx
server {
    add_header Set-Cookie "id=1;max-age=3";
    add_header Set-Cookie "name=chris";
    add_header Set-Cookie "age=18;HttpOnly";
}
```

1. 第一条 `id=123`的这条Cookie 过期时间为 3秒后
2. 第二条cookie 则没有设置过期时间，默认为浏览器关闭，会话结束（会话Cookie）
3. 第三条cookie 设置了HttpOnly 字段，在浏览器的Application 中是可以看到的，但是用document.cookie 访问不了


![](http://cdn.chrischen.top/blog/uOZo5U.png)

tips: `可以通过给主域名设置Cookie` 然后子域名访问，达到一个**跨域访问Cookie**的效果


## Session
Session（会话）和Cookie都是用来保存客户端与服务器之间交互状态信息的技术，它们在Web开发中广泛应用于用户身份验证、状态保持等方面。

### Session 的特点

- 服务器端存储： Session 数据存储在服务器端，客户端无法直接访问，这提供了更好的安全性。
- 唯一标识： 每个用户的Session都有一个唯一的Session ID，通常在Cookie中存储或通过URL重写传递。
- 有状态： Session可以跟踪用户的状态，如登录状态、购物车内容等。
- 资源消耗： 比起Cookie，Session会在服务器上占用内存资源，当大量用户并发时可能会影响服务器性能。
- 失效控制： 服务器可以控制Session的失效时间，可以在用户关闭浏览器后或经过特定时间自动失效。

### 使用场景
- 用户身份验证和授权。
- 保存用户的购物车信息。
- 跟踪用户的操作路径和行为。


## Session与Cookie的区别
- 存储位置： Session存储在服务器，Cookie存储在客户端。
- 安全性： Session相对Cookie更安全。
- 存储大小： Session大小由服务器内存决定，Cookie大小有限制, 通常为4KB。
- 生命周期： Session可以由服务器管理生命周期，Cookie则由客户端管理。
