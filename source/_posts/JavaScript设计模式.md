# JavaScript - 设计模式



## **什么是设计模式**

作者的这个说明解释得挺好

> 假设有一个空房间，我们要日复一日地往里 面放一些东西。最简单的办法当然是把这些东西 直接扔进去，但是时间久了，就会发现很难从这 个房子里找到自己想要的东西，要调整某几样东 西的位置也不容易。所以在房间里做一些柜子也 许是个更好的选择，虽然柜子会增加我们的成 本，但它可以在维护阶段为我们带来好处。使用 这些柜子存放东西的规则，或许就是一种模









## 观察者模式 / 发布订阅模式







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



