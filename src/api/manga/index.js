import mangaRequest from "@/utils/manga";

export const getMangaDetailAPI = (site, id) => mangaRequest.get(`/comic/${site}/${id}`)

export const getEpDetailAPI = (site, id, epid) => mangaRequest.get(`/comic/${site}/${id}/${epid}`)

export const getSearchAPI = (site, keyword, limit) => mangaRequest.get(`/search/${site}?name=${keyword}&limit=${limit}`)