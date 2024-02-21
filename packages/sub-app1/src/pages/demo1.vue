<template>
  <div class="About">这是一个sub1的关于页面</div>
  <a-input placeholder="测试页面缓存，这个页面缓存" />
  <RouterLink to="/demo1/detail">Demo1详情页</RouterLink>
  <div><RouterLink to="/sub2/demo1">跳转到sub2App的demo1页面(这是一个跨应用跳转)</RouterLink></div>
</template>

<script setup lang="ts" name="demo1">
// test
</script>

<style scoped lang="scss"></style>
