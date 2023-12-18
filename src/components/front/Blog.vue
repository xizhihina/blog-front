<template>
  <div :style="computedBackStyle" class=" fixed bg-center bg-fixed bg-cover bg-[url('/himehina1.png')] h-full w-full"></div>
  <div class=" z-50 pl-10 text-white flex gap-10 items-center fixed w-full h-16 bg-blue-300/0" :style="computedTopStyle">
    <a href="/home" class="h-3/4">
      <img src="/_HINA.png" class=" h-full" alt="">
    </a>
    <a href="/home">
      <div class=" font-mono text-xl">
        xizhihina
      </div>
    </a>
    <div>
      <a href="/home">
        <el-icon><HomeFilled /></el-icon>
        首页
      </a>
    </div>
    <div>
      <a :href="instance.getUri(config)">
        <el-icon><UserFilled /></el-icon>
        管理
      </a>
    </div>
    <div>
      <el-icon><Cpu /></el-icon>
      Hina-Bot
    </div>
  </div>
  <div class=" absolute flex justify-center h-full w-full">
    <div class=" mt-52 font-mono font-bold text-8xl text-white/90">xizhihina</div>
  </div>
  <div class="relative pt-96 flex flex-row justify-center gap-10">
    <!-- 左侧 -->
    <div class="w-60">
      <!-- 左上 -->
      <div>
        <div class=" rounded-t-3xl w-full h-20 justify-center items-center flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div class=" text-white/80 font-mono text-xl">
            xizhihina
          </div>
        </div>
        <div class=" rounded-b-3xl w-full flex flex-col bg-white text-blue-700">
          <div class=" ml-5 mb-5">
            <div class=" mt-5">
              <a href="/home">
                <el-icon><House /></el-icon>
                首页
              </a>
            </div>
            <div class=" mt-5">
              <a :href="instance.getUri(config)">
                <el-icon><User /></el-icon>
                管理
              </a>
            </div>
            <div class=" mt-5">
              <el-icon><Cpu /></el-icon>
              Hina-Bot
            </div>
          </div>
        </div>
      </div>
      <!-- 左下 -->
      <div>
        <el-affix :offset="40" style="width: 100%;">
          <div class=" text-blue-700 pt-5 pb-5 gap-5 bg-white rounded-3xl mt-10 flex flex-col items-center">
            <div>
              <img class=" rounded-full h-20" src="/avatar.jpg" alt="">
            </div>
            <div class=" font-mono font-medium">
              {{myInfo.userName}}
            </div>
            <div class="flex flex-col items-center">
              <div>{{myInfo.articleCount}}</div>
              <div class=" font-light">文章</div>
            </div>
            <div class=" flex flex-row items-center gap-2">
              <div class=" w-7 h-7 rounded-lg">
                <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" data-v-6c8d2bba=""><path fill="currentColor" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path></svg>
              </div>
              <div>
                Github
              </div>
            </div>
          </div>
        </el-affix>
        </div>
    </div>
    <!-- 右侧 -->
    <div class=" w-2/3 flex-col flex items-center gap-10 mb-10">
      <div v-for="article in articleInfo" :key="article.id" class=" w-11/12 hover:scale-105 duration-200 ease-in-out">
        <a :href="'/article?id='+article.id" target="_blank">
          <div class="w-full hover:shadow-xl rounded-3xl flex-col h-80 bg-white/80 flex items-center">
            <!-- 标题 -->
            <div class="truncate pt-20 text-blue-700 tracking-wide text-3xl w-11/12 text-center">{{ article.title }}</div>
            <!-- 信息及图标 -->
            <div class=" pt-5 text-sm font-mono text-blue-950/80">
              <el-icon><Clock /></el-icon>
              {{ article.publishDate }}
              |
              <el-icon><Reading /></el-icon>
              {{ article.readingQuantity }}
            </div>
            <!-- 简介 -->
            <div class=" pt-10 h-30 w-11/12 text-blue-950/80 indent-8 overflow-hidden text-ellipsis text-justify" style="-webkit-line-clamp: 4; -webkit-box-orient: vertical; display: -webkit-box;">
              {{ article.tabloid }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <!-- 底部背景图作者 -->
  <div class=" z-50 justify-center mt-10 gap-2 relative pb-10 flex w-full ">
    <div class=" text-blue-300/50">Background</div>
    <a href="https://space.bilibili.com/296909317" target="_blank"><div class=" text-blue-800 font-bold">HIMEHINA</div></a>
  </div>
</template>

<script lang="ts" setup>
import { Reading, HomeFilled, UserFilled, Cpu, House, User, Clock } from '@element-plus/icons-vue/global';
import instance from '../../utils/requests';
// import {baseURL} from '../utils/requests';
import {computed, onUnmounted, reactive,ref} from 'vue'

//instance.getUri(config)（返回string），设置<a :href>请求的路径
const config = {
  // baseURL: baseURL,
  url: "backmanage",
  params: {
    token:localStorage.getItem("token")
  }
};

// 请求后端获取MyInfo
interface MyInfo{
  id:number,
  userName:String,
  skill:String,
  articleCount:number
}
let myInfo=reactive<MyInfo>({id:0,userName:'',skill:'',articleCount:0})
instance.get('/api/blog/my_info').then((res:any)=>{myInfo.userName=res.userName;myInfo.skill=res.skill;myInfo.articleCount=res.articleCount})

// 请求后端获取所有文章简介列表
interface ArticleInfo {
  id: number
  title: string
  tabloid: string
  publishDate: string
  readingQuantity: number
}
const articleInfo=ref<ArticleInfo[]>([])
instance.get('/api/blog/article/info').then((res:any)=>{res=res.sort((b:any,a:any)=>{return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();});articleInfo.value=res})

// 获取页面滚动位置，通过位置设置顶栏透明度
const scrollTop = ref(0)
const windowScrollListener=()=>{
  scrollTop.value=document.documentElement.scrollTop
}
window.addEventListener('scroll',windowScrollListener)
onUnmounted(()=>{
  window.removeEventListener('scroll',windowScrollListener)
})
const computedBackStyle = computed(() => {
  return {
    'filter': `blur(${scrollTop.value / 30>10?10:scrollTop.value / 30}px) brightness(${100-scrollTop.value / 30<90?90:100-scrollTop.value / 30}%)`, // 在计算属性中使用scrollTop的值
  };
});
const computedTopStyle = computed(() => {
  return {
    'background-color': `rgb(147 197 253 / ${scrollTop.value / 300>1?1:scrollTop.value / 300})`, // 在计算属性中使用scrollTop的值
  };
});
</script>