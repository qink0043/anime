import axios from "axios";
import NProgress from "nprogress";

const ownInstance = axios.create({
  baseURL: 'https://auth-backend-tnag.onrender.com/api',
  timeout: 20000
})

//请求拦截器
ownInstance.interceptors.request.use(config => {
  NProgress.start()
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

//响应拦截器
ownInstance.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (error) => {
  NProgress.done()
  console.log(error)
  return Promise.reject(new Error(error.message))
})

export default ownInstance