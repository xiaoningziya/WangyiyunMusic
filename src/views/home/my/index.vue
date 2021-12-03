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
          <div class="nickName">
            {{ nickname }}
          </div>
          <div class="upload">
            <van-uploader :after-read="afterRead" >
              点我上传
            </van-uploader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import API from "@/api/api";

export default defineComponent({
  name: "My",
  setup() {
    const userId = inject("userId") as string
    const backgroundUrl = ref("");
    const avatarUrl = ref("");
    const nickname = ref("");
    interface IFile {
      content: string;
      file: File;
      message: string;
      status: string
    }
    const methods: IMethods = {
      // 获取用户信息
      getuserdetail: (): void => {
        API.userDetail({ uid: userId }).then((res: any) => {
          console.log("res", res);
          if (res.data.code === 200) {
            let data = res.data;
            backgroundUrl.value = data.profile.backgroundUrl;
            avatarUrl.value = data.profile.avatarUrl;
            nickname.value = data.profile.nickname;
          }
        });
      },
      afterRead (resfile: IFile) {
        console.log('上传',resfile)
        API.avatarUpload({
          imgFile: {
            name: resfile.file.name,
            data: resfile.content
          }
        }).then((res) => {
          console.log("res", res);
          if(res.data.code === 200){
            
          }
          if(res.data.data){
            
          }

        });
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
          img {
            width: 100%;
            height: 100%;
          }
        }
        .nickName {
          font-size: 0.36rem;
          font-weight: bold;
          margin-top: 0.3rem;
          position: relative;
          top: -0.6rem;
        }
      }
    }
  }
}
</style>
