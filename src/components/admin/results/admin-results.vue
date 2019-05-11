<template>
  <div>
    <h1>作品成果信息</h1>
    <el-button size="mini" type="success" @click="addWorks()">新增</el-button>
    <el-button size="mini" type="danger" @click="deleteWorks()">删除</el-button>

    <el-table
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange"></el-table-column>
      <!-- <el-table-column label="成果名称" prop="workName"></el-table-column> -->
      <el-table-column label="作品名称">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>作品名称: {{ scope.row.workName }}</p>
            <p>学校名称: {{ scope.row.universityName }}</p>
            <p>年份-届: {{ scope.row.yearTheName }}</p>
            <p>获奖等级: {{ scope.row.levelName }}</p>
            <p>来源: {{ scope.row.sourceName }}</p>
            <p>类型一: {{ scope.row.categoryOneName }}</p>
            <p>类型二: {{ scope.row.categoryTwoName }}</p>
            <p>简介: {{ scope.row.workIntroduction }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.workName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="学校名称" prop="universityName"></el-table-column>
      <!-- <el-table-column label="类型一" prop="categoryOneID"></el-table-column> -->
      <!-- <el-table-column label="类型二" prop="categoryTwoID"></el-table-column> -->
      <el-table-column label="年份-届" prop="yearTheName"></el-table-column>
      <el-table-column label="获奖等级" prop="levelName"></el-table-column>
      <el-table-column label="来源" prop="sourceName"></el-table-column>
      <!-- <el-table-column label="简介" prop="workIntroduction"></el-table-column> -->
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
        <el-form-item label="作品名" :label-width="formLabelWidth" prop="workName">
          <el-input v-model="form.workName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="高校" :label-width="formLabelWidth" prop="universityID">
          <el-select v-model="form.universityID" style="width:100%" placeholder="请选择高校">
            <el-option
              v-for="item in universityOptions"
              :key="item.university_id"
              :value="item.university_id"
              :label="item.university_name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型一" :label-width="formLabelWidth" prop="categoryOneID">
          <el-select v-model="form.categoryOneID" style="width:100%" placeholder="请选择类型一">
            <el-option
              v-for="item in categoryOneOptions"
              :key="item.category_id"
              :value="item.category_id"
              :label="item.category_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型二" :label-width="formLabelWidth" prop="categoryTwoID">
          <el-select v-model="form.categoryTwoID" style="width:100%" placeholder="请选择类型二">
            <el-option
              v-for="item in categoryTwoOptions"
              :key="item.category_id"
              :value="item.category_id"
              :label="item.category_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份届" :label-width="formLabelWidth" prop="yearTheID">
          <el-select v-model="form.yearTheID" style="width:100%" placeholder="请选择年份届">
            <el-option
              v-for="item in yearTheOptions"
              :key="item.year_the_id"
              :value="item.year_the_id"
              :label="item.year_the_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获奖等级" :label-width="formLabelWidth" prop="levelID">
          <el-select v-model="form.levelID" style="width:100%" placeholder="请选择获奖等级">
            <el-option
              v-for="item in levelOptions"
              :key="item.level_id"
              :value="item.level_id"
              :label="item.level_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作品来源" :label-width="formLabelWidth" prop="sourceID">
          <el-select v-model="form.sourceID" style="width:100%" placeholder="请选择作品来源">
            <el-option
              v-for="item in sourceOptions"
              :key="item.source_id"
              :value="item.source_id"
              :label="item.source_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作品简介" :label-width="formLabelWidth" prop="workIntroduction">
          <el-input v-model="form.workIntroduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="imgUrls">
          <el-upload
            limt="3"
            accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .PNG, .GIF"
            list-type="picture-card"
            :action="actionPath"
            :data="postData"
            :before-upload="beforeUpload"
            :limit="3"
            :on-exceed="handleExceed"
            :on-error="handleError"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-preview="handlePictureCardPreview"
            :file-list="form.imgUrls"
          >
          <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal.sync="modal">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPerform">取 消</el-button>
        <el-button type="primary" @click="performSaveWorks()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 定义model，tableData：表格数据，search：搜索关键词，currentPage:当前页码，total：记录总条数,pageSize
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      modal: false,

      actionPath: "http://upload-z1.qiniup.com",
      postData: {
        token: ""
      },

      formLoading: false,
      tableLoading: false,
      dialogFormVisible: false,

      universityOptions: [],
      categoryOneOptions: [],
      categoryTwoOptions: [],
      yearTheOptions: [],
      levelOptions: [],
      sourceOptions: [],

      form: {
        workID: null,
        universityID: null,
        universityName: null,
        categoryOneID: null,
        categoryOneName: null,
        categoryTwoID: null,
        categoryTwoName: null,
        yearTheID: null,
        yearTheName: null,
        levelID: null,
        levelName: null,
        workName: null,
        sourceID: null,
        sourceName: null,
        workIntroduction: null,
        imgUrls: []
      },
      rules: {
        universityID: [
          {
            required: true,
            message: "请选择高校"
          }
        ],
        categoryOneID: [
          {
            required: true,
            message: "请选择类型一"
          }
        ],
        categoryTwoID: [
          {
            required: true,
            message: "请选择类型二"
          }
        ],
        yearTheID: [
          {
            required: true,
            message: "请选择年份-届"
          }
        ],
        levelID: [
          {
            required: true,
            message: "请选择获奖等级"
          }
        ],
        workName: [
          {
            required: true,
            message: "请输入作品名称"
          }
        ],
        sourceID: [
          {
            required: true,
            message: "请选择作品来源"
          }
        ],
        workIntroduction: [
          {
            required: true,
            message: "请输入作品简介"
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      var tag = null;
      this.form.imgUrls.forEach((element, index) => {
        if (element.uid == element.uid) {
          tag = index;
        }
      });
      if (tag != null) {
        this.form.imgUrls.splice(tag, 1);
      }
    },
    handleSuccess(response, file) {
      var imgUrl = "http://qiniu.lsc0903.club/" + response.key;
      this.$data.form.imgUrls.push({ uid: file.uid, url: imgUrl, imgName: file.name });
    },
    handleError(err, file) {
      this.$message.warning(file.name + "上传失败");
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024;
      if (isLt2M > 500) {
        this.$message({
          message: "上传文件不能超过500kb!",
          type: "warning"
        });
        return false;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning("最多只能上传3张图片");
      if (fileList.length > 3) {
        return false;
      } else {
        return true;
      }
    },
    // 重置form数据，并关闭弹出层
    reset(val) {
      const _this = val;
      _this.$refs["form"].resetFields();
      _this.form.workID = null;
      _this.form.universityID = null;
      _this.form.categoryOneID = null;
      _this.form.categoryTwoID = null;
      _this.form.yearTheID = null;
      _this.form.levelID = null;
      _this.form.workName = null;
      _this.form.sourceID = null;
      _this.form.workIntroduction = null;
      _this.form.imgUrls = [];
      _this.dialogFormVisible = false;
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach(element => {
        this.multipleSelection.push(element.workID);
      });
    },
    // 取消
    cancelPerform() {
      this.$options.methods.reset(this);
    },
    // 弹出新增页面
    addWorks() {
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
        .get("/works/findWorksByID", {
          params: { worksID: row.workID }
        })
        .then(response => {
          _this.dialogFormVisible = true;
          if (response.data.rtnCode == 200) {
            _this.form.workID = response.data.data.workID;
            _this.form.universityID = response.data.data.universityID;
            _this.form.categoryOneID = response.data.data.categoryOneID;
            _this.form.categoryTwoID = response.data.data.categoryTwoID;
            _this.form.yearTheID = response.data.data.yearTheID;
            _this.form.levelID = response.data.data.levelID;
            _this.form.workName = response.data.data.workName;
            _this.form.sourceID = response.data.data.sourceID;
            _this.form.workIntroduction = response.data.data.workIntroduction;
            if (response.data.data.imgUrls != null) {
              _this.form.imgUrls = response.data.data.imgUrls;
            } else {
              _this.form.imgUrls = [];
            }
          } else {
            _this.$message.error("服务出现问题，请稍后重试");
          }
        });
    },
    performSaveWorks() {
      const _this = this;
      _this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          if (_this.form.workID == null) {
            _this.formLoading = true;
            _this.$http
              .post("/works/insertWorks", _this.form)
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
              .post("/works/updateWorks", _this.form)
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
    deleteWorks() {
      const _this = this;
      if (_this.multipleSelection.length > 0) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            _this.$http
              .delete("/works/deleteWorks", {
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
            .delete("/works/deleteWorksByID", {
              data: row.workID
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
        .post("/works/findWorksListByPage", {
          search: _this.search,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        })
        .then(response => {
          //记录总条数
          _this.total = response.data.data.total;
          //将修改后的数据赋值给tableData
          _this.tableData = response.data.data.workslist;
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
      .post("/works/findWorksListByPage", {
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
          _this.tableData = response.data.data.workslist;
          _this.tableLoading = false;
        } else {
          _this.tableLoading = false;
          // 如果返回的数据不对，提示数据加载失败
          _this.$message.error("加载数据失败");
          return false;
        }
      });

    _this.$http.get("/api/findCategory").then(response => {
      if (response.data.rtnCode == 200) {
        response.data.data.forEach(element => {
          if (element.category_type == 1) {
            _this.categoryOneOptions.push(element);
          }
          if (element.category_type == 2) {
            _this.categoryTwoOptions.push(element);
          }
        });
      }
    });

    _this.$http.get("/api/findAllLevel").then(response => {
      if (response.data.rtnCode == 200) {
        _this.levelOptions = response.data.data;
      }
    });

    _this.$http.get("/api/findAllSource").then(response => {
      if (response.data.rtnCode == 200) {
        _this.sourceOptions = response.data.data;
      }
    });

    _this.$http.get("/api/findAllUniversity").then(response => {
      if (response.data.rtnCode == 200) {
        _this.universityOptions = response.data.data;
      }
    });

    _this.$http.get("/api/findAllYearThe").then(response => {
      if (response.data.rtnCode == 200) {
        _this.yearTheOptions = response.data.data;
      }
    });
    var that = this;
    /**
     * 获取七牛云token
     */
    that.$http.get("/qiniu/findeQiNiuToken").then(function(res) {
      that.postData.token = res.data;
    });
  }
};
</script>

<style scope>
</style>
