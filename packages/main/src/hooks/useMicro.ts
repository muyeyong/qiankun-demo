import { MicroAppConfig, MicroAppJumpConfig } from '../types'
import { loadMicroApp } from 'qiankun'
import {
  parseMicroAppRoute,
  isMicroAppExist,
  isMicroAppLoaded,
  waitMicroAppLoaded,
  getMicroAppContainer
} from '@/utils'
import { useMicroAppStore } from '@/store'
const useMicro = () => {
  const microAppStore = useMicroAppStore()
  const { microAppsInfo } = storeToRefs(microAppStore)
  /** 跳转子应用 */
  const goMicroApp = (app: MicroAppJumpConfig) => {
    //传入路径path 以及一些参数
    /** 初始化: 将一些全局共享库 全局通信传递下去 */
    const { path, newPoint } = app
    const [appName, route] = parseMicroAppRoute(path)
    if (isMicroAppExist(appName)) {
      const microAppInfo = microAppsInfo.value.get(appName)
      if (isMicroAppLoaded(microAppInfo?.instance)) {
      } else {
      }
      const container = getMicroAppContainer(appName)
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
