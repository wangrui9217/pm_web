<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
    <div class="wrap">
      <div class="tit">合同信息</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>业务编号：</span><b>{{detailInfo.loanNo}}</b>
        </el-col>
        <el-col :span="8">
          <span>放款金额(元)：</span><b>{{detailInfo.loanAmount}}</b>
        </el-col>
        <el-col :span="8">
          <span>期限：</span><b>{{detailInfo.productLoanTrem}}个月</b>
        </el-col>
        <el-col :span="8">
          <span>申请产品：</span><b>{{detailInfo.productName}}</b>
        </el-col>
        <el-col :span="8">
          <span>申请时间：</span><b>{{detailInfo.applyTime}}</b>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>服务费类型：</span><b>{{detailInfo.proServiceCostValueType}}</b>
        </el-col>
        <el-col :span="8">
          <span>服务费(元)：</span><b>{{detailInfo.proServiceCost}}</b>
        </el-col>
        <el-col :span="8">
          <span>收取方式：</span><b>放款时-扣除</b>
        </el-col>
        <el-col :span="8">
          <span>利息类型：</span><b>{{detailInfo.proInterestValueType}}</b>
        </el-col>
        <el-col :span="8">
          <span>利率(年化)：</span><b>{{detailInfo.proInterestCost}}</b>
        </el-col>
        <el-col :span="8">
          <span>收取方式：</span><b>当期收取</b>
        </el-col>
      </el-row>
      <div class="tit">借款人信息</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>姓名：</span><b>{{detailInfo.legalName}}</b>
        </el-col>
        <el-col :span="8">
          <span>身份证：</span><b>{{detailInfo.legalIdno}}</b>
        </el-col>
        <el-col :span="8">
          <span>手机：</span><b>{{detailInfo.legalPhone}}</b>
        </el-col>
      </el-row>
      <div class="tit">放款账户信息</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>户名：</span><b>{{detailInfo.loamAccountUsername}}</b>
        </el-col>
        <el-col :span="8">
          <span>企业开户行：</span><b>{{detailInfo.loanBank || '泗阳农商行'}}</b>
        </el-col>
        <el-col :span="8">
          <span>账号：</span><b>{{detailInfo.loamAccountNum}}</b>
        </el-col>
        <el-col :span="8">
          <span>放款日期：</span><b>{{detailInfo.loanTime}}</b>
        </el-col>
      </el-row>
    </div>
  </page-template>
</template>
<script>

import api from '@/api-authority'
import PageTemplate from '@/components/page-template'
export default {
  components: {PageTemplate },
  data() {
    return {
      detailInfo: {},
      positionPath: [{ name: '贷款用信记录' }, { name: '贷款用信记录详情' }],
      loanRecordEntity: {},  // 用信信息
      proCostEntity: {},  // 合同/产品信息
      costValueTypeArr: ['','固定数字','年化利率','单次比率'],
      interestTypeArr: ['','固定数字','年化利率','单次比率'],
    }
  },
  methods: {
  },
  created() {
    let str = sessionStorage.getItem('loanRecordsInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.detailInfo.proServiceCostValueType = this.costValueTypeArr[this.detailInfo.proServiceCostValueType]
      this.detailInfo.proInterestValueType = this.interestTypeArr[this.detailInfo.proInterestValueType]
    }
  }
}

</script>
<style lang="less" scoped>
.wrap{
  padding: 15px;
  border: solid 1px #ddd;
  margin: 0 20px;
  .tit{
    border-bottom: solid 1px #ddd;
    padding-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }
  .el-row{
    margin-bottom: 30px;
    padding-top: 10px;
  }
  .el-col{
    padding: 10px 0;
    font-size: 13px;
    span{
      display: inline-block;
      width: 100px;
      color: #999;
    }
    b{
      font-weight: normal;
    }
  }
}
</style>
