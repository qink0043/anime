<template>
  <div class="video-list">
    <div class="video-item" @click="goWatch(item.url)" v-for="(item, index) in animeStore.searchVideoList" :key="index">
      <div class="img-container">
        <img ref="imgRef" class="img" @load="handleLoad(index)" :src="item.img" alt="">
      </div>
      <div class="video-info">
        <div>{{ item.title }}</div>
      </div>
    </div>
    <div class="tip">没有更多啦~</div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const animeStore = useAnimeStore()
const $route = useRoute()
const $router = useRouter()
const imgRef = ref(null)

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
const handleLoad = (index) => {
  imgRef.value[index].style.opacity = 1
}
</script>

<style lang="scss" scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;

  .video-item {
    width: 20%;
    padding: 10px;
    height: 300px;
    box-sizing: border-box;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .img-container {
      width: 100%;
      aspect-ratio: 9 / 20;
      overflow: hidden;

      .img {
        flex: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: all 0.5s ease;
      }
    }

    .video-info {
      font-size: 14px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.tip {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>