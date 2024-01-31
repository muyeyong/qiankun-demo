<template>
  <div class="userCenter">
    <a-dropdown>
      <a-avatar :size="32">
        <template #icon><UserOutlined style="cursor: pointer" /></template>
      </a-avatar>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">注销</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">切换主题</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">切换语言</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <span>用户名</span>
  </div>
</template>

<script setup lang="ts" name="UserCenter">
import { UserOutlined } from '@ant-design/icons-vue'
</script>
<style scoped lang="scss">
.userCenter {
  .userIcon {
    font-size: 24px;
  }
}
</style>
