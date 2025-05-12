<template>
  <Menu />
  <div class="title">
    <span>季度动漫</span>
  </div>
  <div class="container">
    <BreadCrumb title_japanese="季度动漫" class="breadCrumb" />
    <div class="filter">
      <span class="tag">全部</span>
      <span class="tag">TV</span>
      <span class="tag">ONA</span>
      <span class="tag">OVA</span>
      <span class="tag">剧场版</span>
      <span class="tag">其他</span>
    </div>
    <div class="content">
      <div class="card">动漫卡片</div>
      <div class="card">动漫卡片</div>
      <div class="card">动漫卡片</div>
      <div class="card">动漫卡片</div>
    </div>
  </div>
</template>

<script setup>
import Menu from '@/components/menu/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'
</script>

<style scoped lang="scss">
.container {
  height: 900px;
  padding: 10px;

  .title {
    background-color: #E1E7F5;
    border-bottom: 1px solid #2E51A2;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    font-size: 20px;
  }

  .filter {
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #D8D8D8;

    .tag {
      border-radius: 10% 10% 0 0;
      background-color: #E1E7F5;
      margin-right: 10px;
      width: 54px;
      padding: 0 5px;
      text-align: center;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      color: #2E51A2;

      &:hover {
        color: white;
        background-color: #2E51A2;
      }
    }
  }

  .content {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .card {
      width: 32%;
      background-color: red;
      margin-right: 10px;margin-top: 20px;
      height: 460px;
      border: 1px solid #F0F0F0;
    }
  }
}
</style>