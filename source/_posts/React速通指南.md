---
title: React速通指南
date: 2024-04-07 00:52:55
tags:
  - React
---

## useEffect使用

**使用注意事项：**

- 只能在React函数组件中调用Hook
- 只在最顶层使用Hook
- 不能在if，for，switch等流程语句中使用

**传递依赖的三种情况:**

- **不传递依赖项数组（每次组件渲染都会执行，相当于componentDidUpdate）**
- 传递一个空数组作为依赖 `[]` (相当于`componentDidMount`)
- 传递一个或者多个值作为依赖（每次依赖的值变换后会重新执行回掉函数）

**示例:**

```typescript jsx
function App() {
  // case 1 (ike componentDidMount)
  useEffect(() => {

  }, [])


  // case 2 (componentDidUpdate)
  useEffect(() => {

  })

  // case 3 (like vue3 watch, count change with exec Do something )
  const [count, setCount] = useState(0)
  useEffect(() => {
    // Do something
  }, [count])
}
```

## 其他常见Hook用法

### useState 原理

待补充

### useRef 使用

`useRef` 是 React 的一个 Hook，它能够在函数组件中存储一个可变的引用对象，该对象在组件的整个生命周期内保持不变。`useRef` 常用于以下几种情况：

1. **访问 DOM 元素**：当你需要直接访问 DOM 元素时，可以使用 `useRef` 创建一个引用，并将其赋给元素的 `ref` 属性。这样，你就可以在组件中直接控制和访问该 DOM 元素。

2. **保存可变值**：如果你需要在组件的渲染周期之间保持一个可变的值，而这个值不应该触发组件的重新渲染，`useRef` 可以用来保存这个值。

下面是一些示例来说明 `useRef` 的使用：

#### 示例 1：访问 DOM 元素

```jsx
import React, { useEffect, useRef } from 'react';

function TextInputWithFocusButton() {
  // 创建一个 ref 来存储 textInput 的 DOM 元素
  const textInput = useRef(null);

  // 点击按钮时将焦点设置到 input 元素上
  const focusTextInput = () => {
    // 直接访问 DOM 元素，并调用其 focus 方法
    textInput.current.focus();
  };

  return (
    <div>
      <input type="text" ref={textInput} />
      <button onClick={focusTextInput}>Focus the text input</button>
    </div>
  );
}

export default TextInputWithFocusButton;
```

#### 示例 2：保存可变值

```jsx
import React, { useState, useRef, useEffect } from 'react';

function TimerComponent() {
  // 用于显示计数器的 state
  const [count, setCount] = useState(0);
  // 使用 useRef 保存计数器的间隔 ID，不会触发重新渲染
  const intervalRef = useRef(null);

  // 开始计数器
  const startTimer = () => {
    // 设置间隔，并保存间隔 ID 到 ref
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  // 停止计数器
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  // 组件卸载时清除计时器
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // 空依赖数组确保 effect 只在组件挂载和卸载时运行

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default TimerComponent;
```

在上面的计数器示例中，`intervalRef` 被用来保存定时器的 ID。这个 ID 是可变的，但是我们不希望它的改变导致组件的重新渲染，因此使用 `useRef` 来存储它是非常合适的。

总结一下，`useRef` 是一个非常有用的钩子，它能够帮助你在函数组件中管理 DOM 引用和存储跨渲染周期的可变值。

### useMemo 使用

介绍：useMemo 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。
作用：如果useMemo的依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用回掉函数，并返回最新结果。

> PS: 类似Vue3的computed方法

```typescript jsx
function App() {
  const [count, setCount] = useState(100)
  const [count2, setCount2] = useState(200)

  const memoizedValue = useMemo(() => {
    return count + count2
  }, [count, count2]);


  const handleAdd = () => setCount(count + 1)
  useEffect(() => {
    console.log('memoizedValue', memoizedValue)
  }, [memoizedValue]);
}
```

### memo 使用

介绍：React.memo 是一个高阶组件，用于包裹函数组件
作用：当函数组件的Props没有发生变化时，React.memo 将会使用之前渲染的结果，从而避免不必要的重新渲染

```typescript jsx
const Greeting = memo(function Greeting({name}) {
  return <h1>Hello, {name}!</h1>;
});

export function App() {
  return <Greeting name={'Chris'}/>
}

```

