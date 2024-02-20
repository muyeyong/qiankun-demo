<template>
  <div class="globalTab">
    <left-outlined v-show="globalHistoryRecord.length > 0" @click="back" />
    <a-tag v-for="tab in tabs" :key="tab.rawPath" style="cursor: pointer" @click="switchTab(tab)">{{
      tab.label
    }}</a-tag>
  </div>
</template>

<script setup lang="ts" name="GlobalTab">
import { useAppStore, useGlobalStore } from '@/store'
import { LeftOutlined } from '@ant-design/icons-vue'
import { taskQueue, TaskPriority } from '@/utils/taskQueue'
import { useMicro } from '@/hooks'
import { PageJumpType } from '@/constant'
import { Tab } from '@/types'

const appStore = useAppStore()
const { tabs, breadcrumb } = storeToRefs(appStore)
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

/** 切换tab */
const switchTab = (tab: Tab) => {
  const { path } = tab
  const currPage = breadcrumb.value.reverse().find((item) => item.isMenu)
  if (currPage?.path === path) return
  taskQueue.addTask({
    id: path!,
    priority: TaskPriority.Medium,
    callback: async () => {
      await goMicroApp({ path: path!, jumpType: PageJumpType.Tab })
    }
  })
}
</script>
<style scoped lang="scss"></style>
