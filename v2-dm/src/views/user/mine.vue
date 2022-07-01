<template>
  <div>
    <!-- 顶部 -->
    <div class="topBg">
      <el-row type="flex" align="middle">
        <el-col :span="2" style="text-align: center">
          <el-avatar icon="el-icon-user-solid" :size="64" :src="user.headUrl | urlFormat" :key="user._id"></el-avatar>
        </el-col>
        <el-col :span="8">
          <span style="font-size: 1.6rem">{{ user.nick }}</span>
          &nbsp;
          <!--    性别图标 -->
          <i class="el-icon-female el-icon" style="color:#FF758F" v-if="user.sex"></i>
          <i class="el-icon-male el-icon" style="color:#5FD4F2;" v-else></i>
          <div class="sign">
            <p
              style="color: #D6DEE4"
              contenteditable="true"
              ref="sign"
              @blur="updateSign(user.sign)"
              title="个性签名,点击可编辑"
            >
              {{ user.sign }}
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--  中间文字  -->
    <div class="middle">
      <el-row>
        <router-link to="/mine/video">
          <el-col :span="2">
            <i class="el-icon-video-camera" style="color: #00C091;margin: 4px"></i>
            视频
          </el-col>
        </router-link>
        <!--     若为他人则不显示以下内容   -->
        <div>
          <!-- <router-link to="/mine/collection">
            <el-col :span="2">
              <i class="el-icon-collection" style="color: #FB7299;margin: 4px"></i>
              收藏
            </el-col>
          </router-link> -->
          <!-- <router-link to="/mine/attention">
            <el-col :span="2">
              <i class="el-icon-collection-tag" style="color: #F3A034;margin: 4px"></i>
              关注
            </el-col>
          </router-link> -->
          <router-link to="/mine/setting">
            <el-col :span="2">
              <i class="el-icon-setting" style="color: #23C9ED;margin: 4px"></i>
              个人资料
            </el-col>
          </router-link>
          <router-link to="/mine/sh">
            <el-col :span="2">
              <i class="el-icon-warning-outline" style="color: #FB7299;margin: 4px"></i>
              待审核
            </el-col>
          </router-link>
          <!-- <router-link to="/mine/live">
            <el-col :span="2">
              <i class="el-icon-service" style="color: #F3A034;margin: 4px"></i>
              直播
            </el-col>
          </router-link> -->
        </div>
        <!-- <el-col :span="2" :offset="8" style="line-height: 200%;font-size: 1.4rem">
          <p>粉丝数</p>
          <span>{{ user.fansCount }}</span>
        </el-col> -->
      </el-row>
    </div>
    <div class="panel">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import { getUserById, updateUser } from '../../api/user'
export default {
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    async updateSign (oldValue) {
      const newValue = this.$refs.sign.innerText.trim()
      if (oldValue === newValue) return (this.$refs.sign.innerText = oldValue)
      if (newValue.length > 40 || newValue.length < 2) {
        this.$refs.sign.innerText = oldValue
        return this.$message.error('不能为空且长度2-40')
      }
    //   let result = await updateUser({ _id: this.userId, sign: newValue })
    //   this.user = result.data
        const a = {
            _id: this.userId,
            sign: newValue
        }
        this.$axios.post('/user/updateuser', a).then((res) => {
            this.user = res.data
            this.$router.go(0)
        })
    },
    async init () {
      if (!this.userId) {
        this.$message.error('先登录')
        return await this.$router.push('/login')
      }
    //   let result = await getUserById(this.userId)
    const a = {
        _id: this.userId
    }
    this.$axios.post('/user/userid', a).then((res) => {
        console.log(res.data)
        this.user = res.data
    })

    //   this.user = result.data
    }
  },
  created () {
    this.init()
  }
}
</script>
<style  scoped>
/*顶部 */
.topBg {
  height: 180px;
  background: url('./0.jpg') no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
}
/* .el-row {
    background-image: linear-gradient(rgba(1, 1, 1, 0.1) 30%, rgba(1, 1, 1, 0.5));
    padding: 8px;
}
.el-icon {
    font-size: 1.5em;
    font-weight: bold;
} */
.sign {
    font-size: 1.2rem;
    height: 20px;
    margin-top: 0.8rem;
}
/*  中间*/
.middle {
  border: 1px solid #ebebeb;
  border-radius: 0 0 10px 10px;
  text-align: center;
  font-size: 16px;
  height: 64px;
  line-height: 60px;
}
/* .el-col {
      border-bottom: #00a1d6 solid 2px;
    } */
.el-col {
    margin-left: 10px;
  }
/* a .el-col:hover {
      border-bottom: #00a1d6 solid 2px;
      color: #00a1d6;
    } */
</style>
