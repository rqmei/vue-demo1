import { instance } from '@/utils/https'
//  配置与后端对接的接口地址、请求方式、请求参数
export function login (username, pwd) {
  console.info('api login:' + username + ',' + pwd)
  return instance({
    url: '/login',
    method: 'post',
    data: {
      'userName': username,
      'password': pwd,
      'version': '20'
    }
  })
}
