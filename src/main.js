// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'
import store from './store/store'

Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
}).$mount('#app')
