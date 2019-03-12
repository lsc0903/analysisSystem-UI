<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="onSubmit" type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {
   methods: {
      onSubmit() {
        let _this = this;
        this.axios.post(
          "/api/findListByCode",
          {}
        )
        .then(response => {
          if(response.data.rtnCode == 200){
            _this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1000
            });
            _this.$store.commit('SAVE_USERINFO', response.data)
            


            _this.$router.push("/")
          }else{
            _this.$message.error('登录失败');
            return false;
          }
        })
      }
    }
}
</script>

