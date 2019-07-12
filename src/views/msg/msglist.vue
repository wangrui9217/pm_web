<template>
  <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" pageTitle="短信列表">
        <data-list
  
          :count-undo="total"
          ref="dataList"
          @data-refresh="getData"
          :filters="filters"
          :total="total"
          :toolFilterReceive="true"
          >
          <div style="width: 100%;padding:0 24px;background:#fff">
                 <el-table
                :data="dataList"
                highlight-current-row
                >
     
            <el-table-column
              prop="sendTime"
              label="发送时间"
              align="center"
              width="140"
            />
            <el-table-column
              prop="type"
              label="短信类型"
              align="center"
              :formatter="msgtype"
            />
             <el-table-column
              prop="node"
              label="发送节点"
              align="center"
              min-width="120"
   
            />
            
            <el-table-column
              prop="channelCode"
              label="发送通道"
              align="center"
              min-width="150"
            >
            </el-table-column>
              <el-table-column
              prop="mobile"
              label="手机号码"
              align="center"
            />
              <el-table-column
              prop="templateNo"
              label="所属模板"
              align="center"
            />
              <el-table-column
              prop="content"
              label="短信内容"
              align="center"
              :formatter="contentfn"
              width="150"

            />
              <el-table-column
              prop="sendStatus"
              label="发送状态"
              align="center"
              :formatter="el=>msgnode(el.sendStatus)"
              
            />

            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="getmsg(scope.row)">查看</el-button>

                </div>
              </template>
            </el-table-column>
          </el-table>
          </div>
         
        </data-list>
      </page-template>
        <el-dialog
  title="短信详情"
  :visible.sync="dialogVisible"
  width="1000px"
  :close-on-click-modal='false'
  :close-on-press-escape='false'
 >
   <el-form ref="financeInfoTable" :model="user" label-width="140px" style="text-align:left;margin-bottom:20px;background:#fff" >
      
                                 <el-row>
                        <el-col :span="12">
                          <el-form-item label="短信类型 : " prop='name' >
                            <span>{{msgtype(user)}}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="发送通道 : " >
                            <span>{{user.channelCode}}</span>
                      
                        
                          </el-form-item>
                        </el-col>
                      </el-row>
                               <el-row>
                        <el-col :span="12">
                          <el-form-item label="发送节点 : " prop='name' >
                            <span>{{user.node}}</span>
                           
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="所属短信模块 : " >
                            <span>{{user.templateNo}}</span>
                            
                          </el-form-item>
                        </el-col>
                      </el-row>
                               <el-row>
                        <el-col :span="12">
                          <el-form-item label="手机号码 : " prop='name' >
                            <span>{{user.mobile}}</span>
                          
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="发送状态 : " >
                            <span>{{msgnode(user.sendStatus)}}</span>

                          </el-form-item>
                        </el-col>
                      </el-row>
                                <el-row>
                        <el-col :span="24">
                          <el-form-item label="短信内容 : " prop='name' >
                            <span>{{user.content}}</span>
                           
                          
                          </el-form-item>
                        </el-col>
                      </el-row>
                                                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="发送时间 : " prop='name' >
                            <span>{{user.sendTime}}</span>
                            
                          
                          </el-form-item>
                        </el-col>
                      </el-row>
   </el-form>
  <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
  </span>
</el-dialog>
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
            user:{},
        dialogVisible:false,
        dataList: [ ],
        total: 0,
        filters: [
          {
            label: false,
            placeholder: '手机号码',
            type: 'input',
            field: 'mobile'
          },  
        
      ],
        positionPath: [ {name: '短信管理'}, {name: '短信发送记录'}],


      }
    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
    getmsg(data){
        this.dialogVisible=true;
        this.user=data;
    },
   credtinfo(){
       this.$router.push('/repayment-info')
   },
      moment: moment,
      getData (params) {
        api.shortmsg(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message.list
            this.total = res.data.message.total
          } else {
            this.$message.error('请求失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
       msgtype(type){
         var types='';
     
         switch (type.type) {
           case 'RETRIEVE_PASSWORD':
           types='找回密码'           
             break;
         case 'UPDATE_PASSWORD':
           types='修改密码'           
             break;
              case 'CREDIT_APPLICATION':
           types='征信申请-辅助授信'           
             break;
         case 'CREDIT_APPROVAL':
           types='用信审批'           
             break;
              case 'CREDIT_APPROVAL_FAIL':
           types='用信审批失败'           
             break;
         case 'INCREASE_APPROVAL':
           types='提额审批'           
             break;
              case 'LWC_AUDIT_APPROVAL':
           types='贷后风险审批'           
             break;
         case 'PLEDGE_ORDER':
           types='抵质押工单'           
             break;
              case 'LOAN_FACESIGN_ORDER':
           types='远程面签工单'           
             break;
         case 'LOAN_MAINTAIN_ORDER':
           types='贷后维系工单'           
             break;
              case 'SURVEY_ORDER':
           types='调查工单'           
             break;
         case 'OPEN_ORDER':
           types='开户工单'           
             break;
              case 'LCC_ORDER':
           types='常规检查工单'           
             break;
         case 'LWC_ORDER':
           types='贷后突击检查工单'           
             break;
              case 'MARKET_ORDER':
           types='营销工单'           
             break;
         case 'REGISTER':
           types='注册'           
             break;
                   case 'BCI_AUDIT':
           types='征信审批'           
             break;
             case 'C_BCI_ORDER':
           types='企业征信工单'           
             break;
             case 'P_BCI_ORDER':
           types='个人征信工单'           
             break;
             case 'LOAN_SIGN_NOTICE':
           types='用信签约通知'           
             break;
         }
         return types
       },
       msgnode(node){
          var types='';
     console.log(node,2222)
         switch (node) {
           case 'SUCCESS':
           types='发送成功'
             
             break;
         case 'FAIL':
           types='发送失败'
             
             break;
          case 'SENDING':
           types='发送中'
             
             break;

         }
         return types

       },
       contentfn(content){
        if(content.content){           
          if(content.content.length>10){
            return content.content.substring(0,10)+'...'
          }else{
            return content.content
          }

        }
          
       
       }
    }
  }
</script>

<style lang="scss">
.common-list-page.basedCost{
  padding:0;
  .el-table {
    .cell{
    font-size: 14px;
    color: rgba(0,0,0,0.85);
    letter-spacing: 0;
    line-height: 22px;
    .of-hidden.actList .el-button--small{
        font-size: 14px;
        color: #1890FF;
        line-height: 22px;
      }
    }
   
  }
  .el-table--enable-row-transition .el-table__body td{
     font-size: 14px;
     letter-spacing: 0;
    line-height: 14px;
    padding-top:10px;
    padding-bottom:9px;
    border-right:none;
  }
  .el-table__body tr.current-row > td ,.el-table__body tr:hover > td {
    background-color: #E6F7FF;
  }

}
</style>