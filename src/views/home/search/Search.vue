<template>
  <div class="search">
    <div class="search-input">
      <van-search v-model="keywords" :placeholder="placeholder" @update:model-value="search" />
    </div>
    <!-- 未搜索展示 -->
    <div v-show="!searchResult" class="list-content">
      <!-- 热搜榜 -->
      <hot-list :list="musicList.hotList" :showMore="musicList.moreHot" @moreHot="moreHot"/>
      <!-- 音乐专区 -->
      <zone-list :list="musicList.zoneList" :showMore="musicList.moreZone" @moreZone="moreZone"/>
    </div>
    <!-- 搜索结果展示 -->
    <div v-show="searchResult">
      <search-list :list="musicList.list"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { defaultKeywords, searchMusic, hotSearchList, detailSearchList } from '@/api/search'
import searchList from './components/searchList.vue'
import hotList from './components/hotList.vue'
import zoneList from './components/zoneList.vue'
import { debounce } from '@/util/index'

export default defineComponent({
  name: 'Search',
  components: {
    searchList,
    hotList,
    zoneList
  },
  setup () {
    const placeholder = ref('')
    const keywords = ref('')
    const musicList = reactive({
      list: [],
      hotList: [],
      moreHot: false,
      zoneList: [{}],
      moreZone: false
    })
    const searchResult = ref(false)

    onMounted(() => {
      defaultKeywords().then((res) => {
        if (res.data.code === 200) {
          placeholder.value = res.data.data.showKeyword
        }
      })
      // 简单热搜
      methods.hotList()
      // 简单专区
      methods.getZoneList()
    })

    const methods = {
      // 搜索防抖
      search: debounce(() => {
        methods.searchFn()
      }, 500),
      // 搜索方法
      searchFn () {
        if (keywords.value.length) {
          searchMusic({ keywords: keywords.value }).then((res) => {
            if (res.data.code === 200) {
              searchResult.value = true
              musicList.list = res.data.result.songs.map((item: {id: string, name: string}) => {
                return {
                  id: item.id,
                  name: item.name
                }
              })
            }
          })
        } else {
          musicList.list = []
          searchResult.value = false
          methods.hotList()
        }
      },
      // 简单热搜
      hotList () {
        hotSearchList().then((res) => {
          if (res.data.code === 200) {
            musicList.hotList = res.data.result.hots
          }
        })
      },
      // 详细热搜
      moreHot () {
        detailSearchList().then((res) => {
          if (res.data.code === 200) {
            musicList.hotList = res.data.data.map((item: {searchWord: string}) => {
              return {
                first: item.searchWord
              }
            })
            musicList.moreHot = true
          }
        })
      },
      // 简单专区
      getZoneList () {
        musicList.zoneList = [{
          name: '歌手分类',
          tips: '查看你最喜欢的歌手',
          icon: 'like-o'
        }, {
          name: '曲风分类',
          tips: '查看你的专属曲风偏好',
          icon: 'music-o'
        }, {
          name: '影视原声专区',
          tips: '听歌追剧好时光',
          icon: 'video-o'
        }, {
          name: '电音专区',
          tips: '全球热门电音嗨翻现场',
          icon: 'service-o'
        }, {
          name: '说唱专区',
          tips: 'REAL说唱为你注入灵魂燃料',
          icon: 'volume-o'
        }, {
          name: '摇滚专区',
          tips: '国摇新声势力等你来听',
          icon: 'hot-sale-o'
        }]
      },
      // 详细热搜
      moreZone () {
        musicList.moreZone = true
        musicList.zoneList = [{
          name: '歌手分类',
          tips: '查看你最喜欢的歌手',
          icon: 'like-o'
        }, {
          name: '曲风分类',
          tips: '查看你的专属曲风偏好',
          icon: 'music-o'
        }, {
          name: '影视原声专区',
          tips: '听歌追剧好时光',
          icon: 'video-o'
        }, {
          name: '电音专区',
          tips: '全球热门电音嗨翻现场',
          icon: 'service-o'
        }, {
          name: '说唱专区',
          tips: 'REAL说唱为你注入灵魂燃料',
          icon: 'volume-o'
        }, {
          name: '摇滚专区',
          tips: '国摇新声势力等你来听',
          icon: 'hot-sale-o'
        }, {
          name: '古典专区',
          tips: '精选典雅，优雅永不过时',
          icon: 'flower-o'
        }, {
          name: '亲子专区',
          tips: '陪伴宝贝快乐成长',
          icon: 'user-o'
        }]
      }
    }
    return {
      placeholder,
      keywords,
      musicList,
      searchResult,
      ...methods
    }
  }
})
</script>
<style lang="less" scoped>
.search {
  width:100%;
  height:100%;
  .search-input {
    margin-left: .82rem;
    margin-right: .35rem;
    /deep/ .van-search__content {
      background: #fff;
      border-bottom: 1px solid #999;
    }
  }
  .list-content {
    width: 100%;
    height: calc(100vh - 2.2rem);
    overflow: auto;
  }
}
</style>
