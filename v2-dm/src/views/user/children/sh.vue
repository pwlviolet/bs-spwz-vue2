<template>
  <div style="margin-top: 2rem">
    <el-row class="topMenu">
      <!--    搜索框    -->
      <!-- <el-col :span="3" :offset="15">
        <el-input size="small" placeholder="搜索视频" prefix-icon="el-icon-search" v-model="keyWord" @keyup.enter.native="search"></el-input>
      </el-col> -->
      <!-- <el-col :span="1" :offset="1" ref="col1" @click.native="sort('uploadAt', $event)">
        最新上传
      </el-col> -->
      <!-- <el-col :span="1" :offset="1" ref="col2" @click.native="sort('playCount', $event)">
        最多播放
      </el-col> -->
    </el-row>
    <div>
      <VideoList :videos="videos">
        <template v-slot:option="video">
          <el-row>
            <el-col style="font-size: 1.2rem" :span="4" :offset="18" class="el-icon-delete" @click.native="deleteVideo(video._id)">
              删除
            </el-col>
          </el-row>
        </template>
        <template v-slot:pagination>
          <el-pagination
            background
            :current-page="page"
            layout="prev, pager, next,total"
            :total="count"
            :page-size="8"
            @current-change="handleCurrent"
            hide-on-single-page
          ></el-pagination>
        </template>
      </VideoList>
    </div>
  </div>
</template>
<script>
import VideoList from '../../../components/video'
// import { getVideoPageByUser, deleteVideoById } from '../../../api/video'
import { mapState } from 'vuex'
export default {
  name: 'myVideo',
  components: { VideoList },
  computed: {
    ...mapState(['userId'])
  },
  data () {
    return {
      page: 1,
      sortBy: '',
      //  搜索内容
      keyWord: '',
      videos: [],
      count: 0
    }
  },
  methods: {
    deleteVideo (_id) {
      this.$confirm('确定要删除吗?', '提示').then(async () => {
        // let result = await deleteVideoById(_id)
        const a = {
          vedioid: _id
        }
        this.$axios.post('/user/deletevedio', a).then(() => {
                  // this.$message.success(result.msg)
        this.init(this.page, this.keyWord, this.sortBy)
        })
      })
    },
    handleCurrent (page) {
      this.page = page
      this.init(page, this.keyWord, this.sortBy)
    },
    search () {
      // 重置样式
      this.$refs.col1.$el.className = 'el-col el-col-1 el-col-offset-1'
      this.$refs.col2.$el.className = 'el-col el-col-1 el-col-offset-1'
      if (!this.keyWord.trim()) {
        this.keyWord = ''
      }
      this.init(1, this.keyWord)
      this.page = 1
      this.sortBy = ''
    },
    sort (key, eve) {
      // 重置样式
      this.$refs.col1.$el.className = 'el-col el-col-1 el-col-offset-1'
      this.$refs.col2.$el.className = 'el-col el-col-1 el-col-offset-1'
      eve.target.className += ' active'
      this.sortBy = key
      this.init(1, this.keyWord, key)
      this.page = 1
    },
    async init (page = 1, keyWord = '', sortBy = '') {
      // let result = await getVideoPageByUser({ author: this.userId, page, keyWord, sortBy })
      // this.videos = result.data.videos
      // this.count = result.data.count
      const c = {
        auther: this.userId,
        page: 1,
        keyWord: '',
        sortBy: ''
      }
      this.$axios.post('/user/byIddsh', c).then((res) => {
        console.log(res.data)
        this.videos = res.data.data.video
        this.count = res.data.data.count
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style  scoped>
/*点击后显示的样式*/
.active {
  color: #00a1d6;
  border-bottom: 1px solid #00a1d6;
}
.topMenu {
  margin-bottom: 2rem;
  text-align: center;
  line-height: 42px;
}
.el-col:not(:first-child) {
    cursor: pointer;
  }
.el-icon-delete {
  margin-top: 0.8rem;
  cursor: pointer;
}
.el-icon-delete:hover {
    color: #00a1d6;
  }
.el-icon-delete:before {
    margin-right: 4px;
  }
</style>
