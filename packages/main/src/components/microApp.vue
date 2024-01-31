<template>
  <Teleport to=".globalContent">
    <div
      v-for="container in microAppContainerMap"
      :id="container[1].replace('#', '')"
      :key="container[0]"
    ></div>
  </Teleport>
</template>

<script setup lang="ts" name="MicroApp">
import { useMicro } from '@/hooks'
const { microAppContainerMap } = useMicro()
</script>
<style scoped lang="scss"></style>
