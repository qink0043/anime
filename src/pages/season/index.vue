<template>
  <Menu />
  <div class="title">
    <span>季度动漫</span>
  </div>
  <div class="container">
    <BreadCrumb title_chinese="季度动漫" class="breadCrumb" />
    <div class="filter">
      <span v-for="(item, index) in tags" :key="index" class="tag" @click="selectTag(index)"
        :class="{ active: selectedIndex === index }">{{ item }}</span>
    </div>
    <div v-infinite-scroll="load" :infinite-scroll-immediate="false" class="content">
      <div v-for="(item, index) in filterAnimeList" :key="index" class="card">
        <div class="card-title">{{ item.title_chinese || item.title_japanese }}</div>
        <div class="date">{{ item.aired?.from.slice(0, 10) }} | {{ item.episodes }}个视频</div>
        <div class="types">
          <div class="type" v-for="i in item.genres">{{ i.name }}</div>
        </div>
        <div class="main">
          <div class="main-left">
            <img @load="handleLoad" @click="goDetailByName(item.title_japanese)" :src="item.images?.jpg.image_url" alt=""
              :title="item.title_chinese || item.title_japanese" />
          </div>
          <div class="main-right"></div>
        </div>
        <div class="info">信息</div>
      </div>
      <!-- 骨架，确保最后一行对齐 -->
      <div class="card" v-for="i in 6 - filterAnimeList?.length % 3" v-if="tagMap[tags[selectedIndex]].hasMore">
        <el-skeleton class="loading" :rows="5" animated />
      </div>
      <div class="notHasMore" v-else>没有更多了~</div>
    </div>
  </div>
</template>

<script setup>
import Menu from '@/components/menu/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'
import { computed, onMounted, ref, reactive, watch, nextTick } from 'vue'
import { useAnimeStore } from '@/store/anime'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const $router = useRouter()
const animeStore = useAnimeStore()
const userStore = useUserStore()

//图片加载完成后
const handleLoad = (e) => {
  userStore.loading = false
  e.target.style.opacity = 1
}
//控制tag标签高亮
const tags = ['全部', 'TV', 'ONA', 'OVA', '剧场版', '其他']
//tag标签的映射
const tagMap = reactive({
  '全部': { filter: '', hasMore: true, page: 1 },
  'TV': { filter: 'TV', hasMore: true, page: 0 },
  'ONA': { filter: 'ONA', hasMore: true, page: 0 },
  'OVA': { filter: 'OVA', hasMore: true, page: 0 },
  '剧场版': { filter: 'Movie', hasMore: true, page: 0 },
  '其他': { filter: 'Special', hasMore: true, page: 0 }
})
const selectedIndex = ref(0)
const selectTag = (index) => {
  selectedIndex.value = index
  localStorage.setItem('selectedSpanIndex', index)
}
//请求锁
const isLoading = ref(false)
//判断当前高度是否能滚动
const scrollable = () => {
  return document.documentElement.scrollHeight > window.innerHeight
}
const goDetailByName = async (keyword) => {
  const res = await animeStore.getSearchAnime(keyword, 1, 2)
  const id = res?.list[0].id
  await animeStore.getAnimeDetail(id)
  $router.push({ path: '/anime', query: { id } })
}
onMounted(() => {
  //从本地存储拿到高亮tag（如果有）
  selectedIndex.value = parseInt(localStorage.getItem('selectedSpanIndex')) || 0
  animeStore.getSeasonAnimes(2025, 'summer', 1, 6)
})
const load = async () => {
  const tagData = tagMap[tags[selectedIndex.value]]
  //如果正在加载或没有更多数据，则不发送请求
  if (isLoading.value || tagData.hasMore === false) {
    return
  }
  isLoading.value = true
  tagData.page++
  await animeStore.getNewSeasonAnimes(2025, 'summer', tagData.page, 12, tagData.filter)
  isLoading.value = false
  if (animeStore.newSeasonAnimeList?.length === 0) {
    tagData.hasMore = false
  } else {
    animeStore.newSeasonAnimeList = []
  }
}
//筛选后的数据
const filterAnimeList = computed(() => {
  if ((selectedIndex.value) === 0) {
    return animeStore.seasonAnimeList
  } else {
    return animeStore.seasonAnimeList.filter((item) => {
      return item.type === tagMap[tags[selectedIndex.value]].filter
    })
  }
})
watch(selectedIndex, async () => {
  //等待DOM更新
  await nextTick()
  let isScrollable = scrollable()
  for (let i = 0; i <= 5; i++) {
    //如果页面无法滚动，则加载
    if (!isScrollable) {
      await load()
      //等待DOM更新
      await nextTick()
      //DOM更新后判断是否可滚动
      isScrollable = scrollable()
      //如果页面可滚动或没有更多数据，则退出
      if (isScrollable || !tagMap[tags[selectedIndex.value]].hasMore) {
        break
      }
    }
  }
})
</script>

<style scoped lang="scss">
.title {
  background-color: #E1E7F5;
  border-bottom: 1px solid #2E51A2;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  font-size: 20px;
}

.container {
  padding: 10px;

  .filter {
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid #D8D8D8;

    .tag {
      border-radius: 10% 10% 0 0;
      background-color: #E1E7F5;
      margin-right: 10px;
      width: 54px;
      padding: 0 5px;
      text-align: center;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      color: #2E51A2;
      transition: all 0.3s;

      &:hover {
        color: white;
        background-color: #2E51A2;
      }

      &.active {
        color: white;
        background-color: #2E51A2;
      }
    }
  }

  .content {
    margin-top: 10px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 32%;
      margin-bottom: 20px;
      margin-right: 12px;
      height: 420px;
      border: 1px solid #F0F0F0;

      .loading {
        background-color: #FFFFFF;
        height: 100%;
      }

      .card-title,
      .date,
      .types,
      .main,
      .info {
        min-width: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        line-height: normal;
      }

      .card-title {
        flex: 3;
        color: #1C439B;
        font-weight: 600;
      }

      .date {
        flex: 1;
        background-color: #F8F8F8;
      }

      .types {
        flex: 1;
        background-color: #F0F0F0;
      }

      .main {
        flex: 8;
        background-color: #FFF;

        .main-left {
          height: 100%;

          img {
            width: 100%;
            max-height: 100%;
            opacity: 0;
            transition: all 0.5s;
          }
        }
      }

      .info {
        flex: 1;
        background-color: #F8F8F8;
      }
    }

    .notHasMore {
      width: 100%;
      height: 200px;
      text-align: center;
    }
  }
}
</style>