<template>
  <div class="mywrap">
    <div class="scrollView">
      <div class="userBG">
        <img :src="backgroundUrl" alt="" />
      </div>
      <div class="contentPage">
        <div class="userinfoCard">
          <div class="avatBox">
            <img :src="avatarUrl" alt="" />
          </div>
          <div class="upload">
            <van-uploader :after-read="afterRead" >
              <van-button style="padding:0 .1rem" plain hairline type="primary" size="small">编辑头像</van-button>
            </van-uploader>
          </div>
          <div class="nickName">
            {{ nickname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import API from "@/api/api";
import { useStore } from 'vuex'

export default defineComponent({
  name: "My",
  setup() {
    const store = useStore();
    const userId = inject("userId") as string
    const backgroundUrl = ref("")
    const avatarUrl = ref("")
    const nickname = ref("")
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
          }
        });
      },
      // 上传头像的回调
      async afterRead (resfile: IFile) {
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
      }
    };
    methods.getuserdetail();
    return {
      ...methods,
      backgroundUrl,
      avatarUrl,
      nickname,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('../../../common/common.less');
.mywrap {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  overflow-x: hidden;
  overflow-y: scroll;
  .scrollView {
    width: 100%;
    height: auto;
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
      position: relative;
      top: -1rem;
      z-index: 99;
      .userinfoCard {
        width: 100%;
        height: 3rem;
        background: #fff;
        border-radius: 0.26rem;
        box-shadow: 0 0 0.2rem #f4f4f4;
        .DF_FDC_AIC();
        .avatBox {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          top: -0.6rem;
          overflow: hidden;
          border:1px solid #000;
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
          margin-top: 0.3rem;
          position: relative;
          top: -0.5rem;
        }
      }
    }
  }
}
</style>
