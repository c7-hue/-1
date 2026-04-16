<template>
  <div class="gallery">
    <div class="gallery__content">
      <div class="gallery__content__files">
         <galleryItemView v-for="item in articleList" :key="item.id" :data="item" @delete="deleteArticle" @state="updateState"/>
      </div>
    </div>
    <div class="pagination">
      <yk-pagination :total="count" size="m" @change="changePage"></yk-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleData } from '../../utils/interface';
import {ref,onMounted,getCurrentInstance} from 'vue'
import { mkgallery } from '../../mock/data';
import galleryItemView from './gallery-item.vue'

const proxy:any=getCurrentInstance()?.proxy

const props=defineProps({
  pageSize:{
    type:Number,
    default:6,//每页显示数量
  },
  subsetId:{
    default:-1,
    type:Number,
  },
  state:{
    default:0,
    type:Number,
  },
  serchTerm:{
    default:'',
    type:String,
  }
})

const request={
  pagesize:props.pageSize,
  nowPage:1,
  state:props.state,
  subsetId:props.subsetId,
  serchTerm:props.serchTerm,
  count:true,
}


//获取文章
// 文章
const articleList = ref<ArticleData[]>([]);
// 文章总数
const count = ref<number>(0);

const getData=(e:boolean)=>{
  if(e){
    count.value=mkgallery.count
  }
  let arr=mkgallery.list.slice(//slice方法获取当前页的数据
    (request.nowPage-1)*request.pagesize,
    request.nowPage*request.pagesize
  )
  articleList.value=[...arr]
}

// 删除
const deleteArticle=(id:number)=>{
  articleList.value=articleList.value.filter(item=>item.id!==id)
  proxy.$message({ message:'删除成功', type:'success'})
}

// 修改状态
const updateState=(e:{id:number,state:number})=>{
  articleList.value=articleList.value.map(item=>{
    if(item.id===e.id){
      item.state=e.state
      if(e.state===1){
        proxy.$message({ message:'发布成功', type:'success'})
      }else{
        proxy.$message({ message:'撤回成功', type:'success'})
      }
    }
    return item
  })
}

// 翻页
const changePage=(e:number)=>{
  request.nowPage=e; // 📄 更新当前页码（比如从1变成2）
  getData(false);// 🔄 重新加载数据，但不更新总数
}

onMounted(()=>{//组件挂载时获取文章  就是默认获取数据
  getData(true)
})
</script>

<style lang="less" scoped>
 .gallery{
  width: 100%;
  background: @bg-color-l;
  padding:32px 24px 24px;
  border-radius: @radius-m;

  &__content{
    display: inline;
    &__files{
      display: grid;
      grid-template-columns: repeat(auto-fill, 238px);// 自动填充列数，每个列宽度为240px
      row-gap: 32px;// 行间距为32px
      column-gap: 24px;// 列间距为24px
      justify-items: center;// 水平居中
    }

  }
  
 .pagination{
    padding:@space-s 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
 }
</style>