<template>
  <div class="globalTab">
    <left-outlined v-show="globalHistoryRecord.length > 0" @click="back">返回</left-outlined>
    <a-tag v-for="tab in tabs" :key="tab.rawPath" style="cursor: pointer" @click="switchTab(tab)">{{
      tab.label
    }}</a-tag>
  </div>
</template>

<script setup lang="ts" name="GlobalTab">
import { useAppStore, useGlobalStore } from '@/store'
import { LeftOutlined } from '@ant-design/icons-vue'
import { useMicro } from '@/hooks'
import { PageJumpType } from '@/constant'
import { Tab } from '@/types'
import { RouteLocationNormalized } from 'vue-router'

const appStore = useAppStore()
const { tabs, breadcrumb } = storeToRefs(appStore)
const globalStore = useGlobalStore()
const { globalHistoryRecord } = storeToRefs(globalStore)
const { handleGlobalRouteBack, handleGlobalRouteJump } = useMicro()

const back = () => {
  // 全局返回
  const lastRecord = globalHistoryRecord.value[globalHistoryRecord.value.length - 1]
  const currPath = breadcrumb.value[breadcrumb.value.length - 1].path
  if (!lastRecord) return
  handleGlobalRouteBack(
    { path: lastRecord.path, fullPath: lastRecord.path } as RouteLocationNormalized,
    { path: currPath, fullPath: currPath } as RouteLocationNormalized,
    false,
    PageJumpType.Back
  )
}

/** 切换tab */
const switchTab = (tab: Tab) => {
  const { path } = tab
  const currPage = breadcrumb.value.findLast((item) => item.isMenu)
  if (currPage?.path === path) return
  handleGlobalRouteJump(
    { path, fullPath: path } as RouteLocationNormalized,
    { path: currPage?.path, fullPath: currPage?.path } as RouteLocationNormalized,
    false,
    PageJumpType.Tab
  )
}
</script>
<style scoped lang="scss"></style>
