<template>
  <div class="display-info-container">
    <i class="el-icon-error success-img big-font-size color-red"></i>
    <div class="status-container">
      <span class="normal-tip">{{message}}</span>
    </div>
  </div>
</template>

<script>
// import {Loading} from 'element-ui'
export default {
  name: 'InfoDisplay',
  data () {
    return {
      message: this.$route.query.message,
      success_img_url: require('../assets/success.png')
    }
  },
  created () {
    document.title = this.$route.meta.title
  },
  mounted () {
    // this.$message('阿道夫')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .display-info-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .success-img{
    width: 8rem;
    height: 8rem;
  }
  .big-font-size{
    font-size: 8rem;
    font-family: "PingFang SC";
  }
  .color-red {
    color: red;
  }
  .status-container{
    margin-top: 1rem;
  }
  .normal-tip{
    color: #666666;
    font-size:1.6rem;
    font-family: "PingFang SC";
    letter-spacing: 0.01rem;
    font-style: normal;
    margin-top: 0.5rem;
  }
</style>
