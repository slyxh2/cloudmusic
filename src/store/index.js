import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    listId: '',
    MVId: ''
  },
  getters: {
    getListId(state){
      return state.listId
    },
    getMVId(state){
      return state.MVId
    }
  },
  mutations: {
    setNewListId(state, newId){
      state.listId = newId
    },
    setNewMVId(state, newId){
      state.MVId = newId
    }
  }
})