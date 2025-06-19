import { defineStore } from "pinia";
import { ref } from "vue";
import CookieUtil from "@/utils/cookie";
import { getUserInfoAPI } from "@/api/user";

export const useUserStore = defineStore('user', () => {
  const formVisible = ref(false)
  const loading = ref(true)
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

  const getUserInfo = async () => {
    await getUserInfoAPI().then(res => {
      setUserInfo(res.data)
    })
  }

  return {
    formVisible,
    loading,
    token,
    userInfo,
    setToken,
    setUserInfo,
    getUserInfo,
  }
})