<template>
  <div>
    <div >
      <Topbar class="topbar" :show-save-btn="true" @saveInfo="saveInfo"/>
      <el-row class="alert-row margin-horizontal">注意保存信息!</el-row>
    </div>
    <div class="item-title">
      <span class="title-text">联系人号码绑定/修改</span>
      <!--<i class="el-icon-arrow-right big-font-size"/>-->
    </div>
    <!--联系人信息-->
    <!--<div class="contact-panel" v-for="(item,index) in contact" v-bind:key="index">-->
    <div class="contact-panel">
      <el-row class="contact-item border-bottom">
        <span class="contact-name">联系人1</span>
        <span class="contact-number" @click="modifyContact(0)">{{contact[0]=== undefined||contact[0]=== "undefined"||contact[0]=== null||contact[0]=== ""?text1:contact[0]}}</span>
        <span class="delete-img"/>
      </el-row>
      <el-row class="contact-item border-bottom">
        <span class="contact-name">联系人2</span>
        <span class="contact-number" @click="modifyContact(1)">{{contact[1]=== undefined||contact[1]=== "undefined"||contact[1]=== null||contact[1]=== ""?text1:contact[1]}}</span>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="el-icon-info"
          iconColor="red"
          @onConfirm="deleteContact(1)"
          title="删除该联系人吗？">
          <i slot="reference" class="el-icon-delete delete-img" v-show="showContact2Delete" />
        </el-popconfirm>
      </el-row>
      <el-row class="contact-item">
        <span class="contact-name">联系人3</span>
        <span class="contact-number" @click="modifyContact(2)">{{contact[2]=== undefined||contact[2]=== "undefined"||contact[2]=== null||contact[2]=== ""?text1:contact[2]}}</span>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="el-icon-info"
          iconColor="red"
          @onConfirm="deleteContact(2)"
          title="删除该联系人吗？">
          <i slot="reference" class="el-icon-delete delete-img" v-show="showContact3Delete" />
        </el-popconfirm>
      </el-row>
    </div>
    <!--</div>-->
    <!--填写老人信息-->
    <div class="item-title border-bottom">
      <span class="title-text">信息填写</span>
     </div>
    <div class="info-fill-panel leftpadding">
      <el-row class="info-item border-bottom ">
        <span class="info-name">姓名*</span>
        <el-input v-model="manInfo.name" class="info-content normal-input-style no-border-input" placeholder="预设内容(必填)" clearable></el-input>
      </el-row>
      <el-row class="info-item border-bottom ">
        <span class="info-name">地址</span>
        <el-input v-model="manInfo.address" class="info-content normal-input-style no-border-input" placeholder="预设内容" clearable></el-input>
      </el-row>
    </div>
      <el-row class="info-item border-bottom leftpadding white-bg">
        <span class="info-name">出生年份</span>
        <el-date-picker  type="year" v-model="manInfo.age"  value-format="yyyy"  class="info-content normal-input-style no-border-input" placeholder="请选择年份" ></el-date-picker>
      </el-row>
    <div class="info-fill-panel leftpadding">
      <el-row  class="info-item-height-wrap-content border-bottom">
        <span class="info-name">病史</span>
        <el-select v-model="manInfo.medical_history"   allow-create filterable multiple  class="info-content normal-input-style no-border-input" placeholder="预设内容" >
          <el-option
            v-for="d in diseases"
            :key="d"
            :label="d"
            :value="d"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row class="info-item border-bottom">
        <span class="info-name">过敏史</span>
        <el-input v-model="manInfo.allergy" class="info-content normal-input-style no-border-input" placeholder="预设内容" clearable></el-input>
      </el-row>
    </div>

      <el-row class="info-item border-bottom leftpadding white-bg">
        <span class="info-name">血型</span>
        <el-select v-model="manInfo.blood_type" class="info-content normal-input-style no-border-input" placeholder="请选择血型" clearable>
          <el-option
            v-for="b in blood_select"
            :key="b"
            :label="b"
            :value="b"
          >
          </el-option>
        </el-select>
      </el-row>
    <div class="info-fill-panel leftpadding ">
      <el-row class="info-item border-bottom">
        <span class="long-info-name">正在吃的药</span>
        <el-input v-model="manInfo.drugs" maxlength=8 class="long-info-content normal-input-style no-border-input" placeholder="预设内容" clearable></el-input>
      </el-row>
      <el-row class="info-item">
        <span class="long-info-name">正在进行的治疗</span>
        <el-input v-model="manInfo.treatment" maxlength=8 class="long-info-content normal-input-style no-border-input" placeholder="预设内容" clearable></el-input>
      </el-row>
    </div>
    <el-button type="success" class="wide-button" @click="saveInfo">保存</el-button>
    <el-dialog
      :lock-scroll="false"
      :visible.sync="centerDialogVisible"
      title="操作成功"
      width="80%"
      :show-close="false"
      center>
      <span class="center-dialog-content">你的信息已经保存!</span>
      <span slot="footer" class="dialog-footer dialog-btn-group">
        <span type="primary" @click="dialogConfirm" class="confirm-btn">确定</span>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Topbar from './topbar'
