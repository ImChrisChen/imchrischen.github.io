---
title: cookie和session

date: 2021-05-29 15:49:50

tags:
  - 浏览器
  - 服务器

categories: 
    - web安全  

---



## Cookie

Cookie是在服务端返回数据的时候通过Set-Cookie这个header 设置到浏览器里面的一个内容，浏览器保存之后，在下一次同域的请求中，就会带上Cookie，这样就可以在一个用户的会话过程中，可以返回对应的用户的数据

**Cookie有几个特点**

- 通过Set-Cookie 设置
- 下次请求会自动带上
- 键值对的形式，可以设置多个



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

