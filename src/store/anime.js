import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSearchAnimesAPI, getTopAnimesAPI } from '@/api/anime'

export const useAnimeStore = defineStore('search', () => {
  //获取搜索结果列表
  const searchAnimesList = ref([])
  const topAiringAnimesList = ref([])
  const topUpcomingAnimesList = ref([])
  const topPopularAnimesList = ref([])
  const getSearchAnimes = async (keyword) => {
    const res = await getSearchAnimesAPI(keyword)
    searchAnimesList.value = res
  }
  const getTopAnimes = async () => {
    topAiringAnimesList.value = await getTopAnimesAPI('airing')
    topUpcomingAnimesList.value = await getTopAnimesAPI('upcoming')
    topPopularAnimesList.value = await getTopAnimesAPI('bypopularity')
  }
  return {
    searchAnimesList,
    topAiringAnimesList,
    topUpcomingAnimesList,
    topPopularAnimesList,
    getSearchAnimes,
    getTopAnimes
  }
})