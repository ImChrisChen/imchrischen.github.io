---
title: Linux 常用命令
date: 2019-06-12 15:22:54
tags:
- Linux
- 命令行
---
<!--# Linux 常用命令-->

### 配置全局变量

```bash
ln -s  <原始路径>  <全局路径>

ln -s /usr/local/node/bin/npm  /usr/bin/npm
```



### 设置密码

```bash
sudo passwd
```



### 清除原有SSH密钥

```bash
ssh-keygen -R 192.168.1.203(你远程服务器的IP)
```



### 重启MySQL服务

```bash
service mysqld restart
```



### 查看数据库占用端口 (*mysql命令*)

```bash
show global variables like 'port';
```



### 查看版本信息

```
lsb_release -a
```



### 查看主机多少位操作系统

```bash
getconf LONG_BIT
```



### **Linux / MacOS** 下配置修改默认命令行脚本

```bash
chsh -s /bin/zsh
chsh -s /bin/bash
```


