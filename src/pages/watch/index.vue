<template>
  <div class="container">
    <div class="video">
      <iframe class="video-player" width="100%" height="100%" :scrolling="no" :src="animeStore.videoUrl"
        :frameborder="no" marginwidth="0" marginheight="0">
      </iframe>
    </div>
    <div class="episodes">
      <button v-for="(episode, index) in animeStore.videoDetail?.episode" @click="changeIndex(index)">{{ episode.name
      }}</button>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted, ref } from 'vue';

const animeStore = useAnimeStore()
const episodeIndex = ref(0)

const changeIndex = async (index) => {
  console.log(index);
  episodeIndex.value = index
  await animeStore.getVideoUrl(animeStore.videoDetail?.episode[index]?.url)
}
onMounted(async () => {
  await animeStore.getVideoUrl(animeStore.videoDetail?.episode[0]?.url)
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 900px;

  .video {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
}
</style>