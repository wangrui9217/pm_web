<template>
  
          <!-- 基本情况 -->
          <div class="report-item">
            <div class="title"><h3>基本情况</h3>
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
                    <td rowspan="4">{{item.dimension}}</td>
                  </template>
                  <template v-else-if="index==4">
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
            <h4 class="style-h4">详细信息</h4>
            <h5 class="style-h5">1. 基本信息</h5>
            <table class="style-table border center">
              <tr>
                <th>客户名称</th>
                <td>{{options.baseInfo.enterpriseName}}</td>
                <th>统一社会信用代码</th>
                <td>{{options.baseInfo.unifiedSocialCreditCode}}</td>
              </tr>
              <tr>
                <th>经营状态</th>
                <td>{{options.baseInfo.businessState || options.baseInfo.managementState}}</td>
                <th>企业（机构）类型</th>
                <td>{{options.baseInfo.enterpriseType || options.baseInfo.typesEnterprises}}</td>
              </tr>
              <tr>
                <th>工商登记机关</th>
                <td>{{options.baseInfo.gsRegisterAuthority || options.baseInfo.industrialCommercialRegistrationAuthority}}</td>
                <th>行业名称</th>
                <td>{{options.baseInfo.industryName}}</td>
              </tr>
              <tr>
                <th>注册资本（万元）</th>
                <td>{{options.baseInfo.registerCaptial || options.baseInfo.registeredCapital}}</td>
                <th>法定代表人</th>
                <td>{{options.baseInfo.legalPerson || options.baseInfo.legalRepresentative}}</td>
              </tr>
              <tr>
                <th>经营日期起</th>
                <td>{{options.baseInfo.businessDateStart}}</td>
                <th>经营日期至</th>
                <td>{{options.baseInfo.businessDateEnd}}</td>
              </tr>
              <tr>
                <th>经营业务范围</th>
                <td colspan="3">{{options.baseInfo.businessScope}}</td>
              </tr>
            </table>
            <h5 class="style-h5">2. 公司治理及人员信息</h5>
            <table class="style-table border center">
              <tr>
                <td colspan="4">法定代表人基本信息</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{options.legalRepresentative.name}}</td>
                <th>身份证号</th>
                <td>{{options.legalRepresentative.idNum}}</td>
              </tr>
              <tr>
                <th>手机号</th>
                <td>{{options.legalRepresentative.phoneNum}}</td>
                <th>银行卡号</th>
                <td>{{options.legalRepresentative.bankNum}}</td>
              </tr>
            </table>
            <p style="margin-top: 10px;">数据来源说明：企业提供</p>
            <table class="style-table border center">
              <tr>
                <td colspan="3">重要人物基本信息</td>
              </tr>
              <tr>
                <th>姓名</th>
                <th>身份证号码</th>
                <th>与企业关系</th>
              </tr>
              <template v-if="options.vip.length>0">
                <tr v-for="item in options.vip">
                  <td>{{item.name}}</td>
                  <td>{{item.idNum}}</td>
                  <td>{{item.relation | getRelation}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="3">经查询，该企业无相关信息</td>
                </tr>
              </template>
            </table>
            <table class="style-table border center" v-if="options.seniorExecutivesInfo && options.seniorExecutivesInfo.length>0">
              <tr>
                <th colspan="2">高管</th>
              </tr>
              <tr>
                <th>姓名</th>
                <th>职务</th>
              </tr>
              <template v-if="options.seniorExecutivesInfo.length>0">
                <tr v-for="item in options.seniorExecutivesInfo">
                  <td>{{item.name}}</td>
                  <td>{{item.position}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="2">经查询，该企业无相关信息</td>
                </tr>
              </template>
            </table>
            <h5 class="style-h5">3. 法定代表人其他公司关联</h5>
            <p>数据来源说明：通过第三方征信机构查询</p>
            <table class="style-table border center">
              <tr>
                <th>客户名称</th>
                <th>统一社会信用编码</th>
                <th>状态</th>
                <th>关系</th>
              </tr>
              <template v-if="options.companyRelavance.length>0">
                <tr v-for="item in options.companyRelavance">
                  <td>{{item.company}}</td>
                  <td>{{item.uscc}}</td>
                  <td>{{item.status}}</td>
                  <td>{{item.relation}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="4">经查询，该企业无相关信息</td>
                </tr>
              </template>
            </table>
            <h5 class="style-h5">4. 股东信息</h5>
            <table class="style-table border center">
              <tr>
                <th>序号</th>
                <th>股东姓名/客户名称</th>
                <th>认缴出资额（万元）</th>
                <th>出资比例</th>
              </tr>
              <template v-if="options.shareholdersInfo.length>0">
                <tr v-for="(item,index) in options.shareholdersInfo">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.captial}}</td>
                  <td>{{item.ratio}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="4">经查询，该企业无相关信息</td>
                </tr>
              </template>
            </table>
            <h5 class="style-h5">5. 对外投资</h5>
            <table class="style-table border center">
              <tr>
                <th>序号</th>
                <th>客户名称</th>
                <th>注册资本</th>
                <th>出资比例</th>
                <th>成立日期</th>
                <th>状态</th>
              </tr>
              <template v-if="options.toOutwardInvest.length>0">
                <tr v-for="(item, index) in options.toOutwardInvest">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.captial}}</td>
                  <td>{{item.ratio}}</td>
                  <td>{{item.date}}</td>
                  <td>{{item.state}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td :colspan="6">经查询，该企业无相关信息</td>
                </tr>
              </template>
            </table>
            <h5 class="style-h5">6. 分支机构</h5>
            <table class="style-table border center">
              <tr>
                <th>序号</th>
                <th>客户名称</th>
                <th>负责人</th>
                <th>注册日期</th>
                <th>状态</th>
              </tr>
              <template v-if="options.branch.length>0">
                <tr v-for="(item,index) in options.branch">
                  <td>{{index+1}}</td>
                  <td>{{item.name || item.enterpriseName}}</td>
                  <td>{{item.principal || item.personInCharge}}</td>
                  <td>{{item.date || item.registrationTime}}</td>
                  <td>{{item.state}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">经查询，该企业无相关信息</td>
                </tr>
              </template>
            </table>
            <h5 class="style-h5">7. 企业关联图谱<span style="color: #999" v-if="!options.diagram || !options.diagram.nodes">（暂无数据）</span></h5>
            <div id="charts2" class="charts" v-show="options.diagram && options.diagram.nodes"></div>
            <!-- <h5 class="style-h5">关系表</h5>
            <table class="style-table border center">
              <tr>
                <th>客户名称</th>
                <th>层数</th>
                <th>关系链</th>
                <th>类型</th>
              </tr> -->
              <!-- <template v-if="options.branch.length>0">
                <tr v-for="(item,index) in branch">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.principal}}</td>
                  <td>{{item.date}}</td>
                  <td>{{item.state }}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">经查询，该企业无相关信息</td>
                </tr>
              </template> -->
            <!-- </table> -->
          </div>
