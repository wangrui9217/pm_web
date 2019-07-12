import Vue from 'vue'
import Router from 'vue-router'
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// import Home from '../views/home/index.vue'
// import InsertIframe from '../views/layout/insert-iframe.vue'
//审批管理的配置

import ApprovalRaiseFirst from '../views/audit/approvalRaiseFirst.vue'
import ApprovalRaiseSecond from '../views/audit/approvalRaiseSecond.vue'
import ApprovalRaiseThird from '../views/audit/approvalRaiseThird.vue'
import ApprovalRaiseInfo from '../views/audit/approvalRaiseInfo.vue'

//产品管理的配置
import ProductInfo from '../views/product/product-info.vue'
import ProductAdd from '../views/product/product-add.vue'
import ProductEdit from '../views/product/product-edit.vue'
// 系统管理的配置
import MenuList from '../views/authority/menu-list.vue'
import RoleList from '../views/authority/role-list.vue'
import UserList from '../views/authority/user-list.vue'
import DepartmentList from '../views/authority/department-list.vue'
import Dictionary from '../views/authority/dictionary.vue'

//客户管理
import Customer from '../views/customer/customer.vue'

//合同模板管理
import Contract from '../views/contract/contracttemplate.vue'
//订单合同
import Electronic from '../views/contract/electronic.vue'
//新增模板合同
import Addtemplate from '../views/contract/addtemplate.vue'
//短信列表
import Msg from "../views/msg/msglist.vue";
import Datelog from '../views/authority/datelist.vue'
import Dateloginfo from '../views/authority/datelistinfo.vue'
import Shortmsg from '../views/msg/shortmsglist.vue'
// import Homes from '../views/home/home.vue'
//工单管理  营销工单
import Marketingworkorder from '../views/marketing/marketingWorkOrder/marketing-work-order.vue'
//工单详情
import Marketinginfo from '../views/marketing/marketinginfo.vue'
//营销记录详情
import Marketingrecordinfo from '../views/marketing/marketingrecord/marketingrecord.vue'
// 调查工单
import InvestOrder from '../views/workOrderManage/investOrder'
import InvestOrderInfo from '../views/workOrderManage/investOrder/investOrderInfo.vue'
// 开户工单
import OpeningOrder from '../views/workOrderManage/openingOrder'
import OpeningOrderInfo from '../views/workOrderManage/openingOrder/openingOrderInfo.vue'
// 活动管理
import Banner from '../views/activityManage/banner'
import AddBanner from '../views/activityManage/banner/add'
import EditBanner from '../views/activityManage/banner/edit'
import Share51 from '../views/activityManage/share51'
import AddShare51 from '../views/activityManage/share51/add'
import EditShare51 from '../views/activityManage/share51/edit'
import Notice from '../views/activityManage/notice'
import AddNotice from '../views/activityManage/notice/add'
import EditNotice from '../views/activityManage/notice/edit'
// 用信审批
import CreditFirst from '../views/audit/creditApproval/creditFirst.vue'
import CreditFirstInfo from '../views/audit/creditApproval/creditFirstInfo.vue'
import CreditSecond from '../views/audit/creditApproval/creditSecond.vue'
import CreditSecondInfo from '../views/audit/creditApproval/creditSecondInfo.vue'
import CreditThird from '../views/audit/creditApproval/creditThird.vue'
import CreditThirdInfo from '../views/audit/creditApproval/creditThirdInfo.vue'
import CreditForth from '../views/audit/creditApproval/creditForth.vue'
import CreditForthInfo from '../views/audit/creditApproval/creditForthInfo.vue'
// 风险评估审批-贷审会
import RiskApproval from '../views/audit/riskApproval'
import RiskApprovalInfo from '../views/audit/riskApproval/riskApprovalInfo.vue'
// 央行征信审批
import BciApplyApproval from '../views/audit/bciApplyApproval'
import BciApplyApprovalInfo from '../views/audit/bciApplyApproval/bciApplyApprovalInfo.vue'
//佣金管理
import Marketingcommission from '../views/money/marketingcommission.vue'
import Commissionmange from '../views/money/commissionmange.vue'
import Commissionmangeinfo from '../views/money/commissionmangeinfo.vue'
import Investigationcommission from '../views/money/investigationcommission.vue'
import Investigationmange from '../views/money/investigationmage.vue'
import Investigationmangeinfo from '../views/money/investigationmageinfo.vue'
//全民营销
import Cashmange from '../views/allpeople/cashmange.vue'
import Peopleconfiguration from '../views/allpeople/peopleconfiguration.vue'
import Getcashinfo from '../views/allpeople/getcashinfo.vue'
import Getcashmangeinfo from '../views/allpeople/getcashmangeinfo.vue'

