<!-- 登录 -->
<template lang="html">
  <div class="login">
    <p class="login_title">大虎鲸AI智投</p>
    <div class="login_box">
      <div class="logon_con">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="账号" prop="accountNum">
            <el-input type="text" style="width:260px;" v-model="ruleForm.accountNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" style="width:260px;" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <p>
          <el-button
           v-loading="isLogin"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)"
           type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else {
          callback();
        }
    };
    return{
      ruleForm: {
          accountNum: '',
          checkPass: '',
        },
        rules: {
          accountNum: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
      isLogin:false,
    }
  },
  created(){
    window.sessionStorage.clear('token')
    window.sessionStorage.clear('sessionID')
  },
  methods:{
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           this.isLogin=true;
           api.postFormAPI('mp/login',{
             'account':this.ruleForm.accountNum,
             'password':this.ruleForm.checkPass
           }).then(res=>{
             this.isLogin=false;
             if(res.data.state==1){
               window.sessionStorage.setItem('token',res.data.data.token)
               window.sessionStorage.setItem('sessionID',res.data.data.sessionid)
               this.$router.push({
                 path:'/admin',
                 query:{
                   isLogin:1
                 }
               })
             }
           })
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     },
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100vh;
  background: $tabColor;
  position: relative;
  box-sizing: border-box;
  padding-top: 240px;
  .login_title{
    width: 100%;
    text-align: center;
    color:white;
    font-size: 30px;
    font-weight: bold;
  }
  .login_box{
    width: 400px;
    height: 260px;
    background: white;
    margin:0 auto;
    margin-top: 20px;
    border-radius: 20px;
    .logon_con{
      text-align: center;
      width: 90%;
      margin:0 auto;
      box-sizing: border-box;
      padding-top:60px;
    }
    p{
      width: 100%;
      text-align: center;
    }
  }
}
</style>
