import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    listId: '',
    MVId: '',
    isPlaying: true,
    songId: '33894312',
    songList: [],
    songIndex: 0,
    currentTime: 0,
    durationTime: '',
    isChanging: false,
    newTime: 0,
    isLog: false
  },
  getters: {
    getListId(state){
      return state.listId
    },
    getMVId(state){
      return state.MVId
    },
    getPlayState(state){
      return state.isPlaying
    },
    getSongId(state){
      return state.songId
    },
    getSongList(state){
      return state.songList
    },
    getSongIndex(state){
      return state.songIndex
    },
    getNextSong(state){
      return state.songList[state.songIndex]
    },
    getCurrentTime(state){
      return state.currentTime
    },
    getDurationTime(state){
      return state.durationTime
    },
    getChangeState(state){
      return state.isChanging
    },
    getNewTime(state){
      return state.newTime
    },
    getLogState(state){
      return state.isLog
    }
  },
  mutations: {
    setNewListId(state, newId){
      state.listId = newId
    },
    setNewMVId(state, newId){
      state.MVId = newId
    },
    changePlayState(state){
      state.isPlaying = !state.isPlaying
    },
    setSongId(state, newId){
      state.songId = newId
    },
    setSongIndex(state, index){
      state.songIndex = index
    },
    setSongList(state, songList){
      state.songList = songList
    },
    setCurrentTime(state, time){
      state.currentTime = time
    },
    setDurationTime(state, time){
      state.durationTime = time
    },
    changeState(state){
      state.isChanging = !state.isChanging
    },
    setNewTime(state, time){
      state.newTime = time
    },
    login(state){
      state.isLog = true
    },
    logout(state){
      state.isLog = false
    }
  }
})