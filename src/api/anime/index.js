import request from "@/utils/request";

export const getSearchAnimesAPI = (keyword) => request.get(`/anime?q=${keyword}`)

export const getTopAnimesAPI = (filter) => request.get('top/anime?filter=' + `${filter}`)