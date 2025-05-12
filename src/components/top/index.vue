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
    <div class="right">
      <el-button class="login" @click="goLogin" type="primary" :plain="true">登录</el-button>
      <el-button class="register" @click="goRegister" type="primary" color="#2E51A2">注册</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';

import CryptoJS from 'crypto-js';
const $router = useRouter()

const inputValue = ref('')
const search = () => {
  $router.push({
    path: "/search",
    query: { search: inputValue.value }
  });
}
const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((byte) => chars[byte % chars.length])
    .join('');
};
const codeVerifier = ref('');
const MAL_CLIENT_ID = '4c1129f7d51c98d645793d470fe05c04';
// const MAL_CLIENT_SECRET = 'e9bda15dd4e507f2d94bc3c522e1bcaac0904951d3022f393c61ba9baa10e274';
const REDIRECT_URI = 'https://anime-tau-ochre.vercel.app';
// 生成 PKCE 参数
const generatePKCE = () => {
  const verifier = generateRandomString(128);
  const challenge = CryptoJS.SHA256(verifier).toString(CryptoJS.enc.Base64url);
  return { verifier, challenge };
};
const goLogin = () => {
  const { verifier, challenge } = generatePKCE();
  codeVerifier.value = verifier;
  
  sessionStorage.setItem('mal_code_verifier', verifier);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: MAL_CLIENT_ID,
    code_challenge: challenge,
    redirect_uri: REDIRECT_URI
  });
  
  window.location.href = `https://myanimelist.net/v1/oauth2/authorize?${params}`;
}

//注册
const goRegister = () => {
  window.open(
    'https://myanimelist.net/register.php',
    '_blank',
    'width=600,height=800'
  );
};

</script>

<style scoped lang="scss">
.top {
  position: fixed;
  width: 100%;
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
    }
  }
}
</style>