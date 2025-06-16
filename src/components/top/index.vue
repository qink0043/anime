<template>
  <div class="top">
    <div class="left" @click="goHome">
      <img class="logo" width="40" src="../../assets/img/logo.png" alt="">
      <img class="title" width="80" src="../../assets/img/titleLogo.png" alt="">
    </div>
    <!-- 搜索框 -->
    <div class="center">
      <el-form @submit.prevent="search">
        <el-input v-model="inputValue" style="width: 240px" placeholder="输入动漫关键字搜索">
          <template #prefix>
            <el-icon style="vertical-align: middle">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </el-form>
      <span>或</span>
      <el-button @click="showImageUpload">上传图片搜索</el-button>
    </div>
    <div class="right" v-if="!userStore.token">
      <el-button class="login" @click="openFormDialog" type="primary" color="#2E51A2">登录</el-button>
    </div>
    <div class="userinfo" v-else>
      <div class="avatar">
        <img :src="userStore.userInfo.avatar" alt="">
      </div>
      <el-dropdown class="username">
        {{ userStore.userInfo.userName }}
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goMyCollection">我的收藏</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-icon>
        <ArrowDown />
      </el-icon>
    </div>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useAnimeStore } from '@/store/anime';
import CookieUtil from '@/utils/cookie';

const $router = useRouter()
const animeStore = useAnimeStore()
const userStore = useUserStore()
const token = ref('')
const inputValue = ref('')
const search = async () => {
  if (!inputValue.value) {
    return
  }
  await animeStore.getSearchAnime(inputValue.value, 10, '', 'large')
  $router.push({
    path: "/search",
    query: { search: inputValue.value }
  });
}

//表单弹窗
const openFormDialog = () => {
  userStore.formVisiable = true
}
//退出登录
const loginOut = () => {
  // 退出登录
  CookieUtil.deleteCookie("token")
  localStorage.removeItem("userInfo")
  window.location.reload()
}
//点击网页标题返回首页
const goHome = () => {
  $router.push({ path: '/home' })
}
onMounted(() => {
  token.value = localStorage.getItem('token')
  if (token.value) {
    userStore.token = token.value
    userStore.getMe()
    token.value = userStore.token
  }
})
//上传图片搜索
const showImageUpload = () => {
  animeStore.imageUploadVisible = true
}
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

  .left {
    display: flex;
    align-items: center;
  }

  .center {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .right {
    .login {
      background-color: #2E51A2;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  .userinfo {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
    }

    .username {
      margin-left: 10px;
      color: black;
    }
  }
}
</style>