<template>
 <yk-space dir="vertical" size="l" style="width: 100%;">  <!--//dir="vertical" 垂直方向排列  -->
    <TopTitle name="摄影图库" :isSearch="true"> </TopTitle>
    <subset :classify="1"></subset>
    <galleryVue></galleryVue>
    </yk-space>
</template>

<script setup lang="ts">
import TopTitle from '@/components/bar/TopTitle.vue'
import Subset from '../components/subset/subset.vue'
import galleryVue from '../components/gallery/gallery.vue'
</script>

<style lang="less" scoped>
</style>