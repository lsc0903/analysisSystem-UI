<template>
  <div>
    <h1>高校类型信息</h1>
    <el-button size="mini" type="success" @click="addUniType()">新增</el-button>
    <el-button size="mini" type="danger" @click="deleteUniType()">删除</el-button>

    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange"></el-table-column>
      <el-table-column label="编码" prop="uni_type_coding"></el-table-column>
      <el-table-column label="名称" prop="uni_type_name"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            @keyup.enter.native="handleSearch"
            placeholder="输入关键字搜索"
          />
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
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 弹出框 -->
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :before-close="cancelPerform">
      <el-form v-loading="formLoading" :model="form" :rules="rules" ref="form">
        <el-form-item label="高校类型名称" :label-width="formLabelWidth" prop="uni_type_name">
          <el-input v-model="form.uni_type_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="高校类型编码" :label-width="formLabelWidth" prop="uni_type_coding">
          <el-input v-model="form.uni_type_coding" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPerform">取 消</el-button>
        <el-button type="primary" @click="performSaveUniType('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 定义model，tableData：表格数据，search：搜索关键词，currentPage:当前页码，total：记录总条数,pageSize
    return {
      formLoading: false,
      tableLoading: false,
      dialogFormVisible: false,
      form: {
        uni_type_id: null,
        uni_type_name: "",
        uni_type_coding: ""
      },
      rules: {
        uni_type_name: [
          {
            required: true,
            message: "请输入高校类型名称",
            trigger: "blur"
          }
        ],
        uni_type_coding: [
          {
            required: true,
            message: "请输入高校类型编码",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px",
      tableData: [],
      search: "",
      currentPage: 1,
      total: 0,
      pageSize: 10,
      multipleSelection: [],
      formTitle: "新增"
    };
  },
  methods: {
    // 重置form数据，并关闭弹出层
    reset(val) {
      const _this = val;
      _this.$refs["form"].resetFields();
      _this.form.uni_type_id = null;
      _this.form.uni_type_name = "";
      _this.form.uni_type_coding = "";
      _this.dialogFormVisible = false;
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach(element => {
        this.multipleSelection.push(element.uni_type_id);
      });
    },
    // 取消
    cancelPerform() {
      this.$options.methods.reset(this);
    },
    // 弹出新增页面
    addUniType() {
      const _this = this;
      _this.formTitle = "新增";
      _this.dialogFormVisible = true;
    },
    // 点击修改执行的函数
    handleEdit(row) {
      const _this = this;
      _this.formTitle = "编辑";
      //根据id获取信息
      _this.$http
        .get("/api/findUniTypeByID", {
          params: { uni_type_id: row.uni_type_id }
        })
        .then(response => {
          _this.dialogFormVisible = true;
          if (response.data.rtnCode == 200) {
            _this.form.uni_type_name = response.data.data.uni_type_name;
            _this.form.uni_type_id = response.data.data.uni_type_id;
            _this.form.uni_type_coding = response.data.data.uni_type_coding;
          } else {
            _this.$message.error("服务出现问题，请稍后重试");
          }
        });
    },
    performSaveUniType() {
      const _this = this;
      _this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          _this.formLoading = true;
          if (_this.form.uni_type_id == null) {
            _this.$http
              .post("/api/insertUniType", _this.form)
              .then(response => {
                _this.formLoading = false;
                if (response.data.rtnCode == 200) {
                  _this.$message.success("保存成功");
                } else {
                  _this.$message.error("保存失败");
                }
                _this.$options.methods.reset(_this);
                _this.$options.methods.performPage(_this);
              });
          } else {
            _this.formLoading = true;
            _this.$http
              .post("/api/updateUniType", _this.form)
              .then(response => {
                _this.formLoading = false;
                if (response.data.rtnCode == 200) {
                  _this.$message.success("保存成功");
                } else {
                  _this.$message.error("保存失败");
                }
                _this.$options.methods.reset(_this);
                _this.$options.methods.performPage(_this);
              });
          }
        }
      });
    },
    // 批量删除
    deleteUniType() {
      const _this = this;
      if (_this.multipleSelection.length > 0) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            _this.$http
              .delete("/api/deleteUniType", {
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
          })
          .catch(() => {});
      } else {
        _this.$message.warning("请先选择数据");
      }
    },
    //点击删除执行的函数
    handleDelete(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          const _this = this;
          _this.$http
            .delete("/api/deleteUniTypeByID", {
              data: row.uni_type_id
            })
            .then(response => {
              if (response.data.rtnCode == 200) {
                _this.$message.success("删除成功");
                _this.$options.methods.performPage(_this);
              } else {
                _this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {});
    },
    // 点击修改Pagesize执行的函数
    handleSizeChange(val) {
      const _this = this;
      _this.pageSize = val;
      _this.$options.methods.performPage(_this);
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
      _this.tableLoading = true;
      _this.$http
        .post("/api/findUniTypeListByPage", {
          search: _this.search,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        })
        .then(response => {
          //记录总条数
          _this.total = response.data.data.total;
          //将修改后的数据赋值给tableData
          _this.tableData = response.data.data.uniTypelist;
          _this.tableLoading = false;
        });
    }
  },
  //wei搜索框绑定事件
  created: function() {
    let _this = this;
    _this.tableLoading = true;
    //发送请求，获取数据
    this.$http
      .post("/api/findUniTypeListByPage", {
        //当前页0，PageSize400
        currentPage: 1,
        pageSize: 10
      })
      .then(response => {
        //回调，判断返回数据的code是否为200
        if (response.data.rtnCode == 200) {
          //记录总条数
          this.total = response.data.data.total;
          //将修改后的数据赋值给tableData
          _this.tableData = response.data.data.uniTypelist;
          _this.tableLoading = false;
        } else {
          _this.tableLoading = false;
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
