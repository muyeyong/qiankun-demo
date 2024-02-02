import { MicroApp } from 'qiankun'
import { apps } from '~/microApp.config.json'
import { useMicroAppStore } from '../store'
import { isDev } from './env'

/** 判断子应用是否加载 */
export const isMicroAppLoaded = (app: MicroApp | null | undefined): boolean => {
  return !!(app && 'getStatus' in app)
}

/** 等待子应用加载完成 */
export const waitMicroAppLoaded = (app: MicroApp | null | undefined): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!app) {
        return resolve()
      }
      Promise.all([app.loadPromise, app.bootstrapPromise, app.mountPromise])
        .then(() => {
          return resolve()
        })
        .catch((error) => {
          return reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

/** 解析跳转路由 */
export const parseMicroAppRoute = (route: string): [string, string] => {
  if (!route) return ['', '']
  const regex = /^\/([^\/]+)([\s\S]*)$/
  const match = route.match(regex)
  if (match) {
    const [, firstPart, secondPart] = match
    return [firstPart, secondPart]
  }
  return ['', '']
}

/** 当前子应用是否存在 */
export const isMicroAppExist = (name: string): boolean => {
  return apps.some((app) => app.name === name)
}

/** 获取子应用挂载点 */
export const getMicroAppContainer = (appName: string): string | undefined => {
  const microAppStore = useMicroAppStore()
  return microAppStore.microAppsContainerMap.get(appName)
}

/** 获取子应用入口 */
export const getMicroAppEntry = (appName: string): string | undefined => {
  const target = apps.find((app) => app.name === appName)
  if (target) {
    return isDev() ? target.devEntry : target.proEntry
  }
  return undefined
}
