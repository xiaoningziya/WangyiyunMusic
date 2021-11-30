import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入组件库
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant';
// 引入rem
import remConfig from './remConfig/remConfig'
remConfig()

const Example = createApp(App)
Example.use(store)
  .use(router)
  .use(Vant)
  .use(Lazyload)
  .mount('#app')
