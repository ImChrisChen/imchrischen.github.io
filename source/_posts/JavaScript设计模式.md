---
title: JavaScript - 设计模式
date: 2022-05-07 20:55:27
tags:
- JavaScript
- Design patterns
---


## **什么是设计模式**

作者的这个说明解释得挺好

> 假设有一个空房间，我们要日复一日地往里 面放一些东西。最简单的办法当然是把这些东西 直接扔进去，但是时间久了，就会发现很难从这 个房子里找到自己想要的东西，要调整某几样东 西的位置也不容易。所以在房间里做一些柜子也 许是个更好的选择，虽然柜子会增加我们的成 本，但它可以在维护阶段为我们带来好处。使用 这些柜子存放东西的规则，或许就是一种模

## 观察者模式 / 发布订阅模式

发布订阅模式（也称为观察者模式）是一种软件设计模式，其中一个对象（称为发布者）维护一系列依赖于它的对象（称为订阅者），当有状态变化时，发布者会自动通知所有订阅者。

```javascript

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅指定的主题
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    const index = this.events[eventName].length - 1;

    // 提供取消订阅的方法
    return () => {
      this.events[eventName].splice(index, 1);
    };
  }

  // 发布事件，触发订阅的回调
  publish(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }
}

// 使用示例

// 创建一个事件发射器实例
const eventEmitter = new EventEmitter();

// 订阅事件
const unsubscribe = eventEmitter.subscribe('myEvent', (data) => {
  console.log(`Received data: ${data}`);
});

// 发布事件
eventEmitter.publish('myEvent', 'Hello World!'); // 控制台输出：Received data: Hello World!

// 取消订阅
unsubscribe();

// 再次发布事件，由于取消订阅，不会有输出
eventEmitter.publish('myEvent', 'Hello again!');

```


## 装饰器模式

```javascript
/**
 * Created by WebStorm.
 * User: chrischen
 * Date: 2020/7/13
 * Time: 10:49 下午
 */

class Math {
    @log()
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    console.log(`target:${ target }, name: ${ name }, descriptor: ${ descriptor }`);
    let oldValue = descriptor.value;
    
    descriptor.value = function () {
        console.log(`调用${ name }参数`, arguments);
        return oldValue.apply(target, arguments)
    }
    return oldValue.apply(target, arguments);
}

let math = new Math();
math.add(1, 2);

```


## 单例模式

特点：只能实例化一次
单例模式还分懒汉模式和饿汉模式，懒汉模式就是在需要的时候才实例化，饿汉模式就是一开始就实例化

```javascript
class Singleton {
    constructor(name, age) {
        if (Singleton.instance) return Singleton.instance;
        
        this.name = name;
        this.age = age;
        Singleton.instance = this;
    }
}

let singleton1 = new Singleton('Chris', 20);
let singleton2 = new Singleton('Chris', 20);
console.log(singleton1 === singleton2);


```


## 工厂模式

工厂模式是一种创建对象的设计模式，不需要指定将要创建的对象的确切类。


```javascript

class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
    this.color = options.color || 'silver';
  }
}

class Truck {
  constructor(options) {
    this.wheelSize = options.wheelSize || 'large';
    this.state = options.state || 'used';
    this.color = options.color || 'blue';
  }
}

class VehicleFactory {
  createVehicle(options) {
    if (options.vehicleType === 'car') {
      return new Car(options);
    } else if (options.vehicleType === 'truck') {
      return new Truck(options);
    }
  }
}

const factory = new VehicleFactory();
const car = factory.createVehicle({vehicleType: 'car', color: 'yellow'});

```
