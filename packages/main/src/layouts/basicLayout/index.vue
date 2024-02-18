<template>
  <div class="basicLayout">
    <GlobalHeader :style="headerStyles" />
    <GlobalTab :style="tabStyles" />
    <GlobalBreadcrumb :style="breadcrumbStyles" />
    <GlobalContent :style="{ ...commonContentStyles, ...mainContentStyles }" />
  </div>
</template>

<script setup lang="ts" name="basicLayout">
import { GlobalContent, GlobalHeader, GlobalBreadcrumb, GlobalTab } from '../common'
import { useTheme } from '@/hooks'

const { headerStyles, tabStyles, breadcrumbStyles, commonContentStyles, mainContentStyles } =
  useTheme()
</script>
<style scoped lang="scss"></style>
