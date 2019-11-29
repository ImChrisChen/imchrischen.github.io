---
title: Contenteditable 设置placeholder属性
date: 2019-11-28 21:48:39
tags: 
 - html
 - css
---

###### HTML

```html
<div class="textarea" contenteditable="true" placeholder="请输入补充说明"></div>
```

###### CSS

```less
.textarea {
  width: 100%;
  min-height: 210px;

  &:empty:before {
    content: attr(placeholder); 		//设置attr属性，使placeholder属性生效
    color: rgba(170, 159, 159, 1);
  }
  &:focus:before{
    content:none;
  }	
}
```
