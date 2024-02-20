<template>
  <div class="globalTab">
    <left-outlined v-show="globalHistoryRecord.length > 0" @click="back" />
    <a-tag v-for="tab in tabs" :key="tab.rawPath">{{ tab.label }}</a-tag>
  </div>
</template>

<script setup lang="ts" name="GlobalTab">
import { useAppStore, useGlobalStore } from '@/store'
import { LeftOutlined } from '@ant-design/icons-vue'
import { taskQueue, TaskPriority } from '@/utils/taskQueue'
import { useMicro } from '@/hooks'
import { PageJumpType } from '@/constant'

const appStore = useAppStore()
const { tabs } = storeToRefs(appStore)
const globalStore = useGlobalStore()
const { globalHistoryRecord } = storeToRefs(globalStore)
const { goMicroApp } = useMicro()

const back = () => {
  // 全局返回
  const lastRecord = globalHistoryRecord.value[globalHistoryRecord.value.length - 1]
  if (!lastRecord) return
  taskQueue.addTask({
    id: lastRecord.path,
    priority: TaskPriority.Medium,
    callback: async () => {
      await goMicroApp({ path: lastRecord.path, jumpType: PageJumpType.Back })
    }
  })
}
</script>
<style scoped lang="scss"></style>
