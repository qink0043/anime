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
            <p class="more">更多</p>
          </div>
          <div class="down">
            <swiper :navigation="navigation" :modules="modules" :slides-per-view="5" :space-between="130" :loop="true">
              <swiper-slide v-for="item in animeStore.seasonAnimeList">
                <Icon :url="item.images.jpg.image_url" :name="item.title_japanese" />
              </swiper-slide>
              <div class="swiper-button-prev" />
              <div class="swiper-button-next" />
            </swiper>
          </div>
        </div>
        <div class="popular">
          <div class="up">
            <p class="title">最受欢迎的预告片</p>
            <p class="more">更多</p>
          </div>
          <div class="down">
            <swiper :navigation="navigation" :modules="modules" :slides-per-view="3" :space-between="212" :loop="true">
              <swiper-slide v-for="item in animeStore.topPopularAnimesList">
                <div class="image-container">
                  <Icon @click="videoPlay(item.trailer.embed_url)" style="width: 270px; height: 150px;" :url="item.images.jpg.image_url"
                    :name="item.title_japanese" />
                  <div class="play-icon">
                    <svg t="1746976513402" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="2646" width="32" height="32">
                      <path
                        d="M507.456 64C262.528 64 64 262.752 64 507.904c0 245.12 198.528 443.872 443.456 443.872 244.896 0 443.456-198.752 443.456-443.872C950.912 262.752 752.352 64 507.456 64z m0 843.408c-220.432 0-399.136-178.88-399.136-399.504C108.32 287.2 287.04 108.368 507.456 108.368c220.432 0 399.136 178.88 399.136 399.536 0 220.624-178.704 399.504-399.136 399.504z m201.28-430.96C639.76 429.44 514.656 359.072 443.36 315.52c-29.232-18.496-53.776-11.088-56.144 21.504-1.728 87.248 0 255.52 0 344.32 1.44 33.04 30.592 37.408 55.92 24.08L708.16 544.736c-0.496-0.272 54.272-30.464 0.592-68.288z"
                        fill="#000000" p-id="2647"></path>
                    </svg>
                  </div>
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
  <Video :url="vidoeUrl" v-model="videoIsShow" />
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
import Video from '@/components/video/index.vue'

const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});

const animeStore = useAnimeStore()
//定义swpier模块
const modules = [Navigation]

onMounted(() => {
  animeStore.getTopAnimes()
  animeStore.getSeasonAnimes(2025, 'spring')
})
//控制播放器显示与隐藏
const videoIsShow = ref(false)
//播放器播放的视频的链接
const vidoeUrl = ref('')
//点击播放的回调
const videoPlay = (url) => {
  videoIsShow.value = true
  vidoeUrl.value = url
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

          .play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            border: 2px solid black;
            border-radius: 12px;
            padding: 0 5px;
            box-shadow: 0 0 5px;
            pointer-events: none;
          }
        }

        .swiper {
          width: 100%;
          height: 150px;

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