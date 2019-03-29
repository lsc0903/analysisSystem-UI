<template>
  <el-container>
    <el-form :model="form" :rules="rules" ref="form" class="login-container">
      <h3 class="title">AnalysisSystem管理系统</h3>
      <el-form-item prop="userName">
        <el-input type="text" v-model="form.userName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="logining"
          type="primary"
          style="width:100%;"
          @keyup.enter="submit"
          @click="tosubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    tosubmit(){
      this.submit(this);
    },
    submit(_this) {
      _this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          _this.logining = true;
          _this.$http
            .post("/api/login", _this.form)
            .then(response => {
              _this.logining = false;
              if (response.data.rtnCode == 200) {
                _this.$store.commit("SAVE_USERINFO", response.data.data);
                _this.$message.success("登录成功");
                _this.$router.push("admin");
              } else {
                _this.$message.error("登录失败");
              }
            })
            .catch(function() {
              _this.logining = false;
              _this.$message.error("服务器出错，请稍后重试");
            });
        }
      });
    },
    keyupEnter(_this) {
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13) {
          this.submit(_this);
        }
      };
    }
  },
  beforeCreate: function() {
    if (this.$store.state.userName != "") {
      this.$router.push("admin");
    }
    this.$options.methods.keyupEnter(this);
  }
};
</script>

<style scoped>
.login-container {
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>