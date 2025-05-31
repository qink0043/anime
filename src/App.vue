<template>
  <div class="container">
    <Top />
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <Bottom /> -->
    <Login />
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 45px;
    width: 1080px;
    border: 1px solid #7f7f7f;
    background-color: rgba($color: white, $alpha: 0.7);
  }
}
</style>
