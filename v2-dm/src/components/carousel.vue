<template>
  <el-carousel indicator-position="outside" >
    <el-carousel-item v-for="item in images" :key="item">
      <img :src="item.url" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data () {
    return {
      images: [
        { url: require('../assets/bg/2.png') },
        { url: require('../assets/bg/3.png') },
        { url: require('../assets/bg/5.jpg') },
        { url: require('../assets/bg/1.jpeg') }
      ]
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