#### React.memo和 PureComponent的区别？

React.memo 和 PureComponent 都是用于优化 React 应用性能的手段，它们通过减少不必要的渲染来提高组件的渲染效率。尽管它们的目的相同，但它们适用于不同类型的组件，并且内部比较的方式有所不同。

#### React.memo

React.memo 是一个高阶组件，它的作用是对函数组件进行性能优化。当组件的props没有发生变化时，React.memo 会阻止组件的重新渲染。React.memo
默认仅对props进行浅层比较，也就是说，**它只会检查props的一级属性是否相等**，如果一级属性都没有发生变化，那么组件就不会重新渲染。

如果你需要进行更深层次的比较，React.memo 允许你提供一个自定义的比较函数作为第二个参数，这个函数接收前后两次的props，并返回一个布尔值，指示它们是否相等。

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
}, areEqual);
```

#### PureComponent

PureComponent 是一个类组件，它继承自 React.Component。与 React.memo 类似，PureComponent
也会在组件的props或者state发生变化时才会进行重新渲染。不同的是，PureComponent
会对组件的props和state进行浅层比较，这意味着只有当props或state的一级属性发生变化时，组件才会重新渲染。

使用 PureComponent 可以通过继承 PureComponent 类来创建组件：

```jsx
class MyComponent extends React.PureComponent {
  render() {
    // render logic
  }
}
```

#### 区别总结

- 应用范围：React.memo 用于函数组件，而 PureComponent 用于类组件。
- 比较方式：React.memo 和 PureComponent 都默认进行浅层比较，但 React.memo 可以通过第二个参数传入自定义比较函数实现深层比较。
- 比较内容：PureComponent 会比较state和props，而 React.memo 只比较props。

选择使用 React.memo 还是 PureComponent 取决于你使用的组件类型（函数组件还是类组件）以及你对性能优化的需求。在大多数情况下，这两种方法可以有效减少不必要的渲染，从而提升应用的性能。

### useCallback 使用

介绍：`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。

**作用**：常用于减少不必要的子组件渲染，特别是当回掉函数作为props传递给子组件时

**案例**：如果`count`发生变化(useCallback的依赖)，`handleIncrement`会被重新创建，如果`count`没有改变，即便`MyComponent`
组件被重新渲染，`handleIncrement`  的引用也会保持不变

简而言之，useCallback 在多次组件渲染中缓存一个函数，直至这个函数的依赖发生改变。

```typescript jsx
import React, { useState, useCallback } from 'react';

function MyComponent({onButtonClick}) {
  const [count, setCount] = useState(0);

  // 使用 useCallback 来记忆化这个回调函数
  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]); // count 改变时，handleIncrement 会被重新创建

  return (
    <div>
      Count: {count}
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
}
```

### useContext 使用

useContext 是一个 React Hook，可以让你读取和订阅组件中的 context。

useContext不限层级传递数据

```typescript jsx

// App.tsx
import { createContext, useState } from 'react'

const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark'); // 假设你要传递的主题是 'dark'

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ChildComponent changeTheme={handleChangeTheme}/>
    </ThemeContext.Provider>
  );
}

function ChildComponent({changeTheme}) {
  const theme = useContext(ThemeContext); // 直接访问 ThemeContext 的值

  return <>
    <div>The current theme is: {theme}</div>
    <button onClick={changeTheme}>toggle theme</button>
  </>
}

export default App;
```

### useReducer 使用

useReducer 返回的 dispatch 函数允许你更新 state 并触发组件的重新渲染。它需要传入一个 action 作为参数

并且dispatch 函数没有返回值。

```typescript jsx
import { useReducer } from 'react'

// 需要实现一个 reducer函数, 在这里实现action操作
function reducer(state = {age: 0}, action: { type: 'incremented_age' }) {
  switch (action.type) {
    case 'incremented_age':
      return {
        age: state.age + 1
      };
    default:
      throw Error('Unknown action.');
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, {age: 42});

  return (
    <>
      <button onClick={() => {
        dispatch({type: 'incremented_age'})
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}

```

## Suspense 组件

React Suspense 是 React 中的一个功能，它允许组件“等待”某些内容加载，并在加载时显示一个备用的
UI。这对于提升用户体验是非常有用的，特别是在加载数据或代码时可以显示一个加载指示器，而不是一个空白屏幕或者是一个突然跳出的内容。

