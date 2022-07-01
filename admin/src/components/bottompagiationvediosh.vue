<template>
  <div class="bottom">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="  prev, pager, next, jumper,total"
      :total="maxlength">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    beforeMount(){
      this.handleCurrentChange(1)
    },
    // updated(){
    //   this.handleCurrentChange(1)
    // },
    props:{
      maxlength:{
        type:Number,
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let nowpage=val;
        this.queryinfo.pagenum=nowpage
        // console.log(nowpage)
        this.$axios.post('/user/page/videosh',this.queryinfo).then((res)=>{
        // console.log(res)
        // console.log(nowpage)
        this.$emit('childvalue',res.data)//用$emit方法把值传递给父组件子传父
        })
      }
    },
    data() {
      return {
        currentPage: 1,
        pagelist:10,
        queryinfo:{
          pagenum:''
        }
      };
    }
  }
</script>

<style scoped>
/* .bottom{
  bottom: 0;
} */
</style>