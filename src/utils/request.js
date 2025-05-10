import axios from "axios";
const request = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {

  return config
})

//响应拦截器
request.interceptors.response.use((response) => {
  return response.data.data || response.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error(error.message))
})

export default request