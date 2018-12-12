<template>
  <div class="welcome">
<p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "欢迎使用导音管理后台"
    };
  }
};
</script>
<style lang="less" rel="stylesheet/stylus"  scoped>
.welcome {
  p {
    font-size: 60px;
    margin-top: 300px;
  }
}
</style>
