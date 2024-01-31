import { getMenuDataReq } from '@/api'
import { useAppStore } from '../store'
const useCommon = () => {
  const appStore = useAppStore()
  /** 设置菜单 */
  const setMenuData = async () => {
    const res = await getMenuDataReq()
    appStore.menuData = res
  }
  return {
    setMenuData
  }
}
export { useCommon }
