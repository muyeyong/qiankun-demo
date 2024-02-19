import { defineStore } from 'pinia'
import { GlobalHistoryRecord } from '@/types'

const useGlobalStore = defineStore('global', () => {
  const currentApp = ref()
  const cacheComponents = ref<Array<{ appName: string; components: string[] }>>([])
  const globalHistoryRecord = ref<GlobalHistoryRecord[]>([])
  return {
    currentApp,
    cacheComponents,
    globalHistoryRecord
  }
})

export { useGlobalStore }
