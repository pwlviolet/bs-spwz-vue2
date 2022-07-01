<template>
  <div>
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel height="300px">
        <el-carousel-item
          v-for="item in lunbo"
          :key="item._id"
          @click.native="goto(item._id)"
          :style="`background: url(http://localhost:8080${item.imgUrl}) no-repeat center/100%;cursor: pointer;`"
        ></el-carousel-item>
      </el-carousel>
    </div>
    <!-- 中间视频列表 -->
    <div class="middle">
      <!-- 标题 -->
      <div class="title">
        <span class="el-icon-video-camera-solid"></span>
        视频
      </div>
      <!-- 视频列表 -->
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
  </div>
</template>
<script>
// @ is an alias to /src
import VideoList from '../components/video.vue'
// import { getVideoPage, recommend } from '../../api/video'
// import { getOnLive } from '../../api/live'
export default {
  name: 'Home',
  components: { VideoList },
  data () {
    return {
      livePage: 1,
      lives: [],
      livesCount: 0,
      type: '',
      types: [
        // 视频分类
        {
          name: '生活',
          btnType: 'primary'
        },
        {
          name: '科技',
          btnType: 'success'
        },
        {
          name: '游戏',
          btnType: 'warning'
        },
        {
          name: '校园',
          btnType: 'danger'
        },
        {
          name: '教育',
          btnType: 'primary'
        },
        {
          name: '动物',
          btnType: 'success'
        },
        {
          name: '其他',
          btnType: 'danger'
        },
        {
          name: '重置',
          btnType: 'info'
        }
      ],
      lunbo: [],
      videos: [],
      page: 1,
      count: 0
    }
  },
  computed: {},
  methods: {
    // async handLivePage(page) {
    //   this.livePage = page
    //   // let result = await getOnLive(page)
    //   this.lives = result.data.lives
    //   this.livesCount = result.data.count
    // },
    goto (_id) {
      this.$router.push('/detail/' + _id)
    },
    async getPageByType (type) {
      if (type === 7) {
        this.type = ''
      } else {
        this.type = type
      }
      const a = {
        page: 1,
        type: this.type
      }
      this.$axios.post('/user/homepage', a).then((res) => {
        this.videos = res.data.data.videos
        this.count = res.data.data.count
      })
    },
    async handleCurrent (page) {
      this.livePage = page
      // let result = await getVideoPage(page, this.type)
      const b = {
        page: this.livePage,
        type: this.type
      }
      console.log(b)
      this.$axios.post('/user/homepage', b).then((res) => {
      this.videos = res.data.data.videos
      this.count = res.data.data.count
      })
    },
    async init () {
      // let result = await getVideoPage()
      const a = {
        page: 1,
        type: ''
      }
      this.$axios.post('/user/homepage', a).then((res) => {
        // console.log(res.data)
        this.videos = res.data.data.videos
        console.log(this.videos)
        this.count = res.data.data.count
      })

      // result = await recommend()
      this.$axios.get('/user/hot').then((res) => {
        this.lunbo = res.data.data
      })
      // result = await getOnLive()
      // this.lives = result.data.lives
      // this.livesCount = result.data.count
    }
  },
  created () {
    this.init()
  }
}
</script>
<style  scoped>
.carousel {
  margin-bottom: 20px;
}
.title {
  width: 300px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  margin-left: -100px;
}
 span {
    margin-right: 10px;
  }

</style>
