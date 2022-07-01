<template>
  <div>
    <!-- 背景图 -->
    <div class="bg"></div>
    <div class="imgxx"></div>
    <div class="login">
      <img src="../../assets/img/head.png" />
      <div class="form">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style  scoped>
.bg {
  position: fixed;
  left: 0;
  height: 100%;
  width: 100%;
  background: url('./loginBj.jpg') no-repeat fixed left top/100% 100%;
  filter: blur(1px);
}
.login {
  position: absolute;
  background: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 45rem;
  border-radius: 30px;
}
.login img {
    position: absolute;
    background-color: white;
    top: -12%;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 2px 2px 3px black;
  }
.form {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgxx{
  width: 50px;
  height: 50px;
  /* position: absolute; */
  background-image: url('./jr.gif');
  /* background-size: cover; */
}
</style>
