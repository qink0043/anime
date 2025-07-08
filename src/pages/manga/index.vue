<template>
  <div class="manga">
    <div class="top">
      <div class="manga-search">
        <el-form @submit.prevent="searchManga">
          <el-input class="input" v-model="input" placeholder="输入漫画关键词" clearable>
            <template #prefix>
              <el-icon style="vertical-align: middle">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="search-result">
        <div class="item" v-for="item in mangaStore.searchList" :key="item.url">
          <div class="cover" @click="goDetail(item.url)">
            <img referrerpolicy="no-referrer" :src="item.cover" alt="">
          </div>
          <div class="info">
            <div class="title">{{ item.name }}</div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMangaStore } from '@/store/manga';
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const mangaStore = useMangaStore()
const input = ref('')
const $router = useRouter()
const searchManga = async () => {
  if (!input.value) {
    return
  }
  await mangaStore.getSearch(input.value)
}

//跳转到漫画详情
const goDetail = async (url) => {
  await mangaStore.getEpList(url)
  $router.push({
    path: '/mangaDetail',
    query: {
      url
    }
  })
}

onMounted(() => {
  
})

</script>
<style scoped lang="scss">
.manga {
  .top {
    display: flex;
    align-items: center;

    .manga-search {
      .input {
        width: 300px;
      }
    }
  }

  .content {
    .search-result {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 18%;
        margin: 10px;

        .cover {
          width: 100%;
          aspect-ratio: 9/16;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

          &:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .info {
          .title {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

}
</style>