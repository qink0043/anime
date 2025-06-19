//路由鉴权
import NProgress from 'nprogress'
import pinia from '@/store/pinia'
import { useUserStore } from './store/user'
import { useRouter } from 'vue-router'


const blackList = ['/user']
const $router = useRouter()
const userStore = useUserStore(pinia)
export function usePermission(router) {
  //前置守卫
  router.beforeEach((to, from, next) => {
    NProgress.start()
    let title = to.meta.title ? ` - ${to.meta.title}` : ''
    document.title = '动漫资讯' + title
    //判断用户是否登录
    const token = userStore.token
    if (token) {
      next()
    } else {
      if (!blackList.includes(to.path)) {
        next()
      } else {
        //显示登录组件
        userStore.formVisible = true
        $router.replace({
          path: '/home',
          query: {
            redirect: to.fullPath
          }
        })
      }
    }
  })
  //后置守卫
  router.afterEach((to, from) => {
    NProgress.done()
  })
}

