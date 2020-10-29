<template>
  <div></div>
</template>

<script>
import {getUrlParam} from '../utils'
import api from '../api'
import {service} from '../config'

export default {
  name: 'auth',
  data () {
    return {
    }
  },
  created () {
    document.title = this.$route.meta.title
    this.init()
  },
  mounted () {
    // 这部分代码是为了解决在ios上页面返回时不刷新的问题--start
    let u = navigator.userAgent
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isiOS) {
      window.onpageshow = function (e) {
        if (
          e.persisted ||
          (window.performance && window.performance.navigation.type === 2)
        ) {
          window.location.replace(window.location.href.split('?')[0])
          console.log(window.location.href.split('?')[0])
          // this.$router.replace('/auth')
          // window.location.reload()
        }
      }
    }
    // 这部分代码是为了解决在ios上页面返回时不刷新的问题--end
  },
  methods: {
    init: function () {
      sessionStorage.clear()
      // 截取路径上的参数，若含有openID和ucallfreeid和qrcodeid则表示从小程序过来的，
      // 若没有openID这些参数，则表示从微信网页打开，则需要获取code和openID(判断参数中是否有code这个参数，若有则用来换取openID，若没有则先获取code)
      // let params = window.location.search
      let openid = getUrlParam('openid')
      let ucallfreeid = getUrlParam('ucallfreeid')
      let qrcodeid = getUrlParam('qrcodeid')
      let from = getUrlParam('from')
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
        let code = getUrlParam('code')
        if (code) {
          // 记录是否是管理员登录
          if (from) {
            sessionStorage.setItem('from', from)
          }
          // 若参数中有code，直接来换取openID
          console.log('code' + code)
          this.getOpenId(code)
        } else {
          // 若没有参数，则先获取code，回掉地址填本地址
          let url = 'https://agency.ucallclub.com/wechart/Oauth2?'
          let redirectUrl = service.webHost + (from ? '?from=' + from : '')
          let a = 'redirect_uri='
          let encodeUrl = encodeURI(redirectUrl)
          window.location.href = url + a + encodeUrl
        }
      }
    },
    getOpenId: function (code) {
      let that = this
      api.getOpenId(code).then(res => {
        console.log('在app.vue中获取openid成功:', res)
        if (res.data.status_code === 0) {
          let openId = res.data.data
          sessionStorage.setItem('openId', openId)
          // 获取用户状态，保存其中的ucallfreeid
          api.weChatState(openId).then(async res => {
            // console.log('weChatState', res)
            sessionStorage.setItem('Tel', res.data.Tel[0])
            sessionStorage.setItem('UcallFreeId', res.data.UcallFreeId)
            await api.modifyOpenid(openId, res.data.UcallFreeId, res.data.NickName, '', res.data.Headurl)
            // 查询是否有二维码，若没有，进入申请页面，若有则进入scan
            let loading = that.showLoading()
            api.getInfoByUCallId(res.data.UcallFreeId)
              .then(({data: {statusCode, data}}) => {
                if (statusCode === 0 && data !== null && data !== undefined && data.length !== 0) {
                  this.$router.push('/scan')
                } else {
                  if (sessionStorage.getItem('from') === 'admin') {
                    this.$router.replace('/scan')
                  } else {
                    this.$router.replace('/applycard')
                  }
                }
                that.hideLoading(loading)
              })
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
    },
    showLoading: function (text) {
      return this.$loading({
        lock: true,
        customClass: 'create-isLoading', //  *这里设置他的class名称,这里最重要
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      })
    },
    hideLoading: function (loading) {
      loading.close()
      // this.reload()
    }
  }
}
</script>

<style scoped>

</style>
