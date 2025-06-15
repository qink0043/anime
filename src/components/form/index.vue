<template>
  <div class="login-container" v-if="userStore.formVisiable">
    <div class="login-form-content" :class="{ active: !isEyesOpen }">
      <el-icon class="close-icon" @click="userStore.formVisiable = false">
        <Close />
      </el-icon>
      <div class="title">
        <div class="tab" :class="{ active: tab }" @click="changeTab(true)">登录</div>
        <div class="tab-line"></div>
        <div class="tab" :class="{ active: !tab }" @click="changeTab(false)">注册</div>
      </div>
      <el-form :model="ruleForm" ref="ruleFormRef" style="max-width: 600px" :rules="rules" label-width="auto"
        status-icon>
        <el-form-item prop="email" v-if="!tab">
          <el-input :prefix-icon="Message" v-model="ruleForm.email" style="width: 340px;height: 50px;"
            placeholder="请输入邮箱" type="email" />
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" v-model="ruleForm.userName" style="width: 340px;height: 50px;"
            placeholder="请输入用户名" @keyup.enter="focusPassword"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input ref="passwordInput" :prefix-icon="Lock" v-model="ruleForm.password" @focus="close2233"
            @blur="open2233" style="width: 340px; height: 50px;" type="password" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" v-if="!tab">
          <el-input ref="passwordInput" :prefix-icon="Lock" v-model="ruleForm.confirmPassword" @focus="close2233"
            @blur="open2233" style="width: 340px; height: 50px;" type="password" placeholder="请确认密码">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button v-if="tab" @click="submitForm(ruleFormRef, 'login')" :disabled="isSubmit" class="submit-button"
          v-loading.fullscreen.lock="loading">
          登录
        </el-button>
        <el-button v-else @click="submitForm(ruleFormRef, 'register')" :disabled="isSubmit" class="register-button"
          v-loading.fullscreen.lock="loading">
          注册
        </el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script setup>
import { registerAPI, loginAPI } from '@/api/user';
import { useUserStore } from '@/store/user';
import { Lock, User, Close, Message } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';
//获取仓库中控制对话框显示与隐藏的数据
const userStore = useUserStore()

const tab = ref(true)
const changeTab = (val) => {
  tab.value = val
}

//表单数据
const ruleForm = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
})


// form 表单组件实例
const ruleFormRef = ref(null)
// 密码输入框的引用
const passwordInput = ref(null)
// 聚焦密码输入框
const focusPassword = () => {
  passwordInput.value.focus()
}

// 自定义验证密码的方法
const validateConfirmPass = (rule, value, callback) => {
  if (value !== ruleForm.password) {
    callback(new Error('两次输入密码不一样'))
  }
  callback()
}

// 验证规则
const rules = reactive({
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur',
    },
  ],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名只能在2到16个字之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码只能在6到16个字之间', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码只能在6到16个字之间', trigger: 'blur' },
    { validator: validateConfirmPass, trigger: 'blur' },
  ]
})

// 是否在提交过程中
const isSubmit = ref(false)
const submitForm = (formEl, type) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      isSubmit.value = true
      if (type === 'register') {
        const data = {
          email: ruleForm.email,
          userName: ruleForm.userName,
          password: ruleForm.password,
          confirmPassword: ruleForm.confirmPassword
        }
        registerAPI(data).then(res => {
          if (res.code === 200) {
            ElMessage({ type: 'success', message: '注册成功' })
            //注册成功后，切换到登录页
            tab.value = true
          } else {
            ElMessage({ type: 'error', message: res.msg })
          }
        }).catch(err => {
          ElMessage({ type: 'error', message: err })
        }).finally(() => {
          isSubmit.value = false
        })
      } else if (type === 'login') {
        const data = {
          userName: ruleForm.userName,
          password: ruleForm.password,
        }
        loginAPI(data).then(res => {
          if (res.code === 200) {
            ElMessage({ type: 'success', message: '登录成功' })
            //登录成功后，关闭登录对话框
            userStore.formVisiable = false
            const { userName, email, token } = res.data
            // 设置token
            userStore.setToken(token)
            //设置用户信息
            userStore.setUserInfo({
              userName,
              email
            })
          } else {
            ElMessage.error(res.msg)
          }
        }).catch(err => {
          ElMessage.error(err.msg)
        }).finally(() => {
          isSubmit.value = false
        })
      }
    } else {
      ElMessage('错误')
    }
  })
}

//控制2233睁眼闭眼
const isEyesOpen = ref(true)
const close2233 = () => {
  isEyesOpen.value = false
}
const open2233 = () => {
  isEyesOpen.value = true
}


const loading = ref(false)

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
    min-height: 480px;
    background-color: white;
    background-image: url('@/assets/img/22_open.png'), url('@/assets/img/33_open.png');
    background-repeat: no-repeat, no-repeat;
    background-position: 0 100%, 100% 101%;
    background-size: 20%;
    padding: 20px;
    border-radius: 12px;
    position: relative;

    &.active {
      background-image: url('@/assets/img/22_close.png'), url('@/assets/img/33_close.png');
    }

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: x-large;
      color: #505050;
      margin-bottom: 20px;

      .tab {
        margin: 0 10px;

        &:hover {
          color: #4474e4;
        }

        &.active {
          color: #4474e4;
        }
      }

      .tab-line {
        width: 1px;
        height: 20px;
        background-color: #d8c9c9;
        margin: 0 10px;
      }
    }

    .submit-button,
    .register-button {
      margin-top: 20px;
      width: 164px;
      height: 40px;
    }

    .close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 20px;
    }
  }
}
</style>