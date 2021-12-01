<template>
  <div class="zone-list">
    <div class="title">
      <span class="title-label">音乐专区</span>
    </div>
    <div class="content">
      <div v-for="item in list" :key="item.name" class="zone-item" @click="checkZone(item.icon)">
        <span class="zone-title">{{ item.name }}</span>
        <span class="zone-icon"><van-icon :name="item.icon" /></span>
        <span class="zone-tip">{{ item.tips }}</span>
      </div>
      <div v-if="!showMore" class="more" @click="showDetail">展开更多专区<van-icon name="arrow-down" /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 搜索展示组件
import { defineProps, defineEmits, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  list: Array,
  showMore: Boolean
})
const emit = defineEmits(['moreZone'])

const { list, showMore } = toRefs(props)
const router = useRouter()

const checkZone = (icon: string) => {
  if (icon === 'like-o') {
    router.push('/singerlist')
  } else {
    alert('功能待开发')
  }
}

// 更多专区
const showDetail = () => {
  emit('moreZone')
}

</script>
<style lang="less" scoped>
.zone-list {
  // width:100%;
  // height:calc(100vh - 2.2rem);
  // overflow: auto;
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
    margin-top: 0;
    padding: .2rem;
    padding-right: 0;
    border-radius: .2rem;
    .zone-item {
      display: inline-block;
      width: 48%;
      height: 1rem;
      background: linear-gradient(to right,var(--van-primary-color), rgb(160, 207, 255));
      border-radius: .2rem;
      margin-top: .1rem;
      margin-right: .1rem;
      position: relative;
      .zone-title {
        position: absolute;
        left: .1rem;
        top: .1rem;
        color: #fff;
      }
      .zone-icon {
        position: absolute;
        right: .1rem;
        top: .1rem;
        color: #fff;
      }
      .zone-tip {
        font-size: .2rem;
        position: absolute;
        bottom: .1rem;
        left: .1rem;
        color: #fff;
      }
    }
    .more {
      font-size: .2rem;
      color: #999999;
      margin-top: .1rem;
    }
  }
}
</style>
