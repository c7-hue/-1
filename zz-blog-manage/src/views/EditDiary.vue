<template>
  <div class="edit-diary">
    <div class="edit-diary__topbar">
      <p class="edit-diary__topbar__title">新建日记</p>
      <yk-space>
        <yk-button type="secondary">取消</yk-button>
        <yk-button type="primary">发布</yk-button>
      </yk-space>
    </div>
    <div class="edit-diary__content">
      <div class="edit-diary__main">
        <yk-input placeholder="请输入日记标题" size="l"></yk-input>
        <yk-text-area placeholder="请输入日记内容" :rows="20"></yk-text-area>
      </div>
      <div class="edit-diary__sidebar">
        <div class="edit-diary__sidebar__section">
          <p class="section-title">发布设置</p>
          <yk-space vertical>
            <yk-input placeholder="选择日期" type="date"></yk-input>
            <yk-input placeholder="选择天气"></yk-input>
            <yk-input placeholder="选择心情"></yk-input>
          </yk-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 日记编辑逻辑
</script>

<style lang="less" scoped>
.edit-diary {
  padding: @space-xl 80px;

  &__topbar {
    border-radius: @radius-m;
    background: @bg-color-l;
    padding: @space-l @space-xl;
    margin-bottom: @space-l;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      .font-xl();
      font-weight: 600;
    }
  }

  &__content {
    display: flex;
    gap: @space-l;
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: @space-l;
  }

  &__sidebar {
    width: 440px;
    flex: none;

    &__section {
      background: @bg-color-l;
      border-radius: @radius-m;
      padding: @space-l;

      .section-title {
        .font-l();
        font-weight: 600;
        margin-bottom: @space-l;
      }
    }
  }
}
</style>