## 简介

 Vue3 + TypeScript + Vite + Vue-Router + element-plus + tailwindcss

## 效果展示

![QQ录屏20231218233335 00_00_00-00_00_30~1](https://github.com/xizhihina/blog/assets/118249771/bef90098-2a87-4a53-a551-7c2d0370f018)

### 已经完成功能

登录
注册
文章列表
标签
阅读量
文章详情（支持代码语法高亮）
后台管理

## 前端技术

    "axios": "^1.4.0",
    "element-plus": "^2.3.7",
    "github-markdown-css": "^5.5.0",
    "highlight": "^0.2.4",
    "highlight.js": "^11.9.0",
    "hljs": "^6.2.3",
    "markdown-it": "^14.0.0",
    "mavon-editor": "^3.0.1",
    "vue": "^3.2.47",
    "vue-router": "^4.2.4"
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.3.9",

## Build Setup

```
 # clone
git clone https://github.com/biaochenxuying/blog-vue-typescript.git
```

```
# cd
cd  blog-vue-typescript
```

```
# install dependencies
npm install
```

```
# Compiles and hot-reloads for development
npm run dev
```

```
# Compiles and minifies for production
npm run build
```


需要与后端项目( https://github.com/xizhihina/blog-back )共同运行，否则无法达到预期效果
后端项目我使用的是springboot，后端接口地址在src\utils\opt.ts的baseURL，按需更改即可
