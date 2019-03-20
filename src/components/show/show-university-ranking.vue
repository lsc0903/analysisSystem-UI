<template>
  <el-row>
    <el-row class="screen">
      <el-card class="box-card">
        <el-col :span="24" style="ma">
          <el-row>
            <strong class="screen-strong">地区：</strong>
            <el-checkbox v-for="item in vals" :key="item">{{item}}</el-checkbox>
          </el-row>
          <el-row>
            <strong class="screen-strong">类型一：</strong>
            <el-checkbox v-for="item in vals" :key="item">{{item}}</el-checkbox>
          </el-row>
          <el-row>
            <strong class="screen-strong">类型二：</strong>
            <el-checkbox v-for="item in vals" :key="item">{{item}}</el-checkbox>
          </el-row>
          <el-row>
            <strong class="screen-strong">来源：</strong>
            <el-checkbox v-for="item in vals" :key="item">{{item}}</el-checkbox>
          </el-row>
          <el-row>
            <strong class="screen-strong">年份-届：</strong>
            <el-checkbox v-for="item in vals" :key="item">{{item}}</el-checkbox>
          </el-row>
          <el-row>
            <strong class="screen-strong">获奖等级：</strong>
            <el-checkbox v-for="item in vals" :key="item">{{item}}</el-checkbox>
          </el-row>
        </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-table :data="tableData5" row-key="id" style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item>
                <router-link  :to="'showDetails/'+props.row.id">查看详情</router-link>
                <!-- <router-link :to="{path:'/workTaskEdit',query{id:id}}"></router-link> -->
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script scope>
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
      tableData5: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ],
      vals: ["类型一", "类型二", "类型三"]
    };
  },
  methods: {}
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
  text-align: right;
}
</style>
