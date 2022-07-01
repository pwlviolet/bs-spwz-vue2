import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      // maxlength:40,//user界面翻页中total最大值
      // list:[]  
    },
    mutations:{
      // initlist(state,list){
      //   state.list=list
      // },
      // initmaxlength(state,length){
      //   state.maxlength=length
      // }
    },
    actions:{
      // asygetmaxlength(content) {
      //   axios.get('/user').then((res)=>{
      //     // console.log(res)
      //     content.commit('initlist',res.data)
      //     // content.commit('initmaxlength',res.length)
      //   })
      // }
    },
    getters:{

    }

})