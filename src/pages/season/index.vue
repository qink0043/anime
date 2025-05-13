<template>
  <Menu />
  <div class="title">
    <span>季度动漫</span>
  </div>
  <div class="container">
    <BreadCrumb title_chinese="季度动漫" class="breadCrumb" />
    <div class="filter">
      <span v-for="(item, index) in tags" :key="index" class="tag" @click="selectTag(index)"
        :class="{ active: selectedIndex === index }">{{ item }}</span>
    </div>
    <div class="content">
      <div class="card">
        <div class="card-title">{{ animeStore.seasonAnimeList[0]?.title_chinese || animeStore.seasonAnimeList[0]?.title_japanese }}</div>
        <div class="date">{{ animeStore.seasonAnimeList[0]?.aired.from.slice(0, 10) }} | {{ animeStore.seasonAnimeList[0]?.episodes }}个视频</div>
        <div class="types">
          <div class="type" v-for="item in animeStore.seasonAnimeList[0]?.genres">{{ item.name }}</div>
        </div>
        <div class="main">主题</div>
        <div class="info">信息</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Menu from '@/components/menu/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'
import { onMounted, ref } from 'vue'
import { useAnimeStore } from '@/store/anime'

const animeStore = useAnimeStore()

//控制tag标签高亮
const tags = ['全部', 'TV', 'ONA', 'OVA', '剧场版', '其他']
const selectedIndex = ref(0)
const selectTag = (index) => {
  selectedIndex.value = index
  localStorage.setItem('selectedSpanIndex', index)
}
onMounted(() => {
  //从本地存储拿到高亮tag（如果有）
  selectedIndex.value = parseInt(localStorage.getItem('selectedSpanIndex')) || selectedIndex.value
  animeStore.getSeasonAnimes(2025, 'spring')
})
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

      &.active {
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
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 32%;
      margin-right: 10px;
      margin-top: 20px;
      height: 420px;
      border: 1px solid #F0F0F0;

      .card-title,
      .date,
      .types,
      .main,
      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        line-height: normal;
      }

      .card-title {
        flex: 3;
        color: #1C439B;
        font-weight: 600;
      }

      .date {
        flex: 1;
        background-color: #F8F8F8;
      }

      .types {
        flex: 1;
        background-color: #F0F0F0;
      }

      .main {
        flex: 8;
        background-color: #FFF;
      }

      .info {
        flex: 1;
        background-color: #F8F8F8;
      }
    }
  }
}
</style>