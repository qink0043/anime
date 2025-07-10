import axios from "axios";
import rateLimit from 'axios-rate-limit';
import NProgress from "nprogress";
import { ElMessage } from 'element-plus';


const unLimitedRequest = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 5000
})

// 应用速率限制 (1请求/秒)
const request = rateLimit(unLimitedRequest, {
  maxRequests: 1,
  perMilliseconds: 1000,
});

//请求拦截器
request.interceptors.request.use((config) => {
  NProgress.start()
  return config
}, error => {
  NProgress.done()
  return Promise.reject(new Error(error.message))
})

//响应拦截器
request.interceptors.response.use((response) => {
  NProgress.done()
  return response.data.data
}, error => {
  NProgress.done()
  ElMessage({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(new Error(error.message))
})

export default request