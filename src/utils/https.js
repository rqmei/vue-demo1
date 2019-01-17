// 对后端返回的特定码进行拦截然后做相应的操作

import axios from 'axios'
import {Message} from 'element-ui'
import qs from 'qs'

// 创建axios实例设置配置默认值
export const instance = axios.create({
  baseURL: 'http://mobile.safe.jsyxx.cn/mobile',
  responseType: 'json',
  timeout: 50000
})

// 添加响应拦截器
instance.interceptors.response.use((res) => {
  // code为非200是抛错 可结合自己业务进行修改
  console.log('response data:')
  console.log(res)
  if (res.status === 200) {
    return res
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  console.log('response error:')
  console.error(error)
  // 响应出错
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        this.$router.replace({
          path: '/login',
          query: { redirect: this.$router.currentRoute.fullPath }
        })
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        Message({
          message: '登录过期，请重新登录',
          duration: 1000,
          type: 'error'
        })
        // 清除token
        localStorage.removeItem('token')
        this.$store.commit('loginSuccess', null)
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(() => {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })
        }, 1000)
        break
      // 404请求不存在
      case 404:
        Message({
          message: '网络请求不存在',
          duration: 1500,
          type: 'error'
        })
        break
      // 其他错误，直接抛出错误提示
      default:
        Message({
          message: error.response.data.message,
          duration: 1500,
          type: 'error'
        })
    }
  }
  return Promise.reject(error)
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
// 在发送请求之前需要做的某些操作
  console.info('request config:' + config)
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.error('request error:' + error)
  // 请求错误时做些事
  return Promise.reject(error)
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function fetchGet (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export default {
  instance,
  fetchPost,
  fetchGet
}
