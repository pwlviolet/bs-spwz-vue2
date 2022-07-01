<template>
  <div class="list">
    <el-row>
      <el-col :span="4" v-for="(type, index) in types" :key="index" @click.native="getPageByType(index)">{{type.name}}</el-col>
      <!-- <el-col :span="4" @click.native="sort('playCount', $event)" >最多播放</el-col>
      <el-col :span="4" >最新上传</el-col> -->
    </el-row>
        <!-- <div>
      <el-row type="flex" justify="space-around">
        <el-col :span="2" v-for="(type, index) in types" :key="index">
          <el-button size="medium " :type="type.btnType" @click="getPageByType(index)">{{ type.name }}</el-button>
        </el-col>
      </el-row>
    </div> -->
    <div style="height: 13px ;border-bottom: 2px solid #E5E9EF;margin: 2rem 0"></div>
    <VideoList :videos="videos" :showAuthor="true">
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
</template>
<script>
import VideoList from '../../components/video'
// import { search } from '../../api/video'
export default {
  name: 'type',
  components: { VideoList },
  data () {
    return {
      page: 1,
      videos: [],
      count: '',
      sortBy: '',
      type: '',
      types: [
        // 视频分类
        {
          name: '所有'
        },
        {
          name: '科技'
        },
        {
          name: '游戏'
        },
        {
          name: '校园'
        },
        {
          name: '教育'
        },
        {
          name: '动物'
        },
        {
          name: '美食'
        },
        {
            name: '番剧'
        },
        {
            name: '学习'
        },
        {
            name: '鬼畜'
        },
        {
            name: '娱乐'
        },
        {
            name: '影视'
        }
      ]
    }
  },
  methods: {
    async getPageByType (type) {
    this.type = type
      const a = {
          page: 1,
          type: this.type
      }
      console.log(type)
      this.$axios.post('/user/homepage', a).then((res) => {
      this.videos = res.data.data.videos
      this.count = res.data.data.count
      console.log(this.count)
      })
    //   let result = await getVideoPage(1, this.type)
    },
    //  分页变化时
    handleCurrent (page) {
        const b = {
            page: page,
            type: this.type
        }
      this.$axios.post('/user/homepage', b).then((res) => {
      this.videos = res.data.data.videos
      this.count = res.data.data.count
      })
    }
    // sort (key, eve) {
    //   //  重置样式
    //   this.$refs.col1.$el.className = 'el-col el-col-4'
    //   this.$refs.col2.$el.className = 'el-col el-col-4'
    //   eve.target.className += ' active'
    //   //  根据关键字排序
    //   this.sortBy = key
    //   this.init(1, key)
    //   this.page = 1
    // },
//     async init (page = 1, sortBy = '') {
//       const a = {
//         keyWord: this.keyWord,
//         page: page,
//         sortBy: sortBy
//       }
//       this.$axios.post('/user/search', a).then((res) => {
//         // console.log(res.body)
//         console.log(res)
//         this.count = res.data.data.count
//         this.videos = res.data.data.videos
//       })
//       // let result = await search(this.keyWord, page, sortBy)
//       // this.count = result.data.count
//       // this.videos = result.data.videos
//     }
//   },
//   created () {
//     const { keyWord } = this.$route.query
//     this.keyWord = keyWord
//     this.init()
//   },
//   beforeRouteUpdate (to, from, next) {
//     const { keyWord } = to.query
//     this.keyWord = keyWord
//     this.$refs.col1.$el.className = 'el-col el-col-4'
//     this.$refs.col2.$el.className = 'el-col el-col-4'
//     this.page = 1
//     this.sortBy = ''
//     this.init()
//     next()
  }
}
</script>
<style scoped>
.list {
  margin-top: 3rem;
}
.el-row {
  width: 50rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  margin-bottom: 1rem;
}
/* .el-row .el-col:first-child {
    background-color: #00a1d6;
    color: white;
    border-radius: 1rem;
  } */
.el-row  .el-col:not(:first-child) {
    cursor: pointer;
  }
.active {
  color: #00a1d6;
}
</style>
