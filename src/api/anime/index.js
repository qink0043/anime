import request from "@/utils/request";
import bgmRequest from "@/utils/bgmRequest";

export const getTopAnimesAPI = (type, page = 1, limit = 25) => request.get(`top/anime?filter=${type}&page=${page}&limit=${limit}`)

export const getSeasonAnimesAPI = (year, season, page = 1, limit = 25, filter) => {
  if (filter) {
    return request.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}&filter=${filter}`)
  } else {
    return request.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}`)
  }
}

export const getAnimeDetailAPI = (id) => bgmRequest.get(`/v0/subjects/${id}`)

export const getCharactersAPI = (id) => bgmRequest.get(`v0/subjects/${id}/characters`)

export const getAnimeSearchAPI = (keyword, max_results, type) => bgmRequest.get(`/search/subject/${keyword}?type=${type}&max_results=${max_results}`)

export const getCalendarAnimeAPI = () => bgmRequest.get('/calendar')