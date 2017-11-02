import getters from './getters';
const state ={
  userInfo:{},
  userInfoList:[],
  userInfoListKeyWord:[],
  initUser:{}
};
const mutations = {
  setUserInfo(state,userInfo){
    state.userInfo = userInfo;
  },
  setUserInfoList(state,newUserInfoList){
    state.userInfoList = newUserInfoList;
  },
  setSearchKeyWord(state,newUserInfoList){
    state.userInfoListKeyWord = newUserInfoList;
  },
  //搜索筛选
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
    state.userInfoListKeyWord = newFilter(state.userInfoListKeyWord,id)
  }
};
function getObj(obj) {
  var dst = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      dst[prop] = obj[prop];
    }
  }
  return dst;
}
function newFilter(arr,id) {
  var newArr = [];
  for(var i=0;i<arr.length;i++){
    if(arr[i]['ui_UserCode']!==id){
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
