<template>
  <div>
    <div class="report-item">
      <div class="title"><h3>行内业务</h3>
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
            <template v-if="index==0">
              <td rowspan="7">{{item.dimension}}</td>
            </template>
            <template v-else-if="index==7">
              <td rowspan="5">{{item.dimension}}</td>
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
      <h5 class="style-h5">1.  行内账户报表</h5>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th colspan="3">企业账户</th>
        </tr>
        <tr>
          <td>分类</td>
          <td>指标</td>
          <td>数值</td>
        </tr>
        <tr>
          <td rowspan="2">存款</td>
          <td>存款分类</td>
          <td>{{options.dataReport.v01}}</td>
        </tr>
        <tr>
          <td>日均存款余额</td>
          <td>{{options.dataReport.v02}}</td>
        </tr>
        <tr>
          <td>结算</td>
          <td>销售归行额</td>
          <td>{{options.dataReport.v03}}</td>
        </tr>
        <tr>
          <td rowspan="8">信贷</td>
          <td>信贷分类</td>
          <td>{{options.dataReport.v04}}</td>
        </tr>
        <tr>
          <td>授信额度</td>
          <td>{{options.dataReport.v05}}</td>
        </tr>
        <tr>
          <td>授信期限</td>
          <td>{{options.dataReport.v06}}</td>
        </tr>
        <tr>
          <td>当前信贷余额</td>
          <td>{{options.dataReport.v07}}</td>
        </tr>
        <tr>
          <td>当前信贷到期日</td>
          <td>{{options.dataReport.v08}}</td>
        </tr>
        <tr>
          <td>当前贷款五级分类</td>
          <td>{{options.dataReport.v09}}</td>
        </tr>
        <tr>
          <td>当前贷款状态</td>
          <td>{{options.dataReport.v10}}</td>
        </tr>
        <tr>
          <td>结息状态</td>
          <td>{{options.dataReport.v11}}</td>
        </tr>
        <tr>
          <td rowspan="5">担保</td>
          <td>当前担保余额</td>
          <td>{{options.dataReport.v12}}</td>
        </tr>
        <tr>
          <td>当前担保户数</td>
          <td>{{options.dataReport.v13}}</td>
        </tr>
        <tr>
          <td>单户最大担保余额</td>
          <td>{{options.dataReport.v14}}</td>
        </tr>
        <tr>
          <td>当前担保五级分类</td>
          <td>{{options.dataReport.v15}}</td>
        </tr>
        <tr>
          <td>历史担保记录</td>
          <td>{{options.dataReport.v16}}</td>
        </tr>
        <tr>
          <td>理财</td>
          <td>投资理财日均余额</td>
          <td>{{options.dataReport.v17}}</td>
        </tr>
        <tr>
          <td rowspan="4">代发工资</td>
          <td>代发工资</td>
          <td>{{options.dataReport.v18}}</td>
        </tr>
        <tr>
          <td>代发工资人数</td>
          <td>{{options.dataReport.v19}}</td>
        </tr>
        <tr>
          <td>代发工资月均总额</td>
          <td>{{options.dataReport.v20}}</td>
        </tr>
        <tr>
          <td>相关日均存款余额</td>
          <td>{{options.dataReport.v21}}</td>
        </tr>
        <tr>
          <td rowspan="3">产品</td>
          <td>代缴电费</td>
          <td>{{options.dataReport.v22}}</td>
        </tr>
        <!-- <tr>
          <td>代缴水费</td>
          <td>{{options.dataReport.v23}}</td>
        </tr> -->
        <tr>
          <td>企业网银</td>
          <td>{{options.dataReport.v24}}</td>
        </tr>
      </table>
      <h5 class="style-h5">2.  企业行内数据关联人报表</h5>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th colspan="3">关联人账户（企业版）</th>
        </tr>
        <tr>
          <td rowspan="2">身份</td>
          <td>名称</td>
          <td>{{options.affiliateReport_ee.v01}}</td>
        </tr>
        <tr>
          <td>与企业关系</td>
          <td>{{options.affiliateReport_ee.v02}}</td>
        </tr>
        <tr>
          <td rowspan="2">存款</td>
          <td>存款分类</td>
          <td>{{options.affiliateReport_ee.v03}}</td>
        </tr>
        <tr>
          <td>日均存款余额</td>
          <td>{{options.affiliateReport_ee.v04}}</td>
        </tr>
        <tr>
          <td>结算</td>
          <td>销售归行额</td>
          <td>{{options.affiliateReport_ee.v05}}</td>
        </tr>
        <tr>
          <td rowspan="8">信贷</td>
          <td>信贷分类</td>
          <td>{{options.affiliateReport_ee.v06}}</td>
        </tr>
        <tr>
          <td>授信额度</td>
          <td>{{options.affiliateReport_ee.v07}}</td>
        </tr>
        <tr>
          <td>授信期限</td>
          <td>{{options.affiliateReport_ee.v08}}</td>
        </tr>
        <tr>
          <td>当前信贷余额</td>
          <td>{{options.affiliateReport_ee.v09}}</td>
        </tr>
        <tr>
          <td>当前信贷到期日</td>
          <td>{{options.affiliateReport_ee.v10}}</td>
        </tr>
        <tr>
          <td>当前贷款五级分类</td>
          <td>{{options.affiliateReport_ee.v11}}</td>
        </tr>
        <tr>
          <td>当前贷款状态</td>
          <td>{{options.affiliateReport_ee.v12}}</td>
        </tr>
        <tr>
          <td>结息状态</td>
          <td>{{options.affiliateReport_ee.v13}}</td>
        </tr>
        <tr>
          <td rowspan="5">担保</td>
          <td>当前担保余额</td>
          <td>{{options.affiliateReport_ee.v14}}</td>
        </tr>
        <tr>
          <td>当前担保户数</td>
          <td>{{options.affiliateReport_ee.v15}}</td>
        </tr>
        <tr>
          <td>单户最大担保余额</td>
          <td>{{options.affiliateReport_ee.v16}}</td>
        </tr>
        <tr>
          <td>当前担保五级分类</td>
          <td>{{options.affiliateReport_ee.v17}}</td>
        </tr>
        <tr>
          <td>历史担保记录</td>
          <td>{{options.affiliateReport_ee.v18}}</td>
        </tr>
        <tr>
          <td>理财</td>
          <td>投资理财日均余额</td>
          <td>{{options.affiliateReport_ee.v19}}</td>
        </tr>
        <tr>
          <td rowspan="4">代发工资</td>
          <td>代发工资</td>
          <td>{{options.affiliateReport_ee.v20}}</td>
        </tr>
        <tr>
          <td>代发工资人数</td>
          <td>{{options.affiliateReport_ee.v21}}</td>
        </tr>
        <tr>
          <td>代发工资月均总额</td>
          <td>{{options.affiliateReport_ee.v22}}</td>
        </tr>
        <tr>
          <td>相关日均存款余额</td>
          <td>{{options.affiliateReport_ee.v23}}</td>
        </tr>
        <tr>
          <td rowspan="3">产品</td>
          <td>代缴电费</td>
          <td>{{options.affiliateReport_ee.v24}}</td>
        </tr>
        <!-- <tr>
          <td>代缴水费</td>
          <td>{{options.affiliateReport_ee.v25}}</td>
        </tr> -->
        <tr>
          <td>企业网银</td>
          <td>{{options.affiliateReport_ee.v26}}</td>
        </tr>
      </table>
      <table class="style-table border center" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
        <tr>
          <th colspan="3">关联人账户（个人版）</th>
        </tr>
        <tr>
          <td rowspan="2">身份</td>
          <td>姓名</td>
          <td>{{options.affiliateReport_pe.v01}}</td>
        </tr>
        <tr>
          <td>与企业关系</td>
          <td>{{options.affiliateReport_pe.v02}}</td>
        </tr>
        <tr>
          <td rowspan="2">存款</td>
          <td>存款分类</td>
          <td>{{options.affiliateReport_pe.v03}}</td>
        </tr>
        <tr>
          <td>日均存款余额</td>
          <td>{{options.affiliateReport_pe.v04}}</td>
        </tr>
        <tr>
          <td rowspan="4">信用卡</td>
          <td>信用卡最高额度</td>
          <td>{{options.affiliateReport_pe.v05}}</td>
        </tr>
        <tr>
          <td>额度使用率</td>
          <td>{{options.affiliateReport_pe.v06}}</td>
        </tr>
        <tr>
          <td>还款状态</td>
          <td>{{options.affiliateReport_pe.v07}}</td>
        </tr>
        <tr>
          <td>风险提示</td>
          <td>{{options.affiliateReport_pe.v08}}</td>
        </tr>
        <tr>
          <td rowspan="8">信贷</td>
          <td>信贷分类</td>
          <td>{{options.affiliateReport_pe.v09}}</td>
        </tr>
        <tr>
          <td>授信额度</td>
          <td>{{options.affiliateReport_pe.v10}}</td>
        </tr>
        <tr>
          <td>授信期限</td>
          <td>{{options.affiliateReport_pe.v11}}</td>
        </tr>
        <tr>
          <td>当前信贷余额</td>
          <td>{{options.affiliateReport_pe.v12}}</td>
        </tr>
        <tr>
          <td>当前信贷到期日</td>
          <td>{{options.affiliateReport_pe.v13}}</td>
        </tr>
        <tr>
          <td>当前贷款五级分类</td>
          <td>{{options.affiliateReport_pe.v14}}</td>
        </tr>
        <tr>
          <td>当前贷款状态</td>
          <td>{{options.affiliateReport_pe.v15}}</td>
        </tr>
        <tr>
          <td>结息状态</td>
          <td>{{options.affiliateReport_pe.v16}}</td>
        </tr>
        <tr>
          <td rowspan="3">担保</td>
          <td>当前担保余额</td>
          <td>{{options.affiliateReport_pe.v17}}</td>
        </tr>
        <tr>
          <td>当前担保五级分类</td>
          <td>{{options.affiliateReport_pe.v18}}</td>
        </tr>
        <tr>
          <td>历史担保记录</td>
          <td>{{options.affiliateReport_pe.v19}}</td>
        </tr>
        <tr>
          <td>理财</td>
          <td>投资理财日均余额</td>
          <td>{{options.affiliateReport_pe.v20}}</td>
        </tr>
        <tr>
          <td rowspan="4">产品</td>
          <td>个人网银</td>
          <td>{{options.affiliateReport_pe.v21}}</td>
        </tr>
        <tr>
          <td>手机银行</td>
          <td>{{options.affiliateReport_pe.v22}}</td>
        </tr>
        <tr>
          <td>三方支付绑定</td>
          <td>{{options.affiliateReport_pe.v23}}</td>
        </tr>
        <tr>
          <td>收银宝月均收入</td>
          <td>{{options.affiliateReport_pe.v24}}</td>
        </tr>
      </table>
      <h5 class="style-h5">3.  银行流水分析</h5>
      <div class="charts" id="bank-charts3" v-show="options.monthStatistics&&options.monthStatistics.length>0">-------------银行流水月度统计图--------------</div>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>月份</th>
          <th>流入金额（万）</th>
          <th>流出金额（万）</th>
          <th>余额（万）</th>
        </tr>
        <template v-if="options.monthStatistics&&options.monthStatistics.length>0">
          <tr v-for="(item,index) in options.monthStatistics">
            <td>{{item.month}}</td>
            <td>{{item.in}}</td>
            <td>{{item.out}}</td>
            <td>{{item.balance}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4">经查询，该企业无相关信息</td>
          </tr>
        </template>
      </table>
      <p style="margin-top: 15px">资金流入前20大账户</p>
      <p style="text-align: right;">时间区间：{{options.firstIn.left}} - {{options.firstIn.right}}</p>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>对方</th>
          <th>笔数</th>
          <th>总金额（万元）</th>
          <th>占比</th>
          <th>备注</th>
        </tr>
        <template v-if="options.firstIn.list&&options.firstIn.list.length>0">
          <tr v-for="(item,index) in options.firstIn.list">
            <td>{{index+1}}</td>
            <td>{{item.otherPerson}}</td>
            <td>{{item.count}}</td>
            <td>{{item.sum}}</td>
            <td>{{item.ratio}}</td>
            <td>{{item.desc}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6">经查询，该企业无相关信息</td>
          </tr>
        </template>
      </table>
      <p style="margin-top: 15px">资金流出前20大账户</p>
      <p style="text-align: right;">时间区间：{{options.firstOut.left}} - {{options.firstOut.right}}</p>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>对方</th>
          <th>笔数</th>
          <th>总金额（万元）</th>
          <th>占比</th>
          <th>备注</th>
        </tr>
        <template v-if="options.firstOut.list&&options.firstOut.list.length>0">
          <tr v-for="(item,index) in options.firstOut.list">
            <td>{{index+1}}</td>
            <td>{{item.otherPerson}}</td>
            <td>{{item.count}}</td>
            <td>{{item.sum}}</td>
            <td>{{item.ratio}}</td>
            <td>{{item.desc}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6">经查询，该企业无相关信息</td>
          </tr>
        </template>
      </table>
      <div class="charts" id="bank-charts4" v-show="options.firstIn.list&&options.firstIn.list.length>0"></div>
      <p style="margin-top: 15px;"  v-if="options.anotherLine && options.anotherLine.length > 0">他行流水</p>
      <el-row v-if="options.anotherLine && options.anotherLine.length > 0">
        <el-col :span="4">
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr>
              <td>日期</td>
            </tr>
            <tr>
              <td>期初余额</td>
            </tr>
            <tr>
              <td>期末余额</td>
            </tr>
            <tr>
              <td>计息金额</td>
            </tr>
            <tr>
              <td>日均金额计算</td>
            </tr>
          </table>
        </el-col>
        <el-col :span="20" style="margin-left: -2px;">
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr v-for="item in options.anotherLine">
              <td>{{item.d0}}</td>
              <td>{{item.d1}}</td>
              <td>{{item.d2}}</td>
              <td>{{item.d3}}</td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <h5 class="style-h5">行内交易圈<span style="color: #999" v-if="!options.adeptCircle||!options.adeptCircle.nodes">（暂无数据）</span></h5>
      <div id="main" class="charts" v-show="options.adeptCircle && options.adeptCircle.nodes"></div>
      
      <h5 class="style-h5">企业担保圈<span style="color: #999" v-if="!options.enterpriseGuaranteeCircle||!options.enterpriseGuaranteeCircle.nodes">（暂无数据）</span></h5>
      <div id="main2" class="charts" v-show="options.enterpriseGuaranteeCircle && options.enterpriseGuaranteeCircle.nodes"></div>

      <h5 class="style-h5">相关人关系<span style="color: #999" v-if="!options.relatedPeopleCircle||!options.relatedPeopleCircle.nodes">（暂无数据）</span></h5>
      <div id="main3" class="charts" v-show="options.relatedPeopleCircle && options.relatedPeopleCircle.nodes"></div>
    </div>
    <div class="report-item" v-if="options.otherRisk">
      <div class="title"><h3>其他风险</h3>
      </div>
      <table class="style-table border center" cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>分类</th>
          <th>详细描述</th>
          <th>风险程度</th>
        </tr>
        <template v-if="options.otherRisk&&options.otherRisk.length>0">
          <tr v-for="(item,index) in options.otherRisk">
            <td>{{index+1}}</td>
            <td>{{item.category}}</td>
            <td>{{item.detailInfo}}</td>
            <td>{{item.riskLevel}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4">经查询，该企业无相关信息</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>
</template>
<script>

export default {
  props: {
    /* 行内业务 */
    options: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  watch: {
    options: function(newV) {
      this.businessRelation()
      if (newV.monthStatistics) {
        this.initCharts3()
      }
      if (newV.firstIn && newV.firstOut && newV.firstIn.list && newV.firstOut.list) {
        this.initCharts4()
      }

    }
  },
  methods: {
    businessRelation() {
      let itemStyle = {
            normal: {
                label: {
                    show: true,
                    textStyle: {
                        color: '#333'
                    }
                },
                nodeStyle : {
                    brushType : 'both',
                    borderColor : 'rgba(255,215,0,0.4)',
                    borderWidth : 1
                },
                linkStyle: {
                    type: 'curve'
                }
            },
            emphasis: {
              label: {
                show: true
              }
            }
        }
      let guarantee = this.options.enterpriseGuaranteeCircle
      let bank = this.options.adeptCircle
      let people = this.options.relatedPeopleCircle
      var myChart = echarts.init(document.getElementById("main"));
      var myChart2 = echarts.init(document.getElementById("main2"));
      var myChart3 = echarts.init(document.getElementById("main3"));
      if(bank && bank.nodes){
        var bank_labels = []
        var bank_nodes = bank.nodes.map(el => {
          bank_labels.push(el.labels[0])
          return {
            name: el.id,
            label: el.properties.name,
            category: el.labels[0],
            value: 1
          }
        })
        var bank_links = bank.relationships.map(el => {
          return {
            source: el.startNode,
            name: el.properties.labels[0],
            target: el.endNode,
            weight: 1
          }
        })
        bank_labels = Array.from(new Set(bank_labels))
        var bank_labelsname = []
        bank_labels.map(el => {
          bank_labelsname.push({ name: el })
        })
        bank_nodes.forEach(item => {
          item.category = bank_labels.indexOf(item.category)
        })
        
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },  
          legend: {
            data: bank_labels,
            x: 'center'
          },
          series: [{
            name: '行业交易圈',
            type: 'force',
            symbolSize: 10,
            nodes: bank_nodes,
            links: bank_links,
            categories: bank_labelsname,
            roam: true,
            itemStyle: itemStyle,
            useWorker: false,
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 5
          }]
        });
      }
      
      if(guarantee && guarantee.nodes){
        var guarantee_labels = []
        var guarantee_nodes = guarantee.nodes.map(el => {
          guarantee_labels.push(el.labels[0])
          return {
            name: el.id,
            label: el.properties.customername,
            category: el.labels[0],
            value: 1
          }
        })
        var guarantee_links = guarantee.relationships.map(el => {
          return {
            source: el.startNode,
            target: el.endNode,
            name: el.properties.labels[0],
            weight: 1
          }
        })
        guarantee_labels = Array.from(new Set(guarantee_labels))
        var guarantee_labelsname = []
        guarantee_labels.map(el => {
          guarantee_labelsname.push({ name: el })
        })
        guarantee_nodes.forEach(item => {
          item.category = guarantee_labels.indexOf(item.category)
        })
        myChart2.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          legend: {
            data: guarantee_labels,
            x: 'center'
          },
          series: [{
            name: '企业担保圈',
            type: 'force',
            symbolSize: 10,
            nodes: guarantee_nodes,
            links: guarantee_links,
            categories: guarantee_labelsname,
            roam: true,
            itemStyle: itemStyle,
            useWorker: false,
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 3
          }]
        });
      }
      
      if(people && people.nodes){
        var people_labels = []
        var people_nodes = people.nodes.map(el => {
          people_labels.push(el.labels[0])
          return {
            name: el.id,
            label: el.properties.customername,
            category: el.labels[0],
            value: 1
          }
        })
        var people_links = people.relationships.map(el => {
          return {
            source: el.startNode,
            target: el.endNode,
            name: el.properties.labels[0],
            weight: 1
          }
        })
        people_labels = Array.from(new Set(people_labels))
        var people_labelsname = []
        people_labels.map(el => {
          people_labelsname.push({ name: el })
        })
        people_nodes.forEach(item => {
          item.category = people_labels.indexOf(item.category)
        })
        myChart3.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          legend: {
            data: people_labels,
            x: 'center'
          },
          series: [{
            name: '相关人关系',
            type: 'force',
            symbolSize: 10,
            nodes: people_nodes,
            links: people_links,
            categories: people_labelsname,
            roam: true,
            itemStyle: itemStyle,
            useWorker: false,
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 3
          }]
        });
      }
    },
    initCharts3() {
      let charts3 = echarts.init(document.getElementById('bank-charts3'))
      let names = ['流入金额（万）', '流出金额（万）', '余额（万）']
      let xAxis = this.options.monthStatistics.map(item => {
        return item.month
      })
      let keys = ['in', 'out', 'balance']
      let series = []
      keys.forEach((k, index) => {
        let data = this.options.monthStatistics.map(item => {
          return item[k]
        })
        series.push({
          name: names[index],
          type: 'bar',
          barMaxWidth: 20,
          data: data
        })
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
          name: '金额（万）'
        }],
        series: series
      };
      charts3.setOption(option)
    },
    initCharts4() {
      let charts4 = echarts.init(document.getElementById('bank-charts4'))
      let names = []
      let list = this.options.firstIn.list.concat(this.options.firstOut.list)
      let yAxis = list.map(item => {
        return item.otherPerson
      })
      yAxis = Array.from(new Set(yAxis))
      let series = []
      if(this.options.firstIn.list.length > 0){
        names.push('流入（万）')
        series.push({
          name: '流入（万）',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'left'
            },
            formatter(value){
              return Math.abs(value)
            }
          },
          stack: '总量',
          data: this.options.firstIn.list.map(item => { return 0 - Number(item.sum) })
        })
      }
      if(this.options.firstOut.list.length > 0){
        names.push('流出（万）')
        series.push({
          name: '流出（万）',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'left'
            },
            formatter(value){
              return Math.abs(value)
            }
          },

          stack: '总量',
          data: this.options.firstOut.list.map(item => { return Number(item.sum) })
        })
      }

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
          type: 'value',
          axisLabel: {
            formatter(value){
              return Math.abs(value)
            }
          }
        }],
        yAxis: [{
          type: 'category',
          axisTick: { show: false },
          name: '交易客户',
          data: yAxis
        }],
        series: series
      };
      charts4.setOption(option)
    },
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
  width: 1200px;
  height: 600px;
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
