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
      component: () => import('@/pages/anime/index.vue'),
      redirect: '/anime/main',
      meta: {
        title: '动画'
      },
      children: [
        {
          path: 'main',
          component: () => import('@/pages/anime/main/index.vue'),
          meta: {
            title: '动画'
          }
        },
        {
          path: 'board',
          component: () => import('@/pages/anime/board/index.vue'),
          meta: {
            title: '讨论版'
          }
        },
        {
          path: 'ep', 
          component: () => import('@/pages/anime/ep/index.vue'),
          meta: {
            title: '章节'
          }
        },
        {
          path: 'comments',
          component: () => import('@/pages/anime/comments/index.vue'),
          meta: {
            title: '吐槽'
          }
        },
        {
          path: 'stats',
          component: () => import('@/pages/anime/stats/index.vue'),
          meta: {
            title: '透视'
          }
        },
        {
          path: 'persons',
          component: () => import('@/pages/anime/persons/index.vue'),
          meta: {
            title: '制作人员'
          }
        },
        {
          path: 'reviews',
          component: () => import('@/pages/anime/reviews/index.vue'),
          meta: {
            title: '评论'
          }
        },
        {
          path: 'characters',
          component: () => import('@/pages/anime/characters/index.vue'),
          meta: {
            title: '角色'
          }
        }
      ]
    },
    {
      path: '/manga',
      component: () => import('@/pages/manga/index.vue'),
      meta: {
        title: '漫画'
      }
    },
    {
      path: '/mangaDetail',
      component: () => import('@/pages/mangaDetail/index.vue'),
      meta: {
        title: '漫画详情'
      }
    },
    {
      path: '/mangaRead',
      component: () => import('@/pages/mangaRead/index.vue'),
      meta: {
        title: '漫画阅读'
      }
    },
    {
      path: '/novel',
      component: () => import('@/pages/novel/index.vue'),
      meta: {
        title: '小说'
      }
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
      component: () => import('@/pages/season/index.vue'),
      meta: {
        title: '季度动画'
      }
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
      path: '/character',
      component: () => import('@/pages/character/index.vue'),
      meta: {
        title: '角色'
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