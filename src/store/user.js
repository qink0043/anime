import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getMeAPI, loginAPI } from "@/api/user";

export const useUserStore = defineStore('user', () => {
  const visiable = ref(false)
  const token = ref('')
  const userData = reactive({
    accountNumber: '',
    username: '',
    id: '',
    avatar: ''
  })

  const login = async (accountNumber, password) => {
    const res = await loginAPI(accountNumber, password)
    //本地存储token
    localStorage.setItem('token', res.data.token)
    //仓库存储token和用户数据
    token.value = res.data.token
    Object.assign(userData, res.data.user)
  }

  const getMe = async () => {
    const res = await getMeAPI()
    Object.assign(userData, res.data.user)
  }
  return {
    visiable,
    token,
    userData,
    login,
    getMe
  }
})