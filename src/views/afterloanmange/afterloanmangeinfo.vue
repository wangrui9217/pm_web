<template>
  <page-template :position-path="positionPath" :toolTitle="true"  :showReturn="true">
<div class="common-list-page caseDetail2"> 
   <div class="padcontent">
                     <div style="background:#fff;">
                        <div class="title"><h3>合同信息</h3></div>
                        <div class="line"></div>
                              <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;"  >
                                      <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="业务编号: " >
                                        <span>{{customerbaseinfo.loanNo}}</span>
                                        </el-form-item>
                                    </el-col>
        
                                    <el-col :span="8" >
                                        <el-form-item label="放款金额(元): " class="marlft20">
                                        <span>{{customerbaseinfo.loanAmount}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                        <el-col :span="8" >
                                        <el-form-item label="期限: " class="marlft20">
                                        <span>{{(customerbaseinfo.loanTrem)+(customerbaseinfo.loanTremType=='MON'?'个月':'年')}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>
                                      <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="申请产品: " >
                                        <span>{{customerbaseinfo.name}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="申请时间: " class="marlft20">
                                        <span>{{customerbaseinfo.applyTime}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>
                                         <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="服务费类型: " >
                                        <span>{{customerbaseinfo.serviceType==1?'固定数字':customerbaseinfo.serviceType==2?'年化利率':'单次比率'}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="服务费(元): " class="marlft20">
                                        <span>{{customerbaseinfo.serviceValue}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                        <el-col :span="8" >
                                        <el-form-item label="收取方式: " class="marlft20">
                                        <span>{{customerbaseinfo.serviceMode}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>

     <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="利息类型: " >
                                        <span>{{customerbaseinfo.interestType==1?'固定数字':customerbaseinfo.interestType==2?'年化利率':'单次比率'}}</span>
                                       
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="利率(年化): " class="marlft20">
                                        <span>{{customerbaseinfo.interestValue+'%'}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                        <el-col :span="8" >
                                        <el-form-item label="收取方式: " class="marlft20">
                                        <span>{{customerbaseinfo.interestMode}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>
                                          <div class="title"><h3>借款人信息</h3></div>
                        <div class="line"></div>

     <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="姓名: " >
                                        <span>{{customerbaseinfo.legalName}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="身份证: " class="marlft20">
                                        <span>{{customerbaseinfo.legalIdno}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                        <el-col :span="8" >
                                        <el-form-item label="手机: " class="marlft20">
                                        <span>{{customerbaseinfo.legalPhone}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>
                                                                           <div class="title"><h3>放款账户信息</h3></div>
                        <div class="line"></div>

     <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="户名: " >
                                        <span>{{customerbaseinfo.loamAccountUsername}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8" >
                                        <el-form-item label="企业开户行: " class="marlft20">
                                        <span>{{customerbaseinfo.loamAccountBank || '泗阳农商行'}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                        <el-col :span="8" >
                                        <el-form-item label="账户: " class="marlft20">
                                        <span>{{customerbaseinfo.loamAccountNum}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    </el-row>

     <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="放款日期: " >
                                        <span>{{customerbaseinfo.loanTime}}</span>
                                        </el-form-item>
                                    </el-col>
                           
                                    </el-row>


                            </el-form>
                        
                    </div>
                    
   </div>

</div>
  </page-template>
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
      positionPath: [{ name: '贷后管理' }, { name: '详细信息' }],
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
    getData () {
        api.loandetail({id:this.$route.params.id}).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.customerbaseinfo=res.data.message

          
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
    //  this.recordDetail()
    this.getData()
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
