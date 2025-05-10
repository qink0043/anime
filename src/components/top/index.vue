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
      <span class="login">
        登录
      </span>
      <span class="register">
        注册
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';
const $router = useRouter()

const inputValue = ref('')
const search = () => {
  $router.push({ 
    path: "/search",
    query: { search: inputValue.value }
   });
}
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

  .left {
    .title:hover {
      cursor: pointer;
    }
  }
}
</style>