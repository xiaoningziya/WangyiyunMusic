<!--首页底部Switch导航区域 -->
<template>
  <div class="navigationwrap">
    <div class="navEvery" v-for="item in navlist" :key="item.text" :class="nowRoutePath === item.path ? 'navActive' : '' "  @click="switchRouter(item.path)">
      <span class="iconfont">
        <img :src="nowRoutePath === item.path ? item.active : item.iconfont">
      </span>
      <div class="routerlink" >{{item.text}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

interface INavlist {
  text: string,
  path: string,
  iconfont: HTMLElement,
  active: HTMLElement,
}


export default defineComponent({
  name: 'Navigation',
  setup() {
    let navlist: Array<INavlist> = [{
      text: '发现',
      path: '/home/discovery',
      iconfont: require('@/assets/iconfont/navigation/wangyiyunyinyuemusic1193417easyiconnet.svg'),
      active: require('@/assets/iconfont/navigation/wangyiyunyinyuemusic1193417easyiconnet_a.svg'),
    },{
      text: '博客',
      path: '/home/blog',
      iconfont: require('@/assets/iconfont/navigation/radioguangbo.svg'),
      active: require('@/assets/iconfont/navigation/radioguangbo_a.svg'),
    },{
      text: '我的',
      path: '/home/my',
      iconfont: require('@/assets/iconfont/navigation/yinle.svg'),
      active: require('@/assets/iconfont/navigation/yinle_a.svg'),
    },{
      text: '关注',
      path: '/home/focus',
      iconfont: require('@/assets/iconfont/navigation/geren.svg'),
      active: require('@/assets/iconfont/navigation/geren_a.svg'),
    },{
      text: '云村',
      path: '/home/yuncun',
      iconfont: require('@/assets/iconfont/navigation/shequ.svg'),
      active: require('@/assets/iconfont/navigation/shequ_a.svg'),
    }]
    let router = useRouter();
    let route = useRoute();
    let nowRoutePath = ref('/home/discovery')
    let methods: IMethods = {
      // 点击切换路由
      switchRouter: (path:string): void => {
        router.push(path)
      }
    }
    let _watch = watch(route,(newRoute,oldRoute) => {
      if(newRoute.path){
        nowRoutePath.value = newRoute.path;
      }
    },{deep:true})

    return {
      ...methods,
      nowRoutePath,
      navlist,
    }
  },
})
</script>
<style lang="less" scoped>
.navigationwrap{
  width:100%;
  height:100%;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  font-size: .24rem;
  .navEvery{
    width:20%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconfont{
      display: inline-block;
      width:.36rem;
      height:.36rem;
      margin-bottom: .05rem;
      img{
        display: inline-block;
        width:100%;
        height:100%;
      }
    }
  }
  .navActive{
    color:red;
  }
}
</style>