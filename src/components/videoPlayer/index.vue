<template>
  <div @click="closePlayer" v-if="show" class="video-player" id="video-player">
    <iframe height="680" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  url: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  }
})
const show = defineModel()
const closePlayer = () => {
  show.value = false
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    show.value = false
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