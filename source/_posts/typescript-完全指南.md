---
title: typescript 完全指南
date: 2021-07-29 14:44:03
tags:
	- Typescript
---



## 前言

这篇文章总结一下平时使用到 typescript 的问题，和一些高级用法



## 泛型 Genericity

> 理解泛型就两个字：**传型**, 如果和函数做类比，那范型就是函数的参数，可以传入任意类型的参数

最常见的`Array`类型就是使用了泛型

**在函数中使用**

```typescript
Array.prototype.delete = function <T>(index: number): T {
  return this.splice(index, 1)[0];
}

const arr = [1, 2, 3, 4]

arr.delete<number>(1) // 2

const arr2 = ['a', 'b', 'c', 'd']
arr2.delete<string>(1) // 'b'
```

**在interface中使用**

```typescript
interface IBase<T> {
  name: T
}

let base: IBase<string> = {
  field: 'Chris'
}

let base2: IBase<number> = {
  field: 18
}
```


## interface 和 type
为什么要把`interface` 和 `type` 放在一起呢，因为他们两个都有相似指出，但是又有不同的地方


### interface
`interface`在TypeScript中用于定义对象的形状（shape），即对象应该有哪些属性以及它们的类型。接口是一种强大的方式来定义一个对象可以执行的操作和它应当具有的结构。接口通常用来定义对象的规范，以及类或对象必须实现的方法和属性。

```typescript

interface Person {
  name: string;
  age: number;
  greet(): void;
}


```

在上面的例子中，任何实现了`Person`接口的对象都必须有一个string类型的name属性、一个number类型的age属性，以及一个返回void的greet方法。

接口可以被继承和扩展，允许你创建新的接口，基于一个或多个现有的接口。

### type

type是TypeScript中的类型别名，用于给一个类型起一个新的名字。它可以用来定义一个类型可以是什么。类型别名不仅仅可以用来定义对象的形状，还可以用来定义并集、交集、原始类型、元组、数组等。

```typescript
type Greeting = "Hello" | "Hi" | "Hey";
type ID = string | number;
type User = {
  name: string;
  id: ID;
};

```

在上面的例子中，Greeting是一个类型别名，它可以是三个特定的字符串中的一个；ID是一个可以是string或number的类型别名；User是一个对象的类型别名，有name和id属性。

**type和interface的区别：**

相同点：
- 都可以用来描述对象或函数的类型。
- 都可以在TypeScript中用来实现类型检查和智能感知。


**不同点：**
- interface可以被继承和扩展，而type不能。但type可以通过交集和并集操作创建新的类型。
- type可以用于定义其他类型的组合，比如联合类型、元组类型等，而interface通常不用于这些目的。
- type可以是任何有效的类型，包括基础类型、联合类型、交集类型、元组等，而interface主要用于定义对象的形状或行为。


**使用场景**

`interface`适用场景：
- 当你需要定义一个对象的结构，尤其是当对象有可能被多个不同的类实现时。
- 当你需要通过继承来扩展现有的接口。
- 当你想要一个明确的合约来指定一个类必须实现哪些方法和属性时。

`type`适用场景：
- 当你需要定义类型的并集或交集。
- 当你想要定义元组、映射类型或其他复杂的类型结构。
- 当你需要一个类型别名来简化复杂的类型表达式。
- 在实际应用中，`interface`和`type`可以互换使用，选择使用哪一个很大程度上取决于个人或团队的偏好，以及具体的使用场景。有些团队可能更倾向于使用interface来定义对象的形状，因为它更加正式，表达了一种契约的概念；而另一些团队可能更偏好type的灵活性。在某些情况下，最佳实践可能是结合使用这两者的特点。


在实际应用中，`interface`和`type`可以互换使用，选择使用哪一个很大程度上取决于个人或团队的偏好，以及具体的使用场景。有些团队可能更倾向于使用interface来定义对象的形状，因为它更加正式，表达了一种契约的概念；而另一些团队可能更偏好type的灵活性。在某些情况下，最佳实践可能是结合使用这两者的特点。


## implements

Implements 是一个用来描述类的关键词

```typescript
interface BasePerson {
  name: string;
  age: number

  walk(speed)
}

class Person implements BasePerson {
  name: 'Chris';
  age: 18;
  walk(speed) {
  }
}
```