Suspense 最初是在 React 16.6 版本中引入，主要用于支持 React.lazy，这是一个允许你动态加载组件的函数。随后，React 团队扩展了
Suspense 的能力，用于支持数据获取等异步操作。

### 使用 React.lazy 和 Suspense

React.lazy 函数允许你动态导入一个组件，并将其作为一个正常组件渲染。使用 Suspense 可以在组件加载时渲染备用内容，如下所示：

```jsx
import React, { Suspense, lazy } from 'react';

// 使用 React.lazy 动态导入组件
const SomeComponent = lazy(() => import('./SomeComponent'));

function MyComponent() {
  return (
    // 使用 Suspense 包裹懒加载的组件
    <Suspense fallback={ <div>Loading...</div> }>
      <SomeComponent/>
    </Suspense>
  );
}

export default MyComponent;
```

在上面的例子中，`SomeComponent` 是一个懒加载组件，`fallback` 属性接收的是在组件加载期间展示的 JSX。当 `SomeComponent`
正在被加载时，用户会看到一个文本 "Loading..."。

### 使用 Suspense 进行数据获取

从 React 18 开始，Suspense 开始支持数据获取场景。

```jsx

function MyComponent() {
  return (
    <Suspense fallback={ <div>Loading data...</div> }>
      <DataComponent/>
    </Suspense>
  );
}

function DataComponent({resource}) {
  useEffect(async () => {
    // 假设有一个 fetchData 函数可以异步获取数据
    const data = await getAsyncData();
  }, []);
  // 渲染数据
  return <div>{ data }</div>;
}
```

请记住，这种数据获取的方式尚处于实验阶段，并且 React 团队可能会在未来的版本中对其进行调整或完全替换。

### 总结

React Suspense 是一个用于提高用户体验的功能，它允许你在组件加载或数据获取时显示一个备用的 UI。随着 React 的发展，Suspense
正在变得越来越强大，支持更多的异步场景。不过，如果你打算用于生产环境，建议关注 React 官方的更新，因为相关 API 还在不断演进中。

## React合成事件和原生事件有什么区别？

React合成事件（SyntheticEvent）是React为了跨浏览器兼容性而模拟的浏览器原生事件系统。React合成事件和原生的DOM事件有一些不同之处，以及它们带来的好处：

1. 跨浏览器兼容性：
   合成事件抽象了底层的DOM事件系统，提供了一致的事件对象，无论用户使用什么浏览器。这意味着开发者不需要考虑各种浏览器的事件兼容性问题，React已经为你处理了这部分。

2. 事件委托：
   React使用单一的事件监听器来处理所有的事件，即事件委托。这意味着所有的事件都会被委托到最外层的元素（通常是`document`
   ），并由React内部管理。这种方式可以减少内存消耗，提高性能，尤其是在处理大量DOM元素时。

3. 自动清理：
   在组件卸载时，React会自动清理组件的事件监听器，这减少了内存泄漏的风险，也使得资源管理更加方便。

4. 事件池（Event Pooling）：
   出于性能考虑，React会重用事件对象，将它们放入一个“池”中，并在事件回调函数被调用后清空它们的属性。这意味着你不能异步访问事件对象，除非你调用了`event.persist()`
   方法，它会将事件对象从池中移出，使其在回调之后仍然可以使用。

5. 一致的属性名：
   React合成事件对象提供的属性和方法名称都遵循驼峰命名法，而不是原生事件中的全部小写，使得代码风格更加统一。

6. 更好的集成React特性：
   合成事件天然地和React的状态更新、生命周期方法等特性整合得很好，使得在React生态中处理事件更加自然和高效。

虽然React合成事件提供了很多好处，但也有时你可能需要直接访问原生事件。在React中，你可以通过`event.nativeEvent`
属性访问到底层的原生事件对象。这样，如果你需要一些合成事件没有提供的特定信息，你仍然可以访问到这些信息。

## 受控组件和非受控组件的区别?

## React 性能优化

- 合理拆分组件颗粒度，减少整个组件渲染
- 使用React.memo，PureCompoent，useMemo，useCallback等方式进行组件优化
- 使用Suspense和React.lazy来进行懒加载和异步组件加载
- 使用React.lazy进行路由懒加载

