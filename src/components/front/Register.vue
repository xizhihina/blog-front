<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-full w-full" src="/HINAxi.png" alt="Your Company">
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">注册</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class=" text-red-600">{{ warnshow }}</div>
      <form class="space-y-6" @submit.prevent="SubmitForm">
        <div>
          <label for="ID" class="block text-sm font-medium leading-6 text-gray-900">ID</label>
          <div class="mt-2">
            <input v-model="id" id="ID" name="ID" type="text" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">密码</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">注册</button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
          <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">返回登录界面</a>
      </p>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { ref } from "vue";
import requests from "../../utils/requests"
import router from "../../utils/router";
let warnshow=ref('')
let id:string
let password:string
const SubmitForm=()=>{
  requests.post('/api/register',{'id':id,'password':password}).then((res:any)=>{
    if(res.length<30){warnshow.value=res}
    else{localStorage.setItem('token',res);router.push({name:'personaldata',query:{'id':id}})}})
}
</script>