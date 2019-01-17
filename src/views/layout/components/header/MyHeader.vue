<template>
	<div class="header-wrap">
    <div class="navbar">
      <hamburger class="change-menu" :toggleClick="toggleSideBar" ></hamburger>
      <div class="user-info">
      <span>{{this.userName}}</span>
      <a v-on:click="logOut">退出</a>
      </div>
    </div>
    <TagsView></TagsView>
  </div>
</template>

<script src="./header.js">
</script>

<style lang="scss">
  $bg:#fff;
.header-wrap {
  position: fixed;
  width: -moz-calc(100% - 180px);
  width: -webkit-calc(100% - 180px);
  width:calc(100% - 180px);
  top:0;
  background-color: $bg;
  z-index: 99;
}
  .navbar {
    width: 100%;
    border-bottom: solid 1px #e6e6e6;
  }
  .change-menu {
    width: 30px;
    margin-top: 8px;
    padding-left: 20px;
    margin-right: 18px;
  }
  .user-info{
    line-height: 46px;
    margin-right: 20px;
    font-size:14px;
    span{
      margin: 0 18px;
    }
  }
</style>
