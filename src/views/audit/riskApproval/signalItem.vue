<template>
  <div class="signal-item">
    <table class="style-table center" cellpadding="0" cellspacing="0" v-if="options.itemsCode == 'C1'">
      <tr>
        <th width="280">最新法定代表人姓名</th>
        <th>身份证号</th>
        <th>手机号</th>
        <th>常用借记卡卡号</th>
      </tr>
      <tr v-for="res in options.results">
        <td>{{res.name}}</td>
        <td>{{res.idNo}}</td>
        <td>{{res.phone}}</td>
        <td>{{res.bankCard}}</td>
      </tr>
    </table>
    <div v-else-if="options.itemsCode == 'C2'">
      <ul v-for="res in options.results">
        <li>注册资本减少原因：{{res.P1}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode == 'C3'">
      <ul v-for="res in options.results">
        <li>公司曾经所处行业是发生较大不利政策变动：{{res.P2}}</li>
        <li>行业变更原因：{{res.P3}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode == 'C4'">
      <ul v-for="res in options.results">
        <li>实际工作地址是否与注册地址一致：{{res.P4 | getBoolean}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode == 'C5'">
      <ul v-for="res in options.results">
        <li>经营范围变更原因：{{res.P5}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode == 'C6'">
      <table class="style-table center" cellpadding="0" cellspacing="0">
        <tr>
          <th width="280">变更后自然人股东姓名</th>
          <th>身份证号</th>
          <th>手机号</th>
          <th>常用借记卡卡号</th>
        </tr>
        <tr v-for="item in options.results">
          <td>{{item.name}}</td>
          <td>{{item.idNo}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.bankCard}}</td>
        </tr>
      </table>
    </div>
    <div v-else-if="options.itemsCode == 'C7'">
      <ul v-for="res in options.results">
        <li>新增对外投资企业是否正常经营：{{res.P6 | getBoolean}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode == 'C8'">
      <table class="style-table center" cellpadding="0" cellspacing="0">
        <tr>
          <th width="280">新增董监高姓名</th>
          <th>身份证号</th>
          <th>手机号</th>
          <th>常用借记卡卡号</th>
        </tr>
        <tr v-for="item in options.results">
          <td>{{item.name}}</td>
          <td>{{item.idNo}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.bankCard}}</td>
        </tr>
      </table>
      <p>最新员工人数：{{options.results[0].staff_num}}</p>
    </div>
    <div v-else-if="/S[1-6]/.test(options.itemsCode)">
      <ul v-for="res in options.results">
        <li>新增司法信息原因：{{res.P7}}</li>
      </ul>
    </div>
    <div v-else-if="/(M[1-6])|(T1)/.test(options.itemsCode)">
      <ul v-for="res in options.results">
        <li>企业关键人员失联（经营决策人员、高管、关键技术人员）：{{res.P9 | getBoolean}}</li>
        <li>企业财务负责人、高管或关键技术人员与上次调查是否发生变动：{{res.P10 | getBoolean}}</li>
        <li>公司员工数量与上次调查是否有较大差距：{{res.P11 | getBoolean}}</li>
        <li>供应商是否有较大变动：{{res.P12 | getBoolean}}</li>
        <li>供应商波动是否符合行业规律：{{res.P13 | getBoolean}}</li>
        <li>供应商是否正常履约：{{res.P14 | getBoolean}}</li>
        <li>下游客户是否有较大变动：{{res.P15 | getBoolean}}</li>
        <li>下游客户波动是否符合行业规律：{{res.P16 | getBoolean}}</li>
        <li>企业与下游客户的交易合同是否正常履约：{{res.P17 | getBoolean}}</li>
        <li>存货管理是否健全，是否妥善保存：{{res.P18 | getBoolean}}</li>
        <li>生产设备管理是否健全，是否定期维护：{{res.P19 | getBoolean}}</li>
        <li>公司固定资产（房屋、车辆、生产设备）是否有较大变化：{{res.P20 | getBoolean}}</li>
        <li>企业所处行业或地区是否存在负面信息或较大不利政策变动：{{res.P21 | getBoolean}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='N1'">
      <ul v-for="res in options.results">
        <li>新增负面舆情信息原因：{{res.P22}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R1'">
      <ul v-for="res in options.results">
        <li>是否为长期合作供应商：{{res.P22 | getBoolean}}</li>
        <li>若为长期合作供应商，过往记录是否按时回款：{{res.P23 | getBoolean}}</li>
        <li>若为新增供应商，更换原因：{{res.P24}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R2'">
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th>其他应收帐款欠款方姓名</th>
          <th>与企业关系</th>
        </tr>
        <tr v-for="item in options.results">
          <td>{{item.P26}}</td>
          <td>{{item.P27}}</td>
        </tr>
      </table>
    </div>
    <div v-else-if="/^R[3-4]$/.test(options.itemsCode)">
      <ul v-for="res in options.results">
        <li>利润过低或成本过高的原因：{{res.P28}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R5'">
      <ul v-for="res in options.results">
        <li>是否为长期合作供应商：{{res.P29 | getBoolean}}</li>
        <li>若为长期合作供应商，过往记录是否按时回款：{{res.P30 | getBoolean}}</li>
        <li>若为新增供应商，更换原因：{{res.P31}}</li>
      </ul>
    </div>
    <div v-else-if="/^R(6|7|9|(10))$/.test(options.itemsCode)">
      <table class="style-table border" cellpadding="0" cellspacing="0">
        <tr>
          <th>债权人姓名</th>
          <th>金额</th>
          <th>利息</th>
          <th>期限</th>
        </tr>
        <tr v-for="item in options.results">
          <td>{{item.name}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.rate}}</td>
          <td>{{item.term}}</td>
        </tr>
      </table>
    </div>
    <div v-else-if="options.itemsCode=='R8'">
      <ul v-for="res in options.results">
        <li>下游客户是否有较大变动：{{res.P32 | getBoolean}}</li>
        <li>下游客户波动是否符合行业规律：{{res.P33 | getBoolean}}</li>
        <li>企业所处行业或地区是否存在负面信息或较大不利政策变动：{{res.P34 | getBoolean}}</li>
        <li>销售增长较慢原因：{{res.P35}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R11'">
      <ul v-for="res in options.results">
        <li>结合企业其他银行流水，整体日均存款余额是否大幅下降：{{res.P36 | getBoolean}}</li>
        <li>若整体日均存款余额大幅下降，其原因：{{res.P37}}</li>
      </ul>
    </div>
    <div v-else-if="/^R1(2|7)$/.test(options.itemsCode)">
      <ul v-for="res in options.results">
        <li>结合企业其他银行流水，整体银行流水余额是否大幅下降：{{res.P38 | getBoolean}}</li>
        <li>若整体银行流水余额大幅下降，其原因：{{res.P39}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R13'">
      <ul v-for="res in options.results">
        <li>大量关联交易或异常交易原因：{{res.P40}}</li>
      </ul>
    </div>
    <div v-else-if="/^R1(4|5|6)$/.test(options.itemsCode)">
      <ul v-for="res in options.results">
        <li>结合其他银行流水，查看整体情况是否大幅下降：{{res.P41 | getBoolean}}</li>
        <li>企业关键人员失联（经营决策人员、高管、关键技术人员）：{{res.P42 | getBoolean}}</li>
        <li>企业财务负责人、高管或关键技术人员与上次调查是否发生变动：{{res.P43 | getBoolean}}</li>
        <li>公司员工数量与上次调查是否有较大差距：{{res.P44 | getBoolean}}</li>
        <li>供应商是否有较大变动：{{res.P45 | getBoolean}}</li>
        <li>供应商波动是否符合行业规律：{{res.P46 | getBoolean}}</li>
        <li>供应商是否正常履约：{{res.P47 | getBoolean}}</li>
        <li>下游客户是否有较大变动：{{res.P48 | getBoolean}}</li>
        <li>下游客户波动是否符合行业规律：{{res.P49 | getBoolean}}</li>
        <li>企业与下游客户的交易合同是否正常履约：{{res.P50 | getBoolean}}</li>
        <li>存货管理是否健全，是否妥善保存：{{res.P51 | getBoolean}}</li>
        <li>生产设备管理是否健全，是否定期维护：{{res.P52 | getBoolean}}</li>
        <li>公司固定资产（房屋、车辆、生产设备）是否有较大变化：{{res.P53 | getBoolean}}</li>
        <li>企业所处行业或地区是否存在负面信息或较大不利政策变动：{{res.P54 | getBoolean}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R18'">
      <ul v-for="res in options.results">
        <li>供应商是否有较大变动：{{res.P55 | getBoolean}}</li>
        <li>若供应商无较大变动，历史履约情况是否正常：{{res.P56 | getBoolean}}</li>
        <li>若供应商变动较大，变更原因：{{res.P57}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R19'">
      <ul v-for="res in options.results">
        <li>大量关联交易或异常交易原因：{{res.P58}}</li>
      </ul>
    </div>
    <div v-else-if="options.itemsCode=='R20'">
      <ul v-for="res in options.results">
        <li>查验合同，计算实际成本：{{res.P59}}</li>
      </ul>
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
.signal-item{
  li{
    padding-left: 30px;
    text-align: left;
    line-height: 24px;
  }
}
.style-table {
  margin-top: 20px;
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
  .style-table{
    margin-top: 0;
    td,th{
      /*border: none;  */
    }
  }
}
</style>
