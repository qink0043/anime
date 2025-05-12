import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSearchAnimesAPI, getTopAnimesAPI, getSeasonAnimesAPI, getAnimeDetailAPI } from '@/api/anime'

export const useAnimeStore = defineStore('anime', () => {
  //搜索结果列表
  const searchAnimesList = ref([])
  //正在热播动漫列表
  const topAiringAnimesList = ref([])
  //即将上映动漫列表
  const topUpcomingAnimesList = ref([])
  //热门动漫列表
  const topPopularAnimesList = ref([])
  //季节动漫列表
  const seasonAnimeList = ref([])
  //动漫详情
  const animeDetail = ref({})
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
  const getAnimeDetail = async (id) => {
    animeDetail.value = await getAnimeDetailAPI(id)
  }
  return {
    searchAnimesList,
    topAiringAnimesList,
    topUpcomingAnimesList,
    topPopularAnimesList,
    seasonAnimeList,
    animeDetail,
    getSearchAnimes,
    getTopAnimes,
    getSeasonAnimes,
    getAnimeDetail
  }
})