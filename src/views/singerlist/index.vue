<template>
  <div class="Singerlistwrap">
    <div class="scrollpage">
      <div v-for="item in singerData.list" :key="item.id" class="singerCard">
        <div class="avatbox" @click="jumpsongerinfo(item.id)">
          <img v-lazy="item.img1v1Url" alt="">
        </div>
        <div class="textbox">
          <div class="name" @click="jumpsongerinfo(item.id)">
            {{ item.name }}
          </div>
          <div class="focusBtn">
            + 关注
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ArtistList_TYPE, ArtistList_AREA} from '@/api/enum'
import API from '@/api/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Singerlist',
  setup () {
    const router = useRouter()
    const singerData = reactive({list: []})
    const methods = {
      getartistList (): void {
        const reqParams = {
          limit: 30,
          offset: 0,
          initial: -1,
          type: ArtistList_TYPE['全部'],
          area: ArtistList_AREA['华语']
        }
        API.artistList(reqParams).then((res: any) => {
          if(res.data.code === 200){
            singerData.list = res.data.artists
          }
        })
      },
      jumpsongerinfo (id:string | number): void {
        router.push({
          path:'/singerinfo',
          query:{ id }
        })
      }
    }
    methods.getartistList()
    return {
      ...methods,
      singerData
    }
  }
})
</script>
<style lang="less" scoped>
@import url('../../common/common.less');
.Singerlistwrap {
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
    .singerCard{
      width:100%;
      height:1rem;
      .DF_AIC();
      .avatbox{
        width:.74rem;
        height:.74rem;
        border-radius: 50%;
        overflow: hidden;
        img{
          width:100%;
          height:auto;
        }
      }
      .textbox{
        margin-left: .2rem;
        flex:1;
        height: 100%;
        border-bottom: 1px solid #ddd;
        .DF_JCSB_AIC();
        .name{
          font-size: .28rem;
          font-weight: bold;
          flex:1;
          text-align: left;
          padding-left: .2rem;
          box-sizing: border-box;
          height: 100%;
          .DF_AIC();
        }
        .focusBtn{
          width:1rem;
          height:.4rem;
          border-radius: .24rem;
          font-size: .24rem;
          border:1px solid red;
          color:red;
          .DF_JCC_AIC();
        }
      }
    }
  }
}
</style>
