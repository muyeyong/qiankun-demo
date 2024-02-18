import { storeToRefs } from 'pinia'
import { useThemeStore, useGlobalStore } from '@/store'
import { computed } from 'vue'

const useTheme = () => {
  const themeStore = useThemeStore()
  const { header, tab, breadcrumb } = storeToRefs(themeStore)
  const globalStore = useGlobalStore()
  const { currentApp } = storeToRefs(globalStore)
  const headerStyles = computed(() => ({
    height: `${header.value.height}px`,
    lineHeight: `${header.value.height}px`
  }))

  const tabStyles = computed(() => ({
    height: `${tab.value.height}px`,
    lineHeight: `${tab.value.height}px`
  }))

  const breadcrumbStyles = computed(() => ({
    height: `${breadcrumb.value.height}px`,
    lineHeight: `${breadcrumb.value.height}px`
  }))

  const commonContentStyles = computed(() => ({
    height: `calc(100vh - ${header.value.height}px - ${tab.value.height}px - ${breadcrumb.value.height}px)`
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
