<template>
  <div>
      <el-container >
  <el-aside width="auto">
      <commonaside></commonaside>
      </el-aside>
  <el-container>
    <el-header><common-header></common-header></el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container> 
  </div>
</template>

<script>
import commonaside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
    name:'first',
    components:{
    commonaside,
    CommonHeader
},
    data () {
        return {}
    }
}
</script>

<style  scoped>
.el-header{
    background-color: #333;
}

.el-container{

    height: 100%;
}
.el-main{
    padding: 0px;
}
</style>