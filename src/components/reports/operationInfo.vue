<template>
  
          
          <!-- 经营状况 -->
          <div class="report-item">
            <template v-if="investReport">
              <div class="title">
                <h3 v-if="options.title">{{options.title}}</h3>
                <h3 v-else>经营状况</h3>
              </div>
              
              <div v-if="options.iec">
                <h4 class="style-h4">关键指标</h4>
              </div>
              <div v-else>
                <h5 class="style-h5">1.  关键指标</h5>
              </div>
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
                      <td>{{item.dimension}}</td>
                    </template>
                    <template v-else-if="index%2==1">
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
              <template v-if="options.companyOrperationImportantInfo">
                <h5 class="style-h5">公司经营关键信息：</h5>
                <p>根据企业工商信息和平台数据采集结果，自动化判断该行业为 <u style="display: inline-block;min-width: 30px;">{{options.companyOrperationImportantInfo.industry}} - {{options.companyOrperationImportantInfo.detailIndustry}}</u>，属于泗阳农商行信贷政策中的  <u style="display: inline-block;min-width: 30px;">{{options.companyOrperationImportantInfo.isEncourage}}</u>。</p>
                <h5 class="style-h5">行业与经营环境分析：</h5>
                <p>{{options.companyOrperationImportantInfo.environmentAnalysis || '暂无数据'}}</p>
                <h5 class="style-h5">公司经营情况分析：</h5>
                <p>{{options.companyOrperationImportantInfo.operationAnalysis || '暂无数据'}}</p>
              </template>
              <template v-if="options.iec">
                <h5 class="style-h5">1.  收入与能耗</h5>
                <div id="operation-charts3" class="charts" v-show="options.iec && options.iec.length > 0">
                  ------水电气营业收入变化图--------
                </div>
                <table class="style-table border center" cellpadding="0" cellspacing="0">
                  <tr>
                    <th>维度</th>
                    <th>营业收入</th>
                    <!-- <th>水费</th> -->
                    <th>电费</th>
                    <th>仓库租赁</th>
                    <th>物流费用</th>
                  </tr>
                  <template v-if="options.iec.length>0">
                    <tr v-for="item in options.iec">
                      <td>{{item.dimension}}</td>
                      <td>{{item.income}}</td>
                      <!-- <td>{{item.water}}</td> -->
                      <td>{{item.electricity}}</td>
                      <td>{{item.warehouse }}</td>
                      <td>{{item.logistics }}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="5">经查询，该企业无相关信息</td>
                    </tr>
                  </template>
                </table>
              </template>
              <h5 class="style-h5">2.  进项发票信息</h5>
              <div id="operation-charts4" class="charts" v-show="options.iri && options.iri.length > 0"></div>
              <p style="text-align: center;" v-show="options.iri && options.iri.length > 0">数据来源说明：第三方数据源</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>开票月份</th>
                  <th>有效发票份数</th>
                  <th>有效发票金额（元）</th>
                  <th>作废发票数</th>
                  <th>红冲发票数</th>
                  <th>异常发票数</th>
                </tr>
                <template v-if="options.iri && options.iri.length>0">
                  <tr v-for="item in options.iri">
                    <td>{{item.month}}</td>
                    <td>{{item.validAmt }}</td>
                    <td>{{item.validSum }}</td>
                    <td>{{item.invalidAmt }}</td>
                    <td>{{item.rsiAmt}}</td>
                    <td>{{item.ExceptionAmt}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="6">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <h5 class="style-h5">3.  销项发票信息</h5>
              <div id="operation-charts5" class="charts" v-show="options.sii && options.sii.length > 0">
                ------月度销项发票金额变化--------
              </div>
              <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="options.sii&&options.sii.length>0">
                <tr>
                  <th rowspan="2">开票月份</th>
                  <th>有效发票份数</th>
                  <th>作废发票份数</th>
                  <th rowspan="2">有效发票金额占比（%）</th>
                </tr>
                <tr>
                  <th>有效发票金额（元）</th>
                  <th>作废发票金额（元）</th>
                </tr>
                <template v-for="item in options.sii">
                  <tr>
                    <td rowspan="2">{{item.month}}</td>
                    <td>{{item.validAmt }}</td>
                    <td>{{item.invalidAmt }}</td>
                    <td rowspan="2">{{item.ratio }}</td>
                  </tr>
                  <tr>
                    <td>{{item.validSum }}</td>
                    <td>{{item.invalidSum }}</td>
                  </tr>
                </template>
              </table>
              <table class="style-table border center" cellpadding="0" cellspacing="0" v-else>
                <tr>
                  <th rowspan="2">开票月份</th>
                  <th>有效发票份数</th>
                  <th>作废发票份数</th>
                  <th rowspan="2">有效发票金额占比（%）</th>
                </tr>
                <tr>
                  <th>有效发票金额（元）</th>
                  <th>作废发票金额（元）</th>
                </tr>
                <tr>
                  <td colspan="4">经查询，该企业无相关信息</td>
                </tr>
              </table>
              <h5 class="style-h5">4.  上游供应商情况</h5>
              <div id="operation-charts6" class="charts" v-show="options.suppliers && options.suppliers.length > 0">
                --------上游客户数量与交易金额--------
              </div>
              <p style="text-align: center;" v-show="options.suppliers && options.suppliers.length > 0">数据来源说明：第三方数据源</p>
              <p>供应商数目及金额</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th rowspan="2">日期</th>
                  <th rowspan="2">供应商数量</th>
                  <th colspan="3">新供应商（截至上一月度末未进行过交易的企业）</th>
                </tr>
                <tr>
                  <th>数量</th>
                  <th>金额</th>
                  <th>金额占比（%）</th>
                </tr>
                <template v-if="options.suppliers&&options.suppliers.length>0">
                  <tr v-for="item in options.suppliers">
                    <td>{{item.date }}</td>
                    <td>{{item.supplierAmt }}</td>
                    <td>{{item.nSupplierAmt}}</td>
                    <td>{{item.nSupplierSum }}</td>
                    <td>{{item.nSupplierRatio }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <p style="margin-top: 10px" v-if="options.upSummary"><b>上游企业汇总分析：该公司累计上游供应商数量为{{options.upSummary.count}}家，平均交易金额约为 {{options.upSummary.avgAmount}}  元；上游供应商平均交易时长（月）：{{options.upSummary.avgTime}}</b></p>
              <p style="margin-top: 10px;">前五大上游供应商企业</p>
              <p style="text-align: right;" v-if="options.supplier_firstFive">采集时间区间：{{options.supplier_firstFive.startDate}} - {{options.supplier_firstFive.endDate}}</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>序号</th>
                  <th>客户名称</th>
                  <th>税号</th>
                  <th>地区(精确到区县)</th>
                  <th>所属行业</th>
                  <th>总交易额（元）</th>
                  <th>金额占比（%）</th>
                  <th>最后交易日期</th>
                </tr>
                <template v-if="options.supplier_firstFive&&options.supplier_firstFive.detail">
                  <tr v-for="(item, index) in options.supplier_firstFive.detail">
                    <td>{{index+1}}</td>
                    <td>{{item.company}}</td>
                    <td>{{item.tax}}</td>
                    <td>{{item.area }}</td>
                    <td>{{item.industry }}</td>
                    <td>{{item.sum }}</td>
                    <td>{{item.ratio }}</td>
                    <td>{{item.lastTime }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="8">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <el-row style="margin: 15px 0;">
                <el-col :span="12">
                  <p>上游供应商地域分布<span style="color: #999" v-if="!options.up_regionDistribution || options.up_regionDistribution.length==0">（暂无数据）</span></p>
                  <div id="operation-charts7" class="charts" v-show="options.up_regionDistribution && options.up_regionDistribution.length > 0">
                    --------上游供应商地域分布图--------
                  </div>
                  
                </el-col>
                <el-col :span="12">
                  <p>上游供应商行业分布<span style="color: #999" v-if="!options.up_industryDistribution || options.up_industryDistribution.length==0">（暂无数据）</span></p>
                  <div id="operation-charts8" class="charts" v-show="options.up_industryDistribution && options.up_industryDistribution.length > 0">
                  --------上游供应商行业分布图--------
                  </div>
                </el-col>
              </el-row>
              <p>按交易金额划分的前三大企业类型</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>企业类型</th>
                  <th>金额（元）</th>
                  <th>金额占比（%）</th>
                </tr>
                <template v-if="options.supplier_firstThird && options.supplier_firstThird.detail">
                  <tr v-for="(item, index) in options.supplier_firstThird.detail">
                    <td>{{item.company}}</td>
                    <td>{{item.sum}}</td>
                    <td>{{item.ratio}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="3">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <p v-if="options.supplier_firstThird"><b>综上，供应商的稳定性 <u>{{options.supplier_firstThird.eva1}}</u> （高/中/低）;供应商多样性 <u>{{options.supplier_firstThird.eva2}}</u> （高/中/低）。</b></p>
              <h5 class="style-h5">5.  下游客户情况</h5>
              <div id="operation-charts9" class="charts" v-show="options.customers && options.customers.length > 0">
              ------------下游客户数量与交易金额变化图------------
              </div>
              <p style="text-align: center;" v-show="options.customers && options.customers.length > 0">数据来源说明：第三方数据源</p>
              <p style="margin: 10px 0;">客户数目及金额</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th rowspan="2">日期</th>
                  <th rowspan="2">客户数量</th>
                  <th colspan="3">新客户（截至上一月度末未进行过交易的企业）</th>
                </tr>
                <tr>
                  <th>数量</th>
                  <th>金额</th>
                  <th>金额占比（%）</th>
                </tr>
                <template v-if="options.customers&&options.customers.length>0">
                  <tr v-for="item in options.customers">
                    <td>{{item.date }}</td>
                    <td>{{item.customerAmt}}</td>
                    <td>{{item.nCustomerAmt}}</td>
                    <td>{{item.nCustomerSum}}</td>
                    <td>{{item.nCustomerRatio}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <p v-if="options.downSummary"><b>下游企业汇总分析：该公司累计下游企业数量为 {{options.downSummary.count}} 家，平均交易金额约为 {{options.downSummary.avgAmount}} 元；<br />下游企业平均合作时长（月）：{{options.downSummary.avgTime}}</b></p>
              <p style="margin-top: 10px;">前五大下游客户企业</p>
              <p v-if="options.customer_firstFive" style="text-align: right;">采集时间区间：{{options.customer_firstFive.startDate}} - {{options.customer_firstFive.endDate}}</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>序号</th>
                  <th>客户名称</th>
                  <th>税号</th>
                  <th>地区(精确到区县)</th>
                  <th>所属行业</th>
                  <th>总交易额（元）</th>
                  <th>金额占比（%）</th>
                  <th>最后交易日期</th>
                </tr>
                <template v-if="options.customer_firstFive&&options.customer_firstFive.detail">
                  <tr v-for="(item, index) in options.customer_firstFive.detail">
                    <td>{{index+1}}</td>
                    <td>{{item.company}}</td>
                    <td>{{item.tax}}</td>
                    <td>{{item.area }}</td>
                    <td>{{item.industry }}</td>
                    <td>{{item.sum }}</td>
                    <td>{{item.ratio }}</td>
                    <td>{{item.lastTime }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="8">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <el-row style="margin: 15px 0;">
                <el-col :span="12">
                  <p>下游客户地域分布<span style="color: #999" v-if="!options.down_regionDistribution || options.down_regionDistribution.length==0">（暂无数据）</span></p>
                  <div id="operation-charts10" class="charts" v-show="options.down_regionDistribution && options.down_regionDistribution.length > 0">
                  --------下游客户地域分布图--------
                  </div>
                </el-col>
                <el-col :span="12">
                  <p>下游客户行业分布<span style="color: #999" v-if="!options.down_industryDistribution || options.down_industryDistribution.length==0">（暂无数据）</span></p>
                  <div id="operation-charts11" class="charts" v-show="options.down_industryDistribution && options.down_industryDistribution.length > 0">
                  --------下游客户行业分布图--------
                  </div>
                </el-col>
              </el-row>
              <p>按交易金额划分的前三大企业类型</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>企业类型</th>
                  <th>金额（元）</th>
                  <th>金额占比（%）</th>
                </tr>
                <template v-if="options.customer_firstThird&&options.customer_firstThird.detail">
                  <tr v-for="(item, index) in options.customer_firstThird.detail">
                    <td>{{item.company}}</td>
                    <td>{{item.sum}}</td>
                    <td>{{item.ratio}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="3">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <p v-if="options.customer_firstThird"><b>综上，下游客户的稳定性 <u>{{options.customer_firstThird.eva1}}</u> （高/中/低）;下游客户多样性 <u>{{options.customer_firstThird.eva2}}</u> （高/中/低）。</b></p>
              <h5 class="style-h5">6.  销售产品分析</h5>
              <p style="text-align: right;margin-top: 10px;" v-if="options.analyze">采集时间区间：{{options.analyze.startDate}} - {{options.analyze.endDate}}</p>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>商品名称</th>
                  <th>销售金额</th>
                  <th>次数</th>
                  <th>金额占比（%）</th>
                </tr>
                <template v-if="options.analyze&&options.analyze.detail">
                  <tr v-for="(item, index) in options.analyze.detail">
                    <td>{{item.name}}</td>
                    <td>{{item.sum}}</td>
                    <td>{{item.times}}</td>
                    <td>{{item.ratio}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
              <template>
                <h5 class="style-h5">7.  发票信息线下调查</h5>
                <table class="style-table border center" cellpadding="0" cellspacing="0">
                  <tr>
                    <th>时期</th>
                    <th>有效进项发票金额</th>
                    <th>有效销项发票金额</th>
                  </tr>
                  <template v-if="options.survey&&options.survey.length>0">
                    <tr v-for="(item, index) in options.survey">
                      <td>{{item.date}}</td>
                      <td>{{item.income}}</td>
                      <td>{{item.sale}}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="3">经查询，该企业无相关信息</td>
                    </tr>
                  </template>
                </table>
                <p style="margin: 10px 0;">其他详细信息</p>
              </template>
            </template>
            <template>
              <h5 class="style-h5">8.  商标信息</h5>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>名称</th>
                  <th>状态</th>
                  <th>申请时间</th>
                  <th>注册号</th>
                  <th>国际分类</th>
                </tr>
                <template v-if="options.brand&&options.brand.length>0">
                  <tr v-for="item in options.brand">
                    <td>{{item.name}}</td>
                    <td>{{item.state}}</td>
                    <td>{{item.applyDate || item.applicationTime}}</td>
                    <td>{{item.registerNo || item.registrationNumber}}</td>
                    <td>{{item.internationalCategory || item.internationalClassification}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
            </template>
            <template >
              <h5 class="style-h5">9.  专利</h5>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>序号</th>
                  <th>名称</th>
                  <th>类型</th>
                  <th>号码</th>
                  <th>申请时间</th>
                </tr>
                <template v-if="options.patent&&options.patent.length>0">
                  <tr v-for="(item,index) in options.patent">
                    <td>{{index + 1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.applyDate || item.applicationTime}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
            </template>
            <template>
              <h5 class="style-h5">10.  著作权</h5>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>序号</th>
                  <th>名称</th>
                  <th>版本号</th>
                  <th>发布日期</th>
                  <th>软件简称</th>
                  <th>登记号</th>
                  <th>登记批准日期</th>
                </tr>
                <template v-if="options.copyright&&options.copyright.length>0">
                  <tr v-for="(item,index) in options.copyright">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.version || item.versionNumber}}</td>
                    <td>{{item.releaseDate}}</td>
                    <td>{{item.abbreviations || item.softwareAbbreviation}}</td>
                    <td>{{item.registerNo || item.registerNumber}}</td>
                    <td>{{item.approvalDate || item.registrationApprovalDate}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="7">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
            </template>
            <template>
              <h5 class="style-h5">11.  上市信息</h5>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>证券代码</th>
                  <th>证券简称</th>
                  <th>上市板块</th>
                </tr>
                <template v-if="options.inMarket&&options.inMarket.length>0">
                  <tr v-for="(item,index) in options.inMarket">
                    <td>{{item.code || item.securitiesCode}}</td>
                    <td>{{item.abbreviations || item.securitiesAbbreviation}}</td>
                    <td>{{item.listingSector}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="3">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
            </template>
            <template>
              <h5 class="style-h5">12.  舆情信息</h5>
              <table class="style-table border center" cellpadding="0" cellspacing="0">
                <tr>
                  <th>标题</th>
                  <th>来源</th>
                  <th>日期</th>
                </tr>
                <template v-if="options.publicOpinion&&options.publicOpinion.length>0">
                  <tr v-for="(item,index) in options.publicOpinion">
                    <td>{{item.title}}</td>
                    <td>{{item.source}}</td>
                    <td>{{item.date}}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="3">经查询，该企业无相关信息</td>
                  </tr>
                </template>
              </table>
            </template>
          </div>
          
</template>
<script>


export default {
  props: {
    /* 经营状况 */
    options: {
      type: Object
    },
    investReport: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      /* 企业经营状况 */
      // iec: [], // 收入与能耗
      // iri: [], // 进项发票信息
      // sii: [], // 销项发票信息
      // suppliers: [], // 供应商数⽬及⾦额
      // supplier_firstFive: [], // 前五⼤上游供应商企业
      // supplier_firstThird: [], // 按交易金额划分的前三大企业类型
      // customers: [], // 客户数⽬及⾦额
      // customer_firstFive: [], // 前五⼤客户企业
      // customer_firstThird: [], // 按交易金额划分的前三大客户类型
      // survey: [], // 发票信息线下调查
      // brand: [], // 商标信息
      // patent: [], // 专利
      // copyright: [], // 著作权
      // inMarket: [], // 上市信息
      // publicOpinion: [], // 舆情信息
      // importantIndicator2: [], // 关键指标
      // companyOrperationImportantInfo: {}, // 公司经营关键信息
      // analyze: [], // 销售产品分析
    }
  },
  watch: {
    options: function(value){
      if(value.iec && value.iec.length > 0){
        this.initCharts3()
      }
      if(value.iri && value.iri.length > 0){
        this.initCharts4()  
      }
      if(value.sii && value.sii.length > 0){
        this.initCharts5()
      }
      if(value.suppliers && value.suppliers.length > 0){
        this.initCharts6()
      }
      if(value.supplier_firstFive && value.supplier_firstFive.detail){
        this.initCharts7()
        this.initCharts8()
      }
      if(value.customers && value.customers.length > 0){
        this.initCharts9()
      }
      if(value.customer_firstFive && value.customer_firstFive.detail){
        this.initCharts10()
        this.initCharts11()
      }
    }
  },
  methods: {
    initCharts3() {

      let charts3 = echarts.init(document.getElementById('operation-charts3'))
      let xAxis = this.options.iec.map(item => {
        return item.dimension
      })
      
      let names = ['营业收入', '电费', '仓库租赁', '物流费用']
      let keys = ['income', 'electricity', 'warehouse', 'logistics']
      let series = []
      let len = names.length
      for(let i = 0;i<len;i++){
        let stack = i==0?'收入':'支出'
        let key = keys[i]
        let data = this.options.iec.map(item => {
          return item[key]
        })
        series.push({
          name: names[i],
          type: 'bar',
          barMaxWidth: 30,
          stack: stack,
          data: data
        })
      }
      let lineData = this.options.iec.map(item => {
        let son = Number.parseInt(item.income)*100
        let mother = Number.parseInt(item.electricity) + Number.parseInt(item.warehouse) + Number.parseInt(item.logistics)
        return (son/mother).toFixed(2)
      })
      series.push({
        name: '收支比',
        type: 'line',
        data: lineData,
        yAxisIndex: 1,
        lineStyle: {
          color: '#ed7d31'
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
          data: names.concat(['收支比'])
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
        },{
          type: 'value',
          name: '收支比',
          splitLine:{
            show: false
          },
          axisLabel: {  
            formatter: '{value} %'  
          }
        }],
        series: series
      };
      charts3.setOption(option)
    },
    initCharts4() {
      let charts4 = echarts.init(document.getElementById('operation-charts4'))
      let xAxis = this.options.iri.map(item => {
        return item.month
      })
      xAxis.sort(function(a, b){
        return Number(a) - Number(b)
      })
      let names = ['有效发票金额（元）', '有效发票份数']
      let series = [{
        name: names[0],
        type: 'bar',
        barMaxWidth: 30,
        data: this.options.iri.map(item => {return item.validSum})
      },{
        name: names[1],
        type: 'line',
        data: this.options.iri.map(item => {return item.validAmt}),
        yAxisIndex: 1,
        lineStyle: {
          color: '#ed7d31'
        }
      }]
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
          name: '金额'
        },{
          type: 'value',
          name: '有效发票数',
          splitLine:{
            show: false
          }
        }],
        series: series
      };
      charts4.setOption(option)
    },
    initCharts5() {
      let charts5 = echarts.init(document.getElementById('operation-charts5'))
      let xAxis = this.options.sii.map(item => {
        return item.month
      })
      xAxis.sort(function(a, b){
        return Number(a) - Number(b)
      })
      let names = ['有效发票金额（元）', '有效发票份数']
      let series = [{
        name: names[0],
        type: 'bar',
        barMaxWidth: 30,
        data: this.options.sii.map(item => {return item.validSum})
      },{
        name: names[1],
        type: 'line',
        data: this.options.sii.map(item => {return item.validAmt}),
        yAxisIndex: 1,
        lineStyle: {
          color: '#ed7d31'
        }
      }]
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
          name: '金额'
        },{
          type: 'value',
          name: '有效发票数',
          splitLine:{
            show: false
          }
        }],
        series: series
      };
      charts5.setOption(option)
    },
    initCharts6() {
      let charts6 = echarts.init(document.getElementById('operation-charts6'))
      let xAxis = this.options.suppliers.map(item => {
        return item.date
      })
      xAxis.sort(function(a, b){
        return Number(a) - Number(b)
      })
      let names = ['供应商数量', '金额']
      let series = [{
        name: names[0],
        type: 'bar',
        barMaxWidth: 30,
        data: this.options.suppliers.map(item => {return item.supplierAmt})
      },{
        name: names[1],
        type: 'line',
        data: this.options.suppliers.map(item => {return item.nSupplierSum}),
        yAxisIndex: 1,
        lineStyle: {
          color: '#ed7d31'
        }
      }]
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
          name: '供应商数量'
        },{
          type: 'value',
          name: '金额',
          splitLine:{
            show: false
          }
        }],
        series: series
      };
      charts6.setOption(option)
    },
    initCharts7() {

      let charts7 = echarts.init(document.getElementById('operation-charts7'))
      let data = this.options.up_regionDistribution.map(item => {
        return {
          value: item.value,
          name: item.name
        }
      })
      let names = data.map(item => {
        return item.name
      })
      let series = [{
            name: '上游供应商地域分布',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label:{
                show: true,
                formatter:'{b} : {c} ({d}%)'
            }
        }]
      let option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: names
        },
        series: series
      };
      charts7.setOption(option)
    },
    initCharts8() {
      let charts8 = echarts.init(document.getElementById('operation-charts8'))
      let data = this.options.up_industryDistribution.map(item => {
        return {
          value: item.value,
          name: item.name
        }
      })
      let names = data.map(item => {
        return item.name
      })
      let series = [{
            name: '上游供应商行业分布',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label:{
                show: true,
                formatter:'{b} : {c} ({d}%)'
            }
        }]
      let option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: names
        },
        series: series
      };
      charts8.setOption(option)
    },
    initCharts9() {
      let charts9 = echarts.init(document.getElementById('operation-charts9'))
      let xAxis = this.options.customers.map(item => {
        return item.date
      })
      xAxis.sort(function(a, b){
        return Number(a) - Number(b)
      })
      let names = ['下游客户数量', '金额']
      let series = [{
        name: names[0],
        type: 'bar',
        barMaxWidth: 30,
        data: this.options.customers.map(item => {return item.customerAmt})
      },{
        name: names[1],
        type: 'line',
        data: this.options.customers.map(item => {return item.nCustomerSum}),
        yAxisIndex: 1,
        lineStyle: {
          color: '#ed7d31'
        }
      }]
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
          name: '下游客户数量'
        },{
          type: 'value',
          name: '金额',
          splitLine:{
            show: false
          }
        }],
        series: series
      };
      charts9.setOption(option)
    },
    initCharts10() {
      let charts10 = echarts.init(document.getElementById('operation-charts10'))
      let data = this.options.down_regionDistribution.map(item => {
        return {
          value: item.value,
          name: item.name
        }
      })
      let names = data.map(item => {
        return item.name
      })
      let series = [{
            name: '下游客户地域分布',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label:{
                show: true,
                formatter:'{b} : {c} ({d}%)'
            }
        }]
      let option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: names
        },
        series: series
      };
      charts10.setOption(option)
    },
    initCharts11() {
      let charts11 = echarts.init(document.getElementById('operation-charts11'))
      let data = this.options.down_industryDistribution.map(item => {
        return {
          value: item.value,
          name: item.name
        }
      })
      let names = data.map(item => {
        return item.name
      })
      let series = [{
            name: '下游客户行业分布',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label:{
                show: true,
                formatter:'{b} : {c} ({d}%)'
            }
        }]
      let option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: names
        },
        series: series
      };
      charts11.setOption(option)
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
