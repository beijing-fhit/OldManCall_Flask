<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios'
import api from './api'
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
    // this.getURLFrom()
    this.init_web()
  },
  methods: {
    init_web: function () {
      // 请求code接口，将copenid存到后台的session中，再调用openid接口获取后台接口中的session中的openID
      api.initWebAPI().then(res => {
        console.log('initwebapi1：', res)
        this.getOpenId()
      }).catch(err => {
        console.log('initwebapi2：', err)
      })
    },
    getOpenId: function () {
      api.getOpenId().then(res => {
        console.log('在app.vue中获取openid成功:', res)
        let openId = res.data
        sessionStorage.setItem('openId', openId)
        // 获取用户状态，保存其中的ucallfreeid
        api.weChatState(openId).then(res => {
          // console.log('weChatState', res)
          sessionStorage.setItem('UcallFreeId', res.data.UcallFreeId)
          sessionStorage.setItem('Tel', res.data.Tel[0])
        }).catch(res => {
          console.log('webChatState error', res)
        })
      }).catch(res => {
        console.log('在app.vue中获取openid失败:', res)
      })
    },
    // getURLFrom: function () {
    //   // 该方法用于获取请求网站来自小程序或者微信网页
    //   api.getURLFrom().then(res => {
    //     // 获取数据，该数据是个string,mp表示小程序，web微信网页
    //     let data = res.data
    //     var openid = data.openid
    //     var qrcodeid = data.qrcodeid
    //     var ucallfreeid = data.ucallfreeid
    //     console.log('发生异常1..', openid, qrcodeid, ucallfreeid)
    //     if (openid && qrcodeid && ucallfreeid) {
    //       sessionStorage.setItem('openId', openid)
    //       sessionStorage.setItem('qrCodeId', qrcodeid)
    //       sessionStorage.setItem('UcallFreeId', ucallfreeid)
    //       sessionStorage.setItem('fromWXMP', true)
    //       this.$router.push('/call')
    //     } else {
    //       sessionStorage.setItem('fromWXMP', false)
    //       this.getOpenId()
    //     }
    //   }).catch(res => {
    //     console.log('发生异常..', res)
    //     sessionStorage.setItem('fromWXMP', false)
    //     this.getOpenId()
    //   })
    // },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
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
