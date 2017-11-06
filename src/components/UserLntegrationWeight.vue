<template>
    <div>
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">积分权重信息</h5>
        </div>
        <div class="dataTables_filter">
          <span>权重名称筛选:</span>
          <input type="text" placeholder="权重名称" v-model="orderDetail">
          <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        </div>
        <table class="table datatable-show-all">
          <thead>
          <tr>
            <th>权重编码</th>
            <th>权重名称</th>
            <th>权重所占比例</th>
            <th class="text-center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in userLntegrationWeightKeyWord">
            <td>{{item.hm_ID}}</td>
            <td>{{item.hm_Name}}</td>
            <td class="time">{{item.hm_Percent}}</td>
            <td class="text-center">
              <ul class="icons-list">
                <li class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-menu9"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="javascript:;" @click="addUserLntegrationWeight = true"><i class="icon-add"></i>添加 </a></li>
                    <li><a href="javascript:;" @click="UpdateLntegrationWeight(item.hm_Code)"><i class="icon-pencil"></i> 修改</a></li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <el-dialog title="添加权重" :visible.sync="addUserLntegrationWeight">
        <el-form :model="LntegrationWeight">
          <el-form-item label="权重编码" :label-width="formLabelWidth">
            <el-input v-model="LntegrationWeight.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权重名称" :label-width="formLabelWidth">
            <el-input v-model="LntegrationWeight.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权重所占比例" :label-width="formLabelWidth">
            <el-input v-model="LntegrationWeight.percent" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserLntegrationWeight = false">取 消</el-button>
          <el-button type="primary" @click="dialogAddUserLntegrationWeight">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改权重" :visible.sync="updateUserLntegrationWeight">
        <el-form :model="initLntegrationWeight">
          <el-form-item label="权重编码" :label-width="formLabelWidth">
            <el-input v-model="initLntegrationWeight.hm_Code" auto-complete="off"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="权重名称" :label-width="formLabelWidth">
            <el-input v-model="initLntegrationWeight.hm_Name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="权重所占比例" :label-width="formLabelWidth">
            <el-input v-model="initLntegrationWeight.hm_Percent" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateUserLntegrationWeight = false">取 消</el-button>
          <el-button type="primary" @click="dialogUpdateLntegrationWeight">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public' //根据返回backCode的弹窗函数
  export default{
    name: '',
    data(){
      return {
        orderDetail:'',//初始化搜索
        addUserLntegrationWeight:false,//初始化添加弹窗
        updateUserLntegrationWeight:false,
        LntegrationWeight:{
          code:'',
          name:'',
          percent:''
        },//权重form对象
        formLabelWidth: '120px'
      }
    },
    computed:mapGetters([
        'userLntegrationWeightKeyWord',
        'initLntegrationWeight'
    ]),
    methods:{
      //筛选
      search(){
        this.$store.commit('searchLntegrationWeightKeyWord',this.orderDetail)
      },
      //初始化渲染权重信息
      initData(){
        this.$http.post('/api/GetHeightPercent',{
          hmCode:'',
          hmPersent:''
        })
          .then(data=>{
            var data = JSON.parse(data.data.d);
            if(data.backCode=='200'){
              this.$store.commit('initUserLntegrationWeight',data.heightManage);
              this.$store.commit('initUserLntegrationWeightKeyWord',data.heightManage);
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //添加积分权重
      dialogAddUserLntegrationWeight(){
        this.$http.post('/api/AddHeightItem',{
          hmCode:this.LntegrationWeight.code,
          hmName:this.LntegrationWeight.name,
          percent:this.LntegrationWeight.percent
        })
          .then(data=>{
            console.log(JSON.parse(data.data.d))
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$message({
                showClose: true,
                message: code.backResult,
                type: 'success'
              });
              this.$store.commit('AddHeightItem',{
                hmCode:this.LntegrationWeight.code,
                hmName:this.LntegrationWeight.name,
                percent:this.LntegrationWeight.percent
              })
            }
            this.addUserLntegrationWeight = false
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //修改积分权重
      UpdateLntegrationWeight(code){
        this.updateUserLntegrationWeight = true;
        this.$store.commit('initUpdateLntegrationWeight',code)
      },
      //修改积分权重
      dialogUpdateLntegrationWeight(){
        this.$http.post('/api/UpdateHeightPercent',{
          hmCode:this.initLntegrationWeight.hm_Code,
          hmPersent:this.initLntegrationWeight.hm_Percent
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
              this.$store.commit('updateNewLntegrationWeight',this.initLntegrationWeight)
            }
            this.updateUserLntegrationWeight = false
          })
          .catch(err=>{
            console.log(err)
          })
      }
    },
    mounted(){
      this.initData()
    }
  }
</script>
<style scoped>

</style>
