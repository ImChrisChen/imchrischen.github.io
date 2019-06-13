---
title: Vue.config.js跨域配置
date: 2019-06-12 14:57:32
tags:
- Vue
---
<!--## Vue-cli-3.x跨域配置-->

### 项目根目录新建vue.config.js
~~~javascript
touch vue.config.js
~~~

### 设置跨域

~~~javascript
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://www.boomore.cn',
                changeOrigin: true,         // 是否开启跨域
                pathRewiter: {
                    '^/api_prod': ''
                }
            }
        }
    }
};
~~~


### 调用API

```javascript
axios({
    method: 'post',
    url: '/api_prod/booklist/get_topic_list',
    data: qs.stringify({
        key: value,
   }),
}).then(res => {
    // Coding
})
```
