<template>
  <div class="discoverywrap">
    <div class="searchForm">
      <van-search shape="round" :placeholder="placeholder" @click-input="toSearch()" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Discovery',
  setup () {
    const placeholder = '催眠 最近很火哦'
    const router = useRouter()

    const methods = {
      toSearch () {
        router.push({ name: 'Search' })
      }
    }

    return {
      placeholder,
      ...methods
    }
  }
})
</script>
<style lang="less" scoped>
.discoverywrap {
  width:100%;
  height:100%;
  .searchForm {
    margin-left: .55rem;
    margin-right: .25rem;
    .van-search {
      padding: 0;
    }
  }
}
</style>
