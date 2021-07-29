---
title: Mysql 问题解决
date: 2021-07-22 20:43:06
tags:
  - Mysql
---



## mysql 启动时报错



`$ systemctl start mysqld;`

```shell
Job for mysqld.service failed because the control process exited with error code. See "systemctl status mysqld.service" and "journalctl -xe" for details.·
```



**查mysqld日志**

`tail -f /var/log/mysqld.log  `

![](http://cdn.chrischen.top/blog/iep927.png)



发现第一个错误

#### Plugin initialization aborted with error Generic error



解决办法：

1. 进入mysql目录，一般是：/usr/lib/var/mysql/  或者 /var/lib/mysql
2. 删除ib_logfile*



`$ systemctl start mysqld;` 

再次启动....

又失败，查询日志如下

![](http://cdn.chrischen.top/blog/Av2WnU.png)



#### Cannot upgrade server earlier than 5.7 to 8.0

解决办法：

```shell
rm -rf /var/lib/mysql/*
```

于是正常启动了。



```shell
$ mysql -u root -p
```

输入密码后：

#### ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)



解决办法：

1. 找到mysql 配置文件 `$ vim /etc/my.cnf`
2. 新增 一行 `skip-grant-tables`   （表示跳过密码登录）
3. 重启mysql  `systemctl start mysqld`
4. 跳过密码登录后 重新设置 mysql密码



注意我用的是mysql 8版本

**查了一下，发现mysql 5.7.9以后废弃了password字段和password()函数，因此才报错。也就是这个函数password()已经没用了**



可以直接用 md5 和 sha1函数加密密码



修改密码：



要先连接上mysql

```mysql


# 选择mysql数据库
use mysql;

# 修改用户密码
UPDATE mysql.`user` SET authentication_string=MD5('root') WHERE user='root';
```



重新刷新权限

```mysql
flush privileges;

