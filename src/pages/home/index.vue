<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/img/top.png" alt="">
      <div class="top-nav">
        <div class="left">
          <p>动漫</p>
          <p>漫画</p>
          <p>社区</p>
          <p>帮助</p>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <div class="content">
      <div class="left">左侧</div>
      <div class="right">右侧</div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.home {
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .top-nav {
      background-color: #2E51A2;
      height: 40px;
      color: white;
      .left {
        display: flex;
        p {
          width: 90px;
          text-align: center;
          line-height: 40px;
        }
        p:hover {
          background-color: white;
          color: black;
          cursor: pointer;
        }
      }
    }
  }
  .content {
    display: flex;
    .left {
      flex: 2;
      background-color: red;
      padding: 10px;
    }
    .right {
      flex: 1;
      background-color: blue;
      padding: 10px;
    }
  }
}
</style>