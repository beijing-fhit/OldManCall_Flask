<template>
  <div class="all-container">
    <topbar/>
    <el-row class="add-tip">
      <i class="linear-line margin-horizontal"/>
      <span class="tip-text">您最多可以绑定3位联系人</span>
    </el-row>
    <!--绑定联系人区域-->
    <div class="contact-panel">
      <el-row class="first-item">
        <i class="el-icon-star-on red-star margin-horizontal"></i>
        <span class="title-name">联系人{{parseInt(this.index)+1}}</span>
        <span class="title-tip">(必填)</span>
      </el-row>
      <el-row class="first-input-container bottom-border">
        <el-input type="number" v-model="number" class="normal-input-style no-border-input" placeholder="请输入手机号码"
                  clearable></el-input>
      </el-row>
      <el-row class="second-input-container">
        <el-input type="number" v-model="verifyNumber" class="normal-input-style no-border-input sixty-percent"
                  placeholder="请输入验证码"></el-input>
        <span class="fourty-percent verify-code-text-btn" @click="getVerifyCode">{{this.verifyBtnContent}}</span>
      </el-row>
    </div>
    <el-button type="success" class="wide-button" @click="verify">下一步</el-button>
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="绑定成功"
      width="80%"
      :show-close="false"
      center>
      <span class="center-dialog-content">还需要再添加一位联系人么？</span>
      <span slot="footer" class="dialog-footer dialog-btn-group">
        <span @click="dialogSkip" class="skip-btn">跳过</span>
        <span type="primary" @click="dialogAddMore" class="add-another-btn">添加下一位</span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Topbar from './topbar'
