import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSearchAnimesAPI, getTopAnimesAPI, getSeasonAnimesAPI, getAnimeDetailAPI, getAnimeCnNameAPI } from '@/api/anime'

export const useAnimeStore = defineStore('anime', () => {
  //搜索结果列表
  const searchAnimesList = ref([])
  //正在热播动漫列表
  const topAiringAnimesList = ref([])
  //即将上映动漫列表
  const topUpcomingAnimesList = ref([])
  //热门动漫列表
  const topPopularAnimesList = ref([])
  //季节动漫列表和新获取的列表
  const seasonAnimeList = ref([])
  const newSeasonAnimeList = ref([])
  //动漫详情
  const animeDetail = ref({})
  //动漫中文名
  const animeCnName = ref('')


  const getSearchAnimes = async (keyword) => {
    searchAnimesList.value = await getSearchAnimesAPI(keyword)
  }

  const getTopAnimes = async (limit) => {
    topAiringAnimesList.value = await getTopAnimesAPI('airing', limit)
    topAiringAnimesList.value.forEach(async obj => {
      obj.title_chinese = await getAnimeCnName(obj.title_japanese)
    });
    topUpcomingAnimesList.value = await getTopAnimesAPI('upcoming', limit)
    topUpcomingAnimesList.value.forEach(async obj => {
      obj.title_chinese = await getAnimeCnName(obj.title)
    });
    topPopularAnimesList.value = await getTopAnimesAPI('bypopularity', limit)
    topPopularAnimesList.value.forEach(async obj => {
      obj.title_chinese = await getAnimeCnName(obj.title)
    });
  }

  const getSeasonAnimes = async (year, season, page, limit, filter) => {
    seasonAnimeList.value = await getSeasonAnimesAPI(year, season, page, limit, filter)
    //日文标题变中文
    seasonAnimeList.value.forEach(async obj => {
      obj.title_chinese = await getAnimeCnName(obj.title)
    });
  }
  const getNewSeasonAnimes = async (year, season, page, limit, filter) => {
    newSeasonAnimeList.value = await getSeasonAnimesAPI(year, season, page, limit, filter)
    //新旧数据合并
    const addedList = [...seasonAnimeList.value, ...newSeasonAnimeList.value]
    //数据去重
    seasonAnimeList.value = [...new Map(addedList.map(item => [item.mal_id, item])).values()]
  }


  const getAnimeDetail = async (id) => {
    animeDetail.value = await getAnimeDetailAPI(id)
    animeDetail.value.title_chinese = await getAnimeCnName(animeDetail.value.title)
  }

  const getAnimeCnName = async (keyword) => {
    animeCnName.value = await getAnimeCnNameAPI(keyword)
    return animeCnName.value.list ? animeCnName.value.list[0].name_cn : ''
  }
  return {
    searchAnimesList,
    topAiringAnimesList,
    topUpcomingAnimesList,
    topPopularAnimesList,
    seasonAnimeList,
    newSeasonAnimeList,
    animeDetail,
    getSearchAnimes,
    getTopAnimes,
    getSeasonAnimes,
    getNewSeasonAnimes,
    getAnimeDetail,
    getAnimeCnNameAPI
  }
})