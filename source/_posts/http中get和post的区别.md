---
title: http客户端get和post详解以及区别🧐

date: 2021-05-21 03:46:59

categories:
  - 计算机网络
tags:
  - Http
---



## 前言

这应该算是一个高频面试题了吧，来来输出一下... 什么是http，为何要使用它之类的就不讲了.. 

​	尽可能写详细点吧，不然一个表格就搞定了

---



## 区别

### 语义不通

最直观的就是语义不同了

说到语义，http客户端在当时设计这些API的时候（我没去参与设计过，我猜测的哈哈哈[狗头]），也是有一套规范的，当然这个规范不是强约束，你不按照这个语言规则来，你的程序也能跑

http不同方法代表的语义，分别对应来CURD的4个操作 RESUful API

- GET 在服务器检索某个资源
- POST 在服务器创建资源
- PUT 在服务器更改资源状态或对其进行更新
- DELETE 在服务器删除某个资源

RESUful API 风格就是遵循的http的语义化去设计的



## 参数传递形式不一样

### GET

GET请求的参数是拼接在URL后面的，通过 `= &符号进行分割`  `url?key1=value2&key2=value2`

例如: `http://chrischen.top/api?id=10&name=chris` 

服务端获取参数需要从 request中的 query 字段去获取

由于get参数都是明文显示，所以例如身份证号码，用户名密码，这类敏感信息是不应该用get去请求的



### POST

post请求的参数则会包含在请求体中，通常服务端用request中的 body字段去获取的，

而且发送post请求传递参数的内容格式（content-type）也是不一样的，既然聊到content-type，下面就多写点

**在响应中**: Content-Type标头告诉客户端实际返回的内容的内容类型。浏览器会在某些情况下进行MIME查找，并不一定遵循此标题的值; 为了防止这种行为，可以将标题 [`X-Content-Type-Options`] 设置为**nosniff**

**在请求中**: 在 post 或 put 请求，客户端告诉服务器实际发送的数据类型 通过content-type去设置发送的数据类型



**常用的POST/PUT请求数据类型**

更多 请求类型响应类型具体可参考 👉🏻  [MIME 类型 - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types#重要的mime类型)

```
// {id:123,name:'chris'}
Content-Type: application/json;				

// id=123&name=chris
Content-Type: application/x-www-form-urlencoded; 
```





## 幂等

​	GET请求是幂等的，POST请求不幂等

#### 什么是幂等？

一个HTTP方法是**幂等**的，指的是同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的。换句话说就是，幂等方法不应该具有副作用（统计用途除外)

下面几种方法是幂等

- GET
- HEAD
- PUT
- DELETE



未完待续。。。















