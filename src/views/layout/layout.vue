<template>
	<div :class="classObj">
    <div v-if="device==='mobile'&& !sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <div class="left-menu">
      <Menu></Menu>
    </div>
    <div class="right-wrap">
      <MyHeader></MyHeader>
      <Main></Main>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/header/MyHeader'
import Menu from '@/views/layout/components/menu/Menu'
import Main from '@/views/layout/Main'
import {mapGetters} from 'vuex'
export default {
  name: 'Layout',
  components: {
    MyHeader,
    Menu,
    Main
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('closeSideBar')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    classObj () {
      return {
        'hide-sidebar': this.sidebar.opened,
        openSidebar: !this.sidebar.opened,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style lang="scss">
  .left-menu{
    position: fixed;
    z-index:999;
    background:#545c64;
    top: 0;
    left: 0;
    width: 180px;
    transition:width .5s;
    height: 100%;
    overflow:scroll;
  &::-webkit-scrollbar{
     display:none;
   }
  }
  .right-wrap{
    margin-left:180px;
    height: 100%;
  }
  .drawer-bg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 998;
    opacity: 0.3;
    background: #000;
  }
</style>
