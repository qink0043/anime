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
            <p class="title">2025夏季热播</p>
            <p class="more" @click="getSeasonMore()">更多</p>
          </div>
          <div class="down">
            <swiper class="swiper" v-if="animeStore.seasonAnimeList?.length >= 5" :navigation="navigation"
              :modules="modules" :slides-per-view="5" :space-between="130" :loop="true">
              <swiper-slide v-for="item in animeStore.seasonAnimeList">
                <Icon @click="goDetailByName(item.title_japanese)" :url="item.images.jpg.image_url"
                  :name="item.title_chinese || item.title_japanese" />
              </swiper-slide>
              <div class="swiper-button-prev" />
              <div class="swiper-button-next" />
            </swiper>
            <div v-else>加载中。。。</div>
          </div>
        </div>
        <div class="popular">
          <div class="up">
            <p class="title">热门PV</p>
            <p class="more" @click="goPopular">更多</p>
          </div>
          <div class="down">
            <swiper class="swiper" v-if="animeStore.topPopularAnimeList.length >= 3" :navigation="navigation"
              :modules="modules" :slides-per-view="3" :space-between="212" :loop="true">
              <swiper-slide v-for="item in animeStore.topPopularAnimeList">
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
        <div class="airing">每周放送</div>
        <div class="airing">
          <div class="airing-title">
            <div class="weekdays" :class="{ active: index == selected }" @click="changeSelected(index)"
              v-for="(item, index) in animeStore.calendarAnimeList">{{
                item.weekday.cn }}</div>
          </div>
          <div class="airing-info">
            <div class="info-item" v-for="item in animeStore.calendarAnimeList[selected]?.items">
              <div class="item-up">
                <Icon @click="goDetailById(item.id)" :url="item.images.common" :name="item.name_cn || item.name" />
              </div>
              <div class="item-down">
                <div class="air-date">上映时间{{ item.air_date }}</div>
                <div class="score">{{ item.rating?.score ? `评分${item.rating.score}` : `暂无评分` }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="hot topAiring">
          <div class="hot-title">
            <p>正在热播</p>
            <p class="more">查看更多</p>
          </div>
          <div class="hot-content" v-for="(item, index) in animeStore.topAiringAnimeList?.slice(0, 5)"
            :key="item.mal_id">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">
              <div class="picture" @click="goDetailByName(item.title_japanese)">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name" @click="goDetailByName(item.title_japanese)">{{ item.title_chinese ||
                  item.title_japanese }}</div>
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
            <p class="more">查看更多</p>
          </div>
          <div class="hot-content" v-for="(item, index) in animeStore.topUpcomingAnimeList.slice(0, 5)"
            :key="item.mal_id">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">
              <div class="picture" @click="goDetailByName(item.title_chinese)">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name" @click="goDetailByName(item.title_chinese)">{{ item.title_chinese ||
                  item.title_japanese }}</div>
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
            <p class="more">查看更多</p>
          </div>
          <div class="hot-content" v-for="(item, index) in animeStore.topPopularAnimeList.slice(0, 10)"
            :key="item.mal_id">
            <div class="number">{{ index + 1 }}</div>
            <div class="content">
              <div class="picture" @click="goDetailByName(item.title_japanese)">
                <img :src="item.images.jpg.image_url" alt="">
              </div>
              <div class="info">
                <div class="name" @click="goDetailByName(item.title_japanese)">{{ item.title_chinese ||
                  item.title_japanese }}</div>
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
  <imageUpload v-if="animeStore.imageUploadVisible" />
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
import imageUpload from '@/components/imageUpload/index.vue'
import { useRouter } from 'vue-router';
import { getAnimeDetailAPI } from '@/api/anime';

const $router = useRouter()
const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});

const animeStore = useAnimeStore()
//定义swpier模块
const modules = [Navigation]

onMounted(() => {
  animeStore.getTopAnimes('airing', 1, 10)
  animeStore.getTopAnimes('upcoming', 1, 10)
  animeStore.getTopAnimes('bypopularity', 1, 10)
  animeStore.getSeasonAnimes(2025, 'summer', 1, 7)
  animeStore.getCalendarAnime()
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

const goDetailByName = async (keyword) => {
  const res = await animeStore.getSearchAnime(keyword, 1, 2)
  const id = res?.list[0].id
  await animeStore.getAnimeDetail(id)
  $router.push({ path: '/anime' })
}
const goDetailById = async (id) => {
  await animeStore.getAnimeDetail(id)
  $router.push({ path: '/anime' })
}

//点击更多的回调
const getSeasonMore = () => {
  $router.push({ path: '/season' })
}
const goPopular = () => {
  $router.push({ path: '/popularanime' })
}

const selected = ref(0)
const changeSelected = (index) => {
  selected.value = index
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

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .down {
        margin-top: 10px;

        .swiper {
          width: 100%;
          height: 100%;

          .image-container {
            position: relative;
            display: inline-block;
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
      }

      .airing {
        margin-top: 25px;
        display: flex;
        position: relative;

        .airing-title {
          display: flex;
          align-items: center;
        }

        .weekdays {
          border-bottom: 1px solid #BEBEBE;
          padding: 5px 10px;
          margin-right: 10px;
          border-radius: 4px 4px 0 0;
          color: white;
          background-color: #2E51A2;

          &.active,
          &:hover {
            color: black;
            background-color: #11ffee00;
          }
        }

        .airing-info {
          top: 100%;
          left: 0;
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: start;
          flex-wrap: wrap;

          .info-item {
            margin-right: 21px;
            border: 1px solid #2E51A2;
            margin-bottom: 21px;

            .item-down {
              display: flex;
              flex-direction: column;
              align-items: center;

              .air-date {
                font-size: 14px;
              }
            }
          }

          :nth-child(4n) {
            margin-right: 0px;
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

        p {
          font-weight: 900;
          font-size: 14px;
        }

        .more {
          font-weight: 500;
          font-size: 13px;
          color: #1C439B;

          &:hover {
            text-decoration: underline;
          }
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