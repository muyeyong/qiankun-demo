<template>
  <div class="main">
    <router-view />
    <div :style="{ ...commonContentStyles, ...microAppContentStyles }">
      <div
        v-for="container in microAppsContainerMap"
        :id="container[1].replace('#', '')"
        :key="container[0]"
        :style="{ display: container[0] === currentApp ? 'block' : 'none' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
import { subscribeStore, useMicroAppStore, useGlobalStore } from '@/store'
import { useEvents, useTheme } from '@/hooks'

const microStore = useMicroAppStore()
const { microAppsContainerMap } = storeToRefs(microStore)
const { microAppContentStyles, commonContentStyles } = useTheme()
const globalStore = useGlobalStore()
const { currentApp } = storeToRefs(globalStore)

subscribeStore()
useEvents()
</script>
<style scoped lang="scss"></style>
