<template>
  <div class="demo2Detail">这是demo2的详情页面</div>
  <a-button type="primary" @click="router.back()">Route.back返回</a-button>
</template>

<script setup lang="ts" name="demo2Detail">
const router = useRouter()
</script>
<style scoped lang="scss"></style>
