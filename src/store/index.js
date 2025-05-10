import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSearchAnimesAPI } from '@/api/anime'

export const useSearchStore = defineStore('search', () => {
  //获取搜索结果列表
  const searchAnimesList = ref([])
  const getSearchAnimes = async (keyword) => {
    const res = await getSearchAnimesAPI(keyword)
    searchAnimesList.value = res
    console.log(searchAnimesList.value);
  }
  return {
    searchAnimesList,
    getSearchAnimes
  }
})