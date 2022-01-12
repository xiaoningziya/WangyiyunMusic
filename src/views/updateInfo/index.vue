<template>
  <div class="updateInfowrap">
    <van-field
      v-model="formData.gender"
      is-link
      readonly
      name="修改用户信息--性别"
      label="性别"
      placeholder="点击选择性别"
      @click="showPicker = true"
    />
    <van-field name="修改用户信息--昵称" v-model="formData.nickname" label="昵称" placeholder="请输入昵称" />
    <van-field name="修改用户信息--生日" v-model="defaultdate" label="生日" placeholder="请输入生日" disabled />
    <van-field name="修改用户信息--城市" v-model="defaultcity" label="城市" placeholder="请输入城市" disabled />
    <van-field
      v-model="formData.signature"
      rows="2"
      autosize
      label="签名"
      type="textarea"
      maxlength="50"
      name="修改用户信息--签名"
      placeholder="请输入签名"
      show-word-limit
    />

    <van-button style="marginTop:.3rem" size="large" :loading="submitLoading" type="primary" loading-type="spinner" @click="handlerSubmit">保存修改</van-button>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { IUserUpdate_GENDER } from '@/api/enum'
import { useStore } from 'vuex'
import API from '@/api/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'updateInfo',
  setup() {
    // <!-- gender: 性别 0:保密 1:男性 2:女性
    // birthday: 出生日期,时间戳 unix timestamp
    // nickname: 用户昵称
    // province: 省份id
    // city: 城市id
    // signature：用户签名 -->
    const store = useStore();
    const router = useRouter();
    const defaultdate: string = '1994-02-27';
    const defaultcity: string = '浙江 - - 杭州';
    const userId = store?.state?.userId
    const submitLoading = ref(false);
    const formData = reactive({
      gender: '保密',
      birthday: new Date(defaultdate + ' 00:00:00').getTime(),
      nickname: '',
      province: 330000,
      city: 330100,
      signature: '',
    })
    const showPicker = ref(false);
    const columns = ['保密', '男性', '女性'];

    const methods: IMethods = {
      // 获取用户信息
      getuserdetail: (): void => {
        API.userDetail({ uid: userId }).then((res) => {
          if (res.data.code === 200) {
            let data = res.data
            formData.signature = data.profile.signature
            formData.nickname = data.profile.nickname
          }
        });
      },
      onConfirm (value :any, index:number) {
        formData.gender = value;
        showPicker.value = false;
      },
      handlerSubmit () {
        submitLoading.value = true;
        const result = {
          ...formData,
          gender: IUserUpdate_GENDER[<any>formData.gender],
          nickname: decodeURIComponent(formData.nickname),
          signature: decodeURIComponent(formData.signature),
          cookie: store.state.userInfo.cookie
        }
        API.userUpdate(result).then((res) => {
          console.log('res',res)
          submitLoading.value = false;
          router.go(-1)
        }).catch((err) => {
          submitLoading.value = false;
        })
      }
    }

    methods.getuserdetail()

    return {
      ...methods,
      defaultdate,
      defaultcity,
      submitLoading,
      columns,
      showPicker,
      formData
    };
  },
})
</script>
<style lang="less" scoped>
.updateInfowrap{
  width:100%;
  height:100%;
  background: #f6f6f6;
  padding:.1rem 0;
  box-sizing: border-box;
}
</style>
