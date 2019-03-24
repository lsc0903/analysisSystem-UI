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
      levelSumInfo: [],
      level: [],
      university: [],
      columnarOption: {
        legend: {},
        tooltip: {},
        dataset: {
          source: []
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: []
      },
      polylineOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      },
      radarOption: {
        tooltip: {},
        legend: {
          data: []
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: []
        },
        series: [
          {
            type: "radar",
            data: []
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
        },
        series: [
          {
            name: "获奖总量",
            type: "pie",
            data: []
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

  methods: {
    search() {
      this.$options.methods.toSearch(this);
    },
    toSearch(_this) {
      _this.$http
        .post("/works/findLevelInfoByParam", {
          type: _this.comparedTypeValue,
          data: _this.comparedOptionsValues
        })
        .then(response => {
          if (response.data.rtnCode == 200) {
            _this.level = [];
            _this.university = [];
            _this.levelInfo = response.data.data.levelInfo;
            _this.levelSumInfo = response.data.data.levelSumInfo;
            //构造获奖等级，年份届，高校数组-------------开始
            _this.levelInfo.forEach(element => {
              var levelflag = true;
              var universityflag = true;
              _this.level.forEach(el => {
                if (el == element.levelName) {
                  levelflag = false;
                }
              });
              _this.university.forEach(el => {
                if (el == element.universityName) {
                  universityflag = false;
                }
              });
              if (levelflag) {
                _this.level.push(element.levelName);
              }
              if (universityflag) {
                _this.university.push(element.universityName);
              }
            });
            //构造获奖等级，年份届，高校数组-------------结束

            //构造柱状图options-------------------开始
            //类型，图例
            let columnarLevel = new Array();
            columnarLevel = columnarLevel.concat(_this.level);
            columnarLevel.unshift("product");
            let columnarData = new Array();
            columnarData.push(columnarLevel);
            _this.university.forEach(universityElement => {
              let columnarSourceData = new Array();
              columnarSourceData.push(universityElement);
              _this.level.forEach(columnarLevelElement => {
                let flag = true;
                _this.levelInfo.forEach(element => {
                  if (
                    element.levelName == columnarLevelElement &&
                    element.universityName == universityElement
                  ) {
                    columnarSourceData.push(element.sum);
                    flag = false;
                  }
                });
                if (flag) {
                  columnarSourceData.push(0);
                }
              });
              columnarData.push(columnarSourceData);
            });
            let columnarSeries = new Array();
            _this.level.forEach(ele => {
              columnarSeries.push({ type: "bar" });
            });
            _this.columnarOption.series = columnarSeries;
            _this.columnarOption.dataset.source = columnarData;
            _this.$echarts
              .init(document.getElementById("columnarCharts"))
              .setOption(_this.columnarOption,true);
            //构造柱状图options-------------------结束

            //构造雷达图options-------------------开始
            //几边
            let radarIndicator = [];
            _this.level.forEach(element => {
              radarIndicator.push({name: element, max: 10})
            });
            //数据
            let radarData = [];
            _this.university.forEach(uniElement => {
              let data = {};
              let value = [];
              radarIndicator.forEach(indElement =>{
                let flag = true;
                _this.levelInfo.forEach(element => {
                    if(element.universityName == uniElement && element.levelName == indElement.name){
                      flag = false;
                      value.push(element.sum);
                    }
                });
                if(flag){
                  value.push(0);
                }
              });
              data.name = uniElement;
              data.value = value;
              radarData .push(data);
            });
            console.log(radarData);
            _this.radarOption.series[0].data =  radarData;
            _this.radarOption.radar.indicator = radarIndicator;
            //图例
            _this.radarOption.legend.data = _this.university;
            _this.$echarts
              .init(document.getElementById("radarCharts"))
              .setOption(_this.radarOption,true);
            //构造雷达图options-------------------结束

            //构造饼图options-------------------开始
            let pieData = [];
            _this.levelSumInfo.forEach(element => {
              pieData.push({name:element.name, value:element.sum})
            });
            console.log(pieData);
            _this.pieOption.series[0].data = pieData;
            _this.$echarts
              .init(document.getElementById("pieCharts"))
              .setOption(_this.pieOption,true);
            //构造饼图options-------------------结束
          } else {
            _this.$message.error("数据加载错误");
          }
        });

      _this.$http
        .post("/works/findPolylineLevelInfoByParam", {
          type: _this.comparedTypeValue,
          data: _this.comparedOptionsValues
        })
        .then(response => {
          if (response.data.rtnCode == 200) {
            //构造折线图options-------------------开始
            let polyLineLevelInfo = response.data.data.levelInfo;
            //高校信息，年份信息，
            let polyLineUniversity = new Array;
            let polyLineYear = response.data.data.yearTheOptions;
            polyLineLevelInfo.forEach(element => {
              let universityFlag = true;
              polyLineUniversity.forEach(uElement => {
                if(uElement == element.universityName){
                  universityFlag = false;
                }
              });
              if(universityFlag){
                polyLineUniversity.push(element.universityName)
              }
            });
            let polyLineSeries = new Array;
            polyLineUniversity.forEach(universityElement => {
              let seriesData = {};
              seriesData.name = universityElement;
              seriesData.type = "line";
              let data = new Array;
              polyLineYear.forEach(yearElement => {
                let flag = true;
                polyLineLevelInfo.forEach(element => {
                  if(element.universityName == universityElement && element.yearName == yearElement){
                    flag = false;
                    data.push(element.sum);
                  }
                });
                if(flag){
                  data.push(0);
                }
              });
              seriesData.data = data;
              polyLineSeries.push(seriesData); 
            });
            _this.polylineOption.series = polyLineSeries;
            _this.polylineOption.legend.data = polyLineUniversity;
            _this.polylineOption.xAxis.data = polyLineYear;
            _this.$echarts
              .init(document.getElementById("polylineCharts"))
              .setOption(_this.polylineOption,true);
            //构造折线图options-------------------结束
          } else {
            _this.$message.error("折线图数据加载错误");
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
      this.$options.methods.toSearch(this);
    }
  },
  mounted() {
    this.toSearch(this);
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
