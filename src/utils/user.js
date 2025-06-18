import axios from "axios";
import { ElMessage } from "element-plus";
import CookieUtil from "./cookie";

const ownInstance = axios.create({
  baseURL: 'http://124.71.198.227:3000/api',
  timeout: 15000
})

//请求拦截器
ownInstance.interceptors.request.use(config => {
  const token = CookieUtil.getCookie('token')
  if (token) config.headers.Authorization = CookieUtil.getCookie("token")
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截器
ownInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  ElMessage.error(error.response.data.msg)
  return Promise.reject(new Error(error.message))
})

export default ownInstance