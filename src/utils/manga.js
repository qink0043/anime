import axios from "axios";
import NProgress from "nprogress";

const mangaRequest = axios.create({
  baseURL: 'http://124.71.198.227:8000',
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
  console.log(response.data);
  
  return response.data
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error.message))
})

export default mangaRequest