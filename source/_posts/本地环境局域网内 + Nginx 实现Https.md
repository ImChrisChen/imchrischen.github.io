---
title:  本地环境局域网内 + Nginx实现Https😎
date: 2020-05-09 02:58
tags:
- Vue
- Nginx
---

### Nginx+Https配置

`TLS或传输层安全( transport layer security)`，它的前身是SSL(安全套接字层secure sockets layer)，是Web协议用来包裹在一个受保护，加密封装正常通道。
采用这种技术，服务器和客户端之间可以安全地进行交互，而不用担心消息将被拦截和读取。证书系统帮助用户在核实它们与连接站点的身份。



### 步骤1：创建SSL证书

```shell
sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 36500 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
```

创建了有效期100年，加密强度为RSA2048的SSL密钥key和X509证书文件。

**参数说明:**

req: 配置参数-x509指定使用 X.509证书签名请求管理(certificate signing request (CSR))."X.509" 是一个公钥代表that SSL and TLS adheres to for its key and certificate management.
-nodes: 告诉OpenSSL生产证书时忽略密码环节.(因为我们需要Nginx自动读取这个文件，而不是以用户交互的形式)。
-days 36500: 证书有效期，100年
-newkey rsa:2048: 同时产生一个新证书和一个新的SSL key(加密强度为RSA 2048)
-keyout:SSL输出文件名
-out:证书生成文件名
它会问一些问题。需要注意的是在common name中填入网站域名，如wiki.xby1993.net即可生成该站点的证书，同时也可以使用泛域名如*.xby1993.net来生成所有二级域名可用的网站证书。
整个问题应该如下所示:



```
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:New York
Locality Name (eg, city) []:New York City
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Bouncy Castles, Inc.
Organizational Unit Name (eg, section) []:Ministry of Water Slides
Common Name (e.g. server FQDN or YOUR name) []:your_domain.com
Email Address []:admin@your_domain.com
```



### 步骤2： 修改Nginx配置

```nginx
server {
	listen       		80; 		
	listen       		443 ssl;
	ssl_certificate 	"/Users/chrischen/server/nginx/nginx.crt";
	ssl_certificate_key "/Users/chrischen/server/nginx/nginx.key";
	server_name  		"wui-test.local.aidalan.com";
	server_name  		"test-wui.local.aidalan.com";

	root       "/Users/chrischen/dalan/wui-test.local.aidalan.com";
	index      index.html index.htm;

	location / {
		autoindex on;
	}

	#主要配置这个，包含 在server里面
#	location ~ .*\.(php)?$ {
#		fastcgi_pass  127.0.0.1:9000;
#		fastcgi_index index.php;
#		include fcgi.conf;
#	}

	access_log off;

	default_type 'text/html';
	charset utf-8;

	set $ACAO '*';
	add_header 'Access-Control-Allow-Origin' '$ACAO';
}
```



> 参考链接 https://segmentfault.com/a/1190000004976222



