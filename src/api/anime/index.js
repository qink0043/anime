import request from "@/utils/request";
import bgmRequest from "@/utils/bgmRequest";

export const getSearchAnimesAPI = (keyword, limit = 25) => request.get(`/anime?q=${keyword}&limit=${limit}`)

export const getTopAnimesAPI = (type, page = 1, limit = 25) => request.get(`top/anime?filter=${type}&page=${page}&limit=${limit}`)

export const getSeasonAnimesAPI = (year, season, page = 1, limit = 25, filter) => {
  if (filter) {
    return request.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}&filter=${filter}`)
  } else {
    return request.get(`/seasons/${year}/${season}?page=${page}&limit=${limit}`)
  }
}

export const getAnimeDetailAPI = (id) => request.get(`/anime/${id}`)

export const getAnimeCnNameAPI = (keyword) => bgmRequest.get(`/search/?q=${keyword}&type=2`)