import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: '/anime',
      component: () => import('@/pages/anime/index.vue')
    },
    {
      path: '/search',
      component: () => import('@/pages/search/index.vue')
    },
    {
      path: '/topanime',
      component: () => import('@/pages/topAnime/index.vue')
    },
    {
      path: '/season',
      component: () => import('@/pages/season/index.vue')
    },
    {
      path: '/popularanime',
      component: () => import('@/pages/popularAnime/index.vue')
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