import { MicroApp } from 'qiankun'
import { apps } from '~/microApp.config.json'
import { useMicroAppStore } from '../store'
import { isDev } from './env'
import { MenuItem } from '../types'

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

/** 判断路由是否是上下级关系 0: 无关联; 1: r1是r2的下级; -1: r1是r2的上级 */
export const isSubOrSupRoute = (r1?: string, r2?: string): number => {
  if (!r1 || !r2) return 0
  const rr1 = r1.split('/')
  const rr2 = r2.split('/')
  if (rr1.length === 0 || rr2.length === 0) return 0
  let i = 0
  let j = 0
  for (; i < rr1.length, j < rr2.length; i++, j++) {
    if (rr1[i] !== rr2[j]) break
  }
  if (i === rr1.length && j === rr2.length - 1) return 1
  if (j === rr2.length && i === rr1.length - 1) return -1
  return 0
}

/** 通过菜单路由查找对应的菜单路径  */
export const findMenuPathByRoute = (menu: MenuItem[], route: string): MenuItem[] | undefined => {
  const find = (menu: MenuItem[], path: string) => {
    for (const item of menu) {
      if (item.path === path) {
        return [{ ...item }]
      } else if (item.children && item.children.length > 0) {
        const childResult = findMenuPathByRoute(item.children, path)
        if (childResult) return [{ ...item }, ...childResult]
      }
    }
  }
  return find(menu, route)
}
