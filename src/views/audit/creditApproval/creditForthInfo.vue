<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <loan-info :data="loanInformation"></loan-info>

            </div>
          </section>
        </div>
      </section>
      <el-tabs type="border-card">
        <el-tab-pane label="借款信息">
          <div class="detail-item">
            <div class="title"><h3>客户基本信息</h3>
            </div>
            <el-row class="style-key-value flex-wrap" :gutter="10">
              <el-col :span="12"><span>客户名称:</span>{{detailInfo.legalName}}</el-col>
              <el-col :span="12"><span>身份证:</span>{{detailInfo.legalNo}}</el-col>
              <el-col :span="12"><span>手机:</span>{{detailInfo.legalPhone}}</el-col>
              <el-col :span="12"><span>婚姻状况:</span>{{detailInfo.ismarry==1?'已婚':(detailInfo.ismarry==2?'未婚':'')}}</el-col>
              <el-col :span="12"><span>企业注册地址：</span>{{detailInfo.regAddr}}</el-col>
            </el-row>
            <div class="title"><h3>相关业务合同凭证</h3>
            </div>
            <div v-for="item in files" class="img-wrap">
              <p><b>{{item.fileName}}：</b></p>
              <el-row :gutter="10">
                <el-col :span="6"><img :src="item.filepath" preview="0" :preview-text="item.fileName"></el-col>

              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="正式调查报告">
          <!-- 概览 -->
          <div class="detail-item">
            <div class="title"><h3>概览</h3>
            </div>
            <el-row class="style-key-value flex-wrap" :gutter="10">
              <el-col :span="12"><span>准入结果：</span>{{evaluationResult.admittanceResult}}</el-col>
              <el-col :span="12"><span>拒绝原因：</span>{{evaluationResult.rejectReason}}</el-col>
              <el-col :span="12"><span>信用评分：</span>{{evaluationResult.creditScore}}</el-col>
              <el-col :span="12"><span>信用等级：</span>{{evaluationResult.creditLevel}}</el-col>
              <el-col :span="12"><span>利率等级：</span>{{evaluationResult.rateLevel}}</el-col>
              <el-col :span="12"><span>等级释义：</span>{{evaluationResult.levelParaphrase}}</el-col>
              <el-col :span="12"><span>系统建议额度：</span>{{evaluationResult.systemSuggestLines}}元</el-col>
              <el-col :span="12"><span>贴现额度：</span>{{evaluationResult.lowRiskLines}}元</el-col>
              <el-col :span="12"><span>企业保证方式：</span>{{evaluationResult.mode}}</el-col>
              <el-col :span="12"><span>调查人员建议额度：</span>{{evaluationResult.investigatorSuggestLines}}元</el-col>
              <el-col :span="24"><span>调查岗人员建议额度说明：</span>{{evaluationResult.instruction}}</el-col>
            </el-row>
            <div id="charts1" class="charts"></div>
            <div>
              <h4 class="style-h4">报告说明</h4>
              <table class="style-table border" cellpadding="0" cellspacing="0">
                <tr>
                  <th>等级</th>
                  <th>分数区间</th>
                  <th>说明</th>
                </tr>
                <tr v-for="item in lvAndScoreInstruction">
                  <td >{{item.lv}}</td>
                  <td >{{item.scope}}</td>
                  <td>{{item.instruction}}</td>
                </tr>
              </table>
            </div>
          </div>
          <!-- 基本情况 -->
          <baseBusinessInfo :options="baseBusinessInfoOptions"></baseBusinessInfo>
          <!-- 经营状况 -->
          <operationInfo :options="operationInfoOptions" :investReport="true"></operationInfo>
          <!-- 财务报表 -->
          <financeReport :options="financeReportOptions"></financeReport>
          <!-- 信用历史 -->
          <creditReport :options="creditReportOptions"></creditReport>
          <!-- 行内业务 -->
          <bankBusiness :options="bankBusinessOptions"></bankBusiness>

        </el-tab-pane>
        <el-tab-pane label="补充影像材料">
          <div class="detail-item">
            <div class="title"><h3>客户上传资料</h3>
            </div>
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
              <el-radio-button label="top">企业证件</el-radio-button>
              <el-radio-button label="right">法人证件</el-radio-button>
            </el-radio-group>
            <div class="file-wrap">
              <div v-show="tabPosition==='top'">
                <el-row v-if="uploadedFiles.officialCreditInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.officialCreditInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-show="tabPosition==='right'">
                <el-row v-if="uploadedFiles.customerInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.customerInfo" :key="index">
                    <p>{{file.fileName}}</p>
                    <div class="img-box" v-if="file.fileCategory != 'liveness_image'">
                      <img :src="file.fileURL" preview="0" :preview-text="file.fileName" >
                    </div>
                    <div class="img-box" v-else>
                      <video> :src="file.url" controls></video>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史授信记录">
          <div class="detail-item">
            <div class="title"><h3>历史授信记录</h3>
            </div>
            <el-table highlight-current-row :data="creditHistory" border style="margin-top: 15px;">
              <el-table-column prop="creditNumber" label="授信编号" align="center">
              </el-table-column>
              <el-table-column prop="creditResult" label="审批结果" align="center">
              </el-table-column>
              <el-table-column prop="creditAmount" label="授信额度(元)" align="center">
              </el-table-column>
              <el-table-column prop="validTime" label="授信有效期" align="center">
              </el-table-column>
              <el-table-column prop="rejectReason" label="拒绝原因" align="center">
              </el-table-column>
              <el-table-column prop="applyTime" label="申请日期" align="center">
              </el-table-column>
            </el-table>
            <my-pagination @paginationChange="getCreditHistory" ref="creditHistory" :total="creditHistoryTotal"></my-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div id="approval-container" v-if="readonly">
        <div class="approval-wrapper">
          <span @click="openApproval">批复</span>
        </div>
      </div>
      <el-dialog title="审批结果" :visible.sync="showApprovalDialog" width="800px" :close-on-click-modal="false" v-loading.fullscreen="loading">
        <el-form :model="approvalForm" class="approval-form" label-width="120px" ref="approval-form" label-position="left" size="small">
          <el-form-item label="审核结果：" prop="result" required>
            <el-radio-group v-model="approvalForm.result" @change="handleResultChange">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="approvalForm.result==1">
            <h3>审批用信结果</h3>
            <el-row>
              <el-col :span="12">
                <p><span>授信金额：</span>{{detailInfo.creditAmount}}</p>
              </el-col>
              <el-col :span="12">
                <p><span>授信有效期：</span>{{detailInfo.creditValidTime}}</p>
              </el-col>
              <el-col :span="12">
                <p><span>用信产品：</span>{{detailInfo.productName}}</p>
              </el-col>
              <el-col :span="12">
                <p><span>用信金额：</span>{{detailInfo.loanAmount}}</p>
              </el-col>
            </el-row>
            <h3>用信审批意见</h3>
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="审批意见：" prop="auditMsg" :rules="rules.auditMsg">
                  <el-input v-model="approvalForm.auditMsg" type="textarea" :rows="3" :maxLength="2000">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-form-item label="拒绝原因：" prop="rejectMsg" :rules="rules.rejectMsg">
              <el-row>
                <el-col :span="6">
                  <el-select v-model="approvalForm.rejectMsg" placeholder="拒绝原因">
                    <el-option v-for="item in rejectMsgArr" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" :rules="rules.remark">
              <el-input v-model="approvalForm.remark" type="textarea" :rows="3" :maxLength="2000">
              </el-input>
            </el-form-item>
          </template>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submit()">提 交</el-button>
          <el-button @click="showApprovalDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import myPagination from "@/components/views/myPagination";
