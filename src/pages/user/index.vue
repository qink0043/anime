<template>
  <div class="user">
    <div class="user-left">
      <div class="user-info">
        <div class="user-name">
          {{ userStore.userInfo.userName }}
        </div>
        <div class="user-avatar">
          <img class="avatar" :src="userStore.userInfo.avatar" title="我的头像" alt="">
          <input type="file" accept="image/*" @change="handleChange">
          <button @click="avatarUpload">上传</button>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { updateAvatarAPI } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import { ref } from 'vue';

const userStore = useUserStore()

const file = ref(null)
const handleChange = (e) => {
  file.value = e.target.files[0]
}

const avatarUpload = async () => {
  if (!file.value) {
    ElMessage.error('请选择文件')
    return
  }
  // 上传头像
  const res = await updateAvatarAPI(file.value)
  if (res.code === 200) {
    ElMessage.success('上传成功')
    userStore.userInfo.avatar = res.data.avatar
  } else {
    ElMessage.error(res.data.msg)
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  padding: 10px;

  .user-left {
    width: 20%;

    .user-info {
      display: flex;
      flex-direction: column;

      .user-avatar {
        .avatar {
          width: 100%;
          aspect-ratio: 1/1;
        }
      }
    }
  }
}
</style>