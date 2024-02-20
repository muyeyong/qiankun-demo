<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cacheComponents"> <component :is="Component" /> </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="app">
import { APP_NAME } from '~/vite/constant'
import event from './event'
import { useGlobalStore } from './store'

const router = useRouter()
const globalStore = useGlobalStore()
const { cacheComponents } = storeToRefs(globalStore)
onMounted(() => {
  event.on('hideMicroApp', (appName: string) => {
    if (appName === APP_NAME) {
      router.push({ name: 'empty' })
    }
  })
})

// const cacheComponents = computed(() => microAppsInfo.value.get(APP_NAME)?.components)

watch(
  () => globalStore.microAppsInfo,
  (value) => {
    console.log(value, 22)
  },
  { deep: true }
)
</script>
<style scoped lang="scss"></style>
