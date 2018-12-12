<template>
  <el-container
    class="classroom"
    v-loading.body="loading"
    element-loading-text="拼命加载中..."
    element-loading-background="rgba(9,187,7,.1)"
  >
    <el-main class="content">
      <el-table
        :data="tableData"
        :header-cell-style="headerStyle"
        style="width: 100%;height:100%;background:#fff"
      >
        <el-table-column
          prop="a"
          label="课程名称"
          width="150"
          align="center"
          key="index"
          class-name="classname"
        ></el-table-column>
        <el-table-column prop="b" label="老师" align="center" class-name="teachername"></el-table-column>
        <el-table-column prop="c" label="阶段" align="center" class-name="stage"></el-table-column>
        <el-table-column prop="d" label="学科" align="center" class-name="subject"></el-table-column>
        <el-table-column prop="e" label="类型" align="center" class-name="type"></el-table-column>
        <el-table-column prop="f" label="课次" align="center"></el-table-column>
        <el-table-column prop="g" label="日期" align="center" class-name="date"></el-table-column>
        <el-table-column prop="h" label="时间" align="center" class-name="time"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="submit(scope.$index)" size="mini" type="primary">进入课堂</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: "",
      playing: false,
      reason: "",
      access: "-1",
      result: [],
      startlx: false,
      checkList: [],

      tableData: [
        {
          a: "吴老师物理一对一",
          b: "吴老师",
          c: "初三",
          d: "物理",
          e: "一对一",
          f: "8",
          g: "11月8日",
          h: "12:00-14:00"
        }, {
          a: "吴老师物理一对一",
          b: "吴老师",
          c: "初三",
          d: "物理",
          e: "一对一",
          f: "8",
          g: "11月8日",
          h: "12:00-14:00"
        }, {
          a: "吴老师物理一对一",
          b: "吴老师",
          c: "初三",
          d: "物理",
          e: "一对一",
          f: "8",
          g: "11月8日",
          h: "12:00-14:00"
        }

      ],
      loading: false,
      headerStyle: {
        borderBottom: "8px solid #A5A5A5"
      },
    
    };
  },
  watch: {
    result: {
      deep: true,
      handler: () => {}
    }
  },

  mounted() {},
  methods: {
  
  }
};
</script>

<style lang="less" rel="stylesheet/stylus"  scoped>
.el-container {
  padding: 0;
  height: 100%;

  .el-main {
    padding: 0;
    width: 100%;
  }
  .tablebox {
    padding: 0;

    .el-table {
      font-size: 16px;
      margin: 10px 0 0 10px;

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
        }
      }
    }
    .column3 img {
      width: 200px;
      height: 200px;
    }
    .column4 {
      .el-radio-group {
        display: flex;
        justify-content: space-around;
        width: 57%;
        margin-left: 0px;
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
  }
}
</style>
