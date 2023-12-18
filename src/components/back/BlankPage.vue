<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import HeaderContent from './HeaderContent.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header height="40px" class=" bg-indigo-600"><HeaderContent/></el-header>
      <el-container>
        <el-aside width="200px"><Sidebar/></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 40px;
  bottom: 0;
  }
  
.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow-y: scroll;
  }
  
.el-header {
  position: relative;
  width: 100%;
  height: 40px; 
  /* border-bottom: 1px solid black; */
  }
</style>