import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: ''
  },
  mutations: {
    setUserID (state, userId) {
      state.userId = userId
    }
  },
  actions: {
    setUserID (context, userId) {
      context.commit('setUserID', userId)
    }
  },
  modules: {
  },
  plugins: [createVuexAlong()]
})
