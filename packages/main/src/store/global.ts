import { defineStore } from 'pinia'
import { useMicroAppStore } from './microApp'
import { GlobalHistoryRecord } from '@/types'
const useGlobalStore = defineStore('global', () => {
  const microAppStore = useMicroAppStore()
  const cacheComponents = computed(() => {
    const components: Array<{ appName: string; components: string[] }> = []
    for (const [appName, appInfo] of microAppStore.microAppsInfo.entries()) {
      components.push({
        appName: appName,
        components: appInfo.components
      })
    }
    return components
  })

  /** 当前显示的应用 */
  const currentApp = ref<string>('main')

  /** 全局历史记录 */
  const globalHistoryRecord = ref<GlobalHistoryRecord[]>([])

  return {
    currentApp,
    cacheComponents,
    globalHistoryRecord
  }
})

export { useGlobalStore }
