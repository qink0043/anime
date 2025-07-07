import { defineStore } from "pinia";
import { ref } from "vue";
import { getMangaDetailAPI, getEpDetailAPI, getSearchAPI } from "@/api/manga";

export const useMangaStore = defineStore('manga', () => {
  const mangaDetail = ref({})
  const epDetail = ref({})
  const searchList = ref([])
  const getMangaDetail = async (site, id) => {
    await getMangaDetailAPI(site, id).then(res => {
      mangaDetail.value = res
    })
  }
  const getEpDetail = async (site, id, epid) => {
    await getEpDetailAPI(site, id, epid).then(res => {
      epDetail.value = res
    })
  }
  const getSearch = async (site, keyword, limit) => {
    await getSearchAPI(site, keyword, limit).then(res => {
      if(res.search_result.length === 0) {
        ElMessage({
          message: '没有搜索到结果',
          type: 'warning'
        })
      }
      searchList.value = res.search_result
    })
  }
  return {
    mangaDetail,
    searchList,
    epDetail,
    getMangaDetail,
    getEpDetail,
    getSearch
  }
})