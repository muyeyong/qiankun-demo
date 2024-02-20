import { getMenuDataReq } from '@/api'
import { useAppStore, useGlobalStore, useMicroAppStore } from '../store'
import event from '@/event'
import { RouteLocationNormalized } from 'vue-router'
import { findMenuPathByRoute, isSubOrSupRoute, parseMicroAppRoute } from '../utils'
import { PageJumpType } from '../constant'
import { cloneDeep } from 'lodash-es'
const useCommon = () => {
  const appStore = useAppStore()
  const globalStore = useGlobalStore()
  const { globalHistoryRecord } = storeToRefs(globalStore)
  const { microAppsInfo } = globalStore
  const { breadcrumb, pageJumpType, tabs } = storeToRefs(appStore)

  /** 设置菜单 */
  const setMenuData = async () => {
    const res = await getMenuDataReq()
    appStore.menuData = res
  }
  /** 是否是历史记录跳转 */
  const isHistoryJump = (path: string) => {
    return (
      globalHistoryRecord.value.length > 0 &&
      globalHistoryRecord.value[globalHistoryRecord.value.length - 1].path === path
    )
  }

  /** 更新面包屑 */
  const updateBreadcrumb = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const preTab = tabs.value.find((item) => item.path === from.fullPath)
    if (preTab) {
      preTab.breadcrumb = cloneDeep(breadcrumb.value)
    }
    const menus = findMenuPathByRoute(appStore.menuData, to.path)
    if (pageJumpType.value === PageJumpType.Default) {
      /** 判断to是不是菜单 */
      if (breadcrumb.value.length === 0 && menus && menus.length > 0) {
        breadcrumb.value = menus.map((item) => ({
          label: item.label,
          path: item.path,
          history: [],
          isMenu: true,
          rawLabel: item.label,
          rawPath: item.path
        }))
      } else if (isSubOrSupRoute(breadcrumb.value[breadcrumb.value.length - 1].path, to.fullPath)) {
        const result = isSubOrSupRoute(
          breadcrumb.value[breadcrumb.value.length - 1].path,
          to.fullPath
        )
        if (result === 1) {
          /** 是否是子页面 */
          breadcrumb.value[breadcrumb.value.length - 1].history.push({
            path: breadcrumb.value[breadcrumb.value.length - 1].path,
            label: breadcrumb.value[breadcrumb.value.length - 1].label
          })
          breadcrumb.value[breadcrumb.value.length - 1].path = to.fullPath
        } else if (result === -1) {
          const history = breadcrumb.value[breadcrumb.value.length - 1].history.pop()
          breadcrumb.value[breadcrumb.value.length - 1].path = history?.path
        }

        /** 跳转不知名页面 */
      } else if (menus && menus.length > 0) {
        /** 跳转到其他页面 */
        breadcrumb.value.push({
          label: menus[menus.length - 1].label,
          path: menus[menus.length - 1].path,
          history: [],
          isMenu: true,
          rawLabel: menus[menus.length - 1].label,
          rawPath: menus[menus.length - 1].path
        })
      } else {
        breadcrumb.value.push({
          label: to.meta.title as string,
          path: to.fullPath,
          history: [],
          isMenu: false,
          rawLabel: to.meta.title as string,
          rawPath: to.fullPath
        })
      }
    } else {
      // 返回
      const index = breadcrumb.value.findIndex((item) => item.path === to.fullPath)
      if (index !== -1) {
        if (
          index === breadcrumb.value.length - 1 &&
          breadcrumb.value[breadcrumb.value.length - 1].history.length > 0
        ) {
          const lastBreadcrumb = breadcrumb.value[breadcrumb.value.length - 1]
          lastBreadcrumb.path = lastBreadcrumb.history[lastBreadcrumb.history.length - 1].path
          lastBreadcrumb.history.pop()
        } else {
          breadcrumb.value.splice(index + 1)
        }
      } else {
        // 替换
        const target = tabs.value.find((item) => item.path === to.fullPath)
        breadcrumb.value =
          target?.breadcrumb ??
          (menus &&
            menus.map((item) => ({
              label: item.label,
              path: item.path,
              history: [],
              isMenu: true,
              rawLabel: item.label,
              rawPath: item.path
            }))) ??
          []
      }
    }
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
    event.emit('hideMicroApp', { appName })
  }

  /** 更新历史记录 */
  const updateHistoryRecord = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    // 更新tab的历史记录
    const preTab = tabs.value.find((item) => item.path === from.fullPath)
    if (preTab) {
      preTab.globalHistoryRecord = cloneDeep(globalHistoryRecord.value)
    }
    if (pageJumpType.value === PageJumpType.Default) {
      if (
        from.name === 'empty' &&
        globalHistoryRecord.value.some((item) => item.path === from.fullPath)
      )
        return
      if (
        breadcrumb.value.findIndex((item) =>
          [...item.history.map((history) => history.path), item.path].includes(to.fullPath)
        ) !== -1
      ) {
        globalHistoryRecord.value.splice(
          globalHistoryRecord.value.findIndex((item) => item.path === to.fullPath)
        )
      } else {
        const path = from.fullPath
        globalHistoryRecord.value.push({
          path
        })
      }
    } else {
      // 如果to存在面包屑之中：返回
      if (
        breadcrumb.value.findIndex((item) =>
          [...item.history.map((history) => history.path, item.path)].includes(to.fullPath)
        ) !== -1
      ) {
        globalHistoryRecord.value.splice(
          globalHistoryRecord.value.findIndex((item) => item.path === to.fullPath)
        )
      } else {
        // 替换
        const target = tabs.value.find((item) => item.path === to.fullPath)
        globalHistoryRecord.value = target?.globalHistoryRecord ?? []
      }
    }
  }

  /**  */

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
