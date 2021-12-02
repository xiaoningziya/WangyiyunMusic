<template>
  <div class="hotsonglistwrap">
    <div class="scrollpage">
      <div class="pageTit">
        热门歌曲50首
      </div>
      <div class="songwrap">
        <div v-for="(item,index) in songData.list" :key="item.id" class="songchild" @click="playsong(item)">
          <div class="sortnum">
            {{ index+1 }}
          </div>
          <div class="infowrap">
            <div class="songinfo">
              <div class="songname">
                {{ item.name }}
              </div>
              <div class="moremsg">
                <div class="taglist">
                  <div class="songtag">
                    VIP
                  </div>
                  <div class="songtag">
                    SQ
                  </div>
                </div>
                <div class="album">
                  {{ item.ar[0].name }} - {{ item.al.name }}
                </div>
              </div>
            </div>
            <div class="mvbtn" @click.stop="playmv(item)">
              <van-icon color="#666" size=".38rem" name="video" />
            </div>
            <div class="morebtn" @click.stop="actionmore(item)">
              <van-icon color="#666" size=".38rem" name="wap-nav" />
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
import API from '@/api/api'

export default defineComponent({
  name: 'Hotsonglist',
  setup () {
    const router = useRouter()
    const route = useRoute()
    let songData = reactive({
      list: []
    })
    const queryId = route.query.id as string
    
    const methods: IMethods = {
      getartistTopSong () {
        API.artistTopSong({ id: queryId }).then((res: any) => {
          if(res.data.code === 200){
            songData.list = res.data.songs
          }
        })
      },
      playsong (item: object) {
        console.log('点击歌曲并播放',item)
      },
      playmv (item: object) {
        console.log('点击Mv按钮',item)
      },
      actionmore (item: object) {
        console.log('点击更多操作按钮',item)
      }
    }
    methods.getartistTopSong();

    return {
      ...methods,
      songData
    }
  }
})
</script>
<style lang="less" scoped>
@import url('../../common/common.less');
.hotsonglistwrap {
  width:100%;
  height:100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fff;
  .scrollpage{
    width:100%;
    height:auto;
    padding-top: .85rem;
    padding-bottom: .1rem;
    box-sizing: border-box;
    .pageTit{
      text-align: left;
      font-size: .3rem;
      font-weight: bold;
      letter-spacing: .02rem;
      width:100%;
      height:.8rem;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
      position: fixed;
      top:0;
      line-height: .8rem;
      padding-left: .32rem;
      background: #f2f2f2;
      z-index: 999;
    }
    .songwrap{
      .songchild{
        width:100%;
        height:.96rem;
        font-size: .24rem;
        background: #fff;
        padding:0 .32rem;
        box-sizing: border-box;
        .DF_JCSB_AIC();
        .sortnum{
          width:.5rem;
          height:100%;
          display: flex;
          align-items: center;
          text-align: left;
          color:#555;
          font-size: .25rem;
        }
        .infowrap{
          flex:1;
          height:100%;
          display: flex;
          overflow: hidden;
          .songinfo{
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            .songname{
              text-align: left;
              color:#000;
              font-size: .28rem;
              margin-bottom: .04rem;
              padding-right: .2rem;
              box-sizing: border-box;
              .Oneway_Ellipsis();
            }
            .moremsg{
              display: flex;
              .taglist{
                display: flex;
                align-items: center;
                .songtag{
                  font-size: .2rem;
                  border:1px solid red;
                  color:red;
                  border-radius: 25%;
                  transform: scale(70%,70%);
                  padding:.02rem;
                }
              }
              .album{
                font-size: .22rem;
                margin-left: .2rem;
                color:#555;
                .Oneway_Ellipsis();
              }
            }
          }
          .mvbtn{
            display: flex;
            align-items: center;
            padding:0 .14rem;
            box-sizing: border-box;
          }
          .morebtn{
            display: flex;
            align-items: center;
            padding:0 .14rem;
            box-sizing: border-box;
          }
        }
      }
      .songchild:not(:last-child){
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
}
</style>
