<template>
  <el-row class="dom-main">
    <el-row class="screen">
      <el-card class="box-card">
        <el-col :span="24">
          <el-row>
            <!-- 对比类型 -->
            <el-select
              v-model="comparedTypeValue"
              placeholder="请选择对比类型"
              class="screen-select-1"
              @change="typeChange"
            >
              <el-option
                v-for="item in comparedTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 对比选项 -->
            <el-select
              class="screen-select-2"
              v-model="comparedOptionsValues"
              @change="search"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择对比选项"
            >
              <el-option
                v-for="item in comparedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
    <el-row class="dom-main-row">
      <el-row class="dom-main-row">
        <el-col :span="12" class="dom-main-row">
          <div id="columnarCharts" class="dom-main-row"></div>
        </el-col>
        <el-col :span="12" class="dom-main-row">
          <div id="polylineCharts" class="dom-main-row"></div>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="dom-main-row">
      <el-row class="dom-main-row">
        <el-col :span="12" class="dom-main-row">
          <div id="radarCharts" class="dom-main-row"></div>
        </el-col>
        <el-col :span="12" class="dom-main-row">
          <div id="pieCharts" class="dom-main-row"></div>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      levelInfo: [],
      columnarOption: {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      },
      polylineOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      radarOption: {
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "销售（sales）", max: 6500 },
            { name: "管理（Administration）", max: 16000 },
            { name: "信息技术（Information Techology）", max: 30000 },
            { name: "客服（Customer Support）", max: 38000 },
            { name: "研发（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）"
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销（Actual Spending）"
              }
            ]
          }
        ]
      },
      pieOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: [
              { name: "明卞岑", value: 83440 },
              { name: "臧纪穆", value: 71565 },
              { name: "乐许史", value: 52756 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "赵阮", value: 65505 },
              { name: "蒋吕危", value: 37576 },
              { name: "罗范", value: 81095 },
              { name: "麻陶", value: 71399 },
              { name: "董尤", value: 85359 },
              { name: "奚齐", value: 33780 },
              { name: "贝孟董", value: 17505 },
              { name: "屈王韩", value: 14586 }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      // 对比类型
      comparedTypeOptions: [
        {
          value: "province",
          label: "省份"
        },
        {
          value: "university",
          label: "高校"
        }
      ],
      comparedTypeValue: "",
      // 对比选项
      comparedOptions: [],
      comparedOptionsValues: []
    };
  },
  mounted() {
    this.$echarts
      .init(document.getElementById("columnarCharts"))
      .setOption(this.columnarOption);
    this.$echarts
      .init(document.getElementById("polylineCharts"))
      .setOption(this.polylineOption);
    this.$echarts
      .init(document.getElementById("radarCharts"))
      .setOption(this.radarOption);
    this.$echarts
      .init(document.getElementById("pieCharts"))
      .setOption(this.pieOption);
  },
  methods: {
    search() {
      this.$http
      .post("/works/findLevelInfoByParam", {
        type: this.comparedTypeValue,
        data: this.comparedOptionsValues
      })
      .then(response => {
        console.log(response.data)
        if (response.data.rtnCode == 1100) {
          this.levelInfo = response.data.data.levelInfo;
          this.universityName = response.data.data.universityName;

          //折线图-------------------------开始
          var level = [];
          var year = [];
          this.levelInfo.forEach(element => {
            var levelflag = true;
            var yearflag = true;
            level.forEach(el => {
              if (el == element.name) {
                levelflag = false;
              }
            });
            year.forEach(el => {
              if (el == element.yearTheName) {
                levelflag = false;
              }
            });
            if (levelflag) {
              year.push(element.yearTheName);
            }
            if (yearflag) {
              level.push(element.name);
            }
          });

          this.polylineOptions.legend.data = level;
          this.polylineOptions.xAxis.data = year;
          var polylineSeries = [];
          level.forEach(element => {
            polylineSeries.push({
              name: element,
              type: "line",
              stack: "获奖数量",
              data: []
            });
          });
          year.forEach(yearElement => {
            polylineSeries.forEach(el => {
              var flag = true;
              this.levelInfo.forEach(element => {
                if (el.name == element.name) {
                  if (yearElement == element.yearTheName) {
                    flag = false;
                    el.data.push(element.sum);
                  }
                }
              });
              if (flag) {
                el.data.push(0);
              }
            });
          });
          this.polylineOptions.series = polylineSeries;
          this.$echarts
            .init(document.getElementById("polylineCharts"))
            .setOption(this.polylineOptions);
          //折线图----------------------------结束

          //饼状图----------------------------开始
          var levelSumInfo = response.data.data.levelSumInfo;
          var pieLevel = [];
          levelSumInfo.forEach(el => {
            pieLevel.push(el.name);
            el.value = el.sum;
          });
          this.pieOptions.legend.data = pieLevel;
          this.pieOptions.series[0].data = levelSumInfo;
          this.$echarts
            .init(document.getElementById("pieCharts"))
            .setOption(this.pieOptions);
          //饼状图----------------------------结束

          //柱状图----------------------------开始
          var source = [];
          var columnarLevel = [];
          columnarLevel = columnarLevel.concat(level)
          columnarLevel.unshift("product");
          source.push(columnarLevel);
          
          year.forEach(yearElement => {
            var data = [];
            data.push(yearElement);
            level.forEach(el => {
              var flag = true;
              this.levelInfo.forEach(element => {
                if (element.name == el) {
                  if (element.yearTheName == yearElement) {
                    data.push(element.sum);
                    flag = false;
                  }
                }
              });
              if (flag) {
                data.push(0);
              }
            });
            source.push(data);
          });
          var columnarSeries = [];
          level.forEach(element => {
            columnarSeries.push({type: 'bar'});
          });
          this.columnarOptions.dataset.source = source;
          this.columnarOptions.series = columnarSeries;
          this.$echarts
            .init(document.getElementById("columnarCharts"))
            .setOption(this.columnarOptions);
          //柱状图----------------------------结束


          //雷达图----------------------------开始

          this.radarOptions.legend.data = year;
          var radarIndicator = [];
          level.forEach(element => {
            radarIndicator.push({name:element,max:50});
          });
          this.radarOptions.radar.indicator = radarIndicator;
          var radarData = [];
          year.forEach(yearElement => {
            var seriesData = {};
            var data = [];
              seriesData.name = yearElement;
            radarIndicator.forEach(el => {
              var flag = true;
              this.levelInfo.forEach(element => {
                if (element.name == el.name) {
                  if (element.yearTheName == yearElement) {
                    data.push(element.sum);
                    flag = false;
                  }
                }
              });
              if (flag) {
                data.push(0);
              }
              seriesData.value = data;
            });
            radarData.push(seriesData);
          });
          this.radarOptions.series[0].data = radarData;
          this.$echarts
            .init(document.getElementById("radarCharts"))
            .setOption(this.radarOptions);
          //雷达图----------------------------结束
        } else {
          this.$message.error("数据加载错误");
        }
      });
    },
    typeChange() {
      this.comparedOptionsValues = [];
      this.$http
        .post("/api/findComparedTypeOptions", {
          comparedType: this.comparedTypeValue
        })
        .then(response => {
          if (response.data.rtnCode == 200) {
            this.comparedOptions = response.data.data;
          } else {
            this.$message.error("数据加载错误");
          }
        });
    }
  }
};
</script>

<style>
.dom-main-row-row {
  height: 50%;
}
.dom-main-row {
  height: 100%;
}
.dom-main {
  height: 80%;
}
.screen-select-1 {
  width: 20%;
}
.screen-select-2 {
  width: 80%;
}
.screen {
  height: 20%;
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
</style>
