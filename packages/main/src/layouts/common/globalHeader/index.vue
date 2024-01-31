<template>
  <div class="globalHeader">
    <Logo />
    <Menu class="menu" />
    <UserCenter />
  </div>
</template>

<script setup lang="ts" name="GlobalHeader">
import Logo from './components/logo.vue'
import Menu from './components/menu.vue'
import UserCenter from './components/userCebter.vue'
</script>
<style scoped lang="scss">
.globalHeader {
  display: flex;
  align-items: center;
  .menu {
    flex: 1;
  }
}
</style>
