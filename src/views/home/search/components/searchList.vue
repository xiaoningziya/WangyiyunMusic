<template>
  <div class="search-list">
    <div v-for="item in list" :key="item.id" class="search-item" @click="playMusic(item)">
      <span class="item-icon"><van-icon name="search" /></span>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
// 搜索展示组件
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  list: Array
})
const { list } = toRefs(props)
const router = useRouter()

const playMusic = (item: any) => {
  router.push({ path: '/player', query: { songId: item.id } })
}

</script>
<style lang="less" scoped>
.search-list {
  width:100%;
  height:calc(100vh - 2.2rem);
  overflow: auto;
  .search-item {
    display: flex;
    margin-left: .5rem;
    cursor: pointer;
    font-size: .28rem;
    padding-top: .08rem;
    .item-icon {
      margin-right: .1rem;
      position: relative;
      top: .02rem;
    }
  }
}
</style>
