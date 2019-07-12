<template>
  <div  class="overflow mainechars">
      <h2>存款业务</h2>
    <div  style="width: 100%;" >
      <h3>
        存款规模分析
      </h3>
      <div id="main" style="width: 100%;height:349px;" ></div> 
    </div>
    <div  style="width: 100%;" >
      <h3>贷款业务变化趋势</h3>
       
<!-- <div id="main2" style="width:100%;height:349px;"></div>
<div id="main3" style="width:100%;height:349px;"></div> -->

  
          <div class="  bor" style="width: 100%;" >
      <h3>
        余额(万元)
      </h3>
      <div id="main2" style="width: 100%;height:362px;" ></div> 
    </div>
           <div class=" bor" style="width: 100%;" >
      <h3>
        五级分类(万元)
      </h3>
      <div id="main3" style="width: 100%;height:362px;" ></div> 
    </div>
     
    </div>
    <div  style="width: 100%;" >
      <h3>各支行业务情况</h3>
  
            <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px;">
              <el-table-column
            prop="name"
            label="支行名称"
              >
          </el-table-column>
          <el-table-column
            prop="depositsBalance"
            label="存款余额(万元)"
        >
          </el-table-column>
      
          <el-table-column
            prop="loadMoney"
            label="贷款余额(万元)">
          </el-table-column>
        </el-table>
    </div>

      
  </div>
</template>

<script>
  import PageTemplate from '@/components/page-template'
  import DataList from '@/components/data-list/data-list'
  import api from '@/api-authority'
  import moment from "moment"



  export default {
    data () {
  
 
      return {  
        datainfo:{

        },
        form:{},
        tableData:[],
        activeName:'first',

     
 

        
            
            
      }

    },

    methods: {
      getDate(){
                const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
             api.queryInfo({type:'businessDevelopTrend'}).
              then((res) => {
loading.close()

                if (res.data.code == '1') {
                    this.datainfo=res.data.data
              var myChart = echarts.init(document.getElementById("main")),
                  myChart2 = echarts.init(document.getElementById("main2")),
                  myChart3 = echarts.init(document.getElementById("main3"));

              //企业统计
    
              var depositBusiness=this.datainfo.depositBusiness.depositSize
               myChart.setOption({
                            tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
          
                grid: {
                    x: '6%',
                    y: '4%',
                    bottom: '10%',
                    containLabel: true
                },
              xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:depositBusiness.map(el=>el.date)
                },
                yAxis: {
                    type: 'value',
                     axisLabel: {
                        margin: 2,
                        formatter: function (value, index) {
                            // if (value >= 100000000) {
                            //     value = value / 10000 + "万";
                            // } 
                            return value;
                        }
                    },
                },
                series: [{
                    data: depositBusiness.map(el=>el.money*100000||0),
                    type: 'line',
                    areaStyle: {},
                      itemStyle: {
                        normal: {
                    
                        }}
                }]
            });
         
                //贷款业务变化趋势
                   //余额
              var loadBusinessChange=this.datainfo.loanBusiness.loadBusinessChange,
              loanBusinessdate=[],
              lastYearSameQuarter=[],
              newYearQuarter=[]
               loadBusinessChange.lastYearSameQuarter.reverse().map(el=>{
                  loanBusinessdate.push(el.date)
                  lastYearSameQuarter.push(el.money)
              })
              loadBusinessChange.newYear.reverse().map(el=>{
                newYearQuarter.push(el.money)
              })
         
   myChart2.setOption({
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color:['#0F97FF','#2EC25B','#FACC14','#223273' ],

                legend: {
                        data:['最新年度','去年同季']
                    },
          
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
              xAxis: {
                    type: 'category',
             
                    data:loanBusinessdate
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:'最新年度',
                    type:'bar',
                    width:'15',
                    data:lastYearSameQuarter,
              },
              {
                    name:'去年同季',
                    type:'bar',
                    width:'15',
                    data:newYearQuarter,
              }
              ]
            });
            var fiveCategories=this.datainfo.loanBusiness.fiveCategories,
                normal=[],
                focus=[],
                suspicious=[],
                secondary=[],
                damage=[],
                fiveCategoriesdate=[];
                fiveCategories.map(el=>{
                  fiveCategoriesdate.push(el.date)
                  normal.push(el.normal)
                  focus.push(el.focus)
                  suspicious.push(el.suspicious)
                  secondary.push(el.secondy)
                  damage.push(el.damage)
                })
                console.log(fiveCategoriesdate,999)
            //五级分类
             myChart3.setOption({
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color:['#0F97FF','#2EC25B','#FACC14','#223273','red' ],

                legend: {
                        data:['正常','关注','可疑','次级','损失']
                    },
          
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
              xAxis: {
                    type: 'category',
             
                    data:fiveCategoriesdate
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:'正常',
                    type:'bar',
                    width:'10',
                    data:normal,
              },
              {
                    name:'关注',
                    type:'bar',
                    width:'10',
                    data:focus,
              },
              {
                    name:'可疑',
                    type:'bar',
                    width:'10',
                    data:suspicious,
              },
              {
                    name:'次级',
                    type:'bar',
                    width:'10',
                    data:secondary,
              },
              {
                    name:'损失',
                    type:'bar',
                    width:'10',
                    data:damage,
              }
              ]
            });
    
            //各支行业务情况
this.tableData=[]
            var branchBusiness=this.datainfo.branchBusiness.condition[0]
             Object.keys(branchBusiness).map(el=>{
              this.tableData.push(branchBusiness[el])
             })
     
        
                //结束
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch((err) => {
                console.log(err)
loading.close()

              })
      },
      handleClick(){

      }
 
    },
    created(){
      this.getDate()
    
    },
    mounted(){

    }
  }
</script>

<style lang="scss">
.mainechars{
  padding:  0 1%;
  
  h3{
    text-align: center;
    margin: 20px;
  }
  h2{
    height: 20px;
  }
  .el-form-item{
    margin-bottom: 6px;
  }
   .bor{
     border: solid 4px #f0f2f5;
     padding-top: 20px;
     h3{
         height: 16px;
     }
  }
}
</style>