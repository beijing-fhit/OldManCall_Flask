<template>
  <div></div>
</template>

<script>
import {getUrlParam} from '../utils'
import api from '../api'

export default {
  name: 'auth',
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      // 截取路径上的参数，若含有openID和ucallfreeid和qrcodeid则表示从小程序过来的，
      // 若没有openID这些参数，则表示从微信网页打开，则需要获取code和openID(判断参数中是否有code这个参数，若有则用来换取openID，若没有则先获取code)
      // var params = window.location.search
      var openid = getUrlParam('openid')
      var ucallfreeid = getUrlParam('ucallfreeid')
      var qrcodeid = getUrlParam('qrcodeid')
      // console.log('参数：', openid, ucallfreeid, qrcodeid)
      if (openid && ucallfreeid && qrcodeid) {
        // 来自小程序，则不用请求参数,跳转到call页面
        sessionStorage.setItem('openId', openid)
        sessionStorage.setItem('UcallFreeId', ucallfreeid)
        sessionStorage.setItem('qrCodeId', qrcodeid)
        api.verifyQrCodeActive(qrcodeid).then(res => {
          if (res.data.Code === 0) {
            if (res.data.ActiveState === 0) {
              // 未激活
              // 跳转到infodisplay页面，展示提示信息
              this.$router.push({path: '/info', query: {message: '二维码未激活，请前往公众号激活!'}})
            } else {
              // 已激活
              this.$router.push('/call')
            }
          }
        }).catch(err => {
          this.$router.push({path: '/info', query: {message: err}})
        })
      } else {
        // 来自网页
        var code = getUrlParam('code')
        if (code) {
          // 若参数中有code，直接来换取openID
          this.getOpenId(code)
        } else {
          // 若没有参数，则先获取code，回掉地址填本地址
          var url = 'https://agency.ucallclub.com/wechart/Oauth2?'
          var redirectUrl = 'https://mustberich.cn'
          var a = 'redirect_uri='
          var encodeUrl = encodeURI(redirectUrl)
          window.location.href = url + a + encodeUrl
        }
      }
    },
    getOpenId: function (code) {
      api.getOpenId(code).then(res => {
        // console.log('在app.vue中获取openid成功:', res)
        if (res.data.status_code === 0) {
          let openId = res.data.data
          sessionStorage.setItem('openId', openId)
          // 获取用户状态，保存其中的ucallfreeid
          api.weChatState(openId).then(res => {
            // console.log('weChatState', res)
            sessionStorage.setItem('UcallFreeId', res.data.UcallFreeId)
            sessionStorage.setItem('Tel', res.data.Tel[0])
            this.$router.push('/scan')
          }).catch(res => {
            console.log('webChatState error', res)
          })
        } else {
          // 提示信息
          console.log(res.data.message)
        }
      }).catch(res => {
        console.log('在app.vue中获取openid失败:', res)
      })
    }
  }
}
</script>

<style scoped>

</style>
