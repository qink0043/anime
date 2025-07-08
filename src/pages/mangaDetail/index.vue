<template>
  <div class="manga-detail">
    <div class="left">
      <div class="cover">
        <img referrerpolicy="no-referrer" src="" alt="">
      </div>
      <div class="title">名字</div>
    </div>
    <div class="right">
      <div class="chapter">
        <div class="chapter-title">章节列表</div>
        <div class="chapter-list">
          <div class="chapter-item" v-for="item in mangaStore.epList" :key="item.name" @click="goRead(item.url)">
            <div class="chapter-name">{{ item.name }}</div>
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
const goRead = async (url) => {
  await mangaStore.getEpDetail(url);
  $router.push({
    path: '/mangaRead',
    query: {
      url: url
    }
  })
}
onMounted(() => {
  //如果没有数据则加载数据
  if (mangaStore.epList.length === 0) {
    mangaStore.getEpList($route.query.url);
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