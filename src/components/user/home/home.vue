<template>
  <div class="home">
    <el-container>
      <el-header>
        <h3>
          <img src="../../../assets/img/admin/login/logo.png" alt> 导音教育
        </h3>
        <p class="title">{{sliderList[clickIndex]}}</p>
        <div class="userInfo">
          <img class="icon" src="../../../assets/img/icon_def.png" alt>
          <span class="name">{{account}}</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="list">
            <p
              @click="changeview(index)"
              :class="[index==clickIndex?'check':'']"
              v-for="(item,index) in sliderList"
              :key="index"
            >{{item}}</p>
          </div>
          <p class="exit" @click="exit">退出登陆</p>
        </el-aside>
        <el-container>
          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: sessionStorage.getItem("account") || "普通用户",
      sliderList: ["网上课堂", "发布文章", "发布视频"],

      clickIndex: sessionStorage.getItem("clickIndex") || -1
    };
  },

  mounted() {},
  methods: {
    exit() {
      this.$router.replace({ path: "/login" });
      sessionStorage.clear();
    },
    changeview(index) {
      this.clickIndex = index;
      sessionStorage.setItem("clickIndex", index);
      if (index == 0) {
        //   this.$router.replace({ path: "/admin/home/video" });
      } else if (index == 1) {
        //  this.$router.replace({ path: "/admin/home/paper" });
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/stylus"  scoped>
.home {
  height: 100%;
  background: #d2d7dd;
}
.el-container {
  height: 100%;
}
.el-header {
  background: #fff;
  color: #fff;
  display: flex;
  height: 50px !important;
  justify-content: space-between;

  h3 {
    flex: 1;
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    height: 50px;
    color: #00b80c;
    padding-left: 12px;
    font-size: 18px;
    text-align: left;
    line-height: 50px;
    width: 50%;
    letter-spacing: 5px;
  }
  .title {
    flex: 9;
    line-height: 50px;
    font-size: 18px;
    color: #000;
  }
  .userInfo {
    flex: 1;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
    .name {
      font-size: 18px;
      color: #000;
    }
  }
}

.el-aside {
  border-top: 1px solid #00b80c;
  background: #fff;
  border-right: 8px solid #8d8d8d;
  position: relative;
  .list {
    font-size: 18px;
    text-align: center;
    p {
      line-height: 46px;
      margin-bottom: 1px;
      color: #333333;
      text-align: center;
      background: #e8e8e8;
    }
    .check {
      color: #00b80c;
    }
  }
  .exit {
    height: 46px;
    line-height: 46px;
    font-size: 18px;
    background: #8d8d8d;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
.el-main {
  border-top: 1px solid #00b80c;
  background: #fff;
  padding: 0;
}
</style>
