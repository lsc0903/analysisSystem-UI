<template>
  <div>
    <h1>作品类别信息</h1>
    <el-button size="mini" type="success" @click="addCategory()">新增</el-button>
    <el-button size="mini" type="danger" @click="deleteCategory()">删除</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange"></el-table-column>
      <el-table-column label="编码" prop="category_coding"></el-table-column>
      <el-table-column label="类型" prop="category_type"></el-table-column>
      <el-table-column label="名称" prop="category_name"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" v-on:keyup.enter placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <!-- 传的是当前行的数据信息 -->
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // 定义model，tableData：表格数据，search：搜索关键词，currentPage:当前页码，total：记录总条数,pageSize
    return {
      tableData: [],
      search: "",
      currentPage: 1,
      total: 0,
      pageSize: 10,
      multipleSelection: []
    };
  },
  methods: {
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach(element => {
        this.multipleSelection.push(element.category_id);
      });
    },
    // 新增
    addCategory() {
      this.$message.success("新增");
    },
    // 批量删除
    deleteCategory() {
      const _this = this;
      if (_this.multipleSelection.length > 0) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        }).then(() => {
          _this.$http
            .delete("/api/deleteCategory", {
              data: _this.multipleSelection
            })
            .then(response => {
              if (response.data.rtnCode == 200) {
                _this.$message.success("删除成功");
                _this.$options.methods.performPage(_this);
              } else {
                _this.$message.error("删除失败");
              }
            });
        });
      } else {
        _this.$message.warning("请先选择数据");
      }
    },
    // 点击修改执行的函数
    handleEdit(row) {
      // 获取当前行的id信息
      console.log(row.category_id);
      this.$message.success("编辑");
    },
    //点击删除执行的函数
    handleDelete(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        const _this = this;
        var categoryid = row.category_id;
        _this.$http
          .delete("/api/deleteCategoryByID", {
            data: categoryid
          })
          .then(response => {
            if (response.data.rtnCode == 200) {
              _this.$message.success("删除成功");
              _this.$options.methods.performPage(_this);
            } else {
              _this.$message.error("删除失败");
            }
          });
      });
    },
    // 点击修改Pagesize执行的函数
    handleSizeChange(val) {
      const _this = this;
      _this.pageSize = val;
      _this.$options.methods.performPage().bind(_this);
    },
    //点击页码执行的函数
    handleCurrentChange(val) {
      const _this = this;
      _this.currentPage = val;
      _this.$options.methods.performPage(_this);
    },
    // 搜索的函数
    handleSearch() {
      const _this = this;
      // 当搜索时将页码定位到第一页
      _this.currentPage = 1;
      _this.$options.methods.performPage(_this);
    },
    //执行发送请求的函数
    performPage(_this) {
      _this.$http
        .post("/api/findListByPage", {
          search: _this.search,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        })
        .then(response => {
          //记录总条数
          _this.total = response.data.data.total;
          // 遍历修改数据，当type为1时显示为类型1，为2时显示为类型2
          response.data.data.categorylist.forEach(element => {
            if (element.category_type == 1) {
              element.category_type = "类型1";
            } else if (element.category_type == 2) {
              element.category_type = "类型2";
            }
          });
          //将修改后的数据赋值给tableData
          _this.tableData = response.data.data.categorylist;
        });
    }
  },
  //wei搜索框绑定事件
  created: function() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.handleSearch();
      }
    };
  },
  // vue钩子函数：创建前执行
  beforeCreate: function() {
    let _this = this;
    //发送请求，获取数据
    this.$http
      .post("/api/findListByPage", {
        //当前页0，PageSize400
        currentPage: 1,
        pageSize: 10
      })
      .then(response => {
        //回调，判断返回数据的code是否为200
        if (response.data.rtnCode == 200) {
          //记录总条数
          this.total = response.data.data.total;
          // 遍历修改数据，当type为1时显示为类型1，为2时显示为类型2
          response.data.data.categorylist.forEach(element => {
            if (element.category_type == 1) {
              element.category_type = "类型1";
            } else if (element.category_type == 2) {
              element.category_type = "类型2";
            }
          });
          //将修改后的数据赋值给tableData
          _this.tableData = response.data.data.categorylist;
        } else {
          // 如果返回的数据不对，提示数据加载失败
          _this.$message.error("加载数据失败");
          return false;
        }
      });
  }
};
</script>

<style scope>
</style>
