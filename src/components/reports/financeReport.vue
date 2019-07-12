<template>
  <div class="report-item">
    <div class="title"><h3>财务报表</h3>
    </div>
    <h4 class="style-h4">关键指标</h4>
    <p style="padding-left: 15px;"><b>财务指标对比行业：<u v-if="options.industry"> {{options.industry.v1}} </u>(调查人员确认的一级行业) <u v-if="options.industry"> {{options.industry.v2}} </u>(调查人员确认的二级行业)</b></p>
    <table class="style-table border center" cellpadding="0" cellspacing="0">
      <tr>
        <th>维度</th>
        <th>关键指标</th>
        <th>指标取值</th>
        <th>评价</th>
      </tr>
      <template v-if="options.importantIndicator&&options.importantIndicator.length>0">
        <tr v-for="(item,index) in options.importantIndicator">
          <template v-if="index==0 || index==1 || index==4">
            <td>{{item.dimension}}</td>
          </template>
          <template v-else-if="index==2 || index==5">
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
    <h4 class="style-h4">财务报表</h4>
    <!-- <p style="margin-top: 20px;"></p> -->
    <p style="margin-top: 10px;">1. 资产负债表</p>
    <el-row>
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <tr>
            <td>日期</td>
          </tr>
          <tr>
            <td>货币资金</td>
          </tr>
          <tr>
            <td>应收票据</td>
          </tr>
          <tr>
            <td>应收账款</td>
          </tr>
          <tr>
            <td>应收利息</td>
          </tr>
          <tr>
            <td>应收股利</td>
          </tr>
          <tr>
            <td>其他应收款</td>
          </tr>
          <tr>
            <td>存货</td>
          </tr>
          <tr>
            <th>流动资产合计</th>
          </tr>
          <tr>
            <td>长期应收款</td>
          </tr>
          <tr>
            <td>可供出售金融资产</td>
          </tr>
          <tr>
            <td>持有至到期投资</td>
          </tr>
          <tr>
            <td>投资性房地产</td>
          </tr>
          <tr>
            <td>固定资产合计</td>
          </tr>
          <tr>
            <td>固定资产-土地房产</td>
          </tr>
          <tr>
            <td>固定资产-机械设备</td>
          </tr>
          <tr>
            <td>在建工程</td>
          </tr>
          <tr>
            <td>无形资产</td>
          </tr>
          <tr>
            <th>非流动资产合计</th>
          </tr>
          <tr>
            <th>资产总计</th>
          </tr>
          <tr>
            <td>短期借款</td>
          </tr>
          <tr>
            <td>应付票据</td>
          </tr>
          <tr>
            <td>应付账款</td>
          </tr>
          <tr>
            <td>应付利息</td>
          </tr>
          <tr>
            <td>应付股利</td>
          </tr>
          <tr>
            <td>其他应付款</td>
          </tr>
          <tr>
            <th>流动负债合计</th>
          </tr>
          <tr>
            <td>长期借款</td>
          </tr>
          <tr>
            <th>非流动负债合计</th>
          </tr>
          <tr>
            <td>负债总计</td>
          </tr>
          <tr>
            <td>实收资本</td>
          </tr>
          <tr>
            <td>资本公积</td>
          </tr>
          <tr>
            <td>盈余公积</td>
          </tr>
          <tr>
            <td>未分配利润</td>
          </tr>
          <tr>
            <th>所有者权益合计</th>
          </tr>
        </table>
      </el-col>
      <el-col :span="5" v-for="item in options.incurDebts" :key="item.date" class="no-border-left">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <tr>
            <td>{{item.date}}</td>
          </tr>
          <tr>
            <td>{{item.v01||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v02||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v03||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v04||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v05||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v06||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v07||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v08||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v09||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v10||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v11||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v12||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v13||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v14||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v15||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v16||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v17||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v18||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v19||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v20||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v21||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v22||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v23||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v24||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v25||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v26||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v27||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v28||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v29||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v30||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v31||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v32||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v33||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.v34||'-'}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 20px;">2. 利润表</p>
    <el-row>
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <tr>
            <td>日期</td>
          </tr>
          <tr>
            <td>营业收入</td>
          </tr>
          <tr>
            <td>营业成本</td>
          </tr>
          <tr>
            <td>销售费用</td>
          </tr>
          <tr>
            <td>管理费用</td>
          </tr>
          <tr>
            <td>财务费用</td>
          </tr>
          <tr>
            <td>营业利润</td>
          </tr>
          <tr>
            <td>加：营业外收入</td>
          </tr>
          <tr>
            <td>减：营业外支出</td>
          </tr>
          <tr>
            <td>利润总额</td>
          </tr>
          <tr>
            <td>减：所得税费用</td>
          </tr>
          <tr>
            <td>净利润</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="5" v-for="item in options.profits" :key="item.date" class="no-border-left">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <tr>
            <td>{{item.date}}</td>
          </tr>
          <tr>
            <td>{{item.businessIncome||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.businessCost||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.saleCost||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.managementCost||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.financeCost||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.businessProfits||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.beyondBusinessIncome||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.beyondBusinessExpenditure||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.profitsSum||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.incomeTax||'-'}}</td>
          </tr>
          <tr>
            <td>{{item.netProfits||'-'}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 20px;">财务分析</p>
    <p style="margin-top: 10px;">3. 经营规模</p>
    <div id="finance-charts3" class="charts" v-show="options.businessScale.list&&options.businessScale.list.length>0">
    -----------收入规模统计图----------
    </div>
    <el-row v-if="options.businessScale.list&&options.businessScale.list.length>0">
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <tr>
            <td>项　目</td>
          </tr>
          <tr>
            <td>营业收入</td>
          </tr>
          <tr>
            <td>净利润</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="20" style="margin-left: -2px;">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <tr v-for="item in options.businessScale.list">
            <td>{{item.d0}}</td>
            <td>{{item.d1}}</td>
            <td>{{item.d2}}</td>
            <td>{{item.d3}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 10px;">4. 发展趋势</p>
     <div id="finance-charts4-1" class="charts" v-show="options.trend.list&&options.trend.list.length > 0">
    -----------营业收入增长率变化图----------
    </div>
    <div id="finance-charts4-2" class="charts" v-show="options.trend.list&&options.trend.list.length > 0">
    -----------净利润增长率变化图----------
    </div>
    <el-row>
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <!-- <tr>
            <td>发展趋势综合评价</td>
          </tr> -->
          <tr>
            <td>项　目</td>
          </tr>
          <tr>
            <td>营业收入增长率</td>
          </tr>
          <tr>
            <td>净利润增长率</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="20" style="margin-left: -2px;" v-if="options.trend.list&&options.trend.list.length>0">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <!-- <tr>
            <td colspan="4">{{options.trend.evaluation}}</td>
          </tr> -->
          <tr v-for="(item,index) in options.trend.list" v-if="index<3">
            <td>{{item.d0}}</td>
            <td>{{item.d1}}</td>
            <td>{{item.d2}}</td>
            <td>{{item.d3}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 10px;">5. 盈利能力</p>
    <div id="finance-charts5-1" class="charts" v-show="options.profitAbility.list&&options.profitAbility.list.length > 0">
    -----------主营业务利润率变化图----------
    </div>
    <div id="finance-charts5-2" class="charts" v-show="options.profitAbility.list&&options.profitAbility.list.length > 0">
    -----------净资产收益率变化图----------
    </div>
    <el-row>
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <!-- <tr>
            <td>盈利能力综合评价</td>
          </tr> -->
          <tr>
            <td>项　目</td>
          </tr>
          <tr>
            <td>主营业务利润率</td>
          </tr>
          <tr>
            <td>净资产收益率</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="20" style="margin-left: -2px;">
        <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.profitAbility.list&&options.profitAbility.list.length>0">
          <!-- <tr>
            <td colspan="4">{{options.profitAbility.evaluation}}</td>
          </tr> -->
          <tr v-for="(item,index) in options.profitAbility.list" v-if="index<3">
            <td>{{item.d0}}</td>
            <td>{{item.d1}}</td>
            <td>{{item.d2}}</td>
            <td>{{item.d3}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 10px;">6. 营运能力</p>
    <div id="finance-charts6-1" class="charts" v-show="options.operationAbility.list&&options.operationAbility.list.length>0">-----------存货周转率变化图----------</div>
    <div id="finance-charts6-2" class="charts" v-show="options.operationAbility.list&&options.operationAbility.list.length>0">-----------应收账款周转率----------</div> 
    <el-row>
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <!-- <tr>
            <td>营运能力综合评价</td>
          </tr> -->
          <tr>
            <td>项　目</td>
          </tr>
          <tr>
            <td>存货周转率</td>
          </tr>
          <tr>
            <td>应收账款周转率</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="20" style="margin-left: -2px;">
        <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.operationAbility.list&&options.operationAbility.list.length>0">
          <!-- <tr>
            <td colspan="4">{{options.operationAbility.evaluation}}</td>
          </tr> -->
          <tr v-for="(item,index) in options.operationAbility.list" v-if="index<3">
            <td>{{item.d0}}</td>
            <td>{{item.d1}}</td>
            <td>{{item.d2}}</td>
            <td>{{item.d3}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 10px;">7. 偿债能力</p>
    <div id="finance-charts7-1" class="charts" v-show="options.debtpayingAbility.list&&options.debtpayingAbility.list.length>0">-----------资产负债率变化图----------</div>
    <div id="finance-charts7-2" class="charts" v-show="options.debtpayingAbility.list&&options.debtpayingAbility.list.length>0">-----------速动比率变化图----------</div>
    <el-row>
      <el-col :span="4">
        <table class="style-table border center" cellpadding="0" cellspacing="0">
          <!-- <tr>
            <td>偿债能力综合评价</td>
          </tr> -->
          <tr>
            <td>项　目</td>
          </tr>
          <tr>
            <td>资产负债率</td>
          </tr>
          <tr>
            <td>速动比率</td>
          </tr>
        </table>
      </el-col>
      <el-col :span="20" style="margin-left: -2px;">
        <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.debtpayingAbility.list&&options.debtpayingAbility.list.length>0">
          <!-- <tr>
            <td colspan="4">{{options.debtpayingAbility.evaluation}}</td>
          </tr> -->
          <tr v-for="item in options.debtpayingAbility.list">
            <td>{{item.d0}}</td>
            <td>{{item.d1}}</td>
            <td>{{item.d2}}</td>
            <td>{{item.d3}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <p style="margin-top: 10px;">8. 抵押质押担保分析</p>
    <p style="margin: 15px 0;">抵质押信息</p>
    <!-- pledgeInfo -->
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.pledgeInfo">
      <tr>
        <td>抵质押物名称</td>
        <td>易变现程度</td>
        <td>预评估估值</td>
      </tr>
      <tr v-for="item in options.pledgeInfo">
        <td>{{item.name}}</td>
        <td>{{item.liquidity}}</td>
        <td>{{item.preEvaluationVal}}</td>
      </tr>
    </table>
    <p style="margin: 15px 0;">担保信息</p>
    <!-- guaranteeInfo -->
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.guaranteeInfo&&options.guaranteeInfo.person">
      <tr>
        <td>保证人姓名</td>
        <td>身份证号</td>
        <td>手机号</td>
        <td>担保额度</td>
      </tr>
      <tr v-for="item in options.guaranteeInfo.person">
        <td>{{item.name}}</td>
        <td>{{item.IDNum}}</td>
        <td>{{item.phoneNum}}</td>
        <td>{{item.warranties}}</td>
      </tr>
    </table>
    <p style="margin: 15px 0;">担保信息</p>
    <!-- guaranteeInfo -->
    <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.guaranteeInfo&&options.guaranteeInfo.company">
      <tr>
        <td>保证人名称</td>
        <td>统一社会信用代码</td>
        <td>法定代表人</td>
        <td>担保额度</td>
      </tr>
      <tr v-for="item in options.guaranteeInfo.company">
        <td>{{item.name}}</td>
        <td>{{item.uscc}}</td>
        <td>{{item.legalRepresentative}}</td>
        <td>{{item.warranties}}</td>
      </tr>
    </table>
  </div>
          
          
          
</template>
<script>


export default {
  props: {
    /* 财务报表 */
    options: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  },
  watch: {
    options: function(value){
      
      if(value.businessScale && value.businessScale.list){
        this.initCharts3()
      }
      if(value.trend && value.trend.list){
        
        this.initCharts4()
      }
      if(value.profitAbility && value.profitAbility.list){
        console.log(value.profitAbility)
        this.initCharts5()
      }
      if(value.operationAbility && value.operationAbility.list){
        this.initCharts6()
      }
      if(value.debtpayingAbility && value.debtpayingAbility.list){
        this.initCharts7()
      }

    }
  },
  methods: {
    initCharts3() {
      let charts3 = echarts.init(document.getElementById('finance-charts3'))
      let names = ['营业收入', '净利润']
      let series = []
      let xAxis = []
      this.options.businessScale.list.forEach((item,index) => {
        if(index == 0){
          for(let k in item){
            xAxis.push(item[k])
          }
        }
        else{
          let arr = []
          for(let k in item){
            arr.push(Number(item[k]))
          }
          series.push({
            name: names[index-1],
            type: 'bar',
            barMaxWidth: 15,
            data: arr
          })
        }
      })
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: names
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xAxis
        }],
        yAxis: [{
          type: 'value',
          name: '数额'
        }],
        series: series
      };
      charts3.setOption(option)
    },
    initCharts4() {
      let charts4_1 = echarts.init(document.getElementById('finance-charts4-1'))
      let charts4_2 = echarts.init(document.getElementById('finance-charts4-2'))
      let names1 = ['营业收入增长率']
      let names2 = ['净利润增长率']
      let data = this.getEchartsData(this.options.trend.list, names1, names2)
      charts4_1.setOption(data.option1)
      charts4_2.setOption(data.option2)
    },
    initCharts5() {
      let charts5_1 = echarts.init(document.getElementById('finance-charts5-1'))
      let charts5_2 = echarts.init(document.getElementById('finance-charts5-2'))
      let names1 = ['主营业务利润率']
      let names2 = ['净资产收益率']
      let data = this.getEchartsData(this.options.profitAbility.list, names1, names2)
      charts5_1.setOption(data.option1)
      charts5_2.setOption(data.option2)
    },
    initCharts6() {
      let charts6_1 = echarts.init(document.getElementById('finance-charts6-1'))
      let charts6_2 = echarts.init(document.getElementById('finance-charts6-2'))
      let names1 = ['存货周转率']
      let names2 = ['应收账款周转率']
      let data = this.getEchartsData(this.options.operationAbility.list, names1, names2)
      charts6_1.setOption(data.option1)
      charts6_2.setOption(data.option2)
    },
    initCharts7() {
      let charts7_1 = echarts.init(document.getElementById('finance-charts7-1'))
      let charts7_2 = echarts.init(document.getElementById('finance-charts7-2'))
      let names1 = ['资产负债率']
      let names2 = ['速动比率']
      let data = this.getEchartsData(this.options.debtpayingAbility.list, names1, names2)
      charts7_1.setOption(data.option1)
      charts7_2.setOption(data.option2)
    },
    getEchartsData(resource,names1, names2){
      let dicts = [
        {
          keyName: 'l1',
          value: '优秀值',
        },
        {
          keyName: 'l2',
          value: '良好值',
        },
        {
          keyName: 'l3',
          value: '平均值',
        },
        {
          keyName: 'l4',
          value: '较低值',
        },
        {
          keyName: 'l5',
          value: '较差值',
        }
      ];
      let series1 = []
      let series2 = []
      let xAxis = []
      resource.forEach((item,index) => {
        if(index == 0){
          for(let k in item){
            xAxis.push(item[k])
          }
        }
        else if(index < 3){
          let arr = []
          for(let k in item){
            if(typeof item[k] === 'string'){
              arr.push(item[k].replace(/%/, ''))  
            }
          }
          if(index == 1){
            series1.push({
              name: names1[0],
              type: 'line',
              data: arr
            })
          }
          else{
            series2.push({
              name: names2[0],
              type: 'line',
              data: arr
            })
          }
        }
        else if(index == 3){
          let avgData = item;  // 
          let list = []
          for(let k in avgData){
            list.push(avgData[k])
          }
          let example = list[0]
          for (let i = 0;i < dicts.length; i++) {
            let key = dicts[i].keyName
            let name = dicts[i].value
            if(example[key]){
              names1.push(name)
              series1.push({
                name: name,
                type: 'line',
                data: list.map(v => {return v[key].replace(/%/, '')})
              })
            }
          }
        }
        else if(index == 4){
          let avgData = item;  // 
          let list = []
          for(let k in avgData){
            list.push(avgData[k])
          }
          let example = list[0]
          for (let i = 0;i < dicts.length; i++) {
            let key = dicts[i].keyName
            let name = dicts[i].value
            if(example[key]){
              names2.push(name)
              series2.push({
                name: name,
                type: 'line',
                data: list.map(v => {return v[key].replace(/%/, '')})
              })
            }
          }
        }
      })
      
      let option1 = {
        legend: {
          data: names1
        },
        xAxis: [{
          type: 'category',
          data: xAxis
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisLabel: {  
            formatter: '{value} %'  
          },
          max: 100
        }],
        series: series1
      };
      let option2 = {
        legend: {
          data: names2
        },
        xAxis: [{
          type: 'category',
          data: xAxis
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisLabel: {  
            formatter: '{value} %'  
          },
          max: 100
        }],
        series: series2
      };
      return {
        option1: option1,
        option2: option2
      }
    }
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
.charts+.charts{
  margin-top: 10px;
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
