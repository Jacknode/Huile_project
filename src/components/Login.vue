<template>
  <div>
    <div id="wrap">
      <div class="page animated zoomInDown">
        <div class="loginwarrp">
          <div class="logo">管理员登陆</div>
          <div class="login_form">
            <li class="login-item">
              <span>用户名：</span>
              <input type="text" id="username" name="UserName" class="login_input" v-model="username">
              <span id="count-msg" class="error"></span>
            </li>
            <li class="login-item">
              <span>密　码：</span>
              <input type="password" id="password" name="password" class="login_input" v-model="password">
              <span id="password-msg" class="error"></span>
            </li>
            <li class="login-sub">
              <input type="button" name="Submit" value="登录" v-on:click="login"/>
              <input type="button" name="Reset" value="重置" id="reset"/>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {POST} from '../assets/js/universal'
  export default{
    name: '',
    data(){
        return {
          username:'',
          password:''
        }
    },
    methods:{
      //登录
      login(){
//        POST('http://114.55.248.116:1001/Service.asmx/GetSceneryList',{
//          tbUserID:''
//        },(data)=>{
//          var data = JSON.parse(data);
//          if(data.backCode ==200){
//            this.$store.commit('initAgencies',data.touristBussinsesses)
//            this.$store.commit('initAgenciesKeyWord',data.touristBussinsesses)
//          }
//        })
        var _this = this;
        var localStorage = window.localStorage;
        POST('http://114.55.248.116:1001/Service.asmx/GetValidateByPassword',{
          UserID:_this.username,
          Password:_this.password
        },(data)=>{
          var data = JSON.parse(data)
          console.log(data.userInfo[0])
          if(Number(data.backCode)===200){
            localStorage.setItem('qianKeName',data.userInfo[0].ui_Name);
            _this.$router.push({ name: 'getUser' })
            window.location.reload();
          }
          _this.$store.dispatch('setUserInfo',data.userInfo[0])
        })
      }
    }
  }
</script>
<style scoped>
  #wrap{
    width: 100%;
    height: 800px;
    background: url("../assets/img/bg.jpg") no-repeat !important;
    /*background-size: cover;*/
  }
  .page{
    padding-top: 200px;
  }
  .loginwarrp{
    margin: 0 auto 0;
    width: 482px;
    padding: 30px 50px;
    background: rgb(255,255,255);
    overflow: hidden;
    font-size: 14px;
    border-radius: 10px;
  }
  .loginwarrp .logo{
    width:100%;
    height:44px;
    line-height: 44px;
    font-size: 20px;
    text-align: center;
    border-bottom:1px solid #ddd;
  }
  .loginwarrp .login_form{
    margin-top: 15px;
  }
  .loginwarrp .login_form .login-item{
    padding: 2px 8px;
    border:1px solid #dedede;
    border-radius: 8px;
    margin-top: 10px;
  }
  .loginwarrp .login_form .login_input{
    height: 35px;
    border: none;
    line-height: 35px;
    width: 200px;
    font-size: 14px;
    outline: none;
  }
  .loginwarrp .login_form .verify{
    float: left;
  }
  .loginwarrp .verify .verify_input{
    width: 160px;
  }
  .loginwarrp .verifyimg{
    height: 30px;
    margin: 20px 0 0 20px;
  }
  .loginwarrp .login-sub{
    text-align: center;
  }
  .loginwarrp .login-sub input{
    margin-top:15px;
    margin-right: 5px;
    background: #45B549;
    line-height: 35px;
    width: 140px;
    color: #FFFFFF;
    font-size: 16px;
    border: none;
    border-radius: 5px;
  }
  .loginwarrp .login-sub input:nth-of-type(1){
    float: left;
  }
  .loginwarrp .login-sub input:nth-of-type(2){
    float: right;
  }
  .loginwarrp .login_form .login-item .error{
    color: #F00;
  }

</style>
