import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from './axios'
import store from './store/store.js'
import './util/filter'
Vue.config.productionTip = false
Vue.prototype.$axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
