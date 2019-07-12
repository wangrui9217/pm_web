<template>
  <div>
    <el-row>
      <div class="tit-sm" style="margin-top: -15px;">日均存款余额</div>
      <el-col :span="24">
        <div class="echarts" id="businessAnalysis-echarts1"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="14">
        <div class="tit-sm">贷款数据</div>
        <el-radio-group v-model="radio" size="small" @change="handleChange" style="margin-top:10px;">
          <el-radio-button label="按贷款状态"></el-radio-button>
          <el-radio-button label="按五级分类"></el-radio-button>
          <el-radio-button label="按保证类型"></el-radio-button>
          <el-radio-button label="按贷款期限"></el-radio-button>
        </el-radio-group>
        <div class="echarts" id="businessAnalysis-echarts2" style="height: 500px;"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="10">
        <div class="tit-sm">行业报告</div>
        <div class="g-style-industry" style="padding: 20px;">
          <el-table ref="table" :data="industryReport" height="502">
            <el-table-column label="行业名称" prop="name" min-width="120" />
            <el-table-column label="企业数量" prop="count" />
            <el-table-column label="贷款余额" prop="loanBalance" />
            <el-table-column label="风险数量" prop="riskCount" />
          </el-table>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="tit-sm">行业内贷款客户质量分布情况</div>
        <div class="echarts" id="businessAnalysis-echarts4" style="height: 500px;">
          <i v-if="queryData.businessCustomerDistribution && !queryData.businessCustomerDistribution.companyQuality">暂无数据</i>
          <i v-else class="el-icon-loading"></i>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="echarts" id="businessAnalysis-mypie" style="height: 545px;">
          <i v-if="queryData.businessCustomerDistribution && !queryData.businessCustomerDistribution.companyQuality">暂无数据</i>
          <i v-else class="el-icon-loading"></i>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="tit-sm">行业内贷款客户质量分布情况</div>
        <div style="margin-left: 10px;">
          <span>行业:</span>
          <el-select v-model="qualityobj.industry" @change="qualityfn" size="mini" style="margin-top:10px;" >
            <el-option v-for="(item,index) in industry" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <span>指标:</span>
          <el-select v-model="qualityobj.indexType" @change="qualityfn" size="mini">
            <el-option v-for="(item,index) in indexType" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-table :data="qualitydata" border style="width: 100%;margin-top:10px;margin-left: 10px;">
          <el-table-column prop="companyName" label="名称">
          </el-table-column>
          <el-table-column prop="detailedData" label="数值">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from '@/api-authority'

