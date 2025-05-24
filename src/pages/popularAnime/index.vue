<template>
  <Menu />
  <div v-infinite-scroll="load" :infinite-scroll-immediate="false" class="container">
    <div class="image-container" v-for="item in animeStore.topPopularAnimeList">
      <Video class="video" @click="openVideoPlyer(item.trailer?.embed_url)" :imgUrl="item.images.jpg.image_url"
        :name="item.title_chinese || item.title_japanese" />
    </div>
    <!-- 骨架，确保最后一行对齐 -->
    <div class="image-container" v-for="i in 5 - animeStore.topPopularAnimeList?.length % 5" v-if="hasMore">
      <el-skeleton class="loading" :rows="5" animated />
    </div>
    <div class="notHasMore" v-else>没有更多了~</div>
  </div>
  <VideoPlayer :url="vidoeUrl" v-model="playerIsShow" />
</template>

<script setup>
import Menu from '@/components/menu/index.vue'
import Video from '@/components/video/index.vue'
import VideoPlayer from '@/components/videoPlayer/index.vue'
import { onMounted, ref } from 'vue';
import { useAnimeStore } from '@/store/anime';

const animeStore = useAnimeStore()

//控制播放器显示与隐藏
const playerIsShow = ref(false)
//播放器播放的视频的链接
const vidoeUrl = ref('')
//点击播放的回调
const openVideoPlyer = (url) => {
  playerIsShow.value = true
  vidoeUrl.value = url
}
onMounted(() => {
  animeStore.getTopAnimes('bypopularity', 1, 10)
})
//点击某个动漫的回调
const goDetail = (id) => {
  console.log(id);
}
//是否有更多数据
const hasMore = ref(true)
//是否正在加载
const isLoading = ref(false)
//初始页数
const page = ref(1)
//触发加载
const load = async () => {
  //如果正在加载或没有更多数据，则不发送请求
  if (isLoading.value || hasMore === false) {
    return
  }
  isLoading.value = true
  page.value++
  await animeStore.getNewTopAnimes('bypopularity', page.value, 10)
  isLoading.value = false
  if (animeStore.newTopAnimeList?.length === 0) {
    hasMore.value = false
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;

  .image-container {
    width: 190px;
    height: 285px;
    overflow: hidden;
    position: relative;
    display: inline-block;

    .video {
      width: 100%;
      height: 100%;
    }

    .loading {
      background-color: #FFFFFF;
      height: 100%;
    }
  }
}
</style>