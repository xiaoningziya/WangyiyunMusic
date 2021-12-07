<template>
    <router-view/>
    <customLoading :showloading="flag" ></customLoading >
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import customLoading from './components/customLoading/customLoading.vue'
import emitter from './plugin/eventbus.ts'

export default defineComponent({
  components: {
    customLoading
  },
  setup() {
    let flag = ref(false)
    emitter.on('changeLoadingStatus',(status: boolean)=>{
      flag.value = status
    })
    return {
      flag
    }
  },
})
</script>

<style lang="less">
*{
  margin:0;
  padding:0;
  text-decoration: none;
  list-style: none;
}
body, html, #app {
  width:100%;
  height:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: .28rem;
}
</style>
