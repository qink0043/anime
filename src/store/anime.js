import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSearchAnimesAPI, getTopAnimesAPI, getSeasonAnimesAPI, getAnimeDetailAPI, getAnimeCnNameAPI } from '@/api/anime'

export const useAnimeStore = defineStore('anime', () => {
  //搜索结果列表
  const searchAnimesList = ref([])
  //正在热播动漫列表
  const topAiringAnimeList = ref([])
  const newTopAnimeList = ref([])
  //即将上映动漫列表
  const topUpcomingAnimeList = ref([])
  //热门动漫列表
  const topPopularAnimeList = ref([])
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

  const getTopAnimes = async (type, page, limit) => {
    if (type === 'bypopularity') {
      topPopularAnimeList.value = await getTopAnimesAPI('bypopularity', page, limit)
      topPopularAnimeList.value.forEach(async obj => {
        obj.title_chinese = await getAnimeCnName(obj.title_japanese)
      });
    }
    if (type === 'upcoming') {
      topUpcomingAnimeList.value = await getTopAnimesAPI('upcoming', page, limit)
      topUpcomingAnimeList.value.forEach(async obj => {
        obj.title_chinese = await getAnimeCnName(obj.title)
      });
    }
    if (type === 'airing') {
      topAiringAnimeList.value = await getTopAnimesAPI('airing', page, limit)
      topAiringAnimeList.value.forEach(async obj => {
        obj.title_chinese = await getAnimeCnName(obj.title)
      });
    }
  }

  const getNewTopAnimes = async (type, page, limit) => {
    newTopAnimeList.value = await getTopAnimesAPI(type, page, limit)
    //新旧数据合并
    if (type === 'bypopularity') {
      const addedList = [...topPopularAnimeList.value, ...newTopAnimeList.value]
      //数据去重
      topPopularAnimeList.value = [...new Map(addedList.map(item => [item.mal_id, item])).values()]
    }
    if (type === 'upcoming') {
      const addedList = [...topUpcomingAnimeList.value, ...newTopAnimeList.value]
      //数据去重
      topUpcomingAnimeList.value = [...new Map(addedList.map(item => [item.mal_id, item])).values()]
    }
    if (type === 'airing') {
      const addedList = [...topAiringAnimeList.value, ...newTopAnimeList.value]
      //数据去重
      topAiringAnimeList.value = [...new Map(addedList.map(item => [item.mal_id, item])).values()]
    }
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
    newTopAnimeList,
    topAiringAnimeList,
    topUpcomingAnimeList,
    topPopularAnimeList,
    seasonAnimeList,
    newSeasonAnimeList,
    animeDetail,
    getSearchAnimes,
    getTopAnimes,
    getNewTopAnimes,
    getSeasonAnimes,
    getNewSeasonAnimes,
    getAnimeDetail,
    getAnimeCnNameAPI
  }
})