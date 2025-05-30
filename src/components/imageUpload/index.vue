<template>
  <div class="upload-container">
    <div class="upload-form-content">
      <el-icon class="close-icon" @click="animeStore.imageUploadVisible = false">
        <Close />
      </el-icon>
      <div class="upload-title">
        上传图片搜索
      </div>
      <div class="center" @dragenter="fileEnter" @dragleave="fileLeave">
        <span @click="fileInput.click()" v-loading.fullscreen.lock="loading">点击上传图片</span>
        <input type="file" accept="image/*" @change="preview" ref="fileInput" v-if="!onPreview" />
        <p>或将图片拖拽到此处</p>
        <div class="center-active" v-if="isFileEnter || onPreview">
          <div class="preview">
            <div class="preview-left">
              <vueCropper @realTime="realTime" model="contain" :autoCrop="true" :info="false" :center-box="true"
                ref="cropper" :img="previewUrl" class="cut-img" alt=""></vueCropper>
            </div>
            <div class="preview-right">
              <div class="previewImg" :style="previewData?.div">
                <img class="cut-img" :src="previewData.url" :style="previewData.img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="start" v-if="onPreview">
        <el-button @click="doImgSearch(false)">不裁剪了，直接搜索！</el-button>
        <el-button @click="doImgSearch(true)" type="primary">裁剪好了，开始搜索！</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
//引入vue-cropper
import { VueCropper } from "vue-cropper";
import 'vue-cropper/dist/index.css'
import { useAnimeStore } from '@/store/anime';
import { Close } from '@element-plus/icons-vue';
import axios from 'axios';
import { onBeforeUnmount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()
const loading = ref(false)
const animeStore = useAnimeStore()
const file = ref({})
const fileInput = ref(null)
const onPreview = ref(false);
const cropper = ref(null);
// 预览图片的 URL
const previewUrl = ref('');
//是否进入拖拽区
const isFileEnter = ref(false);
// 预览数据
const previewData = reactive({})
// 预览图片
const preview = () => {
  file.value = fileInput.value.files[0];
  if (file.value && file.value.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
      onPreview.value = true // 设置预览状态为 true
    }
    reader.readAsDataURL(file.value)
  } else {
    alert('请上传有效的图片文件')
  }
}
// 实时裁剪
const realTime = (data) => {
  previewData.url = data.url
  previewData.img = data.img
  previewData.div = data.div
}
const doImgSearch = async (cropped) => {
  loading.value = true;
  // 创建 formData 对象并添加文件
  const formData = new FormData()
  try {
    let blob
    if (cropped) {
      const getCropBlobAsync = () => {
        return new Promise((resolve, reject) => {
          cropper.value.getCropBlob(data => {
            if (data instanceof Blob) {
              resolve(data)
            } else {
              reject(new Error('裁剪失败'))
            }
            formData.append('image', data, file.value.name)
          })
        })
      }
      // 如果裁剪了，获取裁剪后的图片
      blob = await getCropBlobAsync()
      animeStore.imageUploadUrl = URL.createObjectURL(blob)
    } else {
      formData.append('image', file.value)
      animeStore.imageUploadUrl = URL.createObjectURL(file.value)
    }

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
    console.error('搜索失败:', error)
    alert('搜索失败，请重试')
    loading.value = false;
    animeStore.imageUploadVisible = false;
  }
}
const fileEnter = () => {
  isFileEnter.value = true;
}
const fileLeave = () => {
  isFileEnter.value = false;
}
onBeforeUnmount(() => {
  // 清理预览 URL
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    onPreview.value = false
    previewUrl.value = ''
  }
})
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

      .center-active {
        position: absolute;
        inset: 0;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;

        .preview {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .preview-left {
            width: 50%;
            height: 100%;
          }

          .preview-right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            position: relative;

            .previewImg {
              width: 100%;
              height: 100%;
              position: relative;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;

              .cut-img {
                position: absolute;
                top: 0;
                left: 0;
                object-fit: cover;
                overflow: hidden;
              }
            }
          }
        }

      }

      span {
        color: #0052D9;
        pointer-events: auto;
      }

      input {
        z-index: 1;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }

    .start {
      margin-top: 20px;
    }
  }
}
</style>