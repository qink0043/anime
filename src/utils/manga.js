import axios from "axios";
import NProgress from "nprogress";

const mangaRequest = axios.create({
  baseURL: 'https://apis.netstart.cn/bcomic',
  timeout: 5000
})

mangaRequest.interceptors.request.use((config) => {
  NProgress.start()
  return config
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error.message))
})

mangaRequest.interceptors.response.use((response) => {
  NProgress.done()
  return response.data.data
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error.message))
})

export default mangaRequest