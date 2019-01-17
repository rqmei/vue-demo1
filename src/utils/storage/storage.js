import local from './localstorage'
import session from './session.js'
import cookies from './cookies.js'
import json from './json.js'
let storage = {
  config: {
    type: 'local', // local,session,cookies,json
    expires: new Date().getTime() + 100 * 24 * 60 * 60 * 1000
  },
  getStorage (options) {
    let config = {}
    if (options) {
      config = Object.assign({}, this.config, options)
    } else {
      config = this.config
    }
    return this.createStorage(config.type)
  },
  createStorage (name) {
    switch (name) {
      case 'local':
        return local
      case 'session':
        return session
      case 'cookies':
        return cookies
      case 'json':
        return json
      default:
        break
    }
  },
  getItem (key, options) {
    let store = this.getStorage(options)
    return store.getItem(key)
  },
  setItem (key, value, options) {
    let store = this.getStorage(options)
    store.setItem(key, value)
  },
  removeItem (key, options) {
    let store = this.getStorage(options)
    store.removeItem(key)
  },
  getAll () {},
  clear (options) {
    let store = this.getStorage(options)
    store.clear()
  },
  key (n) {},
  lenght () {},
  has (key) {},
  forEach (cb) {},
  deleteAllExpires () {},
  // 获取最大存储空间：只有LocalStorage和SessionStorage可以使用这个方法
  getMaxSpace (options) {
    let store = this.getStorage(options)
    store.getMaxSpace()
  },
  // 获取使用了的空间：只有LocalStorage和SessionStorage可以使用这个方法
  getUsedSpace (options) {
    let store = this.getStorage(options)
    store.getUsedSpace()
  }
}
export default storage
