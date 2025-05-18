<template>
  <div class="bottom">
    我是底部
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 45px;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #7f7f7f;
  z-index: 999;
}
</style>