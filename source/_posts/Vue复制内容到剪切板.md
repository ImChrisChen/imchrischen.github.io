---
title: Vue复制内容到剪切板
date: 2020-03-13 18:33:20
tags:
    - Vue 
    - npm
---

# Vue复制内容到剪切板

### 1. 安装插件

~~~bash
npm install vue-clipboard2 --save-dev
~~~



### 2. 引入插件

~~~JavaScript
//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
~~~



### 3. 使用示例

~~~JavaScript
<p id="gift_code">礼包码：{{ code }}</p>	
<div class="copy_btn code_text"
    v-clipboard:copy="code"
    v-clipboard:success="handleCopyGiftCode"		// 复制失败触发
    v-clipboard:error="handleCopyError">			// 复制成功触发
</div>
~~~


