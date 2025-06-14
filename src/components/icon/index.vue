<template>
  <div class="icon">
    <img loading="lazy" class="realImg" :key="url" :src="url" :title="name">
    <span>{{ name }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
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
.icon {
  position: relative;
  width: 140px;
  height: 180px;
  overflow: hidden;
  display: inline-block;
  box-shadow: inset 0 -15px 15px -10px black;
  box-shadow: 0 0 1px black;

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

  .realImg {
    z-index: 2;
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
    white-space: nowrap;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    max-width: 120px;
    font-size: 12px;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>