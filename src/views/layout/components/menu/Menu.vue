<template>
<el-row>
  <img class="logo" src="@/assets/logo.png" />
  <el-col :span="24">
  <el-menu
  class="el-menu-vertical-demo"
  default-active="2"
  :router="true"
  :collapse="sidebar.opened"
  :collapse-transition="false"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  @close="handleClose"
  @open="handleOpen"
  >
    <el-submenu v-for="(item, index) in routes" v-show="!item.hidden" :index="item.path" :key="index">
      <template slot="title">
        <i v-if="item.meta" :class="'el-icon-'+item.meta.icon"></i>
        <i v-else class="el-icon-menu"></i>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item v-for="(child, index) in item.children" :key="index" :index="child.name" :route="item.path + (child.path == '/'?'':'/') + child.path" v-if="!child.hidden">
        <span class="second-menu">{{child.name}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
  </el-col>
</el-row>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    // 一级菜单打开时的回调
    handleOpen (key, keyPath) {
      //
      console.log(key, keyPath)
    },
    // 一级菜单关闭时的回调
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
.logo {
  margin-top: 12px;
  width: 128px;
  height: 36px;
}

.el-submenu {
  min-width: 100px;
}
.second-menu {
  margin-left: 10px;
}
</style>
