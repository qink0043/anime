import ownInstance from "@/utils/user";

//注册
export const registerAPI = (accountNumber, password, username) => {
  return ownInstance.post('/user/register', {
    accountNumber,
    password,
    username
  })
}

//登录
export const loginAPI = (accountNumber, password) => {
  return ownInstance.post('/user/login', {
    accountNumber,
    password
  })
}

//获取用户信息
export const getMeAPI = () => ownInstance.get('/user/me')