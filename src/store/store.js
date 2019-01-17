import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import tagsView from '@/store/modules/tagsView'
import app from '@/store/modules/app'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    tagsView,
    app
  },
  state: {
    // 存放组件之间共享的数据
  },
  mutations: {
    // 显式的更改state里的数据
  },
  getters,
  actions: {
    //
  }
})

export default store
