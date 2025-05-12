<template>
  <div>正在登录</div>
</template>

<script setup>
import { onMounted } from 'vue';

// 在回调页面处理授权码
const handleCallback = async () => {
  const code = new URLSearchParams(window.location.search).get('code');
  if (code) {
    const token = await getMalToken(code);
    console.log('Access Token:', token);
  }
};

// 直接在前端换取 Token（危险！）
const getMalToken = async (code) => {
  const verifier = sessionStorage.getItem('mal_code_verifier');
  
  const response = await fetch('https://myanimelist.net/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: MAL_CLIENT_ID,
      client_secret: MAL_CLIENT_SECRET,
      code,
      code_verifier: verifier,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI
    })
  });
  return response.json();
};
onMounted(() => handleCallback())
</script>

<style scoped lang="scss"></style>