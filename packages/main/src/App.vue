<template>
  <div class="main">
    <router-view />
    <div :style="{ ...commonContentStyles, ...microAppContentStyles }">
      <div
        v-for="container in microAppsContainerMap"
        :id="container[1].replace('#', '')"
        :key="container[0]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
import { subscribeStore, useMicroAppStore } from '@/store'
import { useEvents, useTheme } from '@/hooks'

const microStore = useMicroAppStore()
const { microAppsContainerMap } = storeToRefs(microStore)
const { microAppContentStyles, commonContentStyles } = useTheme()

subscribeStore()
useEvents()
</script>
<style scoped lang="scss"></style>
