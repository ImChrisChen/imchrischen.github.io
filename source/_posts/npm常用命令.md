#  NPM | NRM



### 查看那些npm包可以更新

~~~bash
npm -g outdated		// 加上 -g 代表全局 global
~~~



### 查看当前用户

~~~shell
npm whoami
~~~



### 更新npm模块

#### 安装npm-check-updates模块

~~~shell
// 全局安装 npm-check-updates
npm install -g npm-check-updates
~~~

#### 检查可更新模块

~~~shell
npm-check-updates
//也可以使用简写
ncu
~~~

#### 模块更新

~~~shell
ncu -u && npm install
//或者
 npm update 模块名
~~~



### 查看全局包的位置

~~~shell
npm root -g
~~~



### 发布 | 更新 npm模块

~~~shell
npm publish
~~~



### 撤回已发布的npm包

**操作限制**

1. 根据规范，只有在发包的**24小时内才允许**撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours）
2. **即使**你撤销了发布的包，**发包的时候也不能再和被撤销的包的名称和版本重复了**（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

~~~
npm unpublish dalan_ui_pc
npm unpublish dalan_ui_pc --force 强制撤销
~~~



### nrm 添加源

~~~shell
nrm add dl_npm http://npm.superdalan.com/
~~~



### npm自动更新版本号

[参考链接](https://blog.csdn.net/znyaiw/article/details/80199457)

https://blog.csdn.net/znyaiw/article/details/80199457

>版本号递增规则：
>\- 主版本号( major )：做了不兼容修改或颠覆式的重写
>\- 次版本号( minor )：向下兼容的功能性新增
>\- 修订号( patch )：向下兼容的问题修正

~~~shell
 npm version patch -m '修复xxxx'
~~~

