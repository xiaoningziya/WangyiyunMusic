import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    userInfo: {}, // 用户信息
    userId: '',
    avatarUrl:'',
    showBack: false // 是否显示回退按钮
  },
  getters: {
  },
  mutations: {
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
      state.userId = userinfo.bindings[0].userId
      state.avatarUrl = userinfo.profile.avatarUrl
    },
    CLEAR_USERINFO: (state) => {
      state.userInfo = {}
      state.userId = ''
      state.avatarUrl=''
    },
    // 搜索回退按钮是否显示
    SHOW_BACK: (state, status) => {
      state.showBack = status
    },
    // 更新头像
    UPDATE_AVATARURL: (state, url) => {
      state.avatarUrl = url;
    }
  },
  actions: {
  },
  plugins: [createPersistedState({ storage: window.localStorage })]
})
