// 有时候我们需要从 store 中的 state 中派生出一些状态，Vuex 允许我们在 store 中定义『getters』
const getters = {
  userName: state => state.user.userName,
  token: state => state.user.token,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device
}
export default getters
