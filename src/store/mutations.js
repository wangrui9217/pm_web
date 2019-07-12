import * as types from './mutation-types'
import api from '@/api-authority'


export default {
  [types.SET_NAVBAR_LAYOUT_TYPE](state, { type }) {
    state.navbarLayoutType = type
  },
  [types.SET_SIDEBAR_LAYOUT_SKIN](state, { skin }) {
    state.sidebarLayoutSkin = skin
  },
  [types.SWITCH_SIDEBAR_COLLAPSE](state, { collapse }) {
    state.sidebarCollapse = collapse
  },

  [types.UPDATE_DOCUMENT_CLIENT_HEIGHT](state, { height }) {
    state.documentClientHeight = height
  },

  [types.UPDATE_MENU_NAV_LIST](state, list) {
    state.menuNavList = list
  },

  [types.UPDATE_MENU_NAV_ACTIVE_NAME](state, { name }) {
    state.menuNavActiveName = name
  },

  [types.ADD_CONTENT_TAB](state, tab) {
    state.contentTabs.push(tab)
  },

  [types.UPDATE_CONTENT_TABS](state, tabs) {
    state.contentTabs = tabs
  },

  [types.DELETE_CONTENT_TABS](state) {
    state.contentTabs = []
  },

  [types.UPDATE_CONTENT_TABS_ACTIVE_NAME](state, { name }) {
    state.contentTabsActiveName = name
  },
  // --------------分隔线--------------
  //获取角色列表
  // [types.GET_ROLE_LIST]({ commit, state }, params) {
  //   api.getRoles(params).then((res) => {
  //     console.log('res', res)
  //     if (res.data.success) {
  //       commit(types.UPDATE_ROLE_LIST, {
  //         data: res.data.data.roles,
  //         total: res.data.total
  //       })
  //     } else {
  //       vm.$message({
  //         type: 'error',
  //         message: res.data.msg
  //       });
  //     }
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // },
  //导航数据
  [types.UPDATE_NAVIGATION](state, newData) {
    state.navigation = newData
  },
  [types.USERNAME](state, newData) {
    state.username = newData
  },
  //左侧导航
  [types.UPDATE_LEFT_MENU](state, newData) {
    state.leftMenu = newData
  },
  //更新用户列表-分页
  [types.UPDATE_USERS](state, newData) {
    state.userList = newData
  },
  //更新用户列表
  [types.GET_USERS](state, newData) {
    state.userList = newData
  },
  //更新部门数据
  [types.UPDATE_DEPT_DATA](state, newData) {
    state.deptData = newData
  },
  //更新角色列表
  [types.UPDATE_ROLE_LIST](state, newData) {
    state.roleList = newData
  },
  //更新当前登录用户信息
  [types.UPDATE_userinfo](state, newData) {
    state.userinfo = newData
  },
  //更新字典数据
  [types.UPDATE_dict](state, newData) {
    state.dictList = newData
  },
  //更新支行数据
  [types.UPDATE_areas](state, newData) {
    state.areas = newData
  },
  //更新信用列表数据
  [types.UPDATE_credit](state, newData) {
    state.credit = newData
  },
  //更新每页显示多少条
  [types.UPDATE_pagrsizes](state, newData) {
    state.pagesizes = newData
  },
  //更新当前第几页
  [types.UPDATE_pagenum](state, newData) {
    console.log(newData,123)
    state.pagenum = newData
  },
  //更新员工数量
  [types.UPDATE_usersearch](state, newData) {
    state.usersearch = newData
  },
  //获取协议类型列表
  [types.PROTOCOL_TYPE_LIST](state, newData) {
    state.protocolTypeList = newData
  },
  //保存权限
  [types.AUTH_DATA](state, newData) {
    state.authData = newData
  },

}
