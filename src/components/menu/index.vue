<template>
  <div class="top-nav">
    <div class="topAndMenu" v-for="(menu, index) in menus" :key="index" @mouseenter="activeMenu = null"
      @mouseleave="activeMenu = null">
      <p class="top-p" :class="{ 'active': activeMenu === index }">{{ menu.title }}</p>
      <div class="menu" @mouseenter="activeMenu = index">
        <div class="menu-p" v-for="(item, index) in menu.items" :key="index" @click="topMenuItem(item.path)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter()
const activeMenu = ref(null)
//点击菜单项的回调
const topMenuItem = (path) => {
  $router.push(path)
}
const menus = [
  {
    title: '动漫',
    items: [{ name: '动漫搜索', path: '/search' },
    { name: '热门动漫', path: '/topanime' },
    { name: '视频', path: '/watch/esicope' },
    { name: '评论', path: '/reviews' }]
  },
  {
    title: '漫画',
    items: [{ name: '兴趣推荐', path: '/manga' },
    { name: '论坛', path: '/manga' },
    { name: '博客', path: '/manga' },
    { name: '用户', path: '/manga' }]
  },
  {
    title: '小说',
    items: [{ name: '小说', path: '/novel' },
    { name: '小说', path: '/novel' },
    { name: '小说', path: '/novel' },
    { name: '小说', path: '/novel' }]
  },
  {
    title: '帮助',
    items: [{ name: '关于', path: '/anime/search' },
    { name: '支持我们', path: '/topanime' },
    { name: '更多问题', path: '/watch/esicope' },
    { name: '开发人员', path: '/reviews' }]
  }
]
</script>

<style scoped lang="scss">
.top-nav {
  background-color: #2E51A2;
  height: 40px;
  color: white;
  display: flex;
  position: relative;

  .topAndMenu {
    position: relative;

    .top-p {
      width: 90px;
      text-align: center;
      line-height: 40px;
      transition: all 0.3s ease;

      &.active,
      &:hover {
        background-color: white;
        color: black;
      }

      &:hover+.menu {
        transform: scaleY(1);
      }
    }

    .menu {
      background-color: white;
      position: absolute;
      top: 40px;
      left: 0;
      min-width: 90px;
      z-index: 2;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transform: scaleY(0);
      transition: all 0.3s ease;
      transform-origin: top;

      &:hover {
        transform: scaleY(1);
      }

      .menu-p {
        padding: 5px;
        height: 40px;
        color: black;
        text-align: center;

        &:hover {
          background-color: #2E51A2;
          color: white;
        }
      }
    }
  }
}
</style>