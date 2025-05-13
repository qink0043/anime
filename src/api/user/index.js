import userInstance from "@/utils/user";

//注册
export const register = (accountNumber, password, username) => {
  return userInstance.post('/api/register', {
    accountNumber,
    password,
    username
  })
}

//登录
export const login = (accountNumber, password) => {
  return userInstance.post('/api/login', {
    accountNumber,
    password
  })
}

//获取用户信息
export const getMe = () => userInstance.get('api/me')