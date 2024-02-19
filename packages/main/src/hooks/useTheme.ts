import { storeToRefs } from 'pinia'
import { useThemeStore, useGlobalStore, useAppStore } from '@/store'
import { computed } from 'vue'

const useTheme = () => {
  const themeStore = useThemeStore()
  const { headerSet, tabSet, breadcrumbSet } = storeToRefs(themeStore)
  const globalStore = useGlobalStore()
  const { currentApp } = storeToRefs(globalStore)
  const appStore = useAppStore()
  const { breadcrumb } = appStore
  const headerStyles = computed(() => ({
    height: `${headerSet.value.height}px`,
    lineHeight: `${headerSet.value.height}px`
  }))

  const tabStyles = computed(() => ({
    height: `${tabSet.value.height}px`,
    lineHeight: `${tabSet.value.height}px`
  }))

  const breadcrumbStyles = computed(() => ({
    height: `${breadcrumbSet.value.height}px`,
    lineHeight: `${breadcrumbSet.value.height}px`,
    display: breadcrumb.length > 0 ? 'block' : 'none'
  }))

  const commonContentStyles = computed(() => ({
    height: `calc(100vh - ${headerSet.value.height}px - ${tabSet.value.height}px - ${breadcrumbSet.value.height}px)`
  }))

  const mainContentStyles = computed(() => ({
    display: currentApp.value === 'main' ? 'block' : 'none'
  }))
  const microAppContentStyles = computed(() => ({
    display: currentApp.value !== 'main' ? 'block' : 'none'
  }))
  return {
    headerStyles,
    tabStyles,
    breadcrumbStyles,
    commonContentStyles,
    mainContentStyles,
    microAppContentStyles
  }
}

export { useTheme }
