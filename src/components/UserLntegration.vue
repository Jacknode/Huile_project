<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">用户积分明细</h5>
      </div>
      <div class="dataTables_filter">
        <span>用户ID:</span>
        <input type="text" placeholder="用户ID" v-model="userID">
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          format="yyyy/MM/dd HH:mm:ss"
          @change="getDateArray"
        >
        </el-date-picker>
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>用户编号</th>
          <th>权重名称</th>
          <th>积分</th>
          <th>积分时间</th>
          <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userScoreList">
          <td>{{item.usd_UserInfoID}}</td>
          <td>{{item.userScoreName}}</td>
          <td>{{item.usd_Score}}</td>
          <td>{{item.usd_CreateTime}}</td>
          <td class="time">{{item.usd_Remark}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import {getDateName} from '../assets/js/date'
  import publicInit from '../assets/js/public'

  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed:mapGetters([
        'dateArr',
        'userScoreList',
        'userLntegrationWeightKeyWord'
    ]),
    data(){
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        userID: '',
        orderDetail: '',//初始化搜索
        value4: ''
      }
    },
    methods:{
      //筛选
      search(){
        if(this.userID==''){
          this.$message({
            showClose: true,
            message: '用户编号不能为空',
            type: 'error'
          });
          return;
        }
        this.$http.post('/api/GetScoreList',{
          userInfoID:this.userID,
          fromTime:this.dateArr[0],
          endTime:this.dateArr[1]
        })
          .then(data=>{
            var code = JSON.parse(data.data.d);
            publicInit.isBackCode(code,this)
            if(Number(code.backCode)==200&&code.userScore.length){
              this.$message({
                showClose: true,
                message: code.backResult,
                type: 'success'
              });
              this.$store.commit('initUserScore',code.userScore)
            }else{
              this.$message({
                showClose: true,
                message: '查询失败',
                type: 'error'
              });
              this.$store.commit('clearUserScore')
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //获取选中时间
      getDateArray(arr){
        let dateArr = [];
        for(var i=0;i<arr.length;i++){
          dateArr.push(getDateName(arr[i],'-'));
        }
        this.$store.commit('setDate',dateArr);
      }
    },
    mounted(){
      //如果权重不存在则添加初始化
      if(!this.userLntegrationWeightKeyWord.length){
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
      }
    }
  }
</script>
<style scoped>

</style>
