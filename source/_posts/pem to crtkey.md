---
title: pem to crt/key
date: 2022-04-09 20:55:27
tags:
- Linux
- Shell
---



## pem to key

key.pem => cert.key

```shell
openssl pkey -in key.pem -out chrisorz.cn.key
```



## pem to crt 

```shell
openssl x509 -in cert.pem -out chrisorz.cn.crt
```

