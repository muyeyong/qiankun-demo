import { APP_NAME } from '~/vite/constant'
import { useGlobalStore } from '../global'

const subscribeGlobalStore = (store: any) => {
  const scope = effectScope()
  const globalStore = useGlobalStore()
  scope.run(() => {
    store.$subscribe(
      (_mutation: any, state: any) => {
        console.log(state, 11, state.microAppsInfo.get(APP_NAME)?.components)
        globalStore.currentApp = state.currentApp
        globalStore.cacheComponents = state.microAppsInfo.get(APP_NAME)?.components
        globalStore.globalHistoryRecord = state.globalHistoryRecord
      },
      { immediate: true, detached: true }
    )
  })
  onScopeDispose(() => {
    scope.stop()
  })
}

export { subscribeGlobalStore }
