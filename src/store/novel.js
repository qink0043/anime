import { defineStore } from "pinia";
import { ref } from "vue";
import { getNovelDetailAPI, getNovelTocAPI, getNovelContentAPI, getSearchAPI } from "@/api/novel";

export const useNovelStore = defineStore('novel', () => {
  const searchResult = ref([])
  const detail = ref({})
  const tocList = ref([])
  const content = ref('')
  const getSearch = async (keyword) => {
    await getSearchAPI(keyword).then(res => {
      searchResult.value = res
    })
  }
  const getDetail = async (url) => {
    await getNovelDetailAPI(url).then(res => {
      detail.value = res
    })
  }
  const getTocList = async (url) => {
    await getNovelTocAPI(url).then(res => {
      tocList.value = res
    })
  }
  const getContent = async (url) => {
    await getNovelContentAPI(url).then(res => {
      content.value = res
    })
  }
  return {
    searchResult,
    detail,
    tocList,
    content,
    getSearch,
    getDetail,
    getTocList,
    getContent
  }
})