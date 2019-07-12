<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="wrap">
      <div class="lwc-tit">合同信息</div>
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
          <span>利率(年化)：</span><b>{{detailInfo.proInterestCost}}‰</b>
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
    <lwcReport :options="options"></lwcReport>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
import lwcReport from '@/components/reports/lwcReport'
export default {
  components: { PageTemplate, lwcReport},
  data() {
    return {
      loading: false,
      detailInfo: {},
      positionPath: [ {name: '工单管理'},{name: '贷后突击检查工单详情'}],
      costValueTypeArr: ['','固定数字','年化利率','单次比率'],
      interestTypeArr: ['','固定数字','年化利率','单次比率'],
      options: {}
    }
  },
  computed: {

  },
  methods: {
    getCheckDetailLwc(){
      api.getCheckDetailLwc({
        orderId: this.detailInfo.id
      }).then(({data}) => {
        if(data.code == 0){
          let list = data.message
          let object = {}
          if(list instanceof Array){
            for(let i = 0; i < list.length;i++){
              let item = list[i]
              if(item.checkResult){
                item.checkResult = JSON.parse(item.checkResult)
              }
              else{
                item.checkResult = {}
              }
              let key = item.itemsCode.toLowerCase()
              if(key === 'c1' || key === 'c6' || key === 'c8' || key=='r2'){
                if(Array.isArray(item.checkResult) === false){
                  if(Object.keys(item.checkResult).length == 0){
                    item.checkResult = []
                  }
                  else{
                    item.checkResult = [item.checkResult]  
                  }
                }
              }
              else if(/s[1-6]/.test(key)){
                key = 's123456'
              }
              else if(/(m[1-6])|(t1)/.test(key)){
                key = 'm123456t1'
              }else if(/r(3|4)/.test(key)){
                key = 'r3_r4'
              }else if(/r(6|7|9|(10))/.test(key)){
                key = 'r67910'
              }else if(/r1(2|7)/.test(key)){
                key = 'r12_17'
              }
              else if(/r1[4-6]/.test(key)){
                key = 'r14_15_16'
              }
              if(key.length > 4){
                if(object[key]){
                  object[key].list.push(item)
                }
                else{
                  object[key] = {
                    list: [item]
                  }
                }
              }
              else{
                object[key] = item
              }
            }
          }
          for(let k in object){
            this.$set(this.options,k, object[k])
          }
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('lwcOrderInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.getCheckDetailLwc()
      this.detailInfo.proServiceCostValueType = this.costValueTypeArr[this.detailInfo.proServiceCostValueType]
      this.detailInfo.proInterestValueType = this.interestTypeArr[this.detailInfo.proInterestValueType]
    }
  },
  mounted() {
    
  }
}

</script>
<style lang="less" scoped>
.lwc-tit{
  margin-top: 20px;
  border-top: solid 1px #ddd;
  padding-top: 15px;
  font-weight: bold;
  font-size: 14px;
  span{
    font-weight: normal;
  }
}
.wrap{
  padding: 15px;
  border: solid 1px #ddd;
  margin: 0 20px;
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
.style-table {
  margin-top: 15px;
  width: 100%;
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
</style>
