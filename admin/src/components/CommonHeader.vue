<template>
  <header>
      <div class="l-content">
          <el-button @click="handleMenu()"  icon="el-icon-s-fold"></el-button>
      </div>
      <div class="r-content">
          <el-dropdown trigger="click" @command="handleCommand">
              <span>
                  <img class="user" :src="userImg">
              </span>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
      </div>
  </header>
</template>

<script>
// import eventBus from '../eventBus'
export default {
    name: 'CommonHeader',
    data() {
        return{
            userImg: require('../assets/logo.png')
        }
    },
    methods: {
        handleMenu(){
            this.$axios.get('/user/reset').then((res)=>{
                    this.$message({
                    type:'success',
                    message:res.data
                })
                setTimeout(()=>{
                  this.$router.go(0);
                },1000)
            })
            // this.$store.commit('collapseMenu')
        },
       handleCommand(command) {
        if(command == 'loginout')
        {
            this.$router.push('/login');
        }
        }
    },
        //     handleMenu(){
        //     const  isCollapse=true
        //     eventBus.$emit('change',isCollapse)
        // }

}
</script>

<style scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
}
.user{
    width: 40px;
    height: 40px;
    border-radius:50%;
}
/* .el-button{
    padding: 10%;
    margin-left: -10px;
} */

</style>