import { defineStore } from 'pinia'
import { GlobalHistoryRecord } from '@/types'
import { apps } from '~/microApp.config.json'
import { MicroAppInfo } from '@/types'

const useGlobalStore = defineStore('global', () => {
  // 记录子应用信息
  const microAppsInfo: Map<string, MicroAppInfo> = reactive(
    new Map(apps.map((app) => [app.name, { instance: null, components: [] }]))
  )

  /** 当前显示的应用 */
  const currentApp = ref<string>('main')

  /** 全局历史记录 */
  const globalHistoryRecord = ref<GlobalHistoryRecord[]>([])

  return {
    currentApp,
    microAppsInfo,
    globalHistoryRecord
  }
})

export { useGlobalStore }
