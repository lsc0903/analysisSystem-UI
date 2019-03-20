<template>
  <div id="show" style="height: 100%;">
    <el-container directiion="vertical">
      <el-header>
        <show-header></show-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <show-footer></show-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import ShowHeader from "@/components/show-comon/show-header.vue";
import ShowFooter from "@/components/show-comon/show-footer.vue";

export default {
  name: "show",
  components: {
    showHeader: ShowHeader,
    ShowFooter: ShowFooter
  }
};
</script>

<style>
.el-header {
  border-bottom: 1px solid #dcdfe6;
  color: #333;
  line-height: 60px;
}
.el-footer {
  line-height: 60px;
  text-align: center;
  font-size: 10px;
  color: #888;
}
.el-main {
  height: 100%;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100%;
  margin:0 4cm 0 4cm;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
