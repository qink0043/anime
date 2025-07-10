import axios from "axios";
import NProgress from "nprogress";
import { ElMessage } from 'element-plus';

const novelRequest = axios.create({
  baseURL: 'http://124.71.198.227:3000/api/novel',
  timeout: 5000
})

novelRequest.interceptors.request.use((config) => {
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

novelRequest.interceptors.response.use((response) => {
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

export default novelRequest
