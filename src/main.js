// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFlashMessage from 'vue-flash-message'
import store from './store'
import router from './router.js'

Vue.config.productionTip = false

require('vue-flash-message/dist/vue-flash-message.min.css')

Vue.use(VueFlashMessage, { messageOptions: { timeout: 3000 } });

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
