<template>
  <div class="singerinfowrap">
    <div class="scrollpage">
      <div class="singerBG">
        <img v-if="singerData?.content?.artist?.cover" :src="singerData.content.artist.cover">
      </div>
      <div class="paddingBox">
        <div class="infoCard">
          <div class="avatbox">
            <img v-if="singerData?.content?.artist?.cover" :src="singerData.content.artist.cover">
          </div>
          <div class="name" v-if="singerData?.content?.artist?.name">
            {{singerData.content.artist.name}}
          </div>
          <div class="destext" v-if="singerData?.content?.artist?.name">
            {{singerData.content.identify.imageDesc}}
          </div>
          <div class="countdes" v-if="singerData?.content?.artist?.name">
            歌曲有{{singerData.content.artist.musicSize}}首，{{singerData.content.artist.mvSize}}个MV
          </div>
          <div class="singerbaike">
            <div class="tit">
              艺人百科
              <van-button class="hotBtn" round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="jumphotsong">
                热门歌曲50首
              </van-button>
            </div>
            <div class="briefDesc">
              {{singerDes.content.briefDesc}}
            </div>
            <div class="introductionwrap" v-if="singerDes?.content?.introduction">
              <div class="introductionchild" v-for="(item,index) in singerDes.content.introduction" :key="index">
                <div class="introductiontitle">
                  《{{item.ti}}》
                </div>
                <div class="introductioncontent">
                  {{item.txt}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { artistDesc, artistDetail } from '@/api/index'

export default defineComponent({
  name: 'Singerinfo',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const queryId:any = route.query.id
    const singerData = reactive({content: []})
    const singerDes = reactive({content: []})
    const methods: IMethods = {
      // 获取歌手描述
      getartistDesc (): void {
        artistDesc({id: queryId}).then((res: any) => {
          if(res.data.code === 200){
            singerDes.content = res.data;
            console.log('获取歌手描述',res.data)
          }
        })
      },
      // 获取歌手详情
      getartistDetail (): void {
        artistDetail({id: queryId}).then((res: any) => {
          if(res.data.code === 200){
            singerData.content = res.data.data;
            console.log('获取歌手详情',res.data.data)
          }
        })
      },
      jumphotsong (): void {
        router.push({
          path: '/hotsonglist',
          query:{
            id: queryId
          }
        })
      }
    }

    methods.getartistDesc();
    methods.getartistDetail();

    return {
      ...methods,
      singerData,
      singerDes
    }
  }
})
</script>
<style lang="less" scoped>
@import url('../../common/common.less');
.singerinfowrap {
  width:100%;
  height:100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #f6f6f6;
  .scrollpage{
    width:100%;
    height:auto;
    .singerBG{
      width:100%;
      height:auto;
      img{
        width:100%;
        height:auto;
      }
    }
    .paddingBox{
      width:100%;
      height:auto;
      padding: 0 .32rem;
      box-sizing: border-box;
      position: relative;
      top:-.5rem;
      .infoCard{
        width:100%;
        height:auto;
        background: #fff;
        box-shadow: 0 0 0.2rem #f4f4f4;
        border-radius: .2rem;
        .DF_FDC_AIC();
        position: relative;
        padding-top: .75rem;
        padding-bottom: .32rem;
        box-sizing: border-box;
        .avatbox{
          width:1.2rem;
          height:1.2rem;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top:-.6rem;
          background: #000;
          img{
            width:100%;
            height:auto;
          }
        }
        .name{
          font-weight: bold;
          font-size: .32rem;
          margin-bottom: .1rem;
        }
        .destext{
          font-size: .24rem;
          margin-bottom: .1rem;
          color:#aaa;
        }
        .countdes{
          font-size: .24rem;
          color:#aaa;
        }
        .singerbaike{
          padding:.32rem;
          box-sizing: border-box;
          line-height: .48rem;
          text-align: left;
          .tit{
            text-align: left;
            font-size: .34rem;
            font-weight: bold;
            margin-bottom: .2rem;
            .DF_JCSB_AIC();
            .hotBtn{
              padding:0 .2rem;
              height:.6rem;
            }
          }
          .briefDesc{
            display: inline-block;
          }
          .introductionwrap{
            .introductionchild{
             .introductiontitle{
               font-weight: bold;
               font-size: .28rem;
               line-height: .5rem;
             } 
             .introductioncontent{
               
             }
            }
          }
        }
      }
    }
  }
}
</style>
