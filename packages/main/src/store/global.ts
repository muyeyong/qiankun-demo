import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useMicroAppStore } from './microApp'
const useGlobalStore = defineStore('global', () => {
  const appStore = useAppStore()
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

  const currentApp = computed(() => {
    return appStore.currentApp
  })

  return {
    currentApp,
    cacheComponents
  }
})

export { useGlobalStore }
