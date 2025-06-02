<template>
  <div>
    <div class="video-list">
      <div class="video-item" v-for="(item, index) in animeStore.searchVideoList" :key="index">
        <img @click="goWatch(item.url)" :src="item.img" alt="视频封面">
        <div class="video-info">
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getVideoDetailAPI } from '@/api/anime';
import { useAnimeStore } from '@/store/anime';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const animeStore = useAnimeStore()
const $route = useRoute()

onMounted(() => {
  //如果没有数据则重新获取数据
  console.log(animeStore.searchVideoList);

  if (!animeStore.searchVideoList.length) {
    animeStore.getVideoList($route.query.keyword)
  }
})
const goWatch = async (url) => {
  console.log(url);
  const res = await getVideoDetailAPI(url)
  console.log(res);
  
}
</script>

<style lang="scss" scoped></style>