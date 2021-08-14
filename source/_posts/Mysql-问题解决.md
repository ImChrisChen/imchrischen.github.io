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
```



#### ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

密码不符合当前的安全要求



可以先修改一个复杂的密码，然后才能去设置密码安全等级（有点狗🐶....) 



1. 修改成复杂的密码

```mysql
-- alter user user() IDENTIFIED BY '你的密码';
alter user user() IDENTIFIED BY 'RootAdmin100_';
```



2. 查看密码当前密码安全策略等级

```mysql
show variables like 'validate_password%';
```


<img src="/Users/chrischen/Library/Application Support/typora-user-images/image-20210814170500801.png" style="zoom:50%;" />



3. 修改密码等级

> 按照自己的需求调整

```mysql
-- 密码验证策略低要求(0或LOW代表低级)
set global validate_password.policy=0;

-- 密码至少要包含的小写字母个数和大写字母个数
set global validate_password.mixed_case_count=0;

-- 密码至少要包含的数字个数。
set global validate_password.number_count=0; 

-- 密码至少要包含的特殊字符数
set global validate_password.special_char_count=0; 

-- 密码长度
set global validate_password.length=6;  
```



4. 修改密码

```mysql
-- alter user user() identified by '你的密码';
alter user user() identified by 'rootadmin';
```



# [ERR] 1273 - Unknown collation: 'utf8mb4_0900_ai_ci'

在 生成转储文件的数据库版本为8.0, 要导入sql文件的数据库版本为5.6,因为是高版本导入到低版本，引起1273错误



**解决方法：**
打开sql文件，将文件中的所有`utf8mb4_0900_ai_ci`替换为`utf8_general_ci`

 `utf8mb4`替换为`utf8`

保存后再次运行sql文件，运行成功



## Mysql8.0 密码忘记修改密码思路

网上找了一群都发现是直接修改密码的，没有忘记密码了这种思路

1. 忘记密码连接不上，选改配置跳过登录

   `/etc/my.cnf` 新增一行 skip-grant-tables

2. 先把 mysql 库的 密码改成空 

   1. `update user set authentication_string = '' where User = 'root'`
   
3. 然后关闭 跳过密码操作 /etc/my.ini

   `/etc/my.cnf` 文件中注释这一行 `#skip-grant-tables`

4. 然后重新设置密码

   1. `alter user user() identified by 'rootadmin';`

5. 然后修改密码安全策略 LOW（如果密码不符合，需要调整降低密码安全策略）

6. 刷新权限，使用高难度密码 重新 登录数据库

7. 修改成简单的密码