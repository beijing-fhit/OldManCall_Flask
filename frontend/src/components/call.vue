<template>
    <div class="info-container">
      <old-man-info :info="this.info"/>
      <el-image :src="call_img" class="call-img" @click="startCall"></el-image>
      <span class="call-text">呼叫家属</span>
      <el-dialog
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
    </div>
</template>

<script>
import OldManInfo from './oldManInfo'
import api from '../api'
import wx from 'weixin-js-sdk'
export default {
  name: 'call',
  components: {OldManInfo},
  data () {
    return {
      call_img: require('../assets/call.png'),
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
      error_msg: ''
    }
  },
  mounted () {
    console.log('created---')
    wx.ready(function () {
      console.log('ready-----')
    })
    wx.error(function (res) {
      console.log('error-----')
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
        }
      })
      .catch(err => {
        console.log('获取信息失败', err)
      })
  },
  created: function () {
  },
  methods: {
    startCall: function () {
      // 显示loading
      const loading = this.showLoading('正在发送呼叫请求...')
      try {
        // var that = this
        var qrcodeid = sessionStorage.getItem('qrCodeId')
        var temp = qrcodeid.split('?') // xxx?qrcodeid=xxx?qrcodeid=xxx
        var p = temp[temp.length - 1]
        if (p.indexOf('=') !== -1) {
          qrcodeid = p.split('=')[1]
        } else {
          qrcodeid = p
        }
        api.weChatCalling(sessionStorage.getItem('openId'), this.phone_number, qrcodeid)
          .then(res => {
            console.log('呼叫成功:', res)
            if (res.data.Code === 0 && res.data.Caller !== '') {
              window.location.href = 'tel://' + res.data.Caller
              // 获取地理位置发送通知
              this.getLocation()
            } else {
              // this.$toast('呼叫失败!')
              this.error_msg = '请您稍后再拨!'
              this.centerDialogVisible = true
            }
          })
          .catch(err => {
            console.log('呼叫失败:', err)
            this.error_msg = err + '\n请您稍后再拨!'
            this.centerDialogVisible = true
          })
          .finally(() => {
            this.hideLoading(loading)
          })
      } catch (e) {
        this.hideLoading(loading)
      }
    },
    getLocation: function () {
      var that = this
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: async function (res) {
          var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          let {data} = await api.getLocationDesc(latitude, longitude)
          var address = data.result.address
          // that.$toast('被叫号码:' + that.phone_number)
          api.sendMsgNotification(that.phone_number, address)
            .then((res) => {
              console.log('发送成功,', res)
            }).catch((err) => {
              console.log('发送短信失败,', err)
            })
        }
      })
    },
    dialogConfirm: function () {
      this.centerDialogVisible = false
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
    margin-top: 5rem;
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
    font-size: 1.6rem;
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
</style>
