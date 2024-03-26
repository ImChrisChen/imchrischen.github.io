
---
title: 使用typescript%20编写一个npm模块
date: 2020-06-26 12:15:50
tags: 
 - Javascript
 - Typescript
 - NPM
---

### Tips

最近公司在推小游戏这块的业务，所以就有了这么一个需求，要求在oppo/vivo小游戏上，接入一套SDK给研发调用，主用于收集用户数据（注册，登录，游戏在线时常上报，等一系列用户行为记录），然后需在游戏项目（用的ts）中去编写代码，于是就有了这个想法，把SDK做成一个npm模块，以后维护这个模块就好了，便于维护和管理。

> 网上看了很多资料，最后总结出这篇文章，在这里谢谢各位大佬

## 1 .  初始化NPM包

```shell
npm init -y			// 初始化package.json
```

## 2 . 安装typescript

```shell
npm install typescript -D
```

## 3 . 配置 tsconfig.json

```shell
tsc --init			// 初始化tsconfig.json
```

修改配置为

```json
{
  "compilerOptions": {
    "target": "es5",				// 指定ECMAScript目标版本
    "module": "commonjs",		// 指定模块化类型
    "declaration": true,		// 生成 `.d.ts` 文件
    "outDir": "./dist",			// 编译后生成的文件目录
    "strict": true					// 开启严格的类型检测
  }
}
```



## 4 . 编写模块

这里把之前写好的SDK模块拿过来

然后在跟目录下新建 index.ts 如下：

![](http://oss.anyways.fun//Markdown20200625002857.png)

## 5 . 



