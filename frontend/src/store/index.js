import Vue from 'vue';
import Vuex from 'vuex';
import userStore from '@/store/UserStore';
// import { taskStore } from '@/store/toy.store';
import { boardStore } from '@/store/board.store';
// import { userStore } from '@/modules/UserStore';
//TODO: add stores to main store !

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    boardStore
  }
})
