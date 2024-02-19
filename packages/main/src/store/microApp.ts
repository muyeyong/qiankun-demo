import { defineStore } from 'pinia'
import { apps } from '~/microApp.config.json'
import { MicroAppInfo } from '@/types'
import { RouteLocationNormalized } from 'vue-router'

const useMicroAppStore = defineStore('microApp', () => {
  // 记录子应用信息
  const microAppsInfo: Map<string, MicroAppInfo> = reactive(
    new Map(apps.map((app) => [app.name, { instance: null, components: [] }]))
  )

  // 子应用挂载节点
  const microAppsContainerMap = computed<Map<string, string>>(() => {
    const microAppContainerMap = new Map()
    apps.forEach((app) => {
      microAppContainerMap.set(app.name, `#subapp-container-${app.name}`)
    })
    return microAppContainerMap
  })

  /** 协助跳转信息 */
  const helpJumpInfo = ref<{ to?: RouteLocationNormalized; from?: RouteLocationNormalized }>({})
  return {
    microAppsInfo,
    helpJumpInfo,
    microAppsContainerMap
  }
})

export { useMicroAppStore }
