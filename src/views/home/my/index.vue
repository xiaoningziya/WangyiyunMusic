<template>
  <div class="mywrap">
    <div class="scrollView">
      <div class="userBG">
        <img :src="backgroundUrl" alt="" />
      </div>
      <div class="contentPage">
        <div class="userinfoCard Default_Card_BoxShadow">
          <div class="avatBox">
            <van-uploader :after-read="afterRead" >
              <img :src="avatarUrl" alt="" />
            </van-uploader>
          </div>
          <div class="nickName">
            {{ nickname }}
          </div>
          <div class="signature">
            {{ signature }}
          </div>
          <van-button class="changebtn" style="padding:0 .1rem" plain hairline type="primary" size="small" @click="updateinfo">
            <van-icon class="editicon" size=".4rem" name="edit" /> 修改个人信息
          </van-button>
        </div>
        <div class="menuMyList Default_Card_BoxShadow">
          <div :class="['child', index>3 ? 'childMT' : '']" v-for="(item,index) in menumylist.list" :key="index">
            <van-icon color="#666" size=".46rem" :name="item.icon" />
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
        <div class="menuMyLike Default_Card_BoxShadow">
          <div class="starWrap">
            <van-icon color="#fff" size=".5rem" name="like" />
          </div>
          <div class="likeinfo">
            <div class="title">我喜欢的音乐</div>
            <div class="limit">118首</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, ref } from "vue";
import API from "@/api/api";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import EventBus from '../../../plugin/eventbus'

export default defineComponent({
  name: "My",
  setup() {

    const store = useStore();
    const router = useRouter()
    const userId = inject("userId") as string
    const backgroundUrl = ref("")
    const avatarUrl = ref("")
    const nickname = ref("")
    const signature = ref('')
    const menumylist = reactive({
      list:[{
        icon: 'play-circle', //<van-icon name="music" /><van-icon name="play-circle" />
        text: '最近播放',
      }, {
        icon: 'bag',//<van-icon name="bag" />
        text: '本地/下载',
      },  {
        icon: 'gem',//<van-icon name="gem" />
        text: '云盘',
      },  {
        icon: 'shopping-cart', //<van-icon name="<van-icon name="shopping-cart" />" />
        text: '已购',
      }, {
        icon: 'friends', //<van-icon name="<van-icon name="friends" />" />
        text: '我的好友',
      },  {
        icon: 'star', //<van-icon name="star" />
        text: '收藏和赞',
      },  {
        icon: 'service', //<van-icon name="service" />
        text: '我的播客',
      },  {
        icon: 'bookmark', //<van-icon name="bookmark" />
        text: '音乐罐子',
      }]
    })
    interface IFile {
      content: string;
      file: File;
      message: string;
      status: string
    }
    interface IImginfo {
      width: number;
      height: number;
    }

    const methods: IMethods = {
      // 获取用户信息
      getuserdetail: (): void => {
        API.userDetail({ uid: userId }).then((res) => {
          console.log("res", res);
          if (res.data.code === 200) {
            let data = res.data
            backgroundUrl.value = data.profile.backgroundUrl
            avatarUrl.value = data.profile.avatarUrl
            nickname.value = data.profile.nickname
            signature.value = data.profile.signature
          }
        });
      },
      // 上传头像的回调
      async afterRead (resfile: IFile) {
        EventBus.$emit('changeLoadingStatus',true);
        const imgInfo = await methods.getImgSize(resfile.file);
        let formData = new FormData();
        formData.append('imgFile',resfile.file)
        let params = {
          cookie: store.state.userInfo.cookie,
          imgSize: imgInfo.width,
          imgX: 0,
          imgY: 0,
          timestamp: Date.now()
        }
        API.avatarUpload(params,formData).then((res) => {
          EventBus.$emit('changeLoadingStatus',false);
          if(res.data.code === 200){
            const newUrl: string = res.data.data.url
            store.commit('UPDATE_AVATARURL',newUrl)
            avatarUrl.value = newUrl
          }
        });
      },
      // 获取图片宽高
      getImgSize (file:File): Promise<IImginfo> {
        return new Promise((resolve, reject) => {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (theFile) {
            let image = new Image()
            image.src = (<any>theFile.target).result
            image.onload = function () {
              resolve({
                width: (<any>this).width,
                height: (<any>this).height,
              })
            }
          }
        })
      },
      updateinfo () {
        router.push('/updateInfo')
      }
    };

    methods.getuserdetail();

    return {
      ...methods,
      backgroundUrl,
      avatarUrl,
      nickname,
      signature,
      menumylist
    };
  },
});
</script>
<style lang="less" scoped>
@import url('../../../common/common.less');
.mywrap {
  width: 100%;
  height: 100%;
  background: #eee;
  overflow-x: hidden;
  overflow-y: scroll;
  .scrollView {
    width: 100%;
    height: auto;
    position: relative;
    .userBG {
      width: 100%;
      height: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    .contentPage {
      width: 100%;
      height: auto;
      padding: 0 0.32rem;
      box-sizing: border-box;
      position: absolute;
      left:0;
      top: 3rem;
      z-index: 99;
      .userinfoCard {
        width: 100%;
        height: 3rem;
        border-radius: 0.26rem;
        .DF_FDC_AIC();
        .avatBox {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          top: -0.6rem;
          overflow: hidden;
          border:1px solid transparent;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .upload{
          position: relative;
          top:-.5rem;
        }
        .nickName {
          font-size: 0.36rem;
          font-weight: bold;
          position: relative;
          top: -0.4rem;
        }
        .signature{
          font-size: 0.26rem;
          color: #555;
          position: relative;
          top: -0.2rem;
        }
        /deep/ .changebtn{
          position: relative;
          top: 0;
          border-color: transparent !important;
        }
      }
      
      .menuMyList{
        width:100%;
        height:auto;
        margin-top:.4rem;
        border-radius: 0.26rem;
        display: flex;
        flex-wrap: wrap;
        padding:.3rem 0;
        box-sizing: border-box;
        .child{
          width:25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .text{
            font-size: .2rem;
            // margin-top: .1rem;
            padding:.06rem 0;
            color: #333333;
          }
        }
        .childMT{
          margin-top: .32rem;
        }
      }
      .menuMyLike{
        width:100%;
        height:auto;
        margin-top:.4rem;
        display: flex;
        align-items: center;
        padding:.15rem .3rem;
        box-sizing: border-box;
        border-radius: 0.26rem;
        .starWrap{
          width:.6rem;
          height:.6rem;
          background: rgba(0,0,0,.5);
          border-radius: .1rem;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: .2rem;
        }
        .likeinfo{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          .title{
            font-size: .26rem;
            color:#111111;
          }
          .limit{
            margin-top: .03rem;
            font-size: .2rem;
            color:#444444;
          }
        }
      }
    }
  }
}
</style>
