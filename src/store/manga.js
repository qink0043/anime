import { defineStore } from "pinia";
import { ref } from "vue";
import { getMangaDetailAPI, getEpDetailAPI, getSearchAPI } from "@/api/manga";

export const useMangaStore = defineStore('manga', () => {
  const mangaDetail = ref({})
  const epList = ref([])
  const epDetail = ref({})
  const searchList = ref([])
  const getMangaDetail = async (site, id) => {
    await getMangaDetailAPI(site, id).then(res => {
      mangaDetail.value = res
      epList.value = res.chapters
    })
  }
  const getEpDetail = async (site, id, epid) => {
    await getEpDetailAPI(site, id, epid).then(res => {
      epDetail.value = res
    })
  }
  const getSearch = async (site, keyword, limit) => {
    await getSearchAPI(site, keyword, limit).then(res => {
      searchList.value = res.search_result
    })
  }
  return {
    mangaDetail,
    epList,
    searchList,
    getMangaDetail,
    getEpDetail,
    getSearch
  }
})