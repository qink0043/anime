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
    <div v-infinite-scroll="load" :infinite-scroll-immediate="false" class="content">
      <div v-for="(item, index) in filterAnimeList" :key="index" class="card">
        <div class="card-title">{{ item.title_chinese || item.title_japanese }}</div>
        <div class="date">{{ item.aired?.from.slice(0, 10) }} | {{ item.episodes }}个视频</div>
        <div class="types">
          <div class="type" v-for="i in item.genres">{{ i.name }}</div>
        </div>
        <div class="main">
          <div class="main-left">
            <img :src="item.images?.jpg.image_url" alt="">
          </div>
          <div class="main-right"></div>
        </div>
        <div class="info">信息</div>
      </div>
      <!-- 骨架，确保最后一行对齐 -->
      <div class="card" v-for="i in 3 - filterAnimeList.length % 3">
        <el-skeleton class="loading" :rows="5" animated />
      </div>
    </div>
  </div>
</template>

<script setup>
import Menu from '@/components/menu/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'
import { computed, onMounted, ref } from 'vue'
import { useAnimeStore } from '@/store/anime'

const animeStore = useAnimeStore()

//控制tag标签高亮
const tags = ['全部', 'TV', 'ONA', 'OVA', '剧场版', '其他']
//tag标签的映射
const tagMap = {
  '全部': '',
  'TV': 'TV',
  'ONA': 'ONA',
  'OVA': 'ONA',
  '剧场版': 'Movie',
  '其他': 'Special'
}
const selectedIndex = ref(0)
const selectTag = (index) => {
  selectedIndex.value = index
  localStorage.setItem('selectedSpanIndex', index)
}
onMounted(() => {
  //从本地存储拿到高亮tag（如果有）
  selectedIndex.value = parseInt(localStorage.getItem('selectedSpanIndex')) || selectedIndex.value
  animeStore.getSeasonAnimes(2025, 'spring', 1, 6)
})
const page = ref(1)
const load = () => {
  page.value++
  animeStore.getNewSeasonAnimes(2025, 'spring', page.value, 6, tagMap[tags[selectedIndex.value]])
}
//筛选后的数据
const filterAnimeList = computed(() => {
  if ((selectedIndex.value) === 0) {
    return animeStore.seasonAnimeList
  } else {
    return animeStore.seasonAnimeList.filter((item) => {
      return item.type === tagMap[tags[selectedIndex.value]]
    })
  }
})
</script>

<style scoped lang="scss">
.container {
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
      transition: all 0.3s;

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
    justify-content: space-between;
    flex-wrap: wrap;

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 32%;
      margin-bottom: 20px;
      height: 420px;
      border: 1px solid #F0F0F0;

      .loading {
        background-color: #FFFFFF;
        height: 100%;
      }

      .card-title,
      .date,
      .types,
      .main,
      .info {
        min-width: 0;
        overflow: hidden;
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

        .main-left {
          height: 100%;

          img {
            width: 100%;
            max-height: 100%;
          }
        }
      }

      .info {
        flex: 1;
        background-color: #F8F8F8;
      }
    }
  }
}
</style>