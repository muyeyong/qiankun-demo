import { defineStore } from 'pinia'

const useAppStore = defineStore('app', () => {
  /** 是否登录 */
  const logged = ref(false)

  /** 菜单数据 */
  const menuData = ref([])
  return {
    logged
  }
})

export { useAppStore }