</template>
<script>


export default {
  props: {
    /* 基本情况 */
    options: {
      type: Object
    }
  },
  data() {
    return {
      
    }
  },
  filters: {
    getRelation(v){
      if(/\d/.test(v)){
        return ['未认证角色','法人','法人配偶','自然人股东','企业股东','会计'][v]
      }
      else{
        return v
      }
    }
  },
  watch: {
    'options': function(newV){
      console.log(newV,111)
      if(newV.diagram){
        this.initCharts2()
      }
      
    }
  },
  methods: {
    initCharts2() {
      let charts2 = echarts.init(document.getElementById('charts2'))
      let diagram = this.options.diagram

      var labels = []
      var nodes = diagram.nodes.map(el => {
        labels.push(el.labels[0])
        return {
          name: el.id,
          label: el.properties.name,
          category: el.labels[0],
          value: 1
        }
      })
      var links = diagram.relationships.map(el => {
        return {
          source: el.startNode,
          target: el.endNode,
          name: el.properties.labels[0],
          weight: 1
        }
      })
      labels = Array.from(new Set(labels))
      var labelsname = []
      labels.map(el => {
        labelsname.push({ name: el })
      })
      nodes.forEach(item => {
        item.category = labels.indexOf(item.category)
      })
      charts2.setOption({
        
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        legend: {
          data: labels,
          x: 'center'
        },
        series: [{
          name: '企业关联图谱',
          type: 'force',
          symbolSize: 10,
          nodes: nodes,
          links: links,
          categories: labelsname,
          roam: 'move',
          itemStyle: {
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
            },
            useWorker: false,
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 1.1,
        }]
      });
    }
  },
  created() {
    
  },
  mounted() {
    //this.initCharts1()
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
