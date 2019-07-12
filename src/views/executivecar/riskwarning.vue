<template>
  <div style="border-top: solid 3px #f0f2f5;margin-top: -20px;">
    <el-row>
      <div class="tit-sm">行内业务指标预警</div>
      <el-col :span="8">
        <div class="echarts" id="riskWarning-echarts1"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="8">
        <div class="echarts" id="riskWarning-echarts2"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="8">
        <div class="echarts" id="riskWarning-echarts3"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="8">
        <div class="echarts" id="riskWarning-echarts4"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="8">
        <div class="echarts" id="riskWarning-echarts5"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="8">
        <div class="echarts" id="riskWarning-echarts6"><i class="el-icon-loading"></i></div>
      </el-col>
      <el-col :span="24">
        <div class="tit-sm">
          <span style="float: left;">客户预警信息总览</span>
          <el-checkbox-group v-model="checkboxGroup" size="small" @change="handleChange">
            <el-checkbox-button label="上月新增"></el-checkbox-button>
            <el-checkbox-button label="历史累计"></el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div style="padding: 15px 30px;">
          <span>行业:</span>
          <el-select v-model="value" :clearable="true" size="mini" @change="handleSelectChange">
            <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="echarts" id="riskWarning-echarts7"><i class="el-icon-loading"></i></div>
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
      checkboxGroup: [],
      option2: {},
      echarts7: null,
      echarts7_data1: [],
      echarts7_data2: [],
      echarts7_data3: [],
      options: [],
      value: ''
    }

  },
  methods: {
    queryInfo() {
      api.queryInfo({
        "type": "riskWarning"
      }).then(({ data }) => {
        if (data.code == '1') {
          this.queryData = data.data

          if (this.queryData.adeptIndicator) {
            try {
              this.initEcharts1()
            } catch (err) { console.log(err) }

          }
          if (this.queryData.customerWarning) {
            this.options = this.queryData.customerWarning.dataList
            try {
              this.initEcharts2()
            } catch (err) { console.log(err) }

          }
        }
      })
    },
    initEcharts1() {
      let options = this.queryData.adeptIndicator.map(item => {
        let data = item.inlineData || ''
        if (/\d/.test(data) === false) {
          data = 100
        } else {
          data = ('' + data).replace('%', ''),
            data = Number(data)
        }

        let warningInfo = item.warningInfo || '未知'
        return {
          title: {
            text: item.name,
            x: 'center',
            y: 260
          },
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },
          series: [{
            type: 'gauge',
            name: item.name,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [0.2, '#228b22'],
                  [0.8, '#48b'],
                  [1, '#ff4500']
                ],
                width: 8
              }
            },
            detail: { formatter: '{value}%' },
            data: [{ value: data, name: item.warningInfo }]
          }]
        }
      })
      for (let i = 0; i < options.length; i++) {
        let no = i + 1
        let echarts1 = echarts.init(document.getElementById('riskWarning-echarts' + no))
        echarts1.setOption(options[i])
      }
    },
    initEcharts2() {
      this.echarts7_data1 = [{
        name: '日常数据预警',
        value: this.queryData.customerWarning.totalData["dailyDataWarning"]
      }, {
        name: '司法及负面舆情',
        value: this.queryData.customerWarning.totalData["judicature"]
      }, {
        name: '重大变更',
        value: this.queryData.customerWarning.totalData["importantChange"]
      }, {
        name: '经营风险',
        value: this.queryData.customerWarning.totalData["manageRisk"]
      }]
      this.echarts7_data2 = [{
        name: '上月新增',
        value: this.queryData.customerWarning.newWarningCount
      }]
      this.echarts7_data3 = [{
        name: '历史累计',
        value: this.queryData.customerWarning.historyCount
      }]
      let total = this.echarts7_data1.reduce((total, current) => { return total + Number(current.value) }, 0)

      this.option2 = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: '55%',
          y: '30%',
          data: this.echarts7_data1.map(item => { return item.name })
        },
        series: [{
          name: '客户预警信息',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['40%', '50%'],
          data: this.echarts7_data1,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = ['#0F97FF', ' #41D9C7', '#2EC25B', '#9AE65C', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5B8EE6', '#13C2C2 ', '#5CA3E7'];
                return colorList[params.dataIndex]
              },
              label: {
                formatter:'{b} {c}'
              }
            },
          }
        }]
      }

      this.echarts7 = echarts.init(document.getElementById('riskWarning-echarts7'))
      this.echarts7.setOption(this.option2)
    },
    handleChange(val) {
      this.echarts7.clear()
      this.value = ''
      if (val.length > 1) {
        this.checkboxGroup = [val[1]]
      }
      if (val.length == 0) {
        this.option2.series[0].data = this.echarts7_data1
        this.option2.legend.data = this.echarts7_data1.map(item => { return item.name })
        this.echarts7.setOption(this.option2)
      } else if (val[val.length - 1] === '上月新增') {
        this.option2.series[0].data = this.echarts7_data2
        
        this.option2.legend.data = this.echarts7_data2.map(item => { return item.name })
        this.echarts7.setOption(this.option2)
      } else if (val[val.length - 1] === '历史累计') {
        this.option2.series[0].data = this.echarts7_data3
        this.option2.legend.data = this.echarts7_data3.map(item => { return item.name })
        this.echarts7.setOption(this.option2)
      }
    },
    handleSelectChange(val) {
      this.echarts7.clear()
      this.checkboxGroup = []
      if (val) {
        let obj = this.options.find(item => { return item.name === val })

        let data = [{
          name: '日常数据预警',
          value: obj["dailyDataWarning"]
        }, {
          name: '司法及负面舆情',
          value: obj["judicature"]
        }, {
          name: '重大变更',
          value: obj["importantChange"]
        }, {
          name: '经营风险',
          value: obj["manageRisk"]
        }]
        this.option2.series[0].data = data
        
        this.option2.legend.data = data.map(item => { return item.name })
        this.echarts7.setOption(this.option2)
      } else {
        this.option2.series[0].data = this.echarts7_data1
        
        this.option2.legend.data = this.echarts7_data1.map(item => { return item.name })
        this.echarts7.setOption(this.option2)
      }
    }
  },
  created() {
    this.queryInfo()
  }
}

</script>
<style lang="scss" scoped="">
.tit-sm {
  font-size: 13px;
  color: #000;
  padding: 8px 0 5px 30px;
  border-bottom: solid 2px #f0f2f5;
  overflow: hidden;
  line-height: 32px;
}

.el-col {
  border-bottom: solid 2px #f0f2f5;
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

.el-checkbox-group {
  float: right;
  margin-right: 20px;
}

</style>
