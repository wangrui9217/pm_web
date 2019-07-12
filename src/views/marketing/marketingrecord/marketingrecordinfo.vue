<template>
<div class="common-list-page caseDetail2"> 
   <div class="padcontent">
                     <div style="background:#fff;">
                        <div class="title"><h3>基本信息</h3></div>
                        <div class="line"></div>
                              <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;"  >
                                    <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="营销人员工号: " >
                                        <span>{{customerbaseinfo.marketUserName}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" >
                                        <el-form-item label="营销人员姓名: " class="marlft20">
                                        <span>{{customerbaseinfo.marketUserRealname}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" >
                                        <el-form-item label="营销时间: " class="marlft20">
                                        <span>{{customerbaseinfo.marketTime}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" >
                                        <el-form-item label="提交时间: " class="marlft20">
                                        <span>{{customerbaseinfo.submitTime}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                     </el-row>   
                                  <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="企业实际经营地址: " >
                                        <span>{{customerbaseinfo.businessAddress}}</span>
                                        </el-form-item>
                                    </el-col>                 
                                    </el-row>  

                            </el-form>
                        
                    </div>

                      <div style="background:#fff;">
                        <div class="title"><h3>接洽人信息</h3></div>
                        <div class="line"></div>
                      
                              <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;"  >
                        
                                  
                                           <el-row v-for="(item,index) in marketingrecord" :key="index">
                                    <el-col :span="6">
                                        <el-form-item label="接洽人姓名: " >
                                        <span>{{item.connectName}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" >
                                        <el-form-item label="职位: " class="marlft20">
                                        <span>{{item.connectDuty}}</span>
                                
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" >
                                        <el-form-item label="联系方式: " class="marlft20">
                                        <span>{{item.connectWay}}</span>
                                
                                 </el-form-item>
                                    </el-col>
                                    </el-row>  

                            </el-form>
            
                    </div>

                       <div style="background:#fff;">
                        <div class="title"><h3>营销结果总结意见</h3></div>
                        <div class="line"> </div>
                        <el-input type="textarea" v-model="customerbaseinfo.marketResult" :readonly="true"></el-input>
                    </div>
                    
   </div>

</div>
</template>
<script>
/* eslint-disable */
import '@/less/data-list.less'
  import api from '@/api-authority'

  import {subtext} from '@/utils/st.js'


export default {
  data () {
    return {
        subtext:subtext,
        id:this.$route.query.id,
        customerbaseinfo:{},
        marketingrecord:[],
        aa:''
        
    }
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
    recordDetail(){
         api.recordDetail({id:this.id}).
              then((res) => {
                  console.log(res)
                if (res.data.code == '0') {
                    this.customerbaseinfo=res.data.message.record
                    this.marketingrecord=res.data.message.connect
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch((err) => {
                console.log(err)
              })
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