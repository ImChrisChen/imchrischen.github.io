---
title: vue-awesome-swiper 自定义分页器样式
date: 2019-11-29 11:04:32
tags:
 - Vue
 - css
 - npm
---

#### `！！！注意！！！ style 标签里要把 scoped 属性去掉,这样才能继承到子组件，否则自定义样式不会生效`

##### html
---
```html
<swiper :options="swiperOption">
  <swiper-slide v-for="(EmojiList,index) in EmojiLists" class="swiper_slide">
    <img v-for="(Emoji,subIndex) in EmojiList" :src="Emoji.url">
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
```
##### Javascript
---
```javascript
<script>
  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'my-bullet', 			// 分页器每一项class
            bulletActiveClass: 'my-bullet-active',	// 当前选中的class 
          }
        },
      }
    }
  }
</script>
```

##### css
```less
<style lang="less">
  .swiper-pagination {
    .my-bullet {
      height: 17px;
      width: 17px;
      background: #F2F4F6;
      border: 1px solid #192A51;
      box-sizing: border-box;
      display: inline-block;
      border-radius: 50%;
      margin-right: 8px;
      
      &:last-child {
        margin-right: 0;
      }
    }

    .my-bullet-active {
      background: #26A9ED;
    }
  }
</style>
```

##### 效果图
---
![](http://cdn.chrischen.top//Markdown/表情包分页器样式.png)



