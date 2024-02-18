<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts" name="app">
import { APP_NAME } from '~/vite/constant'
import event from './event'

const router = useRouter()
onMounted(() => {
  event.on('hideMicroApp', (appName: string) => {
    if (appName === APP_NAME) {
      router.push({ name: 'empty' })
    }
  })
})
</script>
<style scoped lang="scss"></style>