## 交叉类型 , 联合类型

### 交叉类型 (并集) &

> 可以理解为，取两个类型的并集

**语法 `TypeA & TypeB`**

代码示例：

```typescript
type Person1 = {
  name: string
  sex: number
}

type Person2 = {
  name: string
  age: number
}

// 联合类型
let cross: Person1 & Person2 = {
  name: 'Chris',
  age : 18,
  sex : 1,
};
```



### 联合类型 |

**语法 `typeA | typeB`**

```typescript

// 字符串联合类型写法
type A = 'A'
type B = 'B'

let str1: A | B = 'A';
let str2: A | B = 'B';

//---------------------------------------------
  
// 对象联合类型写法
interface InterfaceA {
  name: string
  sex: number
}

interface InterfaceB {
  name: string
  age: number
}

let person2: InterfaceA | InterfaceB = {
  name: 'Chris',
  age : 18,
  sex : 1,
};
```

## 内置类型

Typescript 除了内置的基本数据类型，还有一些内部封装好的的类型，这些类型可以帮助我们更好的编写代码

### ReturnType<T>
提取函数类型 T 的返回类型。
```typescript
function f1(): number { return 0; }
type T0 = ReturnType<typeof f1>; // number
```

### Partial<T>
将类型 T 的所有属性变为可选的。
```typescript
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
```

### Required<T> 
将类型 T 的所有属性变为必选的。

```typescript
interface Props {
  a?: number;
  b?: string;
}
const obj: Required<Props> = { a: 5, b: 'Hello' }; // 正确
```

### Readonly<T>

```typescript
interface Todo {
  title: string;
}
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
todo.title = "Hello"; // 错误，title 是只读的
```


### Pick<T, K>
从类型 T 中挑选某些属性 K 来构造类型。
```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
```

### Record<K, T>
创建一个类型，其键是 K，值是 T。
```typescript
type PageOptions = Record<'home' | 'about' | 'contact', { title: string }>;
```

### Exclude<T, U>
从类型 T 中排除可以赋给 U 的所有属性。
```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
```


### Extract<T, U>
从类型 T 中提取可以赋给 U 的所有属性。
```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

### Omit<T, K>
从类型 T 中剔除键 K。
```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
```

### NonNullable<T> 
从类型 T 中排除 null 和 undefined

```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
```

### Parameters<T>
提取函数类型 T 的参数类型组成一个元组类型。
```typescript
function f1(arg1: number, arg2: string): void {}
type T0 = Parameters<typeof f1>; // [number, string]
```

### InstanceType<T>
获取构造函数类型的实例类型。
```typescript
class C {
  x = 0;
  y = 0;
}
type T0 = InstanceType<C>; // C
```

### Uppercase<StringType>
将字符串类型中的每个字符转换为大写形式。
```typescript
type T = Uppercase<'hello'>; // 'HELLO'
```

### Lowercase<StringType>
将字符串类型中的每个字符转换为小写形式。
```typescript
type T = Lowercase<'HELLO'>; // 'hello'
```

### Capitalize<StringType>
将字符串类型中的第一个字符转换为大写形式。
```typescript
type T = Capitalize<'hello'>; // 'Hello'
```

### Uncapitalize<StringType>
将字符串类型中的第一个字符转换为小写形式。
```typescript
type T = Uncapitalize<'Hello'>; // 'hello'
```

## 高阶使用

### typeof  (typescript中的typeof)

语法：`typeof <variable>`  

例子：`typeof window` 获取window的类型

**ts中的typeof是获取目标对象的类型**（可以动态的推断类型）

```typescript
let SystemMap = {
  MacOS  : 1,
  Linux  : 2,
  Windows: 3,
};

type System = typeof SystemMap

// 此时的System的type为
interface {
	Linux: number
    MacOS: number
    Windows: number
}
```


### keyof ，用typeof获取对象的所有key的联合类型

语法：`keyof <Type>`  

例子：`keyof Object`  获取Object的所有 key 的字符串的联合类型

如果配置`keyof` 使用，就可以得到 `Linux,MacOS,Windows` 这几种类型的字符串key值了

```typescript
let SystemMap = {
  MacOS  : 1,
  Linux  : 2,
  Windows: 3,
};

