<template>
  <div class="menu">
    <div v-for="item in menuData" :key="item.path" class="menuItem" @click="jump(item.path)">
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts" name="menu">
import { useAppStore } from '@/store'
import { useMicro } from '@/hooks'
import { RouteLocationNormalized } from 'vue-router'
import { PageJumpType } from '@/constant'

const appStore = useAppStore()
const { menuData, breadcrumb } = storeToRefs(appStore)
const { handleGlobalRouteJump } = useMicro()

const jump = (path?: string) => {
  if (!path) return
  const fromPath = breadcrumb.value.findLast((item) => item.isMenu)?.path
  handleGlobalRouteJump(
    { path, fullPath: path } as RouteLocationNormalized,
    { path: fromPath, fullPath: fromPath } as RouteLocationNormalized,
    false,
    PageJumpType.Menu
  )
}
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
