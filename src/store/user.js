import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const visiable = ref(false)

  return {
    visiable,
  }
})