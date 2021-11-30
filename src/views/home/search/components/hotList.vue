<template>
  <div class="hot-list">
    <div class="title">
      <span>热搜榜</span>
      <van-button round icon="plus" type="primary" size="mini">按钮</van-button>
    </div>

  </div>
</template>
<script setup lang="ts">
// 搜索展示组件
import { defineProps, onMounted, reactive, ref, toRefs } from 'vue'

const props = defineProps({
  list: String
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
}
</style>
