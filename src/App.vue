<template>
  <div id="app">
    <nav-bar
      title="dEMS">
        <account-block></account-block>
    </nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AccountBlock from '@/components/AccountBlock.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    AccountBlock
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
