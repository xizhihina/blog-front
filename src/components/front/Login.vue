<template>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-full w-full" src="/HINAxi.png" alt="Your Company">
        <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class=" text-red-600">{{ warnshow }}</div>
    <form class="space-y-6" @submit.prevent="SubmitForm">
      <div>
        <label for="ID" class="block text-sm font-medium leading-6 text-gray-900">账号</label>
        <div class="mt-2">
          <input v-model="id" id="ID" name="ID" type="text" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">密码</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码?</a>
          </div>
        </div>
        <div class="mt-2">
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">登录</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      没有账号?
      <a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">点击此处注册</a>
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
  //小于30返回的是错误信息，大于30认为返回的是token
  requests.post('/api/login',{'id':id,'password':password}).then((res:any)=>{
    if(res.length>30){
      localStorage.setItem('token',res)
      router.push({name:'home'})
    }else warnshow.value=(res.length<30?res:'');
  })
}
</script>