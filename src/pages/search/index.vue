<template>
  <Menu />
  <div class="nav">
    <div class="nav-1">
      <span @click="nav = true" :class="{ active: nav }">条目</span>
      <span @click="nav = false" :class="{ active: !nav }">人物</span>
    </div>
    <Nav v-if="nav" :subjectMap="subjectMap" :changeActive="typeSearch" />
    <div class="nav-2" v-else>
      <div class="tag-container">
        <div class="tag" :class="{ active: activeIndex == index }" @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = selectedIndex" v-for="(type, index) in Object.values(personMap)">
          {{ type }}
        </div>
      </div>
      <div class="underline" :style="underlinStyle"></div>
    </div>
  </div>
  <div class="content">
    <div class="content-left">
      <div class="result" @click="goDetail(item.type, item.id)" v-for="item in animeStore.searchResultList.list"
        :key="item.id">
        <div class="result-left">
          <img class="result-img" :src="item.images?.large" alt="">
        </div>
        <div class="result-right">
          <div class="result-name">
            <span class="name-chinese">{{ item.name_cn }}</span>
            <span class="name-other">{{ item.name }}</span>
          </div>
          <div class="result-info">
            <span class="year">{{ item.air_date }}</span>
            <span class="type">/{{ subjectMap[item.type].nav }}</span>
            <div class="summary">{{ item.summary }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">右</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAnimeStore } from '@/store/anime';
import Menu from '@/components/menu/index.vue'
import Nav from '@/components/nav/index.vue'
import { useRoute, useRouter } from 'vue-router';
import { useMangaStore } from '@/store/manga';

const $route = useRoute()
const $router = useRouter()
const animeStore = useAnimeStore();
const mangaStore = useMangaStore()
const nav = ref(true)

const subjectMap = {
  0: {
    nav: '全部',
  },
  1: {
    nav: '书籍',
  },
  2: {
    nav: '动画',
  },
  3: {
    nav: '音乐',
  },
  4: {
    nav: '游戏',
  },
  6: {
    nav: '三次元',
  }
}
const personMap = {
  0: '全部',
  1: '虚构角色',
  2: '现实人物',
}

const typeSearch = async (type) => {
  await animeStore.getSearchAnime($route.query.search, 10, type, 'large')
}

const goDetail = async (type, id) => {
  if (type === 2) {
    await animeStore.getAnimeDetail(id)
    $router.push({ path: '/anime', query: { id } })
  }
}

onMounted(async () => {
  await animeStore.getSearchAnime($route.query.search, 10, '', 'large')
})
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;

  .active {
    color: #0052D9;
  }

  span {
    margin: 10px;
    line-height: 30px;

    &:hover {
      color: #0052D9;
    }
  }

  .nav-2 {
    display: flex;
    flex-direction: column;
    position: relative;

    .tag-container {
      display: flex;
      flex: 1;

      .tag {
        padding: 0 10px;

      }
    }

    .underline {
      background-color: #0052D9;
      height: 2px;
      position: relative;
      width: 52px;
      left: 0;
      transition: left 0.3s ease;
    }
  }
}

.content {
  padding: 10px;
  display: flex;

  .content-left {
    width: 70%;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #D8D8D8;

    .result:nth-child(2n-1) {
      background-color: #ede4e4dd;
    }

    .result {
      display: flex;
      height: 180px;
      height: fit-content;
      margin-bottom: 10px;
      padding: 10px;

      .result-left {
        max-width: 20%;
        margin-right: 10px;


        .result-img {
          object-fit: cover;
          width: 100%;
          border: 1px solid #D8D8D8;
        }
      }

      .result-right {
        overflow: hidden;
        width: 80%;

        .result-name {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 16px;
          margin-bottom: 10px;

          .name-other {
            font-size: 12px;
            color: #9a9898;
          }
        }

        .result-info {
          font-size: 14px;
          max-height: 250px;
          overflow: auto;
          scrollbar-width: none;

          .summary {
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>