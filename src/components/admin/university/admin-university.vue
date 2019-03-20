<template>
  <div>
    <h1>高校信息</h1>
    <el-button size="mini" type="success" @click="addUniversity()">新增</el-button>
    <el-button size="mini" type="danger" @click="deleteUniversity()">删除</el-button>

    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange"></el-table-column>
      <el-table-column label="编码" prop="university_coding"></el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.university_name }}</p>
            <p>编码: {{ scope.row.university_coding }}</p>
            <p>经度: {{ scope.row.longitude }}</p>
            <p>维度: {{ scope.row.dimension }}</p>
            <p>省: {{ scope.row.province }}</p>
            <p>市: {{ scope.row.city }}</p>
            <p>区县: {{ scope.row.county }}</p>
            <p>地址: {{ scope.row.address }}</p>
            <p>简介: {{ scope.row.introduction }}</p>
            <p>类别: {{ scope.row.categoryName }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.university_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column label="名称" prop="university_name"></el-table-column> -->
      <!-- <el-table-column label="经度" prop="longitude"></el-table-column> -->
      <!-- <el-table-column label="维度" prop="dimension"></el-table-column> -->
      <!-- <el-table-column label="省" prop="province"></el-table-column> -->
      <!-- <el-table-column label="市" prop="city"></el-table-column> -->
      <!-- <el-table-column label="区县" prop="county"></el-table-column> -->
      <el-table-column label="地址" prop="address"></el-table-column>
      <!-- <el-table-column label="简介" prop="introduction"></el-table-column> -->
      <el-table-column label="类别" prop="categoryName"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
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
        <el-form-item label="高校名称" :label-width="formLabelWidth" prop="university_name">
          <el-input v-model="form.university_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="高校编码" :label-width="formLabelWidth" prop="university_coding">
          <el-input v-model="form.university_coding" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省-市-区（县）" :label-width="formLabelWidth" prop="selectedOptions">
          <el-cascader
            size="large"
            :options="options"
            v-model="form.selectedOptions"
            @change="handleChange"
            style="width:100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="简介" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="form.introduction" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="类别" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" style="width:100%" placeholder="请选高校类别">
            <el-option
              v-for="item in categoryOptions"
              :key="item.uni_type_id"
              :value="item.uni_type_id"
              :label="item.uni_type_name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPerform">取 消</el-button>
        <el-button type="primary" @click="performSaveUniversity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    // 定义model，tableData：表格数据，search：搜索关键词，currentPage:当前页码，total：记录总条数,pageSize
    return {
      categoryOptions: [],
      options: regionData,
      formLoading: false,
      tableLoading: false,
      dialogFormVisible: false,
      form: {
        selectedOptions: [],
        university_id: null,
        university_name: null,
        university_coding: null,
        longitude: null,
        dimension: null,
        province: null,
        city: null,
        county: null,
        address: null,
        introduction: null,
        category: null
      },
      rules: {
        university_name: [
          {
            required: true,
            message: "请输入高校名称",
            trigger: "blur"
          }
        ],
        university_coding: [
          {
            required: true,
            message: "请输入高校编码",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "请输入高校经度",
            trigger: "blur"
          }
        ],
        dimension: [
          {
            required: true,
            message: "请输入高校维度",
            trigger: "blur"
          }
        ],
        selectedOptions: [
          {
            type: "array",
            required: true,
            message: "请选择高校省-市-区（县）",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入高校地址",
            trigger: "blur"
          }
        ],
        introduction: [
          {
            required: true,
            message: "请输入高校简介",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "请输入高校类别",
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
    //三级联动控件change时
    handleChange(value) {
      if (value.length == 1) {
        this.form.province = CodeToText[value[0]];
        this.form.city = null;
        this.form.county = null;
      } else if (value.length == 2) {
        this.form.province = CodeToText[value[0]];
        this.form.city = CodeToText[value[1]];
        this.form.county = null;
      } else if (value.length == 3) {
        this.form.province = CodeToText[value[0]];
        this.form.city = CodeToText[value[1]];
        this.form.county = CodeToText[value[2]];
      }
    },
    // 重置form数据，并关闭弹出层
    reset(val) {
      const _this = val;
      _this.$refs["form"].resetFields();
      _this.form.university_id = null;
      _this.form.university_name = null;
      _this.form.university_coding = null;
      _this.form.longitude = null;
      _this.form.dimension = null;
      _this.form.province = null;
      _this.form.city = null;
      _this.form.county = null;
      _this.form.address = null;
      _this.form.introduction = null;
      _this.form.category = null;
      _this.form.selectedOptions = [];
      _this.dialogFormVisible = false;
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach(element => {
        this.multipleSelection.push(element.university_id);
      });
    },
    // 取消
    cancelPerform() {
      this.$options.methods.reset(this);
    },
    // 弹出新增页面
    addUniversity() {
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
        .get("/api/findUniversityByID", {
          params: { universityID: row.university_id }
        })
        .then(response => {
          if (response.data.rtnCode == 200) {
            _this.form.university_id = response.data.data.university_id;
            _this.form.university_name = response.data.data.university_name;
            _this.form.university_coding = response.data.data.university_coding;
            _this.form.longitude = response.data.data.longitude;
            _this.form.dimension = response.data.data.dimension;
            _this.form.province = response.data.data.province;
            _this.form.city = response.data.data.city;
            _this.form.county = response.data.data.county;
            _this.form.address = response.data.data.address;
            _this.form.introduction = response.data.data.introduction;
            _this.form.category = response.data.data.category;
            var sele = [];
            if (null != response.data.data.province) {
              sele[0] = TextToCode[response.data.data.province].code;
            }
            if (null != response.data.data.city) {
              sele[1] =
                TextToCode[response.data.data.province][
                  response.data.data.city
                ].code;
            }
            if (null != response.data.data.county) {
              sele[2] =
                TextToCode[response.data.data.province][
                  response.data.data.city
                ][response.data.data.county].code;
            }
            _this.$set(_this.form.selectedOptions, sele);
            _this.form.selectedOptions = sele;
            _this.dialogFormVisible = true;
          } else {
            _this.$message.error("服务出现问题，请稍后重试");
          }
        });
    },
    //发送请求获取经纬度请求
    getLongitudeDimension(_this, city, address) {
      var url =
        "http://restapi.amap.com/v3/geocode/geo?key=389880a06e3f893ea46036f030c94700&s=rsv3&city=" +
        city +
        "&address=" +
        address;
      return _this.$http.get(url);
    },
    //执行保存前的处理
    performSaveUniversity() {
      const _this = this;
      _this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          var city = null;
          var address = _this.form.address;
          if (_this.form.county != null) {
            city = _this.form.county;
          } else if (_this.form.city != null) {
            city = _this.form.city;
          } else if (_this.form.province != null) {
            city = _this.form.province;
          }
          _this.$options.methods
            .getLongitudeDimension(_this, city, address)
            .then(response => {
              if (response.data.count == 1) {
                _this.$options.methods.goPerformSaveUniversity(
                  _this,
                  response.data.geocodes[0].location
                );
              } else {
                address = _this.form.university_name;
                _this.$options.methods
                  .getLongitudeDimension(_this, city, address)
                  .then(response => {
                    if (response.data.count == 1) {
                      _this.$options.methods.goPerformSaveUniversity(
                        _this,
                        response.data.geocodes[0].location
                      );
                    } else {
                      address = city;
                      _this.$options.methods
                        .getLongitudeDimension(_this, city, address)
                        .then(response => {
                          if (response.data.count == 1) {
                            _this.$options.methods.goPerformSaveUniversity(
                              _this,
                              response.data.geocodes[0].location
                            );
                          }
                        });
                    }
                  });
              }
            });
        }
      });
    },
    //执行保存
    goPerformSaveUniversity(_this, longitude_dimension) {
      var ld = longitude_dimension.split(",");
      _this.form.longitude = ld[0];
      _this.form.dimension = ld[1];
      if (_this.form.university_id == null) {
        _this.formLoading = true;
        _this.$http.post("/api/insertUniversity", _this.form).then(response => {
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
        _this.$http.post("/api/updateUniversity", _this.form).then(response => {
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
    },
    // 批量删除
    deleteUniversity() {
      const _this = this;
      if (_this.multipleSelection.length > 0) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            _this.$http
              .delete("/api/deleteUniversity", {
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
            .delete("/api/deleteUniversityByID", {
              data: row.university_id
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
        .post("/api/findUniversityListByPage", {
          search: _this.search,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        })
        .then(response => {
          //记录总条数
          _this.total = response.data.data.total;
          //将修改后的数据赋值给tableData
          _this.tableData = response.data.data.universitylist;
          _this.tableLoading = false;
        });
    }
  },
  //wei搜索框绑定事件
  created: function() {
    let _this = this;
    _this.tableLoading = true;
    //发送请求，获取数据
    _this.$http
      .post("/api/findUniversityListByPage", {
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
          _this.tableData = response.data.data.universitylist;
          _this.tableLoading = false;
        } else {
          _this.tableLoading = false;
          // 如果返回的数据不对，提示数据加载失败
          _this.$message.error("加载数据失败");
          return false;
        }
      });

    _this.$http.get("/api/findAllUniType").then(response =>{
      if(response.data.rtnCode == 200){
        _this.categoryOptions = response.data.data;
      }
    });
  }
};
</script>

<style scope>
</style>
