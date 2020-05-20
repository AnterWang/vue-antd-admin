import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Bmob from "hydrogen-js-sdk";
import store from './store'
import '@babel/polyfill'

import './permission'
import './utils/antd-components.js'
import './assets/style/global.less'
import { bus } from './utils/common'

// 全局loading
import Loading from '@/components/my-loading/loading.js'
import auth from '@/components/auth';
Vue.use(Loading);
Vue.component('auth', auth);

Vue.prototype.$bus = bus

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
