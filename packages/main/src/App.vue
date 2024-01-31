<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts" name="App">
import { subscribeStore } from '@/store'

subscribeStore()
</script>
<style scoped lang="scss"></style>
