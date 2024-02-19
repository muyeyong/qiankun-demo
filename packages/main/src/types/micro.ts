import { MicroApp } from 'qiankun'
import { PageJumpType } from '../constant'

/** 子应用配置 */
export interface MicroAppConfig {
  name: string
  entry: string
  proEntry: string
}

/** 跳转参数配置 */
export interface MicroAppJumpConfig {
  path: string
  jumpType?: PageJumpType
  newPoint?: boolean
}

/** 子应用信息 */
export interface MicroAppInfo {
  instance: MicroApp | null
  components: string[]
}

/** 全局历史记录 */
export interface GlobalHistoryRecord {
  path: string
}
