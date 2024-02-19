import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', () => {
  /** 头部 */
  const headerSet = reactive({
    show: true,
    height: 52
  })

  /** 面包屑 */
  const breadcrumbSet = reactive({
    show: true,
    height: 42
  })

  /** 多页签 */
  const tabSet = reactive({
    show: true,
    height: 40
  })

  /** 主题色 */
  const themeColorSet = ref()

  return {
    headerSet,
    breadcrumbSet,
    themeColorSet,
    tabSet
  }
})

export { useThemeStore }
