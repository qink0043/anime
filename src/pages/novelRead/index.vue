<template>
  <div class="novel-reader" :class="{ 'dark-mode': darkMode }">
    <div class="reader-header">
      <button @click="goBack" class="btn-back">←</button>
      <h2 class="chapter-title">{{ novelStore.tocList[0].name }}</h2>
      <div class="reader-settings">
        <button @click="toggleDarkMode" class="btn-settings">
          {{ darkMode ? '☀️' : '🌙' }}
        </button>
        <div class="font-size-control">
          <button @click="decreaseFontSize" class="btn-font">A-</button>
          <span class="font-size">{{ fontSize }}px</span>
          <button @click="increaseFontSize" class="btn-font">A+</button>
        </div>
      </div>
    </div>

    <div class="reader-content" :style="{ fontSize: fontSize + 'px' }">
      <div class="paragraph" ref="content">
      </div>
      <div class="nextPage"></div>
    </div>

    <div class="reader-footer">
      <button @click="prevChapter" :disabled="novelStore.currentTocIndex === 0" class="btn-nav">
        上一章
      </button>
      <button @click="nextChapter" :disabled="novelStore.currentTocIndex === novelStore.tocList.length - 1" class="btn-nav">
        下一章
      </button>
    </div>

    <div class="chapter-list" ref="chapterList">
      <div class="list-header">
        <h3>章节列表</h3>
        <button @click="toggleChapterList" class="btn-close">×</button>
      </div>
      <ul>
        <li v-for="(chapter, index) in novelStore.tocList" :key="index" @click="selectChapter(index)"
          :class="{ 'current-chapter': index === novelStore.currentTocIndex }">
          {{ chapter.name }}
        </li>
      </ul>
    </div>

    <button @click="toggleChapterList" class="btn-chapter-list">
      目录
    </button>
  </div>
</template>

<script setup>
import { useNovelStore } from '@/store/novel'
import { ref, onMounted } from 'vue'

const novelStore = useNovelStore()
const darkMode = ref(false) // 暗黑模式
const fontSize = ref(18)
const currentChapterIndex = ref(0)
const content = ref(null)
const chapterList = ref(null)
const isChapterListVisible = ref(false)

//刷新当前内容
const refreshContent = () => {
  content.value.innerHTML = novelStore.content.content
}
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

const increaseFontSize = () => {
  if (fontSize.value < 26) {
    fontSize.value += 2
  }
}

const decreaseFontSize = () => {
  if (fontSize.value > 12) {
    fontSize.value -= 2
  }
}

const toggleChapterList = () => {
  isChapterListVisible.value = !isChapterListVisible.value
  if (isChapterListVisible.value) {
    chapterList.value.style.transform = 'translateX(0)'
  } else {
    chapterList.value.style.transform = 'translateX(-100%)'
  }
}

//选择章节后
const selectChapter = async (index) => {
  novelStore.currentTocIndex = index
  await novelStore.getContent(novelStore.tocList[index].url)
  refreshContent()
  toggleChapterList()
  window.scrollTo(0, 0)
  getAllContent()
}

//获取全部content
const getAllContent = async () => {
  while(novelStore.content.nextUrl !== '') {
    await novelStore.getMore(novelStore.content.nextUrl)
    refreshContent()
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

//下一章
const nextChapter = async () => {
  novelStore.currentTocIndex++
  await novelStore.getContent(novelStore.tocList[novelStore.currentTocIndex].url)
  refreshContent()
  window.scrollTo(0, 0)
  getAllContent()
}

//上一章
const prevChapter = async () => {
  novelStore.currentTocIndex--
  await novelStore.getContent(novelStore.tocList[novelStore.currentTocIndex].url)
  refreshContent()
  window.scrollTo(0, 0)
  getAllContent()
}

const goBack = () => {
  window.history.back()
}

onMounted( async () => {
  refreshContent()
  getAllContent()
})
</script>

<style scoped lang="scss">
.novel-reader {
  font-family: 'SimSun', '宋体', serif;
  width: 100%;
  padding: 20px;
  background-color: #f8f4e8;
  color: #333;
  min-height: 100vh;
  position: relative;
  line-height: 1.8;
  transition: background-color 0.3s, color 0.3s;
}

.novel-reader.dark-mode {
  background-color: #222;
  color: #ccc;
}

.reader-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.dark-mode .reader-header {
  border-bottom-color: #444;
}

.chapter-title {
  margin: 0;
  font-size: 1.5em;
  text-align: center;
  flex-grow: 1;
}

.reader-settings {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-back,
.btn-settings,
.btn-font,
.btn-nav,
.btn-chapter-list {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.dark-mode .btn-back,
.dark-mode .btn-settings,
.dark-mode .btn-font,
.dark-mode .btn-nav,
.dark-mode .btn-chapter-list {
  border-color: #666;
  color: #ccc;
}

.btn-back:hover,
.btn-settings:hover,
.btn-font:hover,
.btn-nav:hover,
.btn-chapter-list:hover {
  background-color: #eee;
}

.dark-mode .btn-back:hover,
.dark-mode .btn-settings:hover,
.dark-mode .btn-font:hover,
.dark-mode .btn-nav:hover,
.dark-mode .btn-chapter-list:hover {
  background-color: #444;
}

.font-size-control {
  display: flex;
  align-items: center;
  gap: 5px;
}

.font-size {
  min-width: 40px;
  text-align: center;
}

.reader-content {
  margin-bottom: 60px;

  .paragraph {
    text-indent: 2em;
    margin-bottom: 1em;
  }
}

.reader-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f4e8;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
}

.dark-mode .reader-footer {
  background-color: #222;
  border-top-color: #444;
}

.dark-mode .chapter-progress {
  color: #999;
}

.btn-nav:disabled {
  opacity: 0.5;
}

.chapter-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 40%;
  height: 100vh;
  background-color: #f8f4e8;
  z-index: 100;
  transform: translateX(-100%);
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.dark-mode .chapter-list {
  background-color: #333;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

.chapter-list.show {
  transform: translateX(0);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.dark-mode .list-header {
  border-bottom-color: #444;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.chapter-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapter-list li {
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.dark-mode .chapter-list li {
  border-bottom-color: #444;
}

.chapter-list li:hover {
  background-color: #eee;
}

.dark-mode .chapter-list li:hover {
  background-color: #444;
}

.current-chapter {
  font-weight: bold;
  color: #c00;
}

.dark-mode .current-chapter {
  color: #f55;
}

.btn-chapter-list {
  position: fixed;
  bottom: 70px;
  right: 20px;
  padding: 8px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
  .novel-reader {
    padding: 10px;
  }

  .reader-header {
    flex-wrap: wrap;
    gap: 10px;
  }

  .chapter-title {
    order: 1;
    width: 100%;
    font-size: 1.2em;
  }

  .reader-content {
    font-size: 14px !important;
  }
}
</style>