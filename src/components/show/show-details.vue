<template>
  <el-row>
    <h1>{{ universityName }}“挑战杯”获奖情况</h1>
    <el-row>
      <el-col :span="12">
        <div id="polylineCharts" class="charts"></div>
      </el-col>
      <el-col :span="12">
        <div id="pieCharts" class="charts"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="columnarCharts" class="charts"></div>
      </el-col>
      <el-col :span="12">
        <div id="radarCharts" class="charts"></div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      universityID: this.$route.params.id,
      universityName: null,
      levelInfo: [],
      polylineOptions: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
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
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      },
      pieOptions: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
        },
        series: [
          {
            name: "获奖数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
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
      columnarOptions: {
        legend: {},
        tooltip: {},
        dataset: {
          source: []
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: []
      },
      radarOptions: {
        tooltip: {},
        legend: {
          orient: "vertical",
          data: [],
          left: 0
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
            zoom: 0.5,
            type: "radar",
            data: []
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.$http
      .post("/works/findLevelInfoByUniversityID", {
        universityID: this.universityID
      })
      .then(response => {
        if (response.data.rtnCode == 200) {
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
                yearflag = false;
              }
            });
            if (yearflag) {
              year.push(element.yearTheName);
            }
            if (levelflag) {
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
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
}
.el-row .el-row {
  height: 50%;
}
.el-row .el-row .el-col {
  height: 100%;
}
.charts {
  height: 100%;
}
</style>
