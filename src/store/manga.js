import { defineStore } from "pinia";
import { ref } from "vue";
import { getBannerAPI, getMangaSearchAPI } from "@/api/manga";

export const useMangaStore = defineStore('manga', () => {
  //搜索结果列表
  const searchMangaList = ref([])
  //banner
  const bannerList = ref([])

  //获取搜索结果
  const getSearchManga = async (keyWord, styleId) => {
    searchMangaList.value = await getMangaSearchAPI(keyWord, styleId)
  }
  //获取banner
  const getBanner = async () => {
    bannerList.value = await getBannerAPI()
  }

  return {
    searchMangaList,
    bannerList,
    getBanner,
    getSearchManga,
  }
})