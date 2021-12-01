<template>
  <div class="hotsonglistwrap">
    <div class="scrollpage">
      热门歌单50首
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import API from '@/api/api'

export default defineComponent({
  name: 'Hotsonglist',
  setup () {
    const router = useRouter();
    const route = useRoute();
    const queryId = route.query.id as string
    
    const methods: IMethods = {
      getartistTopSong () {
        API.artistTopSong({ id: queryId }).then((res: any) => {
          console.log('hotsonglist-res',res)
        })
      }
    }
    methods.getartistTopSong();

    return {
      ...methods,
    }
  }
})
</script>
<style lang="less" scoped>
.hotsonglistwrap {
  width:100%;
  height:100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fff;
  .scrollpage{
    width:100%;
    height:auto;
    padding: .32rem;
    box-sizing: border-box;
  }
}
</style>
