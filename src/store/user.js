import { defineStore } from "pinia";
import { ref } from "vue";
import { getMeAPI, loginAPI } from "@/api/user";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore('user', () => {
  const visiable = ref(false)
  const token = ref('')
  const userData = ref({
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
    Object.assign(userData.value, res.data.user)
  }

  const getMe = async () => {
    try {
      const res = await getMeAPI()
      Object.assign(userData.value, res.data.user)
    } catch (error) {
      ElMessage.error(error.response.data.error)
      localStorage.removeItem('token')
      token.value = ''
    }
  }
  return {
    visiable,
    token,
    userData,
    login,
    getMe
  }
})