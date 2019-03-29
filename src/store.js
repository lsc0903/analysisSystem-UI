import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userName: "",
  name: ""
}

const mutations = {
  SAVE_USERINFO(state, userinfo) {
    localStorage.setItem('userName', userinfo.userName)
    localStorage.setItem('name', userinfo.name)
    state.userName = userinfo.userName
    state.name = userinfo.name
  },
  CLEAR_USERINFO(state) {
    localStorage.clear('userName')
    localStorage.clear('name')
    state.userName = ""
    state.name = ""

  }
}

export default new Vuex.Store({
  state,
  mutations
})