/* eslint-disable */
export default {
    pairs: (state, getters) => {
        return state.pairs
    },
    token: (state, getters) => (address) => {
        return state.tokens[address]
    }
}
