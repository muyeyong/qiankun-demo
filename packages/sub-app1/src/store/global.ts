import { defineStore } from 'pinia'
import { GlobalHistoryRecord, MicroAppInfo } from '@/types'

const useGlobalStore = defineStore('global', () => {
  const currentApp = ref()
  const microAppsInfo = ref<Map<string, MicroAppInfo>>(new Map())
  const globalHistoryRecord = ref<GlobalHistoryRecord[]>([])
  const cacheComponents = ref<string[]>([])
  return {
    currentApp,
    microAppsInfo,
    globalHistoryRecord,
    cacheComponents
  }
})

export { useGlobalStore }
