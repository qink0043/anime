<template>
  <Menu />
  <div class="title">
    <div class="big-title">{{ animeStore.characterDetail.name_cn || animeStore.characterDetail?.name }}</div>
    <span class="title-type">{{ animeStore.characterDetail.gender }}</span>
  </div>
  <div class="content">
    <div class="left">
      <img class="img" @load="loading = false" :src="animeStore.characterDetail?.images?.large" alt=""
        v-show="!loading">
      <el-skeleton :loading="loading" animated v-show="loading">
        <template #template>
          <el-skeleton-item class="img skeleton" variant="image" />
        </template>
      </el-skeleton>
      <div class="infobox" v-for="item in animeStore.characterDetail.infobox">
        <span class="infokey">{{ item.key }}：</span>
        <span class="infovalue">{{Array.isArray(item.value) ? item.value.map(i => i.v).join('/') : item.value
        }}</span>
      </div>
    </div>
    <div class="right">
      <div class="bread-crumb">
        <BreadCrumb :title_chinese="animeStore.characterDetail.name" :title_japanese="''" />
      </div>
      <div class="info">
        <div class="score">
          <div class="score-middle">
            <div class="intro">
              {{ animeStore.characterDetail.summary }}
            </div>
          </div>
        </div>
      </div>
      <div class="subjects-title">出场作品</div>
      <div class="subjects-container">
        <div class="subject" v-for="item in animeStore.characterSubjects">
          <Icon @click="goDetailById(item.id)" :url="item.image" :name="item.name_cn || item.name" />
          <div class="staff">{{ item.staff }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Menu from '@/components/menu/index.vue'
import Icon from '@/components/icon/index.vue'
import { useAnimeStore } from '@/store/anime';
import BreadCrumb from '@/components/breadCrumb/index.vue'
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';


const $route = useRoute()
const $router = useRouter()
const animeStore = useAnimeStore()
const userStore = useUserStore()

//如果没有数据，则请求数据
onMounted(async () => {
  const id = $route.query.id
  if (!Object.keys(animeStore.characterDetail).length) {
    await animeStore.getCharacterDetail(id)
    await animeStore.getCharacterSubjects(id)
  }
  userStore.loading = false
})

onBeforeUnmount(() => {
  animeStore.characterDetail = {}
  animeStore.characterSubjects = []
})

const loading = ref(true)

const goDetailById = async (id) => {
  await animeStore.getAnimeDetail(id)
  $router.push({ path: '/anime', query: { id } })
}

</script>

<style scoped lang="scss">
.title {
  background-color: #E1E7F5;
  border-bottom: 1px solid #2E51A2;
  margin-bottom: 10px;

  .big-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
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

    .skeleton {
      min-height: 400px;
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
      display: flex;

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

    .subjects-title {
      font-size: 20px;
      margin: 20px 0;
    }

    .subjects-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .subject {
        width: 15%;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>