---
title: 有趣并实用的 JavaScript操作 😲

date: 2020-03-16 00:28:23
categories:
 - 代码片段

tags:
    - Javascript
---

想来搞前端也快2年时间来，想起在刚开始写Javascript的时候，总是能遇见一些奇奇怪怪的问题, 和一些让人 WTF的操作，后面越来越深入的了解到这门语言后，一些令人摸不着头脑东西也就明白为什么会这样了, 
这里也是记录一些好玩好用的JavaScript的片段，也算是一种输出吧

---


### 将多维数组变成一维数组

~~~javascript
let str = [1,2,[3,4,5,6,7],[8,[10,9]]];

// 方法1
str.join().split(',');	 // ["1", "2", "3", "4", "5", "6", "7", "8", "10", "9"]
str.join(',').split(',');	 // ["1", "2", "3", "4", "5", "6", "7", "8", "10", "9"]

// 方法2 - es6
str.flat(Infinity);				// ["1", "2", "3", "4", "5", "6", "7", "8", "10", "9"]
~~~



### 判断是否空对象

~~~JavaScript
let isEmptyObject = function(obj) {
  for(let k in obj) {
  	return false;
  }
  return true;
};

// 更加简单的办法
let isEmptyObj = Object.keys(obj).length === 0;
~~~



### 判断是否是空数组

~~~JavaScript
let arr = [];
Array.isArray(arr) && arr.length !== 0;
~~~



### 向下取整的几种简写方式

~~~JavaScript
~~2.33			// 2

2.33 | 0		// 2

2.33 >> 0		// 2

2.33 << 0 	// 2

2.33 ^ 0		// 2
~~~



### 取随机字符串

> 原理就是将随机转成字符串(11 ~ 36)进制字符串（10进制以上开始出现字母），然后截取去掉小数位

~~~JavaScript
let str = Math.random().toString(16).substring(2);
let str2 = Math.random().toString(32).substring(2);	
console.log(str) // 02f3a8227c04b
console.log(str2) // hs9lje959eg
~~~



### 一行代码评级组件

> 用法："★★★★★☆☆☆☆☆".slice(5 - num, 10 - num);  num的值在1 ~ 5之间

![](http://cdn.chrischen.top//Markdown/一行代码评级组件.png)

上面的方法只能实现整数，那如何实现小数评级呢？

~~~html
<div class="box" data-attr="after"></div>
~~~

~~~css
.box:after{ content: attr(data-attr); color: #0C68F7; }
~~~

~~~javascript
$('.after').attr('data-attr','★★★★☆')		// 把刚出的字符串动态设置在这里
~~~

查看 css ::after (:after) 属性👉🏿：[Web 开发技术CSS（层叠样式表）::after (:after)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)



### 统计字符串中相同字符出现的次数

~~~javascript
let str = 'abcdaabc';

let result = arr.split('').reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(result); //{ a: 3, b: 2, c: 2, d: 1 }
~~~



### 😂立即执行函数的几种写法.....

~~~javascript
( function() {}() );
( function() {} )();
[ function() {}() ];
~ function() {}();
! function() {}();
+ function() {}();
- function() {}();
delete function() {}();
typeof function() {}();
void function() {}();
new function() {}();
new function() {};
var f = function() {}();
1, function() {}();
1 ^ function() {}();
1 > function() {}();
~~~


### DOM调试模式

~~~JavaScript
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
~~~
