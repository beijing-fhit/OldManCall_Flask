<template>
  <div class="all-container">
      <span class="addr-text">收货地址</span>
    <el-row>
      <span>国家/地区</span>
      <span class="nation">中国</span>
    </el-row>
    <el-row>
      <span>+86</span>
      <el-input type="number" :maxlength="11" v-model="phoneNumber" class="left-border" placeholder="请填写手机号码"></el-input>
    </el-row>
    <el-row>
      <span>地址</span>
      <el-input v-model="address" placeholder="请填收货地址"></el-input>
    </el-row>
    <el-row>
      <span>邮编</span>
      <el-input v-model="postCode" placeholder="请填写邮编"></el-input>
    </el-row>
    <el-row>
      <span>姓名</span>
      <el-input v-model="name" placeholder="收货人姓名"></el-input>
    </el-row>
    <div class="contact-us">
      <span class="p1">联系我们</span>
      <i class="el-icon-arrow-right arrow"></i>
      <span class="p2">若有商业合作需要请联系我们</span>
    </div>
    <el-button class="btn" @click.stop="submitInfo">确定</el-button>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'RegisterApplyInfo',
  data () {
    return {
      phoneNumber: '',
      address: '',
      name: '',
      postCode: ''
    }
  },
  methods: {
    submitInfo: function () {
      if (!this.phoneNumber || !this.address || !this.name || !this.postCode) {
        this.$toast('信息未填完整!')
        return
      }
      let ucallFreeId = sessionStorage.getItem('UcallFreeId')
      api.applyCard(ucallFreeId, this.phoneNumber, this.address, this.name, this.postCode)
        .then(({data: {statusCode, message}}) => {
          if (statusCode === 0) {
            this.$toast(message)
            this.$router.back()
          }
        }).catch(err => {
          console.log('err:', err)
          this.$toast('申请失败!')
        })
    }
  }
}
</script>

<style scoped>
.all-container{
    width: 100%;
    height: 100%;
    background: #efeff4;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    position: relative;
    box-sizing: border-box;
  }
  /deep/  .el-input__inner{
   border: 0 none;
    height: 4.8rem;
    color: #48534A;
    max-lines: 1;
    /*padding: 0;*/
    font-size: 1.6rem;
  }
  div[class^=el-row] {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    background-color: white;
    /*padding-left: 1rem;*/
    border-bottom: 1px solid #ededed;
    padding: 0.5rem 1rem;
  }
  .addr-text {
    width: 100%;
    line-height: 4rem;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #c5c5c5;
    letter-spacing: 1px;
    padding-left: 1rem;
    box-sizing: border-box;
  }
  .left-border{
    border-left: 1px solid #ededed;
  }
  .nation{
    line-height: 5rem;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #000000;
    letter-spacing: 1px;
    font-weight: bold;
  }
  div[class^=el-row] span:nth-child(1){
    width: 30%;
    line-height: 5rem;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #000000;
    letter-spacing: 1px;
    font-weight: bold;
  }

   div[class^=el-row] div[class^=el-input]{
     height: 5rem;
     text-align: center;
    width: 70%;
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    letter-spacing: 1px;

   }
  .contact-us{
    position: relative;
    width: 100%;
    background-color: white;
    margin-top: 2rem;
    height: 4rem;
  }
  .contact-us .p1{
    line-height: 4rem;
    position: absolute;
    left: 1rem;
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #000000;
    letter-spacing: 1px;
    font-weight: bold;
  }
  .el-icon-arrow-right:before{
    width: 20px;
    height: 20px;
  }
  .contact-us .arrow{
    line-height: 4rem;
    height: 15px;
    width: 15px;
    position: absolute;
    right: 2rem;
  }
  .contact-us .p2{
    position: absolute;
    right: 1rem;
    bottom: -2rem;
    font-family: PingFangSC-Regular;
    font-size: 1.3rem;
    color: #888888;
    text-align: left;
  }
  .btn{
  width: 80%;
  background: #1AAD19;
  border-radius: 5px;
  border-radius: 5px;
  border-style: none;
  font-weight: bold;
  /*font*/
    letter-spacing: 2px;
  font-family: PingFangSC-Medium;
  font-size: 1.8rem;
  color: #FFFFFF;
  text-align: center;
  /*margin*/
  margin-top: 10rem;
  margin-left: 0;
}

</style>
