import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: {} // 用户信息
  },
  mutations: {
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
    },
    CLEAR_USERINFO: (state) => {
      state.userInfo = {}
    }
  },
  actions: {
  },
  plugins: [createPersistedState({ storage: window.localStorage })]
})
