<template>
  <yk-space dir="vertical"> <!--//dir="vertical" 垂直方向排列  -->
    <TopTitle name="博客文章" :isSearch="true"> </TopTitle>
    <subset :classify="0" @nowSubset="nowSelect"></subset>
    <yk-space style="width: 100%;">
      <ArticleView style="width: 100%;" :state="nowState" :subsetId="nowSubset"></ArticleView>    
      <labelView ></labelView>
    </yk-space>
    </yk-space>
</template>

<script setup lang="ts">
import TopTitle from '@/components/bar/TopTitle.vue'
import Subset from '../components/subset/subset.vue'
import labelView from '../components/label/label.vue';
import ArticleView from '../components/article/article.vue';
import { ref } from 'vue'

const nowState = ref<number|string>(-1)
const nowSubset = ref<number|string>(-1)

const nowSelect = (e:{id:number|string,type:string})=>{
  // console.log(e);
  if(e.type=='state'){
    nowSubset.value=-1
    nowState.value=e.id
  }else if(e.type=='all'){
    nowState.value=-1
    nowSubset.value=-1
  }else if(e.type=='subset' || e.type=='exclude'){
    nowState.value=-1
    nowSubset.value=e.id
  }
}
</script>

<style lang="less" scoped>
</style>