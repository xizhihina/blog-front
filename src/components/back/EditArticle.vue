<template>
  <el-button type="primary" :icon="Back" @click="handleBack" circle />
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    :inline="true"
    status-icon
  >
    <el-form-item label="ID" prop="id">
      <el-select-v2
        v-model="ruleForm.id"
        placeholder="ID"
        :options="options"
      />
    </el-form-item>
    <el-form-item label="文章标题" prop="title" class=" max-w-lg">
      <el-input v-model="ruleForm.title" maxlength="50"
          show-word-limit
          clearable="true"
          type="text" />
    </el-form-item>
    <el-form-item label="文章简介" prop="tabloid" class=" w-full">
      <el-input v-model="ruleForm.tabloid" 
          maxlength="200"
          show-word-limit
          clearable="true"
          type="textarea"/>
    </el-form-item>
    <el-form-item label="发布日期" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.publishDate"
            type="date"
            placeholder="Pick a date"
            style="width: 100% max-width:100px"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="阅读量" prop="readingQuantity">
      <el-input v-model="ruleForm.readingQuantity" type="number" style="max-width: 120px;"/>
    </el-form-item>

    <el-form-item label="文章语言" prop="articleLanguage" class="w-full">
      <el-tag
          v-for="tag in ruleForm.articleLanguage"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="TagClose(tag)"
      >{{ tag }}</el-tag>
      <el-input
          v-if="TagInputVisible"
          ref="TagInputRef"
          v-model="TagInputValue"
          class="ml-1"
          size="small"
          @keyup.enter="TagInputConfirm"
          @blur="TagInputConfirm"
          style="max-width: 85px;"
      />
      <el-button v-else class="button-new-tag ml-1" size="small" @click="TagShowInput">
          + New Tag
      </el-button>

    </el-form-item>
    <el-form-item class=" pl-20">
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>

  <mavon-editor ref="mavon" v-model="ruleForm.content" @save="save" @imgAdd="imgAdd" @imgDel="imgDel"/>
</template>

<script lang="ts" setup>
// 返回上一级
const handleBack=()=>{
  router.back()
}
// mavoneditor
// 按下保存键或ctrl+s
const save=(value:string,render:string)=>{
    console.log(value)
    console.log(render)
}
// //Base64添加图片（不推荐,但是后端不需要额外配置图片保存，比较方便）
// const mavon=ref('')
// const imgAdd=(pos:number,$file:any) =>{
//   (mavon.value as any).$img2Url(pos, $file.miniurl);
// }

//图片上传与删除
const mavon=ref('')
const imgAdd=(pos:number,file:any)=>{
  var formdata = new FormData()
  formdata.append('file', file)
  instance.post("/api/image",formdata).then((res)=>(mavon.value as any).$img2Url(pos, opt.baseURL+'/'+res))
}
const imgDel=(pos:any)=> {//pos:Proxy(Array) {0: 'http://localhost:8080/1698248701039QQ图片20220128232835.jpg', 1: File}
  var imgName = pos[0].split("/").pop(); //获取到图片服务器地址
  instance.delete("/api/image/"+imgName).then((res:any)=> {if (res == false) {alert("删除失败")}})
}

import { Back } from '@element-plus/icons-vue';
import { reactive, ref,nextTick } from 'vue'
import type { FormInstance, FormRules,ElInput } from 'element-plus'
import instance from '../../utils/requests'
import router from '../../utils/router'
import {useRoute} from 'vue-router';
import opt from '../../utils/opt';
const route = useRoute();

interface Article {
  id: number
  title: string
  tabloid: string
  publishDate: string
  readingQuantity: number
  articleLanguage: string[]
  content: string
}
  
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Article>({
  id: route.query['id'] as any,
  title: '',
  tabloid: '',
  publishDate: '',
  readingQuantity: 0,
  articleLanguage: [],
  content: ''//只在页面初始化和最后提交的时候更改
})
instance.get('api/blog/article/info/'+ruleForm.id).then((res:any)=>{ruleForm.title=res.title;ruleForm.tabloid=res.tabloid;ruleForm.publishDate=res.publishDate;ruleForm.readingQuantity=res.readingQuantity})
instance.get('api/blog/article/language/'+ruleForm.id).then((res:any)=>{ruleForm.articleLanguage=res})
instance.get('api/blog/article/content/'+ruleForm.id).then((res:any)=>{ruleForm.content=res})
// 根据item的prop找到dom组件，对其格式做限制
const rules = reactive<FormRules<Article>>({
  id: [{ required: true, message: 'Please input Activity name' },],
  title: [{required: true,message: 'Please select Activity zone',trigger: 'change'},
          { min: 1, max: 50, message: '长度必须在10以内且不能为空', trigger: 'blur' },],
  tabloid: [{required: true,message: 'Please select Activity count',trigger: 'change'},
            { min: 1, max: 200, message: '长度必须在30以内且不能为空', trigger: 'blur' },],
  publishDate: [{required: true,message: 'Please pick a date',trigger: 'change'},],
  readingQuantity: [{required: true,message: 'Please input Activity',trigger: 'change',},],
  articleLanguage: [{required: true,message: 'Please select at least one activity type',trigger: 'change',},],
})
// 提交 检查是否满足格式，满足提交给后端
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      instance.post('/api/blog/article',ruleForm).then((res:any)=>{if(res==true){alert('修改成功');router.push({name:'articleinfo'})}})
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 100 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

//Tag标签（文章使用语言）
const TagInputVisible = ref(false)
const TagInputValue = ref('')
const TagInputRef = ref<InstanceType<typeof ElInput>>()
const TagClose = (tag: string) => {
  ruleForm.articleLanguage.splice(ruleForm.articleLanguage.indexOf(tag), 1)
}
const TagShowInput = () => {
  TagInputVisible.value = true
  nextTick(() => {
    TagInputRef.value!.input!.focus()
  })
}
const TagInputConfirm = () => {
  if (TagInputValue.value) {
    ruleForm.articleLanguage.push(TagInputValue.value)
  }
  TagInputVisible.value = false
  TagInputValue.value = ''
}
</script>
  