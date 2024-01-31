<template>
  <div class="basicLayout">
    <GlobalHeader :style="headerStyles" />
    <GlobalTab :style="tabStyles" />
    <GlobalBreadcrumb :style="breadcrumbStyles" />
    <GlobalContent :style="contentStyle" />
  </div>
</template>

<script setup lang="ts" name="basicLayout">
import { storeToRefs } from 'pinia'
import { GlobalContent, GlobalHeader, GlobalBreadcrumb, GlobalTab } from '../common'
import { useThemeStore } from '@/store'
import { computed } from 'vue'

const themeStore = useThemeStore()
const { header, tab, breadcrumb } = storeToRefs(themeStore)

const headerStyles = computed(() => ({
  height: `${header.value.height}px`,
  lineHeight: `${header.value.height}px`
}))

const tabStyles = computed(() => ({
  height: `${tab.value.height}px`,
  lineHeight: `${tab.value.height}px`
}))

const breadcrumbStyles = computed(() => ({
  height: `${breadcrumb.value.height}px`,
  lineHeight: `${breadcrumb.value.height}px`
}))

const contentStyle = computed(() => ({
  height: `calc(100vh - ${header.value.height}px - ${tab.value.height}px - ${breadcrumb.value.height}px)`
}))
</script>
<style scoped lang="scss"></style>
