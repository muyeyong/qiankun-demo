import { useGlobalStore } from '../global'

const subscribeGlobalStore = (store: any) => {
  const scope = effectScope()
  const globalStore = useGlobalStore()
  scope.run(() => {
    store.$subscribe(
      (_mutation: any, state: any) => {
        globalStore.currentApp = state.currentApp
        globalStore.cacheComponents = state.cacheComponents
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
