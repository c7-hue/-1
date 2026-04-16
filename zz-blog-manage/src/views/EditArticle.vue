<template>
  <div class="edit-article">
    <div class="edit-article__topbar">
      <p class="edit-article__topbar__title">新建博客</p> 
      <yk-space align="center">
        <yk-text type="secondary" v-show="nowMoment">{{ nowMoment }}保存</yk-text>  
        <yk-button type="secondary" @click="submit(0)">保存</yk-button>
        <yk-button type="primary" @click="submit(1)">发布</yk-button>  
      </yk-space>
    </div>
    <editor style="width: 1200px;" @editors="editorData" :content="defaultArticle?.[0]">
      <Forms :classify="0" @formData="formData" style="width: 820px;" :form="defaultArticle?.[1]"></Forms>  
    </editor>
  </div>
</template>

<script setup lang="ts">
import editor from "../components/editor/editor.vue"
import Forms from "../components/forms/forms.vue"
// 临时占位，moment 工具函数待补充
import { useArticle } from '../hooks/article'
import {useRouter} from 'vue-router'


const {submit,nowMoment,formData,editorData,defaultArticle,id,getArticleDetail}=useArticle()

const router=useRouter()

if(router.currentRoute.value.query.id){
  id.value=Number(router.currentRoute.value.query.id)
  console.log(id.value);
  getArticleDetail()
}

</script>

<style lang="less" scoped>
.edit-article{
  padding:@space-xl 80px;//上下80px 左右120px
  display: flex;// 弹性布局
  flex-direction: column;// 垂直布局
  align-items: center;// 居中对齐

  &__topbar{
    border-radius: @radius-m;
    background: @bg-color-l;
    padding:@space-l @space-xl;
    margin-bottom: @space-l;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;// 最大宽度 1200px

    &__title{
      .font-xl();
      font-weight: 600;
    }
  }

  &__content{
    display: flex;// 主内容区域 左右布局
    gap: @space-l;// 主内容区域 左右间距
  }

  .edit-form{
    width: 100%;
    background: @bg-color-l;
    border-radius: @radius-m;
    flex: none;
    display: flex;// 弹性布局
    flex-direction: column;// 垂直布局
    padding: 24px;// 内边距 24px
    justify-content: center;// 表单居中
    align-items: center;// 表单居中
  }
}
</style>
