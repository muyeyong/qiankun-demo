import { MicroApp } from 'qiankun'

/** 子应用配置 */
export interface MicroAppConfig {
  name: string
  entry: string
  proEntry: string
}

/** 跳转参数配置 */
export interface MicroAppJumpConfig {
  path: string
  newPoint?: boolean
}

/** 子应用信息 */
export interface MicroAppInfo {
  instance: MicroApp | null
  components: string[]
}
