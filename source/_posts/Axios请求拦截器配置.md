---
title: 'Axios请求拦截器配置'
date: 2019-08-14 21:58:43
tags: 
  - Axios
  - Vue
---

> 通常在**请求拦截器**中可以做 **Loading加载动画，token过期验证，登陆验证**等等...

> 响应拦截器中可以做 **统一报错信息处理**

~~~javascript
import Axios from 'axios';
import router from '../router';
import {Message} from 'element-ui';

Axios.defaults.baseURL = process.env.VUE_APP_BASE_API;      // 设置基础路径
Axios.defaults.timeout = 5000;                              // 设置请求超时时间


Axios.interceptors.request.use(
	config => {
		let token = JSON.parse(localStorage.getItem('token') || null);
		if (token) {
			config.headers['secretKey'] = token.secretKey;
			config.headers['timestamp'] = token.timestamp;
			config.headers['uuid'] = token.uuid;
		}
		return config;
	},
	err => {
		console.log(err);
	}
);

// response 响应拦截器
Axios.interceptors.response.use(
	res => {
		// 401 您还未登录，或登录信息已过期
		if (res.data.status_code !== 200) {
			Message({
				message: res.data.message,
				type: 'error'
			});

			if (res.data.status_code === 401) {
				router.push({path: '/login'});
			}
		}
		return res.data;
	},
	err => {
		console.log(err);
	}
);

export const get = (url, params) => {
	return Axios({
		url,
		method: 'GET',
		params
	});
}

export const post = (url, data) => {
	return Axios({
		url,
		method: 'POST',
		data
	});
}
~~~


