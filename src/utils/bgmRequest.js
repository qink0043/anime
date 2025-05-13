import axios from "axios";
const bgmRequest = axios.create({
  baseURL: 'https://api.bgm.tv',
  timeout: 5000
})

//请求拦截器
bgmRequest.interceptors.request.use((config) => {
  return config
})

//响应拦截器
bgmRequest.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error(error.message))
})

export default bgmRequest