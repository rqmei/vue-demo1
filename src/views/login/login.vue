<template>
  <div id="login" class="login-container">
    <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="login-form">
      <div class="title-container">
        <h2 class="title">用户登录中心</h2>
      </div>
      <el-form-item >
        <span class="svg-container-user">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="username" v-model="loginForm.username" placeholder="请输入用户名/手机号" auto-complete="on"
                  type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container-pwd">
          <svg-icon icon-class="password"/>
        </span>
        <el-input name="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="on"
                  :type="passwordType"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="iconPwd"></svg-icon>
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">登录
      </el-button>
      <div class="tips">
        <span>账号 : admin</span>
        <span>密码 : 随便填</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">账号 : editor</span>
        <span>密码 : 随便填</span>
      </div>
      <el-button class="thirdparty-button" type="primary">第三方登录</el-button>
    </el-form>
  </div>
</template>
<script>
import {isvalidUsername} from '@/utils/validate'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '610322197906236483',
        password: '236483'
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validate: validateUsername}],
        password: [{required: true, trigger: 'blur', validate: validatePassword}]
      },
      loading: false,
      passwordType: 'password',
      iconPwd: 'eye'
    }
  },
  methods: {
    showPwd: function () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        this.iconPwd = 'show_password'
      } else {
        this.passwordType = 'password'
        this.iconPwd = 'eye'
      }
    },
    handleLogin: function () {
      this.$refs.loginForm.validate(valid => {
        console.info(valid)
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({name: 'CurrentPlan', params: {username: '随心'}})
            // this.$router.push({path: '/plan/current', query: {username: '随心'}})
          }).catch(error => {
            console.log('handleLogin:' + error)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*@import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");*/
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        font-weight: bold;
      }
    }
    .svg-container-user {
      position: relative;
      padding: 6px ;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
    .svg-container-pwd {
      position: relative;
      padding: 6px 5px 6px 28px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
    .show-pwd {
      font-size: 16px;
      color: red;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;
  .login-container {
    .el-input {
      display: inline-block; // 行内块元素
      height: 47px;
      width: 80%;
      input {
        height: 42px;
        background: transparent;
        border: 0px;
        -webkit-appearance: none; // 改变按钮和其他控件的外观，使其类似于原生控件。
        border-radius: 0px;
        color: $light_gray;
        caret-color: $cursor; // 属性可以改变输入框插入光标的颜色
        // 表单自动填充，样式改变
        &:-webkit-autofill {
          // 盒模型的阴影：阴影的X轴(可以使用负值)    阴影的Y轴(可以使用负值)    阴影模糊值（大小）    阴影的颜色  inset 可以设置成内部阴影
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: $light_gray;
    }
  }
</style>
