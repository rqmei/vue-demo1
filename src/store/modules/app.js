import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    CLOSE_SIDEBAR: state => {
      state.sidebar.opened = true
    }
  },
  actions: {
    toggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    toggleDevice: ({ commit }, device) => {
      commit('TOGGLE_DEVICE', device)
    },
    closeSideBar: ({ commit }) => {
      commit('CLOSE_SIDEBAR')
    }
  }
}

export default app
