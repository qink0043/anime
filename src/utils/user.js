import axios from "axios";

const ownInstance = axios.create({
  baseURL: 'https://auth-backend-tnag.onrender.com/api',
  timeout: 20000
})

//请求拦截器
ownInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

/* //响应拦截器
userInstance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  console.log(error)
  return Promise.reject(new Error(error.message))
}) */

export default ownInstance