<template>
  <div @click="closePlayer" v-if="videoIsShow && show" class="video-player" id="video-player">
    <iframe height="680" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  url: {
    type: String,
    default: ''
  }
})
const videoIsShow = defineModel()
const show = ref(true)
const closePlayer = () => {
  show.value = false
  videoIsShow.value = false
  show.value = true
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    show.value = false
    videoIsShow.value = false
    show.value = true
  }
});
</script>

<style scoped lang="scss">
.video-player {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 999;

  iframe {
    width: 80vw;
  }
}
</style>