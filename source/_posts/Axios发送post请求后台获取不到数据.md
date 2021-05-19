---
title: Axios发送post请求后台获取不到数据🥲
date: 2019-06-12 15:16:48
categories:
    - 解决问题相关

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

    上面这些情况一般都是由于前后端数据类型交互格式不一致所导致的

例如后端使用的是 `application/x-www-form-urlencoded`格式
数据格式为：`id=1&name=chris`

前端发送的数据是 `application/json` 格式
数据格式为：`{id:1,name:'chris'}`

就会纯在上面所说的情况,需要用一些方法去处理和转译

**然后最好的办法还是直接从文档上就统一好这些规范，避免在开发时出现不必要的联调，导致降低效率**



