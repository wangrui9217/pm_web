<template>
  <div class="overflow mainechars">
    <h2>整体概况</h2>
    <div class="left  bor" style="width: 40%;">
      <h3>
        泗阳县各类型企业统计
      </h3>
      <div id="main" style="width: 100%;height:362px;"></div>
    </div>
    <div class="left bor" style="width: 20%;">
      <h3></h3>
      <div id="mypie" style="width: 100%;height:362px;"></div>
    </div>
    <div class="left bor" style="width: 20%;">
      <h3>泗阳县各等级客户贷款余额(万元)</h3>
      <div id="main2" style="width: 100%;height:362px;"></div>
    </div>
    <div class="left bor" style="width: 20%;">
      <h3>本年度行内贷款信息概览(万元)</h3>
      <el-form ref="form" :model="form" label-width="140px" style="height:349px">
        <el-form-item label="贷款余额: ">
          <span>{{form.k1}}</span>
        </el-form-item>
        <el-form-item label="本年贷款额: ">
          <span>{{form.k3}}</span>
        </el-form-item>
        <el-form-item label="本年还款额: ">
          <span>{{form.k5}}</span>
        </el-form-item>
        <el-form-item label="不良贷款额(核销): ">
          <span>{{form.k7}}</span>
        </el-form-item>
        <el-form-item label="不良贷款率(核销): ">
          <span>{{form.k8}}</span>
        </el-form-item>
        <el-form-item label="小微贷款余额: ">
          <span>{{form.k2}}</span>
        </el-form-item>
        <el-form-item label="小微贷款合同金额: ">
          <span>{{form.k4}}</span>
        </el-form-item>
        <el-form-item label="逾期贷款金额: ">
          <span>{{form.k6}}</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="left bor" style="width: 33%;">
      <h3>
        贷款五级分类结构分析(单位:万元)
      </h3>
      <div style="margin-left: 10px;">
        <span>客户等级:</span>
        <el-select v-model="fiveLevelCategory.customerLv" placeholder="行业" @change="fiveLevelCategoryindustfn" size="mini" class="martg">
          <el-option v-for="(item,index) in fiveLevelCategory.costomerLvArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <span>保证方式:</span>
        <el-select v-model="fiveLevelCategory.guaranteeWay" placeholder="保证方式" @change="fiveLevelCategoryguaranteefn" size="mini">
          <el-option v-for="(item,index) in fiveLevelCategory.guaranteeWayArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="main3" style="width: 100%;height:349px;"></div>
    </div>
    <div class="left bor" style="width: 33%;">
      <h3>
       贷款状态结构分析
      </h3>
      <div style="margin-left: 10px;">
        <span>客户等级:</span>
        <el-select v-model="loanStatusAnalysis.customerLv" placeholder="行业" @change="loanStatusAnalysisindustfn" size="mini" class="martg">
          <el-option v-for="(item,index) in loanStatusAnalysis.costomerLvArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <span>保证方式:</span>
        <el-select v-model="loanStatusAnalysis.guaranteeWay" placeholder="保证方式" @change="loanStatusAnalysisguaranteefn" size="mini" class="martg">
          <el-option v-for="(item,index) in loanStatusAnalysis.guaranteeWayArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="main4" style="width: 100%;height:349px;"></div>
    </div>
    <div class="left bor" style="width: 34%;">
      <h3>
        贷款期限结构分析
      </h3>
      <div style="margin-left: 10px;">
        <span>客户等级:</span>
        <el-select v-model="loanTimeAnalysis.customerLv" placeholder="行业" @change="loanTimeAnalysisindustfn" size="mini" class="martg">
          <el-option v-for="(item,index) in loanTimeAnalysis.costomerLvArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <span>保证方式:</span>
        <el-select v-model="loanTimeAnalysis.guaranteeWay" placeholder="保证方式" @change="loanTimeAnalysisguaranteefn" size="mini">
          <el-option v-for="(item,index) in loanTimeAnalysis.guaranteeWayArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="main5" style="width: 100%;height:349px;"></div>
    </div>
    <div style="clear:both;"></div>
    <div class=" bor" style="width: 100%;">
      <h3>
        前十大客户贷款余额(万元)
      </h3>
      <div style="margin-left: 10px;">
        <span>行业:</span>
        <el-select v-model="top10LoanBalance.industry" placeholder="行业" @change="loanbalanceindustfn" size="mini" class="martg">
          <el-option v-for="(item,index) in top10LoanBalance.industryArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <span>保证方式:</span>
        <el-select v-model="top10LoanBalance.guaranteeWay" placeholder="保证方式" @change="loanbalanceindustfn" size="mini">
          <el-option v-for="(item,index) in top10LoanBalance.guaranteeWayArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="main6" style="width: 100%;height:349px;"></div>
    </div>
    <div class=" bor" style="width: 100%;">
      <h3>
        前十大对外担保情况
      </h3>
      <div style="margin-left: 10px;">
        <span>行业:</span>
        <el-select v-model="top10Guarantee.industry" placeholder="行业" @change="guaranteefn" size="mini" class="martg">
          <el-option v-for="(item,index) in top10Guarantee.industryArr" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="main7" style="width: 100%;height:349px;"></div>
    </div>
    <div class="left bor" style="width: 50%;">
      <h2 style="margin-left: 10px;">行业概况</h2>
      <h3 style="margin-top: 0">
        贷款行业结构分析
      </h3>
      <div id="main8" style="width: 100%;height:650px;"></div>
    </div>
    <div class="left bor" style="width: 50%; height:734px;overflow: auto;">
      <!-- <h3></h3> -->
      <h3>
        各行业企业行内业务情况
      </h3>
      <table border="0" align="center" width="100%" class="btab">
        <tr class="bth">
          <td>行业名称</td>
          <td>日均存款余额(万元)</td>
          <td>贷款余额(万元)</td>
          <td>代发工资(万元)</td>
          <td>代缴水电(万元)</td>
        </tr>
        <tr v-for="(item,index) in datainfo.businessSituation" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.deposit}}</td>
          <td>{{item.loanBalance}}</td>
          <td>{{item.salary}}</td>
          <td>{{item.waterEle}}</td>
        </tr>
      </table>
    </div>
    <div style="clear:both;"></div>
    <!-- <div class="left" style="width: 50%;" >
           <h2>企业及调查概况</h2>
      <h3>
        各类企业营销进度
      </h3>
      <div id="main9" style="width: 100%;height:349px;" ></div> 
    </div>
      <div class="left" style="width: 50%;" >
           <h2></h2>
      <h3>
        各类企业营销进度
      </h3>
      <div id="main8" style="width: 100%;height:349px;" ></div> 
    </div> -->
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'
import moment from "moment"