import api from '../api'
export default {
  name: 'addContact',
  components: {Topbar},
  data () {
    return {
      number: '',
      verifyNumber: '',
      verifyBtnContent: '获取验证码',
      isVerifyBtnClickable: true,
      centerDialogVisible: false,
      isClearInterval: false,
      contact: sessionStorage.getItem('contact') === null ? '' : sessionStorage.getItem('contact'),
      modifyIndex: 1,
      index: this.$route.query.index ? this.$route.query.index : 0
    }
  },
  created () {
    document.title = this.$route.meta.title
  },
  mounted: function () {
    // 在这里获取settings返回过来的数据
    var number = this.$route.query.modifyNumber
    console.log('在addContact页面获取到的参数是:', number)
    console.log('在addContact页面获取到的参数contact是:', this.contact)
    if (number === null | number === '' | number === undefined) {
      console.log('在addContact页面获取到的参数contact2是:', number)
      return
    }
    // this.$toast('数据：' + number)
    // 判断字符串是否为数字，是则显示电话号码，不是则不管
    if (number.toString().match('[0-9]{1,}')) {
      this.number = number
    } else {
      this.number = ''
    }
  },
  methods: {
    getVerifyCode: function () {
      this.isClearInterval = false // 重置interval
      if (this.number.length === 0) {
        this.$toast('号码不能为空！')
        return
      }
      if (!this.isVerifyBtnClickable) {
        this.$toast('您点的太快了，请稍等！')
        return
      }
      if (this.contact.split(',').indexOf(this.number, 0) !== -1) {
        this.$toast('您已添加此号码!')
        return
      }
      var that = this
      api.getVerifyCode(sessionStorage.getItem('openId'), this.number).then(res => {
        console.log('获取号码', res)
        if (res.data.Code !== 0) {
          if (res.data.Code === -3) {
            that.$toast('验证码请求太频繁！')
          } else if (res.data.Code === -6) {
            that.$toast('号码格式不正确！')
          }
          return
        }
        // 设置倒计时
        that.$toast('短信已发送')
        that.countDown()
        // console.log('获取验证码成功:', res)
      }).catch(err => {
        console.log('获取验证码失败:', err)
        that.$toast('获取验证码失败!')
      })
    },
    verify: function () {
      var that = this
      if (this.number.length === 0) {
        this.$toast('号码不能为空！')
        return
      }
      if (this.verifyNumber.length === 0) {
        this.$toast('验证码不能为空！')
        return
      }
      const loading = this.showLoading('验证中...')
      api.verifyNumber(sessionStorage.getItem('openId'), this.number, this.verifyNumber)
        .then(res => {
          console.log('验证成功:', res)
          if (res.data.Code === 0) {
            // that.$toast('验证成功')
            if (that.contact.indexOf(that.number, 0) === -1) {
              // 第一次添加此号码
              var index = that.$route.query.index
              if (index === null | index === '' | index === undefined) {
                that.contact += that.number + ','
                sessionStorage.setItem('contact', that.contact)
                that.$router.push({
                  path: '/settings',
                  query: {
                    getPhoneNumberFromNet: false
                  }
                })
              } else {
                // 从settings页面跳转而来
                var temp = that.contact.split(',')
                var t = ''
                if (parseInt(index) === 0) {
                  t = that.number + ',' + temp[1] + ',' + temp[2]
                } else if (parseInt(index) === 1) {
                  t = temp[0] + ',' + that.number + ',' + temp[2]
                } else if (parseInt(index) === 2) {
                  t = temp[0] + ',' + temp[1] + ',' + that.number
                }
                // this.$toast('t:' + t)
                console.log('t', t)
                that.contact = t
                sessionStorage.setItem('contact', that.contact)
                // that.$alert('获取sessionStorage中电话号码的数据:' + that.contact)
                // 从settings页面过来的保存数据之后，直接返回到settings页面中即可
                that.$router.push({
                  path: '/settings',
                  query: {
                    getPhoneNumberFromNet: false
                  }
                })
              }
            } else {
              that.$router.push({
                path: '/settings',
                query: {
                  getPhoneNumberFromNet: false
                }
              })
            }
          } else {
            // console.log('验证失败:', res.data)
            that.$toast('验证失败')
            that.centerDialogVisible = false
          }
        })
        .catch(() => {
          that.$toast('验证失败')
          // console.log('验证失败:', err)
          that.centerDialogVisible = false
        })
        .finally(() => {
          loading.close()
        })
    },
    countDown: function () {
      var that = this
      that.isVerifyBtnClickable = false
      var count = 60
      var cd = setInterval(function () {
        that.verifyBtnContent = count + 's后重新发送'
        count--
        // console.log('倒计时:', count)
        if (count <= 0 || that.isClearInterval) {
          window.clearInterval(cd)
          that.isVerifyBtnClickable = true
          that.verifyBtnContent = '获取验证码'
        }
      }, 1000)
    },
    dialogSkip: function () {
      // this.centerDialogVisible = false
      // 去掉最后一个逗号
      this.contact = this.contact.substr(0, this.contact.length - 1)
      sessionStorage.setItem('contact', this.contact)
      console.log('跳过')
      this.$router.push({
        path: '/settings',
        query: {
          getPhoneNumberFromNet: false
        }
      })
    },
    dialogAddMore: function () {
      console.log('添加下一位')
      this.centerDialogVisible = false
      this.isClearInterval = true // 重置interval
      this.number = ''
      this.verifyNumber = ''
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
    width: 100%;
    height: fit-content;
  }
  .add-tip {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 6rem;
    width: fit-content;
  }
  .linear-line {
    width: 0.3rem;
    height: 50%;
    background-color: #1AAD19;
    border-radius: 0.2rem;
  }
  .margin-horizontal{
    margin-left: 3vw;
    margin-right: 3vw;
  }
  .tip-text{
    font-family: PingFangSC-Regular;
    font-size: 1.9rem;
    color: #666666;
    letter-spacing: 0;
  }
  .contact-panel{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color:#FFFFFF ;
    width: 100%;
    height: fit-content;
  }
  .first-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 5rem;
  }
  .red-star{
    color: red;
    font-size: 1.5rem;
  }
  .title-name{
    font-family: PingFangSC-Regular;
    font-size: 2rem;
    color: #48534A;
    letter-spacing: 0;
  }
  .title-tip{
    font-family: PingFangSC-Regular;
    font-size: 2rem;
    color: #B2B2B2;
    letter-spacing: 0;
  }
  .normal-input-style{
    font-family: PingFangSC-Regular;
    font-size: 2rem;
    color: #B2B2B2;
    letter-spacing: 0;
  }
  /deep/ .no-border-input .el-input__inner{
    border: 0 none;
    color: #48534A;
    max-lines: 1;
    padding: 0;
    font-size: 2rem;
  }
  .first-input-container{
    width: fit-content;
    margin-left: 3vw;
    padding-right: 4vw;
    height: 5rem;
    width: 97%;
  }
  .bottom-border{
    border-bottom: 0.05rem inset #E5E5E5;
  }
  /deep/ .no-background-color{
    background-color: white;
  }
  .second-input-container{
    width: 100%;
    margin-left: 3vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 5rem;
  }
  .sixty-percent{
    width: 60%;
  }
  .fourty-percent{
    width: 40%;
  }
  .verify-code-text-btn{
    font-size: 1.8rem;
    font-family: PingFangSC-Regular;
    color: #1AAD19;
    letter-spacing: 0;
  }
  .wide-button {
    width: 80%;
    margin-top: 20rem;
    margin-bottom: 10rem;
    letter-spacing: 0.5rem;
    font-size: 2rem;
    background-color: #1AAD19;
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
  .skip-btn{
    font-size: 1.8rem;
    color: #000;
    width: 50%;
    border-right: 0.1rem inset #E5E5E5;
    font-family: PingFangSC-Regular;
    text-align: center;
  }
  .add-another-btn{
    font-size: 1.8rem;
    width: 50%;
    font-family: PingFangSC-Regular;
    color: #02BB00;
    text-align: center;
  }
  /deep/ .el-dialog__footer{
    padding: 0;
  }
</style>
