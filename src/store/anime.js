import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSearchAnimesAPI, getTopAnimesAPI, getSeasonAnimesAPI } from '@/api/anime'

export const useAnimeStore = defineStore('search', () => {
  //获取搜索结果列表
  const searchAnimesList = ref([])
  const topAiringAnimesList = ref([])
  const topUpcomingAnimesList = ref([])
  const topPopularAnimesList = ref([])
  const seasonAnimeList = ref([])
  const getSearchAnimes = async (keyword) => {
    const res = await getSearchAnimesAPI(keyword)
    searchAnimesList.value = res
  }
  const getTopAnimes = async () => {
    topAiringAnimesList.value = await getTopAnimesAPI('airing')
    topUpcomingAnimesList.value = await getTopAnimesAPI('upcoming')
    topPopularAnimesList.value = await getTopAnimesAPI('bypopularity')
  }
  const getSeasonAnimes = async (year, season) => {
    seasonAnimeList.value = await getSeasonAnimesAPI(year, season)
  }
  return {
    searchAnimesList,
    topAiringAnimesList,
    topUpcomingAnimesList,
    topPopularAnimesList,
    seasonAnimeList,
    getSearchAnimes,
    getTopAnimes,
    getSeasonAnimes
  }
})