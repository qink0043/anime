<template>
  <div class="top-nav">
    <div class="topAndMenu" v-for="(menu, index) in menus" :key="index" @mouseenter="activeMenu = index"
      @mouseleave="activeMenu = null">
      <p class="top-p" :class="{ 'active': activeMenu === index }">{{ menu.title }}</p>
      <div class="menu" v-show="activeMenu === index" @mouseenter="activeMenu = index">
        <div class="p" v-for="(item, index) in menu.items" :key="index">
          <p @click="topMenuItem">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const activeMenu = ref(null)

const menus = [
  {
    title: '动漫',
    items: ['动漫搜索', '热门动漫', '视频', '评论']
  },
  {
    title: '漫画',
    items: ['兴趣推荐', '论坛', '博客', '用户']
  },
  {
    title: '社区',
    items: ['动漫搜索', '热门动漫', '视频', '评论']
  },
  {
    title: '帮助',
    items: ['关于', '支持我们', '更多问题', '开发人员']
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

    .menu {
      background-color: white;
      position: absolute;
      top: 40px;
      left: 0;
      min-width: 90px;
      z-index: 100;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

      .p {
        padding: 5px;

        p {
          height: 40px;
          line-height: 40px;
          color: black;
        }
      }

      .p:hover {
        cursor: pointer;
        background-color: #2E51A2;

        p {
          color: white;
        }
      }
    }
  }

  .top-p {
    width: 90px;
    text-align: center;
    line-height: 40px;

    &.active,
    &:hover {
      background-color: white;
      color: black;
      cursor: pointer;
    }
  }
}
</style>