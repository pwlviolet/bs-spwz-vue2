<template>
  <el-container>
    <!-- 头 -->
    <el-header height="10%" style="padding:0">
      <Header />
    </el-header>
    <el-main>
      <!-- 路由占位符 主要部分 -->
      <!--  匹配完整路径 使其能跳转自身   -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import Header from '../components/HeaderBar'
export default {
  components: {
    Header
  }
}
</script>
<style scoped>
.el-container {
  width: 100vw;
  min-height: 100%;
}
.el-main {
  width: 1440px;
  margin: 0 auto 50px;
  padding: 0;
}
/* 分页*/
.el-pagination {
  text-align: center;
}
.dplayer-danloading {
  display: none;
}
</style>
