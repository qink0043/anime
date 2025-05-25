<template>
  <div class="upload-container" v-if="animeStore.imageUploadVisible">
    <div class="upload-form-content">
      <el-icon class="close-icon" @click="animeStore.imageUploadVisible = false">
        <Close />
      </el-icon>
      <div class="upload-title">
        上传图片搜索
      </div>
      <div @dragenter="fileEnter" @dragleave="fileLeave" class="center" :class="{ active: isFileEnter }">
        <span @click="fileInput.click()" v-loading.fullscreen.lock="loading">点击上传图片</span>
        <input type="file" accept="image/*" @change="uploadImage" ref="fileInput" />
        <p>或将图片拖拽到此处</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { Close } from '@element-plus/icons-vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()
const loading = ref(false);
const animeStore = useAnimeStore()
const fileInput = ref(null);
//是否进入拖拽区
const isFileEnter = ref(false);
const uploadImage = async () => {
  const file = fileInput.value.files[0]
  if (file && file.type.startsWith('image/')) {
    loading.value = true;
    // 创建 FormData 对象并添加文件
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post('https://api.trace.moe/search', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        loading.value = false;
        animeStore.imageUploadVisible = false;
        animeStore.imageSearchResult = res.data.result;
        $router.push({ path: '/imageSearch' })
      })
    } catch (error) {
      console.error('上传图片失败:', error);
      alert('上传图片失败，请重试');
    }
  } else {
    alert('请上传有效的图片文件')
  }
}
const fileEnter = () => {
  console.log('文件进入');
  isFileEnter.value = true;
}
const fileLeave = () => {
  console.log('文件离开');
  isFileEnter.value = false;
}
</script>

<style scoped lang="scss">
.upload-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 999;

  .upload-form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
    height: 480px;
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    position: relative;

    .upload-title {
      font-size: x-large;
      color: #505050;
      margin-bottom: 20px;
    }

    .close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 20px;
    }

    .center {
      width: 80%;
      height: 80%;
      border: 2px dashed #ccc;
      text-align: center;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        pointer-events: auto;
      }

      input {
        width: 100% ;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }

      &.active {
        background-color: blue;
      }

      span {
        color: #0052D9;
      }
    }
  }
}
</style>