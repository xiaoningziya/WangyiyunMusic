<!--首页左侧边栏列表区域 -->
<template>
  <div class="sidebarlistwrap">
    <div class="fixedUser">
      <div class="message">
        <img :src="store.state.userInfo.profile.avatarUrl">
        <div class="username">{{store.state.userInfo.account.userName}}</div>
      </div>
      <div class="sys">
        <van-icon name="enlarge" size=".46rem" />
      </div>
    </div>
    <div class="scrollView">
      <div class="slideBtnList">
        <div class="cellcard">
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
        </div>
        <div class="cellcard">
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
        </div>
        <div class="cellcard">
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
          <van-cell icon="guide-o" title="单元格" is-link />
        </div>
      </div>
      <!-- <van-button v-show="!isLogin" size="large" plain hairline type="primary" @click="gologin">用户登录</van-button> -->
      <van-button class="logoutBtn" color="#fff" v-show="isLogin" size="large" plain hairline type="primary" @click="loginout">退出登录</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { logout } from '@/api/index'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Sidebarlist',
  setup () {
    const store = useStore()
    const router = useRouter()
    const computedGroup = {
      isLogin: computed((): boolean => {
        return Boolean(store?.state?.userInfo?.token)
      })
    }
    const methods:IMethods = {
      loginout: (): void => {
        logout({}).then((res: any) => {
          if (res.data.code === 200) {
            Toast('已退出账号')
            store.commit('CLEAR_USERINFO')
            router.push('/login')
          }
        })
      },
      gologin: (): void => {
        router.push('/login')
      }
    }
    return {
      store,
      ...methods,
      ...computedGroup
    }
  }
})
</script>
<style lang="less" scoped>
.sidebarlistwrap{
  width:100%;
  height:100%;
  padding:.2rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #efefef;
  .fixedUser{
    width:100%;
    height:1rem;
    // border:1px solid green;
    background: #fff;
    position: fixed;
    top:0;
    left:0;
    padding:.2rem .32rem 0;
    box-sizing: border-box;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .message{
      display: flex;
      align-items: center;
      img{
        width:.46rem;
        height:.46rem;
        border-radius: 50%;
      }
      .username{
        font-size: .3rem;
        font-weight: bold;
        margin-left: .2rem;
      }
    }
    .sys{

    }
  }
  .scrollView{
    width:100%;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: 1.1rem;
    padding:0 .32rem;
    box-sizing: border-box;
    .slideBtnList{
      .cellcard{
        border-radius: .16rem;
        overflow: hidden;
        margin-bottom:.2rem;
      }
    }
    .logoutBtn{
      height:.8rem;
      color:red !important;
      font-size: .3rem;
      border-radius: .2rem;
      letter-spacing: .02rem;
    }
  }
}
</style>
