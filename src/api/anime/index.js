import request from "@/utils/request";
import bgmRequest from "@/utils/bgmRequest";

export const getSearchAnimesAPI = (keyword, limit = 25) => request.get(`/anime?q=${keyword}&limit=${limit}`)

export const getTopAnimesAPI = (filter, limit = 25) => request.get(`top/anime?filter=${filter}&limit=${limit}`)

export const getSeasonAnimesAPI = (year, season, limit = 25) => request.get(`/seasons/${year}/${season}?limit=${limit}`)

export const getAnimeDetailAPI = (id) => request.get(`/anime/${id}`)

export const getAnimeCnNameAPI = (keyword) => bgmRequest.get(`https://api.bgm.tv/search/subject/${encodeURIComponent(keyword)}?type=2`)