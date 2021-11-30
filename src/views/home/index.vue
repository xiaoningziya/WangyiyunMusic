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
    <van-popup
      v-model:show="slideFlag"
      position="left"
      duration="0.2"
      :style="{ width: '80%', height: '100%' }"
    >
      <Sidebarlist />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import { useStore } from "vuex";
import Navigation from "@/components/navigation/navigation.vue";
import Sidebarlist from "@/components/sidebarlist/sidebarlist.vue";

export default defineComponent({
  name: "Home",
  components: {
    Navigation,
    Sidebarlist,
  },
  setup() {
    const store = useStore();
    const userInfo = ref(store.state.userInfo);
    const userId = ref(store.state.userId);
    // 生产‘userInfo’和‘userId’供子节点消费
    provide("userInfo", userInfo.value);
    provide("userId", userId.value);
    let slideFlag = ref(false);
    let methods: IMethods = {
      slideshow: (): void => {
        slideFlag.value = true;
      },
    };
    return {
      ...methods,
      slideFlag,
    };
  },
});
</script>
<style lang="less" scoped>
.homewrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .headtopbox {
    width: 100%;
    height: 0.4rem;
    background: #000;
  }
  .homeContent {
    width: 100%;
    flex: 1;
    // padding: 0.32rem 0.32rem 0;
    // box-sizing: border-box;
  }
  .homeSwitch {
    width: 100%;
    height: 1rem;
  }
  .slideBtn {
    position: fixed;
    left: .32rem;
    top:.42rem;
  }
}
</style>
