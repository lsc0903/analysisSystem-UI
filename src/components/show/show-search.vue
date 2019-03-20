<template>
  <el-row>
    <el-row class="search">
      <el-col :span="12" :offset="6">
        <h1>“挑战杯”作品信息</h1>
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button type="primary" icon="el-icon-search" slot="append">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData5">
        <el-table-column type="expand">
          <template slot-scope="props">
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
              <br />
              <img v-for="item in props.row.pictures" :key="item.index" :src="item" width="50%" height="50%" class="head_pic"/>
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

<script>
export default {
  data() {
    return {
      tableData5: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          pictures: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552990370113&di=55713bdca657acb1263675f53b23ec0b&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201202%2F17%2F1929399mjwy9rjas7id9ma.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552990370113&di=55713bdca657acb1263675f53b23ec0b&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201202%2F17%2F1929399mjwy9rjas7id9ma.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552990370113&di=55713bdca657acb1263675f53b23ec0b&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201202%2F17%2F1929399mjwy9rjas7id9ma.jpg"
          ]
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
      ]
    };
  }
};
</script>

<style scope>
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
