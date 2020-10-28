<template>
  <div class="all-container">
    <topbar :hide-back-btn="true"/>
    <div class="img-text-container">
<!--      <div class="text-container">-->
<!--        <label v-html="this.tip" class="label-style"></label>-->
<!--      </div>-->
      <el-image :src="img_url" class="img-style"></el-image>
    </div>
    <el-button type="success" class="wide-button" v-on:click.prevent="routeToScanSuccess">扫码</el-button>
    <el-dialog
      :lock-scroll="false"
      :visible.sync="showVerifyDialog"
      title="验证电话号码"
      width="80%"
      :show-close="false"
      :modal="true"
      center>
      <span class="dialog-info">只有家属才能修改信息,需要验证你是否是家属联系人</span>
      <el-input placeholder="请输入电话号码" v-model="phoneNumber"></el-input>
      <el-button @click="verify">验证</el-button>
    </el-dialog>
  </div>
</template>

<script>
import topbar from './topbar'
import wx from 'weixin-js-sdk'
import api from '../api'
export default {
  name: 'scan',
  components: {topbar},
  data () {
    return {
      phoneNumber: '',
      showVerifyDialog: false,
      tip: '请您拿起家属联络卡，如下<span class="black-text">红色正面</span>朝上。点击下方“扫码”按钮，扫描卡上二维码绑定手机。',
      img_url: require('../assets/yellow_card.png')
    }
  },
  created () {
    document.title = this.$route.meta.title
  },
  mounted () {
    console.log('created---')
    wx.ready(function () {
      console.log('ready-----')
    })
    wx.error(function (res) {
      console.log('error-----')
    })
    const loading = this.showLoading('加载中...')
    api.wxConfig().then(config => {
      wx.config({
        debug: false,
        appId: config.data.appId,
        timestamp: config.data.timestamp,
        nonceStr: config.data.nonceStr,
        signature: config.data.signature,
        jsApiList: ['scanQRCode']
      })
    }).finally(() => {
      this.hideLoading(loading)
    })
    // 清除缓存
    sessionStorage.removeItem('manInfo')
    sessionStorage.removeItem('contact')
    sessionStorage.removeItem('qrCodeId')
    const loading2 = this.showLoading('加载中...')
    setTimeout(() => {
      this.hideLoading(loading2)
    }, 1000)
  },
  methods: {
    verify: function () {
      if (!this.phoneNumber) {
        this.$toast('电话号码不能为空!')
        return
      }
      let qrCodeId = sessionStorage.getItem('qrCodeId')
      api.isFamilyMember(qrCodeId, this.phoneNumber)
        .then(({data: {status_code: statusCode, isFamilyMember}}) => {
          console.log('status_code, isFamilyMember', statusCode, isFamilyMember)
          if (statusCode === 0) {
            if (isFamilyMember) {
              // 修改二维码的拥有者
              api.updateQrcodeOwner(qrCodeId)
                .then(({data: {Code, Message}}) => {
                  console.log('修改二维码拥有者:', Code, Message)
                  if (Code === 0) {
                    // 修改成功
                    console.log('修改二维码拥有者成功!')
                    this.$router.push('/settings')
                  }
                })
            } else {
              console.log('你不是家属联系人，不能修改!')
            }
          } else {
            console.log('验证家属联系人失败!')
          }
        }).catch(err => {
          console.log('出现错误:', err)
      })
    },
    routeToScanSuccess: function () {
      try {
        this.startScan()
      } catch (e) {
        this.$toast('点击错误,' + e)
      }
    },
    startScan: function () {
      var that = this
      var ucallFreeId = sessionStorage.getItem('UcallFreeId')
      if (ucallFreeId === null || ucallFreeId === '' || ucallFreeId === 'undefined' || ucallFreeId === undefined) {
        return
      }
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          that.handleScanResult(result)
          console.log('scanQrCode:', result)
        }
      })
    },
    handleScanResult: function (content) {
      var that = this
      if (content.indexOf('qrcodeid') !== -1) { // 注意，这里判断了二维码内容里面的url包含qrcodeid
        var substr = content.split('?')[1]
        // var params = substr.split('&')
        var qrcodeid = this.getQueryValue(substr, 'qrcodeid')
        console.log('传入的qrcode是:' + qrcodeid)
        sessionStorage.setItem('qrCodeId', qrcodeid)
        api.verifyQrCodeActive(qrcodeid).then(res => {
          console.log('验证二维码激活状态结果:', res)
          var UcallFreeId = sessionStorage.getItem('UcallFreeId')
          console.log('本地的UCallfreeid为:', UcallFreeId)
          var data = res.data
          if (data.Code === 0) {
            switch (data.ActiveState) {
              case 0:
                // 未激活
                sessionStorage.setItem('isQrCodeActive', 0)
                if (sessionStorage.getItem('from') === 'admin') {
                  // 管理员扫码
                  this.$router.push('/settingsForAdmin')
                } else {
                  that.$router.push('/addContact')
                }
                break
              case 1:
                // 已激活
                sessionStorage.setItem('isQrCodeActive', 1)
                // 判断owner和自己是否相等
                if (data.Owner === UcallFreeId) {
                  if (sessionStorage.getItem('from') === 'admin') {
                    // 管理员扫码
                    this.$router.push('/settingsForAdmin')
                  }
                  // 此二维码属于自己
                  that.$router.push('/settings')
                } else {
                  // 此二维码属于别人
                  // that.$router.push('/alreadyBindInfo')
                  that.showVerifyDialog = true
                }
                break
              default:
                // alert('二维码无效')
                that.$toast('二维码无效')
                break
            }
          }
        }).catch(res => {
          console.log('error验证二维码激活状态结果:', res)
          this.$toast('二维码无效')
        })
      }
    },
    getQueryValue: function (str, queryName) {
      var vars = str.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === queryName) {
          return pair[1]
        }
      }
      return null
    },
    showLoading: function (text) {
      const loading = this.$loading({
        lock: true,
        customClass: 'create-isLoading', //  *这里设置他的class名称,这里最重要
        text: text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
      })
      return loading
    },
    hideLoading: function (loading) {
      loading.close()
    }
  }
}
</script>

<style scoped>
  .all-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .img-text-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5rem 5rem;
    position: relative;
  }
  .img-style{
  }
  .text-container{
    padding: 10% 5vw;
    position: absolute;
    z-index: 2;
  }
  .dialog-info{
    width: 100%;
    font-size: 1.3rem;
    letter-spacing: 1px;
    font-family: "PingFang SC";
    color: black;
    word-break: break-all;
    text-align: center;
  ;
  }
  .label-style{
    font-size:1.5rem;
    font-family: "PingFang SC";
    color: #666666;
    letter-spacing: 0.01rem;
  }
  /deep/ .black-text{
    color: #121212;
    font-size:1.5rem;
    font-family: "PingFang SC";
    letter-spacing: 0.01rem;
    font-style: normal;
    font-weight: bold;
  }
  .wide-button{
    width: 80%;
    height: 5rem;
    margin-top: 3rem;
    margin-bottom: 5rem;
    letter-spacing: 0.5rem;
    font-size: 2rem;
    background-color: #1AAD19;

  }
</style>
