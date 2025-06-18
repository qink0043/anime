<template>
  <template v-if="userStore.loading">
    <el-skeleton :rows="5" animated />
  </template>
  <div v-show="!userStore.loading" class="container">
    <Top />
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <Bottom /> -->
    <Form v-if="userStore.formVisible" />
    <imageUpload v-if="animeStore.imageUploadVisible" />
  </div>
</template>

<script setup>
import { useAnimeStore } from './store/anime';
import { useUserStore } from './store/user';

const userStore = useUserStore()
const animeStore = useAnimeStore()
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 45px;
    width: 1080px;
    border: 1px solid #7f7f7f;
    background-color: rgba($color: white, $alpha: 0.7);
  }
}
</style>
