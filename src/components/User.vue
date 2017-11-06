<template>
    <div>
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">用户信息</h5>
        </div>
        <div class="dataTables_filter">
          <span>用户筛选:</span>
          <input type="text" placeholder="用户名" v-model="username">
          <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        </div>
        <table class="table datatable-show-all">
          <thead>
          <tr>
            <th>用户编码</th>
            <th>用户名称</th>
            <th>身份证号码</th>
            <th>电话号码</th>
            <th>用户创建时间</th>
            <th>备注</th>
            <th class="text-center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item,index in userInfoListKeyWord">
            <td>{{item.ui_ID}}</td>
            <td><a href="#">{{item.ui_Name}}</a></td>
            <td>{{item.ui_CertNo}}</td>
            <td>{{item.ui_Phone}}</td>
            <td class="time">{{item.ui_CreateTime}}</td>
            <td class="time">{{item.ui_Remark?item.ui_Remark:'暂无备注'}}</td>
            <td class="text-center">
              <ul class="icons-list">
                <li class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="javascript:;" @click="dialogFormVisible = true"><i class="icon-add"></i>添加 </a></li>
                    <li><a href="javascript:;" @click="updateUser(item.ui_UserCode)"><i class="icon-pencil"></i> 修改</a></li>
                    <li><a href="javascript:;" @click="updatePasswordUser(item.ui_UserCode)"><i class="icon-pencil7"></i> 密码修改</a></li>
                    <li><a href="javascript:;" @click="deleteUser(item.ui_UserCode)"><i class="icon-delicious"></i> 删除</a></li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--用户添加-->
      <el-dialog title="用户添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户编号" :label-width="formLabelWidth">
            <el-input v-model="form.userCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="form.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit" :plain="true">提交</el-button>
        </div>
      </el-dialog>
      <!--用户修改-->
      <el-dialog title="用户修改" :visible.sync="dialogFormVisibleUpdate">
        <el-form :model="newForm">
          <el-form-item label="用户编号" :label-width="formLabelWidth">
            <el-input v-model="newForm.ui_ID" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="newForm.ui_Name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="newForm.ui_Phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" :label-width="formLabelWidth">
            <el-input v-model="newForm.ui_CertNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="newForm.ui_Remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleUpdate = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit" :plain="true">提交</el-button>
        </div>
      </el-dialog>
      <!--密码修改-->
      <el-dialog title="修改密码" :visible.sync="dialogFormUpdatePassword">
        <el-form :model="formPassword">
          <el-form-item label="用户账号" :label-width="formLabelWidth">
            <el-input v-model="formPassword.userCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" :label-width="formLabelWidth">
            <el-input v-model="formPassword.oldPassword" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="formPassword.newPassword" auto-complete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormUpdatePassword = false">取 消</el-button>
          <el-button type="primary" @click="dialogUpdatePassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import dateFormat from '../assets/js/dateFormat'
  import publicInit from '../assets/js/public'
  export default{
    name: '',
    data(){
      return {
        username:'',
        dialogFormVisible: false,
        dialogFormVisibleUpdate:false,
        dialogFormUpdatePassword:false,
        form: {
          userName: '',
          userCode: '',
          phone: '',
          password:''
        },
        formPassword:{
          userCode:'',
          oldPassword:'',
          newPassword:''
        },
        formLabelWidth: '120px',
      }
    },
    methods:{
      //查询
      search(){
        this.$store.commit('searchKeyWord',this.username)
      },
      //初始化修改数据
      updateUser(id){
        this.dialogFormVisibleUpdate = true;
        this.$store.commit('initUpdateUser',id)
      },
      //添加用户提交
      addSubmit(){
        this.$http.post('/api/AddUser',this.form)
          .then(data=>{
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$message({
                showClose: true,
                message: code.backResult,
                type: 'success'
              });
              var date = new Date();
              this.$store.commit('addNewUser',{
                ui_UserCode:this.form.userCode,
                ui_Name:this.form.userName,
                ui_Phone:this.form.phone,
                ui_CreateTime:dateFormat("yyyy/MM/dd hh:mm:ss",date)
              })
            }
            this.dialogFormVisible = false
          })
          .catch(err=>{
            console.log(err)
          })
      },
      addUser(){
        console.log('添加')
      },
      //修改用户提交
      updateSubmit(){
        this.$http.post('/api/UpdateUserInfo',{
          userID:this.newForm.ui_ID,
          userCode:this.newForm.ui_UserCode,
          userName:this.newForm.ui_Name,
          certNo:this.newForm.ui_CertNo,
          phone:this.newForm.ui_Phone,
          remark:this.newForm.ui_Remark
        })
          .then(data=>{
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$message({
                showClose: true,
                message: code.backResult,
                type: 'success'
              });
              var date = new Date();
              this.$store.commit('updateNewUser',{
                userID:this.newForm.ui_ID,
                userCode:this.newForm.ui_UserCode,
                userName:this.newForm.ui_Name,
                certNo:this.newForm.ui_CertNo,
                phone:this.newForm.ui_Phone,
                remark:this.newForm.ui_Remark,
                createTime:dateFormat("yyyy/MM/dd hh:mm:ss",date)
              })
            }
            this.dialogFormVisibleUpdate = false
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //删除用户
      deleteUser(id){
        this.$http.post('/api/DeleteUserInfo',{
          userCode:id
        })
          .then(data=>{
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$store.commit('filterUserInfo',id);
            }
            this.$message({
              showClose: true,
              message: code.backResult,
              type: 'success'
            });
          })
          .catch(err=>{
            console.log(err);
          })
      },
      //密码修改
      updatePasswordUser(userCode){
        this.dialogFormUpdatePassword = true;
        this.formPassword.userCode = userCode;
      },
      //密码修改提交
      dialogUpdatePassword(){
        this.dialogFormUpdatePassword = false;
        this.$http.post('/api/UpdateUserInfoPassword',{
          userCode:this.formPassword.userCode,
          oldPassword:this.formPassword.oldPassword,
          newPassword:this.formPassword.newPassword
        })
          .then(data=>{
            console.log(data)
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$message({
                showClose: true,
                message: code.backResult,
                type: 'success'
              });
            }
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
    computed:mapGetters([
      'userInfoList',
      'userInfoListKeyWord',
      'newForm'
    ]),
    mounted(){
      this.$http.post(`/api/GetUserInfoList`,{
        condition:'dadada',
        key:'dada'
      })
        .then(data=>{
          var data = JSON.parse(data.data.d);
          if(Number(data.backCode)===200){
            this.$store.commit('setUserInfoList',data.userInfo)
            this.$store.commit('setSearchKeyWord',data.userInfo)
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
</script>
<style scoped>
  label{
    margin-bottom: 6px;
    font-weight: 400;
  }
</style>
