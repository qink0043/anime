import novelRequest from "@/utils/novel";

//搜索书籍
export const getSearchAPI = (keyword) => novelRequest.get(`/search?keyword=${keyword}`)

//获取书籍详情
export const getNovelDetailAPI = (url) => novelRequest.get(`/book?url=${url}`)

//获取目录
export const getNovelTocAPI = (url) => novelRequest.get(`/toc?url=${url}`)

//获取章节内容
export const getNovelContentAPI = (url) => novelRequest.get(`/content?url=${url}`)