// System 的类型为： "Linux" | "MacOS" | "Windows"
type System = keyof typeof SystemMap
```



### in 操作符

语法：`[k in Keys]`

例子：`[k in 'Linux' | 'MacOS' | 'Windows' ]`  在type中使用，k 表示被遍历的对象

注意：**in操作符只在type中可以使用**

**in操作符号约束声明对象的 key 和 value **

```typescript
let SystemMap = {
  MacOS  : 1,
  Linux  : 2,
  Windows: 3,
};

type System = keyof typeof SystemMap

// 约定对象的 key 值要在 System 中
type Systems = {
  [k in System]: SystemMap
}

let s: Systems = {
  MacOS  : 100,
  Linux  : 100,
  Windows: 100,
};
```



### typeof 实现取 对象 key , value 类型的联合类型

```typescript
let systemMap = {
  MacOS  : 'macos',
  Linux  : 200,
  Windows: 'windows',
};

type Keys = keyof typeof systemMap 	// "Linux" | "MacOS" | "Windows"

type Values = typeof systemMap[Keys]  // number | string
```



### 取interface的 value的联合类型

```typescript
let systemMap = {
  MacOS  : 'macos',
  Linux  : 200,
  Windows: 'windows',
};

type Keys = keyof systemMap		// "MacOS" | "Linux" | "Windows"

