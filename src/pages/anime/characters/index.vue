<template>
  <div class="characters">
    <div class="character" v-for="item in animeStore.characters">
      <div class="left">
        <img @load="handleLoad" class="img" :src="item.images.medium" alt="">
      </div>
      <div class="right">
        <div class="name">
          {{ item.name }}
        </div>
        <div class="relation">
          {{ item.relation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';

const animeStore = useAnimeStore()
const handleLoad = (e) => {
  e.target.style.opacity = 1
}
</script>

<style scoped lang="scss">
.character {
  display: flex;
  margin-bottom: 10px;
  min-height: 100px;

  .left {
    width: 15%;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: all 0.5s;

      &:hover {
        opacity: 0.7 !important;
      }
    }
  }
}
</style>
