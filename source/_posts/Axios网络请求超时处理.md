---
title:  Axios 网络请求超时处理🙃
date: 2019-08-17 12:28:35
tags:
    - Vue
    - Axios
---

```javascript
// response 响应拦截器
Axios.interceptors.response.use(
    res => {
      if (res.status === 200) {
        return res.data
      } else {
        Message.error(res.data.msg)
      }
    },
    err => {
      console.log(err);

      // 超时处理
      let originalRequest = err.config;

      console.log(err.message);     //timeout of 100ms exceeded

      if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1 && !originalRequest._retry) {

        originalRequest._retry = true
        Message.error('请求超时,尝试重新请求中')

        // 重新发起请求
        return Axios.request(originalRequest);
      }
    },
);
```