import api from '@/api-authority'
import Rules from "@/const/formRules";
import Files from "@/const/files";
import baseBusinessInfo from "@/components/reports/baseBusinessInfo";
import operationInfo from "@/components/reports/operationInfo";
import financeReport from "@/components/reports/financeReport";
import creditReport from "@/components/reports/creditReport";
import bankBusiness from "@/components/reports/bankBusiness";
import loanInfo from "./loanInfo";


export default {
  name: 'personinfo-list',
  components: { PageTemplate, myPagination,baseBusinessInfo, operationInfo, financeReport, creditReport, bankBusiness, loanInfo},
  data() {
    return {
      creditHistory: [],
      examineHistory: [],
      detailInfo: {},
      tabPosition: 'top',
      creditHistoryTotal: 0,
      examineHistoryTotal: 0,
      approvalForm: {
        result: '1',
        auditMsg: '',
        rejectMsg: '',
        remark: ''
      },
      files: [],
      loanApplyId: '', // 审批id
      showApprovalDialog: false,
      rules: Rules,
      loading: false,
      readonly: true,
      status: '审批中',
      userId: JSON.parse(localStorage.userinfo).id,
      username: JSON.parse(localStorage.userinfo).username,
      positionPath: [{ name: '审批管理' }, { name: '副行长用信审批详情' }],
      loanInformation: {},
      params: {
        "bizCode": "",
        "companyName": "",
        "uscc": ""
      },
      uploadedFiles: {},
      /* 基本情况 */
      lvAndScoreInstruction: [],
      evaluationResult: {}, // 评估结果
      baseBusinessInfoOptions: {
        companyRelavance: [], // 法定代表人其他关联公司
        governance: {}, // 公司治理及人员信息
        legalRepresentative: {}, // 法定代表人信息
        vip: [], // 重要人物信息
        branch: [], // 分支机构
        baseInfo: {}, // 基本信息
        toOutwardInvest: [], // 对外投资
        shareholdersInfo: [], // 股东信息
        importantIndicator: [] // 关键指标
      },

      /* 企业经营状况 */
      operationInfoOptions: {
        iec: [], // 收入与能耗
        iri: [], // 进项发票信息
        sii: [], // 销项发票信息
        suppliers: [], // 供应商数⽬及⾦额
        supplier_firstFive: {}, // 前五⼤上游供应商企业
        supplier_firstThird: {}, // 按交易金额划分的前三大企业类型
        customers: [], // 客户数⽬及⾦额
        customer_firstFive: {}, // 前五⼤客户企业
        customer_firstThird: {}, // 按交易金额划分的前三大客户类型
        upSummary: {},
        survey: [], // 发票信息线下调查
        brand: [], // 商标信息
        patent: [], // 专利
        copyright: [], // 著作权
        inMarket: [], // 上市信息
        publicOpinion: [], // 舆情信息
        importantIndicator: [], // 关键指标
        companyOrperationImportantInfo: {}, // 公司经营关键信息
        analyze: {} // 销售产品分析
      },
      /* 企业财务报表 */
      financeReportOptions: {
        incurDebts: [], // 资产负债表
        profits: [], // 利润表
        // cashFlow: [], // 现金流量表
        businessScale: {
          list: [],
          evaluation: ''
        }, // 经营规模
        industry: {},
        trend: {}, // 发展趋势
        profitAbility: {}, // 盈利能力
        operationAbility: {}, // 运营能力
        debtpayingAbility: {}, // 债偿能力
        pledgeInfo: [], // 抵质押信息
        guaranteeInfo: {
          person: [],
          company: []
        }, // 担保信息
        importantIndicator: []
      },
      /* 信用历史 */
      creditReportOptions: {
        companyMen: {}, // 企业⼈⾏征信
        representative: {}, // 法定代表⼈⼈⾏征信
        relevantPersons: [], // 相关⼈信用历史
        // judicialInfo: [], // 司法信息
        importantIndicator: [],
        badInfoAnalysis: {analysis:''}, // 涉诉及负面信息分析
        openCourtNotice: [], // 开庭公告
        refereeDoc: [], // 裁判文书
        courtNotice: [], // 法院公告
        performNotice: [], // 执行公告
        dishonestNotice: [], //失信公告
      },
      /* 行内业务 */
      bankBusinessOptions: {
        importantIndicator: [], // 关键指标
        dataReport: {}, // 企业⾏内数据报表
        affiliateReport_ee: {}, // 关联⼈账户(企业版)
        affiliateReport_pe: {}, // 关联⼈账户(个人版)
        monthStatistics: [], // 银⾏流⽔⽉度统计
        firstIn: {
          list: [],
          left: '',
          right: ''
        }, // 资⾦流⼊前20⼤账户
        firstOut: {
          list: [],
          left: '',
          right: ''
        }, // 资⾦流出前20⼤账户
        anotherLine: [], // 他行流水
        otherRisk: [], // 其他风险
        enterpriseGuaranteeCircle: {
          relationshipsTable: []
        }, //企业担保圈
        relatedPeopleCircle: {
          relationshipsTable: []
        }, // 相关人关系
        adeptCircle: {
          relationshipsTable: []
        }, //行业交易圈
      },
      records: {},
      rejectMsgArr: []
    }
  },
  methods: {
    searchReasons(){
      api.searchReasons({
        "reasonCode": "USE_APPROVAL"
      }).then(res => {
        if(res.data.code == 0 && res.data.message){
            if(res.data.message.length){
                 this.rejectMsgArr=res.data.message.map(el=>{
                   return  {label:el.reasonName,value:el.reasonCode}
                 })
            }

        }
      })
    },
    getApprovalRecord(){
      api.getApprovalRecord({
        loanApplyId: this.loanApplyId,
        auditNode: 5
      }).then(res => {
        if(res.data.code == 0){
          this.records = res.data.message
        }
      })
    },
    getDcBankBusiness() {
      api.getDcBankBusiness(this.params).
      then(({ data }) => {
        if (data.code == 0 && data.message && data.message.data) {
          let message = data.message.data
          let anotherLine = message.anotherLine
          anotherLine = this.colToRow(anotherLine, ['date', 'initialBalance', 'endingBalance', 'bearingSum', 'avg'])
          this.bankBusinessOptions = {
            importantIndicator: message.importantIndicator || [],
            dataReport: message.bankAccountReport.companyAccount || {},
            affiliateReport_ee: message.bankAccountReport.affiliateReport.ee || {},
            affiliateReport_pe: message.bankAccountReport.affiliateReport.pe || {},
            monthStatistics: message.bankLineAnalyze.monthStatistics,
            firstIn: message.bankLineAnalyze.firstIn,
            firstOut: message.bankLineAnalyze.firstOut,
            anotherLine: anotherLine,
            otherRisk: message.otherRisk,
            enterpriseGuaranteeCircle: message.enterpriseGuaranteeCircle,
            relatedPeopleCircle: message.relatedPeopleCircle, // 相关人关系
            adeptCircle: message.adeptCircle, //行业交易圈
          }
        } else {
          this.$message.error(data.message.message)
        }
      })
    },
    getDcCreditHistory() {
      api.getDcCreditHistory(this.params).
      then(({ data }) => {
        if (data.code === 0 && data.message && data.message.data) {
          let message = data.message.data
          this.creditReportOptions = {
            importantIndicator: message.importantIndicator || [],
            relevantPersons: message.relevantPersons,
            companyMen: message.companyMen,
            representative: message.representative,
            // judicialInfo: message.relevantPersons.judicialInfo,
            badInfoAnalysis: message.badInfoAnalysis,
            openCourtNotice: message.openCourtNotice,
            refereeDoc: message.refereeDoc,
            courtNotice: message.courtNotice,
            performNotice: message.performNotice,
            dishonestNotice: message.dishonestNotice
          }

        } else {
          this.$message.error(data.message.message)
        }
      })
    },
    getDcFinanceReport() {
      api.getDcFinanceReport(this.params).
      then(({ data }) => {
        if (data.code === 0 && data.message && data.message.data) {
          let message = data.message.data
          let incurDebts = message.incurDebts || []
          let profits = message.profits || []
          let financeReportOptions = {}
          financeReportOptions.incurDebts = incurDebts
          financeReportOptions.profits = profits
          // financeReportOptions.cashFlow = message.cashFlow
          let businessScale = message.businessScale || {list: [],
          evaluation: ''};
          businessScale.list = this.colToRow(businessScale.list, ['item', 'businessIncome', 'netProfits'])
          financeReportOptions.businessScale = businessScale
          let trend = message.trend
          trend.list = this.colToRow(trend.list, ['item', 'incomeRatio', 'netProfitsRatio','incomeRatioAvg','netProfitsRatioAvg'])
          financeReportOptions.trend = trend
          let profitAbility = message.profitAbility
          profitAbility.list = this.colToRow(profitAbility.list, ['item', 'cashIncomeRatio','netProfitsRatio','cashIncomeRatioAvg','netProfitsRatioAvg'])
          financeReportOptions.profitAbility = profitAbility
          let operationAbility = message.operationAbility
          operationAbility.list = this.colToRow(operationAbility.list, ['item', 'inventoryTurnover', 'receivableTurnover','inventoryTurnoverAvg', 'receivableTurnoverAvg'])
          financeReportOptions.operationAbility = operationAbility
          let debtpayingAbility = message.debtpayingAbility
          debtpayingAbility.list = this.colToRow(debtpayingAbility.list, ['item', 'lev', 'quickRatio','levAvg', 'quickRatioAvg'])
          financeReportOptions.debtpayingAbility = debtpayingAbility
          financeReportOptions.pledgeInfo = message.guaranteedAnalysis.pledgeInfo
          financeReportOptions.guaranteeInfo = message.guaranteedAnalysis.guaranteeInfo
          financeReportOptions.importantIndicator = message.importantIndicator || []
          financeReportOptions.industry = message.industry || {}
          this.financeReportOptions = financeReportOptions
        } else {
          this.$message.error(data.message.message)
        }
      })
    },
    getDcManagementSituation() {
      api.getDcManagementSituation(this.params).
      then(({ data }) => {
        if (data.code === 0 && data.message && data.message.data) {
          let message = data.message.data
          this.operationInfoOptions = {
            iec: message.iec,
            iri: message.iri,
            sii: message.sii,
            suppliers: message.supplier.suppliers,
            supplier_firstFive: message.supplier.sFirstFive,
            supplier_firstThird: message.supplier.firstThird,
            customers: message.customer.customers,
            customer_firstFive: message.customer.firstFive,
            customer_firstThird: message.customer.firstThird,
            upSummary: message.supplier.upSummary,
            up_regionDistribution: message.supplier.regionDistribution,
            up_industryDistribution: message.supplier.industryDistribution,
            downSummary: message.customer.downSummary,
            down_regionDistribution: message.customer.regionDistribution,
            down_industryDistribution: message.customer.industryDistribution,
            survey: message.survey,
            brand: message.brand,
            copyright: message.copyright,
            patent: message.patent,
            inMarket: message.inMarket,
            publicOpinion: message.publicOpinion,
            importantIndicator: message.importantIndicator || [],
            companyOrperationImportantInfo: message.companyOrperationImportantInfo,
            analyze: message.analyze
          }
        } else {
          this.$message.error(data.message.message)
        }
      })
    },
    getDcBasicInfo() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      api.getDcBasicInfo(this.params).
      then(({ data }) => {
        loading.close()
        if (data.code === 0 && data.message && data.message.data) {
          let message = data.message.data
          if(message){
            this.evaluationResult = message.evaluationResult
            this.lvAndScoreInstruction = message.lvAndScoreInstruction
            let governance = message.governance
            delete message.evaluationResult
            delete message.lvAndScoreInstruction
            delete message.governance
            this.baseBusinessInfoOptions = Object.assign(message, governance)
            this.initCharts1()
          }
        } else {
          this.$message.error(data.message.message)
        }
      })
    },
    getCreditHistory(paginationData = { pageNum: 1, pageSize: 10 }) {
      let params = {
        "auditId": 0,
        "auditUserName": this.username,
        "compId": this.detailInfo.compId,
        "condition": "",
        "phone": "",
        "state": 0,
        "auditUserId": this.userId
      }
      params = Object.assign(params, paginationData)
      api.searchCreditHistory(params).
      then((res) => {
        if (res.data.code == '0') {
          this.creditHistory = res.data.message.list;
          this.creditHistory.forEach(item => {
            item.validTime = item.validTime?('' +item.validTime).substring(0,10):''
            if (item.creditResult == 'success') {
              item.creditResult = '授信成功'
            }else {
              item.creditResult = '授信失败'
            }
          })
          this.creditHistoryTotal = res.data.message.total
        } else {
          this.$message.error(res.data.message)
        }
      })
    },

    openApproval() {
      this.showApprovalDialog = true
      this.resetFormData()
      this.searchReasons()
      this.$nextTick(() => {
        this.$refs['approval-form'].clearValidate()
      })
    },
    resetFormData() {
      for (let k in this.approvalForm) {
        if (k === 'result') {
          this.approvalForm[k] = '1'
        } else {
          this.approvalForm[k] = ''
        }
      }
    },
    submit() {
      this.$refs['approval-form'].validate(valid => {
        if (valid) {
          let params = Object.assign({
            "auditMsg": "",
            "auditNode": 5,  // 节点：2 信贷审批记录 3 签字审批审批 4合同审批记录 5 副行长审批
            // "auditUserId": 0,
            // "auditUserName": "",
            // "id": 0,
            "loanApplyId": this.loanApplyId,
            "rejectMsg": "",
            "result": 0
          }, this.approvalForm)
          if (params.result == 0) {
            params.auditMsg = params.remark
            params.rejectMsg = ''
          } else {

          }
          this.loading = true
          delete params.remark
          api.submitCreditApproval(params).
          then((res) => {
            this.loading = false
            this.showApprovalDialog = false
            if (res.data.code == 0) {
              this.$message.success('操作成功')
              this.detailInfo.readonly === true
              this.readonly = false
              sessionStorage.setItem('approvalInfo', JSON.stringify(this.detailInfo))
              this.$router.go(-1)
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    getCreditProof(){
      api.getCreditProof({
        "loanApplyId": this.loanApplyId
      }).
      then(res => {
        if (res.data.code == 0) {
          let data = res.data.message
          data.forEach(item => {
            if(item.fileCategory){
              item.fileName = Files[item.fileCategory]
              item.filepath = api.getImgURL(window.encodeURIComponent(item.filepath))
            }
          })
          this.files = data

        } else {

        }
      })
    },

    handleResultChange(val) {
      this.$refs['approval-form'].clearValidate()
    },
    initCharts1() {
      let charts1 = echarts.init(document.getElementById('charts1'))
      let option = {
        tooltip: {trigger: 'axis'},
        polar:[{
          indicator: [
            { text: '基本信息', max: 1000 },
            { text: '行内业务', max: 1000 },
            { text: '信用历史', max: 1000 },
            { text: '财务状况', max: 1000 },
            { text: '税务信息', max: 1000 },
            { text: '抵押担保', max: 1000 }
          ]
        }],
        calculable : true,
        series: [{
          name: '评分',
          type: 'radar',
          symbol: 'none',
          lineStyle: {
            color: '#619fd6'
          },
          data: [{
            value: [this.evaluationResult.outScore, this.evaluationResult.inScore, this.evaluationResult.pbScore,this.evaluationResult.financeScore,this.evaluationResult.surveyScore,this.evaluationResult.collateralScore],
            name: '总分1000'
          }]
        }]
      }
      charts1.setOption(option)
    },
    // table-row数组转化为table-col数组，[{a:'1',b:'2'},{a:'3',b:'4'}] => [{keyName1:'1',keyName2:'3'},{keyName1:'2',keyName2:'4'}]
    colToRow(res, keyArr, keyName = 'd') {
      let data = []
      if(!res || res.length==0){
        return data
      }
      let obj = res[0]
      let len = Object.keys(obj).length
      for (let i = 0; i < len; i++) {
        data[i] = {}
      }
      res.forEach((item, index) => {
        let n = 0
        let key_name = keyName + index
        for (let key in item) {
          data[n][key_name] = item[keyArr[n]]
          n++
        }
      })
      return data
    },
    getVideoDataCreditApproval(){
      console.log(1)
      api.getVideoDataCreditApproval({
        "compId": this.detailInfo.compId,
        "loanApplyId": this.loanApplyId
      }).then(({data}) => {
        if(data.code == 0 && data.message){
          let files = data.message
          if(files){
            for(let key in files){
              if(Array.isArray(files[key]) === true){
                files[key].forEach(file => {
                  if(file.fileCategory){
                    file.fileURL = api.getImgURL(window.encodeURIComponent(file.filepath))
                    file.fileName = Files[file.fileCategory]
                  }
                })
              }
            }
            this.uploadedFiles = files
          }
        }
      })
    },
    getUsccAndOrderNo(){
      api.getUsccAndOrderNo({
        incrCreditAuditId: this.detailInfo.loanIncrCreditAuditId
      }).then(res => {
        if(res.data.code == 0 && res.data.message){
          this.params.uscc = res.data.message.creditNo,
          this.params.bizCode = res.data.message.orderNo
        }
        this.getDcBankBusiness() // 行内业务
        this.getDcBasicInfo() // 基本情况
        this.getDcCreditHistory() // 信用历史
        this.getDcManagementSituation() // 经营情况
        this.getDcFinanceReport() // 财务报表
      })
    },
    getLoanApplyInfo(){

      api.getLoanApplyInfo({applyId:this.loanApplyId}).then(res => {
        if(res.data.code == 0 && res.data.message){
          this.loanInformation = res.data.message
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('approvalInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)

      // this.params.compId = this.detailInfo.compId
      if (this.detailInfo.readonly === true) { // 已审批，隐藏按钮
        this.readonly = false
      }
      this.loanApplyId = this.detailInfo.id
      this.params.companyName = this.detailInfo.compName
      this.params.uscc = this.detailInfo.compCreditNo
      this.params.bizCode = this.detailInfo.surveyNumber
    }
    this.getLoanApplyInfo()
    this.getUsccAndOrderNo()
    this.getCreditHistory()
    this.getCreditProof()
    this.getVideoDataCreditApproval()
    this.getApprovalRecord()
  }
}

</script>
<style lang="less" scoped>
.common-report-page {
  padding: 0 30px 82px;
  min-width: 1200px;
}

/*详情头部*/
.common-report-base {
  font-size: 12px;
  padding: 0px;
  margin: 0px;
  background: #fff;
  border: none;

  .base_message {
    margin-bottom: 30px;
    .detailInfo_message {
      position: relative;
      line-height: 37px;
    }
  }
}

/*详情内容*/
.common-report-page  .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
}

.common-report-page  .title h3 {
  font-size: 18px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}

.common-report-page .el-form-item {
  margin-bottom: 15px;
}

.detailInfo_message_tit {
  background: #e4e4e4;
  padding: 0 15px;
  position: relative;
  padding-top: 5px;
  border: solid 1px rgba(204, 204, 204, 1);

  tr span {
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
}

.detail-item {
  .style-key-value {
    margin-top: 10px;
    line-height: 20px;
    font-size: 13px;

    span {
      margin-bottom: 10px;
      display: inline-block;
      width: 160px;
      min-width: 160px;
    }

    &.flex-wrap .el-col {
      display: flex;
    }
  }
  .el-radio-group {
    margin-top: 10px;
  }

  p {
    line-height: 20px;
    font-size: 13px;
  }
}

#approval-container {
  height: 62px;
  line-height: 62px;
  position: fixed;
  bottom: 0;
  left: 210px;
  right: 46px;

  .approval-wrapper {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    box-shadow: rgba(102, 102, 102, 0.35) 0px -5px 5px;

    span {
      float: right;
      background: #43addc;
      text-align: center;
      width: 126px;
      font-size: 16px;
      line-height: 62px;
      color: #fff;
      cursor: pointer;
    }
  }
}

.approval-form {
  h3 {
    color: #333;
    border-bottom: solid 1px #eee;
    line-height: 30px;
    margin-bottom: 10px;
  }

  p {
    line-height: 30px;

    span {
      display: inline-block;
      width: 120px;
      color: #777;
    }
  }
}
.style-table {
  margin-top: 10px;
  width: 600px;
  border-collapse: collapse;

  th {
    font-weight: bold;
  }

  td,
  th {
    padding: 5px;
    vertical-align: middle;
    word-break: break-all;
    font-size: 13px;
    height: 30px;
  }

  &.border {

    td,
    th {
      border: solid 1px #999;
    }
  }
}
.img-box{
  width: 260px;
  min-height: 260px;
  // display: flex;
  // align-items: center;
  text-align: center;
  border-radius: 6px;
  overflow: auto;
  border: dashed 1px #d1d1d1;
  img{
    max-width: 100%;
    height: auto;
  }
}
.el-col{
  margin-top: 10px;
}
.img-wrap img{
  width: 100%;
  min-width: 100px;
  min-height: 100px;
  border: dashed 1px #d1d1d1;
}
.img-wrap{
  .el-col{
    margin-top: 5px;
  }
  p{
    margin-top: 10px;
  }
}

</style>
