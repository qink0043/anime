<template>
  <Menu />
  <div class="title">
    <div class="big-title">{{ animeStore.animeDetail.name_cn || animeStore.animeDetail.name }}</div>
    <div class="small-title">{{ animeStore.animeDetail.name_cn ? animeStore.animeDetail.name : '' }}</div>
    <span class="title-type">{{ animeStore.animeDetail.platform }}</span>
  </div>
  <div class="content">
    <div class="left">
      <img class="img" :src="animeStore.animeDetail.images?.common" alt="">
      <div class="infobox" v-for="item in animeStore.animeDetail.infobox">
        <span class="infokey">{{ item.key }}：</span>
        <span class="infovalue">{{ item.value }}</span>
      </div>
    </div>
    <div class="right">
      <div class="menu">
        <span>概览</span>
        <span>章节</span>
        <span>角色</span>
        <span>制作人员</span>
        <span>吐槽</span>
        <span>评论</span>
        <span>讨论版</span>
        <span>透视</span>
      </div>
      <div class="bread-crumb">
        <BreadCrumb :title_chinese="animeStore.animeDetail.name_cn" :title_japanese="animeStore.animeDetail.name" />
      </div>
      <div class="info">
        <div class="score">
          <div class="score-left">
            <span class="pingfen">评分</span>
            <span class="fenshu">{{ animeStore.animeDetail.rating?.score }}</span>
            <span class="scored-by">{{ animeStore.animeDetail.rating?.total }}次评分</span>
          </div>
          <div class="score-middle">
            <div class="intro">
              {{ animeStore.animeDetail.summary }}
            </div>
          </div>
          <div class="score-right">
            <div class="barchart">
              <BarChart :count="animeStore.animeDetail.rating?.count || {}" />
            </div>
          </div>
        </div>
      </div>
      <div class="charac-title">角色介绍</div>
      <div class="character">
        <div class="charac-info" v-for="item in animeStore.characters.slice(0, 12)">
          <div class="info-left">
            <img class="charac-img" :src="item?.images.small" alt="">
          </div>
          <div class="info-middle">
            <div class="name-info">
              <div class="role">{{ item.relation }}</div>
              <div class="charac-name">{{ item.name }}</div>
            </div>
            <div class="cv-info">
              <div class="cv">CV:</div>
              <div class="cv-name">{{ item.actors[0].name }}</div>
            </div>
          </div>
          <div class="info-right">
            <img class="cv-img" :src="item.actors[0]?.images.small" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Menu from '@/components/menu/index.vue'
import { useAnimeStore } from '@/store/anime';
import BreadCrumb from '@/components/breadCrumb/index.vue'
import { useRoute } from 'vue-router';
//引入柱状图组件
import BarChart from '@/components/barChart/index.vue'

const $route = useRoute()
const animeStore = useAnimeStore()
//如果没有数据，则请求数据
onMounted(async () => {
  const id = $route.query.id
  if (!animeStore.animeDetail.length) {
    await animeStore.getAnimeDetail(id)
    await animeStore.getCharacters(id)
  }
})

onBeforeUnmount(() => {
  animeStore.characters = []
})
</script>

<style scoped>
.title {
  background-color: #E1E7F5;
  border-bottom: 1px solid #2E51A2;
  margin-bottom: 10px;

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
}

.content {
  display: flex;

  .left {
    width: 25%;
    padding: 0 5px 0 10px;

    .img {
      width: 100%;
      height: auto;
    }

    .infobox {
      margin: 10px 0;
      border-bottom: 1px solid #EEEEEE;
      padding: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: wrap;

      .infokey {
        color: #666666;
        line-height: 30px;
      }
    }
  }

  .right {
    padding: 0 5px;
    width: 75%;
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

        .score-middle {
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;

          .intro {
            font-size: 12px;
            line-height: 16px;
          }
        }

        .score-right {
          display: flex;
          flex: 1;
          justify-content: end;
          border-left: 1px solid #D8D8D8;

          .barchart {
            height: 180px;
            width: 100%;
          }
        }
      }
    }

    .charac-title {
      font-size: 20px;
      margin: 20px 0;
    }

    .character {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .charac-info {
        display: flex;
        margin-bottom: 20px;
        height: 100px;
        width: 45%;
        background-color: white;
        border-radius: 10px;
        overflow: hidden;

        .info-left,
        .info-right {
          position: relative;
          overflow: hidden;
          width: 20%;
          display: flex;
          justify-content: center;
          object-fit: cover;

          .charac-img,
          .cv-img {
            position: absolute;
          }
        }

        .info-middle {
          flex: 1;
          padding: 10px;

          .charac-name,
          .cv-name {
            color: #2E51A2;
          }

          .name-info {
            display: flex;
            margin-bottom: 20px;

            .role {
              border: 1px solid #666;
              border-radius: 3px;
              color: #666;
              margin-right: 5px;
            }
          }

          .cv-info {
            display: flex;

            .cv {
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>