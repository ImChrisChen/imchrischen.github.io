---
title: "Javascript 的神仙操作\U0001F602\U0001F602\U0001F602"
date: 2019-08-16 01:39:58
tags:
 - Javascript
notshow: true
---

### 向下取整的几种骚操作

~~~JavaScript
Number.parseInt(1.618);
~~~


~~~JavaScript
~~1.618					// 1
~~~

~~~JavaScript
1.618 >> 0				// 1
~~~

~~~JavaScript
1.618 | 0				// 1
~~~

~~~JavaScript
1.618 ^ 0				// 1
~~~

