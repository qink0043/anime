<template>
  <div class="top">
    <div class="left">
      <div class="title">动漫资讯</div>
    </div>
    <!-- 搜索框 -->
    <el-form @submit.prevent="search">
      <el-input v-model="inputValue" style="width: 240px" placeholder="输入动漫关键字搜索">
        <template #prefix>
          <el-icon style="vertical-align: middle">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </el-form>
    <div class="right" v-if="!token">
      <el-button class="login" @click="openLoginDialog" type="primary" :plain="true">登录</el-button>
      <!-- <el-button class="register" @click="goRegister" type="primary" color="#2E51A2">注册</el-button> -->
    </div>
    <div class="userinfo" v-else>
      <div class="avatar">
        <img :src="userStore.userData.avatar" alt="">
      </div>
      <div class="username">{{ userStore.userData.username }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';

const $router = useRouter()
const token = ref('')
const userStore = useUserStore()
const inputValue = ref('')
const search = () => {
  $router.push({
    path: "/search",
    query: { search: inputValue.value }
  });
}

//登录
const openLoginDialog = () => {
  userStore.visiable = true
}
//注册
// const goRegister = () => {
//   $router.push({path : '/register'})
// }
onMounted(() => {
  token.value = localStorage.getItem('token')
  if (token) {
    userStore.getMe()
  }
})
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  width: 100vw;
  height: 45px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #7f7f7f;
  z-index: 999;

  .right {
    .register {
      background-color: #2E51A2;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  .userinfo {
    display: flex;
    align-items: center;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
    }

    .username {
      margin: 0 20px;
    }
  }
}
</style>