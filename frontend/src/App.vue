<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// import axios from 'axios'
// import api from './api'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
  },
  methods: {
  },
  reload () {
    this.isRouterAlive = false
    this.$nextTick(function () {
      this.isRouterAlive = true
    })
  }
}
</script>

<style>
  body {
    background-color: #F9F9FA;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
</style>