//贷后管理
import Afterloanmange from '../views/afterloanmange/afterloanmange.vue'
import Afterloanmangeinfo from '../views/afterloanmange/afterloanmangeinfo.vue'

//注册用户管理
import Regmange from '../views/regmange/regmange.vue'
//高管驾驶舱
import Executivecar from '../views/executivecar/executivecar.vue'


// 系统审批记录
import SysApprovalRecords from '../views/audit/sysApprovalRecords'
// 授信记录
import PreAcceptCredit from '../views/acceptCreditRecords/preAcceptCredit'
import RegularAcceptCredit from '../views/acceptCreditRecords/regularAcceptCredit'
import UpgradeAcceptCredit from '../views/acceptCreditRecords/upgradeAcceptCredit'
// 用信记录
import LoanRecords from '../views/loanRecords'
import LoanRecordsInfo from '../views/loanRecords/loanRecordsInfo'
// 协议管理
import Protocol_list from '../views/protocol/protocol_list'
import Protocol_template from '../views/protocol/protocol_template'
import Protocol_add from '../views/protocol/protocol_add'
// 面签工单
import FaceSignOrder from '../views/workOrderManage/faceSignOrder'
import FaceSignOrderInfo from '../views/workOrderManage/faceSignOrder/faceSignOrderInfo'

// 抵质押工单
import PledgeOrder from '../views/workOrderManage/pledgeOrder'
import PledgeOrderInfo from '../views/workOrderManage/pledgeOrder/pledgeOrderInfo'
// 客户维系工单
import MaintainOrder from '../views/workOrderManage/maintainOrder'
import MaintainOrderInfo from '../views/workOrderManage/maintainOrder/maintainOrderInfo'
// 贷后常规检查工单
import LccOrder from '../views/workOrderManage/lccOrder'
import LccOrderInfo from '../views/workOrderManage/lccOrder/lccOrderInfo'
// 贷后突击检查工单
import LwcOrder from '../views/workOrderManage/lwcOrder'
import LwcOrderInfo from '../views/workOrderManage/lwcOrder/lwcOrderInfo'
// 企业央行征信录入工单
import CentralBankOrder from '../views/workOrderManage/centralBankOrder'
import CentralBankOrderInfo from '../views/workOrderManage/centralBankOrder/centralBankOrderInfo'
// 个人央行征信录入工单
import CentralBankOrderPerson from '../views/workOrderManage/centralBankOrderPerson'
import CentralBankOrderInfoPerson from '../views/workOrderManage/centralBankOrderPerson/centralBankOrderInfoPerson'
//高管驾驶舱 客户经理营销记录
import Executivecarmarket from '../views/executivecar/headoffice/marketing.vue'
import Executivearsurvey from '../views/executivecar/headoffice/survey.vue'
import Executivearafterloan from '../views/executivecar/headoffice/afterloan.vue'
//客户全景图
import Panoramic from '../views/executivecar/panoramic.vue'

//评价管理

import Evaluation from '../views/evaluation/evaluation.vue'



Vue.use(Router)

