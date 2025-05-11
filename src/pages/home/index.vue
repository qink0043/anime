<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/img/top.png" alt="">
      <div class="top-nav">
        <div class="topAndMenu" v-for="(menu, index) in menus" :key="index" @mouseenter="activeMenu = index"
          @mouseleave="activeMenu = null">
          <p class="top-p" :class="{ 'active': activeMenu === index }">{{ menu.title }}</p>
          <div class="menu" v-show="activeMenu === index" @mouseenter="activeMenu = index">
            <div class="p" v-for="(item, i) in menu.items" :key="i">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">

      </div>
      <div class="right">
        <div class="hot topAiring">
          <div class="hot-title">
            <p>正在热播</p>
            <p>查看更多</p>
          </div>
          <div class="hot-content" v-for="(item, index) in animeStore.topAiringAnimesList.slice(0, 5)"
            :key="item.mal_id">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">
              <div class="picture">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name">{{ item.title_japanese }}</div>
                <div class="tips">{{ item.type }},评分:{{ item.score }}</div>
              </div>
            </div>
            <div class="add">收藏</div>
          </div>
        </div>
        <div class="hot topupcoming">
          <div class="hot-title">
            <p>即将开播</p>
            <p>查看更多</p>
          </div>
          <div class="hot-content" v-for="(item, index) in animeStore.topUpcomingAnimesList.slice(0, 5)"
            :key="item.mal_id">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">
              <div class="picture">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name">{{ item.title_japanese }}</div>
                <div class="tips">{{ item.type }},评分:{{ item.score }}</div>
              </div>
            </div>
            <div class="add">收藏</div>
          </div>
        </div>
        <div class="hot popular">
          <div class="hot-title">
            <p>最受欢迎</p>
            <p>查看更多</p>
          </div>
          <div class="hot-content" v-for="(item, index) in animeStore.topPopularAnimesList.slice(0, 10)"
            :key="item.mal_id">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">
              <div class="picture">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name">{{ item.title_japanese }}</div>
                <div class="tips">{{ item.type }},评分:{{ item.score }}</div>
              </div>
            </div>
            <div class="add">收藏</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted, ref } from 'vue';

const animeStore = useAnimeStore()
const activeMenu = ref(null)

const menus = [
  {
    title: '动漫',
    items: ['动漫搜索', '热门动漫', '视频', '评论']
  },
  {
    title: '漫画',
    items: ['兴趣推荐', '论坛', '博客', '用户']
  },
  {
    title: '社区',
    items: ['动漫搜索', '热门动漫', '视频', '评论']
  },
  {
    title: '帮助',
    items: ['关于', '支持我们', '更多问题', '开发人员']
  }
]

onMounted(() => {
  animeStore.getTopAnimes()
})
</script>

<style scoped lang="scss">
.home {
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;

    .top-nav {
      background-color: #2E51A2;
      height: 40px;
      color: white;
      display: flex;
      position: relative;

      .topAndMenu {
        position: relative;

        .menu {
          background-color: white;
          position: absolute;
          top: 40px;
          left: 0;
          min-width: 90px;
          z-index: 100;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

          .p {
            padding: 5px;

            p {
              height: 40px;
              line-height: 40px;
              color: black;
            }
          }

          .p:hover {
            cursor: pointer;
            background-color: #2E51A2;

            p {
              color: white;
            }
          }
        }
      }

      .top-p {
        width: 90px;
        text-align: center;
        line-height: 40px;

        &.active,
        &:hover {
          background-color: white;
          color: black;
          cursor: pointer;
        }
      }
    }
  }

  .content {
    display: flex;

    .left {
      width: 925px;
      padding: 10px;
      position: relative;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 400px;
      padding: 10px;
      gap: 30px;
      border-left: 1px solid #DDE1EC;

      .hot-title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        background-color: #DDE1EC;
        border-bottom: 1px solid black;

        p {
          margin: 0 5px;
        }
      }

      .hot-content {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        background-color: #F8F8F8;

        .number {
          width: 40px;
        }

        .content {
          width: 300px;

          .picture {
            width: 64px;
            height: 90px;
            display: flex;
            margin-right: 5px;
            border: 1px solid #BEBEBE;

            img {
              min-width: 100%;
              min-height: 100%;
              object-fit: cover;
            }
          }

          .info {
            .tips {
              margin-top: 15px;
              color: #808080;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>