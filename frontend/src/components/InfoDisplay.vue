<template>
  <div class="display-info-container">
    <i class="el-icon-error success-img big-font-size color-red"></i>
    <div class="status-container">
      <span class="normal-tip">{{message}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoDisplay',
  data () {
    return {
      message: this.$route.query.message,
      success_img_url: require('../assets/success.png')
    }
  },
  mounted () {
    // // this.$message('阿道夫')
    // const loading = this.$loading({
    //   lock: true,
    //   text: '正在发起呼叫请求...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.5)',
    //   fullscreen: false,
    //   customClass: 'el-loading-spinner'
    // })
    // setTimeout(() => {
    //   loading.close()
    // }, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  /deep/ .el-loading-spinner {
    top: 50%;
    left: 50%;
    margin-left: -55px;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 4px;
    width: auto;
    text-align: center;
    position: absolute;
  }
  /deep/ i {
    color: #eee;
  }

  /deep/ .el-loading-text {
    color: #eee;
  }
</style>
