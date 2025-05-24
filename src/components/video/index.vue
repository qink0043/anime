<template>
  <div class="video" @click="openPlayer">
    <img @load="onLoad" :src="imgUrl">
    <img :src="url" src="@/assets/img/loading.gif" :title="name" v-if="!loaded">
    <span>{{ name }}</span>
    <div class="play-icon">
      <svg t="1746976513402" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2646" width="32" height="32">
        <path
          d="M507.456 64C262.528 64 64 262.752 64 507.904c0 245.12 198.528 443.872 443.456 443.872 244.896 0 443.456-198.752 443.456-443.872C950.912 262.752 752.352 64 507.456 64z m0 843.408c-220.432 0-399.136-178.88-399.136-399.504C108.32 287.2 287.04 108.368 507.456 108.368c220.432 0 399.136 178.88 399.136 399.536 0 220.624-178.704 399.504-399.136 399.504z m201.28-430.96C639.76 429.44 514.656 359.072 443.36 315.52c-29.232-18.496-53.776-11.088-56.144 21.504-1.728 87.248 0 255.52 0 344.32 1.44 33.04 30.592 37.408 55.92 24.08L708.16 544.736c-0.496-0.272 54.272-30.464 0.592-68.288z"
          fill="#000000" p-id="2647"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loaded = ref(false)
const onLoad = () => {
  loaded.value = true
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
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 2px solid black;
    border-radius: 12px;
    padding: 0 5px;
    box-shadow: 0 0 5px;
    pointer-events: none;
    background-color: gray;
    opacity: 0.8;
  }

  &:hover img {
    opacity: 0.7;
  }

  img {
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