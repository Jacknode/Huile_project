<template>
    <div>
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">订单信息</h5>
        </div>
        <div class="dataTables_filter">
          <span>订单号筛选:</span>
          <input type="text" placeholder="订单号" v-model="orderDetail">
          <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        </div>
        <table class="table datatable-show-all">
          <thead>
          <tr>
            <th>订单类型</th>
            <th>订单号</th>
            <th>订单价格</th>
            <th>订单创建时间</th>
            <th class="text-center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in orderListKeyWord">
            <td>{{item.oi_TypeName}}</td>
            <td>{{item.oi_OrderID}}</td>
            <td>{{item.oi_SellMoney}}元</td>
            <td class="time">{{item.oi_CreateTime}}</td>
            <td class="text-center">
              <ul class="icons-list">
                <li class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-menu9"></i>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="javascript:;" @click="deleteOrder(item.oi_OrderID)"><i class="icon-delicious"></i> 删除</a></li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  export default{
    name: '',
    data(){
      return {
        orderDetail:''
      }

    },
    computed:mapGetters([
      'orderListKeyWord'
    ]),
    methods:{
      //订单号筛选
      search(){
        this.$store.commit('searchOrderDetailKeyWord',this.orderDetail)
      },
      //删除订单
      deleteOrder(id){
        console.log(id);
        this.$http.post('/api/DeleteOrder',{
          orderCode:id
        })
          .then(data=>{
            console.log(data)
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200){
              this.$store.commit('filterOrder',id);
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

    }
  }
</script>
<style scoped>

</style>
