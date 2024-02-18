import { getMenuDataReq } from '@/api'
import { useAppStore, useGlobalStore, useMicroAppStore } from '../store'
import event from '../event'
import { MicroAppRouteParams } from '../types'
const useCommon = () => {
  const appStore = useAppStore()
  const globalStore = useGlobalStore()
  const microAppStore = useMicroAppStore()
  const { globalHistoryRecord } = globalStore
  const { microAppsInfo } = microAppStore
  /** 设置菜单 */
  const setMenuData = async () => {
    const res = await getMenuDataReq()
    appStore.menuData = res
  }
  /** 是否是历史记录跳转 */
  const isHistoryJump = (path: string) => {
    return (
      globalHistoryRecord.length > 0 &&
      globalHistoryRecord[globalStore.globalHistoryRecord.length - 1].path === path
    )
  }

  /** 更新面包屑 */
  const updateBreadcrumb = (to: MicroAppRouteParams) => {
    /** 是否是子页面 */
    /** 跳转到其他页面 */
    /** 跳转不知名页面 */
  }

  /** 更新子应用缓存页面信息 */
  const updateMicroAppCachePage = (args: {
    appName: string
    componentName: string
    type: 'add' | 'del'
  }) => {
    const { type, appName, componentName } = args
    const target = microAppsInfo.get(appName)
    if (!target) return
    if (type === 'del') {
      target.components = target.components.filter((item) => item !== componentName)
    } else if (type === 'add') {
      target.components = Array.from(new Set(target.components.concat(componentName)))
    }
  }

  /** 隐藏子应用 */
  const hideMicroApp = (appName: string) => {
    event.emit('hideMicroApp', appName)
  }

  /** 更新历史记录 */
  const updateHistoryRecord = (info: MicroAppRouteParams) => {
    if (
      info.route.name === 'empty' &&
      globalHistoryRecord.some((item) => item.path === info.route.fullPath)
    )
      return
    const path = info.route.fullPath
    globalHistoryRecord.push({
      path
    })
  }

  return {
    setMenuData,
    isHistoryJump,
    hideMicroApp,
    updateMicroAppCachePage,
    updateBreadcrumb,
    updateHistoryRecord
  }
}
export { useCommon }
