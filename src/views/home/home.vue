<template>

   <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" >
    
      </page-template>
      
      <!-- <div class="homecontent">
           <div class="toptmain">
               <div class="ltcontent left">
                    <h3>待办业务汇总</h3>
                    <div class="borline">
                      <ul>
                        <li>
                          <span class="left"></span>
                          <div class="left">
                              <em>初审待审批总数</em>
                              <div>
                                <i>{{csdata}}</i>笔
                              </div>
                              
                          </div>
                        </li>
                           <li>
                          <span class="left"></span>
                          <div class="left">
                              <em>终审待审批订单总数</em>
                              <div>
                                <i>{{zsdata}}</i>笔
                              </div>
                              
                          </div>
                        </li>
                           <li>
                          <span class="left"></span>
                          <div class="left">
                              <em>财务待审核汇总</em>
                              <div>
                                <i>{{shdata}}</i>笔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>{{shprice}}</i>元
                              </div>
                              
                          </div>
                        </li>
                      </ul>
                    </div>
               </div>
               <div class="left calcechart">
                 
                     <div class="overflow">
                        <h3 class="left">授信订单汇总</h3>
                        <el-date-picker class="right martr"
                        @change="repricedatefn"
                          v-model="repricedate"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          :editable="false"
                          :clearable="false"
                          end-placeholder="结束日期">
                        
                        </el-date-picker>
                     </div>
              
                      <div class="borline">
                        <div id="main2" style="width: 90%;height:349px;">

                    </div>
                </div>
              
               </div>
           </div>
            <div class="bottomain overflow">
           
                   <div class="left bottomleft">
                 
                     <div class="overflow">
                        <h3 class="left">放款统计</h3>
                        <el-date-picker class="right martr"
                        @change="repricedatefn2"
                          v-model="repricedate2"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          :editable="false"
                          :clearable="false"
                          end-placeholder="结束日期">
                        </el-date-picker>
                     </div>
              
                      <div class="borline">
                        <div id="main3" style="width: 90%;height:349px;">

                        </div>
                      </div>            
                    </div>
                    <div class="right bottomright">
                 
                     <div class="overflow">
                        <h3 class="left">贷后还款汇总</h3>
                        <el-date-picker class="right martr"
                        @change="repricedatefn3"
                          v-model="repricedate3"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          :editable="false"
                          :clearable="false"
                          end-placeholder="结束日期">
                        </el-date-picker>
                     </div>
              
                      <div class="borline">
                        <div id="main4" style="width: 90%;height:349px;">

                          </div>
                      </div>
              
                     </div> -->
              
           </div>
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
        positionPath: [{name: '首页'}],
        csdata:0,
        zsdata:0,
        shdata:0,
        shprice:0,
        repricedate:[moment(Date.now()-86400*6000).format('YYYY-MM-DD'),moment(Date.now()).format('YYYY-MM-DD')],
        repricedate2:[moment(Date.now()-86400*6000).format('YYYY-MM-DD'),moment(Date.now()).format('YYYY-MM-DD')],
        repricedate3:[moment(Date.now()-86400*6000).format('YYYY-MM-DD'),moment(Date.now()).format('YYYY-MM-DD')],

        moment:moment
     

      }
    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
      echartinit(){
              var myChart = echarts.init(document.getElementById("main2"));
              var myChart2 = echarts.init(document.getElementById("main3"));
              var myChart3 = echarts.init(document.getElementById("main4"));


               myChart.setOption({
                grid:{
                    left:'left'
                },
              color:['#FE5A57','#55A8FD','#28D582'],
              title: {
                text: ""
              },
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["申请授信", "通过", "拒绝"],
                x: "right"
              },
               grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                show: false
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                 data: []
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "申请授信",
                  type: "line",
      
                  data:  [],
                   smooth: true
                },
                {
                  name: "通过",
                  type: "line",
         
                  data: [],
                   smooth: true
                },
                {
                  name: "拒绝",
                  type: "line",
               
                  data: [],
                   smooth: true
                }
              ]
            });

               myChart2.setOption({
                grid:{
                    left:'left'
                },
              color:['#FE5A57','#55A8FD','#28D582'],
              title: {
                text: ""
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: 'shadow'
                }
                        
              },
              legend: {
                data: ["用款申请总额额度", "放款成功总额度", "服务费额度"],
                x: "right"
              },
               grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                show: false
              },
              xAxis: {
                type: "category",
         
                 data: []
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "用款申请总额额度",
            
                  type:'bar',
                  data:  [],
                   smooth: true
                },
                {
                  name: "放款成功总额度",
           
                  type:'bar',

                  data: [],
                   smooth: true
                },
                {
                  name: "服务费额度",
      
                  type:'bar',

                  data: [],
                   smooth: true
                }
              ]
            });

              myChart3.setOption({
                            title : {
                      text: '',
                      x:'center'
                  },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      left: 'right',
                      data: ['未还款总金额','逾期总金额','已还总金额']
                  },
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',
                          radius : '55%',
                          center: ['50%', '60%'],
                          data:[
                              {value:0, name:'未还款总金额'},
                              {value:0, name:'逾期总金额'},
                              {value:0, name:'已还总金额'}
                          ],
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
            });

      },
      getechart(data){
              var myChart = echarts.init(document.getElementById("main2"));
              api.sumCreditApproval(data).then((res) => {
               var datelist=[],
                    hqsx=[],
                    tg=[],
                    jj=[];
                if(res.data.code==0){
                  var data=res.data.message;
                
                    data.auditOrder.map(el=>{
                      hqsx.push(el.count)
                        datelist.push(el.applyTime)
                    })
            
                  data.accessOrder.map(el=>{
                    tg.push(el.count)
                  })
                  data.rejectOrder.map(el=>{
                    jj.push(el.count)
                  })
                      myChart.setOption({
                grid:{
                    left:'left'
                },
              color:['#FE5A57','#55A8FD','#28D582'],
              title: {
                text: ""
              },
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["申请授信", "通过", "拒绝"],
                x: "right"
              },
               grid: {
                  left: '10%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                show: false
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                 data: datelist
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "申请授信",
                  type: "line",     
                  data:  hqsx,
                   smooth: true
                },
                {
                  name: "通过",
                  type: "line",         
                  data: tg,
                   smooth: true
                },
                {
                  name: "拒绝",
                  type: "line",              
                  data: jj,
                   smooth: true
                }
              ]
            });
                }else{
                    this.$message.error(res.data.message);
                }  
              }).catch((err) => {
                console.log(err)
              })


      },
      getechart2(data){
               var myChart2 = echarts.init(document.getElementById("main3"));
              api.sumLoanInfo(data).then((res) => {
               var datelist=[],
                    serviceAmount=[],
                    successAmount=[],
                    totalAmount=[];
                if(res.data.code==0){
                  var data=res.data.message;
                
                    data.serviceAmount.map(el=>{
                      serviceAmount.push(el.amount)
                        datelist.push(el.applicationTime)
                    })
            
                  data.successAmount.map(el=>{
                    successAmount.push(el.amount)
                  })
                  data.totalAmount.map(el=>{
                    totalAmount.push(el.amount)
                  })
                      myChart2.setOption({
               grid: {
                  left: '6%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              color:['#FE5A57','#55A8FD','#28D582'],
              title: {
                text: ""
              },
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["用款申请总额额度", "放款成功总额度", "服务费额度"],
                x: "right"
              },
         
              toolbox: {
                show: false
              },
              xAxis: {
               type: "category",
                data: datelist,
                axisPointer: {
                  type: "shadow"
                },
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "用款申请总额额度",
                  type: "bar",   
                  barGap: 0,  
                  data:  totalAmount,
               
                },
                {
                  name: "放款成功总额度",
                  type: "bar",         
                  data: successAmount,
            
                },
                {
                  name: "服务费额度",
                  type: "bar",              
                  data: serviceAmount,
           
                }
              ]
            });
                }else{
                    this.$message.error(res.data.message);
                }  
              }).catch((err) => {
                console.log(err)
              })
      },
      getechart3(data){
               var myChart3= echarts.init(document.getElementById("main4"));

               api.sumAfterLoanInfo(data).then((res) => { 
                    if(res.data.code=='0'){
                          var type1='',
                              type2='',
                              type3='';  
                          res.data.message.map(el=>{
                              switch (el.type) {
                                case '1':
                                  type1=el.amount||0
                                  break;
                                case '2':
                                  type2=el.amount||0
                                  break;
                                case '3':
                                  type3=el.amount||0
                                  break;
                              
                              
                              }

                          })
                            myChart3.setOption({
                                    title : {
                                    text: '',
                                    x:'center'
                                },
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'right',
                                    data: ['未还款总金额','逾期总金额','已还总金额']
                                },
                                series : [
                                    {
                                        name: '访问来源',
                                        type: 'pie',
                                        radius : '55%',
                                        center: ['50%', '60%'],
                                        data:[
                                            {value:type2, name:'未还款总金额'},
                                            {value:type3, name:'逾期总金额'},
                                            {value:type1, name:'已还总金额'}
                                        ],
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                          });
                    }else{
                    this.$message.error(res.data.message);

                    }


                 }).catch((err) => {
                console.log(err)
              })
           
      },
      repricedatefn(data){
      
          this.getechart({startTime:this.moment(data[0]).format('YYYY-MM-DD'),endTime:this.moment(data[1]).format('YYYY-MM-DD')})
      },
      repricedatefn2(data){
          this.getechart2({startTime:this.moment(data[0]).format('YYYY-MM-DD'),endTime:this.moment(data[1]).format('YYYY-MM-DD')})

      },
        repricedatefn3(data){
          this.getechart3({startTime:this.moment(data[0]).format('YYYY-MM-DD'),endTime:this.moment(data[1]).format('YYYY-MM-DD')})

      },
      getApprovalCount(){
           api.getApprovalCount().then((res) => {
            
                if(res.data.code==0){
                          var data=res.data.message;
                   
                    data.list.map(el=>{
                      if(el.node==2){
                            this.csdata=el.count
                      }else if(el.node==3){
                            this.zsdata=el.count
                      }
                
                    })
                      if(data.auditEntity.auditCount){
                          this.shdata=data.auditEntity.auditCount;
                          this.shprice=data.auditEntity.auditAmount
                      }
                }else{
                    this.$message.error(res.data.message);
                }  
              }).catch((err) => {
                console.log(err)
              })
      }
    },
    mounted(){
       this.echartinit();
      // this.getechart({startTime:this.moment(Date.now()-86400*6000).format('YYYY-MM-DD'),endTime:this.moment(Date.now()).format('YYYY-MM-DD')});
      // this.getApprovalCount();
      // this.getechart2({startTime:this.moment(Date.now()-86400*6000).format('YYYY-MM-DD'),endTime:this.moment(Date.now()).format('YYYY-MM-DD')});
      // this.getechart3({startTime:this.moment(Date.now()-86400*6000).format('YYYY-MM-DD'),endTime:this.moment(Date.now()).format('YYYY-MM-DD')});
    }
}

