import { apps } from '~/microApp.config.json'
import { MicroAppConfig } from '../types'
import { loadMicroApp } from 'qiankun'
const useMicro = () => {
  /** 子应用挂载节点 */
  const microAppContainerMap = computed(() => {
    const microAppContainerMap = new Map()
    apps.forEach((app) => {
      microAppContainerMap.set(app.name, `#subapp-container-${app.name}`)
    })
    return microAppContainerMap
  })

  /** 跳转子应用 */
  const goMicroApp = (app: MicroAppConfig) => {
    //传入路径path 以及一些参数
    /** 初始化 */
    /** 更新 */
    // loadMicroApp(app)
  }
  return {
    microAppContainerMap
  }
}

export { useMicro }
