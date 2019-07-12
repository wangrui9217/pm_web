import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'

Vue.use(Vuex)

const state = {
  // 导航条, 布局风格, defalut(默认) / inverse(反向)
  navbarLayoutType: 'default',
  // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
  sidebarLayoutSkin: 'dark',
  // 侧边栏, 水平折叠收起状态
  sidebarCollapse: false,
  // 页面文档可视高度(随窗口改变大小)
  documentClientHeight: 0,
  // 菜单导航
  menuNavList: [],
  menuNavActiveName: '1-1',
  // 内容区域tabs标签页
  contentTabs: [],
  contentTabsActiveName: '',
  // -----分割线--------
  userList: {},//用户-分页
  deptData: [],//部门数据
  roleList: [],//角色列表
  userinfo: {},//当前登录用户信息
  navigation: [],//导航菜单列表 --- 一维原数据
  dictList: [], // 字典数据列表
  areas:[] ,    //地区数据
  credit:[],   //信用列表数据
  pagesizes:10, //每页显示多少条
  pagenum:1,//当前第几页
  usersearch:[],//派发员工
  protocolTypeList: [], //协议类型列表
  authData: [], // 权限列表（包括按钮权限和菜单权限）
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== 'production'
})
