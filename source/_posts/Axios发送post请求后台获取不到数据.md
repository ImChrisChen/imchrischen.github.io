---
title: Axios发送post请求后台获取不到数据
date: 2019-06-12 15:16:48
tags:
- Axios
- Http
- Javascript
---

<!--# Axios post请求后台拿不到数据-->

`  原因： 前端传入的数据格式和后台接口接收数据类型不一致 `

### 1. URLSearchParams (不推荐)

>   URLSearchParams 对URL上的字符串数据进行类型处理

此方法不兼容IE 和 edge 浏览器 [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

**代码展示**

```javascript
let paramsObj = new URLSearchParams();
paramsObj.append('openid', 'oSrdV47XurWKLdhjheQ_9U1UKrWQ');   // key,value
axios({
    method: 'post',
    url: '/api_prod/booklist/get_topic_list',
    data: paramsObj
}).then(res => {
    // Coding
})
```



### 2. qs模块 stringify方法

>   字符串解析和序列化字符串的库

**安装**

~~~bash
npm install qs --save
~~~

**示例代码**

```javascript
import axios from 'axios'
import qs from 'qs'

created() {
    axios({
        method: 'post',
        url: '/api_prod/booklist/get_topic_list',
        data: qs.stringify({
        	key: 'value'
        }),
    }).then(res => {
        // Coding
    })
}
```



### 3. 和后台协商改变接收参数方式

~~~
xxxxxxxx
~~~



