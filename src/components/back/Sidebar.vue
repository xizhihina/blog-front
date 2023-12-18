<template>
    <el-menu
      class="el-menu-vertical-demo h-full"
      router="true"
    >
      <el-menu-item index="/backmanage/articleinfo">
        <el-icon><document/></el-icon>
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item index="/backmanage/usermanagement">
        <el-icon><user /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import {Document,User} from '@element-plus/icons-vue'
</script>

<style>
</style>