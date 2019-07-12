<template>
  <div class="report-item">
    <div class="title"><h3>信用历史</h3>
    </div>
    <h4 class="style-h4">关键指标</h4>
    <table class="style-table border center" cellpadding="0" cellspacing="0">
      <tr>
        <th>维度</th>
        <th>关键指标</th>
        <th>指标取值</th>
        <th>评价</th>
      </tr>
      <template v-if="options.importantIndicator&&options.importantIndicator.length>0">
        <tr v-for="(item,index) in options.importantIndicator">
          <template v-if="index==2 || index==3 || index==4">
            <td>{{item.dimension}}</td>
          </template>
          <template v-else-if="index==0 || index==5">
            <td rowspan="2">{{item.dimension}}</td>
          </template>
          <td>{{item.indicator}}</td>
          <td>{{item.value}}</td>
          <td>{{item.evaluation}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="4">经查询，该企业无相关信息</td>
        </tr>
      </template>
    </table>
    <h5 class="style-h5">1.  企业人行征信</h5>
    <table class="style-table border center">
      <tr>
        <th>最早信贷记录年份</th>
        <td>{{options.companyMen.earliestYear}}</td>
        <th>历史还款记录</th>
        <td>{{options.companyMen.historyRecord}}</td>
      </tr>
      <tr>
        <th>最高信贷额度</th>
        <td>{{options.companyMen.highestAmt}}</td>
        <th>当前信贷余额</th>
        <td>{{options.companyMen.CurrentBalance}}</td>
      </tr>
      <tr>
        <th>当前还款状态</th>
        <td>{{options.companyMen.status}}</td>
        <th>当前对外担保</th>
        <td>{{options.companyMen.guaranty}}</td>
      </tr>
    </table>
    <h5 class="style-h5">2.  法定代表人人行征信</h5>
    <table class="style-table border center">
      <tr>
        <th>最早获得贷记卡时间</th>
        <td>{{options.representative.v01}}</td>
        <th>最早获得个人贷款时间</th>
        <td>{{options.representative.v02}}</td>
      </tr>
      <tr>
        <th>未销户贷记卡账户数</th>
        <td>{{options.representative.v03}}</td>
        <th>是否有房贷</th>
        <td>{{options.representative.v04}}</td>
      </tr>
      <tr>
        <th>未销户贷记卡平均额度</th>
        <td>{{options.representative.v05}}</td>
        <th>未结清贷款信息汇总合同总额</th>
        <td>{{options.representative.v06}}</td>
      </tr>
      <tr>
        <th>未销户贷记卡最高额度</th>
        <td>{{options.representative.v07}}</td>
        <th>当前贷款五级分类</th>
        <td>{{options.representative.v08}}</td>
      </tr>
      <tr>
        <th>未销户贷记卡最近6个月平均使用额度</th>
        <td>{{options.representative.v09}}</td>
        <th>未结清贷款信息汇总最近6个月平均应还款金额</th>
        <td>{{options.representative.v10}}</td>
      </tr>
      <tr>
        <th>贷记卡逾期月数</th>
        <td>{{options.representative.v11}}</td>
        <th>贷款逾期最长月份数</th>
        <td>{{options.representative.v12}}</td>
      </tr>
      <tr>
        <th>贷记卡逾期单月最高逾期总额</th>
        <td>{{options.representative.v13}}</td>
        <th>贷款逾期单月最高逾期总额</th>
        <td>{{options.representative.v14}}</td>
      </tr>
      <tr>
        <th>最近6个月征信报告查询次数</th>
        <td>{{options.representative.v15}}</td>
        <th>当前对外担保</th>
        <td>{{options.representative.v16}}</td>
      </tr>
    </table>
    <h5 class="style-h5">3.  相关人信用历史</h5>
    <!-- relevantPersons -->
    <template v-for="item in options.relevantPersons">
      <table class="style-table border center" >
        <tr>
          <th width="200">姓名/公司名称</th>
          <td colspan="2">{{item.name}}</td>
        </tr>
        <tr>
          <th>与企业关系</th>
          <td colspan="2">{{item.relation}}</td>
        </tr>
        <tr>
          <th rowspan="3">行内信贷</th>
          <td>额度</td>
          <td>{{item.creditLoan.limit}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{item.creditLoan.balance}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>{{item.creditLoan.status}}</td>
        </tr>
        <tr>
          <th rowspan="3">行内信用卡</th>
          <td>额度</td>
          <td>{{item.creditCard.limit}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{item.creditCard.balance}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>{{item.creditCard.status}}</td>
        </tr>
        <tr>
          <th rowspan="3">行内担保</th>
          <td>额度</td>
          <td>{{item.guarantee.limit}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{item.guarantee.balance}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>{{item.guarantee.status}}</td>
        </tr>
        <tr>
          <th rowspan="3">他行信贷</th>
          <td>额度</td>
          <td>{{item.anotherCreditLoan.limit}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{item.anotherCreditLoan.balance}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>{{item.anotherCreditLoan.status}}</td>
        </tr>
        <tr>
          <th rowspan="3">他行信用卡</th>
          <td>额度</td>
          <td>{{item.anotherCraditCarrd.limit}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{item.anotherCraditCarrd.balance}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>{{item.anotherCraditCarrd.status}}</td>
        </tr>
        <tr>
          <th rowspan="3">他行担保</th>
          <td>额度</td>
          <td>{{item.anotherGuarantee.limit}}</td>
        </tr>
        <tr>
          <td>余额</td>
          <td>{{item.anotherGuarantee.balance}}</td>
        </tr>
        <tr>
          <td>状态</td>
          <td>{{item.anotherGuarantee.status}}</td>
        </tr>
        <!-- <tr>
          <th colspan="3">司法信息</th>
        </tr>
        <tr>
          <td>标题</td>
          <td>类型</td>
          <td>时间</td>
        </tr>
        <tr v-for="item in item.judicialInfo">
          <td>{{item.title}}</td>
          <td>{{item.type}}</td>
          <td>{{item.time}}</td>
        </tr> -->
      </table>
    </template>
    <template v-if="!marketOrder">
      <h4 class="style-h4">涉诉及负面信息分析</h4>
      <p style="padding-left:15px;margin-top: 10px;"><b>{{options.badInfoAnalysis.analysis}}</b></p>
    </template>
    
    <h5 class="style-h5">4.  开庭公告</h5>
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.openCourtNotice&&options.openCourtNotice[0]">
      <tr>
        <td>序号</td>
        <td>案由</td>
        <td>案号</td>
        <td>原告/上诉人</td>
        <td>被告/被上诉人</td>
        <td>开庭日期</td>
        <td>当事人</td>
        <td>法院</td>
      </tr>
      <template v-if="options.openCourtNotice[0].caseNo">
        <tr v-for="(item,index) in options.openCourtNotice">
          <td>{{index+1}}</td>
          <td>{{item.caseReason || item.causeOfAction}}</td>
          <td>{{item.caseNo}}</td>
          <td>{{item.accuser || item.plaintiff}}</td>
          <td>{{item.defendant}}</td>
          <td>{{item.date || item.toHoldCourtDate}}</td>
          <td>{{item.parties || item.theParties}}</td>
          <td>{{item.court}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="8">暂无数据</td>
        </tr>
      </template>
    </table>
    <h5 class="style-h5">5.  裁判文书</h5>
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.refereeDoc&&options.refereeDoc[0]">
      <tr>
        <td>序号</td>
        <td>日期</td>
        <td>裁判文书</td>
        <td>案由</td>
        <td>案件身份</td>
        <td>案号</td>
      </tr>
      <template v-if="options.refereeDoc[0].caseNo">
        <tr v-for="(item,index) in options.refereeDoc">
          <td>{{index+1}}</td>
          <td>{{item.date}}</td>
          <td>{{item.doc || item.judicialDocuments}}</td>
          <td>{{item.caseReason || item.theCauseOfAction}}</td>
          <td>{{item.identity || item.lawCaseIdentity}}</td>
          <td>{{item.caseNo}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="6">暂无数据</td>
        </tr>
      </template>
    </table>
    <h5 class="style-h5">6.  法院公告</h5>
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.courtNotice&&options.courtNotice[0]">
      <tr>
        <td width="50">序号</td>
        <td width="100">公告时间</td>
        <td width="100">上诉方</td>
        <td width="100">被诉方</td>
        <td width="100">公告类型</td>
        <td width="100">法院</td>
        <td>公告内容</td>
      </tr>
      <template v-if="options.courtNotice[0].court">
        <tr v-for="(item,index) in options.courtNotice">
          <td>{{index+1}}</td>
          <td>{{item.date || item.announcementDate}}</td>
          <td>{{item.accuser ||item.appellant}}</td>
          <td>{{item.defendant}}</td>
          <td>{{item.type || item.announcementType}}</td>
          <td>{{item.court}}</td>
          <td style="font-size: 12px;text-align: left;">{{item.detailContent || item.announcementContent}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="7">暂无数据</td>
        </tr>
      </template>
    </table>
    <h5 class="style-h5">7.  执行公告</h5>
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.performNotice&&options.performNotice[0]">
      <tr>
        <td>序号</td>
        <td>立案日期</td>
        <td>执行标的</td>
        <td>案号</td>
        <td>执行法院</td>
      </tr>
      <template v-if="options.performNotice[0].caseNo">
        <tr v-for="(item,index) in options.performNotice">
          <td>{{index+1}}</td>
          <td>{{item.date || item.putOnRecordDate}}</td>
          <td>{{item.performNo || item.executiveStandard}}</td>
          <td>{{item.caseNo}}</td>
          <td>{{item.court || item.courtOfExecution}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="5">暂无数据</td>
        </tr>
      </template>
    </table>
    <h5 class="style-h5">8.  失信公告</h5>
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.dishonestNotice&&options.dishonestNotice[0]">
      <tr>
        <td>序号</td>
        <td>立案日期</td>
        <td>案号</td>
        <td>执行法院</td>
        <td>履行状态</td>
        <td>执行依据文号</td>
      </tr>
      <template v-if="options.dishonestNotice[0].caseNo">
        <tr v-for="(item,index) in options.dishonestNotice">
          <td>{{index+1}}</td>
          <td>{{item.date || item.putOnRecordDate}}</td>
          <td>{{item.caseNo}}</td>
          <td>{{item.court || item.courtOfExecution}}</td>
          <td>{{item.state || item.performStatus}}</td>
          <td>{{item.executeNo || item.executionBasisNumber}}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="6">暂无数据</td>
        </tr>
      </template>
    </table>
  </div>
          
          
          
</template>
<script>

export default {
  props: {
    /* 财务报表 */
    options: {
      type: Object
    },
    marketOrder: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      
    }
  },
  watch: {
    options: function(){
      console.log(this.options)
    }
  },
  methods: {
    
  }
}

</script>
<style lang="less" scoped>
.report-item .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
}

.report-item .title h3 {
  font-size: 18px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}
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
    background: #eee;
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
      border: solid 1px #ddd;
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
