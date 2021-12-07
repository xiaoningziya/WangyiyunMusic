<!--自定义加载中弹窗组件 -->
<template>
  <div class="customLoading" v-if="showloading">
    <div class="showbox">
      <!-- <van-loading color="#1989fa" /> -->
      <van-loading  color="#FFF" />
      <div class="text">加载中</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  showloading: Boolean
})
const { showloading } = toRefs(props);

</script>
<style lang="less" scoped>
@import url('../../common/common.less');
.customLoading{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,.05);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .showbox{
    width:2.4rem;
    height:2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background: rgba(0,0,0,.7);
    background: #444;
    border-radius: .4rem;
    .text{
      color:#fff;
      margin-top: .26rem;
      letter-spacing: .02rem;
    }
  }
}
</style>
