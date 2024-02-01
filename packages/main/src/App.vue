<template>
  <div class="main">
    <router-view />
    <!-- 考虑怎么融合到globalContent里面去 -->
    <div
      v-for="container in microAppsContainerMap"
      :id="container[1].replace('#', '')"
      :key="container[0]"
    ></div>
  </div>
</template>

<script setup lang="ts" name="App">
import { subscribeStore, useMicroAppStore } from '@/store'
import { useEvents } from '@/hooks'

const microStore = useMicroAppStore()
const { microAppsContainerMap } = storeToRefs(microStore)

subscribeStore()
useEvents()
</script>
<style scoped lang="scss"></style>
