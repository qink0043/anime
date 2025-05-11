import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入清除默认样式
import '@/styles/reset.scss'
import router from '@/router/index'
import top from '@/components/top/index.vue'
import bottom from '@/components/bottom/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css';
//引入pinia仓库
const pinia = createPinia()
import App from '@/App.vue'

const app = createApp(App)
app.component('Top', top)
app.component('Bottom', bottom)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(VueAwesomeSwiper)
app.mount('#app')
