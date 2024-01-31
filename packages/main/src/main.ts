import { createApp } from 'vue'
import App from './App.vue'
import { start } from 'qiankun'
import router from '@/router'
import '@/assets/styles/index.scss'
import { setupStore } from '@/store'

const app = createApp(App)

async function main() {
  setupStore(app)
  app.use(router)
  app.mount('#app')
}

function initMicroApps() {
  start()
}

main().then(() => {
  initMicroApps()
})
