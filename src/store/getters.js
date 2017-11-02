/**
 * Created by leibo on 17/10/30.
 */
export default {
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
  }
}
