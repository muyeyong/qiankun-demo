<template>
  <div class="main">
    <router-view />
    <!-- 考虑怎么融合到globalContent里面去 -->
    <div
      v-for="container in microAppContainerMap"
      :id="container[1].replace('#', '')"
      :key="container[0]"
    ></div>
  </div>
</template>

<script setup lang="ts" name="App">
import { subscribeStore } from '@/store'
import { useEvents, useMicro } from '@/hooks'

const { microAppContainerMap } = useMicro()

subscribeStore()
useEvents()
</script>
<style scoped lang="scss"></style>
