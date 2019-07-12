<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <table align="center" style="width: 100%;">
                <tr>
                  <td width="300"><span>客户名称：</span>{{detailInfo.compName}}</td>
                  <td width="300"><span>法人名称：</span>{{detailInfo.legalName}}</td>
                  <td width="300"><span>身份证：</span> {{detailInfo.legalIdno}}</td>
                </tr>
                <tr>
                  <td><span>名单归属：</span>{{detailInfo.compRiskLevel}}</td>
                  <td><span>手机号码：</span>{{detailInfo.legalPhone}}</td>
                  <td></td>
                </tr>
              </table>
              <div class="credit-no">授信编号 ：{{detailInfo.applyNum}}</div>
              <div class="credit-tag">{{status}}</div>
            </div>
          </section>
        </div>
      </section>
      <el-tabs type="border-card">
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
        <el-tab-pane label="正式调查报告">
          <!-- 概览 -->
          <div class="detail-item">
            <div class="title"><h3>概览</h3>
            </div>
            <el-row class="style-key-value flex-wrap" :gutter="10">
              <el-col :span="12"><span>准入结果：</span>{{evaluationResult.admittanceResult}}</el-col>
              <el-col :span="12"><span>拒绝原因：</span>{{evaluationResult.rejectReason}}</el-col>
              <el-col :span="12"><span>信用评分：</span>{{evaluationResult.creditScore=='-9999'?'数据异常':evaluationResult.creditScore}}</el-col>
              <el-col :span="12"><span>信用等级：</span>{{evaluationResult.creditLevel=='-9999'?'数据异常':evaluationResult.creditLevel}}</el-col>
              <el-col :span="12"><span>利率等级：</span>{{evaluationResult.rateLevel=='-9999'?'数据异常':evaluationResult.rateLevel}}</el-col>
              <el-col :span="12"><span>等级释义：</span>{{evaluationResult.levelParaphrase}}</el-col>
              <el-col :span="12"><span>系统建议额度：</span>{{evaluationResult.systemSuggestLines=='-9999'?'数据异常':(evaluationResult.systemSuggestLines||''+'元')}}</el-col>
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
            <el-radio-group v-model="tabPosition" >
              <el-radio-button label="top">企业证件</el-radio-button>
              <el-radio-button label="right">法人证件</el-radio-button>
              <el-radio-button label="bottom">财务报表</el-radio-button>
              <el-radio-button label="left">其他</el-radio-button>
            </el-radio-group>
            <div class="file-wrap">
              <div v-show="tabPosition==='top'">
                <el-row v-if="uploadedFiles.officialCreditInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.officialCreditInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-show="tabPosition==='right'">
                <el-row v-if="uploadedFiles.customerInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.customerInfo" :key="index">
                    <p>{{file.fileName}}</p>
                    <!-- <el-col :span="6" v-if="item.fileCategory != 'liveness_image'">
                  <img :src="item.url" alt="">
                </el-col>
                <el-col :span="6" v-else>
                  <video> :src="item.url" controls></video>
                </el-col> -->
                    <div class="img-box" v-if="file.fileCategory != 'liveness_image'">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                    <div class="img-box" v-else>
                      <video :src="file.fileURL" width="258" height="258" controls></video>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-show="tabPosition==='bottom'">
                <el-row v-if="uploadedFiles.surveyRunningAccountInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyRunningAccountInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="uploadedFiles.surveyTaxInvoiceInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyTaxInvoiceInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-show="tabPosition==='left'">
                <el-row v-if="uploadedFiles.surveyOrderAddrInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyOrderAddrInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="uploadedFiles.surveyPledgeInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyPledgeInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName" >
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="uploadedFiles.surveyRiskInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyRiskInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="uploadedFiles.surveyTradeInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyTradeInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="uploadedFiles.surveyUploadInfo">
                  <el-col :span="6" v-for="(file,index) in uploadedFiles.surveyUploadInfo" :key="index">
                    <p style="height: 20px;">{{file.fileName}}</p>
                    <div class="img-box">
                      <img :src="file.fileURL" alt="" preview="0" :preview-text="file.fileName">
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批记录">
          <div class="detail-item">
            <div class="title"><h3>审批历史</h3>
            </div>
            <el-table highlight-current-row :data="examineHistory" style="margin-top: 15px;">
              <el-table-column prop="auditNumber" label="编号" align="center">
              </el-table-column>
              <el-table-column prop="autoUserName" label="审批人" align="center">
              </el-table-column>
              <el-table-column prop="auditTime" label="审批时间" align="center">
              </el-table-column>
              <el-table-column prop="auditNode" label="审批节点" align="center" :formatter="format">
              </el-table-column>
              <el-table-column prop="auditResult" label="审批结果" align="center">
              </el-table-column>
              <el-table-column prop="auditCreditAmount" label="授信额度(元)" align="center">
              </el-table-column>
              <el-table-column prop="auditCreditValidTime" label="授信有效期" align="center">
              </el-table-column>
              <el-table-column prop="rejectMsg" label="拒绝原因" align="center">
              </el-table-column>
              <el-table-column prop="auditMsg" label="备注" align="center">
              </el-table-column>
            </el-table>
            <my-pagination @paginationChange="getExamineHistory" ref="examineHistory" :total="examineHistoryTotal"></my-pagination>
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
          <el-form-item label="审核结果：" prop="auditResult" required>
            <el-radio-group v-model="approvalForm.auditResult" @change="handleResultChange">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="approvalForm.auditResult==1">
            <h3>系统授信结果</h3>
            <el-row>
              <el-col :span="12">
                <p><span>授信金额：</span>{{detailInfo.modelAdviseAmount}}</p>
              </el-col>
              <el-col :span="12">
                <p><span>授信有效期：</span>30天</p>
              </el-col>
            </el-row>
            <h3>审批授信结果</h3>
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="授信金额(元)：" prop="auditCreditAmount" :rules="[{ required: true, message: '请输入授信金额' }, {pattern:/^(0|([1-9]\d*))$/ , message: '请输入自然数'}]">
                  <el-input v-model="approvalForm.auditCreditAmount" :maxLength="13">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="授信有效期：" prop="auditCreditValidTime" :rules="{required: true, message: '请选择授信有效期'}">
                  <el-date-picker v-model="approvalForm.auditCreditValidTime" type="date" value-format="yyyy-MM-dd" format="yyyy/MM/dd" :picker-options="pickerOptions" placeholder="年/月/日">
                  </el-date-picker>
                </el-form-item>
              </el-col>
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
                  <el-select v-model="approvalForm.rejectMsg" placeholder="请选择拒绝原因" style="width: 250px;">
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
import ApprovalStatus from "@/const/ApprovalStatus"; // 审批流程状态
import baseBusinessInfo from "@/components/reports/baseBusinessInfo";
import operationInfo from "@/components/reports/operationInfo";
import financeReport from "@/components/reports/financeReport";
import creditReport from "@/components/reports/creditReport";
import bankBusiness from "@/components/reports/bankBusiness";
import Files from "@/const/files";


