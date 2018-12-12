<template>
  <el-container class="video">
    <el-main class="content">
      <el-container>
        <el-header class="top">
          <h3>视频审核</h3>
          <p class="btn">
            <el-button class="signIn" type="success" @click="refreshData">获取数据</el-button>
            <el-button class="signIn" type="info" @click="stopRefresh">停止获取</el-button>
          </p>
        </el-header>
        <el-main class="tablebox">
          <el-table
            :data="tableData3"
            :header-cell-style="headerStyle"
            :row-style="createRowStyle"
            :height="getHeight"
            style="width:100%;height:100%;margin:0;"
          >
            <el-table-column
              prop="userInfo"
              label="用户信息"
              min-width="240"
              align="center"
              key="index"
              class-name="column1"
            >
              <template slot-scope="scope">
                <p>
                  <span>昵称:</span>
                  <span>{{scope.row.userInfo.user_name}}</span>
                </p>
                <p>
                  <span>身份:</span>
                  <span>{{scope.row.userInfo.user_type}}</span>
                </p>
                <p>
                  <span>学科:</span>
                  <span>{{scope.row.userInfo.user_subject}}</span>
                </p>
                <p>
                  <span>阶段:</span>
                  <span>{{scope.row.userInfo.user_grade_level}}</span>
                </p>
                <p>
                  <span>级别:</span>
                  <span>{{scope.row.userInfo.user_level}}</span>
                </p>
                <p>
                  <span>UID:</span>
                  <span>{{scope.row.userInfo.user_uid}}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="videoInfo"
              label="视频信息"
              min-width="240"
              align="center"
              class-name="column2"
            >
              <template slot-scope="scope">
                <p>
                  <span>标题:</span>
                  <span>{{scope.row.videoInfo.video_title}}</span>
                </p>
                <p>
                  <span>学科:</span>
                  <span>{{scope.row.videoInfo.video_subject}}</span>
                </p>
                <p>
                  <span>阶段:</span>
                  <span>{{scope.row.videoInfo.video_watch_type}}</span>
                </p>
                <p>
                  <span>长度:</span>
                  <span>{{scope.row.videoInfo.video_duration}}</span>
                </p>
                <p>
                  <span>XY:</span>
                  <span>{{scope.row.videoInfo.video_resolution}}</span>
                </p>
                <p>
                  <span>VID:</span>
                  <span>{{scope.row.videoInfo.video_id}}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="showInfo"
              label="预览"
              min-width="220"
              align="center"
              class-name="column3"
            >
              <template slot-scope="scope">
                <div class="imgbox">
                  <img
                    class="see"
                    src="../../../../assets/img/admin/commmon/play.png"
                    @click="openVideo(scope.row.showInfo.video_video_up_path,scope.$index)"
                    alt
                  >
                  <img
                    class="pre"
                    :src="scope.row.showInfo.video_pic_up_path"
                    @click="openVideo(scope.row.showInfo.video_video_up_path,scope.$index)"
                    alt
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column label="审核结果" align="center" width="380" class-name="column4">
              <template slot-scope="scope">
                <el-radio-group v-model="result[scope.$index].status">
                  <el-radio label="1">通过</el-radio>
                  <el-radio label="2">不通过</el-radio>
                </el-radio-group>

                <div class="checkarea">
                  <el-checkbox-group v-model="result[scope.$index].type_list">
                    <el-checkbox label="1" :disabled="result[scope.$index].status==2">推荐</el-checkbox>
                    <el-checkbox label="2" :disabled="result[scope.$index].status==2">学科</el-checkbox>
                    <el-checkbox label="3" :disabled="result[scope.$index].status==2">搜索</el-checkbox>
                  </el-checkbox-group>

                  <div class="rightbox">
                    <el-select
                      v-model="result[scope.$index].fail_reason"
                      placeholder="请选择不通过原因"
                      :disabled="result[scope.$index].status==1"
                    >
                      <el-option
                        v-for="item in errorList"
                        :key="item.id"
                        :label="item.reason"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-model="result[scope.$index].fail_content"
                      v-if="result[scope.$index].fail_reason==107"
                      placeholder="请输入不通过原因"
                      maxlength="16"
                    ></el-input>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column class-name="column5" label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="submit(scope.$index)">提交</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-main>
    <div class="videobox" v-if="playing">
      <video onClick="javascript:clickVideo();" :src="videoUrl" autoplay="true" controls="controls"></video>
    </div>
    <div class="mask" v-if="playing">
      <img @click="closevideo" class="closevideo" src="../../../../assets/img/close.png" alt>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "videopage",
  data() {
    return {
      videoUrl: "",
      playing: false,
      reason: "",
      access: "-1",
      result: [],
      startlx: false,
      checkList: [],
      errorList: [],
      tableData3: [],

      headerStyle: {
        borderTop: "1px solid rgba(190,190,190,1)",
        borderBottom: "6px solid #A5A5A5",
        color:"#333",
      }
    };
  },
  computed: {
    getHeight() {
      return document.documentElement.clientHeight - 88;
    }
  },
  watch: {
    result: {
      deep: true,
      handler: () => {}
    },
    startlx(value) {
      if (value) {
        console.log("开启轮训");
        this.timer = setInterval(() => {
          if (sessionStorage.getItem("pageName") == this.$options.name) {
            this.getList();
          } else {
            this.stopRefresh();
          }
        }, 3000);
      } else {
        console.log("关闭轮训");
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },

  mounted() {
    this.getErrorList();
  },
  methods: {
    stopRefresh() {
      if (this.startlx) {
        this.startlx = false;
      }
    },
    createRowStyle({ row, rowIndex }) {
      return {
        background: "#E8E8E8"
      };
    },
    submit(rowIndex) {
      let video_id = this.tableData3[rowIndex].video_id || "";
      let result = this.result[rowIndex];
      let status = result.status;
      let fail_reason = result.fail_reason;
      let fail_content = result.fail_content;
      let type_list = "";
      result.type_list.forEach(item => {
        type_list += item + ",";
      });
      if (status == -1) {
        alert("请选择审核结果");
      } else if (status == 2 && fail_reason == "") {
        alert("请选择未通过原因");
      } else if (status == 2 && fail_reason == "107" && fail_content == "") {
        alert("请输入未通过原因");
      } else {
        this.$http({
          method: "post",
          url: "/admin/examine_video",
          data: {
            status: status,
            type_list: type_list,
            fail_reason: result.fail_reason,
            fail_content: result.fail_content,
            video_id: video_id
          }
        })
          .then(({ res, ok }) => {
            if (ok) {
              this.tableData3.splice(rowIndex, 1);
              this.result.splice(rowIndex, 1);
            }
          })
          .catch(error => {});
      }
    },
    refreshData() {
      if (this.tableData3.length > 0) {
        alert(
          "您还有" + this.tableData3.length + "条未审核数据，请先审核完成！"
        );
        return;
      }
      this.getList();
    },
    getErrorList() {
      this.$http({
        method: "get",
        url: "/admin/fail_reason_list"
      })
        .then(({ res, ok }) => {
          if (ok) {
            this.errorList = res;
          }
        })
        .catch(error => {
          alert("视频列表查询失败");
        });
    },
    getList() {
      this.$http({
        url: "/admin/current_video_list"
      })
        .then(({ res, ok }) => {
          if (ok) {
            if (res.length == 0) {
              this.result = [];
              this.tableData3 = [];
              this.startlx = true;
            } else {
              let arr = [];
              for (let i = 0; i < res.length; i++) {
                arr.push({
                  status: -1,
                  type_list: [],
                  fail_reason: "",
                  fail_content: ""
                });
              }
              this.result = arr;
              this.tableData3 = res;
              this.startlx = false;
            }
          }
        })
        .catch(error => {
          console.log(error);
          alert("视频列表查询失败");
        });
    },
    openVideo(url) {
      if (!!url) {
        this.videoUrl = url;
        this.playing = true;
      } else {
        alert("视频地址有误");
      }
    },
    closevideo() {
      this.videoUrl = "";
      this.playing = false;
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  }
};
</script>

<style lang="less" rel="stylesheet/stylus"  scoped>
.el-container {
  padding: 0;
  height: 100%;
  .mask {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 80;
    opacity: 0.6;
    background: #000;
    img {
      position: absolute;
      right: 120px;
      top: 100px;
      width: 40px;
    }
  }
  .videobox {
    position: absolute;
    height: 882px;
    width: 416px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    //background: red;
    background: url("../../../../assets/img/bgiphone.png") no-repeat center;
    background-size: 427px 881px;
    background-color: #000;
    border-radius: 55px;
    video {
      margin-top: 116px;
      height: 667px;
      width: 375px;
    }
  }
  .content {
    padding: 0;
    .top {
      background: #fff;
      height: 36px !important;
      color: #333;
      line-height: 36px;
      position: relative;
      h3 {
        color: #000000;
        font-size: 16px;
        letter-spacing: 5px;
        height: 36px;
        line-height: 36px;
        text-align: center;
      }
      .btn {
        position: absolute;
        top: 0;
        right: 20px;
        .el-button {
          padding: 0;
          height: 24px;
          line-height: 24px;
          span {
            width: 68px;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
  }
  .tablebox {
    padding: 0;
    .el-table {
      font-size: 16px;
      margin-left: 10px;

      .el-table-column {
        font-size: 44px;
      }
    }
    .column1,
    .column2 {
      
      p {
        display: flex;
        height: 30px;

        line-height: 30px;
        span:nth-child(1) {
          margin-right: 5px;
          min-width: 50px;
          text-align: right;
        }
        span:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .column3 {
      text-align: center;
      .imgbox {
        position: relative;
        display: inline-block;
        height: 200px;
        width: 200px;

        .see {
          position: absolute;
          z-index: 20;
          height: 58px;
          width: 58px;
          left: 50%;
          margin-left: -29px;
          margin-top: -29px;
          top: 50%;
        }
        .pre {
          position: absolute;
          z-index: 10;
          left: 0;
          height: 200px;
          width: 200px;
        }
      }
    }
    .column4 {
      .el-radio-group {
        display: flex;
        justify-content: space-around;
        width: 49%;
        margin-left: 11px;
      }
      .checkarea {
        margin-top: 10px;
        display: flex;

        justify-content: space-around;
        .rightbox {
          width: 66%;
          .el-select {
            margin-top: 8px;
          }
          .el-input {
            margin-top: 10px;
            width: 220px;
          }
        }
        .el-checkbox-group {
          height: 100px;

          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .el-checkbox {
            margin-left: 0;
          }
        }
      }
    }
    .column5 {
      .el-button {
        background: #09bb07;
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .tablebox::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
<style>
/* .tablebox .el-table .el-table__body-wrapper .el-table__body {
  background: red;
} */
</style>


