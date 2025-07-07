<template>
  <div class="manga-detail">
    <div class="left">
      <div class="cover">
        <img referrerpolicy="no-referrer" :src="mangaStore.mangaDetail.cover_image_url" alt="">
      </div>
      <div class="title">{{ mangaStore.mangaDetail.name }}</div>
      <div class="author">作者：{{ mangaStore.mangaDetail.author }}</div>
      <div class="site">来源：{{ mangaStore.mangaDetail.source_name }}</div>
      <div class="desc">简介：{{ mangaStore.mangaDetail.desc }}</div>
      <div class="crawl">更新时间：{{ mangaStore.mangaDetail.crawl_time }}</div>
      <div class="tag">标签：{{ mangaStore.mangaDetail.tag }}</div>
    </div>
    <div class="right">
      <div class="chapter">
        <div class="chapter-title">章节列表</div>
        <div class="chapter-list">
          <div class="chapter-item" v-for="item in mangaStore.mangaDetail.chapters" :key="item.chapter_number" @click="goRead(item.chapter_number)">
            <div class="chapter-name">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMangaStore } from '@/store/manga';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const mangaStore = useMangaStore();
const $route = useRoute();
const $router = useRouter();

//跳转阅读
const goRead = async (chapter_number) => {
  await mangaStore.getEpDetail('qq', $route.query.comicid, chapter_number);
  $router.push({
    path: '/mangaRead',
    query: {
      comicid: $route.query.comicid,
      chapter_number: chapter_number
    }
  })
}
onMounted(() => {
  //如果没有数据则加载数据
  if (Object.keys(mangaStore.mangaDetail).length === 0) {
    mangaStore.getMangaDetail('qq', $route.query.comicid);
  }
})
</script>
<style scoped lang="scss">
.manga-detail {
  display: flex;
  padding: 10px;

  .left {
    width: 250px;
    padding-right: 10px;
    border-right: 1px solid #ccc;

    :not(.cover) {
      margin-top: 10px;
    }

    .cover {
      width: 100%;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .right {
    flex: 1;
    padding: 10px;

    .chapter {
      flex: 1;

      .chapter-title {
        font-size: 18px;
        font-weight: bold;
      }

      .chapter-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .chapter-item {
          padding: 5px;
          margin-top: 5px;
          margin: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;

          &:hover {
            background-color: #f0f0f0;
          }

          .chapter-name {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>