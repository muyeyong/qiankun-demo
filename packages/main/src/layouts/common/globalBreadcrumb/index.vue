<template>
  <a-breadcrumb class="globalBreadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumb" :key="item.label">{{
      item.label
    }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts" name="GlobalBreadcrumb">
import { useAppStore } from '@/store'
const appStore = useAppStore()
const { breadcrumb } = storeToRefs(appStore)
</script>
<style scoped lang="scss"></style>
