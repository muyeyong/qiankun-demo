import { useEventListener } from '@vueuse/core'
import { useSystem } from '@/hooks'
import event from '@/event'
import { useAppStore, useGlobalStore } from '../store'
import { RouteLocationNormalized } from 'vue-router'
const useEvents = () => {
  const appStore = useAppStore()
  const globalStore = useGlobalStore()
  const { windowRefreshCb } = useSystem()
  /** 监听页面刷新 */
  useEventListener(window, 'load', () => {
    windowRefreshCb()
  })

  event.on('microAppRouteJump', (args) => {
    const { to, from } = args
    console.log('main', to, from)
    appStore.currentApp = to.name as string
  })
}

export { useEvents }
