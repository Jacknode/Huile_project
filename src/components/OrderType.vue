<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">订单类型管理</h5>
      </div>
      <div class="dataTables_filter">
        <span>订单类型名称:</span>
        <input type="text" placeholder="类型" v-model="orderType">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>订单类型编号</th>
          <th>订单类型名称</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in OrderTypeListKeyWord">
          <td>{{item.ot_Code}}</td>
          <td class="time">{{item.ot_TypeName}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="addOrderType = true"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;" @click="updateInit(item.ot_Code)"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;" @click="deleteType(item.ot_Code)"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="添加订单类型" :visible.sync="addOrderType">
      <el-form :model="formType">
        <el-form-item label="订单类型编号" :label-width="formLabelWidth">
          <el-input v-model="formType.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单类型名称" :label-width="formLabelWidth">
          <el-input v-model="formType.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrderType = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddOrderType">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改订单类型" :visible.sync="updateOrderType">
      <el-form :model="initType">
        <el-form-item label="订单类型编号" :label-width="formLabelWidth">
          <el-input v-model="initType.ot_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单类型名称" :label-width="formLabelWidth">
          <el-input v-model="initType.ot_TypeName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateOrderType = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdateOrderType">确 定</el-button>
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
        orderType:'',//绑定搜索框
        addOrderType:false,//初始化添加弹窗
        updateOrderType:false,//初始化修改弹窗
        formType:{
          id:'',
          name:''
        },//初始化添加订单类型
        formLabelWidth: '120px'
      }
    },
    //去看mutations里面的state注释
    computed:mapGetters([
        'OrderTypeList',
        'OrderTypeListKeyWord',
        'initType'
    ]),
    methods:{
      //订单类型筛选
      search(){
        this.$store.commit('searchOrderKeyWord',this.orderType)
      },
      //订单添加提交
      dialogAddOrderType(){
        this.$http.post('/api/AddOrderType',{
          orderTypeCode:this.formType.id,
          orderTypeName:this.formType.name
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
              this.$store.commit('addOrderType',{
                ot_Code:this.formType.id,
                ot_TypeName:this.formType.name
              })
            }
            this.addOrderType = false
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //订单类型初始化
      updateInit(id){
        this.updateOrderType = true;
        this.$store.commit('initUpdateType',id)
      },
      //订单类型修改
      dialogUpdateOrderType(){
        this.$http.post('/api/UpdateOrderType',{
          orderTypeCode:this.initType.ot_Code,
          orderTypeName:this.initType.ot_TypeName
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
              this.$store.commit('updateNewOrderType',{
                ot_Code:this.initType.ot_Code,
                ot_TypeName:this.initType.ot_TypeName
              })
            }
            this.updateOrderType = false
          })
          .catch(err=>{
            console.log(err);
          })
      },
      //订单删除
      deleteType(id){
        this.$http.post('/api/DeleteOrderType',{
          orderTypeCode:id
        })
          .then(data=>{
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$store.commit('filterOrderType',id);
            }
            this.$message({
              showClose: true,
              message: code.backResult,
              type: 'success'
            });
          })
          .catch(err=>{
            console.log(err)
          })
      }
    },
    mounted(){
      //初始化订单类型数据
      this.$http.post('/api/GetOrderTypeList',{
        orderTypeCode:''
      })
        .then(data=>{
          var data = JSON.parse(data.data.d);
          if(data.backCode=='200'){
            this.$store.commit('initOrderType',data.orderType);
            this.$store.commit('initOrderTypeKeyWord',data.orderType);
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  }
</script>
<style scoped>

</style>
