import request from "@/utils/request";
import bgmRequest from "@/utils/bgmRequest";
import ownInstance from "@/utils/user";

export const getTopAnimesAPI = (type, page = 1, limit = 25) => request.get(`top/anime?filter=${type}&page=${page}&limit=${limit}`)

export const getSeasonAnimesAPI = (year, season, page = 1, limit = 25, filter) => {
  if (filter) {
    return request.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}&filter=${filter}`)
  } else {
    return request.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}`)
  }
}

//根据id获取番剧详情
export const getAnimeDetailAPI = (id) => bgmRequest.get(`/v0/subjects/${id}`)

//根据动漫id获取角色
export const getCharactersAPI = (id) => bgmRequest.get(`v0/subjects/${id}/characters`)

export const getAnimeSearchAPI = (keyword, max_results, type = '', responseGroup = 'small') => {
  const encodeKeyword = keyword.replace(/!/g, '%EF%BC%81')
  return bgmRequest.get(`/search/subject/${encodeKeyword}?type=${type}&max_results=${max_results}&responseGroup=${responseGroup}`)
}

//搜索角色
export const getCharacterSearchAPI = (keyword) => {
  bgmRequest.post(`/v0/search/characters`, {
    "keyword": keyword,
    "fileter": {
      "nsfw": false
    }
  })
}

//根据角色id获取角色详情
export const getCharacterDetailAPI = (id) => bgmRequest.get(`/v0/characters/${id}`)

//根据角色id获取角色出场作品
export const getCharacterSubjectsAPI = (id) => bgmRequest.get(`/v0/characters/${id}/subjects`)

//获取每日放送
export const getCalendarAnimeAPI = () => bgmRequest.get('/calendar')

export const getVideoAPI = (url) => ownInstance.get(`/anime/video?url=${url}`)

export const searchVideoAPI = (keyword) => ownInstance.get(`/anime/search?keyword=${keyword}`,)

export const getVideoDetailAPI = (url) => ownInstance.get(`/anime/detail?url=${url}`)