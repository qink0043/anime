<template>
  <Menu />
  <div class="title">
    <div class="chinese-title">{{ animeStore.animeDetail.title_chinese }}</div>
    <div class="japanese-title">{{ animeStore.animeDetail.title_japanese }}</div>
  </div>
  <div class="content">
    <div class="left">
      <img class="img" :src="animeStore.animeDetail.images?.jpg.large_image_url" alt="">
      <span class="add">添加到我的收藏</span>
    </div>
    <div class="right">
      <div class="menu">
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
        <span>详情</span>
      </div>
      <div class="bread-crumb">
        <BreadCrumb :title_chinese="animeStore.animeDetail.title_chinese" :title_japanese="animeStore.animeDetail.title_japanese" />
      </div>
      <div class="info">
        <div class="score">
          <div class="score-left">
            <span class="pingfen">评分</span>
            <span class="fenshu">{{ animeStore.animeDetail.score }}</span>
            <span class="scored-by">{{ animeStore.animeDetail.scored_by }}次评分</span>
          </div>
          <div class="score-right">
            <div class="rank">排名</div>
            <div class="rank">热门榜</div>
            <div class="rank">Members</div>
          </div>
        </div>
        <Video class="pv" v-if="animeStore.animeDetail.trailer?.embed_url" @click="openVideoPlyer(animeStore.animeDetail.trailer?.embed_url)"
          :name="animeStore.animeDetail.title_chinese || animeStore.animeDetail.title_japanese"
          :imgUrl="animeStore.animeDetail.trailer?.images.large_image_url" />
      </div>
      <div class="introduce">
        <div class="introduce-title">故事梗概</div>
        <div class="introduce-content">{{ animeStore.animeDetail.synopsis }}</div>
      </div>
      <div class="introduce">
        <div class="introduce-title">背景</div>
        <div class="introduce-content">{{ animeStore.animeDetail.background }}</div>
      </div>
    </div>
  </div>
  <VideoPlayer :url="vidoeUrl" v-model="playerIsShow" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Menu from '@/components/menu/index.vue'
import { useAnimeStore } from '@/store/anime';
import Video from '@/components/video/index.vue'
import VideoPlayer from '@/components/videoPlayer/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'

const $route = useRoute()
const animeStore = useAnimeStore()
const id = $route.query.id
onMounted(() => {
  animeStore.getAnimeDetail(id)
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
</script>

<style scoped>
.title {
  background-color: #E1E7F5;
  border-bottom: 1px solid #2E51A2;
  margin-bottom: 10px;
  .chinese-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
  }
  .japanese-title {
    line-height: 24px;
  }
}

.content {
  display: flex;
  height: 900px;

  .left {
    flex: 1;
    padding: 0 5px 0 10px;

    .img {
      width: 100%;
      height: auto;
      background-color: red;
    }
  }

  .right {
    padding: 0 5px;
    flex: 3;
    border-left: 1px solid #E1E7F5;

    .menu {
      padding: 5px 0;
      border-bottom: 1px solid #2E51A2;

      span {
        margin-right: 15px;
      }
    }

    .info {
      display: flex;
      height: 150px;

      .score {
        flex: 1;
        display: flex;
        background-color: #F8F8F8;
        border: 1px solid #D8D8D8;
        padding: 10px;

        .score-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 100px;
          border-right: 1px solid #D8D8D8;
          margin-right: 10px;

          .pingfen {
            width: 80%;
            background-color: #2E51A2;
            border-radius: 5px;
            font-size: 10px;
            color: white;
            text-align: center;
            padding: 2px 0;
          }

          .fenshu {
            font-weight: 900;
            font-size: 30px;
            margin: 5px 0;
          }

          .scored_by {
            font-size: 12px;
            width: 100%;
            text-align: center;
          }
        }

        .score-right {
          display: flex;
        }
      }

      .pv {
        margin-left: 15px;
        height: 100%;
        width: 200px;
      }
    }

    .introduce {
      margin-top: 30px;

      .introduce-title {
        line-height: 40px;
        border-bottom: 1px solid #BEBEBE;
        margin-bottom: 10px;
      }
      .introduce-content {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>