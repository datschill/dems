import Vue from 'vue'
import Vuex from 'vuex'
import ethers from './ethers'
import factory from './factory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ethers,
    factory
  }
})
