<template>
<div class="common-list-page caseDetail2"> 
   <div class="padcontent">
                     <div style="background:#fff;">
                        <div class="title"><h3>用户基本信息</h3></div>
                        <div class="line"></div>
                              <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;"  >
                                      <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="姓名: " >
                                        <span>{{customerbaseinfo.withdramalName}}</span>
                                        </el-form-item>
                                    </el-col>
        
                                    <el-col :span="8" >
                                        <el-form-item label="手机: " class="marlft20">
                                        <span>{{customerbaseinfo.withdramalUserPhone}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>
                                      <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="银行卡号: " >
                                        <span>{{customerbaseinfo.withdramalCardno}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="身份证号码: " class="marlft20">
                                        <span>{{customerbaseinfo.idNo}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>

                            </el-form>
                        
                    </div>

                      <div style="background:#fff;">
                        <div class="title"><h3>历史佣金记录</h3></div>
                        <div class="line"></div>
                            <page-template :toolTitle="true" >
                                <data-list                              
                                :count-undo="total"
                                ref="dataList"
                                @data-refresh="getData"
                                :filters="filters"
                                :total="total"
                                :toolFilterReceive="true">
                                     <el-table
                                        :data="dataList"
                                        highlight-current-row
                                        >
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                                    min-width="80"
                                    />
                                    <el-table-column
                                    prop="generalizeNumber"
                                    label="业务编号"
                                    align="center"
                                    />
                                    <el-table-column
                                    prop="createTime"
                                    label="业务办理时间"
                                    align="center"
                                    />
                             
                                    
                                    <el-table-column
                                    prop="generalizeCalculateName"
                                    label="事件"
                                    align="center"
                            
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="generalizeAmount"
                                    label="佣金金额"
                                    align="center"
                                    >
                                    </el-table-column>
                                </el-table>
                  </data-list>
                            </page-template>
            
                    </div>

                    
   </div>

</div>
</template>
<script>
/* eslint-disable */
import '@/less/data-list.less'
  import api from '@/api-authority'
  import PageTemplate from '@/components/page-template'
  import DataList from '@/components/data-list/data-list'
  import {subtext} from '@/utils/st.js'


export default {
  data () {
    return {
        subtext:subtext,
        id:this.$route.params.id,
        customerbaseinfo:{},
        marketingrecord:[],
        total:0,
        filters:[
             {
            label: '开始日期 : ',
            type: 'date',
            field: 'startTime',
          }, 
          {
            label: '结束日期 : ',
            type: 'date',
            field: 'endTime',
          }, 
        ],
        dataList:[]
        
    }
  },
      components: {
      'data-list': DataList,
      PageTemplate
    },
  props: {

    creditif:{
        type:Boolean,
        default (){
            return false
        }
    },
    
    

  },
  computed: {
  },
  methods: {
    getData (params) {
        params.userId=this.customerbaseinfo.withdramalUserid
        api.searchCommissionRecord(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message.list
            this.total=res.data.message.total
          
          } else {
            this.$message.error('请求失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    recordDetail(){
           this.customerbaseinfo=JSON.parse(this.$route.params.id)

    }
    
      
  },
  created(){
      this.recordDetail()
 
  }
}
</script>

<style scoped lang="less" >
.clear{clear:both; height: 0; line-height: 0; font-size: 0}
.common-list-page.caseDetail2 {
  padding: 0 0px 62px;
}
.padcontent{
    margin: 0 1%;
  
    padding: 10px 0;
    
    .el-form-item{
            margin-bottom:0;
    }
    .el-table th, .el-table td{
        padding: 4px 0;
    }
    .marketingRecord{
        height:400px;
        overflow-y: scroll;
    }
    .el-form-item__label{
        font-weight: bold;
        color: #0F131A;
    }
}
/*详情内容*/
.common-list-page.caseDetail2 .title{
  padding:20px 0 10px 32px;
}
.common-list-page.caseDetail2 .title h3{
font-size: 12px;
font-weight:bold;
color: #0F131A;
letter-spacing: 0;
line-height: 16px;
}
.common-list-page.caseDetail2 .line {
  width: 100%;

  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
</style>