import { MicroAppJumpConfig, MicroAppRouteParams } from '../types'
import { loadMicroApp } from 'qiankun'
import {
  parseMicroAppRoute,
  isMicroAppExist,
  isMicroAppLoaded,
  waitMicroAppLoaded,
  getMicroAppContainer,
  getMicroAppEntry
} from '@/utils'
import { useMicroAppStore, useGlobalStore } from '@/store'
import { useCommon } from '@/hooks'
import event from '@/event'
import { TaskPriority, taskQueue } from '../utils/taskQueue'
const useMicro = () => {
  const microAppStore = useMicroAppStore()
  const { microAppsInfo, helpJumpInfo } = storeToRefs(microAppStore)
  const {
    isHistoryJump,
    updateMicroAppCachePage,
    hideMicroApp,
    updateHistoryRecord,
    updateBreadcrumb
  } = useCommon()

  /** 跳转子应用 */
  const goMicroApp = async (app: MicroAppJumpConfig) => {
    //传入路径path 以及一些参数
    /** 初始化: 将一些全局共享库 全局通信传递下去 */
    const globalStore = useGlobalStore()
    const preAppName = globalStore.currentApp
    try {
      const { path, newPoint } = app
      const [appName, route] = parseMicroAppRoute(path)
      if (isMicroAppExist(appName)) {
        const microAppInfo = microAppsInfo.value.get(appName)!
        globalStore.currentApp = appName
        if (isMicroAppLoaded(microAppInfo.instance)) {
          // 更新
          await waitMicroAppLoaded(microAppInfo?.instance)
          microAppInfo.instance?.update?.({ path: route, newPoint })
        } else {
          const container = getMicroAppContainer(appName)
          const entry = getMicroAppEntry(appName)
          if (!container || !entry) return

          const microApp = loadMicroApp({
            name: appName,
            entry,
            container,
            props: {
              path: route,
              globalEvent: event,
              globalStore
            }
          })
          microAppInfo.instance = microApp
          await waitMicroAppLoaded(microApp)
        }
      } else {
        // 跳转到404
        console.error('没有找到子应用')
      }
    } catch (error) {
      globalStore.currentApp = preAppName
    }
  }

  /** 跳转到empty页面 */
  const handleEmptyJump = (to: MicroAppRouteParams, from: MicroAppRouteParams) => {
    /** 判断是否是历史记录跳转 */
    if (isHistoryJump(to.route.fullPath)) {
      handleGlobalRouteBack(to, from)
    }
  }

  /** 全局跳转 */
  const handleGlobalRouteJump = (to: MicroAppRouteParams, from: MicroAppRouteParams) => {
    /** 是否成功跳转 */
    if (!to.jumped) {
      if (helpJumpInfo.value.to?.route.fullPath === to.route.fullPath) {
        /** 跳转到404页面 */
        helpJumpInfo.value = {}
        return
      }
      helpJumpInfo.value = { to, from }
      taskQueue.addTask({
        priority: TaskPriority.Medium,
        id: to.route.fullPath,
        callback: async () => {
          await goMicroApp({
            path: to.route.fullPath,
            newPoint: true
          })
        }
      })
    } else {
      /** 判断是否是协助跳转 */
      const isHelpJump = helpJumpInfo.value.to?.route.fullPath === to.route.fullPath
      if (isHelpJump) {
        from = helpJumpInfo.value.from!
      }
      if (parseMicroAppRoute(from.route.fullPath)[0] !== parseMicroAppRoute(to.route.fullPath)[0]) {
        hideMicroApp(parseMicroAppRoute(from.route.fullPath)[0])
      }
      /** 更新历史记录 */
      updateHistoryRecord(from)
      /** 更新面包屑 */
      updateBreadcrumb(to)
      /** 更新子应用的信息: 需要缓存那些页面 */
      updateMicroAppCachePage({
        appName: parseMicroAppRoute(to.route.fullPath)[0],
        componentName: to.route.name as string,
        type: to.route.meta.keepAlive === false ? 'del' : 'add'
      })
      helpJumpInfo.value = {}
    }
  }
  /** 全局返回 */
  const handleGlobalRouteBack = (to: MicroAppRouteParams, from: MicroAppRouteParams) => {
    /** 是否成功跳转 */
  }
  return {
    goMicroApp,
    handleEmptyJump,
    handleGlobalRouteJump,
    handleGlobalRouteBack
  }
}

export { useMicro }
