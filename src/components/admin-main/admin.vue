<template>
  <div id="app">
    <el-container>
      <el-header>
        <admin-header></admin-header>
      </el-header>
      <div class="line"></div>
      <el-container>
        <el-aside width="200px">
          <admin-left></admin-left>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import adminHeader from "@/components/admin-common/admin-header.vue";
import adminLeft from "@/components/admin-common/admin-left.vue";

export default {
  name: "app",
  components: {
    adminHeader: adminHeader,
    adminLeft: adminLeft
  }
};
</script>

<style scope>
.line {
  height: 1px;
  background-color: #e0e6ed;
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
