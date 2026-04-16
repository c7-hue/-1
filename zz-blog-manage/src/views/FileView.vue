<template>
  <yk-space size="l" dir="vertical" class="file-view">
    <top-title name="本地文件" :isSearch="false" style="margin-bottom: 8px;">
      <template #custom >
        <yk-space align="center">
          <yk-text type="third" >图片、视频、音频大小不超过20M</yk-text>
          <yk-button>上传</yk-button>
        </yk-space>
      </template>
    </top-title>
    <subset :classify="2"></subset> 
    <files :pageSize="20" :subsetId="0"></files>
  </yk-space>
</template>

<script setup lang="ts">
import TopTitle from '../components/bar/TopTitle.vue'
import Subset from '../components/subset/subset.vue'
import Files from '../components/files/files.vue'
</script>

<style lang="less" scoped>
.file-view{
  width: 100%;
}
</style>