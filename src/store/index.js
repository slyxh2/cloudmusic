import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    listId: ''
  },
  getters: {
    getListId(state){
      return state.listId
    }
  },
  mutations: {
    setNewListId(state, newId){
      state.listId = newId
    }
  }
})