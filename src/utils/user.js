import axios from "axios";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import CookieUtil from "./cookie";

const ownInstance = axios.create({
  baseURL: 'http://124.71.198.227:3000/api',
  timeout: 15000
})

//请求拦截器
ownInstance.interceptors.request.use(config => {
  NProgress.start()
  const token = CookieUtil.getCookie('token')
  if (token) config.headers.Authorization = CookieUtil.getCookie("token")
  return config
}, error => {
  ElMessage.error('请求超时')
  return Promise.reject(error)
})

//响应拦截器
ownInstance.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (error) => {
  NProgress.done()
  ElMessage.error('请求超时')
  console.log(error)
  return Promise.reject(new Error(error.message))
})

export default ownInstance