type Values = systemMap[Keys]	// 200 | "macos" | "windows"
```


## tsconfig.json 配置速查表

```
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* target用于指定编译后js文件里的语法应该遵循哪个JavaScript的版本的版本目标: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* 用来指定编译后的js要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "lib": ["es6", "dom"] /* lib用于指定要包含在编译中的库文件 */,
    "allowJs": true,                       /* allowJs设置的值为true或false，用来指定是否允许编译js文件，默认是false，即不编译js文件 */
    "checkJs": true,                       /* checkJs的值为true或false，用来指定是否检查和报告js文件中的错误，默认是false */
    "jsx": "preserve",                     /* 指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* declaration的值为true或false，用来指定是否在编译的时候生成相应的".d.ts"声明文件。如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件。但是declaration和allowJs不能同时设为true */
    "declarationMap": true,                /* 值为true或false，指定是否为声明文件.d.ts生成map文件 */
    "sourceMap": true,                     /* sourceMap的值为true或false，用来指定编译时是否生成.map文件 */
    "outFile": "./",                       /* outFile用于指定将输出文件合并为一个文件，它的值为一个文件路径名。比如设置为"./dist/main.js"，则输出的文件为一个main.js文件。但是要注意，只有设置module的值为amd和system模块时才支持这个配置 */
    "outDir": "./",                        /* outDir用来指定输出文件夹，值为一个文件夹路径字符串，输出的文件都将放置在这个文件夹 */
    "rootDir": "./",                       /* 用来指定编译文件的根目录，编译器会在根目录查找入口文件，如果编译器发现以rootDir的值作为根目录查找入口文件并不会把所有文件加载进去的话会报错，但是不会停止编译 */
    "composite": true,                     /* 是否编译构建引用项目  */
    "incremental": true,                   /* Enable incremental compilation */
    "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    "removeComments": true,                /* removeComments的值为true或false，用于指定是否将编译后的文件中的注释删掉，设为true的话即删掉注释，默认为false */
    "noEmit": true,                        /* 不生成编译文件，这个一般比较少用 */
    "importHelpers": true,                 /* importHelpers的值为true或false，指定是否引入tslib里的辅助工具函数，默认为false */
    "downlevelIteration": true,            /* 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持 */
    "isolatedModules": true,               /* isolatedModules的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定 */

    /* Strict Type-Checking Options */
    "strict": true /* strict的值为true或false，用于指定是否启动所有类型检查，如果设为true则会同时开启下面这几个严格类型检查，默认为false */,
    "noImplicitAny": true,                 /* noImplicitAny的值为true或false，如果我们没有为一些值设置明确的类型，编译器会默认认为这个值为any，如果noImplicitAny的值为true的话。则没有明确的类型会报错。默认值为false */
    "strictNullChecks": true,              /* strictNullChecks为true时，null和undefined值不能赋给非这两种类型的值，别的类型也不能赋给他们，除了any类型。还有个例外就是undefined可以赋值给void类型 */
    "strictFunctionTypes": true,           /* strictFunctionTypes的值为true或false，用于指定是否使用函数参数双向协变检查 */
    "strictBindCallApply": true,           /* 设为true后会对bind、call和apply绑定的方法的参数的检测是严格检测的 */
    "strictPropertyInitialization": true,  /* 设为true后会检查类的非undefined属性是否已经在构造函数里初始化，如果要开启这项，需要同时开启strictNullChecks，默认为false */
   "noImplicitThis": true,                /* 当this表达式的值为any类型的时候，生成一个错误 */
    "alwaysStrict": true,                  /* alwaysStrict的值为true或false，指定始终以严格模式检查每个模块，并且在编译之后的js文件中加入"use strict"字符串，用来告诉浏览器该js为严格模式 */

    /* Additional Checks */
    "noUnusedLocals": true,                /* 用于检查是否有定义了但是没有使用的变量，对于这一点的检测，使用eslint可以在你书写代码的时候做提示，你可以配合使用。它的默认值为false */
    "noUnusedParameters": true,            /* 用于检查是否有在函数体中没有使用的参数，这个也可以配合eslint来做检查，默认为false */
    "noImplicitReturns": true,             /* 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示，默认为false */
    "noFallthroughCasesInSwitch": true,    /* 用于检查switch中是否有case没有使用break跳出switch，默认为false */

    /* Module Resolution Options */
    "moduleResolution": "node",            /* 用于选择模块解析策略，有'node'和'classic'两种类型' */
    "baseUrl": "./",                       /* baseUrl用于设置解析非相对模块名称的基本目录，相对模块不会受baseUrl的影响 */
    "paths": {},                           /* 用于设置模块名称到基于baseUrl的路径映射 */
    "rootDirs": [],                        /* rootDirs可以指定一个路径列表，在构建时编译器会将这个路径列表中的路径的内容都放到一个文件夹中 */
    "typeRoots": [],                       /* typeRoots用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
    "types": [],                           /* types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来 */
    "allowSyntheticDefaultImports": true,  /* 用来指定允许从没有默认导出的模块中默认导入 */
    "esModuleInterop": true /* 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性 */,
    "preserveSymlinks": true,              /* 不把符号链接解析为其真实路径，具体可以了解下webpack和nodejs的symlink相关知识 */

    /* Source Map Options */
    "sourceRoot": "",                      /* sourceRoot用于指定调试器应该找到TypeScript文件而不是源文件位置，这个值会被写进.map文件里 */
    "mapRoot": "",                         /* mapRoot用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性 */
    "inlineSourceMap": true,               /* 指定是否将map文件的内容和js文件编译在同一个js文件中，如果设为true，则map的内容会以//# sourceMappingURL=然后拼接base64字符串的形式插入在js文件底部 */
    "inlineSources": true,                 /* 用于指定是否进一步将.ts文件的内容也包含到输入文件中 */

    /* Experimental Options */
    "experimentalDecorators": true /* 用于指定是否启用实验性的装饰器特性 */
    "emitDecoratorMetadata": true,         /* 用于指定是否为装饰器提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引入ES2015.Reflect这个库 */
  }
  "files": [], // files可以配置一个数组列表，里面包含指定文件的相对或绝对路径，编译器在编译的时候只会编译包含在files中列出的文件，如果不指定，则取决于有没有设置include选项，如果没有include选项，则默认会编译根目录以及所有子目录中的文件。这里列出的路径必须是指定文件，而不是某个文件夹，而且不能使用* ? **/ 等通配符
  "include": [],  // include也可以指定要编译的路径列表，但是和files的区别在于，这里的路径可以是文件夹，也可以是文件，可以使用相对和绝对路径，而且可以使用通配符，比如"./src"即表示要编译src文件夹下的所有文件以及子文件夹的文件
  "exclude": [],  // exclude表示要排除的、不编译的文件，它也可以指定一个列表，规则和include一样，可以是文件或文件夹，可以是相对路径或绝对路径，可以使用通配符
  "extends": "",   // extends可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置，继承来的文件的配置会覆盖当前文件定义的配置。TS在3.2版本开始，支持继承一个来自Node.js包的tsconfig.json配置文件
  "compileOnSave": true,  // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
  "references": [],  // 一个对象数组，指定要引用的项目
}
```
