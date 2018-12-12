<template >
  <div class="login">
    <p class="title">
      <img src="../../../assets/img/admin/login/logo.png" alt> 导音教育后台审核查询管理系统
    </p>
    <div class="container">
      <div class="contentbox">
        <p>欢迎登陆</p>

        <div class="inputbox">
          <p>手机号:
            <el-input autofocus class="account" v-model="account" placeholder="请输入手机号"></el-input>
          </p>
          <p>密<span style="opacity: 0">机</span>码:
            <el-input class="pwd" v-model="pwd" type="password" placeholder="请输入密码"></el-input>
          </p>
          <p class="signinBox" @click="signIn">登&nbsp&nbsp&nbsp&nbsp陆</p>
          <p class="tip">如忘记密码请联系管理员</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      account: "",
      pwd: "",
      loading: false
    };
  },
  mounted() {
    // this.createdCode();
    let lastuser =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (lastuser) {
      if (new Date().getTime() - lastuser.lasttime > 518399) {
        alert("密码失效，请重新登陆");
      } else {
        this.account = unescape(lastuser.info).split("=")[0];
        this.pwd = unescape(lastuser.info).split("=")[1];
      }
    }
  },
  methods: {
    login(account, pwd) {
      this.loading = true;
      this.$http({
        url: "/admin/login",
        data: { account, pwd }
      })
        .then(({ res, ok }) => {
          if (ok) {
            sessionStorage.setItem("account", account);
            localStorage.setItem(
              "user",
              JSON.stringify({
                lasttime: new Date().getTime(),
                info: escape(account + "=" + pwd)
              })
            );
            sessionStorage.setItem("isLogin", true);
            this.$router.replace({ path: "/admin/home" });
          } else {
            alert(res);
          }
        })
        .catch(error => {
          console.log(error);
          //this.createdCode();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    signIn() {
      let phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;

      if (this.account == "") {
        alert("请输入手机号");
      } else if (
        (this.account.length > 0 && this.account.length < 11) ||
        !phoneReg.test(this.account)
      ) {
        alert("请输入格式正确的手机号");
      } else if (this.pwd == "") {
        alert("请输入密码");
      } else if (this.pwd.length < 6) {
        alert("密码长度不符");
      } else {
        this.login(this.account, this.pwd);
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/stylus" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    height: 50px;
    background: #fff;
    color: #00b80c;
    padding-left: 12px;
    font-size: 18px;
    text-align: left;
    line-height: 50px;
  }
  .container {
    height: 100%;
    background: url("../../../../static/img/bg.jpg") no-repeat center;
    background-size: cover;
    .contentbox {
      background: #fff;
      border-radius: 20px;
      position: relative;
      top: 50%;
      left: 50%;
      padding: 10px 30px 0;
      height: 352px;
      width: 300px;
      transform: translate(-150px, -176px);
      border: 1px solid #d2d7dd;
      p:nth-child(1) {
        font-size: 18px;
      }

      .inputbox {
        margin-top: 30px;
        padding: 40px 14px 0 14px;
        height: 260px;
        background: rgba(240, 240, 240, 1);
        opacity: 1;
        font-size: 18px;
        border-radius: 18px;
        .el-input {
          font-size: 16px;
          margin-bottom: 10px;
          width: 130px;
          margin-left: 15px;
        }
      }
      .signinBox {
        margin-top: 18px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #09bb07;
        color: #fff;
        font-size: 18px;
        border-radius: 10px;
      }
      .tip {
        color: #9b9b9b;
        font-size: 14px;
        margin-top: 30px;
      }
    }
  }
}
</style>
<style >
.inputbox input.el-input__inner {
  padding: 0 5px;
}
</style>


