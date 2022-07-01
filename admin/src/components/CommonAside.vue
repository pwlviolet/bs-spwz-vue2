<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse ?'后台':'后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path+''" :key="item.path+''">
    <i :class="'el-icon-'+item.icon"></i>
    <span slot="title">{{item.label}}</span>
  </el-menu-item>
  <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path+''">
    <template slot="title">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </template>
    <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
      <el-menu-item @click="clickMenu(subItem)" :index="subIndex">
        <i :class="'el-icon-'+subItem.icon"></i>
      <span>{{subItem.label}}</span></el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    margin-left:-20px ;
  }
  .el-menu{
    height: 100vh;
    border: none;
    
  }
  h3{
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
  /* *{
    padding: 0px;
    margin: 0px;
    border: 0px;
  } */
</style>

<script>
// import eventBus from '../eventBus'
  export default {
    data() {
      return {
        isCollapse: false,
        menu:[
          {
            path:'/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
          },
          {
            path:'/user',
            name: 'user',
            label: '用户',
            icon: 'user',
            url: 'UserManage/UserManage'
          },
          {
            label:'稿件',
            icon: 'upload2',
            children: [
              {
                path:'/vedio',
                name: 'vedio',
                label: '视频',
                icon: 'video-play',
                url: 'video'
              },
              {
                path:'/live',
                name: 'live',
                label: '审核',
                icon: 'video-camera',
                url: 'live'
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
          name: item.name
        })
      },
    },
    computed:{
      noChildren() {
        return this.menu.filter(item=>
          !item.children
        )
      },
      hasChildren() {
        return this.menu.filter(item =>
          item.children
        )
      },
      // isCollapse(){
      //   return this.$store.state.tab.isCollapse
      // }
    },
    // create(){
    //     eventBus.$on('change',(message)=>{
    //       this.isCollapse=message
    //     })
    //   }
    
}
</script>
