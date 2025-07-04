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
    if(!keyWord) {
      return
    }
    const res = await getMangaSearchAPI(keyWord, styleId)
    searchMangaList.value = res.list
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