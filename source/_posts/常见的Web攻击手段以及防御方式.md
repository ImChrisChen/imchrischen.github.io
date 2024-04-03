---
title: 常见的Web攻击手段以及防御方式
date: 2024-04-03 22:48:16
tags:
  - Web安全
  - XSS
  - CSRF
  - SQL注入
  - 文件上传漏洞
---

## 跨站脚本攻击（Cross-site Scripting, XSS）

**攻击方式:** 攻击者利用网页开发时留下的漏洞，通过巧妙的方法在目标网站 HTML 页面中注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如
Cookie、SessionID 等，进而危害数据安全。
**本质：** 恶意的脚本代码被注入到了页面中，被浏览器执行。

XSS 攻击大致可以分为以下 3 类：

### 存储型
注入型脚本永久存储在目标服务器上。当浏览器请求数据时，脚本从服务器上传回并执行。
e.g. ：用户评论中注入恶意脚本，其他用户查看评论时，恶意脚本被执行。

```html
<!-- 伪造的网页结构示例 -->
<html>
<head>
    <title>论坛帖子</title>
</head>
<body>
<h1>欢迎来到我们的论坛！</h1>
<p>这里是用户评论：</p>
<div id="userComments">
    <!-- 用户的评论将在这里显示 -->
</div>
</body>
</html>
```

在没有适当防护的情况下，攻击者可能会提交一个包含恶意JavaScript代码的评论，例如:

```javascript
<script>alert('XSS攻击');</script>
```

当其他用户查看评论时，恶意代码将被执行。

### 反射型(非持久型)

攻击者构造出特殊的 URL，其中包含恶意代码。用户点击包含恶意代码的 URL 时，网站解析执行了恶意代码。
e.g. ：攻击者构造出一个链接，链接中包含了恶意代码，用户点击链接后，恶意代码被执行。

```html
<!-- 伪造的网页结构示例 -->
<html lang="en">
<body>
<h1>Hello <span class="name"></span></h1>

</body>
</html>

<script>
    const name = new URLSearchParams(window.location.search).get('name')
    console.log({name})
    document.querySelector('.name').textContent = name
</script>
```

攻击者构造的恶意 URL如下：
URL: http://localhost:63342/index.html?name=%3Cscript%3Ealert(100)%3C/script%3E

![http://oss.anyways.fun/blog/tQB6uf.png](http://oss.anyways.fun/blog/tQB6uf.png)

正常情况下页面上是回弹出alert的，但是现在的浏览器都有XSS防护机制，可以看到这里被注入的script脚本被做了特殊字符转译，所以不会弹出。
(实测了Chrome，Safari，Firefox都无效，他们底层都做了XSS防护攻击)

### DOM 型

DOM 型 XSS 攻击和存储型、反射型 XSS 攻击的差别在于，DOM 型 XSS 攻击不需要和后端交互，而是通过修改页面的 DOM
节点来完成攻击。

和反射型 XSS 攻击类似，DOM 型 XSS 攻击也是通过 URL 传入恶意代码，但是这种攻击方式不需要后端的参与，而是通过前端的脚本来完成攻击。

### 防御措施：

- 对所有用户输入进行适当的转义和过滤，以防止脚本执行
- 设置[CSP](/2021/05/22/Http-内容安全策略-Content-Security-Policy/?highlight=csp)（Content Security Policy）来减少XSS攻击的风险。
- 服务端设置 cookie 为 httpOnly,保护用户cookie不被Javascript读取

## 2. CSRF攻击 (Cross-Site Request Forgery 跨站请求伪造)

**攻击方式：** CSRF攻击允许攻击者在不知情的情况下，以受害者的身份发送或改变服务器上的请求。如果受害者在Web应用程序中具有足够的权限，攻击者可以利用这些权限执行恶意操作。
**本质：** 攻击者引诱用户打开一个链接，在用户已登录被攻击的网站情况下，在恶意网站中请求被攻击网站的接口，此时Cookie信息会被自动带上发送给Hacker服务器。

### 实现思路

1. 用户登录：用户在浏览器中登录某个网站，并且该网站的服务器为用户浏览器设置了认证Cookie。
2. 攻击页面构建：攻击者构造了一个恶意网页，这个网页包含了一些请求目标网站的代码，比如一个自动提交的表单。
3. 用户访问恶意网页：如果用户在还没有登出之前（即Cookie还有效），不小心访问了这个恶意网页，浏览器会自动发送请求到目标网站。
4. 浏览器发送请求：因为用户的Cookie仍然有效，目标网站会认为这是用户自己发出的请求，并执行相应的操作。
5. 攻击完成：攻击者通过这种方式可以实现各种操作，如转账、改密码、发信息等，只要受害者有权限执行的操作。

### 防御措施：

- 服务端开启CORS跨域,限制请求来源
- 使用SameSite Cookie属性：设置Cookie的SameSite属性，可以限制Cookie不随跨站请求发送。
- 设置Cookie可信任域名：设置Cookie的Domain属性，只允许指定域名发送请求。

## 3. SQL注入

**攻击方式：** SQL注入是一种代码注入的攻击方式，通过把SQL命令插入到Web表单提交或输入域名的查询字符串，最终欺骗服务器执行恶意的SQL命令。
**本质：** 攻击者通过输入恶意的SQL语句，欺骗服务器执行恶意的SQL语句。

### 防御措施：

- 使用参数化查询：使用参数化查询可以有效防止SQL注入攻击。
- 限制数据库的权限：数据库的权限应该尽可能小，只赋予执行必要操作的权限。
- 对用户输入进行校验：对用户输入的数据进行校验，只允许合法的数据通过。
- 使用ORM框架：ORM框架可以有效防止SQL注入攻击。
