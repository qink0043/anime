import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入清除默认样式
import '@/styles/reset.scss'
import router from '@/router/index'
//引入全局组件
import top from '@/components/top/index.vue'
import bottom from '@/components/bottom/index.vue'
import form from '@/components/form/index.vue'
import imageUpload from '@/components/imageUpload/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css';
//引入pinia仓库
//引入进度条样式
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false })
const pinia = createPinia()
const app = createApp(App)
import App from '@/App.vue'

app.use(pinia)
app.use(router)

//引入路由鉴权
import { usePermission } from '@/permission'
//调用路由鉴权
usePermission(router)

//全局组件注册
app.component('Top', top)
app.component('Bottom', bottom)
app.component('Form', form)
app.component('ImageUpload', imageUpload)

//其他插件注册
app.use(ElementPlus)
app.use(VueAwesomeSwiper)

app.mount('#app')
