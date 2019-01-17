import {login} from '@/api/user/login'
import https from '@/utils/https'

const user = {
  // 放页面共享数据
  state: {
    userName: 'admin',
    token: ''
  },
  // mutation 必须是同步函数。组件中使用 this.$store.commit('xxx') 提交，在action里面使用commit('xxx') 提交。
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.userName = name
    }
  },
  // 类似于 mutation，不同在于：actions处理一部操作
  actions: {
    // 登录
    Login (context, user) {
      const username = user.username
      const pwd = user.password
      console.log('stores actions login:' + username + ',' + pwd)
      return new Promise((resolve, reject) => {
        login(username, pwd).then((response) => {
          console.log('stores actions login response response:')
          console.log(response.data.data.userName)
          context.commit('SET_NAME', response.data.data.userName)
          resolve(response)
        }).catch((error) => {
          console.log('stores actions login error:' + error)
          reject(error)
        })
      })
    },
    onLogin (state, userInfo) {
      const username = userInfo.username
      const pwd = userInfo.password
      console.log('stores actions login:' + username + ',' + pwd)
      const params = {'userName': username, 'password': pwd, 'version': '20'}
      https.fetchPost('/login', params).then((response) => {
        console.log('stores actions onLogin response response:' + response)
        state.commit('SET_NAME', response.data.userName)
        console.log(state.getters.userName)
      }).catch((err) => {
        console.log('stores actions onLogin error:' + err)
      })
    }
  }
}
export default user
