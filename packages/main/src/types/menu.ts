import { GlobalHistoryRecord } from './micro'

/** 菜单项 */
export interface MenuItem {
  path?: string
  label: string
  children?: MenuItem[]
}

/** 面包屑 */
export interface Breadcrumb extends Pick<MenuItem, 'label' | 'path'> {
  history: Pick<Breadcrumb, 'label' | 'path' | 'componentName'>[]
  isMenu: boolean
  rawPath?: string
  rawLabel: string
  componentName?: string
}

/** tab */
export interface Tab extends Pick<MenuItem, 'label' | 'path'> {
  breadcrumb: Breadcrumb[]
  globalHistoryRecord: GlobalHistoryRecord[]
  rawPath?: string
  rawLabel: string
}
