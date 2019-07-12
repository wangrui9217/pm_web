<template>
	<div style="padding: 20px;">
    <h2 style="font-weight: 600;font-size: 16px;color: #000;margin-bottom: 20px;">预警信号</h2>
    <div v-if="options.c1">
      <div class="lwc-tit">法定代表人变更<span style="color:red">红灯</span>：<span>{{options.c1.signalItems}}-{{options.c1.signalContent}}</span></div>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>最新法定代表人姓名</th>
          <th>身份证号</th>
          <th>手机号</th>
          <th>常用借记卡卡号</th>
        </tr>
        <tr v-for="item in options.c1.checkResult">
          <td>{{item.name}}</td>
          <td>{{item.idNo}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.bankCard}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c2">
      <div class="lwc-tit">注册资本变更<span style="color:red">红灯</span>：<span>{{options.c2.signalItems}}-{{options.c2.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">注册资本减少原因</th>
          <td>{{options.c2.checkResult.P1}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c3">
      <div class="lwc-tit">行业变更<span style="color:red">红灯</span>：<span>{{options.c3.signalItems}}-{{options.c3.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">公司曾经所处行业是发生较大不利政策变动</th>
          <td>{{options.c3.checkResult.P2}}</td>
        </tr>
        <tr>
          <th>行业变更原因</th>
          <td>{{options.c3.checkResult.P3}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c4">
      <div class="lwc-tit">注册地址变更<span style="color:red">红灯</span>：<span>{{options.c4.signalItems}}-{{options.c4.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">实际工作地址是否与注册地址一致</th>
          <td>{{options.c4.checkResult.P4 | getBoolean}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c5">
      <div class="lwc-tit">经营范围变更<span style="color:orange">黄灯</span>：<span>{{options.c5.signalItems}}-{{options.c5.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">经营范围变更原因</th>
          <td>{{options.c5.checkResult.P5}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c6">
      <div class="lwc-tit">股东变更<span style="color:red">红灯</span>：<span>{{options.c6.signalItems}}-{{options.c6.signalContent}}</span></div>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>变更后自然人股东姓名</th>
          <th>身份证号</th>
          <th>手机号</th>
          <th>常用借记卡卡号</th>
        </tr>
        <tr v-for="item in options.c6.checkResult">
          <td>{{item.name}}</td>
          <td>{{item.idNo}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.bankCard}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c7">
      <div class="lwc-tit">新增对外投资<span style="color:orange">黄灯</span>：<span>{{options.c7.signalItems}}-{{options.c7.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">新增对外投资企业是否正常经营</th>
          <td>{{options.c7.checkResult.P6 | getBoolean}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.c8">
      <div class="lwc-tit">人员变更<span style="color:red">红灯</span>：<span>{{options.c8.signalItems}}-{{options.c8.signalContent}}</span></div>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>新增董监高姓名</th>
          <th>身份证号</th>
          <th>手机号</th>
          <th>常用借记卡卡号</th>
        </tr>
        <tr v-for="item in options.c8.checkResult">
          <td>{{item.name}}</td>
          <td>{{item.idNo}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.bankCard}}</td>
        </tr>
        <tr v-if="options.c8.checkResult.length>0">
          <th>最新员工人数</th>
          <td colspan="3">{{options.c8.checkResult[0].staff_num}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.s123456">
      <div v-for="item in options.s123456.list">
        <div class="lwc-tit">司法风险<span style="color:red">红灯</span>：<span>{{item.signalItems}}-{{item.signalContent}}</span></div>
        <table class="style-table border" cellpadding="0" cellspacing="0">
          <tr>
            <th width="50%">新增司法信息原因</th>
            <td>{{item.checkResult.P7}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="options.m123456t1">
      <div v-for="item in options.m123456t1.list">
        <div class="lwc-tit">经营风险<span style="color:red">红灯</span>或天创探针<span style="color:red">红灯</span>：<span>{{item.signalItems}}-{{item.signalContent}}</span></div>
        <table class="style-table border" cellpadding="0" cellspacing="0">
          <tr>
            <th width="50%">企业关键人员失联（经营决策人员、高管、关键技术人员）</th>
            <td>{{item.checkResult.P9 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">企业财务负责人、高管或关键技术人员与上次调查是否发生变动</th>
            <td>{{item.checkResult.P10 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">公司员工数量与上次调查是否有较大差距</th>
            <td>{{item.checkResult.P11 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">供应商是否有较大变动</th>
            <td>{{item.checkResult.P12 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">供应商波动是否符合行业规律</th>
            <td>{{item.checkResult.P13 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">供应商是否正常履约</th>
            <td>{{item.checkResult.P14 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">下游客户是否有较大变动</th>
            <td>{{item.checkResult.P15 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">下游客户波动是否符合行业规律</th>
            <td>{{item.checkResult.P16 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">企业与下游客户的交易合同是否正常履约</th>
            <td>{{item.checkResult.P17 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">存货管理是否健全，是否妥善保存</th>
            <td>{{item.checkResult.P18 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">生产设备管理是否健全，是否定期维护</th>
            <td>{{item.checkResult.P19 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">公司固定资产（房屋、车辆、生产设备）是否有较大变化</th>
            <td>{{item.checkResult.P20 | getBoolean}}</td>
          </tr>
          <tr>
            <th width="50%">企业所处行业或地区是否存在负面信息或较大不利政策变动</th>
            <td>{{item.checkResult.P21 | getBoolean}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="options.n1">
      <div class="lwc-tit">负面舆情<span style="color:red">红灯</span>：<span>{{options.n1.signalItems}}-{{options.n1.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">新增负面舆情信息原因</th>
          <td>{{options.n1.checkResult.P22}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r1">
      <div class="lwc-tit">应收帐款占流动资产比<span style="color:red">红灯</span>：<span>{{options.r1.signalItems}}-{{options.r1.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th width="50%">是否为长期合作供应商</th>
          <td>{{options.r1.checkResult.P23 | getBoolean}}</td>
        </tr>
        <tr>
          <th width="50%">若为长期合作供应商，过往记录是否按时回款</th>
          <td>{{options.r1.checkResult.P24 | getBoolean}}</td>
        </tr>
        <tr>
          <th width="50%">若为新增供应商，更换原因</th>
          <td>{{options.r1.checkResult.P25}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r2">
      <div class="lwc-tit">其他应收帐款占流动资产比<span style="color:red">红灯</span>：<span>{{options.r2.signalItems}}-{{options.r2.signalContent}}</span></div>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
      	<tr>
          <th>其他应收帐款欠款方姓名</th>
          <th>与企业关系</th>
        </tr>
      	<tr v-for="item in options.r2.checkResult">
          <td>{{item.P26}}</td>
          <td>{{item.P27}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r3_r4">
      <div v-for="item in options.r3_r4.list">
        <div class="lwc-tit">净资产收益率或主营业务利润率<span style="color:red">红灯</span>：<span>{{item.signalItems}}-{{item.signalContent}}</span></div>
        <table class="style-table border" cellpadding="0" cellspacing="0">
          <tr>
            <th width="50%">利润过低或成本过高的原因</th>
            <td>{{item.checkResult.P28}}</td>
          </tr>
        </table>
      </div>
      
    </div>
    <div v-if="options.r5">
      <div class="lwc-tit">应收帐款周转率<span style="color:red">红灯</span>：<span>{{options.r5.signalItems}}-{{options.r5.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">是否为长期合作供应商</th>
          <td>{{options.r5.checkResult.P29 | getBoolean}}</td>
        </tr>
        <tr>
          <th>若为长期合作供应商，过往记录是否按时回款</th>
          <td>{{options.r5.checkResult.P30 | getBoolean}}</td>
        </tr>
        <tr>
          <th>若为新增供应商，更换原因</th>
          <td>{{options.r5.checkResult.P31}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r67910">
      <div v-for="item1 in options.r67910.list">
        <div class="lwc-tit">资产负债率或速动比率或流动负债大于流动资产或流动负债增加额大于流动资产增加额<span style="color:red">红灯</span>：<span>{{item1.signalItems}}-{{item1.signalContent}}</span></div>
        <table class="style-table border center" cellpadding="0" cellspacing="0">
        	<tr>
            <th>债权人姓名</th>
            <th>金额</th>
            <th>利息</th>
            <th>期限</th>
          </tr>
        	<tr v-for="item2 in item1.checkResult">
            <td>{{item2.name}}</td>
            <td>{{item2.amount}}</td>
            <td>{{item2.rate}}</td>
            <td>{{item2.term}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="options.r8">
      <div class="lwc-tit">销售增长率<span style="color:red">红灯</span>：<span>{{options.r8.signalItems}}-{{options.r8.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">下游客户是否有较大变动</th>
          <td>{{options.r8.checkResult.P32 | getBoolean}}</td>
        </tr>
        <tr>
          <th>下游客户波动是否符合行业规律</th>
          <td>{{options.r8.checkResult.P33 | getBoolean}}</td>
        </tr>
        <tr>
          <th>企业所处行业或地区是否存在负面信息或较大不利政策变动</th>
          <td>{{options.r8.checkResult.P34 | getBoolean}}</td>
        </tr>
        <tr>
          <th>销售增长较慢原因</th>
          <td>{{options.r8.checkResult.P35}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r11">
      <div class="lwc-tit">日均存款余额<span style="color:red">红灯</span>：<span>{{options.r11.signalItems}}-{{options.r11.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">结合企业其他银行流水，整体日均存款余额是否大幅下降</th>
          <td>{{options.r11.checkResult.P36 | getBoolean}}</td>
        </tr>
        <tr>
          <th>若整体日均存款余额大幅下降，其原因</th>
          <td>{{options.r11.checkResult.P37}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r12_17">
      <div v-for="item in options.r12_17.list">
        <div class="lwc-tit">行内流水余额或他行流水余额<span style="color:red">红灯</span>：<span>{{item.signalItems}}-{{item.signalContent}}</span></div>
        <table class="style-table border" cellpadding="0" cellspacing="0">
        	<tr>
            <th width="50%">结合企业其他银行流水，整体银行流水余额是否大幅下降</th>
            <td>{{item.checkResult.P38 | getBoolean}}</td>
          </tr>
          <tr>
            <th>若整体银行流水余额大幅下降，其原因</th>
            <td>{{item.checkResult.P39}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="options.r13">
      <div class="lwc-tit">行内资金流<span style="color:red">红灯</span>：<span>{{options.r13.signalItems}}-{{options.r13.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">大量关联交易或异常交易原因</th>
          <td>{{options.r13.checkResult.P40}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r14_15_16">
      <div v-for="item in options.r14_15_16.list">
        <div class="lwc-tit">代发工资或代缴电费或代缴水费<span style="color:red">红灯</span>：<span>{{item.signalItems}}-{{item.signalContent}}</span></div>
        <table class="style-table border" cellpadding="0" cellspacing="0">
        	<tr>
            <th width="50%">结合其他银行流水，查看整体情况是否大幅下降</th>
            <td>{{item.checkResult.P41 | getBoolean}}</td>
          </tr>
          <template v-if="item.checkResult.P41 == 1">
          	<tr>
  	          <th>企业关键人员失联（经营决策人员、高管、关键技术人员）</th>
  	          <td>{{item.checkResult.P42 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>企业财务负责人、高管或关键技术人员与上次调查是否发生变动</th>
  	          <td>{{item.checkResult.P43 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>公司员工数量与上次调查是否有较大差距</th>
  	          <td>{{item.checkResult.P44 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>供应商是否有较大变动</th>
  	          <td>{{item.checkResult.P45 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>供应商波动是否符合行业规律</th>
  	          <td>{{item.checkResult.P46 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>供应商是否正常履约</th>
  	          <td>{{item.checkResult.P47 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>下游客户是否有较大变动</th>
  	          <td>{{item.checkResult.P48 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>下游客户波动是否符合行业规律</th>
  	          <td>{{item.checkResult.P49 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>企业与下游客户的交易合同是否正常履约</th>
  	          <td>{{item.checkResult.P50 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>存货管理是否健全，是否妥善保存</th>
  	          <td>{{item.checkResult.P51 | getBoolean}}</td>
  	        </tr>
  	         <tr>
  	          <th>生产设备管理是否健全，是否定期维护</th>
  	          <td>{{item.checkResult.P52 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>公司固定资产（房屋、车辆、生产设备）是否有较大变化</th>
  	          <td>{{item.checkResult.P53 | getBoolean}}</td>
  	        </tr>
  	        <tr>
  	          <th>企业所处行业或地区是否存在负面信息或较大不利政策变动</th>
  	          <td>{{item.checkResult.P54 | getBoolean}}</td>
  	        </tr>
          </template>
          
        </table>
      </div>
    </div>
    <div v-if="options.r18">
      <div class="lwc-tit">前五大供应商集中度<span style="color:red">红灯</span>：<span>{{options.r18.signalItems}}-{{options.r18.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">供应商是否有较大变动</th>
          <td>{{options.r18.checkResult.P55 | getBoolean}}</td>
        </tr>
        <tr>
          <th>若供应商无较大变动，历史履约情况是否正常</th>
          <td>{{options.r18.checkResult.P56 | getBoolean}}</td>
        </tr>
        <tr>
          <th>若供应商变动较大，变更原因</th>
          <td>{{options.r18.checkResult.P57}}</td>
        </tr>
      </table>
    </div>
    <div v-if="options.r19">
      <div class="lwc-tit">交易资金流（税务）<span style="color:red">红灯</span>：<span>{{options.r19.signalItems}}-{{options.r19.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">大量关联交易或异常交易原因</th>
          <td>{{options.r19.checkResult.P58}}</td>
        </tr>
       
      </table>
    </div>
    <div v-if="options.r20">
      <div class="lwc-tit">成本校验<span style="color:red">红灯</span>：<span>{{options.r20.signalItems}}-{{options.r20.signalContent}}</span></div>
      <table class="style-table border" cellpadding="0" cellspacing="0">
      	<tr>
          <th width="50%">查验合同，计算实际成本</th>
          <td>{{options.r20.checkResult.P59}}</td>
        </tr>
       
      </table>
    </div>
  </div>
</template>
<script>
export default {
	props: {
		options:{
			type: Object,
			default: {}
		}
	},
  data() {
    return {
      
    }
  },
  filters: {
  	getBoolean(v){
  		if(v==0||v==1){
  			return ['否','是'][Number(v)]
  		}
  		else{
  			return v
  		}
  	}
  },
  computed: {

  },
  methods: {
    
  },
  created() {
    
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
    padding: 15px 3px;
    vertical-align: middle;
    word-break: break-all;
    font-size: 13px;
    height: 30px;
  }
  th+td{
    text-align: center;
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
