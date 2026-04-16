<template>
  <div class="diary">
    <yk-space dir="vertical" size="xl" style="width: 100%;padding-bottom:24px ;">
       <diaryItemView v-for="item in diaryList" :key="item.id" :data="item" @delete="deleteDiary"></diaryItemView>
    </yk-space>
    <div class="pagination">
      <yk-pagination :total="count" size="m" @change="changePage"></yk-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {DiaryDate } from '../../utils/interface';
import {ref,onMounted,getCurrentInstance} from 'vue'
import { mkdiary } from '../../mock/data';
import diaryItemView from './diary-item.vue'

const proxy:any=getCurrentInstance()?.proxy

const props=defineProps({
  pageSize:{
    type:Number,
    default:6,//每页显示数量
  },
  serchTerm:{
    default:'',
    type:String,
  }
})

const request={
  pagesize:props.pageSize,
  nowPage:1,
  serchTerm:props.serchTerm,
  count:true,
}


//获取日记
// 日记
const diaryList = ref<DiaryDate[]>([]);
// 日记总数
const count = ref<number>(0);

const getData=()=>{
  if(request.nowPage==1){
    count.value=mkdiary.count
  }
  let arr=mkdiary.list.slice(//slice方法获取当前页的数据
    (request.nowPage-1)*request.pagesize,
    request.nowPage*request.pagesize
  )
  diaryList.value=[...arr]
}

// 删除
const deleteDiary=(id:number)=>{
  diaryList.value=diaryList.value.filter(item=>item.id!==id)
  proxy.$message({ message:'删除成功', type:'success'})
}


// 翻页
const changePage=(e:number)=>{
  request.nowPage=e; // 📄 更新当前页码（比如从1变成2）
  getData();// 🔄 重新加载数据，但不更新总数
}

onMounted(()=>{//组件挂载时获取日记  就是默认获取数据
  getData()
})
</script>

<style lang="less" scoped>
 .diary{
  width: 100%;

  
 .pagination{
    padding:@space-s 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
 }
</style>