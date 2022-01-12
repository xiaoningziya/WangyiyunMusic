<template>
  <div v-show="musicUrl" class="player">
    <!-- 迷你版播放组件 -->
    <div v-show="showMini">
      <MiniPlayer :song-name="songName" :pause="pause" @playMusic="playMusic" />
    </div>
    <!-- 全屏播放组件 -->
    <div v-show="!showMini">
      <NormalPlayer @playMusic="playMusic" />
    </div>
    <audio id="musicPlay" :src="musicUrl" controls="controls" style="display:none">
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import API from '@/api/api'
import NormalPlayer from './normalPlayer.vue'
import MiniPlayer from './miniPlayer.vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  
})
const store = useStore()
const route = useRoute()

// 歌曲列表存在vuex中，可以增删操作

watch(() => store.state.songList, (newVal) => {
  
})

let songName = ref('')
watch(() => store.state.currentSong, (newVal) => {
  // 获取当前歌曲详情
  getMusic(newVal.id)
  songName.value = newVal.name
})

// 如果路由在home下，定位调高
let fBottom = ref('0px')
watch(() => route.path, (newVal) => {
  if (newVal.indexOf('home') >= 0) {
    fBottom.value = '50px'
  } else {
    fBottom.value = '0px'
  }
})

// 展示哪种播放组件
const showMini = ref(true)
let musicUrl = ref('')

// 获取歌曲详情
const getMusic = (musicId: number) => {
  API.getMusicUrl({id: musicId}).then((res: any) => {
    if (res.data.code === 200) {
      musicUrl.value = res.data.data[0].url
      playMusic()
    }
  })
}

// 播放音乐
let pause = ref(true)
const playMusic = () => {
  let music: any = document.getElementById('musicPlay')
  if (music.paused) {
    music.play()
    pause.value = false
  } else {
    music.pause()
    pause.value = true
  }
}


</script>
<style lang="less" scoped>
.player {
  width: 100%;
  position: fixed;
  bottom: v-bind(fBottom);
}
</style>