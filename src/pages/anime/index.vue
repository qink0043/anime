<template>
  <Menu />
  <div class="title">
    <div class="japanese-title">{{ animeStore.animeDetail.title_japanese }}</div>
    <div class="english-title">{{ animeStore.animeDetail.title_english }}</div>
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
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/top' }">热门</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/anime' }">动漫</el-breadcrumb-item>
          <el-breadcrumb-item>{{ animeStore.animeDetail.title_japanese }}</el-breadcrumb-item>
        </el-breadcrumb>
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
        <Icon class="pv" />
      </div>
    </div>
  </div>
  <Video :url="vidoeUrl" v-model="videoIsShow"/>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Menu from '@/components/menu/index.vue'
import { useAnimeStore } from '@/store/anime';
import Icon from '@/components/icon/index.vue'
import Video from '@/components/videoPlayer/index.vue'

const $route = useRoute()
const animeStore = useAnimeStore()
const id = $route.query.id
onMounted(() => {
  animeStore.getAnimeDetail(id)
})
</script>

<style scoped>
.title {
  background-color: #E1E7F5;
  border-bottom: 1px solid #2E51A2;
  margin-bottom: 10px;
}

.content {
  display: flex;

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

    .bread-crumb {
      margin: 10px 0;
    }

    .info {
      display: flex;
      height: 150px;

      .score {
        width: 550px;
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
        width: 200px;
        height: 100%;
      }
    }
  }
}
</style>