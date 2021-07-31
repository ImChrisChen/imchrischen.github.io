---
title: axios拦截器使用typescript返回自定义类型
date: 2021-07-31 21:18:28
tags:
  - axios
  - typescript
---



## 解决typescript 中 axios拦截器返回值不匹配的问题



### 思路

1. 先看 `axios` 实例的 `interface` 定义是什么
2. 发现返回值是由 `AxiosResponse` 接口 约束的
3. 自定义一份类似 `AxiosInstance` 的接口， 然后用自定义的返回值接口替换掉原有的定义
4. 使用在 封装的`axios ` 实例上（下面的`HttpClient`  就是修改后的 `axios 实例 接口`）



```typescript

/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2021/7/31
 * Time: 18:25
 */

import axios, { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

interface HttpClient {
  (config: AxiosRequestConfig): AxiosPromise;

  (url: string, config?: AxiosRequestConfig): AxiosPromise;

  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };

  /**
   * --------------------------- 以下方法定义是修改的部分 --------------------------------------
   */

  getUri(config?: AxiosRequestConfig): string;

  request<T = any, R = ResponseData<T>>(config: AxiosRequestConfig): Promise<R>;

  get<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;

  delete<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;

  head<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;

  options<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;

  post<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;

  put<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;

  patch<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

enum ResultMap {
  ok = '请求成功',
  error = '请求异常'
}

interface ResponseData<T = any> {
  result: keyof typeof ResultMap;
  data: T;
  msg: string;
  errcode?: string;
}

const httpClient: HttpClient = axios.create({
  baseURL: '/',
});

httpClient.interceptors.request.use(request => {
  return request;
});

httpClient.interceptors.response.use(response => {
  if (response.status === 200) {
    if ((response.data as ResponseData).result === 'ok') {
      return response.data;
    }
  }
});

export default httpClient;

```

