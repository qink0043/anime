<template>
  <div class="manga-read-container">
    <div class="title">{{ mangaStore.epDetail.title }}</div>
    <div class="content">
      <div class="item" v-for="item in mangaStore.epDetail.image_urls" :key="item.id">
        <img referrerpolicy="no-referrer" :src="item" alt="">
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { useMangaStore } from '@/store/manga';

const mangaStore = useMangaStore()
</script>
<style scoped lang="scss">
.manga-read-container {
  width: 100%;
  height: fit-content;

  .title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0;
  }

  .content {
    width: 100%;

    .item {
      max-width: 100%;

      img {
        max-width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>