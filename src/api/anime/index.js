import request from "@/utils/request";

export const getSearchAnimesAPI = (keyword) => request.get(`/anime?q=${keyword}`)