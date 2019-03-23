<template>
  <el-row>
    <el-row class="search">
      <el-col :span="12" :offset="6">
        <h1>“挑战杯”作品信息</h1>
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button type="primary" icon="el-icon-search" @click="toSearch" slot="append">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="作品名称">
                <span>{{ props.row.workName }}</span>
              </el-form-item>
              <el-form-item label="高校名称">
                <span>{{ props.row.universityName }}</span>
              </el-form-item>
              <el-form-item label="类型一">
                <span>{{ props.row.categoryOneName }}</span>
              </el-form-item>
              <el-form-item label="类型二">
                <span>{{ props.row.categoryTwoName }}</span>
              </el-form-item>
              <el-form-item label="年份-届">
                <span>{{ props.row.yearTheName }}</span>
              </el-form-item>
              <el-form-item label="获奖等级">
                <span>{{ props.row.levelName }}</span>
              </el-form-item>
              <el-form-item label="作品来源">
                <span>{{ props.row.sourceName }}</span>
              </el-form-item>
              <el-form-item label="作品简介">
                <span>{{ props.row.workIntroduction }}</span>
              </el-form-item>
              <br>
              <img
                v-for="item in props.row.imgUrls"
                :key="item.index"
                :src="item.url"
                width="50%"
                height="50%"
                class="head_pic"
              >
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="作品名称" prop="workName"></el-table-column>
        <el-table-column label="高校" prop="universityName"></el-table-column>
        <el-table-column label="获奖等级" prop="levelName"></el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      search: null,
      tableData: []
    };
  },
  methods: {
    toSearch() {
      this.$options.methods.commonSearch(this);
    },
    commonSearch(_this) {
      _this.$http
        .post("/works/findWorksInfo", {search: _this.search})
        .then(response => {
          if (response.data.rtnCode == 200) {
            _this.tableData = response.data.data;
          } else {
            _this.$message.error("数据加载失败");
          }
        });
      // _this.$http.post("/works/findWorksInfo", "1").then(response => {
      //   if (response.data.rtnCode == 200) {
      //     _this.tableData = response.data.data;
      //   } else {
      //     _this.$message.error("数据加载失败");
      //   }
      // });
    }
  },
  created() {
    this.$options.methods.commonSearch(this);
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.search {
  margin-bottom: 12px;
  text-align: center;
}
</style>
