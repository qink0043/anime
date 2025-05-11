<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/img/top.png" alt="">
      <div class="top-nav">
        <div class="left">
          <p>动漫</p>
          <p>漫画</p>
          <p>社区</p>
          <p>帮助</p>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <div class="content">
      <div class="left">左侧</div>
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
import { onMounted } from 'vue';

const animeStore = useAnimeStore()
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

    .top-nav {
      background-color: #2E51A2;
      height: 40px;
      color: white;

      .left {
        display: flex;

        p {
          width: 90px;
          text-align: center;
          line-height: 40px;
        }

        p:hover {
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
      background-color: red;
      padding: 10px;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 400px;
      padding: 10px;
      gap: 30px;

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