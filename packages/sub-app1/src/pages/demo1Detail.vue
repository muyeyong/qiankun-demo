<template>
  <div class="Demo1Detail">这是一个Demo1的详情页</div>
  <a-button type="primary" @click="router.back()">Route.back返回</a-button>
  <RouterLink to="/sub2/demo1/detail">跳转到sub2App的demo1详情页面</RouterLink>
</template>

<script setup lang="ts" name="demo1Detail">
const router = useRouter()
</script>
<style scoped lang="scss"></style>
