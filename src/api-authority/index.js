import promise from 'es6-promise'
promise.polyfill()
import axios from 'axios';
import qs from 'qs'
import * as types from '../store/mutation-types';
import { baseURL, baseURLImg, baseURLDownloads } from './config.js';
import { MessageBox } from 'element-ui'
import Vue from 'vue'
/* import Router from 'vue-router'
import routes from '@/router'
Vue.use(Router)

const router = new Router({
    routes: routes
})

console.log(router) */
const queryString = require('query-string');
var _axios = axios.create({
  baseURL: baseURL
})

_axios.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem('Authorization')) {

      config.headers.Authorization = sessionStorage.getItem('Authorization');
      config.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => {
    //     console.log(response,'rrrrrrrrrrrrrrr@@@')
    return response;
  }, (error) => {
    // console.log(error.response.status,'rrrrrrrrrrrrrrr######')
    if (error.response) {
      switch (error.response.status) {
        case 401:
          vm.$router.push({ name: 'login' })
          vm.$message.warning('登录过期')
          sessionStorage.clear();

          break;
        case 500:
          MessageBox.alert('服务器错误', '', {
            type: 'error'
          })
          break;
        case 504:
          MessageBox.alert('连接服务器超时', '', {
            type: 'error'
          })
          break;
        case 408:
          MessageBox.alert('请求超时', '', {
            type: 'error'
          })
          break;
        case 404:
          MessageBox.alert('服务不存在', '', {
            type: 'error'
          })
          break;
        default:
          MessageBox.alert('请求失败，请重试', '', {
            type: 'error'
          })
          break;
      }

    }
    return Promise.reject(error);
  }
);

