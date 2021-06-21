---
title: Vue 自定义指令封装数据埋点🐛
date: 2021-06-21 15:57:39
tags:
  - Vue
  - 代码片段
---



## 最小化实现

最小化实现 ，`inserted, 和bind的区别可以取官网看，不同的使用场景`

```javascript
Vue.directive('collect', {
	inserted (el,bindbing) {
        // 执行自定义指令要做的操作
    }
});
```

- `collect` 表示自定义指令的名称   `bindbing.name`
- `close_vip` 这部分表示自定义指令的参数  `bindbing.arg`
- `.click .stop` 表示修饰符  `binding.modifiers.click, binding.modifiers.stop`
- `{title: "关闭弹窗"} ` 这部分表示 自定义指令的值.  `binding.value`



## Vue自定义指令设计



Vue自定义指令其实就是html 的属性，通过给 Vue自定义指令也是 html属性的一种语法糖，所以自定义其实就是通过 html 标签属性的形式，通过一系列规则的封装成的一些特定功能，下面看看如何实现



**实现自定义指令需要弄明白一下几个问题**。

1. 自定义指令使用的使用的多种方法，name，修饰符等等
2. 自定义指令插件化开发，如何解耦合？



## 自定义指令编写

```javascript
import { dw } from '@/utils';

export class Collect {
    
    inserted(el, binding) {
        let { value, arg, modifiers } = binding;
        let { click, show, prevent, stop } = modifiers;     // 自定义修饰符
        
        if (show) {
            dw.onEvent(arg, value);
        }
        
        if (click) {
            el.addEventListener('click', event => {
                stop && event.stopPropagation();
                prevent && event.preventDefault();
                dw.onEvent(arg, value);
            }, false);
        }
    }
    
    bind() {
    
    }
    
    unbind(el, bingding) {
        const { click = false } = bingding.modifiers;
        const { value } = bingding;
        if (click) {
            el.removeEventListener('click',() => {
				COLLECT(value);
            },false);
        }
    }
    
    // 导出的模块一定要有一个静态的 install的方法， Vue.use(module) 会执行到
    static install(Vue) {
        console.log('执行安装');
        Vue.directive('vascollect', new Collect()); 		// 这里也可以写成对象的形式
    }
}
```



## 使用Vue.use安装

使用Vue.use的形式使用，使其Vue项目更加规范化

`main.js`

```javascript
import Vue from 'vue'
import Collect from '@/directives/collect';	// 自定义指令
Vue.use(Collect) 		// 注册自定义指令
```



### 使用

通过collect点击时上报 数据埋点事件

```vue
<button v-collect:close_vip.click.stop="{ title: "关闭弹窗"} ">Submit</button>
```





