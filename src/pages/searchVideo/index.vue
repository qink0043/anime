<template>
  <div class="video-list">
    <div class="video-item" v-for="(item, index) in animeStore.searchVideoList" :key="index">
      <img class="img" @click="goWatch(item.url)" :src="item.img" alt="视频封面">
      <div class="video-info">
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const animeStore = useAnimeStore()
const $route = useRoute()
const $router = useRouter()

onMounted(() => {
  //如果没有数据则重新获取数据
  if (!animeStore.searchVideoList.length) {
    animeStore.getVideoList($route.query.keyword)
  }
})
const goWatch = async (url) => {
  await animeStore.getVideoDetail(url)
  $router.push({ path: '/watch' })
}
</script>

<style lang="scss" scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;

  .video-item {
    width: 20%;
    padding: 10px;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .img {
      width: 100%;
      aspect-ratio: 9 / 13;
    }
  }
}
</style>