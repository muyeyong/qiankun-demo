import { useEventListener } from '@vueuse/core'
import { useSystem } from '@/hooks'
const useEvents = () => {
  const { windowRefreshCb } = useSystem()
  /** 监听页面刷新 */
  useEventListener(window, 'load', () => {
    windowRefreshCb()
  })
}

export { useEvents }
