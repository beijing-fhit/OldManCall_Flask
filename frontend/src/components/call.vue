<template>
    <div class="info-container">
      <old-man-info :info="this.info"/>
      <el-image :src="call_img" class="call-img" @click="startCall"></el-image>
      <span class="call-text">呼叫家属</span>
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
      phone_number: []
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
    api.wxConfig().then(config => {
      console.log('config', config.data)
      wx.config({
        debug: false,
        appId: config.data.appId,
        timestamp: config.data.timestamp,
        nonceStr: config.data.nonceStr,
        signature: config.data.signature,
        jsApiList: ['getLocation']
      })
    })
  },
  created: function () {
    var that = this
    api.getInfo(sessionStorage.getItem('qrCodeId'))
      .then(res => {
        console.log('获取信息成功', res)
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
  methods: {
    startCall: function () {
      // 获取地理位置发送通知
      this.getLocation()
      // api.weChatCalling(sessionStorage.getItem('openId'), this.phone_number, sessionStorage.getItem('qrCodeId'))
      //   .then(res => {
      //     console.log('呼叫成功:', res)
      //     if (res.data.Code === 0 && res.data.Caller !== '') {
      //       window.location.href = 'tel://' + res.data.Caller
      //     } else {
      //       this.$toast('呼叫失败!')
      //     }
      //   })
      //   .catch(err => {
      //     console.log('呼叫失败:', err)
      //   })
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
          this.$toast('被叫号码:', that.phone_number)
          api.sendMsgNotification(that.phone_number, address)
            .then((res) => {
              console.log('发送成功,', res)
            }).catch((err) => {
              console.log('发送短信失败,', err)
            })
        }
      })
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
</style>
