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
    <el-table-column label="昵称" width="200">
      <template #default="scope">
      <el-input
          v-model="scope.row.nickName"
          maxlength="10"
          size="small"
          placeholder="Please input"
          show-word-limit
          clearable="true"
          type="text"
          @change="handleEdit(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="BID" width="200">
      <template #default="scope">
      <el-input
          v-model="scope.row.bid"
          maxlength="10"
          size="small"
          placeholder="Please input"
          show-word-limit
          clearable="true"
          type="text"
          @change="handleEdit(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="QID" width="200">
      <template #default="scope">
      <el-input
          v-model="scope.row.qid"
          maxlength="10"
          size="small"
          placeholder="Please input"
          show-word-limit
          clearable="true"
          type="text"
          @change="handleEdit(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column label="等级" width="70">
      <template #default="scope">
      <el-input v-model="scope.row.level" @change="handleEdit(scope.row)" size="small" type="number"/>

      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
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

//接口定义规范
interface User {
  id: number
  nickName: string
  level: number
  bid: string
  qid: string
}
// 请求后端获取所有用户列表
const tableData=ref<User[]>([])
instance.get('/api/user').then((res:any)=>{tableData.value=res;})
// 点击删除按键 1请求后端2删除前端元素
const handleDelete = (index: number, row: User) => {
  if(confirm('确认删除?'))instance.delete('/api/user/'+row.id).then((res:any)=>{if(res==true){tableData.value.splice(index,1)}else{alert('删除失败');}})
}
const handleEdit = (row: User) =>{
  instance.post('/api/user',row).then((res:any)=>{if(res==false)alert('修改失败')})
}
// 增加一组User，发送register请求给后端
const handleAdd=()=>{
  instance.post('/register', {id: tableData.value.length==0?1:tableData.value[tableData.value.length-1].id+1,password: '123456'}).then((res) => {if(res==null){alert('新增失败');return}})
  tableData.value.push({id:tableData.value.length==0?1:tableData.value[tableData.value.length-1].id+1,nickName:'新手工作人员',bid:'',qid:'',level:0})
}
</script>