// 路由定义使用说明:
// 1. 代码中路由统一使用name属性跳转.
// 2. 开放path属性用做简短路由, 比如: '/a1', 访问地址: www.renren.io/#/a1
export default new Router({
  mode: 'hash',
  routes: [
    { path: '/404', component: _import('error/404'), name: '404', desc: '404未找到' },
    { path: '/login', component: _import('login/index'), name: 'login', desc: '登录' },
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: { name: 'login' },
      desc: '上左右整体布局',
      children: [
        // 通过isTab属性, 设定是否通过tab标签页展示内容
        // { path: '/home', component: Home, name: 'home', desc: '首页' },
        // { path: '/insert-iframe', component: InsertIframe, name: 'iframe', desc: 'iframe', meta: { iframe: true } },
        // 审批管理的配置
        { path: '/approvalRaiseSecond/:state',component: ApprovalRaiseSecond, name:'提额审批(贷审会)',desc: '', meta:{} },
        { path: '/approvalRaiseFirst/:state',component: ApprovalRaiseFirst, name:'提额审批(一人审批)',desc: '', meta:{} },
        { path: '/approvalRaiseThird/:state',component: ApprovalRaiseThird, name:'提额审批(二次审批)',desc: '', meta:{} },
        { path: '/approvalRaiseInfo/',component: ApprovalRaiseInfo, name:'提额审批详情',desc: '', meta:{} },
        // 用信审批
        { path: '/creditFirst/:state',component: CreditFirst, name:'信贷部用信审批',desc: '', meta:{} },
        { path: '/creditFirstInfo',component: CreditFirstInfo, name:'信贷部用信审批详情',desc: '', meta:{} },
        { path: '/creditSecond/:state',component: CreditSecond, name:'签字岗用信审批',desc: '', meta:{} },
        { path: '/creditSecondInfo',component: CreditSecondInfo, name:'签字岗用信审批详情',desc: '', meta:{} },
        { path: '/creditThird/:state',component: CreditThird, name:'合同岗用信审批',desc: '', meta:{} },
        { path: '/creditThirdInfo',component: CreditThirdInfo, name:'合同岗用信审批详情',desc: '', meta:{} },
        { path: '/riskApproval/:state',component: RiskApproval, name:'风险评估审批-贷审会',desc: '', meta:{} },
        { path: '/riskApprovalInfo',component: RiskApprovalInfo, name:'风险评估审批-贷审会详情',desc: '', meta:{} },
        { path: '/bciApplyApproval/:state',component: BciApplyApproval, name:'央行征信审批',desc: '', meta:{} },
        { path: '/bciApplyApprovalInfo',component: BciApplyApprovalInfo, name:'央行征信审批详情',desc: '', meta:{} },
        { path: '/creditForth/:state',component: CreditForth, name:'副行长用信审批',desc: '', meta:{} },
        { path: '/creditForthInfo',component: CreditForthInfo, name:'副行长用信审批详情',desc: '', meta:{} },


        //产品管理的配置
        { path: '/product-info', component: ProductInfo, name: '产品信息管理', desc: '产品信息管理', meta: {} },
        { path: '/product-add', component: ProductAdd, name: '添加产品', desc: '添加产品', meta: {} },
        { path: '/product-edit', component: ProductEdit, name: '编辑产品', desc: '编辑产品', meta: {} },

        // 系统管理的配置
        { path: '/menu-list', component: MenuList, name: '菜单管理', desc: '', meta: {}},
        { path: '/role-list', component: RoleList, name: '角色管理', desc: '', meta: {}},
        { path: '/user-list', component: UserList, name: '用户管理', desc: '', meta: {} },
        { path: '/department-list', component: DepartmentList, name: '部门管理', desc: '', meta: {} },
        { path: '/dictionary', component: Dictionary, name: '数据字典', desc: '', meta: {} },



        //客户管理
        { path: '/customer/:state', component: Customer, name: '企业名录', desc: '', meta: {} },

         //合同模板
         { path: '/contract-template', component: Contract, name: '合同模板管理', desc: '', meta: {} },
         { path: '/shortmsglist', component: Shortmsg, name: '短信模板管理', desc: '', meta: {} },

          //电子合同
         { path: '/electronic-contract', component: Electronic,name: '电子合同管理', desc: '', meta: {} },
         //新增合同模板
         { path: '/template-add', component: Addtemplate,name: '新增模板合同', desc: '', meta: {} },
         //短信列表
         { path: '/messagelist', component: Msg,name: '短信列表', desc: '', meta: {} },
           //日志管理
           { path: '/dateloglist', component: Datelog,name: '日志管理', desc: '', meta: {} },
           { path: '/dateloglistinfo', component: Dateloginfo,name: '日志管理详情', desc: '', meta: {} },
         //首页
         // { path: '/homes', component: Homes,name: '首页2', desc: '', meta: {} },
        //工单管理 营销工单
        { path: '/marketingworkorder/:state', component: Marketingworkorder,name: '营销工单', desc: '', meta: {}},
        //工单详情
        { path: '/marketinginfo', component: Marketinginfo, name: '工单详情', desc: '', meta: {} },
        //营销记录详情
        { path: '/marketingrecordinfo', component: Marketingrecordinfo, name: '营销记录详情', desc: '', meta: {} },
        // 工单
        { path: '/investOrder/:state', component: InvestOrder, name: '调查工单', desc: '', meta: {} },
        { path: '/investOrderInfo', component: InvestOrderInfo, name: '调查工单详情', desc: '', meta: {} },
        { path: '/openingOrder/:state', component: OpeningOrder, name: '开户工单', desc: '', meta: {} },
        { path: '/openingOrderInfo', component: OpeningOrderInfo, name: '开户工单详情', desc: '', meta: {} },

        { path: '/banner', component: Banner, name: '活动Banner列表', desc: '', meta: {} },
        { path: '/add-banner', component: AddBanner, name: '新增Banner活动', desc: '', meta: {} },
        { path: '/edit-banner', component: EditBanner, name: '编辑Banner活动', desc: '', meta: {} },
        { path: '/share51', component: Share51, name: '我要分享', desc: '', meta: {} },
        { path: '/add-share51', component: AddShare51, name: '新增分享活动', desc: '', meta: {} },
        { path: '/edit-share51', component: EditShare51, name: '编辑分享活动', desc: '', meta: {} },
        { path: '/notice', component: Notice, name: '公告管理', desc: '', meta: {} },
        { path: '/add-notice', component: AddNotice, name: '新增公告', desc: '', meta: {} },
        { path: '/edit-notice', component: EditNotice, name: '编辑公告', desc: '', meta: {} },

        { path: '/faceSignOrder/:state', component: FaceSignOrder, name: '远程面签代办工单', desc: '', meta: {} },
        { path: '/faceSignOrderInfo', component: FaceSignOrderInfo, name: '远程面签代办工单详情', desc: '', meta: {} },
        { path: '/pledgeOrder/:state', component: PledgeOrder, name: '抵质押代办工单', desc: '', meta: {} },
        { path: '/pledgeOrderInfo', component: PledgeOrderInfo, name: '抵质押代办工单详情', desc: '', meta: {} },
        { path: '/maintainOrder/:state', component: MaintainOrder, name: '客户维系工单', desc: '', meta: {} },
        { path: '/maintainOrderInfo', component: MaintainOrderInfo, name: '客户维系工单详情', desc: '', meta: {} },
        { path: '/lccOrder/:state', component: LccOrder, name: '贷后常规检查工单', desc: '', meta: {} },
        { path: '/lccOrderInfo', component: LccOrderInfo, name: '贷后常规检查工单详情', desc: '', meta: {} },
        { path: '/lwcOrder/:state', component: LwcOrder, name: '贷后突击检查工单', desc: '', meta: {} },
        { path: '/lwcOrderInfo', component: LwcOrderInfo, name: '贷后突击检查工单详情', desc: '', meta: {} },
        { path: '/centralBankOrder/:state', component: CentralBankOrder, name: '企业央行征信录入工单', desc: '', meta: {} },
        { path: '/centralBankOrderInfo', component: CentralBankOrderInfo, name: '企业央行征信录入工单详情', desc: '', meta: {} },
        { path: '/centralBankOrderPerson/:state', component: CentralBankOrderPerson, name: '个人央行征信录入工单', desc: '', meta: {} },
        { path: '/centralBankOrderInfoPerson', component: CentralBankOrderInfoPerson, name: '个人央行征信录入工单详情', desc: '', meta: {} },
        // 系统审批记录
        { path: '/sysApprovalRecords', component: SysApprovalRecords, name: '系统审批记录', desc: '', meta: {} },
        // 授信记录
        { path: '/preAcceptCredit', component: PreAcceptCredit, name: '预授信记录', desc: '', meta: {} },
        { path: '/regularAcceptCredit', component: RegularAcceptCredit, name: '正式授信记录', desc: '', meta: {} },
        { path: '/upgradeAcceptCredit', component: UpgradeAcceptCredit, name: '提额后授信记录', desc: '', meta: {} },
        // 用信记录
        { path: '/loanRecords', component: LoanRecords, name: '贷款用信记录', desc: '', meta: {} },
        { path: '/loanRecordsInfo', component: LoanRecordsInfo, name: '贷款用信记录详情', desc: '', meta: {} },

        //佣金管理
        { path: '/marketingcommission', component: Marketingcommission, name: '营销佣金配置', desc: '', meta: {} },
        { path: '/commissionmange', component: Commissionmange, name: '营销佣金管理', desc: '', meta: {} },
        { path: '/commissionmangeinfo/:id', component: Commissionmangeinfo, name: '营销佣金管理详情', desc: '', meta: {} },
        { path: '/investigationcommission', component: Investigationcommission, name: '调查佣金配置', desc: '', meta: {} },
        { path: '/investigationmange', component: Investigationmange, name: '调查佣金管理', desc: '', meta: {} },
        { path: '/investigationmangeinfo/:id', component: Investigationmangeinfo, name: '调查佣金管理详情', desc: '', meta: {} },
        //全民营销
        { path: '/cashmange', component: Cashmange, name: '全民营销提现管理', desc: '', meta: {} },
        { path: '/getcashinfo/:id', component: Getcashinfo, name: '确认提现', desc: '', meta: {} },
        { path: '/getcashmangeinfo/:id', component: Getcashmangeinfo, name: '全民营销获取明细', desc: '', meta: {} },
        { path: '/peopleconfiguration', component: Peopleconfiguration, name: '全民营销配置管理', desc: '', meta: {} },
        //贷后管理
        { path: '/afterloanmange', component: Afterloanmange, name: '贷后管理', desc: '', meta: {} },
          //贷后管理详情
        { path: '/afterloanmangeinfo/:id', component: Afterloanmangeinfo, name: '贷后管理详情', desc: '', meta: {} },
        //高管驾驶舱
        { path: '/executivecar/:state', component: Executivecar, name: '风险底数分析', desc: '', meta: {} },
        //客户全景图
        { path: '/executivecar/panoramic', component: Panoramic, name: '客户全景图', desc: '', meta: {} },

        //客户经理营销记录
        { path: '/executivearmarrk', component: Executivecarmarket, name: '客户经理营销记录', desc: '', meta: {} },
        { path: '/executivearsurvey/:state', component: Executivearsurvey, name: '客户经理调查记录', desc: '', meta: {} },
        { path: '/executiveaafterloan/:state', component: Executivearafterloan, name: '客户经理贷后记录', desc: '', meta: {} },

        //注册用户管理
        { path: '/regmange', component: Regmange, name: '注册用户管理', desc: '', meta: {} },
        //协议管理
        { path: '/protocol_list', component: Protocol_list, name: '协议签署记录', desc: '', meta: {} },
        { path: '/protocol_template', component: Protocol_template, name: '协议模板列表', desc: '', meta: {} },
        { path: '/protocol_add', component: Protocol_add, name: '新增协议模板', desc: '', meta: {} },

        //评价管理
        { path: '/evaluation/:state', component: Evaluation, name: '评价管理', desc: '', meta: {} },
      ],
      beforeEnter (to, from, next) {
        let token = sessionStorage.getItem('Authorization')
        if (!token) {
          next({ name: 'login' })
        }
        else{
          next()
        }
      }
    },
    { path: '*', redirect: { name: '404' } }
  ]
})
