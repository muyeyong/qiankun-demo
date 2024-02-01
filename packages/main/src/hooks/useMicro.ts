import { MicroAppConfig } from '../types'
import { loadMicroApp } from 'qiankun'
const useMicro = () => {
  /** 跳转子应用 */
  const goMicroApp = (app: MicroAppConfig) => {
    //传入路径path 以及一些参数
    /** 初始化 */
    /** 更新 */
    // loadMicroApp(app)
  }
  return {
    goMicroApp
  }
}

export { useMicro }
