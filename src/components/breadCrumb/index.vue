<template>
  <div class="bread-crumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/top' }">热门</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/anime' }">动漫</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title_japanese }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
defineProps({
  title_japanese: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.bread-crumb {
  margin: 10px 0;
}
</style>