## qiankunDemo

> 基于vue3 + vite + qiankun实现的一个demo项目，主要演示了将多了子应用的系统的使用效果就像单个系统一样

### 前置条件：实现全局数据共享和全局通信

#### 全局通信

[qiankun](https://qiankun.umijs.org/zh/api#initglobalstatestate) 提供了全局通信的方式，但新版本逐渐放弃对这个特性(`initGlobalState`)的支持，`initGlobalState`是一个多余的特性，只需要基座应用和子应用共用一个通信模块的实例即可，基本逻辑如下。

```js
// 引入一个通信实例，无论那种方式实现
import event from '@/event'

// 传递给子应用
loadMicroApp({
            name,
            entry,
            container,
            props: {
              globalEvent: event,
              ...
            }
          })

// 子应用覆盖原有的通信实例
  render(props) {
    if (props.globalEvent) {
        event.override(globalEvent)
    }
}
```

#### 全局数据共享

全局共享数据存储在基座应用里面，然后子应用只需去订阅全局共享数据的变化就能获取最新的全局数据，子应用只是订阅全局数据，并没有强关联全局数据，这样的话子应用单独运行也不会受到影响，基本逻辑如下。

```js
// 构建共享数据
const useGlobalStore = defineStore('global', () => {
    return {
        ....
    }
})
// 传递共享数据
loadMicroApp({
            name,
            entry,
            container,
            props: {
              globalStore,
              ...
            }
          })
// 子应用订阅共享数据
 render(props) {
   if (globalStore) {
      subscribeGlobalStore(globalStore)
    }
}
```

### 同一个应用内的跳转

![14](https://github.com/muyeyong/qiankun-demo/assets/35398394/a732dad8-12d4-4bcc-a1f3-c4b956f58445)

### 跨应用跳转

![15](https://github.com/muyeyong/qiankun-demo/assets/35398394/f3e2be68-f06a-461f-89eb-0e2c56b3ece6)

### 提供页面刷新、登录成功和退出登录的钩子函数



