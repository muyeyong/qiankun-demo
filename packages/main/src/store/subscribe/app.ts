import { useAppStore } from '../index'
import { defaultPageName } from '@/constant/system'
import { useSystem } from '@/hooks'
export default function subscribeAppStore() {
  const appStore = useAppStore()
  const scope = effectScope()
  const router = useRouter()
  const { loginSuccessCb, logoutCb } = useSystem()

  /** 登录成功跳转 */
  const redirect = () => {
    const nextPath = router.currentRoute.value.query?.redirect
    if (nextPath) {
      router.push({ path: nextPath as string })
    } else {
      router.push({ name: defaultPageName })
    }
  }

  scope.run(() => {
    watch(
      () => appStore.logged,
      async (value) => {
        if (value) {
          // TODO 如果登录成功，执行一些操作
          await loginSuccessCb()
          // 跳转到首页 or redirect
          redirect()
        } else {
          // 进行一些注销操作
          await logoutCb()
          // 跳转到登陆页
        }
      }
    )

    watch(
      () => appStore.breadcrumb,
      (value) => {
        const target = value.findLast((item) => item.isMenu)
        if (target) {
          if (!appStore.tabs.some((item) => item.rawPath === target.rawPath)) {
            appStore.tabs.push({
              label: target.label,
              path: target.path,
              globalHistoryRecord: [],
              breadcrumb: [],
              rawLabel: target.rawLabel,
              rawPath: target.rawPath
            })
          } else {
            appStore.tabs = appStore.tabs.map((item) => {
              if (item.rawPath === target.rawPath) {
                return {
                  ...item,
                  path: target.path
                }
              }
              return item
            })
          }
        }
      },
      { deep: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
