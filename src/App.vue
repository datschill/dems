<template>
  <div id="app">
    <nav-bar
      title="dEMS">
        <div class="navbar-right">
          <div class="pointer" @click="testBuySellShitcoin">Buy/Sell</div>
          <div class="pointer" @click="retrieveBNBprice">BNB Price</div>
          <div class="pointer" @click="retrieveLastSwap">Start Logs</div>
          <account-block></account-block>
        </div>
    </nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AccountBlock from '@/components/AccountBlock.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    NavBar,
    AccountBlock
  },
  methods: {
    ...mapActions('factory', [
        'retrieveLastSwap',
        'retrieveBNBprice',
        'testBuySellShitcoin'
    ])
  },
  mounted() {

  }
}
</script>

<style>
@import './assets/styles/index.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-right {
  display: flex;

  flex-flow: row nowrap;
}

.navbar-right div {
  margin-left: 5px;
}

.pointer {
  cursor: pointer;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
