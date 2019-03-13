<template>
  <el-col :span="24">
    <el-menu
      router
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="adminUser">
        <i class="el-icon-service"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>基础数据管理</span>
        </template>
        <el-menu-item index="adminUniversity">高校信息管理</el-menu-item>
        <el-menu-item index="adminYearthe">年份-届信息管理</el-menu-item>
        <el-menu-item index="adminCategory">作品类别信息管理</el-menu-item>
        <el-menu-item index="adminSource">成果来源信息管理</el-menu-item>
        <el-menu-item index="adminLevel">获奖等级信息管理</el-menu-item>
        <el-menu-item index="adminUnitype">高校类别信息管理</el-menu-item>
      </el-submenu>

      <el-menu-item index="adminResults">
        <i class="el-icon-menu"></i>
        <span slot="title">成果信息管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  methods: {
    
  }
};
</script>

<style>
</style>
