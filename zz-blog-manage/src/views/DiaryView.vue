<template>
  <yk-space dir="vertical" size="l" style="width: 100%;"> <!--//dir="vertical" 垂直方向排列  -->
    <TopTitle name="随笔随记" :isSearch="true"> </TopTitle>
      <yk-space style="width: 100%;">
         <DiaryVue></DiaryVue>
         <DiaryEditor style="flex:none;width: 600px;"></DiaryEditor>
     </yk-space>
    </yk-space>
</template>

<script setup lang="ts">
import TopTitle from '@/components/bar/TopTitle.vue'
import DiaryEditor from '@/components/diary/diary-editor.vue'
import DiaryVue from '@/components/diary/diary.vue'
</script>

<style lang="less" scoped>

</style>