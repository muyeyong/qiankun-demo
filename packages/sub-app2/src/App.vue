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
  event.on('hideMicroApp', (args: { appName: string }) => {
    const { appName } = args
    if (appName === APP_NAME) {
      router.push({ name: 'empty' })
    }
  })
})
</script>
<style scoped lang="scss"></style>