export default {
  data() {
    return {
      queryData: {},
      radio: '按贷款状态',
      option2: {},
      echarts2: null,
      industry: [], //行业
      echarts2_data1: [], // 按贷款状态
      echarts2_data2: [], // 按五级分类
      echarts2_data3: [], // 按保证类型
      echarts2_data4: [], // 按贷款期限
      indexType: [], //指标
      qualityobj: { //⾏业内贷款客户质量分布情况
        industry: '',
        indexType: ''
      },
      qualitydata: [],
      industryReport: [] //行业报告
    }

  },
  methods: {
    queryInfo() {
      api.queryInfo({
        "type": "businessAnalysis"
      }).then(({ data }) => {
        if (data.code == '1') {
          this.queryData = data.data
          this.industry = this.queryData.industry
          this.indexType = this.queryData.indexType
          this.industryReport = this.queryData.industryReport
          if (this.queryData.businessdataStatistics && this.queryData.businessdataStatistics.depositData) {
            this.initEcharts1()
          }
          if (this.queryData.businessdataStatistics && this.queryData.businessdataStatistics.loanData) {
            this.initEcharts2()
          }
          if (this.queryData.businessCustomerDistribution && this.queryData.businessCustomerDistribution.companyQuality) {
            this.initEcharts4()
          }
        }
      }).catch(err => {})
    },
    qualityDistribution(data) {
      api.qualityDistribution(data).then(({ data }) => {
        if (data.code == '1') {
          this.qualitydata = data.data.companyData || []
        }
      }).catch(err => {})
    },
    initEcharts1() {
      let echarts1 = echarts.init(document.getElementById('businessAnalysis-echarts1'))
      let data = this.queryData.businessdataStatistics.depositData.map(item => {
        return {
          value: item.money,
          name: item.name
        }
      })
      let names = data.map(item => {
        return item.name
      })
      let series = [{
        name: '日均存款余额',
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: data,
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
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   data: names,
        //   orient: 'vertical',
        //   left: '55%',
        //   top: 0
        // },
        series: series
      };
      echarts1.setOption(option)
    },
    initEcharts2() {
      this.echarts2_data1 = this.queryData.businessdataStatistics.loanData.map(item => { return item.loadStatus })
      this.echarts2_data2 = this.queryData.businessdataStatistics.loanData.map(item => { return item.fiveLevel })
      this.echarts2_data3 = this.queryData.businessdataStatistics.loanData.map(item => { return item.ensureType })
      this.echarts2_data4 = this.queryData.businessdataStatistics.loanData.map(item => { return item.loadDate })

      let yAxis = this.queryData.businessdataStatistics.loanData.map(item => { return item.name })
      this.option2 = {
        color: ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'],

        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value'
        }],
        yAxis: {
          type: 'category',
          name: '行业',
          data: yAxis
        },
        series: []
      }
      this.echarts2 = echarts.init(document.getElementById('businessAnalysis-echarts2'))
      this.byLoadStatus()
    },
    byLoadStatus() {
      let names = [
        { name: '正常未逾期', key: 'normal' },
        { name: '逾期30天以内', key: 'withinThirdDays' },
        { name: '逾期31到90天', key: '31to90days' },
        { name: '逾期91到180天', key: '91to180days' },
        { name: '逾期181到270天', key: '181to270days' },
        { name: '逾期271到360天', key: '271to360days' },
        { name: '逾期360以上', key: 'Over361DaysOverdue' }
      ];
      let series = []
      for (var i = 0; i < names.length; i++) {
        series.push({
          name: names[i].name,
          type: 'bar',
          barWidth: 10,
          stack: '数额',
          data: this.echarts2_data1.map(item => { return item[names[i].key] }),

        })
      }
      this.option2.series = series
      this.option2.legend.data = names.map(item => { return item.name })
      this.echarts2.clear()
      this.echarts2.setOption(this.option2)
    },
    byFiveLevel() {
      let names = [
        { name: '正常未逾期', key: 'normal' },
        { name: '次级', key: 'secondary' },
        { name: '损失', key: 'damage' },
        { name: '关注', key: 'focus' },
        { name: '可疑', key: 'suspicious' }
      ];
      let series = []
      for (var i = 0; i < names.length; i++) {
        series.push({
          name: names[i].name,
          type: 'bar',
          barWidth: 10,
          stack: '数额',
          data: this.echarts2_data2.map(item => { return item[names[i].key] })
        })
      }
      this.option2.series = series
      this.option2.legend.data = names.map(item => { return item.name })
      this.echarts2.clear()
      this.echarts2.setOption(this.option2)
    },
    byEnsureType() {
      let names = [
        { name: '质押', key: 'pledge' },
        { name: '抵押', key: 'mortgage' },
        { name: '保证', key: 'ensure' },
        { name: '信用', key: 'credit' },
        { name: '商业承兑汇票贴现', key: 'businessAcceptance' },
        { name: '银行承兑汇票贴现', key: 'bankAcceptance' },
        { name: '其他', key: 'other' }
      ];
      let series = []
      for (var i = 0; i < names.length; i++) {
        series.push({
          name: names[i].name,
          type: 'bar',
          barWidth: 10,
          stack: '数额',
          data: this.echarts2_data3.map(item => { return item[names[i].key] })
        })
      }
      this.option2.series = series
      this.option2.legend.data = names.map(item => { return item.name })
      this.echarts2.clear()
      this.echarts2.setOption(this.option2)
    },
    byLoadDate() {
      let names = [
        { name: '长', key: 'longTime' },
        { name: '中', key: 'midTime' },
        { name: '短', key: 'shortTime' }
      ];
      let series = []
      for (var i = 0; i < names.length; i++) {
        series.push({
          name: names[i].name,
          type: 'bar',
          barWidth: 10,
          stack: '数额',
          data: this.echarts2_data4.map(item => { return item[names[i].key] })
        })
      }
      this.option2.series = series
      this.option2.legend.data = names.map(item => { return item.name })
      this.echarts2.clear()
      this.echarts2.setOption(this.option2)
    },
    initEcharts4() {
      let echarts4 = echarts.init(document.getElementById('businessAnalysis-echarts4'))
      let mypie = echarts.init(document.getElementById('businessAnalysis-mypie'))


      let names = []
      let list = this.queryData.businessCustomerDistribution.companyQuality
      let yAxis = list.map(item => {
        return item.name
      })
      for (let k in list[0]) {
        if (k !== 'name') {
          names.push(k)
        }
      }

      let series = []
      for (var i = 0; i < names.length; i++) {
        series.push({
          name: names[i],
          type: 'bar',
          barWidth: 10,
          stack: '总量',
          data: list.map(item => { return item[names[i]] }),

        })
      }
      let option = {
        color: ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'],

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
          type: 'value'
        }],
        yAxis: {
          type: 'category',
          name: '行业',
          data: yAxis
        },
        series: series
      };
      echarts4.setOption(option)
      // 点击获取饼状图

      echarts4.on('click', function(params) {
        var pieinfo = [],
          piedata = []
        var pieinfo = list.filter(el => el.name == params.name)[0]
        piedata = Object.keys(pieinfo).filter(el => el != 'name').map(el => {
          return {
            name: el,
            value: pieinfo[el]
          }
        })
        Object.keys(pieinfo).filter(el => el != 'name')

        mypie.setOption({
          title: {
            text: params.name,
            x:'20',
            y:'10'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            data: Object.keys(pieinfo).filter(el => el != 'name'),
            x: 'center',
            y:'50',
            bottom: 0,
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '35%',
            center: ['50%', '60%'],
            data: piedata,
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

      })
    },
    handleChange(val) {
      if (val === '按贷款状态') {
        this.byLoadStatus()
      } else if (val === '按五级分类') {
        this.byFiveLevel()
      } else if (val === '按保证类型') {
        this.byEnsureType()
      } else if (val === '按贷款期限') {
        this.byLoadDate()
      }
    },
    qualityfn(val) {
      this.qualityDistribution({ indexType: this.qualityobj.indexType, industry: this.qualityobj.industry })
    }
  },
  created() {
    this.queryInfo()
    this.qualityDistribution({ indexType: '0', industry: '1' })
  }
}

</script>
<style lang="scss" scoped>
.tit-sm {
  font-size: 13px;
  color: #000;
  padding: 15px 0 15px 30px;
  border-bottom: solid 1px #f0f2f5;
}

.el-col {
  border: solid 2px #f0f2f5;
}

.echarts {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-icon-loading {
  font-size: 32px;
}

.el-radio-group {
  float: right;
  margin-right: 20px;
}

</style>