export default {
  data() {


    return {
      datainfo: {

      },
      form: {},
      top10LoanBalance: { //十大客户贷款余额
        guaranteeWayArr: [],
        industryArr: [],
        industry: '0',
        guaranteeWay: '0'

      },
      top10Guarantee: { //十大对外担保情况    
        industryArr: [],
        industry: '0',


      },
      fiveLevelCategory: { //五级分类
        guaranteeWayArr: [],
        costomerLvArr: [],
        customerLv: '0',
        guaranteeWay: '0'
      },
      loanStatusAnalysis: { //贷款状态结构分析
        guaranteeWayArr: [],
        costomerLvArr: [],
        customerLv: '0',
        guaranteeWay: '0'
      },
      loanTimeAnalysis: { //贷款期限结构
        guaranteeWayArr: [],
        costomerLvArr: [],
        customerLv: '0',
        guaranteeWay: '0'
      }





    }

  },

  methods: {
    fiveLevelCategoryindustfn(data) {
      this.loanFiveLv({ customerLv: this.fiveLevelCategory.customerLv, guaranteeWay: this.fiveLevelCategory.guaranteeWay })
    },
    fiveLevelCategoryguaranteefn(data) {
      this.loanFiveLv({ customerLv: this.fiveLevelCategory.customerLv, guaranteeWay: this.fiveLevelCategory.guaranteeWay })

    },
    loanStatusAnalysisindustfn(data) {
      this.loanStatusAnalysisfn({ customerLv: this.loanStatusAnalysis.customerLv, guaranteeWay: this.loanStatusAnalysis.guaranteeWay })
    },
    loanStatusAnalysisguaranteefn(data) {
      this.loanStatusAnalysisfn({ customerLv: this.loanStatusAnalysis.customerLv, guaranteeWay: this.loanStatusAnalysis.guaranteeWay })
    },
    loanTimeAnalysisindustfn(data) {
      this.loanTimeAnalysisfn({ customerLv: this.loanTimeAnalysis.customerLv, guaranteeWay: this.loanTimeAnalysis.guaranteeWay })
    },
    loanTimeAnalysisguaranteefn(data) {
      this.loanTimeAnalysisfn({ customerLv: this.loanTimeAnalysis.customerLv, guaranteeWay: this.loanTimeAnalysis.guaranteeWay })

    },

    loanbalanceindustfn(data) {
      this.topTenLoanBalancefn({ industry: this.top10LoanBalance.industry, guaranteeWay: this.top10LoanBalance.guaranteeWay })

    },
    guaranteefn(data) { //十大对外担保
      this.topTenGuarantee({ industry: this.top10Guarantee.industry })

    },
    loanFiveLv(data) { //五级分类

      api.loanFiveLv(data).
      then((res) => {
        if (res.data.code == 1) {
          var myChart3 = echarts.init(document.getElementById("main3")),
            result = []
          result = res.data.data
          result = Object.keys(result).map(el => {
            var fiveLevelCategoryname = '';
            switch (el) {
              case 'l1':
                fiveLevelCategoryname = '正常'
                break;
              case 'l2':
                fiveLevelCategoryname = '关注'
                break;
              case 'l3':
                fiveLevelCategoryname = '次级'
                break;
              case 'l4':
                fiveLevelCategoryname = '可疑'
                break;
              case 'l5':
                fiveLevelCategoryname = '损失'
                break;
            }
            return {
              value: result[el],
              name: fiveLevelCategoryname
            }
          })

          myChart3.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: ["正常", '关注', '次级', '可疑', '损失'],
              left: 'center',
              bottom: 0,

            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: result,
              label: {
                formatter: ' {per|{d}%}',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {

                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                    return colorList[params.dataIndex]
                  }
                },
              }
            }]
          });
        } else {
          this.$message.error(res.data.message)

        }
      })
    },
    loanStatusAnalysisfn(data) { //贷款状态结构分析

      api.loanStatusAnalysis(data).
      then((res) => {
        if (res.data.code == 1) {

          var myChart4 = echarts.init(document.getElementById("main4"));
          var result = res.data.data
          result = Object.keys(result).map(el => {
            var loanStatusAnalysisname = '';
            switch (el) {
              case 'l1':
                loanStatusAnalysisname = '正常'
                break;
              case 'l2':
                loanStatusAnalysisname = '逾期30天以内'
                break;
              case 'l3':
                loanStatusAnalysisname = '逾期31到90天'
                break;
              case 'l4':
                loanStatusAnalysisname = '逾期91到180天'
                break;
              case 'l5':
                loanStatusAnalysisname = '逾期181到270天'
                break;
              case 'l6':
                loanStatusAnalysisname = '逾期271天到360天'
                break;
              case 'l7':
                loanStatusAnalysisname = '逾期361天以上'
                break;
            }
            return {
              value: result[el],
              name: loanStatusAnalysisname
            }
          })
          myChart4.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: ["正常", '逾期30天以内', '逾期31到90天', '逾期91到180天', '逾期181到270天', '逾期271天到360天', '逾期361天以上'],

              left: 'center',
              bottom: 0,

            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: result,
              label: {
                formatter: ' {per|{d}%}',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {

                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                    return colorList[params.dataIndex]
                  }
                },
              }
            }]
          });

        } else {
          this.$message.error(res.data.message)

        }

      })
    },
    loanTimeAnalysisfn(data) {
      api.loanTimeAnalysis(data).
      then((res) => {
        if (res.data.code == 1) {
          var myChart5 = echarts.init(document.getElementById("main5"));
          var result = res.data.data
          result = Object.keys(result).map(el => {
            var loanTimeAnalysisname = '';
            switch (el) {
              case 'l1':
                loanTimeAnalysisname = '短期'
                break;
              case 'l2':
                loanTimeAnalysisname = '中期'
                break;
              case 'l3':
                loanTimeAnalysisname = '长期'
                break;

            }
            return {
              value: result[el],
              name: loanTimeAnalysisname
            }
          })
          myChart5.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: ["短期", '中期', '长期'],

              left: 'center',
              bottom: 0,

            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: result,
              label: {
                formatter: ' {per|{d}%}',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {

                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                    return colorList[params.dataIndex]
                  }
                },
              }
            }]
          });

        } else {
          this.$message.error(res.data.message)

        }

      })

    },
    topTenLoanBalancefn(data) {
      api.topTenLoanBalance(data).
      then((res) => {
        if (res.data.code == 1) {
          var myChart6 = echarts.init(document.getElementById("main6"));
          var result = res.data.data.detail
          myChart6.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },

            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: result.map(el => el.name)
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '',
              type: 'bar',
              barWidth: '30',

              data: result.map(el => el.value),
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                    return colorList[params.dataIndex]
                  }
                },
              },
            }, ]
          });

        } else {
          this.$message.error(res.data.message)

        }

      })

    },
    topTenGuarantee(data) { //十大对外担保
      api.topTenGuarantee(data).
      then((res) => {
        if (res.data.code == 1) {
          var myChart7 = echarts.init(document.getElementById("main7"));
          var result = res.data.data.detail
          result = result.map(el => {
            return [el.balance, el.count, el.name]
          })
          console.log(result, 99991991919)

          var option = {
            tooltip: {
              trigger: 'axis',
              showDelay: 0,
              formatter: function(params) {
                if (params.value.length > 1) {
                  return params.seriesName + ' :<br/>'

                    +
                    params.value[2] + ' :<br/>' + params.value[1] + '户,贷款余额:' +
                    params.value[0] + '万元'
                }

              }
            },
            toolbox: {
              show: true,

            },
            xAxis: [{
              type: 'value',
              scale: true,
              axisLabel: {
                formatter: '{value} 万元'
              }
            }],
            yAxis: [{
              type: 'value',
              scale: true,

              axisLabel: {
                formatter: '{value} 户数'
              }
            }],
            series: [{
              name: '前十大对外担保',
              type: 'scatter',
              data: result,
              symbolSize: 10,
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                    return colorList[params.dataIndex]
                  }
                },
              },
            }]
          };
          myChart7.setOption(option)
          // myChart7.setOption({
          //                   tooltip : {
          //                       formatter: function(param) {  
          //                         var value = param.value;  
          //                         console.log(value,2222)
          //                         return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px;"> ' + value[2] +'</div>';  
          //                     }                                  
          //                   },
          //                           grid: {                          
          //                     bottom: '10%',
          //                     containLabel: true
          //                 },
          //                   xAxis: {},
          //                   yAxis:   {
          //                         type : 'value',
          //                                     axisLabel: {
          //                         formatter: '{value} 户数'
          //                     }
          //                     },
          //                   series : [
          //                       {
          //                         symbolSize:15,
          //                           data: result,
          //                           type: 'scatter',
          //                              itemStyle: {
          //                             normal: {
          //                                 color: function(params) { 
          //                                     var colorList = ['#0F97FF',' #41D9C7','#2EC25B','#9AE65C','#FACC14', '#E6965C','#223273','#7564CC','#8543E0','#5B8EE6','#13C2C2 ','#5CA3E7' ]; 
          //                                     return colorList[params.dataIndex] 
          //                                 }
          //                             },
          //                             },
          //                       }
          //                   ]
          //             });

        } else {
          this.$message.error(res.data.message)

        }

      })
    },
    getDate() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      api.queryInfo({ type: 'riskBaseAnalysis' }).
      then((res) => {
        loading.close()

        if (res.data.code == '1') {

          this.datainfo = res.data.data
          var myChart = echarts.init(document.getElementById("main")),
            mypie = echarts.init(document.getElementById("mypie")),
            myChart2 = echarts.init(document.getElementById("main2")),

            myChart8 = echarts.init(document.getElementById("main8"));









          //企业统计
          var enterpriseStatistic = this.datainfo.overallSituation.enterpriseStatistic,
            enterpriseStatisticname = '',
            enterpriseStatistictime = [], //xaxisdata
            enterpriseStatisticseries = [] //series    
          enterpriseStatisticseries = _.cloneDeep(enterpriseStatistic);

          enterpriseStatisticseries = Object.keys(enterpriseStatistic).map((el) => {
            switch (el) {
              case 'red':
                enterpriseStatisticname = '重点营销企业'
                break;

              case 'grey':
                enterpriseStatisticname = '灰名单企业'
                break
              case 'white':
                enterpriseStatisticname = '一般企业'
                break
              case 'black':
                enterpriseStatisticname = '黑名单企业'
                break
            }
            return {
              name: enterpriseStatisticname,
              type: 'bar',
              data: _.cloneDeep(enterpriseStatisticseries[el]).map(ele => ele.amount),
              stack: '企业',
              barWidth: '30',
              //  itemStyle: {
              // normal: {
              //     color: function(params) { 
              //         var colorList = ['#0F97FF',' #41D9C7','#2EC25B','#9AE65C','#FACC14', '#E6965C','#223273','#7564CC','#8543E0','#5B8EE6','#13C2C2 ','#5CA3E7' ]; 
              //         return colorList[params.dataIndex] 
              //     }
              // },
              // },
            }
          })


          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            color: ['#0F97FF', '#2EC25B', '#FACC14', '#223273'],
            legend: {
              data: ['重点营销企业', '一般企业', '黑名单企业', '灰名单企业'],
              left: 'center',
              bottom: 0,
              color: ['red']

            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: enterpriseStatistic['black'].map(ele => ele.date),
            }],
            yAxis: [{
              type: 'value',
              axisLabel: {
                formatter: '{value} 万元'
              },
            }],
            series: enterpriseStatisticseries
          });

          //点击获取饼状图
          //     var zr = myChart.getZr();
          myChart.on('click', function(params) {

            var pieinfo = '';
            pieinfo = Object.keys(enterpriseStatistic).map(el => {
              var piename = '',
                pievalue;
              switch (el) {
                case 'red':
                  piename = '重点营销企业'
                  break;

                case 'grey':
                  piename = '灰名单企业'
                  break
                case 'white':
                  piename = '一般企业'
                  break
                case 'black':
                  piename = '黑名单企业'
                  break
              }
              pievalue = enterpriseStatistic[el].filter(ele => {

                return params.name == ele.date
              })
              return {
                name: piename,
                value: pievalue[0].amount
              }

            })
            mypie.setOption({
              title: {
                text: params.name
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                data: ['重点营销企业', '一般企业', '黑名单企业', '灰名单企业'],
                left: 'center',
                bottom: 0,

              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: pieinfo,
                label: {
                  formatter: ' {per|{d}%}',
                  rich: {
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {

                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                },

                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
            });

          })

          //泗阳县各等级客户贷款余额
          var diffLevelBalance = this.datainfo.overallSituation.diffLevelBalance,
            diffLevelBalancearr = [], //lenged
            diffLevelBalanceseries = [] //series

          diffLevelBalancearr = Object.keys(diffLevelBalance).map(el => el)
          diffLevelBalanceseries = _.cloneDeep(diffLevelBalance);
          diffLevelBalanceseries = Object.keys(diffLevelBalanceseries).map(el => {
            return {
              value: diffLevelBalance[el],
              name: el
            }
          })

          myChart2.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: diffLevelBalancearr,
              left: 'center',
              bottom: 0,

            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '40%'],
              data: diffLevelBalanceseries,
              label: {
                formatter: ' {per|{d}%}',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {

                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {

                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                    return colorList[params.dataIndex]
                  }
                },
              }

            }]
          });
          //行内贷款信息概览
          this.form = this.datainfo.overallSituation.interanlLoanMessage[0];

          //贷款五级分类结构分析  贷款结构分析 贷款期限结构分析 筛选条件
          var fiveLevelCategory = this.datainfo.enum;
          this.loanTimeAnalysis.costomerLvArr = this.loanStatusAnalysis.costomerLvArr = this.fiveLevelCategory.costomerLvArr = fiveLevelCategory.customerLv
          this.top10LoanBalance.guaranteeWayArr = this.loanTimeAnalysis.guaranteeWayArr = this.loanStatusAnalysis.guaranteeWayArr = this.fiveLevelCategory.guaranteeWayArr = fiveLevelCategory.guaranteeWay
          console.log(this.fiveLevelCategory.costomerLvArr, this.fiveLevelCategory.guaranteeWayArr, 777)
          //前十大客户贷款余额  十大担保情况
          this.top10Guarantee.industryArr = this.top10LoanBalance.industryArr = fiveLevelCategory.industry

          //贷款行业结构分析
          var businessSituation = this.datainfo.businessSituation,
            businessSituationseries = [];
          businessSituationseries = businessSituation.map(el => {
            return {
              name: el.name,
              value: el.loanBalance
            }
          })

          myChart8.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              x: '5%',
              y: '8%',
              containLabel: true
            },
            legend: {
              data: businessSituation.map(el => el.name),
              left: 'center',
              bottom: '0',

            },

            series: [{
              name: '贷款余额',
              type: 'pie',
              radius: '45%',
              center: ['50%', '50%'],
              data: businessSituationseries,
              label: {
                formatter: ' {per|{d}%}',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {

                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  color: function(params) {
                    var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7', '#3336C7', '#A081E6', '#F04864', '#D141D9'];



                    return colorList[params.dataIndex]
                  }
                },
              }
            }]
          });
          //结束
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        loading.close()

        console.log(err)
      })
    },

  },
  created() {
    this.getDate()
    this.loanFiveLv({ customerLv: '0', guaranteeWay: '0' })
    this.loanStatusAnalysisfn({ customerLv: '0', guaranteeWay: '0' })
    this.loanTimeAnalysisfn({ customerLv: '0', guaranteeWay: '0' })
    this.topTenLoanBalancefn({ industry: '0', guaranteeWay: '0' })
    this.topTenGuarantee({ industry: '0' })




  },
  mounted() {

  }
}

</script>
<style lang="scss">
.mainechars {
  padding: 0 1%;

  h3 {
    text-align: center;
    margin-bottom: 10px;
  }

  h2 {
    height: 20px;
  }

  .el-form-item {
    margin-bottom: 6px;
  }

  .bor {
    border: solid 4px #f0f2f5;
    padding-top: 10px;

    h3 {
      height: 16px;
    }
  }

  .bth {
    td {
      background: #f0f0f0
    }
  }

  .btab {
    td {
      border-bottom: 1px solid #ebeef5;
      padding: 12px 6px;

    }
  }

  .martg {
    margin: 10px 0;
  }

}

</style>
