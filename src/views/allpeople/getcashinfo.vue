<template>
<div class="common-list-page caseDetail2"> 
   <div class="padcontent">
                     <div style="background:#fff;">
                        <div class="title"><h3>用户基本信息</h3></div>
                        <div class="line"></div>
                              <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;"  >
                                    <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="客户姓名: " >
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
                        <div class="title"><h3>历史提现记录</h3></div>
                        <div class="line"></div>
                            <page-template :toolTitle="true" >
                                <data-list                              
                                :count-undo="total"
                    
                                ref="dataList"
                                @data-refresh="getData"
                                :total="total"

                                :toolFilterReceive="true">
                                     <el-table
                                        :data="dataList"
                                        highlight-current-row
                                        >
                                
                                    <el-table-column
                                    prop="applyNumber"
                                    label="申请编号"
                                    align="center"
                                    />
                                    <el-table-column
                                    prop="withdramalCardno"
                                    label="银行卡号"
                                    align="center"
                                    />
                                    <el-table-column

                                    label="提现金额"
                                    align="center"
                                    prop="withdramalAmount"
                         
                                    />
                                    
                                    <el-table-column
                                    prop="withdramalTime"
                                    label="提现日期"
                                    align="center"
                            
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="createTime"
                                    label="申请日期"
                                    align="center"
                                    >
                                    </el-table-column>
                                </el-table>
                  </data-list>
                            </page-template>

            
                    </div>
                     <div id="approval-container" >
                        <div class="approval-wrapper">
                        <span @click="openApproval">同意提现</span>
                        </div>
                         </div>
                                  <!-- 弹窗 -->
      <el-dialog title="佣金提现确认" :visible.sync="showAddDialog" :close-on-click-modal="false"  width='700px'>
          <el-form :model="customerbaseinfo" label-width="120px" label-position="right" ref="addform" >
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="可提现额度: " >
                                <span>{{customerbaseinfo.totalWithdramalAmount}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" >
                                <el-form-item label="本次提现额度: " class="marlft20">
                                <span>{{customerbaseinfo.withdramalAmount}}</span>
                        
                                </el-form-item>
                            </el-col>
                            </el-row>
                                       <el-row>
                            <el-col :span="20">
                                      <el-form-item label="备注：" prop="remark" >
                                    <el-input v-model="customerbaseinfo.remark" type="textarea" :rows="6" maxlength="200" >
                                    
                                    </el-input>
                                </el-form-item>
                            </el-col>
                          
                            </el-row>
                    
         
          </el-form>
      
          <div slot="footer" class="dialog-footer">
              <el-button @click="showAddDialog=false">取 消</el-button>
              <el-button type="primary" @click="submitAddForm('addform')" :disabled="bclick">确认</el-button>
          </div>
        </el-dialog>

                    
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
        customerbaseinfo:{
          remark:''
        },
        marketingrecord:[],
        total:0,
        dataList:[],
        showAddDialog:false,
        bclick:false

        
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
        api.searchCashWithdrawalList(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message.list
            this.total=res.data.message.total
          
          } else {
            this.$message.error(res.data.message)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    recordDetail(){
       this.customerbaseinfo=JSON.parse(this.$route.params.id)

    },
    openApproval(){
            this.showAddDialog=true
            this.customerbaseinfo.remark=''
            this.bclick=false

    },
    submitAddForm(){
         if(this.bclick){
                 return   
                }
                this.bclick=true
             api.confirmWithdrawal({id:this.customerbaseinfo.id,remark:this.customerbaseinfo.remark}).
        then((res) => {
               
          if (res.data.code == '0') {
    
              this.showAddDialog=false
              this.$message.success('操作成功')
              
          } else {
            this.$message.error(res.data.message)
            this.bclick=false
          }
        }).catch((err) => {
            this.bclick=false
          
        })
    }
    
      
  },
  created(){
      this.recordDetail()
     console.log(this.$route.params.id)
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
#approval-container {
  height: 62px;
  line-height: 62px;
  position: fixed;
  bottom: 0;
  left: 210px;
  right: 46px;

  .approval-wrapper {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    box-shadow: rgba(102, 102, 102, 0.35) 0px -5px 5px;

    span {
      float: right;
      background: #43addc;
      text-align: center;
      width: 126px;
      font-size: 16px;
      line-height: 62px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>