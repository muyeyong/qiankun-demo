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
import { useAppStore, useMicroAppStore } from '@/store'
import event from '@/event'
import { useGlobalStore } from '../store/global'
const useMicro = () => {
  const microAppStore = useMicroAppStore()
  const { microAppsInfo } = storeToRefs(microAppStore)
  /** 跳转子应用 */
  const goMicroApp = async (app: MicroAppJumpConfig) => {
    //传入路径path 以及一些参数
    /** 初始化: 将一些全局共享库 全局通信传递下去 */
    const { path, newPoint } = app
    const [appName, route] = parseMicroAppRoute(path)
    if (isMicroAppExist(appName)) {
      const microAppInfo = microAppsInfo.value.get(appName)!
      if (isMicroAppLoaded(microAppInfo.instance)) {
        // 更新
        await waitMicroAppLoaded(microAppInfo?.instance)
        microAppInfo.instance?.update?.({ path: route, newPoint })
      } else {
        const container = getMicroAppContainer(appName)
        const entry = getMicroAppEntry(appName)
        if (!container || !entry) return
        const globalStore = useAppStore() //useGlobalStore()
        const microApp = loadMicroApp({
          name: appName,
          entry,
          container,
          props: {
            newPoint,
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
    }
    /** 更新 */
    // loadMicroApp(app)
  }
  return {
    goMicroApp
  }
}

export { useMicro }
