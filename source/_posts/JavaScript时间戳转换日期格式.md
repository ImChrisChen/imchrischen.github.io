---
title: JavaScript时间戳转换日期格式
date: 2019-07-21 18:22:34
tags: 
      - Javascript
      - 常用封装
---

~~~javascript
export const dateFormat = (stamp, format) => {
    const d = new Date(stamp);
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const numberFormat = (number) => number < 10 ? `0${number}` : number;

    format = format.replace(/yyyy|YYYY/, d.getFullYear());
    format = format.replace(/yy|YY/, d.getYear());
    format = format.replace(/MM/, numberFormat(month));
    format = format.replace(/M/, month);
    format = format.replace(/dd/, numberFormat(date));
    format = format.replace(/d/, date);
    format = format.replace(/hh|HH/, numberFormat(hours));
    format = format.replace(/h|H/, hours);
    format = format.replace(/mm/, numberFormat(minutes));
    format = format.replace(/m/, minutes);
    format = format.replace(/ss/, numberFormat(seconds));
    format = format.replace(/s/, seconds);
    return format;
}
~~~