import api from '../api'
export default {
  inject: ['reload'],
  name: 'settings',
  components: {Topbar},
  data () {
    return {
      diseases: ['无', '高血压', '高血脂', '冠心病', '脑中风', '支气管哮喘', '慢性支气管炎', '老年痴呆', '其他'],
      blood_select: ['A', 'B', 'AB', 'O'],
      manInfo: this.getManInfo(),
      text1: '请输入手机号码',
      text2: '请输入手机号码',
      showContact2Delete: false,
      showContact3Delete: false,
      contact: this.getContact(),
      centerDialogVisible: false,
      isModified: false
    }
  },
  created () {
    document.title = this.$route.meta.title
  },
  mounted: function () {
    // 这部分代码是为了解决在ios上页面返回时不刷新的问题--start
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isiOS) {
      window.onpageshow = function (e) {
        if (
          e.persisted ||
          (window.performance && window.performance.navigation.type === 2)
        ) {
          window.location.reload()
        }
      }
    }
    // 这部分代码是为了解决在ios上页面返回时不刷新的问题--end
    var that = this
    // 如果从addContact页面跳转过来的，则不使用网络上获取到的号码,加载本地缓存
    // console.log('数据1：', JSON.parse(this.$route.query.getPhoneNumberFromNet))
    var getPhoneNumberFromNet = true
    var temp = this.$route.query.getPhoneNumberFromNet
    if (temp !== null && temp !== undefined && temp !== '' && temp !== 'undefined') {
      getPhoneNumberFromNet = JSON.parse(temp)
    }
    // this.$toast('加载本地:' + getPhoneNumberFromNet)
    if (getPhoneNumberFromNet === false) {
      try {
        this.manInfo = this.getManInfo()
        this.contact = this.getContact()
        return
      } catch (e) {
        console.log('获取s异常:', e)
        return
      }
    }
    // this.$toast('获取sessionStorage中的数据2:' + this.manInfo)
    // 获取有无数据
    api.getInfo(sessionStorage.getItem('qrCodeId')).then(res => {
      //  获取数据
      // console.log('settings 获取info:', res)
      if (res.data.status_code === 0) {
        var data = res.data.data
        that.manInfo.name = data.old_man_info.name
        that.manInfo.age = data.old_man_info.age.toString()
        that.manInfo.address = data.old_man_info.address
        if (data.old_man_info.medical_history.trim() === '') {
          that.manInfo.medical_history = []
        } else {
          that.manInfo.medical_history = data.old_man_info.medical_history.split(',') // 将字符串转为数组
        }
        that.manInfo.allergy = data.old_man_info.allergy
        that.manInfo.blood_type = data.old_man_info.blood_type
        that.manInfo.drugs = data.old_man_info.drugs
        that.manInfo.treatment = data.old_man_info.treatment
        // this.contact = data.phone_number
        sessionStorage.setItem('manInfo', JSON.stringify(that.manInfo))
        sessionStorage.setItem('contact', that.generatePhoneStr(data.phone_number))
        // sessionStorage.setItem('contact', data.phone_number)
        // console.log('generateStr:', data.phone_number)
        that.contact = that.getContact()
      }
    })
  },
  methods: {
    routeToCallUpdatePage: function () {
      this.$router.push('/updateNumber')
    },
    generatePhoneStr: function (phoneNumbers) {
      var str = ''
      for (var i = 0; i < phoneNumbers.length; i++) {
        var p = phoneNumbers[i]
        str += p + ','
      }
      str = str.substr(0, str.length - 1)
      return str
    },
    getleagalContact: function (contact) {
      var c = []
      var count = 0
      var temp = contact
      for (var i = 0; i < temp.length; i++) {
        if (temp[i] !== null && temp[i] !== '' && temp[i] !== undefined && temp[i] !== 'undefined') {
          c[count] = temp[i]
          count++
        }
      }
      return c
    },
    getManInfo: function () {
      var oldManInfo3 = {
        name: '',
        address: '',
        age: '',
        medical_history: '',
        allergy: '',
        blood_type: '',
        drugs: '',
        treatment: ''
      }
      var temp3 = sessionStorage.getItem('manInfo')
      if (temp3 !== null && temp3 !== undefined && temp3 !== '' && temp3 !== 'undefined') {
        var t3 = JSON.parse(temp3)
        oldManInfo3.name = t3.name
        oldManInfo3.age = t3.age.toString()
        oldManInfo3.address = t3.address
        if (!t3.medical_history instanceof Array) { // 如果不是列表对象
          if (t3.medical_history.trim() === '') {
            oldManInfo3.medical_history = []
          } else {
            oldManInfo3.medical_history = t3.medical_history.split(',')
          }
        } else {
          oldManInfo3.medical_history = t3.medical_history
        }
        oldManInfo3.allergy = t3.allergy
        oldManInfo3.blood_type = t3.blood_type
        oldManInfo3.drugs = t3.drugs
        oldManInfo3.treatment = t3.treatment
      }
      // this.$toast('当前数据:' + oldManInfo3)
      return oldManInfo3
    },
    getContact: function () {
      if (sessionStorage.getItem('contact') !== null) {
        var contact = sessionStorage.getItem('contact').split(',')
        var count = 0
        for (var i in contact) {
          var value = contact[i]
          console.log(value)
          if (value !== '' && value !== undefined && value !== null && value !== 'undefined') {
            count++
          }
        }
        console.log('contact length:', count)
        switch (count) {
          case 1:
            // this.text1 = '请输入手机号码'
            // this.text2 = '请输入手机号码'
            this.showContact2Delete = false
            this.showContact3Delete = false
            break
          case 2:
            this.showContact2Delete = true
            this.showContact3Delete = false
            // this.text2 = '请输入手机号码'
            // this.text1 = contact[1]
            break
          case 3:
            this.showContact2Delete = true
            this.showContact3Delete = true
            // this.text1 = contact[1]
            // this.text2 = contact[2]
            break
          default:
            this.showContact2Delete = false
            this.showContact3Delete = false
        }
        console.log('contact length2:', count)
        console.log('showContactNDelete:', this.showContact2Delete, this.showContact3Delete)
        // console.log('contact:', contact)
        return contact
      }
      return []
    },
    modifyContact: function (index) {
      if (index === 0) {
        // 第一个号码不能修改
        return
      }
      if (index === 2) {
        if (this.contact[1] === '' || this.contact[1] === undefined) {
          this.$toast('请先绑定第二个联系人！')
          return
        }
      }
      // this.$toast('正在保存OldManinfo:' + JSON.stringify(this.manInfo))
      sessionStorage.setItem('manInfo', JSON.stringify(this.manInfo))
      // var mode = 0 // 0代表修改，1代表新增
      this.$router.push({
        path: '/addContact',
        query: {
          modifyNumber: this.contact[index],
          index: index,
          mode: this.contact[index] === '' ? 1 : 0
        }
      })
    },
    deleteContact: function (index) {
      this.contact[index] = ''
      sessionStorage.setItem('contact', this.generatePhoneStr(this.contact))
      this.contact = this.getContact()
      this.reload()
    },
    saveInfo: function () {
      // this.$router.push('/call')
      // 保存老人信息
      // 判空
      if (this.manInfo.name.length === 0) {
        this.$toast('姓名不能为空!')
        window.location.reload()
        return
      }
      // qrCodeId, oldManInfo, phone_number
      var qrCodeId = sessionStorage.getItem('qrCodeId')
      var info = this.manInfo
      info.age = parseInt(info.age)
      info.medical_history = info.medical_history.toString() // 将数组转为字符串
      var phoneNumber = this.getleagalContact(this.contact)
      sessionStorage.setItem('manInfo', JSON.stringify(info))
      // console.log('合法的contact:', phoneNumber)
      // 调用后端接口，保存老人信息到数据库
      // this.$toast(info)
      // this.$toast(phoneNumber)

      api.saveInfo(qrCodeId, info, phoneNumber).then(res => {
        // 保存信息成功
        // console.log('保存信息成功:', res)
        if (res.data.status_code === 0) {
          // console.log('二维码激活状态:', sessionStorage.getItem('isQrCodeActive'))
          if (sessionStorage.getItem('isQrCodeActive') === 0 || sessionStorage.getItem('isQrCodeActive') === '0') { // 未激活
            // 激活二维码
            api.activateQrCode(sessionStorage.getItem('openId'), qrCodeId, sessionStorage.getItem('UcallFreeId'))
              .then(res => {
                if (res.data.Code === 0) {
                  this.$toast('激活二维码成功')
                  this.centerDialogVisible = true
                  // this.$router.push('/call')
                  console.log('激活二维码成功:', res)
                } else {
                  this.$toast('激活二维码失败')
                  window.location.reload()
                  console.log('激活二维码失败1:', res)
                }
              })
              .catch(err => {
                this.$toast('激活二维码失败')
                window.location.reload()
                console.log('激活二维码失败2:', err)
              })
          } else {
            this.$toast('保存信息成功')
            console.log('保存信息成功:')
            this.centerDialogVisible = true
            // this.$router.push('/call')
          }
          // this.$alert('保存信息成功')
        } else {
          this.$toast('保存信息失败')
          console.log('保存信息失败1:')
          window.location.reload()
          // this.centerDialogVisible = false
        }
      }).catch(err => {
        // 保存信息失败
        console.log('保存信息失败2:', err)
        this.$toast('保存信息失败!')
        window.location.reload()
        this.centerDialogVisible = false
      })
    },
    dialogConfirm: function () {
      // 回到顶部并刷新页面
      this.centerDialogVisible = false
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      // 先让页面回到顶部，再刷新页面
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
}
</script>

<style scoped>
  .topbar {
    background: #FFFFFF !important;
  }
  .alert-row {
    background-color: #FFEB99;
    color: #B21D2C;
    font-size: 1.8rem;
    font-family: "PingFang SC";
    padding: 0.5rem 0;
    text-align: start;
    letter-spacing: 0.3rem;
  }
  .item-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
    width: 100%;
    background-color: #FAFAFA;
  }
  .margin-horizontal{
    padding-left: 3vw;
    padding-right: 3vw;
  }

  .title-text {
    font-family: PingFangSC-Medium;
    font-size: 2rem;
    color: #48534A;
    letter-spacing: 0;
    font-weight: bold;
    text-align: center;
    margin-left: 3vw;
  }

  .big-font-size {
    font-size: 2.2rem;
    margin-right: 3vw;
  }
  .contact-panel{
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 3vw;
  }

  .contact-item {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

  }

  .delete-img {
    font-size: 2.5rem;
    color: red;
    /*margin-left: 2vw;*/
    margin-right: 3vw;
  }
  .border-bottom {
    border-bottom: 0.01rem inset #E5E5E5;
  }

  .contact-name {
    width: 30%;
    font-size: 2rem;
    font-family: PingFangSC-Regular;
    color: #48534A;
    letter-spacing: 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }

  .contact-number {
    width: 60%;
    font-size: 2rem;
    font-family: PingFangSC-Regular;
    color: #B2B2B2;
    letter-spacing: 0;
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  /*填写老人信息的区域*/
  .info-fill-panel{
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    /*padding-left: 3vw;*/
  }

  .leftpadding{
    padding-left: 3vw;
  }
  .info-item{
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .info-item-height-wrap-content{
    width: 100%;
    height: fit-content;
    min-height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 0.1rem;
  }
  .full-width-info-item{
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 3vw;
  }
  .info-name{
     width: 30%;
    font-size: 2rem;
    font-family: PingFangSC-Regular;
    color: #48534A;
    letter-spacing: 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .info-content{
     width: 70%;
    font-size: 2rem;
    font-family: PingFangSC-Regular;
    color: #B2B2B2;
    letter-spacing: 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .long-info-name{
     width: 45%;
    font-size: 2rem;
    font-family: PingFangSC-Regular;
    color: #48534A;
    letter-spacing: 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .long-info-content{
     width: 55%;
    font-size: 2rem;
    font-family: PingFangSC-Regular;
    color: #B2B2B2;
    letter-spacing: 0;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  /*input 样式*/
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
    /*padding: 0;*/
    font-size: 2rem;
  }
  .wide-button {
    width: 80%;
    margin-top: 10rem;
    margin-bottom: 10rem;
    letter-spacing: 0.5rem;
    font-size: 2rem;
    background-color: #1AAD19;
}
  .white-bg{
    background-color: #FFFFFF;
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
    border-top: 0.02px inset #E5E5E5;

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

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
</style>
