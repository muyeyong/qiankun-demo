import { createApp } from 'vue'
import App from './App.vue'
import { start } from 'qiankun'
import router from '@/router'
import '@/assets/styles/index.scss'

const app = createApp(App)

async function main() {
  app.use(router)
  app.mount('#app')
}

function initMicroApps() {
  start()
}

main().then(() => {
  initMicroApps()
})
