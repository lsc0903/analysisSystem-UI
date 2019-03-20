<template>
  <el-row>
    <el-col :span="8">
      <router-link data-v-8c30bf14 to="/" style="margin-right: 20px;text" class="ana-header-left">
        <i class="el-icon-setting"></i>
        <span>AnalysisSystem</span>
      </router-link>
    </el-col>
    <el-col :span="16">
      <el-menu mode="horizontal" router class="el-menu-right">
        <el-menu-item index="/showSearch">作品搜索</el-menu-item>
        <el-menu-item index="/showUniversityRanking">高校排行榜</el-menu-item>
        <el-menu-item index="/showContrast">对比分析</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style scope>
.el-menu-right{
  float: right;
}
.el-menu {
  background-color: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid #409eff;
  color: #909399;
}
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover
 {
  background-color: #dcdfe6;
}
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
