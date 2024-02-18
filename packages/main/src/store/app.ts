import { defineStore } from 'pinia'
import { MenuItem } from '../types'

const useAppStore = defineStore('app', () => {
  /** 是否登录 */
  const logged = ref(false)

  /** 菜单数据 */
  const menuData = ref<MenuItem[]>([])

  /** 布局加载完毕 */

  return {
    logged,
    menuData
  }
})

export { useAppStore }
