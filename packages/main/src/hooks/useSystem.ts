import { useAppStore } from '../store'
import { useCommon } from '@/hooks'
const useSystem = () => {
  const appStore = useAppStore()
  const { setMenuData } = useCommon()
  /** 登录成功回调: 只会在登录成功调用，页面刷新不会调用 */
  const loginSuccessCb = async () => {
    // 获取菜单
    await setMenuData()
  }
  /** 页面刷新回调：区分是否登录 */
  const windowRefreshCb = () => {
    if (appStore.logged) {
      // 获取菜单
      setMenuData()
    } else {
      // do
      console.log('页面刷新，未登录')
    }
  }
  /** 注销回调 */
  const logoutCb = () => {
    // 切换所有子应用
    // 初始化store
  }
  return {
    loginSuccessCb,
    windowRefreshCb,
    logoutCb
  }
}

export { useSystem }
