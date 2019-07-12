// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'       // api: https://github.com/vuejs/vue-router
import store from '@/store'         // api: https://github.com/vuejs/vuex
// import VueCookie from 'vue-cookie'  // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'               // api: https://github.com/ElemeFE/element
import '@/iconfont'                 // api: http://www.iconfont.cn/
import '@/assets/scss/index.scss'
import { isAuth } from '@/utils'
import VueHead from 'vue-head'
import '@/less/public.less'
import VueImg from 'v-img'
import 'font-awesome/css/font-awesome.css'
import ZkTable from 'vue-table-with-tree-grid'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
Vue.component(ZkTable.name, ZkTable)

import JSEncrypt from './assets/jsencrypt.js';
import filters from './utils/filters';


Vue.use(VueImg)

Vue.use(VueHead)
// Vue.use(VueCookie)
// Vue.use(VueQuillEditor)
Vue.config.productionTip = false

Vue.prototype.$JSEncrypt = new JSEncrypt()
Vue.prototype.PublicKey ='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPfoCRJo068xVcIhYnigpb4sxMjSKlkXVZIgl0vTdkdda+Qu8n4VxiLv6P8mHPi9WLZENJQd4kSM6gvSMpm2PtkNRY7aLceTrroPd6tAjKxsa8hvClAFy97OEcpOzi+WqxL8ERSeZ62Rai3fVjIbMP4b1tXaPiUxoPGgdJ74/l/QIDAQAB'
Vue.config.productionTip = false
// 非生产环境, 适配mockjs模拟数据. api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  // require('@/mock')
}
Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})
// 挂载权限方法
Vue.prototype.isAuth = isAuth

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
