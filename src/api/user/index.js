import userInstance from "@/utils/user";

//注册
export const registerAPI = (accountNumber, password, username) => {
  return userInstance.post('/register', {
    accountNumber,
    password,
    username
  })
}

//登录
export const loginAPI = (accountNumber, password) => {
  return userInstance.post('/login', {
    accountNumber,
    password
  })
}

//获取用户信息
export const getMeAPI = () => userInstance.get('/me')