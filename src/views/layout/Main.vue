<template>
<div class="main-wrap">
  <div class="container" style="margin-bottom:12px">
  <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'Main',
  components: {
  }
}
</script>

<style>
.main-wrap{
  width: 100%;
  min-height: 100%;
  padding:10px;
  margin-top: 82px;
  background: #F2F3F7;
  box-sizing: border-box;
}
.container{
  padding: 18px 20px;
  box-sizing: border-box;
}
</style>
