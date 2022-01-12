<template>
  <div class="mini-player">
    <div class="song-name">{{ songName }}</div>
    <div class="song-play" @click="togglePlay">
      <van-icon v-show="pause" name="play-circle-o" />
      <van-icon v-show="!pause" name="pause-circle-o" />
    </div>
  </div>
</template>
<script setup lang="ts">
// 搜索展示组件
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  songName: {
    type: String,
    default: ''
  },
  pause: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['playMusic'])


const togglePlay = () => {
  emit('playMusic')
}

</script>
<style lang="less" scoped>
.mini-player {
  text-align: left;
  background: linear-gradient(to right, var(--van-primary-color), #a0cfff);
  padding: 12px 40px 12px 15px;
  display: flex;
  justify-content: space-between;
  .song-name {
    color: #fff;
  }
  .song-play {
    color: #fff;
    cursor: pointer;
    font-size: 24px;
  }
}
</style>
