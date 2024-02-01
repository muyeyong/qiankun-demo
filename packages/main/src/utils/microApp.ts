import { MicroApp } from 'qiankun'

/** 判断子应用是否加载 */
export const isMicroAppLoaded = (app: MicroApp | null | undefined): boolean => {
  return !app || !app.getStatus || (app && app.getStatus && app.getStatus() === 'NOT_LOADED')
}

/** 子应用是否加载完毕 */
