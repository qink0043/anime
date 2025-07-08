import { defineStore } from "pinia";
import { ref } from "vue";
import { getMangaDetailAPI, getEpDetailAPI, getSearchAPI } from "@/api/manga";

export const useMangaStore = defineStore('manga', () => {
  const epList = ref({})
  const epDetail = ref({})
  const searchList = ref([])
  const getEpList = async (url) => {
    await getMangaDetailAPI(url).then(res => {
      epList.value = res.data
    })
  }
  const getEpDetail = async (chapterUrl) => {
    await getEpDetailAPI(chapterUrl).then(res => {
      epDetail.value = res.data
    })
  }
  const getSearch = async (keyword) => {
    await getSearchAPI(keyword).then(res => {
      searchList.value = res.data
    }).catch(err => {
      ElMessage({
        message: err.message,
        type: 'error'
      })
    })
  }
  return {
    epList,
    searchList,
    epDetail,
    getEpList,
    getEpDetail,
    getSearch
  }
})