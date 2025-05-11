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
        <div class="new">
          <div class="up">
            <p class="title">2025春季热播</p>
            <p class="more">更多</p>
          </div>
          <div class="down">
            <swiper :navigation="navigation" :modules="modules" :slides-per-view="5" :space-between="130" :loop="true">
              <swiper-slide v-for="item in animeStore.seasonAnimeList">
                <div class="swiper-content">
                  <img :src="item.images.jpg.image_url">
                  <span>{{ item.title_japanese }}</span>
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" />
              <div class="swiper-button-next" />
            </swiper>
          </div>
        </div>
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
            <div class="add">
              <p>收藏</p>
            </div>
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
            <div class="add">
              <p>收藏</p>
            </div>
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
            <div class="add">
              <p>收藏</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});

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
//定义swpier模块
const modules = [Navigation]

onMounted(() => {
  animeStore.getTopAnimes()
  animeStore.getSeasonAnimes(2025, 'spring')
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
      min-width: 650px;
      max-width: 650px;
      padding: 10px;
      position: relative;

      .new {
        width: 100%;

        .up {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #BEBEBE;
          padding: 5px 0;

          .more {
            color: #1C439B;
          }
        }

        .down {

          .swiper {
            width: 100%;
            height: 180px;

            .swiper-content {
              position: relative;
              width: 140px;
              overflow: hidden;
              display: inline-block;
              box-shadow: inset 0 -15px 15px -10px black;

              img {
                width: 140px;
                height: 180px;
              }

              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 25px;
                background: linear-gradient(to top,
                    rgba(0, 0, 0, 0.85) 0%,
                    rgba(0, 0, 0, 0.5) 60%,
                    rgba(0, 0, 0, 0) 100%);
                pointer-events: none;
                filter: blur(1px);
              }

              span {
                height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                position: absolute;
                bottom: 0;
                left: 0;
                color: white;
                max-width: 120px;
                font-size: 12px;
                z-index: 1;
              }
            }

            .swiper-button-prev,
            .swiper-button-next {
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
            }

            &:hover {

              .swiper-button-prev,
              .swiper-button-next {
                opacity: 1;
                visibility: visible;
              }
            }
          }

          .img {
            img {
              height: 270px;
              width: 200px;
              border: 1px solid black;
              margin-right: 5px;
            }
          }
        }
      }
    }

    .right {
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
      gap: 30px;
      border-left: 1px solid #DDE1EC;

      .hot-title {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        background-color: #DDE1EC;
        padding: 0 15px;

        p:first-child {
          font-weight: 900;
          font-size: 14px;
        }

        p:last-child {
          font-weight: 500;
          font-size: 13px;
          color: #1C439B;
        }
      }

      .hot-content {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        background-color: #F8F8F8;

        .number {
          width: 40px;
          font-weight: 900;
          color: #808080;
        }

        .add {
          font-size: 10px;
          width: 30px;
          display: inline-block;
          color: #1C439B;
          padding-bottom: 80px;

          p {
            background-color: #E1E7F5;
            height: 20px;
            line-height: 20px;
            text-align: center;
          }
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
            .name {
              color: #1C439B;
              line-height: 20px;
            }

            .name:hover {
              text-decoration: underline;
            }

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