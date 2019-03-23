<template>
  <el-row class="map">
    <el-col :span="12" class="map">
      <div id="mapEchart" class="map"></div>
    </el-col>
    <el-col :span="12" class="map">
      <el-row class="row-map">
        <el-col :span="24" class="map">
          <div id="breadEchart" class="map"></div>
        </el-col>
      </el-row>
      <el-row class="row-map">
        <el-col :span="24" class="map">
          <div id="stackEchart" class="map"></div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import "echarts/map/js/china.js";
export default {
  data() {
    return {
      mapOption: {
        //标题
        title: {
          text: "全国“挑战杯”成果分布图",
          subtext: "data from “挑战杯”大赛",
          x: "center"
        },
        //鼠标再点上的时候显示的内容
        tooltip: {
          show: true,
          formatter: function(params) {
            return params.name + " : " + params.value[2];
          }
        },

        //对地图的渲染
        geo: {
          map: "china",
          scaleLimit: {
            min: 1,
            max: 10
          },
          roam: true,
          label: {
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#409eff"
            }
          }
        },
        //系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: 12,
            label: {
              normal: {
                formatter: "{b}：{@[2]}",
                show: true,
                position: "right",
                distance: 5,
                color: "#030303",
                fontWeight: "bold",
                fontSize: 16
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          }
        ]
      },
      stackOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "获奖总数",
            type: "bar",
            barWidth: "60%",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: []
          }
        ]
      },
      breadOption: {
        title: {
          text: "全国“挑战杯”成果占比图",
          subtext: "data from “挑战杯”大赛",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "获奖",
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
      }
    };
  },
  mounted() {
    this.$http.get("/works/findIndexOption").then(response => {
      if (response.data.rtnCode == 200) {
        var opData = response.data.data;
        this.mapOption.series[0].data = opData;
        this.$echarts
          .init(document.getElementById("mapEchart"))
          .setOption(this.mapOption);

        var brData = [];
        opData.forEach((element, index) => {
          var obj = {};
          obj.name = element.name;
          obj.value = element.value[2];
          brData[index] = obj;
        });
        this.breadOption.series[0].data = brData;
        this.$echarts
          .init(document.getElementById("breadEchart"))
          .setOption(this.breadOption);

        var xdata = [];
        var serdata = [];
        response.data.data.forEach((element, index) => {
          xdata[index] = element.name;
          serdata[index] = element.value[2];
        });
        this.stackOption.xAxis[0].data = xdata;
        this.stackOption.series[0].data = serdata;
        this.$echarts
          .init(document.getElementById("stackEchart"))
          .setOption(this.stackOption);
      } else {
        this.$message.error("数据加载失败");
      }
    });
  },
  methods: {}
};
</script>

<style>
.row-map {
  height: 50%;
}
.map {
  height: 100%;
}
</style>
