/**
 * Created by leibo on 17/10/30.
 */
import Home from '@/components/Home'
//用户信息
import Users from '@/components/User'
//登录
import Login from '@/components/Login'
//用户订单明细
import UserOrders from '@/components/UserOrders'
//用户积分
import UserLntegration from '@/components/UserLntegration'
//积分权重
import UserLntegrationWeight from '@/components/UserLntegrationWeight'
//订单类型
import OrderType from '@/components/OrderType'

export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/home',
    name:'Home',
    components:{
      default:Home,
      newUser:Users
    },
    children:[
      { path: 'profile', components: {
        default:Home,
        User:UserOrders
      } },
      { path: 'users', components: {
        default:Home,
        User:Users
      } },
      { path: 'lntegration', components: {
        default:Home,
        User:UserLntegration
      } },
      { path: 'lntegrationWeight', components: {
        default:Home,
        User:UserLntegrationWeight
      } },
      { path: 'orderType', components: {
        default:Home,
        User:OrderType
      } }
    ]
  }
]
