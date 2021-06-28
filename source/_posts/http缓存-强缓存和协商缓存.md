---
title: http缓存 - 强缓存和协商缓存

date: 2021-06-25 20:07:50

tags:
  - http
  - 性能优化

categories:
  - 计算机网络

---

## 前言

`前断时间在折腾找工作，和租房子搬家，现在总算在新公司稳定下来了，现在才有了时间整理一些知识点，呼...👨‍💻 开始吧`

当浏览器加载一个页面时 html 引用的外部资源也会加载，但是这些资源图片，css，js 都不经常变化，如果每次都加载这些资源势必会带来资源浪费，而且加载时间也会变长，影响用户的体验。

http 缓存技术就是为了解决这个问题（或者说所有的缓存都是为了性能的优化，增加用户体验），简单点说就是将加载过的静态文件缓存在客户端本地，下次请求相同的资源时可以直接加载本地的使用。

不过http也有相应的规则和策略，去控制文件何时使用缓存何时不实用缓存，且要保证一旦资源更新缓存也要随之更新

## http缓存的作用

- 降低消耗不必要的带宽
- 提升用户访问的速度
- 减轻服务器压力

http 缓存分两种，一种是强缓存又称(私有缓存)，一种是协商缓存又称(共享缓存)

## 强缓存策略(私有缓存)

优先级：Cache-Control > Expires >

直接读取本地缓存的内容，不去请求服务器，返回的状态码是 200。

这里面有一个问题如果不去服务器请求 那如果静态资源更新了浏览器还在使用旧的资源怎么办呢？ 答案是在 `http 响应头（response headers）` 中的设置缓存过期时间。

缓存过期时间又分两种，一种是固定时间，一种是相对时间

- Expires 是固定时间
- Cache-Control max-age 是设置相对时间

```nginx
Expires: Wed, 21 Oct 2015 07:28:00 GMT

Cache-Control: max-age=60
```

### Expires (http1.0)

`Expires` 是 `http1.0`中定义的缓存字段，当我们请求一个资源，服务器返回时，可以在 response headers 中增加 Expires 字段表示过期时间

> 注意：Expires 是一个固定的时间值，比如在人类文明历史上的某一刻过期，则会出现进行过期时间对比时，如果客户端时间错乱了，则这个缓存的逻辑也变得错误，比较依赖客户端的时间准确性。

```nginx
Expires: Wed, 21 Oct 2015 07:28:00 GMT
```

### Cache-Control (http1.1)

Cache-Control：当值设为max-age=300时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。

Cache-Control 其他的常用选项

- max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；
- s-maxage：和max-age是一样的，不过它只针对代理服务器缓存而言；
- public：指示响应可被任何缓存区缓存；
- private：只能针对个人用户，而不能被代理服务器缓存；
- no-cache：强制客户端直接向服务器发送请求,也就是说每次请求都必须向服务器发送。服务器接收到 请求，然后判断资源是否变更，是则返回新内容，否则返回304，未变更。这个很容易让人产生误解，使人误     
  以为是响应不被缓存。实际上Cache-Control:     no-cache是会被缓存的，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。
- no-store：禁止一切缓存（这个才是响应不被缓存的意思）。

> Cache-Control 是 http是1.1新增的头字段, expires是http1.0的头字段，如何两个同时存在，cache-control 会覆盖 expires

## 协商缓存

协商缓存分别有两组字段进行控制,并且相互对应,他们分别是 Last-Modified / If-Modified-Since , Etag / If-None-Match

---

### Last-Modified / If-Modify-Slice (http1.0)

```nginx
last-modified: Wed, 09 Jun 2021 17:36:57 GMT

if-modified-since: Wed, 23 Jun 2021 01:58:39 GMT
```

响应头 response headers 设置了 Etag 的资源, 再次请求的请求头 request headers 则会带上 If-None-Match 这个字段

---

- Last-Modified

  浏览器向服务器发送资源最后的修改时间


- If-Modify-Slice

  当资源过期时（浏览器判断Cache-Control标识的max-age过期），发现响应头具有Last-Modified声明，则再次向服务器请求时带上头if-modified-since，表示请求时间。服务器收到请求后发现有if-modified-since则与被请求资源的最后修改时间进行对比（Last-Modified）,若最后修改时间较新（大），说明资源又被改过，则返回最新资源，HTTP
  200 OK;若最后修改时间较旧（小），说明资源无新修改，响应HTTP 304 走缓存。

### Etag / If-None-Match (http 1.1)

```nginx
etag: W/"141768e3674c4e846c3962bef5f3e919"

if-none-match: W/"141768e3674c4e846c3962bef5f3e919"
```

响应头 response headers 设置了 Last-Modified 的资源, 再次请求的请求头 request headers 则会带上 If-Modified-Since 这个字段 (可以随便打开一个网站进行验证)

---

- Etag

  Etag是属于HTTP 1.1属性，它是由服务器生成返回给前端，用来帮助服务器控制Web端的缓存验证。 ETag的值，是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。

- If-None-Match

  当资源过期时，浏览器发现响应头里有Etag,则再次像服务器请求时带上请求头if-none-match(值是Etag的值)。服务器收到请求进行比对，决定返回200或304

## 结尾总结

Cache-Control > Expires > Etag > Last-Modified

- Cache-Control 和 Expires 控制强缓存 (由浏览器进行验证,命中后http状态码为200,不请求,1)

- Etag 和 Last-Modified 控制协商缓存 (由服务器进行验证,命中后http状态码为 304, 会发起请求)

