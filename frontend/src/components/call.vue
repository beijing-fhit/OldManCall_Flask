<template>
    <div class="info-container">
      <old-man-info :info="this.info"/>
      <el-image :src="call_img" class="call-img" @click="startCall"></el-image>
      <span class="call-text">呼叫家属</span>
      <el-dialog
        :lock-scroll="false"
        :visible.sync="centerDialogVisible"
        title="呼叫失败"
        width="80%"
        :show-close="false"
        center>
        <span class="center-dialog-content">{{error_msg}}</span>
        <span slot="footer" class="dialog-footer dialog-btn-group">
          <span type="primary" @click="dialogConfirm" class="confirm-btn">确定</span>
        </span>
      </el-dialog>
      <el-dialog
        :lock-scroll="false"
        :visible.sync="showMessage"
        title="重要提醒"
        width="80%"
        :show-close="false"
        center>
       <span class="dialog-info">{{this.info.message}}</span>
       <div class="dialog-btn">
        <el-button @click="confirm" class="verify-btn">确定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import OldManInfo from './oldManInfo'
import api from '../api'
import wx from 'weixin-js-sdk'
export default {
  inject: ['reload'],
  name: 'call',
  components: {OldManInfo},
  data () {
    return {
      call_img: require('../assets/call.png'),
      showMessage: false,
      info: {
        name: '预设内容',
        age: '预设内容',
        address: '预设内容',
        medical_history: '预设内容',
        allergy: '预设内容',
        blood_type: '预设内容',
        drugs: '预设内容',
        treatment: '预设内容'
      },
      phone_number: [],
      centerDialogVisible: false,
      error_msg: '',
      address: ''
    }
  },
  mounted () {
    // window.addEventListener('touchmove')
    window.ontouchmove = function (e) {
      var clientX = e.touches[0].clientX
      var clientY = e.touches[0].clientY
      var x = e.changedTouches[0].clientX - clientX
      var y = e.changedTouches[0].clientY - clientY
      var w = x < 0 ? x * -1 : x // x轴的滑动值
      var h = y < 0 ? y * -1 : y // y轴的滑动值
      if (w > h) { // 如果是在x轴中滑动
        e.preventDefault() // 阻止后面的事件触发
      }
    }
    console.log('created---')
    wx.ready(() => {
      console.log('ready-----')
      this.getLocation()
    })
    wx.error(function (res) {
      console.log('error-----')
      this.$toast('授权失败!' + res)
    })
    // this.$alert('当前地址:' + window.location.href)
    api.wxConfig().then(config => {
      console.log('config', config.data)
      // this.$alert('签名:' + JSON.stringify(config.data))
      wx.config({
        debug: false,
        appId: config.data.appId,
        timestamp: config.data.timestamp,
        nonceStr: config.data.nonceStr,
        signature: config.data.signature,
        jsApiList: ['getLocation']
      })
    })
    // 获取数据
    var that = this
    // that.$alert('openid:' + sessionStorage.getItem('openId') + 'qrcodeid:' + sessionStorage.getItem('qrCodeId'))
    var qrcodeid = sessionStorage.getItem('qrCodeId')
    var temp = qrcodeid.split('?') // xxx?qrcodeid=xxx?qrcodeid=xxx
    var p = temp[temp.length - 1]
    if (p.indexOf('=') !== -1) {
      qrcodeid = p.split('=')[1]
    } else {
      qrcodeid = p
    }
    api.getInfo(qrcodeid)
      .then(res => {
        console.log('获取信息成功', res)
        // that.$alert('获取信息：' + JSON.stringify(res.data))
        var data = res.data
        if (data.status_code === 0) {
          that.info = data.data.old_man_info
          that.phone_number = data.data.phone_number
          console.log('重要提醒1，message:', that.info.message)
          if (that.info.message) {
            that.showMessage = true
            console.log('重要提醒2，message:', that.info.message)
          }
        }
      })
      .catch(err => {
        console.log('获取信息失败', err)
      })
  },
  created () {
    document.title = this.$route.meta.title
  },
  methods: {
    confirm: function () {
      this.showMessage = false
    },
    startCall: function () {
      // 显示loading
      const loading = this.showLoading('正在发送呼叫请求..')
      try {
        var that = this
        var qrcodeid = sessionStorage.getItem('qrCodeId')
        var temp = qrcodeid.split('?') // xxx?qrcodeid=xxx?qrcodeid=xxx
        var p = temp[temp.length - 1]
        if (p.indexOf('=') !== -1) {
          qrcodeid = p.split('=')[1]
        } else {
          qrcodeid = p
        }
        var t = null
        api.weChatCalling(sessionStorage.getItem('openId'), this.phone_number, qrcodeid)
          .then(async (res) => {
            // this.hideLoading(loading)
            console.log('呼叫成功:', res)
            if (res.data.Code === 0 && res.data.Caller !== '') {
              // 获取地理位置发送通知
              // await that.getLocation()
              // 只发送地理位置
              console.log('地理位置：', that.address)
              if (that.address !== null && that.address !== '') {
                await api.sendMsgNotification(that.phone_number, that.address)
              }
              t = res.data.Caller
              window.location.href = 'tel:' + res.data.Caller
              setTimeout(() => {
                window.location.reload()
              }, 500)
            } else {
              console.log('呼叫失败1:', res)
              that.$toast('呼叫失败!')
              that.error_msg = '请您稍后再拨!' + JSON.stringify(res.data)
              that.centerDialogVisible = true
            }
          })
          .catch(err => {
            // this.hideLoading(loading)
            console.log('呼叫失败2:', err)
            // this.error_msg = '请您稍后再拨!' + JSON.stringify(err)
            that.error_msg = '请您稍后再拨!' + JSON.stringify(err)
            if (t === null || t === '') {
              that.centerDialogVisible = true
            }
            // this.$toast('error:' + err)
            // alert('error:' + JSON.stringify(err))
          })
          .finally(() => {
            that.hideLoading(loading)
          })
      } catch (e) {
        console.log('全局异常:', e)
        that.hideLoading(loading)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    },
    getLocation: function () {
      var that = this
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: async function (res) {
            var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
            let {data} = await api.getLocationDesc(latitude, longitude)
            var address = data.result.formatted_addresses.recommend
            // that.$toast('地理位置:' + address)
            // var result = await api.sendMsgNotification(that.phone_number, address)
            // resolve(result)
            that.address = address
            resolve(address)
          },
          fail: function (error) {
            // this.$toast('获取地理位置错误：' + error)
            console.log('获取地理位置错误：' + JSON.stringify(error))
            resolve(error)
          },
          cancel: function (res) {
            that.$toast('用户取消授权!')
            console.log('用户取消授权!' + res)
            resolve(res) // 取消授权，但是是正常返回
          }
        })
      })
    },
    dialogConfirm: function () {
      this.centerDialogVisible = false
      window.location.reload()
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
      // this.reload()
    }
  }
}
</script>

<style scoped>
.info-container{
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .call-img{
    width: 10rem;
    height: 10rem;
    margin-top: 3.5rem;
  }
  .call-text{
    font-family: PingFangSC-Medium;
    font-size: 2.3rem;
    color: #48534A;
    letter-spacing: 0;
    text-align: center;
    font-weight: bold;
  }
  /*dialog style*/
  .center-dialog-content{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.9rem;
  }
  .dialog-btn-group{
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
    align-items: center;
    border-top: 0.05rem inset #E5E5E5;

  }
  .confirm-btn{
    font-size: 1.8rem;
    width: 100%;
    font-family: PingFangSC-Regular;
    color: #02BB00;
    text-align: center;
  }
  /deep/ .el-dialog__footer{
    padding: 0;
  }
  .dialog-info{
    width: 100%;
    font-size: 1.6rem;
    letter-spacing: 1px;
    font-family: "PingFang SC";
    color: black;
    word-break: break-all;
    text-align: center;
  }
  .dialog-btn{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  .verify-btn{
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 1rem;
    background-color: #02BB00;
    color: white;
    border-style: none;
  }
</style>
