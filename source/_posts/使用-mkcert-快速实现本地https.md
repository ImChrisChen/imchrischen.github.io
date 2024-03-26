---
title: 使用 mkcert + Nginx 快速实现本地https
date: 2021-06-23 20:24:16
tags:
  - Http
  - Nginx
---



## mkcert是什么？

因为最近在做公司的一些移动端的web项目，经常需要在手机上进行真机调试，很多场景下都需要使用到 https，而且在开发阶段为了尽可能与线上的环境保持一致，所以打算直接在本地 使用https进行开发调试

然后发现了一款工具，它用于在本地搭建受信证书环境。试用了一下，非常便捷。

首次运行时，它会生成一个**本地CA**，即本地公证机构根证书，然后**把此CA添加到系统受信列表**。最后，由此CA颁发（签名）新的下级证书给各网站使用。



## 安装mkcert

```shell
$ brew install mkcert

Created a new local CA at "/Users/ChrisChen/Library/Application Support/mkcert" ?
The local CA is now installed in the system trust store! ⚡️
The local CA is now installed in the Firefox trust store (requires restart)! ?
```



## 生成本地 Root CA证书

```shell
$ mkcert -install
```

``/Users/chrischen/Library/Application Support/mkcert` 生成的CA证书的路径



## 生成下级证书

```shell
$ mkcert localhost 127.0.0.1
```

<img src="http://oss.anyways.fun/blog/TDnbAU.png" style="zoom:50%;" />

如果要生成泛域名证书也可以使用 `mkcert "*.wps.cn"` 类似的域名（要注意使用双引号才可以）



## 配置Nginx使用证书

```nginx
server {
    listen       443 ssl;
    server_name  localhost;

    ssl_certificate      /Users/chrischen/cert/local/localhost+1.pem;
    ssl_certificate_key  /Users/chrischen/cert/local/localhost+1-key.pem;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {

    }
}
```

重启nginx，访问 [ https://localhost ](https://localhost/) 

```shell
sudo nginx -s reload
```

<img src="http://oss.anyways.fun/blog/lzOWPK.png" style="zoom:80%;" />