export default {
  //  用于富文本上传图片
  uploadURL: baseURL + "/baseFile/upload",
  upload(data){
    return _axios.post("/baseFile/upload", data);
  },
  getImgURL(url){
    return baseURLImg + `/baseFile/IOReadFile?filePath=${url}`
  },
  verifycode(uuid) {
    return baseURLDownloads + '/verifycode/' + uuid
  },
  //登录
  login: function(data, params) {
    return _axios.post("/toLogin", data, { params: params });
  },

  /**********************************************菜单导航start********************************* */
  // 获取菜单导航
  getNavigation: function(params) {
    return _axios.get("/sysMenu/navigation", { params: params });
  },

  /**********************************************菜单导航end********************************* */

  /**********************************************权限角色start********************************* */
  //菜单管理列表
  getAllMenus: function(data, params) {
    return _axios.post("/sysMenu/getAllMenus", data, { params: params });
  },
  //菜单信息添加/修改／停用
  addOrUpdateMenu: function(data, params) {
    return _axios.post("/sysMenu/addOrUpdateMenu", data, { params: params });
  },

  // 角色列表信息
  getAllRoles: function(data, params) {
    return _axios.post("/sysRole/getAllRoles", data, { params: params });
  },
  //角色信息添加/修改／停用
  addOrUpdateRole: function(data, params) {
    return _axios.post("/sysRole/addOrUpdateRole", data, { params: params });
  },

  //根据角色Id查询角色信息
  getRoleById: function(id) {
    return _axios.get("/sysRole/getRoleById/" + id);
  },
  //查询所有的角色
  queryAllRoles: function() {
    return _axios.get("/sysRole/queryAllRoles");
  },
  // 角色和用户绑定
  relRoleAndUser: function() {
    return _axios.get(" /sysRole/relRoleAndUser");
  },

  //用户列表--css
  //查询所有的用户
  getAllUsers: function(data) {
    return _axios.post("/sysUser/getAllUsers", data);
  },
  getUserInfo: function(data, params) {
    return _axios.post("/sysUser/getUserInfo", data, { params: params });
  },
  //用户信息添加/修改／停用
  addOrUpdateUser: function(data, params) {
    return _axios.post("/sysUser/addOrUpdateUser", data, { params: params });
  },


  /**********************************************权限角色end********************************** */


  /**********************************************数据字典start************************************ */
  //数据字典-列表
  searchDictList: function(params) {
    return _axios.get("/quota/reasonList", { params: params });
  },
  //拒绝二级原
  /**********************************************数据字典end************************************ */

  /**********************************************审批管理start************************************ */

  // 提额审批待办任务列表
  searchExamineNotDoList: function(data, params) {
    return _axios.post("/quota/examine/searchExamineNotDoList", data, { params: params })
  },
  // 提额审批已办任务列表
  searchExamineDoneList: function(data, params) {
    return _axios.post("/quota/examine/searchExamineDoneList", data, { params: params })
  },
  // 审批详情-审批历史
  searchExamineHistory: function(data, params) {
    return _axios.post("/quota/examine/searchExamineHistory", data, { params: params })
  },
  // 审批详情-历史授信记录
  searchCreditHistory: function(data, params) {
    return _axios.post("/quota/examine/searchCreditHistory", data, { params: params })
  },
  // 审批详情-一人审批提交
  submitFirstReply: function(data, params) {
    return _axios.post("/quota/examine/submitFirstReply", data, { params: params })
  },
  // 审批详情-二次审批提交
  submitSecondAudit: function(data, params) {
    return _axios.post("/quota/examine/submitSecondAudit", data, { params: params })
  },
  // 审批详情-贷审会提交
  submitSecondReply: function(data, params) {
    return _axios.post("/quota/examine/submitSecondReply", data, { params: params })
  },
  // 补充影像资料
  getVideoData: function(data, params) {
    return _axios.post("/quota/examine/getVideoData", data, { params: params })
  },

  /*---用信审批---*/
  // 用信申请详情
  getLoanApplyInfo: function(data, params) {
    return _axios.post("/loan/after/getLoanApplyInfo", data, { params: params })
  },
  //  获取抵押品信息
  getPledgeInfos: function(data, params) {
    return _axios.post("/quota/creditApproval/getPledgeInfos", data, { params: params })
  },
  //  补充影像资料
  getVideoDataCreditApproval: function(data, params) {
    return _axios.post("/quota/creditApproval/getVideoData", data, { params: params })
  },
  // 用信审批-待办任务列表
  getCreditApprovalNotDoList: function(data, params) {
    return _axios.post("/quota/creditApproval/searchExamineNotDoList", data, { params: params })
  },
  // 用信审批-已办任务列表
  getCreditApprovalDoneListt: function(data, params) {
    return _axios.post("/quota/creditApproval/searchExamineDoneList", data, { params: params })
  },
  // 用信审批-提交审批
  submitCreditApproval: function(data, params) {
    return _axios.post("/quota/creditApproval/submitApproval", data, { params: params })
  },
  // 用信审批-获取业务相关合同凭据
  getCreditProof: function(data, params) {
    return _axios.post("/quota/creditApproval/getProof", data, { params: params })
  },
  // 用信审批-企业角色列表
  companyRoleList: function(data, params) {
    return _axios.post("/quota/creditApproval/companyRoleList", data, { params: params })
  },
  // 用信审批-发起远程面签工单
  initiateFaceSignOrder: function(data, params) {
    return _axios.post("/quota/creditApproval/initiateFaceSignOrder", data, { params: params })
  },
  // 用信审批-发起抵质押工单
  initiatePledgeOrder: function(data, params) {
    return _axios.post("/quota/creditApproval/initiatePledgeOrder", data, { params: params })
  },
  // 用信审批-获取审批记录
  getApprovalRecord: function(data, params) {
    return _axios.post("/quota/creditApproval/getApprovalRecord", data, { params: params })
  },
  // 用信审批-获取未到场股东
  getRoleListByApplyId: function(data, params) {
    return _axios.post("/quota/creditApproval/getRoleListByApplyId", data, { params: params })
  },
  //查询自动/系统审批记录
  getRecordList: function(data, params) {
    return _axios.post("/loanAutoAudit/getRecordList", data, { params: params })
  },
  //判断是否发起过抵质押工单
  checkPledgeInfo: function(data, params) {
    return _axios.post("/quota/creditApproval/checkPledgeInfo", data, { params: params })
  },

  /* 风险评估审批-贷审会 */
  //获取检查项详情
  getCheckResult: function(data, params) {
    return _axios.post("/riskApproval/getCheckResult", data, { params: params })
  },
  getOrderListRisk: function(data, params) {
    return _axios.post("/riskApproval/getOrderList", data, { params: params })
  },
  submitApprovalRisk: function(data, params) {
    return _axios.post("/riskApproval/submitApproval", data, { params: params })
  },
  getAuditHistory: function(data, params) {
    return _axios.post("/riskApproval/getAuditHistory", data, { params: params })
  },
  getAuditHistoryDetail: function(data, params) {
    return _axios.post("/riskApproval/getAuditHistoryDetail", data, { params: params })
  },
  /* 央行征信审批*/
  getBciApplyList: function(data, params) {
    return _axios.post("/bciApplyAudit/getAuditList", data, { params: params })
  },
  getAuthorization: function(data, params) {
    return _axios.post("/bciApplyAudit/getAuthorization", data, { params: params })
  },
  submitBciApply: function(data, params) {
    return _axios.post("/bciApplyAudit/submit", data, { params: params })
  },
  /*贷后管理*/
  //列表
  getLoanAfterList: (data, params) => {
    return _axios.post("/loan/after/getLoanAfterList", data, { params: params })
  },
  //常规检查 维系工单
  setDay: (data, params) => {
    return _axios.post("/loan/after/setDay", data, { params: params })
  },
  //发起检查
  inspectionStart: (data, params) => {
    return _axios.post("/loan/after/inspectionStart", data, { params: data })
  },

  //预警信息
  searchWarnList: (data) => {
    return _axios.post("/loan/after/searchWarnList", data)
  },
  //详情
  loandetail: (data, params) => {
    return _axios.post("/loan/after/detail", data, { params: data })
  },
  //注册用户管理
  searchCustomerList: (data, params) => {
    return _axios.post("/customer/searchCustomerList", data, { params: data })
  },





  /******************************************审批管理end************************************ */

  /**********************************************产品管理start************************************ */
  // 获取产品信息列表
  searchProList: function(data, params) {
    return _axios.post("/product/searchProductList", data, { params: params })
  },
  // 获取产品信息详情
  getdetalinfo: function(data, params) {
    return _axios.post("/product/detail", data, { params: data })
  },
  // 产品信息新增
  addPro: function(data, params) {
    return _axios.post("/product/createOrUpdateProduct", data, { params: params })
  },
  // 产品信息停用
  proStop: function(data, params) {
    return _axios.post("/product/enable", data, { params: params })
  },
  // 产品信息启用
  proStart: function(data, params) {
    return _axios.post("/product/enable", data, { params: params })
  },
  // 产品信息修改
  updatePro: function(data, params) {
    return _axios.post("/product/pro/updatePro", data, { params: params })
  },
  //产品信息唯一性验证
  checkProName: function(data, params) {
    return _axios.post("/product/checkProName", data, { params: data })
  },
 //产品费用配置获取接口
 lvInterest: function(data, params) {
    return _axios.post("/product/lvInterest", data, { params: data })
  },


  /**********************************************产品管理end************************************ */

  //授信列表
  getOrdercredtList: function(data, params) {
    return _axios.post("/orderManage/quota/list", data, { params: params })
  },
  //系统审批列表
  getsystemExamineList: function(data, params) {
    return _axios.post("/quota/systemExamine/list", data, { params: params })
  },

  //借款信息 客户基本信息
  customerbase: function(data, params) {
    return _axios.post("/customer/getUserInfo", data, { params: params })
  },
  //企业名录   客户详情

  companydetail: function(data, params) {
    return _axios.post("/company/detail", {}, { params: data })
  },
  //企业名录  企业性质
  searchCompNatureList: function(data, params) {
    return _axios.post("/company/searchCompNatureList", data, { params: params })
  },
  //合同模板列表
  getTempList: function(data, params) {
    return _axios.post("/contact/template/searchContactTemplateList", data, { params: params })
  },
  //合同模板状态修改
  changetempstate: function(data, params) {
    return _axios.post("/contact/template/enable", data, { params: params })
  },
  //新增合同模板
  addtemp: function(data, params) {
    return _axios.post("/contact/template/createOrUpdateProduct", data, { params: params })
  },
  //编辑合同模板
  edittemp: function(data, params) {
    return _axios.post("/contact/template/createOrUpdateProduct", data, { params: params })
  },
  //合同记录
  searchrecordTemplateList: function(data, params) {
    return _axios.post("/contact/record/searchContactTemplateList", data, { params: params })
  },
  //合同模板下载
  downloadFile: function(data, params) {
    return _axios.get("/baseFile/downloadFile", { params: data, responseType:"blob" })
  },
  //产品管理 基础费用管理
  searchCostList: function(data, params) {
    return _axios.post("/product/cost/searchCostList", data, { params: params })
  },
  //日志管理
  dateLogList: function(data, params) {
    return _axios.post("/sysLog/getLog", data, { params: params })
  },
  //电子合同管理
  queryElectContract: function(params) {
    return _axios.get("/loan/contract/queryElectContract", { params: params })
  },
  //短信列表
  shortmsg: function(data, params) {
    return _axios.post("/sms/record/list", data, { params: params })
  },
  //短信模板列表
  shortmsglist: function(data, params) {
    return _axios.post("/sms/template/list", data, { params: params })
  },
  //新增短信模板列表
  addtmsg: function(data, params) {
    return _axios.post("/sms/template/saveOrUpdate", data, { params: params })
  },
  //影像资料
  getUserFileList: function(data, params) {
    return _axios.post("/customer/getUserFileList", data, { params: params })
  },
  //逾期列表
  findOverdueList: function(params) {
    return _axios.get("/overdue/findOverdueList", { params: params })
  },
  //确认放款
  suerrepay: function(data, params) {
    return _axios.post("/creditSystem/updateOrderManagerState", data, { params: params })
  },
  //获取资源池条数
  getExaminePoolCount: function(params) {
    return _axios.get("/quota/examinePool/getExaminePoolCount", { params: params })
  },
  //echar 授信审批统计
  sumCreditApproval: function(params) {
    return _axios.get("/workBench/sumCreditApproval", { params: params })
  },
  //echar 放款统计
  sumLoanInfo: function(params) {
    return _axios.get("/workBench/sumLoanInfo", { params: params })
  },
  //echar 贷后
  sumAfterLoanInfo: function(params) {
    return _axios.get("/workBench/sumAfterLoanInfo", { params: params })
  },
  //echar 待办业务总数
  getApprovalCount: function(params) {
    return _axios.get("/workBench/getApprovalCount", { params: params })
  },
  //修改密码
  changrpwd: function(data, params) {
    return _axios.post("/sysUser/updatePassWord", data, { params: params })
  },
    //重置手机设备
    initUserPid: function(data, params) {
      return _axios.post("/sysUser/initUserPid", data, { params: params })
    },
  //待还款管理
  getStayRepayment: function(params) {
    return _axios.get("/repayment/getStayRepayment", { params: params })
  },
  // 部门管理-新增or修改
  addOrUpdateDept: function(data) {
    return _axios.post("/sysDept/addOrUpdateDept", data)
  },
  // 部门管理-查询乡镇分行
  getAllAreas: function(data) {
    return _axios.post("/sysDept/getAllAreas", data)
  },
  // 部门管理-查询所有部门
  getAllDepts: function(data) {
    return _axios.post("/sysDept/getAllDepts", data)
  },
  //区域列表数据
  // getAllAreas: function(data) {
  //   return _axios.post("/sysDept/getAllAreas", data)
  // },
  //信用等级列表数据
  searchCreditLevelist: function(data) {
    return _axios.post("/basic/creditLevel/searchCreditLevelist", data)
  },
  //新增信用等级列表数据
  createOrupdateCreditLeve: function(data) {
    return _axios.post("/basic/creditLevel/createOrupdateCreditLeve", data)
  },
  //删除信用等级列表数据
  leaveldeleteById: function(data) {
    return _axios.post("/basic/creditLevel/deleteById", data, { params: data })
  },
  //信用等级唯一性验证
  checkLevelName: function(data, params) {
    return _axios.post("/basic/creditLevel/checkName", data, { params: data })
  },
  //区域列表
  searchArealist: function(data) {
    return _axios.post("/basic/area/searchArealist", data)
  },
  //新增区域
  createOrupdateArea: function(data) {
    return _axios.post("/basic/area/createOrupdateArea", data)
  },
  //删除区域
  areadeleteById: function(data) {
    return _axios.post("/basic/area/deleteById", data, { params: data })
  },
  //区域唯一性验证
  checkarealName: function(data, params) {
    return _axios.post("/basic/area/checkName", data, { params: data })
  },

  //支行数据获取
  searchOrgByArea: function(data) {
    return _axios.post("/market/order/searchOrgByArea", {}, { params: data })
  },
  //工单管理-营销工单列表
  searchMarketOrderList: function(data) {
    return _axios.post("/market/order/searchMarketOrderList", data)
  },
  //工单管理-地区划分
  areaDivision: function(data, params) {
    return _axios.post("/market/order/areaDivision", data, { params: data })
  },
  //工单管理-客户营销详情
  marketDetal: function(data) {
    return _axios.post("/market/order/detail", data, { params: data })
  },
  //工单管理-工商信息
  baseinfoSet: function(data) {
    return _axios.post("/company/thrid/baseinfoSet", data, { params: data })
  },
  //工单管理-司法记录
  judicialSet: function(data) {
    return _axios.post("/company/thrid/judicialSet", data, { params: data })
  },
  //工单管理-上市信息
  listedCompany: function(data) {
    return _axios.post("/company/thrid/listedCompany", data, { params: data })
  },
  //工单管理-舆情信息
  newsSet: function(data) {
    return _axios.post("/company/thrid/newsSet", data, { params: data })
  },
  //工单管理-知识产权
  knowleageList: function(data) {
    return _axios.post("/company/thrid/knowleageList", data, { params: data })
  },
  //工单管理-企业关系图
  businessRelation: function(data) {
    return _axios.post("/company/thrid/businessRelation", data, { params: data })
  },
  //营销记录详情
  recordDetail: function(data) {
    return _axios.post("/market/order/recordDetail", data, { params: data })
  },
  //企业名录 列表
  searchCompanyList: function(data) {
    return _axios.post("/company/searchCompanyList", data)
  },
  //企业名录 准入
  admittance: function(data) {
    return _axios.post("/company/admittance", data, { params: data })
  },
  //营销工单 员工派发数据
  searchUserByArea: function(data) {
    return _axios.post("/market/order/searchUserByArea", data)
  },
  //营销工单 名单群派发
  orderDivisions: function(data) {
    return _axios.post("/market/order/orderDivisions", data)
  },
  //单个派发
  orderDivision: function(data) {
    return _axios.post("/market/order/orderDivision", {}, { params: data })
  },


  /*调查工单*/
  // 详情
  getInvestInfo: function(data, params) {
    return _axios.post("/survey/order/detail", data, { params: params })
  },
  // 企业信息
  getCompanyInfo: function(data, params) {
    return _axios.post("/survey/order/getCompanyInfo", data, { params: params })
  },
  // 查询列表
  getInvestOrderList: function(data, params) {
    return _axios.post("/survey/order/searchSurveyOrderList", data, { params: params })
  },
  /* 调查报告 */
  // 获取调查报告入参
  getUsccAndOrderNo: function(data, params) {
    return _axios.post("/quota/examine/getUsccAndOrderNo", data, { params: params })
  },
  // 行内业务
  getDcBankBusiness: function(data, params) {
    return _axios.post("/financeReport/getDcBankBusiness", data, { params: params })
  },
  // 基本信息
  getDcBasicInfo: function(data, params) {
    return _axios.post("/financeReport/getDcBasicInfo", data, { params: params })
  },
  // 信用历史
  getDcCreditHistory: function(data, params) {
    return _axios.post("/financeReport/getDcCreditHistory", data, { params: params })
  },
  // 公司治理及人员信息
  getCompManagerInfo: function(data, params) {
    return _axios.post("/financeReport/getCompManagerInfo", data, { params: params })
  },
  // 财务报表
  getDcFinanceReport: function(data, params) {
    return _axios.post("/financeReport/getDcFinanceReport", data, { params: params })
  },
  // 经营情况
  getDcManagementSituation: function(data, params) {
    return _axios.post("/financeReport/getDcManagementSituation", data, { params: params })
  },
  /*  开户工单  */
  getOpenOrderList: function(data, params) {
    return _axios.post("/openOrder/getOpenOrderList", data, { params: params })
  },
  getOpenOrderDetail: function(data, params) {
    return _axios.post("/openOrder/getDetail", data, { params: params })
  },
  /*  调查工单-详情 营销报告*/
  // 获取授信申请编号
  getApplyCreditNo: function(data, params) {
    return _axios.post("/survey/order/getApplyCreditNo", data, { params: params })
  },
  getMarketDcBankBusiness: function(data, params) {
    return _axios.post("/marketReport/getDcBankBusiness", data, { params: params })
  },
  getMarketDcBasicInfo: function(data, params) {
    return _axios.post("/marketReport/getDcBasicInfo", data, { params: params })
  },
  getZsCreditHistory: function(data, params) {
    return _axios.post("/marketReport/getZsCreditHistory", data, { params: params })
  },
  // getZsTaxInfo: function(data, params) {
  //   return _axios.post("/marketReport/getZsTaxInfo", data, { params: params })
  // },
  getMarketRecords: function(data, params) {
    return _axios.post("/marketReport/marketRecords", data, { params: params })
  },
  /*佣金管理*/
  //营销佣金列表
  searchCommissionMarketList: function(data, params) {
    return _axios.post("/commissionConfig/marketorder/searchCommissionMarketList", data, { params: data })
  },
  //编辑金额
  editmarketorder: function(data, params) {
    return _axios.post("/commissionConfig/marketorder/edit", data, { params: params })
  },
  //营销佣金管理列表
  searchRecordMarketList: function(data, params) {
    return _axios.post("/commissionRecord/marketorder/searchRecordMarketList", data, { params: params })
  },
  //详情历史列表
  searchMarketHistoryList: function(data, params) {
    return _axios.post("/commissionRecord/marketorder/searchMarketHistoryList", data, { params: params })
  },
  //调查详情历史列表
  searchSurveyHistoryList: function(data, params) {
    return _axios.post("/commissionRecord/surveyorder/searchSurveyHistoryList", data, { params: params })
  },

  //用户基本信息
  searchUserInfo: function(data, params) {
    return _axios.post("/commissionRecord/marketorder/searchUserInfo", data, { params: data })
  },
  //调查用户基本信息
  dcsearchUserInfo: function(data, params) {
    return _axios.post("/commissionRecord/surveyorder/searchUserInfo", data, { params: data })
  },
  //调查佣金列表
  dcCommissionMarketList: function(data, params) {
    return _axios.post("/commissionConfig/surveyorder/searchCommissionMarketList", data, { params: data })
  },
  //调查佣金编辑详情
  dcCommissionorder: function(data, params) {
    return _axios.post("/commissionConfig/surveyorder/detail", data, { params: data })
  },
  //编辑调查金额
  editdcorder: function(data, params) {
    return _axios.post("/commissionConfig/surveyorder/edit", data, { params: params })
  },
  //调查佣金管理列表
  searchRecordSurveyList: function(data, params) {
    return _axios.post("/commissionRecord/surveyorder/searchRecordSurveyList", data, { params: params })
  },
  /*全民营销*/
  //提现管理列表
  searchWithdramalList: function(data, params) {
    return _axios.post("/withdramal/record/searchWithdramalList", data, { params: params })
  },
  //历史提现记录
  searchCashWithdrawalList: function(data, params) {
    return _axios.post("/withdramal/record/searchCashWithdrawalList", data, { params: params })
  },
  //确认提现
  confirmWithdrawal: function(data, params) {
    return _axios.post("/withdramal/record/confirmWithdrawal", data, { params: params })
  },
  //获取明细

  searchCommissionRecord: function(data, params) {
    return _axios.post("/withdramal/record/searchCommissionRecord", data, { params: params })
  },
  //全民营销佣金配置

  searchConfigList: function(data, params) {
    return _axios.post("/config/searchConfigList", data, { params: data })
  },
  updateConfig: function(data, params) {
    return _axios.post("/config/updateConfig", data)
  },


  /*活动管理*/
  // 活动列表
  getEventList: function(data, params) {
    return _axios.post("/eventManagement/eventList", data, { params: params })
  },
  // 批量修改启用/停用
  changeEventStatus: function(data, params) {
    return _axios.post("/eventManagement/batchChange", data, { params: params })
  },
  // 新增，修改
  addOrUpdateEvent: function(data, params) {
    return _axios.post("/eventManagement/addOrUpdateEvent", data, { params: params, headers: { 'Content-Type': 'multipart/form-data' } })
  },
  IOReadFile: (params) => {
    return _axios.get("/baseFile/IOReadFile", { params: params, responseType: 'blob' })
  },
  /* 授信记录  */
  getAcceptCreditRecord: (data, params) => {
    return _axios.post("/creditRecord/searchSurveyOrderList", data, { params: params })
  },

  /*用信记录*/
  getLoanRecordList: (data, params) => {
    return _axios.post("/loanRecord/getLoanRecordList", data, { params: params })
  },
  getProCostByProId: (data, params) => {
    return _axios.post("/loanRecord/getProCostByProId", data, { params: params })
  },

  // 保存借据号
  updateContractNo: (data, params) => {
    return _axios.post("/loanRecord/updateContractNo", data, { params: params })
  },
  /*  协议管理  */
  addProtocol: (data, params) => {
    return _axios.post("/protocol/addProtocol", data, { params: params })
  },
  // 批量停用启用
  protocolBatchChange: (data, params) => {
    return _axios.post("/protocol/batchChange", data, { params: params })
  },
  // 获取协议节点列表
  getProtocolCodeList: (data, params) => {
    return _axios.post("/protocol/getProtocolCodeList", data, { params: params })
  },
  // 协议管理列表查询
  getProtocolList: (data, params) => {
    return _axios.post("/protocol/getProtocolList", data, { params: params })
  },
  // 用户协议签署记录列表
  getProtocolRecordList: (data, params) => {
    return _axios.post("/protocol/getProtocolRecordList", data, { params: params })
  },
  updateProtocol: (data, params) => {
    return _axios.post("/protocol/updateProtocol", data, { params: params })
  },
  // 获取协议类型列表
  getProtocolTypeList: (data, params) => {
    return _axios.post("/protocol/getProtocolTypeList", data, { params: params })
  },
  getAllCodeList: (data, params) => {
    return _axios.post("/protocol/getAllCodeList", data, { params: params })
  },
  /*远程面签工单*/
  getFaceSignOrderList: (data, params) => {
    return _axios.post("/loanFaceSign/getOrderList", data, { params: params })
  },
  getFaceSignFiles: (data, params) => {
    return _axios.post("/loanFaceSign/getFaceSignFiles", data, { params: params })
  },
  // 获取已分配人员列表
  getMarketUserList: (data, params) => {
    return _axios.post("/loanFaceSign/getMarketUserList", data, { params: params })
  },
  // 工单分配保存
  assignmentUserFaceSign: (data, params) => {
    return _axios.post("/loanFaceSign/assignmentUser", data, { params: params })
  },
  // 查询可分配任务的营销人员列表（抵质押、面签、贷后检查、突击检查、维系）1：总行。2：总+支行。3：支行
  getMarketUsers: (data, params) => {
    return _axios.post("/market/order/getMarketUsers", data, { params: params })
  },
  /*抵质押工单*/
  getPledgeFiles: (data, params) => {
    return _axios.post("/loanPledge/getFacePledgeFiles", data, { params: params })
  },
  //
  getPledgeOrderList: (data, params) => {
    return _axios.post("/loanPledge/getOrderList", data, { params: params })
  },
  // 工单分配保存
  assignmentUserPledge: (data, params) => {
    return _axios.post("/loanPledge/assignmentUser", data, { params: params })
  },
  /*贷后维系工单*/

  assignmentUserMaintain: (data, params) => {
    return _axios.post("/loanMaintain/assignmentUser", data, { params: params })
  },
  getMaintainOrderList: (data, params) => {
    return _axios.post("/loanMaintain/getOrderList", data, { params: params })
  },
  getLoanMaintainOrderFile: (data, params) => {
    return _axios.post("/loanMaintain/getLoanMaintainOrderFile", data, { params: params })
  },
  /*贷后常规检查工单*/

  assignmentUserLcc: (data, params) => {
    return _axios.post("/lcc/assignmentUser", data, { params: params })
  },
  getLccOrderList: (data, params) => {
    return _axios.post("/lcc/getOrderList", data, { params: params })
  },
  getDetailLcc: (data, params) => {
    return _axios.post("/lcc/getDetail", data, { params: params })
  },
  getFileByOrderId: (data, params) => {
    return _axios.post("/lcc/getFileByOrderId", data, { params: params })
  },
  /*贷后突击检查工单*/

  assignmentUserLwc: (data, params) => {
    return _axios.post("/lwc/assignmentUser", data, { params: params })
  },
  getLwcOrderList: (data, params) => {
    return _axios.post("/lwc/getOrderList", data, { params: params })
  },
  // 获取营销人员列表
  getMarketUserListLwc: (data, params) => {
    return _axios.post("/lwc/getMarketUserList", data, { params: params })
  },
  // 获取已分配人员列表
  getUserListByOrderIdLwc: (data, params) => {
    return _axios.post("/lwc/getUserListByOrderId", data, { params: params })
  },
  // 获取调查人员列表
  getSurveyUserList: (data, params) => {
    return _axios.post("/lwc/getSurveyUserList", data, { params: params })
  },
  getCheckDetailLwc: (data, params) => {
    return _axios.post("/lwc/getCheckDetail", data, { params: params })
  },
  /* 企业征信录入工单*/
  getOrderDetailBciApply: function(data, params) {
    return _axios.post("/bciOrder/getOrderDetail", data, { params: params })
  },
  getOrderListBciApply: function(data, params) {
    return _axios.post("/bciOrder/getOrderList", data, { params: params })
  },
  saveInfoBciApply: function(data, params) {
    return _axios.post("/bciOrder/saveInfo", data, { params: params })
  },
  /* 个人征信录入工单*/
  getOrderDetailBciPerson: function(data, params) {
    return _axios.post("/bciPersonOrder/getOrderDetail", data, { params: params })
  },
  getOrderListBciPerson: function(data, params) {
    return _axios.post("/bciPersonOrder/getOrderList", data, { params: params })
  },
  saveInfoBciPerson: function(data, params) {
    return _axios.post("/bciPersonOrder/saveInfo", data, { params: params })
  },

  //高管驾驶舱获取数据
  queryInfo: (data, params) => {
    return _axios.post("/executives/queryInfo", data, { params: params })
  },
  //高管驾驶舱 行业分析 ⾏业内贷款客户质量分布情况
  qualityDistribution: (data, params) => {
    return _axios.post("/executives/qualityDistribution", data, { params: params })
  },
  // 五级分类
  loanFiveLv: (data, params) => {
    return _axios.post("/executives/loanFiveLv", data, { params: params })
  },
  // 状态结构分析
  loanStatusAnalysis: (data, params) => {
    return _axios.post("/executives/loanStatusAnalysis", data, { params: params })
  },
  //贷款期限结构分析
  loanTimeAnalysis: (data, params) => {
    return _axios.post("/executives/loanTimeAnalysis", data, { params: params })
  },
  //前十大客户贷款余额
  topTenLoanBalance: (data, params) => {
    return _axios.post("/executives/topTenLoanBalance", data, { params: params })
  },
  //前十大对外担保情况
  topTenGuarantee: (data, params) => {
    return _axios.post("/executives/topTenGuarantee", data, { params: params })
  },

  //营销记录总行
  queryMakerRecordHead: (data, params) => {
    return _axios.post("/executives/accountManager/queryMakerRecordHead", data, { params: params })
  },
  //事业群
  queryMakerRecordCareer: (data, params) => {
    return _axios.post("/executives/accountManager/queryMakerRecordCareer", data, { params: params })
  },
  //分行
  queryMakerRecordBranch: (data, params) => {
    return _axios.post("/executives/accountManager/queryMakerRecordBranch", data, { params: params })
  },
  //调查记录总行
  querySurveyRecordHead: (data, params) => {
    return _axios.post("/executives/accountManager/querySurveyRecordHead", data, { params: params })
  },
  //贷后记录总行
  queryAfterLoanHead: (data, params) => {
    return _axios.post("/executives/accountManager/queryAfterLoanHead", data, { params: params })
  },
  //事业群
  queryAfterLoanCareer: (data, params) => {
    return _axios.post("/executives/accountManager/queryAfterLoanCareer", data, { params: params })
  },
  //分行
  queryAfterLoanBranch: (data, params) => {
    return _axios.post("/executives/accountManager/queryAfterLoanBranch", data, { params: params })
  },
  //客户全景图
  queryCustomerInfo: (data, params) => {
    return _axios.post("/executives/queryCustomerInfo", data, { params: params })
  },
    //企业名录  营销工单 分析与提示
    //企业名录 准入
  loanindex: function(data) {
    return _axios.post("/company/thrid/index", {}, { params: data })
  },
  //企业名录 管理者版本 行内信息

  getQjBankInfoAdmin: function(data) {
    return _axios.post("/company/thrid/getQjBankInfoAdmin", {}, { params: data })
  },
  //营销工单 客户经理版本  行内信息
  getQjBankInfoCustomer: function(data) {
    return _axios.post("/company/thrid/getQjBankInfoCustomer", {}, { params: data })
  },



  //所有支行接口
  getAllBanks: (data, params) => {
    return _axios.post("/sysDept/getAllBanks", data, { params: params })
  },
  //基准利率
  rateList: (data, params) => {
    return _axios.post("/product/rateList", data, { params: params })
  },
  //贷后管理支行划分
  divisionBranch: (data, params) => {
    return _axios.post("/loan/after/divisionBranch", data, { params: params })
  },
   //评价管理
   getEvaluateByType: (data, params) => {
    return _axios.post("/evaluate/getEvaluateByType", data, { params: params })
  },
  //数据字典 拒绝原因列表
  searchReasonList: (data, params) => {
      return _axios.post("/basics/reason/searchReasonList", data, { params: params })
    },
    searchReasons: (data, params) => {
      return _axios.post("/basics/reason/searchReasons", data, { params: params })
    },
    //新增拒绝原因
    createOrUpdateReason: (data, params) => {
      return _axios.post("/basics/reason/createOrUpdateReason", data, { params: params })
    },
    //删除拒绝原因
    deleteByIds: (data, params) => {
      return _axios.post("/basics/reason/deleteByIds", data, { params: params })
    },
  // 判断用信类型
    getAuditType: type => {
      if (type == 1) {
        return '提额前'
      } else if (type == 2) {
        return '提额后'
      } else {
        return '暂无数据'
      }
    }




}
