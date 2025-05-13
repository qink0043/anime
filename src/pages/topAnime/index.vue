<template>
  <div class="container">
    <div class="animer" v-for="i in animeStore.searchAnimesList" :key="i.mal_id" @click="goDetail(i.mal_id)">
      <div class="img">
        <img :src="i.images.jpg.image_url" alt="">
      </div>
      <span>{{ i.title_chinese || i.title_japanese }}</span>
      <span>年份:{{ i.year || '暂无' }}</span>
      <span>评分</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useAnimeStore } from '@/store/anime';
const $route = useRoute()
const $router = useRouter()
const animeStore = useAnimeStore()
const keyword = ref($route.query.search)
onMounted(() => {
  animeStore.getSearchAnimes(keyword.value)
})
//点击某个动漫的回调
const goDetail = (id) => {
  console.log(id);
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

  .animer {
    width: 150px;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      height: 20px;
      line-height: 20px;
    }

    .img {
      width: 100%;
      height: 200px;
      display: flex;
      overflow: hidden;
      img {
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>