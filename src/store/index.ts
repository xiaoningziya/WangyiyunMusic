import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    songList: [], // 播放歌曲列表
    currentSong: {}, // 当前播放歌曲
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
    },
    // 改变播放列表信息
    UPDATE_SONGLIST: (state, list) => {
      state.songList = list
    },
    // 改变当前播放歌曲
    UPDATE_CURRENTSONG: (state, song) => {
      state.currentSong = song
    }
  },
  actions: {
  },
  plugins: [createPersistedState({ storage: window.localStorage })]
})
