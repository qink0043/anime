<template>
  <div class="icon">
    <img :src="url">
    <span>{{ name }}</span>
  </div>
</template>

<script setup>
defineProps({
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
    width: 140px;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    max-width: 120px;
    font-size: 12px;
    z-index: 999;
    pointer-events: none;
  }
}
</style>