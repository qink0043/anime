import { defineStore } from "pinia";
import { ref } from "vue";
import { getMeAPI, loginAPI } from "@/api/user";

export const useUserStore = defineStore('user', () => {
  const visiable = ref(false)
  const token = ref('')
  const userData = {
    accountNumber: '',
    username: '',
    id: '',
    avatar: ''
  }

  const login = async () => {
    await loginAPI()
    token.value = res.token
  }

  const getMe = async () => {
    await getMeAPI().then(res => {
      Object.assign(userData, res.user)
    })
  }
  return {
    visiable,
    token,
    userData,
    login,
    getMe
  }
})