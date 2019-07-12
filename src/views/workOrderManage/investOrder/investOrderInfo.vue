<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <table align="center" style="width: 100%;">
                <tr>
                  <td><span>客户名称：</span>{{detailInfo.compName}}</td>
                  <td><span>组织机构代码证：</span>{{detailInfo.creditNo}}</td>
                  <td><span>法人名称：</span>{{detailInfo.compLegalName}}</td>
                </tr>
                <tr>
                  <td><span>注册资本金(元)：</span> {{detailInfo.registerAmount}}</td>
                  <td><span>企业（机构）类型：</span> {{detailInfo.compNature}}</td>
                  <td><span>名单归属：</span>{{detailInfo.compRiskLevel}}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </section>
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
            <el-col :span="12"><span>正式授信额度：</span>{{evaluationResult.formalCreditLines}}</el-col>
          </el-row>
          <div id="charts1" class="charts"></div>
          <div>
            <h4 class="style-h4">报告说明</h4>
            <table class="style-table border" cellpadding="0" cellspacing="0">
              <tr>
                <th width="50">等级</th>
                <th width="80">分数区间</th>
                <th>说明</th>
              </tr>
              <tr v-for="item in lvAndScoreInstruction">
                <td >{{item.lv}}</td>
                <td >{{item.scope}}</td>
                <td>{{item.instruction}}</td>
              </tr>
              
            </table>
          </div>
          <h4 class="style-h4">营销记录</h4>
          <el-table highlight-current-row :data="marketingRecord" border style="margin-top: 15px;">
            <el-table-column prop="creditNumber" label="客户经理" align="center">
            </el-table-column>
            <el-table-column prop="creditResult" label="营销时间" align="center">
            </el-table-column>
            <el-table-column prop="creditAmount" label="实际经营地址" align="center">
            </el-table-column>
            <el-table-column prop="validTime" label="营销结果总结" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="提交时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope"><el-button type="text" @click="">查看完整记录</el-button></template>  
            </el-table-column>
          </el-table>
          </div>
        <!-- 基本情况 -->
        <baseBusinessInfo :options="baseBusinessInfoOptions"></baseBusinessInfo>
        <!-- 商标专利 -->
        <operationInfo :options="operationInfoOptions" ></operationInfo>
        <!-- 信用历史 -->
        <creditReport :options="creditReportOptions" :marketOrder="true"></creditReport>
        <!-- 行内业务 -->
        <bankBusiness :options="bankBusinessOptions" :marketOrder="true"></bankBusiness>

    </div>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import myPagination from "@/components/views/myPagination";
import api from '@/api-authority'
import baseBusinessInfo from "@/components/reports/baseBusinessInfo";
import operationInfo from "@/components/reports/operationInfo";
import financeReport from "@/components/reports/financeReport";
import creditReport from "@/components/reports/creditReport";
import bankBusiness from "@/components/reports/bankBusiness";
// import dateForm from "@/utils/dateForm";


