import { useEventListener } from '@vueuse/core'
import { useSystem, useMicro, useCommon } from '@/hooks'
import event from '@/event'
const useEvents = () => {
  const { windowRefreshCb } = useSystem()
  const { isHistoryJump } = useCommon()
  const { handleEmptyJump, handleGlobalRouteBack, handleGlobalRouteJump } = useMicro()
  /** 监听页面刷新 */
  useEventListener(window, 'load', () => {
    windowRefreshCb()
  })

  event.on('microAppRouteJump', (args) => {
    const { to, from, jumped } = args
    /** 是否是跳转到empty页面 */
    if (to.name === 'empty') {
      handleEmptyJump(to, from)
    } else if (isHistoryJump(to.fullPath)) {
      handleGlobalRouteBack(to, from, jumped)
    } else {
      handleGlobalRouteJump(to, from, jumped)
    }
  })
}

export { useEvents }
