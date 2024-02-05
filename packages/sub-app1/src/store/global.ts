import { defineStore } from 'pinia'

const useGlobalStore = defineStore('global', () => {
  const currentApp = ref()
  const cacheComponents = ref<string[]>([])
  return {
    currentApp,
    cacheComponents
  }
})

export { useGlobalStore }
