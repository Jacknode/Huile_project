import getters from './getters';
const state ={
  //初始化动画
  transtionActive:{
    isActive:false,
    isRotateInDownRight:false
  },
  userInfo:{},
  userInfoList:[],
  userInfoListKeyWord:[],
  initUser:{},
  //订单类型
  OrderTypeList:[],
  OrderTypeListKeyWord:[],
  initType:{},
  //订单详情
  orderList:[],
  orderListKeyWord:[],
  //积分权重
  userLntegrationWeight:[],
  userLntegrationWeightKeyWord:[],
  initLntegrationWeight:{},//初始化修改权重
  dateArr:[],//开始日期和结束日期
  userScoreList:[],//用户积分明细
};
const mutations = {
  //初始化动画
  setTranstionFalse(state){
    state.transtionActive = {
      isActive:false,
      isRotateInDownRight:false
    }
  },
  oPTranstionFalse(){
    state.transtionActive = {
      isActive:!state.transtionActive.isActive,
      isRotateInDownRight:!state.transtionActive.isRotateInDownRight
    }
  },
  //登录信息
  setUserInfo(state,userInfo){
    state.userInfo = userInfo;
  },
  //初始化用户信息
  setUserInfoList(state,newUserInfoList){
    state.userInfoList = newUserInfoList;
  },
  setSearchKeyWord(state,newUserInfoList){
    state.userInfoListKeyWord = newUserInfoList;
  },
  //用户搜索筛选
  searchKeyWord(state,keyWord){
    state.userInfoListKeyWord = state.userInfoList.filter(item=>{
      var str = item.ui_Name;
      if(str.includes(keyWord)){
        return true;
      }
      return false;
    })
  },
  //添加用户
  addNewUser(state,user){
    state.userInfoList.push(user)
    state.userInfoListKeyWord.push(user)
  },
  //修改用户使用数据
  initUpdateUser(state,id){
    let data = state.userInfoListKeyWord.filter(item=>{
      if(item.ui_UserCode==id){
        return true
      }
      return false
    })[0]
    state.initUser = getObj(data);
  },
  //修改用户信息
  updateNewUser(state,userInfo){
    state.userInfoListKeyWord = state.userInfoListKeyWord.map(item=>{
      if(item.ui_ID==userInfo.userID){
        return {
          ui_CertNo:userInfo.certNo,
          ui_CreateTime:userInfo.createTime,
          ui_ID:userInfo.userID,
          ui_Name:userInfo.userName,
          ui_Phone:userInfo.phone,
          ui_Remark:userInfo.remark,
          ui_UserCode:userInfo.userCode
        }

      }
      return item;
    })
  },
  //删除
  filterUserInfo(state,id){
    state.userInfoListKeyWord = newFilter(state.userInfoListKeyWord,id,'ui_UserCode')
  },
  //初始化订单类型
  initOrderType(state,types){
    state.OrderTypeList = types;
  },
  initOrderTypeKeyWord(state,types){
    state.OrderTypeListKeyWord = types;
  },
  //订单类型筛选
  searchOrderKeyWord(state,type){
    state.OrderTypeListKeyWord = state.OrderTypeList.filter(item=>{
      var str = item.ot_TypeName;
      if(str.includes(type)){
        return true;
      }
      return false;
    })
  },
  //添加订单类型
  addOrderType(state,type){
    state.OrderTypeListKeyWord.push(type)
  },
  //初始化修改数据
  initUpdateType(state,id){
    let data = state.OrderTypeListKeyWord.filter(item=>{
      if(item.ot_Code==id){
        return true
      }
      return false
    })[0];
    state.initType = getObj(data);
  },
  //修改订单类型
  updateNewOrderType(state,data){
    state.OrderTypeListKeyWord = state.OrderTypeListKeyWord.map(item=>{
      if(item.ot_Code==data.ot_Code){
        return {
          ot_Code:data.ot_Code,
          ot_TypeName:data.ot_TypeName
        }
      }
      return item;
    })
  },
  //删除订单类型
  filterOrderType(state,id){
    state.OrderTypeListKeyWord = newFilter(state.OrderTypeListKeyWord,id,'ot_Code')
  },
  //订单详情初始化
  initOrderList(state,data){
    state.orderList = data;
  },
  initOrderListKeyWord(state,data){
    state.orderListKeyWord = data;
  },
  //删除订单
  filterOrder(state,id){
    state.orderListKeyWord = newFilter(state.orderListKeyWord,id,'oi_OrderID')
  },
  //订单号筛选
  searchOrderDetailKeyWord(state,detail){
    state.orderListKeyWord = state.orderList.filter(item=>{
      var str = item.oi_OrderID;
      if(str.includes(detail)){
        return true;
      }
      return false;
    })
  },
  //初始化权重信息
  initUserLntegrationWeight(state,data){
    state.userLntegrationWeight = data;
  },
  initUserLntegrationWeightKeyWord(state,data){
    state.userLntegrationWeightKeyWord = data;
    state.userLntegrationWeightKeyWord.sort(function (a,b) {
      return a.hm_Code-b.hm_Code;
    })
  },
  //添加权重
  AddHeightItem(state,data){
    state.userLntegrationWeightKeyWord.push({
      hm_Code:data.hmCode,
      hm_Name:data.hmName,
      hm_Percent:data.percent
    });
    state.userLntegrationWeightKeyWord.sort(function (a,b) {
      return Number(a.hm_Code)-Number(b.hm_Code);
    })
  },
  //修改权重初始化
  initUpdateLntegrationWeight(state,code){
    let data = state.userLntegrationWeightKeyWord.filter(item=>{
      if(item.hm_Code==code){
        return true
      }
      return false
    })[0];
    state.initLntegrationWeight = getObj(data);
  },
  //修改权重
  updateNewLntegrationWeight(state,data){
    state.userLntegrationWeightKeyWord = state.userLntegrationWeightKeyWord.map(item=>{
      if(item.hm_Code==data.hm_Code){
        return {
          hm_ID:data.hm_ID,
          hm_Code:data.hm_Code,
          hm_Name:data.hm_Name,
          hm_Percent:data.hm_Percent
        }
      }
      return item;
    })
  },
  //权重搜索筛选
  searchLntegrationWeightKeyWord(state,name){
    state.userLntegrationWeightKeyWord = state.userLntegrationWeight.filter(item=>{
      var str = item.hm_Name;
      if(str.includes(name)){
        return true;
      }
      return false;
    })
  },
  //设置开始日期和结束日期
  setDate(state,newDateArr){
    state.dateArr = newDateArr
  },
  //用户积分明细
  initUserScore(state,userScore){
    state.userScoreList = userScore;
  },
  //查询失败清空用户明细
  clearUserScore(state){
    state.userScoreList = [];
  }
};
//浅拷贝
function getObj(obj) {
  var dst = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      dst[prop] = obj[prop];
    }
  }
  return dst;
}
//删除newFilter
function newFilter(arr,id,type) {
  var newArr = [];
  for(var i=0;i<arr.length;i++){
    if(arr[i][type]!==id){
      newArr.push(arr[i])
    }
  }
  return newArr;
}


export default {
  getters,
  state,
  mutations
}
