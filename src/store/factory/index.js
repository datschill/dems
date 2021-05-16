/* eslint-disable */
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
    pairs: [],
    tokens: {}
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
