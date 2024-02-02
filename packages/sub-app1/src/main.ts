import { createApp, App } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import Root from './App.vue'
import { QiankunMountProps } from '@/types'
import router from '@/router'
import { setupStore } from '@/store'

let app: App | null = null

function render(props: QiankunMountProps = {}) {
  const { container } = props
  const app = createApp(Root)
  setupStore(app)
  app.use(router)
  const target: HTMLElement = container
    ? container.querySelector('#app')!
    : document.querySelector('#app')!
  app.mount(target)
}

renderWithQiankun({
  bootstrap() {
    console.log('1')
    return Promise.resolve()
  },
  mount(props: QiankunMountProps) {
    console.log('2')
    return new Promise((resolve) => {
      render(props)
      resolve()
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
      const { path } = props
      if (path) {
        //  需要确认是否需要新的起点
        router
          .push(path)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      }
    })
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
