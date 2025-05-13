import axios from "axios";

const userInstance = axios.create({
  baseURL: 'https://auth-backend-tnag.onrender.com',
  timeout: 5000
})

//请求拦截器
userInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

export default userInstance