import { defineStore } from 'pinia'
import { MicroApp } from 'qiankun'
import { apps } from '~/microApp.config.json'

const useMicroAppStore = defineStore('microApp', () => {
  // 记录子应用信息
  const microAppsInfo: Map<string, { instance: MicroApp }> = reactive(
    new Map(apps.map((app) => [app.name, { instance: null }]))
  )

  // 子应用挂载节点
  const microAppsContainerMap = computed(() => {
    const microAppContainerMap = new Map()
    apps.forEach((app) => {
      microAppContainerMap.set(app.name, `#subapp-container-${app.name}`)
    })
    return microAppContainerMap
  })
  return {
    microAppsInfo,
    microAppsContainerMap
  }
})

export { useMicroAppStore }
