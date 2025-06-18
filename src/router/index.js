import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/anime',
      component: () => import('@/pages/anime/index.vue')
    },
    {
      path: '/search',
      component: () => import('@/pages/search/index.vue'),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/searchVideo',
      component: () => import('@/pages/searchVideo/index.vue'),
      meta: {
        title: '搜索视频'
      }
    },
    {
      path: '/watch',
      component: () => import('@/pages/watch/index.vue')
    },
    {
      path: '/topanime',
      component: () => import('@/pages/topAnime/index.vue'),
      meta: {
        title: '排行榜'
      }
    },
    {
      path: '/season',
      component: () => import('@/pages/season/index.vue')
    },
    {
      path: '/imageSearch',
      component: () => import('@/pages/imageSearch/index.vue'),
      meta: {
        title: '图片搜索'
      }
    },
    {
      path: '/popularanime',
      component: () => import('@/pages/popularAnime/index.vue'),
      meta: {
        title: '热门动画'
      }
    },
    {
      path: '/user',
      component: () => import('@/pages/user/index.vue'),
      meta: {
        title: '用户中心'
      },
      children: [
        {
          path: 'collection',
          component: () => import('@/pages/user/collection/index.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})