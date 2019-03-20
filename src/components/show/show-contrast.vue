<template>
  <el-row class="dom-main">
    <el-row class="screen">
      <el-card class="box-card">
        <el-col :span="24">
          <el-row>
            <el-select v-model="value" placeholder="请选择" class="screen-select-1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              class="screen-select-2"
              v-model="value10"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in options5"
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
          <div id="stackEchart1" class="dom-main-row"></div>
        </el-col>
        <el-col :span="12" class="dom-main-row">
          <div id="stackEchart2" class="dom-main-row"></div>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="dom-main-row">
      <el-row class="dom-main-row">
        <el-col :span="12" class="dom-main-row">
          <div id="stackEchart3" class="dom-main-row"></div>
        </el-col>
        <el-col :span="12" class="dom-main-row">
          <div id="stackEchart4" class="dom-main-row"></div>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      yOption: {
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
      xOption: {
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
      bOption: {
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
      zOption: {
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      options5: [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ],
      value10: []
    };
  },
  mounted() {
    this.$echarts
      .init(document.getElementById("stackEchart1"))
      .setOption(this.zOption);
    this.$echarts
      .init(document.getElementById("stackEchart2"))
      .setOption(this.bOption);
    this.$echarts
      .init(document.getElementById("stackEchart3"))
      .setOption(this.xOption);
    this.$echarts
      .init(document.getElementById("stackEchart4"))
      .setOption(this.yOption);
  },
  methods: {}
};
</script>

<style scope>
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
