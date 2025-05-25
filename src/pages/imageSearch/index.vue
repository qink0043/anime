<template>
  <div class="container">
    <div class="left">
      <div class="results">
        <div class="results-left">
          <div>上传图片</div>
        </div>
        <div class="results-right">
          <img :src="animiStore.imageUploadUrl" alt="">
        </div>
      </div>
      <div class="results" @click="changeResult(index)" v-for="(item, index) in results"
        :class="{ active: selected === index }">
        <div class="results-left">
          <div class="episode">第{{ item.episode }}集</div>
          <div class="time">{{
            `${formatTime(item.from)}${formatTime(item.to) == formatTime(item.from) ? '' : '~' + formatTime(item.to)}`
          }}
          </div>
          <div class="similarity">相似度：{{ (item.similarity * 100).toFixed(2) }}%</div>
        </div>
        <div class="results-right">
          <img :src="item.image" alt="">
        </div>
      </div>
    </div>
    <div class="right">
      <div class="detail">
        <div class="video">
          <video ref="videoRef" poster="@/assets/img/loading.gif" @click="handlePlay" :muted="!hasVoice" autoplay
            :src="results[index]?.video" width="100%" :loop="true"></video>
          <svg v-if="!isPaused" t="1748184538635" class="pause-icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4297" width="32" height="32">
            <path
              d="M142.293 0h22.261q77.913 0 77.913 77.913v868.174q0 77.913-77.913 77.913h-22.26q-77.914 0-77.914-77.913V77.913Q64.38 0 142.293 0zM810.12 0h22.26q77.913 0 77.913 77.913v868.174q0 77.913-77.913 77.913h-22.26q-77.913 0-77.913-77.913V77.913Q732.207 0 810.12 0z"
              fill="#666666" p-id="4298"></path>
          </svg>
          <svg v-else t="1748184691236" class="pause-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3016" width="32" height="32">
            <path
              d="M847.462 598.016l-587.161 378.88A102.4 102.4 0 0 1 102.4 890.88V133.12a102.4 102.4 0 0 1 157.9-86.016l587.162 378.88a102.4 102.4 0 0 1 0 172.032z"
              fill="#666666" p-id="3017"></path>
          </svg>
        </div>
        <div class="video-info">
          <svg @click="handleVoice" v-if="hasVoice" t="1748180500832" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="3956" width="32" height="32">
            <path
              d="M468.992 169.536c29.312-22.528 64.128-40.768 101.312-25.088 36.864 15.616 48.64 53.12 53.76 90.048 5.248 37.824 5.248 89.92 5.248 154.688v245.568c0 64.768 0 116.864-5.184 154.752-5.12 36.864-16.96 74.368-53.76 89.984-37.248 15.744-72.064-2.56-101.376-25.088-30.016-23.04-68.032-61.888-112.832-107.584-23.04-23.552-38.336-34.944-53.76-41.28-15.616-6.4-34.496-9.152-67.456-9.152-28.544 0-54.08 0-73.408-2.048-20.224-2.112-39.04-6.656-56-18.24-32.192-22.016-44.544-54.208-49.28-83.84C52.864 570.24 53.248 545.984 53.568 526.464v-28.928c-0.32-19.52-0.64-43.776 2.816-65.92 4.672-29.568 17.024-61.76 49.28-83.776 16.896-11.52 35.712-16.128 55.936-18.24 19.328-1.984 44.8-1.984 73.344-1.984 33.024 0 51.904-2.752 67.456-9.152 15.488-6.4 30.72-17.792 53.76-41.28 44.8-45.696 82.88-84.608 112.896-107.648zM699.52 350.08a42.688 42.688 0 0 1 59.776 8.064c32.256 42.24 51.392 95.872 51.392 153.856 0 57.92-19.136 111.552-51.392 153.856a42.688 42.688 0 1 1-67.84-51.712c21.056-27.648 33.92-63.104 33.92-102.144 0-39.04-12.864-74.496-33.92-102.144a42.688 42.688 0 0 1 8-59.776z"
              fill="#333333" p-id="3957"></path>
            <path
              d="M884.8 269.824a42.688 42.688 0 1 0-62.912 57.6C868.736 378.688 896 442.88 896 512c0 69.12-27.264 133.312-74.112 184.512a42.688 42.688 0 0 0 62.912 57.6c59.904-65.344 96.512-149.632 96.512-242.112 0-92.48-36.608-176.768-96.512-242.176z"
              fill="#333333" p-id="3958"></path>
          </svg>
          <svg @click="handleVoice" v-else t="1748180577986" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4301" width="32" height="32">
            <path
              d="M115.52 55.168a42.688 42.688 0 0 0-60.352 60.352L266.112 326.4a356.608 356.608 0 0 1-31.168 1.152c-28.544 0-54.08 0-73.408 1.984-20.224 2.112-39.04 6.72-56 18.24-32.192 22.016-44.544 54.208-49.28 83.84-3.456 22.08-3.072 46.272-2.752 65.856v28.928c-0.32 19.52-0.64 43.712 2.816 65.792 4.672 29.632 17.024 61.824 49.28 83.84 16.896 11.52 35.712 16.128 55.936 18.24 19.328 1.984 44.864 1.984 73.408 1.984 32.96 0 51.84 2.752 67.392 9.152 15.488 6.4 30.72 17.792 53.76 41.28 44.8 45.76 82.88 84.672 112.896 107.648 29.312 22.528 64.128 40.832 101.312 25.088 36.864-15.616 48.64-53.12 53.76-90.048 3.712-26.496 4.8-59.968 5.12-99.904l279.296 279.296a42.688 42.688 0 1 0 60.352-60.352L115.52 55.168zM570.304 144.448c-37.12-15.68-72.064 2.56-101.376 25.088-17.088 13.184-36.928 31.488-59.072 53.376-8.512 8.384-12.8 12.608-12.8 17.92 0 5.312 4.224 9.6 12.8 18.112L585.6 434.752c18.56 18.56 27.904 27.904 35.84 24.64 7.872-3.264 7.872-16.448 7.872-42.752V389.12c0-64.704 0-116.736-5.248-154.56-5.12-36.928-16.896-74.432-53.76-90.048zM883.2 310.912a42.688 42.688 0 0 0-59.776 60.8C869.952 417.536 896 473.792 896 533.376c0 41.6-12.608 81.216-35.776 116.864a42.688 42.688 0 0 0 71.552 46.464c31.36-48.256 49.536-103.872 49.536-163.328 0-85.888-37.824-163.2-98.048-222.4zM758.336 399.616a42.688 42.688 0 1 0-65.92 54.144c21.12 25.792 32.896 56.448 32.896 88.96v2.048a42.688 42.688 0 1 0 85.376-2.048 224.64 224.64 0 0 0-52.352-143.104z"
              fill="#333333" p-id="4302"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/store/anime';
