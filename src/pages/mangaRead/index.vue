<template>
  <div class="manga-read-container">
    <div class="title">{{ mangaStore.epDetail.title }}</div>
    <div class="content" ref="contentRef">
      <div class="item" v-for="(url, index) in mangaStore.epDetail" :key="index"
        :ref="el => { if (el) imageRefs[index] = el }">
        <img referrerpolicy="no-referrer" :src="url" alt="">
      </div>
    </div>
    <div class="controller">
      <div class="prev" @click="scrollPrev">
        <svg t="1751872758556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4609" width="64" height="64">
          <path
            d="M512 64C264.32 64 64 264.32 64 512s200.32 448 448 448 448-200.32 448-448-200.32-448-448-448z m256 672l-256-256-256 256v-192l256-256 256 256v192zM865.472 676.032zM865.472 676.032z"
            p-id="4610"></path>
        </svg>
      </div>
      <div class="next" @click="scrollNext">
        <svg t="1751872805472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2847" width="64" height="64">
          <path
            d="M512 64C264.32 64 64 264.32 64 512s200.32 448 448 448 448-200.32 448-448-200.32-448-448-448z m256 416l-256 256-256-256v-192l256 256 256-256v192zM865.472 676.032zM865.472 676.032z"
            p-id="2848"></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMangaStore } from '@/store/manga';
import { onMounted, onUnmounted, ref } from 'vue'

const mangaStore = useMangaStore()
const contentRef = ref(null)
const imageRefs = ref([])
//当前显示的图片索引
const imageIndex = ref(0)
const scrollPrev = () => {
  imageIndex.value = Math.max(--imageIndex.value, 0)
  console.log(imageIndex.value);

  // 获取上一张图片的DOM元素
  const prevImage = imageRefs.value[imageIndex.value]
  if (prevImage) {
    // 平滑滚动到该元素
    prevImage.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
const scrollNext = () => {
  imageIndex.value = Math.min(++imageIndex.value, mangaStore.epDetail.image_urls.length - 1)
  console.log(imageIndex.value);
  // 获取下一张图片的DOM元素
  const nextImage = imageRefs.value[imageIndex.value]
  if (nextImage) {
    // 平滑滚动到该元素
    nextImage.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 检测图片顶部是否接近视口顶部（5px容差）
      if (entry.isIntersecting && entry.boundingClientRect.top <= 45) {
        const index = imageRefs.value.findIndex(ref => ref === entry.target)
        if (index !== -1) imageIndex.value = index
      }
    })
  }, {
    threshold: 0.1,
    root: null // 使用视口作为根
  })

  // 观察所有图片
  imageRefs.value.forEach(el => el && observer.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
<style scoped lang="scss">
.manga-read-container {
  width: 100%;
  height: fit-content;

  .title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0;
  }

  .content {
    width: 100%;

    .item {
      min-width: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .controller {
    display: flex;
    justify-content: space-between;
    width: 60%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>