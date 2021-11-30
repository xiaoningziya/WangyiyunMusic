<template>
  <div class="search">
    <div class="search-input">
      <van-search v-model="keywords" :placeholder="placeholder" @update:model-value="search" />
    </div>
    <!-- 未搜索展示 -->
    <div v-show="!searchResult">
      <hot-list :list="musicList.hotList"/>
    </div>
    <!-- 搜索结果展示 -->
    <div v-show="searchResult">
      <search-list :list="musicList.list"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { defaultKeywords, searchMusic } from '@/api/search'
import searchList from './components/searchList.vue'
import hotList from './components/hotList.vue'
import { debounce } from '@/util/index'

export default defineComponent({
  name: 'Search',
  components: {
    searchList,
    hotList
  },
  setup () {
    const placeholder = ref('')
    const keywords = ref('')
    const musicList = reactive({
      list: []
    })
    const searchResult = ref(false)

    onMounted(() => {
      defaultKeywords().then((res) => {
        if (res.data.code === 200) {
          placeholder.value = res.data.data.showKeyword
        }
      })
    })

    const methods = {
      // 搜索防抖
      search: debounce(() => {
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
        }
      }, 500)
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
}
</style>
