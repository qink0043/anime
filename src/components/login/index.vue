<template>
  <div class="login-container" v-if="userStore.visiable">
    <div class="login-form-content" :class="{ active: !isEyesOpen }">
      <div class="login-title">
        账户登录
      </div>
      <el-form :model="loginParams" ref="loginForm" style="max-width: 600px">
        <el-form-item>
          <el-input :prefix-icon="User" v-model="loginParams.accountNumber" style="width: 340px;height: 50px;"
            placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="Lock" v-model="loginParams.password" @focus="close2233" @blur="open2233"
            style="width: 340px; height: 50px;" type="password" placeholder="请输入密码">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button class="submit-button" type="primary" @click="goLogin" v-loading.fullscreen.lock="loading">
          登录
        </el-button>
        <el-button class="register-button">
          注册
        </el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { Lock, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';
//获取仓库中控制对话框显示与隐藏的数据
const userStore = useUserStore()

//控制2233睁眼闭眼
const isEyesOpen = ref(true)
const close2233 = () => {
  isEyesOpen.value = false
}
const open2233 = () => {
  isEyesOpen.value = true
}

//存储登录表单的信息
const loginParams = reactive({
  accountNumber: '',
  password: ''
})
//自定义表单校验规则
const regAccountName = /^[0-9]{6,12}$/   //6-12位阿拉伯数字
const regPassword = /^[a-z0-9]{6,12}$/   //6-12位阿拉伯数字和小写字母的组合

const loading = ref(false)
//点击登录
const goLogin = () => {
  //设置loading状态
  loading.value = true
  //表单校验
  if (regAccountName.test(loginParams.accountNumber) && regPassword.test(loginParams.password)) {
    //发送登录请求
    userStore.login(loginParams.accountNumber, loginParams.password)
      .then(() => {
        //关闭loading状态
        ElMessage.success('登录成功')
        userStore.visiable = false
      }).catch(err => {
        //关闭loading状态
        loading.value = false
        ElMessage.error(err.response?.error || '登录失败')
      })
  } else {
    ElMessage.error('账号或密码错误')
  }
}
</script>

<style scoped lang="scss">
.login-container {
  background-image: url('@/assets/img/22_open.png');
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

  .login-form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
    height: 480px;
    background-color: white;
    background-image: url('@/assets/img/22_open.png'), url('@/assets/img/33_open.png');
    background-repeat: no-repeat, no-repeat;
    background-position: 0 100%, 100% 101%;
    background-size: 20%;
    padding: 20px;
    border-radius: 12px;

    &.active {
      background-image: url('@/assets/img/22_close.png'), url('@/assets/img/33_close.png');
    }

    .login-title {
      font-size: x-large;
      color: #505050;
      margin-bottom: 20px;
    }

    .submit-button,
    .register-button {
      margin-top: 20px;
      width: 164px;
      height: 40px;
    }
  }
}
</style>