## React Fiber 架构

React Fiber 是 React 16.8 中引入的新的核心算法，它是对 React 核心算法的重写。目的是提高其在渲染大型应用程序时的性能和响应性。Fiber
架构旨在解决以前的堆栈重绘(stack reconciliation)算法在动画、布局和手势等连续性交互方面的不足。

这里有几个关键点来帮助理解 React Fiber 架构：

1. **增量渲染（Incremental Rendering）**：Fiber 的主要特点是增量渲染，它允许 React
   将渲染工作分割成多个块并将这些块分散到多个帧中。这种方式可以避免长时间的渲染任务阻塞浏览器主线程，从而保持应用的响应性。

2. **任务分割（Task Splitting）**：在 Fiber 架构中，渲染任务可以被分割成小的单元。React
   在执行时可以根据需要中断这些任务，以确保主线程可以处理更紧急的任务，例如用户输入。

3. **重新设计的调度器（Scheduler）**：Fiber 引入了一个新的调度器，可以更智能地安排和优先处理更新。这意味着 React
   可以根据任务的优先级，如动画或数据获取，进行调整。

4. **Fiber 节点（Fiber Nodes）**：在 Fiber 架构中，每个 React 元素都有一个对应的 Fiber 节点。这些节点构成了一个虚拟的树状结构。每个
   Fiber 节点都是一个工作单元，并包含了组件的类型、状态、待处理的更新等信息。

5. **双缓冲（Double Buffering）**：在旧的 React 架构中，每次更新都会直接对 DOM 进行操作。而 Fiber
   则使用了类似游戏引擎中的“双缓冲”技术，在内存中构建新的树结构，然后在适当的时候将其一次性更新到 DOM 上。这有助于避免不必要的布局计算和重绘。

6. **并发模式（Concurrent Mode）**：Fiber 架构使得 React 可以在其并发模式下工作，这允许组件在不阻塞主线程的情况下，以非同步方式渲染。

Fiber 的引入极大地增强了 React 的能力，使其可以更好地处理动态的、高负载的应用场景，同时为未来的功能更新和优化打下了基础。随着时间的推移，React
团队还在不断改进和优化 Fiber 架构，以提供更好的性能和开发体验。

[//]: # (## React SSR 服务端渲染)

## ErrorBoundary 错误边界组件

React ErrorBoundary（错误边界）是一种 React 组件，它可以捕获其子组件树中发生的 JavaScript 错误，并输出备用
UI，而不是导致整个组件树卸载。这提供了一种更优雅地处理错误并提高应用程序稳定性的方法。

在 React 16 之前，如果组件树中的某个组件发生错误，整个应用会崩溃并显示一个白屏。错误边界的引入改善了这种情况，使得开发者可以控制组件错误的影响范围，并决定如何响应错误。

### 如何定义一个错误边界组件

要创建一个错误边界组件，你需要在你的 React 组件中定义一个或两个生命周期方法：

1. static getDerivedStateFromError(error)：此生命周期在后代组件抛出错误后被调用，用于渲染备用 UI。
2. componentDidCatch(error, errorInfo)：此生命周期在后代组件抛出错误后被调用，用于记录错误信息。

以下是一个简单的错误边界组件例子：

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.error("Caught an error in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### 如何使用错误边界

你可以将错误边界组件当作一个普通组件来使用，将其放置在组件树中任何你想要捕获错误的位置。例如：

```jsx
<ErrorBoundary>
  <MyComponent/>
</ErrorBoundary>
```

在这个例子中，如果 `MyComponent` 或者它的任何子组件在渲染过程中、生命周期方法中或者构造函数中抛出了错误，`ErrorBoundary`
将会捕获它，并渲染备用的 UI，而不是让整个应用崩溃。

错误边界无法捕获以下场景中的错误：

- 事件处理（了解更多信息，你可以使用 `try`/`catch` 语句，而不是错误边界）
- 异步代码（例如 `setTimeout` 或者 `requestAnimationFrame` 回调函数）
- 服务端渲染
- 它自己抛出来的错误（而不是其子组件）

错误边界是 React 应用程序中重要的一部分，它们提供了一种优雅处理和响应错误的方式，使得用户体验更加流畅、不会因为单个组件的问题而导致整个应用崩溃。
