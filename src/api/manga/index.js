import mangaRequest from "@/utils/manga";

export const getMangaDetailAPI = (url) => mangaRequest.get(`/chapters/?comicUrl=${url}`)

export const getEpDetailAPI = (chapterUrl) => mangaRequest.get(`/images?chapterUrl=${chapterUrl}`)

export const getSearchAPI = (keyword) => mangaRequest.get(`/search?keyword=${keyword}`)
