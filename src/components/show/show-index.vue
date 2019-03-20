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
      mapOptions: {
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
            data: [{ name: "海门大学", value: [116.29, 37.45, 9] }],
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
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告"]
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
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      },
      breadOptions: {
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
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
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
      }
    };
  },
  mounted() {
    this.$echarts
      .init(document.getElementById("mapEchart"))
      .setOption(this.mapOptions);
    this.$echarts
      .init(document.getElementById("stackEchart"))
      .setOption(this.stackOption);
    this.$echarts
      .init(document.getElementById("breadEchart"))
      .setOption(this.breadOptions);
  },
  methods: {}
};
</script>

<style scope>
.row-map {
  height: 50%;
}
.map {
  height: 100%;
}
</style>
