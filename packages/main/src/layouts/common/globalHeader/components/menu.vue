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
import { taskQueue, TaskPriority } from '@/utils/taskQueue'

const appStore = useAppStore()
const { menuData } = storeToRefs(appStore)
const { goMicroApp } = useMicro()

const jump = (path: string) => {
  taskQueue.addTask({
    id: path,
    priority: TaskPriority.Medium,
    callback: async () => {
      await goMicroApp({ path })
    }
  })
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
