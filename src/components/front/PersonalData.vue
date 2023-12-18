<template>
  <!-- 注册后修改个人资料界面 -->
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">修改个人资料</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class=" text-red-600">{{ warnshow }}</div>
      <form class="space-y-6" @submit.prevent="SubmitForm">
        <div>
          <label for="ID" class="block text-sm font-medium leading-6 text-gray-900">用户名</label>
          <div class="mt-2">
            <input v-model="id" readonly id="ID" name="ID" type="text" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="nickname" class="block text-sm font-medium leading-6 text-gray-900">昵称</label>
          </div>
          <div class="mt-2">
            <input v-model="nickname" id="nickname" name="nickname" type="nickname" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="bid" class="block text-sm font-medium leading-6 text-gray-900">B站UID</label>
          </div>
          <div class="mt-2">
            <input v-model="bid" id="bid" name="bid" type="bid" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="qid" class="block text-sm font-medium leading-6 text-gray-900">QQ账号</label>
          </div>
          <div class="mt-2">
            <input v-model="qid" id="qid" name="qid" type="qid" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">提交</button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
          <a href="/home" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">跳过</a>
          <br>
          <br>
          （未补全信息将在一周内删除用户）
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import requests from "../../utils/requests"
import {useRoute} from 'vue-router';
import router from "../../utils/router";
const route = useRoute();
let warnshow=ref('')
let id:string
let nickname:string
let bid:string
let qid:string
id=route.query['id'] as any
const SubmitForm=()=>{
  requests.post('/api/user',{'id':id,'nickName':nickname,'bid':bid,'qid':qid}).then((res:any)=>{
    if(res)router.push({name:'home'})
    else warnshow.value=res
  })
}
</script>