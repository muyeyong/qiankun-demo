const subscribeGlobalStore = (store: any) => {
  const scope = effectScope()
  console.log('store', store)
  scope.run(() => {
    watch(
      () => store.currentApp,
      (value) => {
        console.log('currentApp', value)
      },
      {
        immediate: true,
        deep: true
      }
    )
    watch(
      () => store.cacheComponents,
      (value) => {
        console.log('cacheComponents', value)
      },
      {
        immediate: true,
        deep: true
      }
    )
  })
}

export { subscribeGlobalStore }
