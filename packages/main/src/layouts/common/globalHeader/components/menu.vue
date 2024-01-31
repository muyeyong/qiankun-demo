<template>
  <div class="menu">
    <div v-for="item in menuData" :key="item.path" class="menuItem">{{ item.label }}</div>
  </div>
</template>

<script setup lang="ts" name="menu">
import { useAppStore } from '@/store'

const appStore = useAppStore()
const { menuData } = storeToRefs(appStore)
</script>
<style scoped lang="scss">
.menu {
  display: flex;
  .menuItem {
    cursor: pointer;
    padding: 0 16px;
  }
}
</style>
