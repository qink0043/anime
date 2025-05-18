<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/img/top.png" alt="">
      <!-- 顶部导航 -->
      <Menu />
    </div>
    <div class="content">
      <div class="left">
        <div class="new">
          <div class="up">
            <p class="title">2025春季热播</p>
            <p class="more"  @click="getSeasonMore()">更多</p>
          </div>
          <div class="down">
            <swiper class="swiper" v-if="animeStore.seasonAnimeList.length >= 5" :navigation="navigation" :modules="modules" :slides-per-view="5" :space-between="130" :loop="true">
              <swiper-slide v-for="item in animeStore.seasonAnimeList">
                <Icon  @click="goDetail(item.mal_id)" :url="item.images.jpg.image_url" :name="item.title_chinese || item.title_japanese" />
              </swiper-slide>
              <div class="swiper-button-prev" />
              <div class="swiper-button-next" />
            </swiper>
            <div v-else>加载中。。。</div>
          </div>
        </div>
        <div class="popular">
          <div class="up">
            <p class="title">最受欢迎的预告片</p>
            <p class="more">更多</p>
          </div>
          <div class="down">
            <swiper class="swiper" v-if="animeStore.topPopularAnimesList.length >= 5" :navigation="navigation" :modules="modules" :slides-per-view="3" :space-between="212" :loop="true">
              <swiper-slide v-for="item in animeStore.topPopularAnimesList">
                <div class="image-container">
                  <Video style="width: 270px; height: 150px;" @click="openVideoPlyer(item.trailer?.embed_url)"
                    :imgUrl="item.images.jpg.image_url" :name="item.title_chinese || item.title_japanese" />
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" />
              <div class="swiper-button-next" />
            </swiper>
            <div v-else>加载中。。。</div>
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
              <div class="picture" @click="goDetail(item.mal_id)">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name" @click="goDetail(item.mal_id)">{{ item.title_chinese || item.title_japanese }}</div>
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
              <div class="picture" @click="goDetail(item.mal_id)">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name" @click="goDetail(item.mal_id)">{{ item.title_chinese || item.title_japanese }}</div>
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
              <div class="picture" @click="goDetail(item.mal_id)">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name" @click="goDetail(item.mal_id)">{{ item.title_chinese || item.title_japanese }}</div>
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
  <VideoPlayer :url="vidoeUrl" v-model="playerIsShow" />
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Menu from '@/components/menu/index.vue'
import Icon from '@/components/icon/index.vue'
import VideoPlayer from '@/components/videoPlayer/index.vue'
import { useRouter } from 'vue-router';

const $router = useRouter()
const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});

const animeStore = useAnimeStore()
//定义swpier模块
const modules = [Navigation]

onMounted(() => {
  animeStore.getTopAnimes(5)
  animeStore.getSeasonAnimes(2025, 'spring',1, 5)
})
//控制播放器显示与隐藏
const playerIsShow = ref(false)
//播放器播放的视频的链接
const vidoeUrl = ref('')
//点击播放的回调
const openVideoPlyer = (url) => {
  playerIsShow.value = true
  vidoeUrl.value = url
}

const goDetail = (id) => {
  $router.push({ path: '/anime', query: { id } })
}

//点击更多的回调
const getSeasonMore = () => {
  $router.push({path: '/season'})
}
</script>

<style scoped lang="scss">
.home {
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
  }

  .content {
    display: flex;

    .left {
      min-width: 650px;
      max-width: 650px;
      padding: 10px;
      position: relative;

      .new {
        height: 240px;
      }

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
        margin-top: 10px;

        .image-container {
          position: relative;
          display: inline-block;
        }

        .swiper {
          width: 100%;
          height: 100%;

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