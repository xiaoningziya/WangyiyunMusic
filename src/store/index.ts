import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: {}, // 用户信息
    userId: ''
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
    }
  },
  actions: {
  },
  plugins: [createPersistedState({ storage: window.localStorage })]
})
