<template>
  <div class="all-container">
    <el-image class="logo-text" :src="require('../assets/apply_text.png')"></el-image>
    <span class="content">
      “爱心卡”为老人、小孩或其他需要特殊帮助的人士，完美地提供了遇险时通知家人的手段。他们只需佩戴爱心卡，当遇到紧急情况时，救助者或路人可通过扫码，在第一时间呼叫事先设定的多个紧急联系人，同时悦呼系统可将其当前位置以短信形式发送至联系人手机。“时间、地点、人物”三大要素无一缺失。
    </span>
    <el-button class="btn" @click="applyCard">没有卡，现在申请</el-button>
    <el-button class="btn" @click="toScan">已有卡，扫码</el-button>
  </div>
</template>

<script>
export default {
  name: 'ApplyCard',
  methods: {
    applyCard: function () {
      this.$router.push('/registerApplyInfo')
    },
    toScan: function () {
      this.$router.push('/scan')
    }
  }
}
</script>

<style scoped>
.all-container{
    width: 100%;
    height: 100%;
    background: url("../assets/bg_apply.png") no-repeat;
    background-size: 100% 100%;
     display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
    position: relative;
  }
.logo-text{
  width: 70%;
  height: 6rem;
  margin-top: 10rem;
}
.content{
  width: 70%;
  font-family: MicrosoftYaHei;
  font-size: 1.5rem;
  color: #FFFFFF;
  letter-spacing: 2px;
  line-height: 2rem;
  text-align: left;
  margin-top: 2rem;
}
.btn{
  width: 80%;
  background: #1AAD19;
  border-radius: 5px;
  border-radius: 5px;
  border-style: none;
  font-weight: bold;
  /*font*/
  font-family: PingFangSC-Medium;
  font-size: 1.8rem;
  color: #FFFFFF;
  text-align: center;
  /*margin*/
  margin-top: 3rem;
  margin-left: 0;
}
</style>
