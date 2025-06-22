<template>
  <div class="video" @click="openPlayer">
    <img ref="imgRef" @load="handleLoad" :src="imgUrl">
    <span>{{ name }}</span>
    <div class="play-icon">
      <svg t="1748751846712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2642" width="32" height="32">
        <path
          d="M426.666667 682.666667V384l256 149.845333L426.666667 682.666667z m587.093333-355.541334s-10.026667-71.04-40.704-102.357333c-38.954667-41.088-82.602667-41.258667-102.613333-43.648C727.168 170.666667 512.213333 170.666667 512.213333 170.666667h-0.426666s-214.954667 0-358.229334 10.453333c-20.053333 2.389333-63.658667 2.56-102.656 43.648-30.677333 31.317333-40.661333 102.4-40.661333 102.4S0 410.538667 0 493.952v78.293333c0 83.456 10.24 166.912 10.24 166.912s9.984 71.04 40.661333 102.357334c38.997333 41.088 90.154667 39.765333 112.938667 44.074666C245.76 893.568 512 896 512 896s215.168-0.341333 358.442667-10.752c20.053333-2.432 63.658667-2.602667 102.613333-43.690667 30.72-31.317333 40.704-102.4 40.704-102.4s10.24-83.413333 10.24-166.869333v-78.250667c0-83.456-10.24-166.912-10.24-166.912z"
          fill="#FF0000" p-id="2643"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { ref } from 'vue'
const userStore = useUserStore()
const imgRef = ref(null)
const handleLoad = () => {
  userStore.loading = false
  imgRef.value.style.opacity = 1
}
defineProps({
  imgUrl: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.video {
  position: relative;
  width: 140px;
  height: 180px;
  overflow: hidden;
  display: inline-block;
  box-shadow: inset 0 -15px 15px -10px black;
  box-shadow: 0 0 1px black;

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &:hover img {
    opacity: 0.7 !important;
  }

  img {
    opacity: 0;
    transition: all 0.5s;
    width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25px;
    background: linear-gradient(to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.5) 60%,
        rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
    filter: blur(1px);
  }

  span {
    min-width: 100%;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    max-width: 120px;
    font-size: 12px;
    z-index: 1;
    pointer-events: none;
  }
}
</style>