export default {
  components: { PageTemplate, myPagination,baseBusinessInfo, operationInfo, financeReport, creditReport, bankBusiness },
  data() {
    return {
      creditHistory: [],
      examineHistory: [],
      detailInfo: {},
      tabPosition: 'top',
      creditHistoryTotal: 0,
      examineHistoryTotal: 0,
      approvalForm: {
        auditResult: '1',
        auditMsg: '',
        auditCreditValidTime: '',
        auditCreditAmount: '',
        rejectMsg: '',
        remark: ''
      },
      approvalStatus: ApprovalStatus,
      showApprovalDialog: false,
      rules: Rules,
      loading: false,
      rejectMsgArr: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      readonly: true,
      status: '审批中',
      userId: JSON.parse(localStorage.userinfo).id,
      username: JSON.parse(localStorage.userinfo).username,
      positionPath: [{ name: '审批管理' }, { name: '提额审批' }, { name: '审批详情' }],
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
        survey: [], // 发票信息线下调查
        brand: [], // 商标信息
        upSummary: {},
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
        trend: {}, // 发展趋势
        industry: {},
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
      }
    }
  },
  computed: {

  },
  methods: {
    getDcBankBusiness() {
      api.getDcBankBusiness(this.params).
      then(({ data }) => {
        console.log(data,'3232')
        if (data.code == 0 && data.message&&data.message.data) {
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
        if (data.code === 0 && data.message&&data.message.data) {
          let message = data.message.data
          this.creditReportOptions = {
            importantIndicator: message.importantIndicator,
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
        if (data.code === 0 && data.message&&data.message.data) {
          let message = data.message.data
          let incurDebts = message.incurDebts || []
          let profits = message.profits || []
          let financeReportOptions = {}
          financeReportOptions.incurDebts = incurDebts
          financeReportOptions.profits = profits
          // financeReportOptions.cashFlow = message.cashFlow || []
          let businessScale = message.businessScale || {list: [],
          evaluation: ''}
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
        if (data.code === 0 && data.message&&data.message.data) {
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
            inMarket: message.inMarket?[message.inMarket]:[],
            publicOpinion: message.publicOpinion,
            importantIndicator: message.importantIndicator,
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
        if (data.code === 0 && data.message&&data.message.data) {
          let message = data.message.data
          if(message){
            this.evaluationResult = message.evaluationResult
            this.lvAndScoreInstruction = message.lvAndScoreInstruction
            let governance = message.governance
            delete message.evaluationResult
            delete message.lvAndScoreInstruction
            delete message.governance
            this.baseBusinessInfoOptions = Object.assign(message, governance)
            this.detailInfo.modelAdviseAmount = this.evaluationResult.systemSuggestLines
            this.detailInfo.lowRiskLines = this.evaluationResult.lowRiskLines   // 审批需要
            this.detailInfo.year = this.evaluationResult.year // 审批需要
            this.getCompManagerInfo() // 公司治理及人员信息
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
        "state": this.detailInfo.raiseState,
        "auditUserId": this.userId
      }
      params = Object.assign(params, paginationData)
      api.searchCreditHistory(params).
      then((res) => {
        if (res.data.code == '0') {
          this.creditHistory = res.data.message.list;
          this.creditHistory.forEach(item => {
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
    getExamineHistory(paginationData = { pageNum: 1, pageSize: 10 }) {
      let params = {
        "auditId": 0,
        "auditUserName": this.username,
        "auditUserId": this.userId,
        "compId": this.detailInfo.compId,
        "condition": "",
        "phone": "",
        "state": this.detailInfo.raiseState
      }
      if (this.detailInfo.readonly === true) { // 已审批，取incrCreditAuditId
        params.auditId = this.detailInfo.incrCreditAuditId
      } else {
        params.auditId = this.detailInfo.id
      }
      params = Object.assign(params, paginationData)
      api.searchExamineHistory(params).
      then((res) => {
        if (res.data.code == '0') {
          this.examineHistory = res.data.message.list;
          this.examineHistory.forEach(item => {
            item.auditResult = item.auditResult == 1 ? '通过' : '拒绝'
          })
          this.examineHistoryTotal = res.data.message.total
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getVideoData(){
      api.getVideoData({
        "applyNum": this.detailInfo.applyNum,
        "incrCreditAuditId": this.detailInfo.incrCreditAuditId || this.detailInfo.id
        // "applyNum": "SX20190329030514094",
        // "incrCreditAuditId": 95
      }).
      then((res) => {
        if (res.data.code == '0') {
          let files = res.data.message
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
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    openApproval() {
      this.showApprovalDialog = true
      this.resetFormData()
      this.$nextTick(() => {
        this.$refs['approval-form'].clearValidate()
      })
    },
    resetFormData() {
      for (let k in this.approvalForm) {
        if (k === 'auditResult') {
          this.approvalForm[k] = '1'
        } else {
          this.approvalForm[k] = ''
        }
      }
      // this.approvalForm.auditCreditAmount = this.detailInfo.lastAuditAmount
      // this.approvalForm.auditCreditValidTime = this.detailInfo.lastAuditCreditValidTime
    },
    submit() {
      this.$refs['approval-form'].validate(valid => {
        if (valid) {
          let params = Object.assign({
            "auditCreditAmount": 0,
            "auditCreditValidTime": null,
            "auditMsg": "",
            "auditResult": 0,
            "auditTime": null,
            "auditUserId": this.userId,
            "autoUserName": this.username,
            "createBy": 0,
            "createTime": null,
            "id": 0,
            "incrCreditAuditId": 1,
            "receiveTime": null,
            "rejectMsg": "",
            "rejectMsg2": "",
            "updateBy": 0,
            "updateTime": null,
            lowRiskAmount: this.detailInfo.lowRiskLines?(''+this.detailInfo.lowRiskLines):'',
          }, this.approvalForm)
          if(!params.lowRiskAmount){
            this.$message.error('调查报告缺少贴现额度')
            return false
          }
          if(params.lowRiskAmount && params.lowRiskAmount.indexOf('万元') > -1){
            params.lowRiskAmount = params.lowRiskAmount.replace('万元', '0000')
          }
          params.incrCreditAuditId = Number(this.detailInfo.id)
          if (this.detailInfo.readonly === true) { // 已审批，取incrCreditAuditId
            params.incrCreditAuditId = this.detailInfo.incrCreditAuditId
          } else {
            params.incrCreditAuditId = this.detailInfo.id
          }
          if (params.auditResult == '0') {
            params.auditMsg = params.remark
            params.auditCreditValidTime = null
          } else {
            params.auditCreditValidTime = params.auditCreditValidTime + ' 00:00:00'
          }
          this.loading = true
          delete params.remark
          if (this.detailInfo.raiseState == 1) {
            params.year = this.detailInfo.year
             if(!params.year){
            this.$message.error('调查报告缺少年份')
            return false
          }
            api.submitFirstReply(params).
            then((res) => {
              this.loading = false
              this.showApprovalDialog = false
              if (res.data.code == 0) {
                this.$message.success('审批成功')
                this.status = '一人审批已审批'
                this.detailInfo.readonly = true
                this.detailInfo.formatStatus = this.status
                this.readonly = false
                sessionStorage.setItem('approvalInfo', JSON.stringify(this.detailInfo))
                this.$refs['examineHistory'].reset({
                  pageNum: 1
                });
              } else {
                this.$message.error(res.data.message)
              }
            })
          } else if (this.detailInfo.raiseState == 2) {
            api.submitSecondReply(params).
            then((res) => {
              this.loading = false
              this.showApprovalDialog = false
              if (res.data.code == 0) {
                this.$message.success('审批成功')
                this.status = '贷审会已审批'
                this.detailInfo.readonly = true
                this.detailInfo.formatStatus = this.status
                this.readonly = false
                sessionStorage.setItem('approvalInfo', JSON.stringify(this.detailInfo))
                this.$refs['examineHistory'].reset({
                  pageNum: 1
                });
                this.$refs['creditHistory'].reset({
                  pageNum: 1
                });
              } else {
                this.$message.error(res.data.message)
              }
            })
          }
        }
      })
    },
    handleResultChange(val) {
      this.approvalForm.auditCreditAmount = ''
      this.approvalForm.auditCreditValidTime = ''
      this.approvalForm.auditMsg = ''
      this.approvalForm.remark = ''
      this.approvalForm.rejectMsg = ''
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
    format(row, column, cellValue, index){
      if(cellValue){
        let arr = ['', '一人审批', '贷审会']
        return arr[cellValue]
      }
      else{
        return ''
      }
    },
    getCompManagerInfo(){
      api.getCompManagerInfo(this.params).then(({data}) => {
        if(data.code == '1'){
          this.baseBusinessInfoOptions = Object.assign({}, this.baseBusinessInfoOptions, data.data)
        }
      })
    },
    getUsccAndOrderNo(){
      let params = {}
      if (this.detailInfo.readonly === true) { // 已审批，取incrCreditAuditId
            params.incrCreditAuditId = this.detailInfo.incrCreditAuditId
          } else {
            params.incrCreditAuditId = this.detailInfo.id
          }
      api.getUsccAndOrderNo(params).then(res => {
        if(res.data.code == 0 && res.data.message){
          this.params.uscc = res.data.message.creditNo,
          this.params.bizCode = res.data.message.orderNo
          
          this.getDcBankBusiness() // 行内业务
          this.getDcBasicInfo() // 基本情况
          this.getDcCreditHistory() // 信用历史
          this.getDcManagementSituation() // 经营情况
          this.getDcFinanceReport() // 财务报表
          
        }
      })
    },
    searchReasons(){
      api.searchReasons({
        "reasonCode": "QUOTA_APPROVAL"
      }).then(res => {
        if(res.data.code == 0 && res.data.message){
            if(res.data.message.length){
                 this.rejectMsgArr=res.data.message.map(el=>{
                   return  {label:el.reasonName,value:el.reasonCode}
                 })
            }
       
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('approvalInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.params.companyName = this.detailInfo.compName
        
      this.getUsccAndOrderNo()

      if (this.detailInfo.readonly === true) { // 已审批，隐藏按钮
        this.readonly = false
        this.status = this.detailInfo.formatStatus?this.detailInfo.formatStatus:this.approvalStatus['s' + this.detailInfo.status]
      }
    }
    this.getExamineHistory()
    this.getCreditHistory()
    this.getVideoData()  // 补充影像资料
    this.searchReasons()
  },
  mounted() {
    
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
    height: 148px;

    .detailInfo_message {
      position: relative;
      line-height: 37px;

      .credit_center {
        position: absolute;
        top: 48px;
        left: 470px;
      }

      .credit_number {
        font-family: "MicrosoftYaHei";
        font-weight: 700;
        font-size: 14px;
      }

      .tit_content {
        padding-left: 215px;
      }

      .approval_ing {
        font-size: 22px;
        float: right;
        color: #55a8fd;
        padding-right: 0px;
      }
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
  padding-top: 35px;
  border: solid 1px rgba(204, 204, 204, 1);

  tr span {
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
}

// 
.credit-no {
  position: absolute;
  left: -2px;
  top: 10px;
  line-height: 20px;
  background: rgba(0, 128, 0, 1);
  color: #fff;
  padding: 0 3px;
}

.credit-tag {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  color: #bcbcbc;
  font-weight: bold;
}

.detail-item {
  //margin-top: 20px;

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

  .el-radio-button {
    //margin-right: 10px;
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

// .style-state{
//   margin-top: 20px;
.style-h4 {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
}

.style-h5 {
  font-size: 14px;
  font-weight: normal;
  margin-top: 15px;
  margin-bottom: 5px;
}

.style-ul {
  li {
    line-height: 22px;
    font-size: 13px;
  }
}

// }
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

  &.center {
    width: 100%;
    table-layout: fixed;

    td,
    th {
      text-align: center;
    }
  }
}
.charts {
  width: 600px;
  height: 320px;
  margin: auto;
  border: solid 1px #ddd;
  padding: 10px;
}

.no-border-left {
  margin-left: -1px;

  .style-table {
    td {
      border-left: none;
    }
  }
}
.file-wrap{
  // min-width: 1220px;
  // overflow: auto;
}
.img-box{
  width: 260px;
  // min-height: 260px;
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
</style>
