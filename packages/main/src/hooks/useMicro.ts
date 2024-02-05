import { MicroAppConfig, MicroAppJumpConfig } from '../types'
import { loadMicroApp } from 'qiankun'
import {
  parseMicroAppRoute,
  isMicroAppExist,
  isMicroAppLoaded,
  waitMicroAppLoaded,
  getMicroAppContainer,
  getMicroAppEntry
} from '@/utils'
import { useMicroAppStore } from '@/store'
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
        console.log('container', container, 'entry', entry)
        if (!container || !entry) return
        const microApp = loadMicroApp({
          name: appName,
          entry,
          container,
          props: {
            newPoint,
            path: route
          }
        })
        microAppInfo.instance = microApp
        // await waitMicroAppLoaded(microApp)
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
