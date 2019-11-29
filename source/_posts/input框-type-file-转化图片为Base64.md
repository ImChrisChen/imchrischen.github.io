---
title: input框 type=file 转化图片为Base64
date: 2019-11-28 22:08:51
tags:
 - html
 - Javascript
---
本文例子是在Vue-cli项目中使用的

---


##### html

```html
<input @change="handleChangeInputFile" ref="InputFile" type="file" accept="image/*">
```

##### Javascript

```javascript
handleChangeInputFile(e) {
  // input调用原声相册后获取到文件对象
  let file = this.$refs.InputFile.files[0]; 
  
	//https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
  let reader = new FileReader()
  let filename = file.name.replace(/\.(.*)/g, '')
  let self = this;
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    // this.result 就是图片的base64
    self.uploadBase64Image(this.result, filename).then(url => {
      self.$emit('handleAddImage', url, 'photo');
    })
  }
},
```
