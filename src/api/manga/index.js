import mangaRequest from "@/utils/manga";

export const getBannerAPI = () => mangaRequest.get('/Banner')

export const getMangaSearchAPI = (keyWord, styleId = -1) => mangaRequest.get('/Search', {
  params: {
    keyWord,
    styleId,
  }
})