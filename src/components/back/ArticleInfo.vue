<template>
  <el-button type="primary" :icon="Plus" @click="handleAdd" circle />
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column label="ID" width="50">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="文章标题" width="300">
      <template #default="scope">
      <el-input
          v-model="scope.row.title"
          maxlength="50"
          size="small"
          placeholder="Please input"
          show-word-limit
          clearable="true"
          type="text"
          @change="handleEdit(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="文章简介" width="450">
      <template #default="scope">
      <el-input
          v-model="scope.row.tabloid"
          maxlength="200"
          size="small"
          placeholder="Please input"
          show-word-limit
          type="text"
          @change="handleEdit(scope.row)"
          clearable="true"
        />
      </template>
    </el-table-column>
    <el-table-column label="发布日期" width="150">
      <template #default="scope">
      <el-date-picker
          v-model="scope.row.publishDate"
          type="date"
          placeholder="Pick a day"
          size="small"
          value-format="YYYY-MM-DD"
          @change="handleEdit(scope.row)"
          style="width: auto;"
      />
      </template>
    </el-table-column>
    <el-table-column label="阅读量" width="150">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ scope.row.readingQuantity }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" @click="routerEditArticle(scope.row)">Edit</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import instance from '../../utils/requests'
import { Plus } from '@element-plus/icons-vue';
import router from '../../utils/router';

//接口定义规范
interface ArticleInfo {
  id: number
  title: string
  tabloid: string
  publishDate: string
  readingQuantity: number
}
// 请求后端获取所有文章简介列表
const tableData=ref<ArticleInfo[]>([])
instance.get('/api/blog/article/info').then((res:any)=>{tableData.value=res})
// 输入更改时调用
const handleEdit = ( row: ArticleInfo) => {
  instance.post('/api/blog/article',row).then((res:any)=>{if(res==true)alert('修改成功')})
}
// 点击删除按键 1请求后端2删除前端元素
const handleDelete = (index: number, row: ArticleInfo) => {
  if(confirm('确认删除?')){
    instance.delete('/api/blog/article/'+row.id).then((res:any)=>{if(res==true){tableData.value.splice(index,1)}else{alert("删除失败")}})
    instance.get('/api/blog/reduce_article_count')
  }
}
// 前端增加一组Article，自动输入当天日期，月份/日期小于10要在前面补0来满足格式
const handleAdd=()=>{
  let date=new Date()
  let month:string=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1).toString()//vue月份从0开始计算
  let day:string=date.getDate()<10?'0'+date.getDate():date.getDate().toString()
  let nowTime=new Date().getFullYear()+'-'+month+'-'+day
  let data:ArticleInfo={id:tableData.value.length==0?1:tableData.value[tableData.value.length-1].id+1,title:'',tabloid:'',publishDate:nowTime,readingQuantity:0}
  instance.post('/api/blog/article',data).then((res:any)=>{if(res==false)tableData.value.push(data)})
  instance.get('/api/blog/add_article_count')
}
// 路由至文章编辑界面，将文章id传到地址中 0==true
const routerEditArticle=(row:ArticleInfo)=>{
  for(let item in row){if((row as any)[item]==null&&(row as any)[item]!=0){alert("所有属性不能为空");return}}
  router.push({name:'editarticle',query:{'id':row.id}})
}
</script>