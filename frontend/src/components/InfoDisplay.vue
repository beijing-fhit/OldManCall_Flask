<template>
  <div class="display-info-container">
    <i class="el-icon-error success-img"></i>
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
