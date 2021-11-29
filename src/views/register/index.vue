<template>
  <div class="registerwrap">
    <div class="formbox">
      <van-field v-model="registerForm.phone" label="手机号码" placeholder="请输入手机号码" />
      <van-button type="primary" size="large" @click="sendcode" :disabled="!isDisabled" >{{buttonText}}</van-button>
      <van-field v-model="registerForm.captcha" label="验证码" placeholder="请输入验证码" />
      <van-field v-model="registerForm.password" label="密码" placeholder="请输入密码" />
      <van-field v-model="registerForm.nickname" label="昵称" placeholder="请输入昵称" />
    </div>
    <van-button class="rgBtn" type="primary" color="#fff" size="large" @click="register" >注册</van-button>
    <van-button class="rgBtn" type="primary" color="#fff" size="large" @click="gologin" >已有账号，去登录</van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref, reactive } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { register_cellphone, captcha_sent } from '@/api/index'

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter();
    let registerForm = reactive({
      phone: '',
      captcha: '',
      password: '',
      nickname: ''
    })
    let maxNum = ref(60);
    let nowNum = ref(0);
    let buttonText = ref('获取验证码');
    onMounted(() => {

    })
    // @计算属性
    let computedGroup = {
      // 是否禁用按钮
      isDisabled: computed((): boolean => {
        return Boolean(buttonText.value === '获取验证码');
      })
    }
    // @方法集合
    let methods: IMethods = {
      // 获取验证码
      sendcode: (): void => {
        let phoneReg:RegExp = /^1\d{10}$/;
        if(phoneReg.test(registerForm.phone)){
          captcha_sent({phone:registerForm.phone}).then((res)=>{
            if(res.data.code === 200 && res.data.data === true){
              methods.countDown();
            }
          })
        }else{
          Toast('请输入正确的手机号');
        }
      },
      // 倒计时函数
      countDown: (): void => {
        nowNum.value = maxNum.value;
        let timer = setInterval(()=>{
          if(nowNum.value !== 0){
            nowNum.value = nowNum.value-1;
            buttonText.value = `${nowNum.value} S后重新获取`
          }else{
            clearInterval(timer);
            buttonText.value = '获取验证码';
          }
        },1000)
      },
      // 去注册
      register: (): void => {
        let params = registerForm;
        console.log('params',params)
        register_cellphone(params).then(res=>{
          if(res.data.code === 200){
            Toast('注册成功');
          }
        })
      },
      gologin: (): void =>{
        router.push('/login');
      }
    }
    return {
      ...methods,
      ...computedGroup,
      buttonText,
      registerForm
    }
  },
})
</script>
<style lang="less" scoped>
.registerwrap{
  width:100%;
  height:100%;
  padding:.6rem 0;
  box-sizing: border-box;
  // background: red;
  background: red;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .formbox{
    margin-bottom: 2rem;
  }
  .rgBtn,.lgBtn{
    width:80%;
    height:.9rem;
    margin:.2rem 0;
    // background: #fff;
    color:red !important;
    border-radius: .4rem;
    font-size: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    letter-spacing: .06rem;
  }
}
</style>
