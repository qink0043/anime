import { defineStore } from "pinia";
import { ref } from "vue";
import CookieUtil from "@/utils/cookie";

export const useUserStore = defineStore('user', () => {
  const formVisiable = ref(false)
  const user = localStorage.getItem('userInfo')
  const userInfo = user ? JSON.parse(user) : {}
  const token = CookieUtil.getCookie("token")

  const setToken = (token) => {
    CookieUtil.setCookie("token", token)
  }

  const setUserInfo = (info) => {
    // 设置用户信息
    userInfo.userName = info.userName
    userInfo.avatar = info.avatar
    userInfo.email = info.email
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  }

  return {
    formVisiable,
    token,
    userInfo,
    setToken,
    setUserInfo,
  }
})