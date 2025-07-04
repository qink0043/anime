<template>
  <div class="episodes">
    <div class="episode" v-for="(ep, index) in eps" :key="eps.airdate">
      <div class="up">
        <div class="num">
          {{ index + 1 }}
        </div>
        <div class="name_cn">
          {{ ep.name_cn ? ep.name_cn : ep.name }}/
        </div>
        <div class="name">
          {{ ep.name_cn ? ep.name : '' }}
        </div>
      </div>
      <div class="down">
        <div class="info">
          时长:{{ ep.duration }}/首播:{{ ep.airdate }}/讨论:{{ ep.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getEpisodesAPI } from '@/api/anime';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute()
const eps = ref([])
onMounted(async () => {
  const res = await getEpisodesAPI($route.query.id)
  eps.value = res.data
})
</script>

<style scoped lang="scss">
.episodes {
  display: flex;
  flex-direction: column;

  .episode:nth-child(2n) {
    background-color: #f5f2f2;
  }
}

.episode {
  padding: 5px;
  width: 100%;
  height: 50px;

  .up {
    display: flex;
    align-items: end;
    margin-bottom: 5px;

    .name {
      font-size: 14px;
      color: #636262;
    }
  }

  .down {
    display: flex;
    flex-direction: column;

    .info {
      font-size: 12px;
      color: #9a9898;
    }
  }
}
</style>
