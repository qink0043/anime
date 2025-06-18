import axios from "axios";
import rateLimit from 'axios-rate-limit';

const unLimiteBgmRequest = axios.create({
  baseURL: 'https://api.bgm.tv',
  timeout: 5000,
})

// 应用速率限制 (3请求/秒)
const bgmRequest = rateLimit(unLimiteBgmRequest, {
  maxRequests: 3,
  perMilliseconds: 1000,
});

//请求拦截器
bgmRequest.interceptors.request.use((config) => {
  return config
}, error => {
  return Promise.reject(new Error(error.message))
})

//响应拦截器
bgmRequest.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error(error.message))
})

export default bgmRequest