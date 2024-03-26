---
title: HTTP 内容安全策略 - Content-Security-Policy

date: 2021-05-22 16:32:53

categories:
  - web安全

tags:
  - Http
---


## 前言
今天写下如何避免 `XSS` 跨站脚本攻击，以及CSP的使用


## 内容安全策略（CSP）是什么？



内容安全策略是一个对Web网站的安全层，用于检测并削弱某些特定类型的攻击，数据注入攻击等，无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的攻击手段。

简单理解，`CSP`其实就是白名单制度，开发者明确告诉客户端，哪些资源可以被允许加载执行



`CSP` 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。

`CSP` 被设计成完全向后兼容，老版本的`CSP` 字段为 `X-Content-Security-Policy`

默认为网页内容使用标准的同源策略。如果网站不提供 `CSP` 头部，浏览器也使用标准的同源策略。

下面说下 `CSP` 如何开启👇🏻


## 限制参数

下面选项限制各类资源的加载，主要分为以下两种

- `default-scr` 限制全局，所有根据链接加载的东西都会被限制（优先级最高）
  ```nginx
  Content-Security-Policy: default-src 'self'		#设置各项的默认值
  ```

- 制定资源类型

  - `content-src`   所有请求资源限制 ( [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/OverView) ,[WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) , [EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource) 等)
  - `script-src`       外部脚本
  - `img-src`           图片资源
  - `style-src`         外部CSS
  - `font-src`          字体文件
  - `worker-src`     worker脚本
  - `frame-src`       嵌入的外部资源（比如`<frame>、<iframe>、<embed>和<applet>`）
  - `manifest-src`  [Manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest) 文件 （WebApp）

- 其他限制

  限制了一些其他的安全规范，也放在了CSP里面

  - `block-all-mixed-content`   HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）
  - `upgrade-insecure-requests` 自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议
  - `plugin-types` 	限制可以使用的插件格式
  - `sandbox`  浏览器行为的限制，比如不能有弹出窗口等

  上面资源类型一下比较通用的， 其中还包含 font-src，frame-src，media-src等等，只要是可以通过外链形式加载的几乎资源都可以被限制



## 参数选项 

每个选项可以设置一下这几项

- 主机名 		`chrisorz.cn`   `https://chrisorz.cn:443`	(指定端口)
- 路径             `blog.chrisorz.cn/api/`
- 通配符         `*.chrisorz.cn`      `*://chrisorz.cn:*`  ( 所有协议，所有端口)
- 协议名         `http:`  `https:`  `file:`  `stp:`

- 关键字      
  -   `"none"` 	禁止加载任何外部资源 需要引号
  -  `"self"`      当前域名，需要引号

通过参数和参数选项就可以实现整条完整的规则了



## 语法规则

每个规则可以指定一个或者多个选限，如果有多个则用` `空格分开

每条规则用`;`结尾 例如:

```nginx
server {
	Content-Security-Policy: "img-src cdn.chrischen.top cdn.chrisorz.cn;
        					  script-src 'self';
    						  style-src 'self';
    						  ";
}
```

上面代码中，CSP做了如下配置

- 图片：只能信任 `cdn.chrischen.top` `cdn.chrisorz.cn`这两个域名加载的资源
- 脚本：只信任本域名下的脚本
- 样式：只信任本域名下的样式





## 开启CSP的两种方式

1. 通过配置 `HTTP` 头信息的 `Content-Security-Policy` 字段 （服务器）

```nginx
server {
    # 不能使用行内script只能从http或者https中使用外链
    add_header "Content-Security-Policy" "default-src http: https:";    
}
```

写了个Demo，nginx上配置了 `add_header "Content-Security-Policy" "default-src http: https:"`后，可以看到内嵌式的script 代码已经不生效了，网页上没有任何的改变

<img src="http://oss.anyways.fun/blog/6eK5NS.png" style="zoom:33%;" />

同样CSS也是, 行内样式和内嵌样式都被拦截掉了

<img src="http://oss.anyways.fun/blog/PTgjDw.png" style="zoom:33%;" />

2. `<meta>` 标签设置

```html
<meta http-equiv="content-security-policy" content="style-src http: https:" charset="UTF-8">
```

`<meta/>`属性设置后也是一样的效果，这里就不贴图了



这里只是做一个演示效果，实际生产环境中一般不会这样设置 `Content-Security-Polity` ，生产环境中一般会有多域名，根据实际业务去进行可视化的配置，例如：

- 静态资源上CDN
- 注入百度统计，Google统计等脚本
- 后端多域名的API（微服务更甚之，可能一个项目调7，8个域名，不过可以通过通配符去解决） 
- 等等


## 总结

CSP 可以避免 `XSS` 攻击

CSP 的设置分为两种

- 客户端 `meta` 标签
- 服务端 响应头 

**无论是客户端，还是服务端设置，最终生效的CSP 安全策略是权限范围最小的那个**

