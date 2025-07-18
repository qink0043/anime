import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAnimeSearchAPI, getTopAnimesAPI, getSeasonAnimesAPI, getAnimeDetailAPI, getCalendarAnimeAPI, getCharactersAPI, searchVideoAPI, getVideoDetailAPI, getVideoAPI, getCharacterDetailAPI, getCharacterSubjectsAPI } from '@/api/anime'

export const useAnimeStore = defineStore('anime', () => {
  //搜索结果列表
  const searchAnimesList = ref([])
  //正在热播动漫列表
  const topAiringAnimeList = ref([])
  //即将上映动漫列表
  const topUpcomingAnimeList = ref([])
  //热门动漫列表
  const topPopularAnimeList = ref([])
  //新获取的动漫列表
  const newTopAnimeList = ref([])
  //季节动漫列表和新获取的列表
  const seasonAnimeList = ref([])
  const newSeasonAnimeList = ref([])
  //动漫详情
  const animeDetail = ref({})
  //动漫详情列表
  const animeDetailList = ref([])
  //角色详情
  const characters = ref([])
  //控制上传图片的显示与隐藏
  const imageUploadVisible = ref(false)
  //本地上传图片url
  const imageUploadUrl = ref('')
  //图片搜索结果
  const imageSearchResult = ref([])
  //每日放送
  const calendarAnimeList = ref([])
  //搜索结果
  const searchResultList = ref([])
  //视频资源结果
  const searchVideoList = ref([])
  //视频详情
  const videoDetail = ref({})
  //视频链接列表
  const videoUrl = ref('')
  //角色信息
  const characterDetail = ref({})
  //角色出场作品
  const characterSubjects = ref([])

  const getTopAnimes = async (type, page, limit) => {
    if (type === 'bypopularity') {
       const data = await getTopAnimesAPI('bypopularity', page, limit)
       topPopularAnimeList.value = [...new Map(data.map(item => [item.mal_id, item])).values()]
      // topPopularAnimeList.value.forEach(async obj => {
      //   obj.title_chinese = await getAnimeCnName(obj.title_japanese)
      // });
    }
    if (type === 'upcoming') {
      const data = await getTopAnimesAPI('upcoming', page, limit)
      topUpcomingAnimeList.value = [...new Map(data.map(item => [item.mal_id, item])).values()]
       // topUpcomingAnimeList.value.forEach(async obj => {
      //   obj.title_chinese = await getAnimeCnName(obj.title)
      // });
    }
    if (type === 'airing') {
      const data = await getTopAnimesAPI('airing', page, limit)
       topAiringAnimeList.value = [...new Map(data.map(item => [item.mal_id, item])).values()]
      // topAiringAnimeList.value.forEach(async obj => {
      //   obj.title_chinese = await getAnimeCnName(obj.title)
      // });
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
    const data = await getSeasonAnimesAPI(year, season, page, limit, filter)
    seasonAnimeList.value = [...new Map(data.map(item => [item.mal_id, item])).values()]
    //日文标题变中文
    // seasonAnimeList.value.forEach(async obj => {
    //   obj.title_chinese = await getAnimeCnName(obj.title)
    // });
  }
  const getNewSeasonAnimes = async (year, season, page, limit, filter) => {
    newSeasonAnimeList.value = await getSeasonAnimesAPI(year, season, page, limit, filter)
    //新旧数据合并
    const addedList = [...seasonAnimeList.value, ...newSeasonAnimeList.value]
    //数据去重
    seasonAnimeList.value = [...new Map(addedList.map(item => [item.mal_id, item])).values()]
  }

  const getSearchAnime = async (keyword, max_results, type, responseGroup) => {
    if (max_results === 1) {
      return await getAnimeSearchAPI(keyword, max_results, type, responseGroup)
    } else {
      searchResultList.value = await getAnimeSearchAPI(keyword, max_results, type, responseGroup)
    }
  }

  const getAnimeDetail = async (id) => {
    animeDetail.value = await getAnimeDetailAPI(id)
    animeDetailList.value.push(animeDetail.value)
  }

  const getCharacters = async (id) => {
    characters.value = await getCharactersAPI(id)
  }

  const getCalendarAnime = async () => {
    calendarAnimeList.value = await getCalendarAnimeAPI()
  }

  const getVideoList = async (keyword) => {
    const res = await searchVideoAPI(keyword)
    searchVideoList.value = res.data
  }

  const getVideoDetail = async (url) => {
    const res = await getVideoDetailAPI(url)
    videoDetail.value = res.data
  }

  const getVideoUrl = async (url) => {
    const res = await getVideoAPI(url)
    videoUrl.value = res.data
  }

  //获取角色详情
  const getCharacterDetail = async (id) => {
    characterDetail.value = await getCharacterDetailAPI(id)
  }

  //获取角色出场作品
  const getCharacterSubjects = async (id) => {
    characterSubjects.value = await getCharacterSubjectsAPI(id)
  }

  return {
    searchAnimesList,
    topAiringAnimeList,
    topUpcomingAnimeList,
    topPopularAnimeList,
    newTopAnimeList,
    seasonAnimeList,
    newSeasonAnimeList,
    animeDetail,
    animeDetailList,
    imageUploadVisible,
    imageUploadUrl,
    imageSearchResult,
    calendarAnimeList,
    characters,
    searchResultList,
    searchVideoList,
    videoDetail,
    videoUrl,
    characterDetail,
    characterSubjects,
    getSearchAnime,
    getTopAnimes,
    getNewTopAnimes,
    getSeasonAnimes,
    getNewSeasonAnimes,
    getAnimeDetail,
    getCalendarAnime,
    getCharacters,
    getVideoList,
    getVideoDetail,
    getVideoUrl,
    getCharacterDetail,
    getCharacterSubjects,
  }
})