<template>
  <el-row>
    <el-row class="screen">
      <el-card class="box-card">
        <el-col :span="24" style="ma">
          <el-row>
            <el-checkbox-group v-model="provinceList" size="small">
              <strong class="screen-strong">地区：</strong>
              <el-checkbox v-for="item in province" :label="item" :key="item" @change="search"></el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row>
            <el-checkbox-group v-model="categoryOneList" size="small">
              <strong class="screen-strong">类型一：</strong>
              <el-checkbox
                v-for="item in categoryOne"
                :label="item.id"
                :key="item.id"
                @change="search"
              >{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row>
            <el-checkbox-group v-model="categoryTwoList" size="small">
              <strong class="screen-strong">类型二：</strong>
              <el-checkbox
                v-for="item in categoryTwo"
                :label="item.id"
                :key="item.id"
                @change="search"
              >{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row>
            <el-checkbox-group v-model="sourceList" size="small">
              <strong class="screen-strong">来源：</strong>
              <el-checkbox
                v-for="item in source"
                :label="item.id"
                :key="item.id"
                @change="search"
              >{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row>
            <el-checkbox-group v-model="yearTheList" size="small">
              <strong class="screen-strong">年份-届：</strong>
              <el-checkbox
                v-for="item in yearThe"
                :label="item.id"
                :key="item.id"
                @change="search"
              >{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row>
            <el-checkbox-group v-model="levelList" size="small">
              <strong class="screen-strong">获奖等级：</strong>
              <el-checkbox
                v-for="item in level"
                :label="item.id"
                :key="item.id"
                @change="search"
              >{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </el-row>
        </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-table
        :data="tableData"
        row-key="name"
        :default-sort="{prop: 'value', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template v-slot="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="item.name" v-for="item in props.row.levelInfo" :key="item.name">
                <span>{{ item.sum }}</span>
              </el-form-item>
              <el-form-item>
                <router-link :to="'showDetails/'+props.row.id">查看详情</router-link>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="高校名" prop="name"></el-table-column>
        <el-table-column label="获奖总数" prop="value"></el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      zOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["蒸发量", "降水量"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      },
      tableData: [],
      categoryOne: [],
      categoryTwo: [],
      level: [],
      province: [],
      source: [],
      yearThe: [],
      categoryOneList: [],
      categoryTwoList: [],
      levelList: [],
      provinceList: [],
      sourceList: [],
      yearTheList: []
    };
  },
  methods: {
    search() {
      this.$options.methods.toSearch(this);
    },
    toSearch(_this) {
      _this.$http
        .post("/works/findRankInfo", {
          categoryOneList: _this.categoryOneList,
          categoryTwoList: _this.categoryTwoList,
          levelList: _this.levelList,
          provinceList: _this.provinceList,
          sourceList: _this.sourceList,
          yearTheList: _this.yearTheList
        })
        .then(response => {
          if (response.data.rtnCode == 200) {
            _this.tableData = response.data.data;
          } else {
            _this.$message.error("数据加载失败");
          }
        });
    }
  },
  created() {
    this.$options.methods.toSearch(this);
  },
  mounted() {
    this.$http.get("/works/findRankParam").then(response => {
      if (response.data.rtnCode == 200) {
        this.categoryOne = response.data.data.categoryOne;
        this.categoryTwo = response.data.data.categoryTwo;
        this.level = response.data.data.level;
        this.province = response.data.data.province;
        this.source = response.data.data.source;
        this.yearThe = response.data.data.yearThe;
      } else {
        this.$message.error("数据加载错误");
      }
    });
  }
};
</script>

<style>
.el-checkbox-group {
  font-size: 14px;
}
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
.screen {
  margin-bottom: 12px;
  text-align: left;
  font-size: 14px;
}
.screen .el-col .el-row {
  margin-top: 4px;
}
.screen .el-col {
  margin-bottom: 20px;
}
.screen-strong {
  display: inline-block;
  width: 90px;
  margin-top: 2px;
  margin-bottom: 2px;
  text-align: right;
}
</style>
