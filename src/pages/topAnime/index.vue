<template>
  <Menu />
  <div v-infinite-scroll="load" :infinite-scroll-immediate="false" class="container">
    <div class="image-container" v-for="item in typeStore" :key="item.mal_id">
      <Icon class="icon" @click="goDetailByName(item.title_japanese)" :url="item.images.jpg.image_url"
        :name="item.title_chinese || item.title_japanese" />
    </div>
    <!-- 骨架，确保最后一行对齐 -->
    <template v-if="hasMore">
      <div class="image-container" v-for="i in 5 - typeStore?.length % 5">
        <el-skeleton class="loading" :rows="5" animated />
      </div>
    </template>
    <div class="notHasMore" v-else>没有更多了~</div>
  </div>
</template>

<script setup>
import Menu from '@/components/menu/index.vue'
import Icon from '@/components/icon/index.vue'
import { computed, onMounted, ref } from 'vue';
import { useAnimeStore } from '@/store/anime';
import { useRoute, useRouter } from 'vue-router';

const animeStore = useAnimeStore()
const $route = useRoute()
const $router = useRouter()

//是否有更多数据
const hasMore = ref(true)
//是否正在加载
const isLoading = ref(false)
//初始页数
const page = ref(2)
const type = ref('')
onMounted(() => {
  type.value = $route.query.type
  animeStore.getTopAnimes(type.value, 1, 20)
})

const typeStore = computed(() => {
  if (type.value === 'airing') return animeStore.topAiringAnimeList
  if (type.value === 'upcoming') return animeStore.topUpcomingAnimeList
  if (type.value === 'bypopularity') return animeStore.topPopularAnimeList
  return []
})

//触发加载
const load = async () => {
  //如果正在加载或没有更多数据，则不发送请求
  if (isLoading.value || hasMore.value === false) {
    return
  }
  isLoading.value = true
  page.value++
  await animeStore.getNewTopAnimes(type.value, page.value, 10)
  isLoading.value = false
  if (animeStore.newTopAnimeList?.length === 0) {
    hasMore.value = false
  } else {
    animeStore.newTopAnimeList = []
  }
}
//点击某个动漫的回调
const goDetailByName = async (keyword) => {
  const res = await animeStore.getSearchAnime(keyword, 1, 2)
  const id = res?.list[0].id
  await animeStore.getAnimeDetail(id)
  $router.push({ path: '/anime', query: { id } })
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;

  .image-container {
    width: 190px;
    height: 285px;
    overflow: hidden;
    position: relative;
    display: inline-block;

    .icon {
      width: 100%;
      height: 100%;
    }

    .loading {
      background-color: #FFFFFF;
      height: 100%;
    }
  }
}
</style>