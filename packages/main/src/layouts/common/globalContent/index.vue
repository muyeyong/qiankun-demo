<template>
  <section class="globalContent">
    <router-view v-slot="{ Component, route }">
      <Transition name="fade-slide" mode="out-in" :appear="true">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </router-view>
  </section>
</template>

<script setup lang="ts" name="GlobalContent"></script>
<style scoped lang="scss">
.globalContent {
  height: 100%;
}
</style>
