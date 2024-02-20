import { createApp } from 'vue'
import type { App } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import Root from './App.vue'
import { QiankunMountProps } from '@/types'
import router from '@/router'
import { setupStore } from '@/store'
import event from '@/event'
import { subscribeGlobalStore } from '@/store'

let app: App | null = null

function render(props: QiankunMountProps = {}) {
  return new Promise<void>((resolve, reject) => {
    try {
      const { container, globalEvent, globalStore } = props
      const app = createApp(Root)
      setupStore(app)
      setupStore(app)
      if (globalEvent) {
        event.override(globalEvent)
      }
      if (globalStore) {
        subscribeGlobalStore(globalStore)
      }
      app.use(router)
      const target: HTMLElement = container
        ? container.querySelector('#app')!
        : document.querySelector('#app')!
      app.mount(target)
      resolve()
    } catch (error) {
      reject()
    }
  })
}

renderWithQiankun({
  bootstrap() {
    return Promise.resolve()
  },
  mount(props: QiankunMountProps) {
    return new Promise((resolve, reject) => {
      try {
        render(props).then(() => {
          const { path } = props
          if (path) {
            router.push(path)
          }
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  unmount(props: QiankunMountProps) {
    return Promise.resolve().then(() => {
      if (app) {
        app.unmount()
        app = null
      }
    })
  },
  update(props: QiankunMountProps) {
    return new Promise((resolve, reject) => {
      const { path, newPoint } = props
      if (path) {
        //  需要确认是否需要新的起点
        if (newPoint) {
          router.push('/empty').then(() => {
            router
              .push(path)
              .then(() => {
                resolve()
              })
              .catch(() => {
                reject()
              })
          })
        } else {
          router
            .push(path)
            .then(() => {
              resolve()
            })
            .catch(() => {
              reject()
            })
        }
      }
    })
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
