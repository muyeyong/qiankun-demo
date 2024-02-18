import { MicroApp } from 'qiankun'
import { RouteLocationNormalized } from 'vue-router'

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

/** 全局历史记录 */
export interface GlobalHistoryRecord {
  path: string
}

/** 子应用路由路由跳转参数 */
export interface MicroAppRouteParams {
  route: RouteLocationNormalized
  jumped?: boolean
}
