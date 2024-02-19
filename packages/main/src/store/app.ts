import { defineStore } from 'pinia'
import { MenuItem, Breadcrumb } from '../types'
import { PageJumpType } from '@/constant'

const useAppStore = defineStore('app', () => {
  /** 是否登录 */
  const logged = ref(false)

  /** 菜单数据 */
  const menuData = ref<MenuItem[]>([])

  /** 布局加载完毕 */

  /** 面包屑 */
  const breadcrumb = ref<Breadcrumb[]>([])
  /** 菜单跳转类型 */
  const pageJumpType = ref<PageJumpType>(PageJumpType.Default)

  return {
    logged,
    menuData,
    breadcrumb,
    pageJumpType
  }
})

export { useAppStore }
