<template>
  <div class="hot-list">
    <div class="title">
      <span class="title-label">热搜榜</span>
      <van-button round icon="play" type="primary" size="mini" @click="playMusic">播放</van-button>
    </div>
    <div class="content">
      <div v-for="(item, index) in list" :key="item.first" class="hot-item" @click="playMusic">
        <span class="main" :class="index+1 <= 3 ? 'top' : ''">{{ index+1 }}</span>.{{ item.first }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 搜索展示组件
import { defineProps, onMounted, reactive, ref, toRefs } from 'vue'

const props = defineProps({
  list: Array
})
const { list } = toRefs(props)

const playMusic = () => {
  alert('播放功能待开放')
}

</script>
<style lang="less" scoped>
.hot-list {
  width:100%;
  height:calc(100vh - 2.2rem);
  overflow: auto;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .35rem;
    .title-label {
      font-weight: 800;
    }
  }
  .content {
    box-shadow: 0 8px 12px #ebedf0;
    margin: .1rem;
    padding: .2rem;
    border-radius: .2rem;
    .hot-item {
      display: inline-block;
      width: 50%;
      text-align: left;
      .top {
        color: red;
      }
      .main {
        display: inline-block;
        text-align: right;
        width: .3rem;
      }
    }
  }
}
</style>
