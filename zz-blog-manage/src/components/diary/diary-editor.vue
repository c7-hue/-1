<template>
  <div class="diary-editor">
    <div class="diary-editor__form">
      <div class="diary-editor__top">
         <input type="text" class="diary-editor__title" placeholder="请输入标题" v-model="diaryForm.title"/>
         
         <yk-popover placement="bottomRight" title="选择天气">
          <template #content>
            <yk-space wrap :size="[32,20]" style="padding:16px 0 16px 14px">
              <!-- 这里的 :src 直接使用 item.icon，因为在 ts 文件里已经是处理过的路径了 -->
              <div class="diary-editor__weather" v-for="item in weather" 
              :class="{'selected': diaryForm.weatherId === item.id}" @click="selectWeather(item.id)">
                <img :src="item.icon" />
              </div>
            </yk-space>
          </template>
          
          <!-- 这里显示当前选中的天气图标 -->
          <img :src="weather[diaryForm.weatherId]?.icon" />
         </yk-popover>
      </div>

      <yk-text-area v-model="diaryForm.content" :max-length="1600" placeholder="请输入..." 
      :auto-size="{minRows:24,maxRows:24}" />
      
      <div class="diary-editor__picture">
        <yk-upload :uploadUrl="uploadUrl" :file-list="diaryForm.picture" accept="image/*" />
      </div>
    </div>

    <div class="diary-editor__foot">
      <yk-space size="s">
        <yk-button type="secondary">取消</yk-button>
        <yk-button>新建笔记</yk-button>
      </yk-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { weather } from '../../utils/weather';

// 修改点：weatherId 去掉 ? 或者确保初始化时有值，这样 TS 就不会报 "undefined 不能作为索引" 的错误
type DiaryForm = {
  title?: string;
  weatherId: number; // 这里去掉了 ?
  content?: string;
  picture?: string[];
}

// 初始化时明确赋值 weatherId: 0
const diaryForm = ref<DiaryForm>({
  weatherId: 0 
})

// 上传地址
const uploadUrl = 'https://www.huohuo90.com:3005/upload'

// 选择天气
const selectWeather = (id: number) => {
  diaryForm.value.weatherId = id
}
</script>

<style lang="less" scoped>
.diary-editor{
  background: @bg-color-l;
  border-radius: @radius-m;
  width: 100%;

  &__form{
    padding: @space-xl;
  }

  &__top{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title{
    font-size:@size-xl;
    font-weight: bold;
    color:@font-color-l;
    padding-bottom: @space-m;
  }
  &__picture{
    padding-top: @space-xl;
  }

  /* 确保相对定位，这样 ::before 的绝对定位才有效 */
  &__weather {
    position: relative; 
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
  }
  
  /* 设置天气图标显示 */
  img {
    width: 24px;
    height: 24px;
  }

  .selected{
    &::before{
      position: absolute;
      bottom:-6px;
      left: 50%;
      transform: translateX(-50%); /* 让圆点居中 */
      content:"";
      display:block;
      width: 6px;
      height: 6px;
      border-radius: 50%; /* 建议改成 50% 变圆点 */
      background: @pcolor;
    }
  }

  input{
    border: none;
    background: transparent;
    outline: none;

    &::placeholder{
      color:@gray-4;
    }
  }

  &__foot{
    display: flex;
    justify-content: end;
    padding: @space-m;
    border-top: 1px solid @line-color-s;
  }
}
</style>

<style lang="less">
.diary-editor{
  .yk-text-area{
    background-color: transparent;
    border:none;
    border-radius: 0;
    padding:0px;
  }
  .yk-text-area__inner{
    font-size: @size-m;
    line-height: 1.5;
    &::placeholder{
      color:@gray-5;
    }
  }
}
</style>