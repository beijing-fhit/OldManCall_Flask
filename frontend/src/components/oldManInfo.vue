<template>
  <div class="info-panel">
    <div class="title">个人信息</div>
    <el-row class="info-item">
      <span class="info-key">姓名</span>
      <span class="info-value">{{this.info.name}}</span>

      <span class="info-key">出生年</span>
      <span class="info-value">{{this.info.age}}年</span>
    </el-row>
    <el-row class="info-item">
      <span class="info-key">地址</span>
      <span class="long-info-value">{{this.info.address}}</span>
      <el-popover
        placement="bottom"
        title="地址"
        width="200"
        trigger="click"
        :content="this.info.address">
        <i slot="reference"  class="el-icon-arrow-right white-icon" v-show="this.info.address.length >= 10" />
      </el-popover>
    </el-row>
    <el-row class="info-item">
      <span class="info-key">病史</span>
      <span class="long-info-value">{{this.info.medical_history}}</span>
      <el-popover
        placement="bottom"
        title="病史"
        width="200"
        trigger="click"
        :content="this.info.medical_history">
        <i slot="reference"  class="el-icon-arrow-right white-icon" v-show="this.info.medical_history.length >= 10" />
      </el-popover>
    </el-row>

    <el-row class="info-item">
      <span class="info-key">过敏史</span>
      <span class="long-info-value">{{this.info.allergy}}</span>
      <el-popover
        placement="bottom"
        title="过敏史"
        width="200"
        trigger="click"
        :content="this.info.allergy">
        <i slot="reference"  class="el-icon-arrow-right white-icon" v-show="this.info.allergy.length >= 10" />
      </el-popover>
    </el-row>

    <el-row class="info-item">
      <span class="info-key">血型</span>
      <span class="info-value">{{this.info.blood_type}}</span>
    </el-row>

    <el-row class="info-item">
      <span class="long-info-key">正在吃的药</span>
      <span class="long-info-value">{{this.info.drugs}}</span>
      <el-popover
        placement="bottom"
        title="正在吃的药"
        width="200"
        trigger="click"
        :content="this.info.drugs">
        <i slot="reference"  class="el-icon-arrow-right white-icon" v-show="this.info.drugs.length >= 10" />
      </el-popover>
    </el-row>

    <el-row class="info-item item-margin-top">
      <span class="long-info-key">正在进行的治疗</span>
      <span class="long-info-value">{{this.info.treatment}}</span>
       <el-popover
        placement="bottom"
        title="正在进行的治疗"
        width="200"
        trigger="click"
        :content="this.info.treatment">
        <i slot="reference"  class="el-icon-arrow-right white-icon" v-show="this.info.treatment.length >= 10" />
      </el-popover>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'oldManInfo',
  data () {
    return {
      backgroundImage: require('../assets/card_bg.png')
    }
  },
  props: {
    info: {
      default: {
        name: '预设内容',
        age: '预设内容',
        address: '预设内容',
        medical_history: '预设内容',
        allergy: '预设内容',
        blood_type: '预设内容',
        drugs: '预设内容',
        treatment: '预设内容'
      }
    }
  }
}
</script>

<style scoped>
.info-panel{
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width:90%;
  height: fit-content;
  background-image: linear-gradient(218deg, #B3DE76 0%, #6DC67E 100%);
  box-shadow: 8px 1px 26px 0 rgba(123,171,144,0.32);
  border-radius: 8px;
  border-radius: 8px;
}
 .info-panel .title{
   width: 75%;
   font-size: 2rem;
   color: #48534A;
   font-family: "PingFang SC";
   padding: 1rem 10% ;
   border-bottom: 0.01rem inset white;
 }
 .info-panel .info-item{
    width: 100%;
   height: 4.5rem;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
  }

 .item-margin-top{
   margin-top: 3rem;
 }

  .info-key{
    color: #48534A;
    font-size: 1.8rem;
    font-family: PingFangSC-Regular;
    width: 20%;
    text-align: left;
    margin-left: 5%;
  }
  .info-value{
    color: #FFFFFF;
    font-size: 1.8rem;
    font-family: PingFangSC-Regular;
    width: 25%;
    text-align: left;
  }
  .long-info-key{
    color: #48534A;
    font-size: 1.8rem;
    font-family: PingFangSC-Regular;
    width: 45%;
    text-align: left;
    margin-left: 5%;
  }
  .long-info-value{
    color: #FFFFFF;
    font-size: 1.8rem;
    font-family: PingFangSC-Regular;
    width: 60%;
    text-align: left;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .white-icon{
    color: #FFFFFF;
    font-size: 2rem;
  }
</style>
