<template>
  <el-row>
    <el-col :span="12" class="ana-header-left">
      <div>
        <router-link
          data-v-8c30bf14
          to="/admin"
          style="margin-right: 20px;text"
          class="ana-header-left"
        >
          <i class="el-icon-setting"></i>
          <span>AnalysisSystem</span>
        </router-link>
      </div>
    </el-col>
    <el-col :span="12" class="ana-header-right">
      <div class="ana-header-right">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="margin-right: 20px;">
            <i class="el-icon-arrow-down el-icon--right" style="margin-right: 15px"></i>王小虎
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {};
</script>
<style scope>
a[data-v-8c30bf14] {
  color: #333;
  text-decoration: none;
}
.ana-header-right {
  text-align: right;
  font-size: 12px;
}
.ana-header-left {
  text-align: left;
}
</style>