export default {
  components: { PageTemplate, myPagination,baseBusinessInfo, operationInfo, financeReport, creditReport, bankBusiness },
  data() {
    return {
      creditHistory: [],
      tabPosition: 'top',
      creditHistoryTotal: 0,
      showApprovalDialog: false,
      loading: false,
      detailInfo: {},
      readonly: true,
      status: '审批中',
      userId: JSON.parse(localStorage.userinfo).id,
      username: JSON.parse(localStorage.userinfo).username,
      positionPath: [ {name: '工单管理'},{name: '调查工单详情'}],
      params: {
        bizCode: '',
        companyName: '',
        uscc: ''
      },
      /* 基本情况 */
      lvAndScoreInstruction: [], // 报告说明
      evaluationResult: {}, // 评估结果
      marketingRecord: [], // 营销记录
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
        supplier_firstFive: [], // 前五⼤上游供应商企业
        supplier_firstThird: [], // 按交易金额划分的前三大企业类型
        customers: [], // 客户数⽬及⾦额
        customer_firstFive: [], // 前五⼤客户企业
        customer_firstThird: [], // 按交易金额划分的前三大客户类型
        survey: [], // 发票信息线下调查
        brand: [], // 商标信息
        patent: [], // 专利
        copyright: [], // 著作权
        inMarket: [], // 上市信息
        publicOpinion: [], // 舆情信息
        importantIndicator: [], // 关键指标
        companyOrperationImportantInfo: {}, // 公司经营关键信息
        analyze: [] // 销售产品分析
      },
      /* 信用历史 */
      creditReportOptions: {
        companyMen: {}, // 企业⼈⾏征信
        representative: {}, // 法定代表⼈⼈⾏征信
        relevantPersons: [], // 相关⼈信用历史
        judicialInfo: [], // 司法信息
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
    getMarketDcBankBusiness() {

      api.getMarketDcBankBusiness(this.params).
      then(({ data }) => {
        if (data.code == 0 && data.message) {
          let message = data.message.data
          // let anotherLine = message.anotherLine
          // anotherLine = this.colToRow(anotherLine, ['date', 'initialBalance', 'endingBalance', 'bearingSum', 'avg'])
          message.keyIndicators = message.keyIndicators||[]
          message.keyIndicators.forEach(item => {
            item.evaluation=item.evaluate,
            item.value=item.getIndicatorValue,
            item.indicator=item.keyIndicator
          })
          this.bankBusinessOptions = {
            importantIndicator: message.keyIndicators,
            dataReport: message.bankAccountReport.dataReport,
            affiliateReport_ee: message.bankAccountReport.affiliateReport.ee || {},
            affiliateReport_pe: message.bankAccountReport.affiliateReport.pe || {},
            monthStatistics: message.bankLineAnalyze.monthStatistics,
            firstIn: message.bankLineAnalyze.firstIn,
            firstOut: message.bankLineAnalyze.firstOut,
            anotherLine: [],
            otherRisk: message.otherRisk,
            enterpriseGuaranteeCircle: message.enterpriseGuaranteeCircle,
            relatedPeopleCircle: message.relatedPeopleCircle, // 相关人关系
            adeptCircle: message.adeptCircle, //行业交易圈
          }
        } else {
          this.$message.error('请求失败')
        }
      }).catch(err =>{})
    },
    getZsCreditHistory() {
      api.getZsCreditHistory(this.params).
      then(({ data }) => {
        if (data.code === 0 &&data.message) {
          let message = data.message.data
          message.keyIndicators = message.keyIndicators||[]
          message.keyIndicators.forEach(item => {
            item.evaluation=item.evaluate,
            item.value=item.getIndicatorValue,
            item.indicator=item.keyIndicator
          })
          this.creditReportOptions = {
            importantIndicator: message.keyIndicators,
            relevantPersons: message.relevantPerson,
            companyMen: message.companyMen,
            representative: message.representative,
            openCourtNotice: [message.courtSessionAnnouncement],
            refereeDoc: [message.judicialDocuments],
            courtNotice: [message.courtAnnouncement],
            performNotice: [message.executAnnouncement],
            dishonestNotice: [message.breakFaithAnnouncement]
          }
          
        } else {
          this.$message.error('请求失败')
        }
      }).catch(err =>{})
    },
    
    getMarketDcBasicInfo() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      api.getMarketDcBasicInfo(this.params).
      then(({ data }) => {
        loading.close();
        if (data.code === 0 && data.message) {
          let message = data.message.data
          message.keyIndicators = message.keyIndicators||[]
          message.keyIndicators.forEach(item => {
            item.evaluation=item.evaluate,
            item.value=item.getIndicatorValue,
            item.indicator=item.keyIndicator
          })
          message.shareholderInfo.forEach(item => {
            item.evaluation=item.name
            item.captial=item.amountSubscribedContribution
            item.ratio=item.capitalContributionRatio
          })
          message.outboundInvestment.forEach(item => {
            item.date=item.dateEstablishment
            item.name=item.enterpriseName
            item.captial=item.registeredCapital
            item.ratio=item.capitalContributionRatio
          })
          
          if(message.basicEnterpriseInformation){
            if(message.basicEnterpriseInformation.businessDateBeginning){
              message.basicEnterpriseInformation.businessDateStart = message.basicEnterpriseInformation.businessDateBeginning
            }
            if(message.basicEnterpriseInformation.businessDateTo){
              message.basicEnterpriseInformation.businessDateEnd = message.basicEnterpriseInformation.businessDateTo
            }
          }
          let obj = {
            importantIndicator: message.keyIndicators,
            toOutwardInvest: message.outboundInvestment,
            baseInfo: message.basicEnterpriseInformation,
            shareholdersInfo: message.shareholderInfo
          }
          this.evaluationResult = message.evaluationResult || {}
          this.lvAndScoreInstruction =[{"instruction":"偿还债务的能力极强，基本不受不利经济环境的影响，违约风险极低","scope":"750以上","lv":"1"},{"instruction":"偿还债务的能力很强，受不利经济环境的影响不大，违约风险很低","scope":"700-750","lv":"2"},{"instruction":"偿还债务能力较强，较易受不利经济环境的影响，违约风险较低","scope":"600-700","lv":"3"},{"instruction":"偿还债务能力一般，受不利经济环境影响较大，违约风险一般","scope":"550-600","lv":"4"},{"instruction":"偿还债务能力较弱，受不利经济环境影响很大，违约风险较高","scope":"450-550","lv":"5"},{"instruction":"偿还债务的能力较大地依赖于良好的经济环境，违约风险很高","scope":"400-450","lv":"6"},{"instruction":"偿还债务的能力极度依赖良好的经济环境，违约风险极高","scope":"300-400","lv":"7"},{"instruction":"在破产或重组时可获得较小的保护，基本不能保证偿还债务","scope":"250-300","lv":"8"},{"instruction":"风险极高，基本不能偿还债务","scope":"200-250","lv":"9"},{"instruction":"风险极高，存在很多司法等负面信息，不能偿还债务","scope":"150-200","lv":"10"},{"instruction":"风险极高，存在大量不良信息，不能偿还债务","scope":"150以下","lv":"11"}]
          // this.marketingRecord = message.marketingRecord
          let governance = message.governance
          delete message.evaluationResult
          delete message.governance
          delete message.lvAndScoreInstruction
          this.baseBusinessInfoOptions = Object.assign(obj, message, governance)
          console.log(this.baseBusinessInfoOptions, 'this.baseBusinessInfoOptions')
          this.initCharts1()
          this.operationInfoOptions = Object.assign({},this.operationInfoOptions, {
            patent: message.patent,
            brand: message.trademarkInfo,
            copyright: message.copyright,
            publicOpinion: message.publicOpinionInfo,
            inMarket: [message.listingInformation]
          })
        } else {
          this.$message.error('请求失败')
        }
      }).catch(err =>{})
    },
    
    initCharts1() {
      let charts1 = echarts.init(document.getElementById('charts1'))
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        polar:[{
          indicator: [
            { text: '人行评分', max: 1000 },
            { text: '外部评分', max: 1000 },
            { text: '行内评分', max: 1000 }
          ]
        }],
        calculable : true,
        series: [{
          name: '评分',
          type: 'radar',
          lineStyle: {
            color: '#619fd6'
          },
          data: [{
            value: [this.evaluationResult.pbScore, this.evaluationResult.outScore, this.evaluationResult.inScore],
            name: '总分1000'
          }]
        }]
      }
      charts1.setOption(option)
    },
    // table-row数组转化为table-col数组，[{a:'1',b:'2'},{a:'3',b:'4'}] => [{keyName1:'1',keyName2:'3'},{keyName1:'2',keyName2:'4'}]
    colToRow(res, keyArr, keyName = 'd') {
      let data = []
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
    getApplyCreditNo(){
   
      api.getApplyCreditNo({
        id: this.detailInfo.id
      }).then(({data}) => {
        if(data.code == 0 && data.message){
          this.params.bizCode = data.message
          this.getMarketDcBankBusiness() // 行内业务
          this.getMarketDcBasicInfo() // 基本情况
          this.getZsCreditHistory() // 信用历史
          this.getMarketRecords() // 
        }
      })
    },
    getMarketRecords(){
      api.getMarketRecords(this.params).
      then(({ data }) => {
        if (data.code === '1') {
          this.marketingRecord = data.data
          
        } else {
          this.$message.error('请求失败')
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('investInfo')
    if (str) {
      
      this.detailInfo = JSON.parse(str)
      this.params.companyName = this.detailInfo.compName
      this.params.uscc = this.detailInfo.creditNo
      
      this.getApplyCreditNo()
    }
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

.detailInfo_message_tit {
  background: #e4e4e4;
  padding: 0 15px;
  position: relative;
  padding-top: 15px;
  border: solid 1px rgba(204, 204, 204, 1);

  tr span {
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
}
.detail-item {
  margin-top: 20px;

  .style-key-value {
    margin-top: 10px;
    line-height: 20px;
    font-size: 13px;

    span {
      margin-bottom: 10px;
      display: inline-block;
      width: 120px;
      min-width: 120px;
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

</style>
