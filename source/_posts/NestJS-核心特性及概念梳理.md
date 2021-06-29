---
title: NestJS 核心特性及概念梳理 「持续补充」

date: 2021-06-27 16:11:26

tags:
  - NodeJS
  - NestJS
  - Typescript

categories:
  - 应用架构

---


## 前言

刚入职新公司，接手到一个NestJS的项目（终于不用写HTML 和 CSS了），用于做前后端API交互的中间层处理，之前也有用NestJS写过一些自己的Demo项目，但是没太系统性的深入学习，现在趁着这次机会系统性的学习一下NestJS，顺便整理成文档...



## NestJS是什么？

以下是官网的原话

---

Nest 是一个用于构建高效，可扩展的 [Node.js](http://nodejs.cn/) 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 [TypeScript](https://www.tslang.cn/)（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

在底层，Nest使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。

Nest 提供了一个开箱即用的应用程序架构，允许开发人员和团队创建高度可测试，可扩展，松散耦合且易于维护的应用程序。

---

加上我自己的了解，总结一下分为几个特征

- 是一个NodeJS的框架
- 内置支持Typescript
- 支持面向对象编程（OOP） / 函数式编程（FP）/ 函数式响应编程（FRP）
- HTTP 服务器
  - Express （默认）
  - Fastify
- 核心特性
  - 依赖注入 - DI
  - 中间件 - Middleware
  - 守卫 - Guards
  - 拦截器 - interceptors
  - 管道 - Pipe
  - 控制器 - Controller
  - 模块 - Module
  - 微服务

> 本文主要谈及一些和其他Node框架稍微差异的特性，比如`依赖注入`、`控制器`、`管道`、`拦截器`、`模块`、`微服务`。



本文章先从Nest的一个请求的生命周期开始讲解



## Nest的一次请求生命周期

请求发起： 中间件 => 守卫 => 拦截器 => 管道 => 控制器

​																					⬇️

响应响应： 			HTTP Response  <= 拦截器 <= 控制器



>  这次没画图了，以后找到好用的画图工具补一下  😅





## 依赖注入

在Nest中使用了大量的装饰器语法，依赖注入也是通过装饰器的形式进行实现

使用 @Injectable() 装饰的类，可以在任何地方被注入，下面看依赖注入在Nest中的具体使用

---

`Provides`是Nest的最基本的一个概念，许多基本的Nest类可能视为provider-service，repository，helper等等，在实际开发中，比如常用的service， repository。有了依赖注入我们能够提高应用程序的灵活性和模块化程度。举个例子说明：

app.module.t

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
    // 把AppService导入到provides中， 在注入依赖时，使用provides建立对象之间的依赖关系
  providers: [AppService], 
})
export class AppModule {}
```



app.services.ts

```typescript
import { Injectable } from '@nestjs/common';

// 使用 Injectable 装饰器把该类添加到IoC容器中（在其他文件中就可以完成依赖注入并自动实例化 AppService ）
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

app.controller.ts

通过该装饰器使Nest知道这个类是一个provider，现在我们使用类构造函数注入该服务

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 1. 构造函数中 注入AppService类
  constructor(private readonly appService: AppService) {}

  // 2. 使用 属性注入的形式 注入 AppService类
  // private readonly appService: AppService
    
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

从上面代码来看， 我们在Controller里使用AppService不是通过使用New来实例化， 而是在constuctor声明即可。

可看出依赖注入的两个优势：

1. 依赖管理交给Nest运行时处理
2. 依赖项只关注注入类型，不关注具体实例，具有高度解偶性





## 控制器

一般Node框架（Express，Koa）都有没有控制器这个概念，除了阿里的Egg这种上层的封装框架，Nest 的控制器相当于路由的概念







## 守卫

未完待续。。。



## 管道

管道是具有 `@Injectable()` 装饰器的类。管道应实现 `PipeTransform` 接口

当在 Pipe 中发生异常，controller 不会继续执行任何方法。



管道有两个类型：

- 转换：管道将输入数据转换为所需的数据输出 
- 验证：对输入数据进行验证，比如form表单提交的数据类型



在这两种情况下, 管道 `参数(arguments)` 会由 [控制器(controllers)的路由处理程序](https://docs.nestjs.cn/7/controllers?id=路由参数) 进行处理. Nest 会在调用这个方法之前插入一个管道，管道会先拦截方法的调用参数,进行转换或是验证处理，然后用转换好或是验证好的参数调用原方法。



### 转换管道使用

validation.pipe.ts

```typescript
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class ValidationPipe implements PipeTransform {
  // 每个管道必须提供 transform() 方法。     
  // 这个方法有两个参数 1.value 2.metadata
  transform(value: string, metadata: ArgumentMetadata): number {
    return Number(value);
  }
}
```

blog.controller.ts

```typescript
import { ValidationPipe } from '@pipe/validation.pipe.ts'
@Controller('blog')
export class BlogController {
  @Get(':id')
  @UsePipes(new ValidationPipe())		// 使用@UsePipes装饰器
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }
}
```



### 验证管道使用

validation.pipe.ts

```typescript
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class ValidationPipe implements PipeTransform {
  // 每个管道必须提供 transform() 方法。     
  // 这个方法有两个参数 1.value 2.metadata
  transform(value: string, metadata: ArgumentMetadata): number {
    // value 就是接收到的 id
    return Number(value);
  }
}
```



blog.controller.ts

参数验证管道，在要验证的管道的前面加上 `new Pipe()` 将参数作为 `pipe` 实例里的 `transform` 方法中的第一个参数

```typescript
import { ValidationPipe } from '@pipe/validation.pipe.ts'
@Controller('blog')
export class BlogController {
  @Get(':id')
  // 参数验证管道，
  findOne(@Param('id', new ValidationPipe()) id: string) {
    return this.blogService.findOne(+id);
  }
}
```





## 拦截器

。。。



