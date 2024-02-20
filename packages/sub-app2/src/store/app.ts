import { defineStore } from 'pinia'

const useAppStore = defineStore('global', () => {
  /** 不需要上报路由跳转 */
  const noReportRoute = ref(false)
  return {
    noReportRoute
  }
})

export { useAppStore }
