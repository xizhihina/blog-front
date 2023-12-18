import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../components/front/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import('../components/front/Register.vue')
  },
  {
    path: '/personaldata',
    name: 'personaldata',
    meta: {
      title: '个人资料'
    },
    component: ()=> import('../components/front/PersonalData.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '主页'
    },
    component: ()=> import('../components/front/Home.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    meta: {
      title: '博客'
    },
    component: ()=> import('../components/front/Blog.vue')
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章'
    },
    component: ()=> import('../components/front/Article.vue')
  },
  {
    path: '/backmanage',
    name: 'backmanage',
    meta: {
      title: '后台管理'
    },
    component: () => import('../components/back/BlankPage.vue'),
    children:[
      {
        path: 'articleinfo',
        name: 'articleinfo',
        meta: {
          title: '文章简介'
        },
        component: () => import('../components/back/ArticleInfo.vue')
      },
      {
        path: 'editarticle',
        name: 'editarticle',
        meta: {
          title: '编辑文章'
        },
        component: () => import('../components/back/EditArticle.vue')
      },
      {
        path: 'usermanagement',
        name: 'usermanagement',
        meta: {
          title: '用户管理'
        },
        component: () => import('../components/back/UserManagement.vue')
      },
    ]
  },
]

const router =createRouter({history: createWebHistory(),routes})
//路由守卫
router.beforeEach((to:any,from,next)=>{
  if (to.meta.title){document.title=to.meta.title}
  if(to.path==='/backmanage'){
    from=from
    // 从localStorage中获取保存的token值
    const tokenStr = localStorage.getItem('token')
    // 没有token，强制跳转到登录页
    if (!tokenStr) next('/login')
  }
  next()
})
export default router