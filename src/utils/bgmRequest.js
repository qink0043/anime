import axios from "axios";
import rateLimit from 'axios-rate-limit';
const bgmRequest = axios.create({
  baseURL: 'https://api.bgm.tv',
  timeout: 5000
})
// 应用速率限制 (3请求/秒)
const limitedBgmRequest = rateLimit(bgmRequest, { 
  maxRequests: 3,
  perMilliseconds: 1000,
});
//请求拦截器
limitedBgmRequest.interceptors.request.use((config) => {
  return config
})

//响应拦截器
limitedBgmRequest.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error(error.message))
})

export default limitedBgmRequest