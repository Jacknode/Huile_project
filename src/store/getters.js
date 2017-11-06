/**
 * Created by leibo on 17/10/30.
 */
export default {
  loadingShow(state) {
    return state.loadingShow
  },
  userInfo(state){
    return state.userInfo;
  },
  userInfoList(state){
    return state.userInfoList;
  },
  //用户查询keyWord
  userInfoListKeyWord(state){
    return state.userInfoListKeyWord;
  },
  //修改用户使用初始化对象
  newForm(state){
    return state.initUser;
  },
  //订单类型
  OrderTypeList(state){
    return state.OrderTypeList;
  },
  OrderTypeListKeyWord(state){
    return state.OrderTypeListKeyWord
  },
  //初始化订单类型
  initType(state){
    return state.initType;
  },
  //订单详情
  orderListKeyWord(state){
    state.orderListKeyWord.forEach(item=>{
      item.oi_TypeName = getTypeName(item.oi_ID);
    });
    function getTypeName(id) {
      var typeName = '';
      state.OrderTypeListKeyWord.forEach(item=>{
        if(item.ot_ID==id){
          typeName = item.ot_TypeName
        }
      });
      return typeName;
    }
    return state.orderListKeyWord;
  },
  //权重信息
  userLntegrationWeightKeyWord(state){
    return state.userLntegrationWeightKeyWord
  },
  //初始化修改权重
  initLntegrationWeight(state){
    return state.initLntegrationWeight;
  },
  userLntegrationWeight(state){
    return state.userLntegrationWeight
  },
  //用户积分明细开始日期和结束日期
  dateArr(state){
    return state.dateArr;
  },
  //用户积分明细
  userScoreList(state){
    state.userScoreList.forEach(item=>{
      item.userScoreName = getTypeName(item.usd_ID);
    });
    function getTypeName(id) {
      var typeName = '';
      state.userLntegrationWeightKeyWord.forEach(item=>{
        if(item.hm_ID==id){
          typeName = item.hm_Name
        }
      });
      return typeName;
    }
    return state.userScoreList
  }
}
