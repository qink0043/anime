<template>
  <div @click="closePlayer" v-if="show" class="video-player">
    <div class="player-container">
      <iframe @load="onLoad" :src="url" frameborder="0"></iframe>
      <div v-if="closeShow" class="closeButton" @click="closePlayer">
        <svg t="1747056132725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5086" width="32" height="32">
          <path
            d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m285.696-266.825143L548.937143 508.342857l243.931428-244.004571a23.552 23.552 0 1 0-33.28-33.28L515.584 475.062857l-248.685714-248.758857a23.405714 23.405714 0 0 0-33.206857 33.206857l248.685714 248.685714-256 256.146286a23.552 23.552 0 0 0 33.28 33.353143l256.073143-256.146286 248.832 248.758857a23.405714 23.405714 0 1 0 33.133714-33.133714z"
            fill="#5F92C4" p-id="5087"></path>
        </svg>
      </div>
    </div>
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
//控制关闭按钮显示
const closeShow = ref(false)
const closePlayer = () => {
  show.value = false
  closeShow.value = false
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    show.value = false
    closeShow.value = false
  }
});
//iframe加载完毕
const onLoad = () => {
  closeShow.value = true
}
</script>

<style scoped lang="scss">
.video-player {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  .player-container {
    position: relative;
    height: 90vh;
    aspect-ratio: 16/9;

    iframe {
      width: 100%;
      height: 100%;
    }

    .closeButton {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);

      svg {
        border-radius: 50%;
        border: 1px solid black;
        background-color: black;
      }
    }
  }
}
</style>