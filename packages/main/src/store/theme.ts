import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', () => {
  /** 头部 */
  const header = reactive({
    show: true,
    height: 52
  })

  /** 面包屑 */
  const breadcrumb = reactive({
    show: true,
    height: 42
  })

  /** 多页签 */
  const tab = reactive({
    show: true,
    height: 40
  })

  /** 主题色 */
  const themeColor = ref()

  return {
    header,
    breadcrumb,
    themeColor,
    tab
  }
})

export { useThemeStore }