</script>

<style lang="scss">
.homecontent{
    background-color:#f2f0f5;
   padding: 14px;
   .el-date-editor {
     span{
       width: 20px;
     }
   }
   .toptmain{
     overflow: hidden;
   }
   .ltcontent{
     height: 404px;
     width: 500px;
     background: #fff;
     &>div{
        padding: 32px 24px 10px 24px;
     }
      li {
       margin-bottom: 24px;
       overflow: hidden;

        span{
          width: 88px;
          height: 78px;
          border-radius: 4px 0px 0px 4px;
        }
        &>div{
          width: 362px;
          height:78px ;
         background: #FAFAFA;
          border-radius:0 4px 4px 0;
          padding: 10px 0 0 24px;
          em{
              font-family: PingFang-SC-Regular;
              font-size: 14px;
              color: #8C8C8C;
              line-height: 22px;
             
            }
            div{
              i{
                font-family: PingFang-SC-Semibold;
                font-size: 24px;
                color: #262626;
                line-height: 32px;
             
              }
              font-family: PingFang-SC-Regular;
              font-size: 14px;
              color: #262626;
              line-height: 22px;
                 margin-top: 6px;
            
            }
        }
      }
      li:nth-child(1){
          span{
              background:#1890FF url('../../assets/img/cs.png') center no-repeat;
          }
     }
      li:nth-child(2){
          span{
              background:#4DCB73 url('../../assets/img/zs.png') center no-repeat;
          }
     }
      li:nth-child(3){
          span{
              background:#F2637B url('../../assets/img/cwsp.png') center no-repeat;
          }
     }
   }
   h3{
     font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    line-height: 24px;
    height: 55px;
    padding: 16px 0 0 24px;
   }
   .borline{
    border-top: 1px solid  #E8E8E8;

   }
  .calcechart{
    width: calc(100% - 514px);
    background: #fff;
    margin-left: 14px;
  }
  .martr{
    margin: 7px 30px 0 0;
    width: 390px;
  }
  .bottomain{
    
    margin-top: 14px;
    .bottomright{
      width: 560px;
      margin-left: 14px;
      background:#fff;
    }
    .bottomleft{
    width: calc(100% - 574px);
    background:#fff;
  
    }


  }
}

</style>