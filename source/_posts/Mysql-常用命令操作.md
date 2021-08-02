---
title: Mysql 知识小结
date: 2021-07-19 19:46:27
tags: mysql
---



## Mysql 语句

Mysql语句大体分三类：

#### DDL 数据定义语言 

Data Definition Language 的缩写

用于定于数据库，数据表，通常在设计数据库，设计表的时候用到



一些常用的 **DDL** 语句



**新建数据库**

```mysql
create database new_db;
# Query OK, 1 row affected (0.00 sec)
```



**设置数据库字符集**

```mysql
alter database new_db default character set utf8;
# Query OK, 1 row affected, 1 warning (0.01 sec)
```



**删除数据库**

```mysql
drop database new_db;
# Query OK, 0 rows affected (0.01 sec)
```





**新建数据表**

```mysql
create table new_table(id int, name varchar(10));
# Query OK, 0 rows affected (0.01 sec)
```



**从旧表复制到新表**

```mysql
Create table new_table like old_table;
```



**表添加列**

```mysql
alter table new_table add phone varchar(20);
```



**修改表列的类型**

```mysql
alter table new_table modify phone int(30);
# Query OK, 0 rows affected, 1 warning (0.02 sec)
# Records: 0  Duplicates: 0  Warnings: 1
```



**修改表列名**

```mysql
alter table new_table change phone mobile_phone varchar(100);
# Query OK, 0 rows affected (0.01 sec)
```



**删除表的列**

```mysql
alter table new_table drop mobile_phone;
# Query OK, 0 rows affected (0.02 sec)
# Records: 0  Duplicates: 0  Warnings: 0
```





#### DML  数据操纵语言

Data Manipulation Language 的缩写

一些常用的DML语句



**插入一行数据（1）**

```mysql
insert into 
new_table(id,name,phone) 
values(1,'Chris','1538629xxxx');
```



**插入一行数据（2）**

```mysql
insert into new_table
set id = 3, 
name = 'Alex', 
phone = '1538629xxxx'
```



**删除**

```mysql
delete from new_table where id = '1';

delete from new_table where id = '1' and age = 100;
```





#### DQL 数据查询语言 

Data Query Language 的缩写



```mysql
select * from new_table;

select id,name from new_table order by desc;

select * from new_table where id = 10;
```



