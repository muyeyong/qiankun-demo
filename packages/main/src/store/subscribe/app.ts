import { useAppStore } from '../index'
import { defaultPageName } from '@/constant/system'
export default function subscribeAppStore() {
  const appStore = useAppStore()
  const scope = effectScope()
  const router = useRouter()
  scope.run(() => {
    watch(
      () => appStore.logged,
      (value) => {
        if (value) {
          // TODO 如果登录成功，执行一些操作
          // 跳转到首页 or redirect
          const nextPath = router.currentRoute.value.query?.redirect
          if (nextPath) {
            router.push({ path: nextPath as string })
          } else {
            router.push({ name: defaultPageName })
          }
        } else {
          // 进行一些注销操作
          // 跳转到登陆页
        }
      }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
