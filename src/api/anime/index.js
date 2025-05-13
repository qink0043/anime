import request from "@/utils/request";
import bgmRequest from "@/utils/bgmRequest";

export const getSearchAnimesAPI = (keyword) => request.get(`/anime?q=${keyword}`)

export const getTopAnimesAPI = (filter) => request.get(`top/anime?filter=${filter}`)

export const getSeasonAnimesAPI = (year, season) => request.get(`/seasons/${year}/${season}`)

export const getAnimeDetailAPI = (id) => request.get(`/anime/${id}`)

export const getAnimeCnNameAPI = (keyword) => bgmRequest.get(`https://api.bgm.tv/search/subject/${keyword}?type=2`)