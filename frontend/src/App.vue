<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title='$route.meta.title'></router-view>
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

<style lang="scss">
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

  .create-isLoading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-loading-spinner {
      background: rgba(0, 0, 0, 0.7);
      padding: 2rem;
      border-radius: 0.4rem;
      width: auto;
      text-align: center;
      position: center;
      font-size: 4rem;
      i {
        color: #eee;
      }

      .el-loading-text {
        color: #eee;
        font-size: 2rem;
      }
    }
  }
  /*elementui loading css 覆盖 开始*/
  .el-loading-mask.is-fullscreen {
    z-index: 1 !important;
  /* 因为我的header的z-index比较大。这里看情况*/
  }

  /*.my-el-custom-spinner {*/
  /*    background: url("./assets/images/loading.gif");//这个图自己百度"loading gif"，肯定能找到*/
  /*    background-size: 40px 40px; //长宽自己设置*/
  /*    width: 40px;*/
  /*    height: 40px;*/
  /*    display: inline-block;*/
  /*}*/
  .el-loading-spinner {
    top: 45% !important;
  /* 这是控制loading位置的*/
  }
  /*elementui loading css 覆盖 结束*/
</style>
