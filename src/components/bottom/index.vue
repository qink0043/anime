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
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #7f7f7f;
  z-index: 999;
}
</style>