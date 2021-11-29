<template>
  <div class="homewrap">
    <!-- <div class="headtopbox"></div> -->
    <div class="homeContent">
      <router-view></router-view>
    </div>
    <div class="homeSwitch">
      <Navigation />
    </div>
    <div class="slideBtn" @click="slideshow">
      <van-icon color="#555" size="24px" name="bars" />
    </div>
    <van-popup v-model:show="slideFlag" position="left" duration="0.2" :style="{ width: '80%',height: '100%' }">
      <Sidebarlist />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';
import Navigation from '@/components/navigation/navigation.vue'
import Sidebarlist from '@/components/sidebarlist/sidebarlist.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Navigation,
    Sidebarlist
  },
  setup() {
    const store = useStore();
    let slideFlag = ref(false)
    let methods: IMethods = {
      slideshow:():void => {
        slideFlag.value = true;
      },
    }
    return {
      ...methods,
      slideFlag
    }
  },
})
</script>
<style lang="less" scoped>
.homewrap {
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .headtopbox{
    width:100%;
    height:.4rem;
    background: #000;
  }
  .homeContent {
    width:100%;
    flex:1;
    padding:.32rem;
    box-sizing: border-box;
  }
  .homeSwitch{
    width:100%;
    height:1rem;
  }
  .slideBtn{
    position: fixed;
    left: .32rem;
    top:.26rem;
  }
}
</style>
