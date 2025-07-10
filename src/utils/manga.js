import axios from "axios";
import NProgress from "nprogress";
import { ElMessage } from 'element-plus';

const mangaRequest = axios.create({
  baseURL: 'http://124.71.198.227:3000/api/manga',
  timeout: 5000
})

mangaRequest.interceptors.request.use((config) => {
  NProgress.start()
  return config
}, error => {
  NProgress.done()
  ElMessage({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(new Error(error.message))
})

mangaRequest.interceptors.response.use((response) => {
  NProgress.done()
  return response.data
}, error => {
  NProgress.done()
  ElMessage({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(new Error(error.message))
})

export default mangaRequest