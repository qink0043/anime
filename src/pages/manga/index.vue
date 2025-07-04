<template>
  <div class="manga">
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="400px" motion-blur cardScale="0.9">
        <el-carousel-item v-for="item in mangaStore.bannerList" :key="item.id">
          <img :src="item.img" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="manga-search">
      <el-form @submit="searchManga">
        <el-input class="input" v-model="input" placeholder="输入漫画关键词" clearable></el-input>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { useMangaStore } from '@/store/manga';
import { onMounted, ref } from 'vue';

const mangaStore = useMangaStore()
const input = ref('')

const searchManga = async () => {
  if(!input.value) {
    return
  }
  await mangaStore.getSearchManga(input.value, -1)
}
onMounted(async () => {
  await mangaStore.getBanner()
})

</script>
<style scoped lang="scss">
.manga {
  display: flex;
  flex-direction: column;

  .banner {
    height: 400px;

    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .manga-search {
    .input {
      width: 300px;
    }
  }
}
</style>