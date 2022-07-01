import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/base.css'
import './utils/filter'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
