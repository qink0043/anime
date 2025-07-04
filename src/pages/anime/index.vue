<template>
  <Menu />
  <div class="title">
    <div class="big-title">{{ animeStore.animeDetail.name_cn || animeStore.animeDetail?.name }}</div>
    <div class="small-title">{{ animeStore.animeDetail.name_cn ? animeStore.animeDetail?.name : '' }}</div>
    <span class="title-type">{{ animeStore.animeDetail.platform }}</span>
    <span class="goWatch" @click="searchVideoByName(animeStore.animeDetail.name_cn || animeStore.animeDetail?.name)">观看相关视频👉</span>
  </div>
  <Nav :subjectMap="subjectMap" :changeActive="changeActive" />
  <div class="content">
    <router-view />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import Menu from '@/components/menu/index.vue'
import { useAnimeStore } from '@/store/anime';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
//引入导航标签组件
import Nav from '@/components/nav/index.vue'

const $route = useRoute()
const $router = useRouter()
const animeStore = useAnimeStore()
const userStore = useUserStore()

const subjectMap = {
  0: {
    nav: '概览',
    path: 'main'
  },
  1: {
    nav: '章节',
    path: 'ep'
  },
  2: {
    nav: '角色',
    path: 'characters'
  },
  3: {
    nav: '制作人员',
    path: 'persons'
  },
  4: {
    nav: '吐槽',
    path: 'comments'
  },
  5: {
    nav: '评论',
    path: 'reviews'
  },
  6: {
    nav: '讨论版',
    path: 'board'
  },
  7: {
    nav: '透视',
    path: 'stats'
  },
}
//如果没有数据，则请求数据
onMounted(async () => {
  const id = $route.query.id
  if (!animeStore.animeDetail.length) {
    await animeStore.getAnimeDetail(id)
    await animeStore.getCharacters(id)
  }
  userStore.loading = false
})

onBeforeUnmount(() => {
  animeStore.characters = []
  animeStore.animeDetailList = []
  animeStore.animeDetail = {} 
})

//切换标签
const changeActive = (index) => {
  $router.replace({ path: `/anime/${subjectMap[index].path}`, query: { id: $route.query.id } })
}

//搜索相关视频并跳转
const searchVideoByName = async (keyword) => {
  await animeStore.getVideoList(keyword)
  $router.push({ path: '/searchVideo', query: { keyword } })
}

</script>

<style scoped lang="scss">
.title {
  background-color: #E1E7F5;
  border-bottom: 1px solid #2E51A2;

  .big-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
  }

  .small-title {
    line-height: 24px;
    display: inline-block;
    margin-right: 15px;
  }

  .title-type {
    font-size: 14px;
    color: #666666;
  }

  .goWatch {
    font-size: 14px;
    color: #56aae4;
    margin-left: 20px;

    &:hover {
      color: #2E51A2;
      transition: all 0.3s;
    }
  }
}
.content {
  padding: 10px 5px;
}
</style>