import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: {}, // 用户信息
    userId: '',
    showBack: false // 是否显示回退按钮
  },
  getters: {
  },
  mutations: {
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
      state.userId = userinfo.bindings[0].userId
    },
    CLEAR_USERINFO: (state) => {
      state.userInfo = {}
      state.userId = ''
    },
    // 搜索回退按钮是否显示
    SHOW_BACK: (state, status) => {
      state.showBack = status
    }
  },
  actions: {
  },
  plugins: [createPersistedState({ storage: window.localStorage })]
})
