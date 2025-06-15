import { defineStore } from "pinia";
import { ref } from "vue";
import CookieUtil from "@/utils/cookie";

export const useUserStore = defineStore('user', () => {
  const formVisiable = ref(false)
  const user = localStorage.getItem('userInfo')
  const userInfo = user ? JSON.parse(user) : {}
  const token = CookieUtil.getCookie("token")

  const setToken = (token) => {
    //设置token到cookie
    this.token = token
    CookieUtil.setCookie("token", token)
  }

  const setUserInfo = (userInfo) => {
    // 设置用户信息
    this.userInfo = userInfo
    localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
  }

  const loginOut = () => {
    // 退出登录
    CookieUtil.deleteCookie("token");
    localStorage.removeItem("userInfo");
    router.push({ name: "Login" });
  }
  return {
    formVisiable,
    token,
    userInfo,
    setToken,
    setUserInfo,
    loginOut,
  }
})