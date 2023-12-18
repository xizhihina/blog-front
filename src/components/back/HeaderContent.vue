<template>
  <div class=" flex flex-row items-center gap-5 h-full w-full">
    <div>
      <a href="/home"><span class="text-slate-300"><el-icon><HomeFilled /></el-icon>主页 </span></a>
    </div>
    <div>
      <span class="text-slate-300">|</span>
    </div>
    <div>
      <a href="/blog"><span class="text-slate-300"> 博客 </span></a>
    </div>
    <div class=" h-full flex items-center gap-10 absolute right-10">
      <a href="/login" @click="logout"><span class="text-slate-300"> 登录/登出 </span></a>
      <img src="/avatar.jpg" class="h-4/5 rounded-full" alt="">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { HomeFilled } from '@element-plus/icons-vue';
const logout=()=>{
  localStorage.removeItem('token')
}
</script>

  