import { onMounted, ref } from 'vue';

const results = ref([])
const videoRef = ref(null)
const animiStore = useAnimeStore()
const index = ref(0)
const selected = ref(0)
const hasVoice = ref(false)
const isPaused = ref(true)
const changeResult = (i) => {
  selected.value = i
  index.value = i
}
onMounted(() => {
  results.value = animiStore.imageSearchResult
})
//控制视频播放
const handlePlay = () => {
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPaused.value = false
  } else {
    videoRef.value.pause()
    isPaused.value = true
  }
}
//控制视频声音
const handleVoice = () => {
  hasVoice.value = !hasVoice.value
  if (hasVoice.value) {
    videoRef.value.muted = false
  } else {
    videoRef.value.muted = true
  }
}
//将秒数转换为时分秒格式
const formatTime = (seconds) => {
  const date = new Date(0)
  date.setSeconds(seconds)
  return date.toISOString().substring(11, 19)
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 20px;
  padding: 10px;

  .left {
    flex: 2;
    height: 100%;

    .results {
      width: 100%;
      height: 80px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      display: flex;
      overflow: hidden;
      padding-left: 10px;

      &.active {
        transform: translate(2px, 2px);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
      }

      &:hover {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
      }

      .results-left {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .results-right {
        width: 50%;
        height: 100%;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .right {
    flex: 3;
    top: 0;

    .detail {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;

      .video {
        position: relative;
        width: 100%;
        height: 300px;
        border-radius: 5px;
        overflow: hidden;
        background-color: #ccc;

        .pause-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: disappear 0.6s ease;
          animation-fill-mode: forwards;
          @keyframes disappear {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        img {
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>