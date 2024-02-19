import { MicroAppJumpConfig } from '../types'
import { loadMicroApp } from 'qiankun'
import {
  parseMicroAppRoute,
  isMicroAppExist,
  isMicroAppLoaded,
  waitMicroAppLoaded,
  getMicroAppContainer,
  getMicroAppEntry
} from '@/utils'
import { useMicroAppStore, useGlobalStore, useAppStore } from '@/store'
import { useCommon } from '@/hooks'
import event from '@/event'
import { TaskPriority, taskQueue } from '../utils/taskQueue'
import { RouteLocationNormalized } from 'vue-router'
import { PageJumpType } from '../constant'
const useMicro = () => {
  const microAppStore = useMicroAppStore()
  const { microAppsInfo, helpJumpInfo } = storeToRefs(microAppStore)
  const appStore = useAppStore()
  const { pageJumpType } = storeToRefs(appStore)
  const globalStore = useGlobalStore()
  const { globalHistoryRecord } = storeToRefs(globalStore)
  const {
    isHistoryJump,
    updateMicroAppCachePage,
    hideMicroApp,
    updateHistoryRecord,
    updateBreadcrumb
  } = useCommon()

  /** 跳转子应用 */
  const goMicroApp = async (args: MicroAppJumpConfig) => {
    //传入路径path 以及一些参数
    /** 初始化: 将一些全局共享库 全局通信传递下去 */

    const preAppName = globalStore.currentApp
    try {
      const { path, newPoint, jumpType } = args
      const [appName, route] = parseMicroAppRoute(path)
      pageJumpType.value = jumpType ?? PageJumpType.Default
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
      pageJumpType.value = PageJumpType.Default
    }
  }

  /** 跳转到empty页面 */
  const handleEmptyJump = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    /** 判断是否是历史记录跳转 */
    if (isHistoryJump(to.fullPath)) {
      handleGlobalRouteBack(to, from, false)
    }
  }

  /** 全局跳转 */
  const handleGlobalRouteJump = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    jumped: boolean
  ) => {
    /** 是否成功跳转 */
    if (!jumped) {
      if (helpJumpInfo.value.to?.fullPath === to.fullPath) {
        /** 跳转到404页面 */
        helpJumpInfo.value = {}
        return
      }
      helpJumpInfo.value = { to, from }
      taskQueue.addTask({
        priority: TaskPriority.Medium,
        id: to.fullPath,
        callback: async () => {
          await goMicroApp({
            path: to.fullPath,
            newPoint: true
          })
        }
      })
    } else {
      /** 判断是否是协助跳转 */
      const isHelpJump = helpJumpInfo.value.to?.fullPath === to.fullPath
      if (isHelpJump) {
        from = helpJumpInfo.value.from!
      }
      /** 隐藏子应用 */
      if (parseMicroAppRoute(from.fullPath)[0] !== parseMicroAppRoute(to.fullPath)[0]) {
        hideMicroApp(parseMicroAppRoute(from.fullPath)[0])
      }
      /** 更新历史记录 */
      updateHistoryRecord(to, from)
      /** 更新面包屑 */
      updateBreadcrumb(to, from)
      /** 更新子应用的信息: 需要缓存那些页面 */
      updateMicroAppCachePage({
        appName: parseMicroAppRoute(to.fullPath)[0],
        componentName: to.name as string,
        type: to.meta.keepAlive === false ? 'del' : 'add'
      })
      helpJumpInfo.value = {}
      pageJumpType.value = PageJumpType.Default
    }
  }
  /** 全局返回 */
  const handleGlobalRouteBack = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    jumped: boolean
  ) => {
    /** 是否成功跳转 */
    if (!jumped) {
      helpJumpInfo.value = { to, from }
      taskQueue.addTask({
        priority: TaskPriority.Medium,
        id: to.fullPath,
        callback: async () => {
          await goMicroApp({
            path: to.fullPath,
            newPoint: true
          })
        }
      })
    } else {
      /** 判断是否是协助跳转 */
      const isHelpJump = helpJumpInfo.value.to?.fullPath === to.fullPath
      if (isHelpJump) {
        from = helpJumpInfo.value.from!
      }
      /** 更新历史记录 */
      updateHistoryRecord(to, from)
      /** 更新面包屑 */
      updateBreadcrumb(to, from)
      /** 更新子应用的信息: 需要缓存那些页面 */
      /** 更新子应用的信息: 需要缓存那些页面 */
      updateMicroAppCachePage({
        appName: parseMicroAppRoute(from.fullPath)[0],
        componentName: from.name as string,
        type: 'del'
      })
      helpJumpInfo.value = {}
      pageJumpType.value = PageJumpType.Default
    }
  }
  return {
    goMicroApp,
    handleEmptyJump,
    handleGlobalRouteJump,
    handleGlobalRouteBack
  }
}

export { useMicro }
