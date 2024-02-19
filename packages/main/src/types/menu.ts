/** 菜单项 */
export interface MenuItem {
  path: string
  label: string
  children?: MenuItem[]
}

/** 面包屑 */
export interface Breadcrumb extends Pick<MenuItem, 'label' | 'path'> {
  history: Pick<Breadcrumb, 'label' | 'path'>[]
}
