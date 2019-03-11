import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   }
// })

const state = {
  userinfo: {}
}
console.log(state.userinfo)

const mutations = {
  SAVE_USERINFO (state,userinfo){
    state.usdrinfo = userinfo
  }
}

export default new Vuex.Store({
  state,
  mutations
})
