<!-- 顶部导航-->
<template>
  <el-menu
    :default-active="'/' + $route.path.split('/', 2)[1]"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-row :align="'middle'" type="flex">
      <el-col :span="3">
        <el-menu-item index="/home">主页</el-menu-item>
      </el-col>
      <el-col :span="3">
        <el-menu-item index="/upload">上传</el-menu-item>
      </el-col>
            <el-col :span="2">
        <el-menu-item index="/type">分类</el-menu-item>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-input v-model="keyWord" placeholder="输入关键字搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" size="medium" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="2" v-if="!userId">
        <el-menu-item index="/login">
          <span>登录</span>
        </el-menu-item>
      </el-col>
      <el-col :span="3" :offset="1" v-else>
        <el-row type="flex" align="middle" style="line-height: 100%">
          <el-col :span="10">
            <el-avatar :src="headUrl" icon="el-icon-user-solid" :size="48"></el-avatar>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-menu-item @click="logout">
              <span>退出</span>
            </el-menu-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-menu-item index="/mine">个人中心</el-menu-item>
      </el-col>
    </el-row>
  </el-menu>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import { isLogin, logout, getUserHeadUrl } from '../api/user'
export default {
  data () {
    return {
      keyWord: '',
      headUrl: ''
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  watch: {
    userId (newValue) {
      //  登录获取头像
      if (newValue) {
        this.getHeadUrl()
      }
    }
  },
  methods: {
    ...mapActions(['setUserId']),
     logout () {
      // let result = await logout()
      this.setUserId('')
      console.log(this.userId)
      this.headUrl = ''
      console.log(this.headUrl)
      this.$router.push('/login')
    },
    search () {
      if (this.keyWord.trim() !== '') {
        this.$router.push({
          path: '/search',
          query: {
            keyWord: this.keyWord
          }
        })
      } else {
        this.keyWord = ''
        this.$message.error('请输入内容！')
      }
    },
    //  获取用户头像
     getHeadUrl () {
      if (this.userId) {
        // let result = await getUserHeadUrl(this.userId)
        const a = {
          _id: this.userId
        }
        this.$axios.post('/user/getava', a).then((res) => {
          this.headUrl = 'http://localhost:8080' + res.data.headUrl
        })
      }
    },
    async init () {
        // let result = await isLogin()
        // this.$axios.get('/user/islogin').then((res) => {
        //   console.log(res)
        // })
        // console.log(this.userId)
      }
    },
  created () {
    this.init()
    this.getHeadUrl()
  }
}
</script>
<style  scoped>
.el-menu {
  text-align: center;
}

</style>
