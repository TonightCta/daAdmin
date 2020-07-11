// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import '../theme/index.css'
import '../static/publicCss.css'
import Api from './api/api.js'
import Axios from 'axios'
import router from './router'
Vue.use(ElementUI)
Vue.prototype.$http=Api;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
