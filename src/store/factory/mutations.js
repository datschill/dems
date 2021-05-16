import Vue from "vue"

/* eslint-disable */
export default {
  addPair: function (state, pair) {
    state.pairs.push(pair)
  },
  updateToken: function (state, token) {
    Vue.set(state.tokens, token.address, token)
  }
}
