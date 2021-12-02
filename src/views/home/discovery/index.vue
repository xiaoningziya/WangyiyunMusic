<template>
  <div class="discoverywrap">
    <div class="searchForm">
      <van-search shape="round" :placeholder="placeholder" @click-input="toSearch()" />
    </div>
    <div class="pagePadding">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerData.list" :key="item.bannerId" @click="jumppage(item.url)">
          <img :src="item.pic" alt="">
        </van-swipe-item>
      </van-swipe>
      <van-button type="primary" @click="jumpsingerlist">歌手列表</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { BANNER_TYPE } from '@/api/enum'
import API from '@/api/api'
import { defineComponent, reactive, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Discovery',
  setup () {
    const placeholder = ref('')
    const router = useRouter()
    const store = useStore()
    const bannerData = reactive({list: []})

    onMounted(() => {
      API.defaultKeywords().then((res: any) => {
        if (res.data.code === 200) {
          placeholder.value = res.data.data.showKeyword
        }
      })
    })

    const methods: IMethods = {
      toSearch () {
        // 显示回退按钮，跳转搜索页
        store.commit('SHOW_BACK', true)
        router.push({ name: 'Search' })
      },
      // 获取轮播图
      getbanner () {
        API.banner({ type: BANNER_TYPE.iphone }).then((res: any) => {
          if (res.data.code === 200) {
            bannerData.list = res.data.banners
          }
        })
      },
      jumppage (url:string) {
        window.location.href = url
      },
      jumpsingerlist () {
        router.push('/singerlist')
      }
    }
    methods.getbanner()

    return {
      placeholder,
      ...methods,
      bannerData
    }
  }
})
</script>
<style lang="less" scoped>
.discoverywrap {
  width:100%;
  height:100%;
  .searchForm {
    margin-left: .82rem;
    margin-right: .35rem;
    margin-top: .23rem;
    .van-search {
      padding: 0;
    }
  }
  .pagePadding{
    width:100%;
    height:auto;
    padding:.32rem;
    box-sizing: border-box;
    .my-swipe{
      border-radius: .15rem;
      overflow: hidden;
      img{
        width:100%;
        height:auto;
      }
    }
  }
}
</style>
