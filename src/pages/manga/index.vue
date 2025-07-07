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
      <div class="change-site">
        <el-dropdown @command="changeSite" trigger="click">
          <span class="el-dropdown-link">
            切换站点<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">腾讯漫画</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <div class="search-result">
        <div class="item" v-for="item in mangaStore.searchList" :key="item.comicid">
          <div class="cover" @click="goDetail(item.comicid)">
            <img referrerpolicy="no-referrer" :src="item.cover_image_url" alt="">
          </div>
          <div class="info">
            <div class="title">{{ item.name }}</div>
            <div class="site">来源：{{ item.site }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMangaStore } from '@/store/manga';
import { onMounted, ref } from 'vue';
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const mangaStore = useMangaStore()
const input = ref('')
const $router = useRouter()
const searchManga = async () => {
  if (!input.value) {
    return
  }
  await mangaStore.getSearch('qq', input.value, 20)
}

//跳转到漫画详情
const goDetail = async (comicid) => {
  await mangaStore.getMangaDetail('qq', comicid)
  $router.push({
    path: '/mangaDetail',
    query: {
      comicid
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
          width: 200px;
          min-height: 200px;
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

          .site {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }

}
</style>