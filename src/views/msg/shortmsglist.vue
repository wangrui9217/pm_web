<template>
  <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" pageTitle="短信模板管理">
        <data-list

          :count-undo="total"
          ref="dataList"
          @data-refresh="getData"
          :filters="filters"
          :total="total"
          :toolFilterReceive="true"
          :addmsg="true"
        @getaddmsg='addnewmsg'

          >
          <div style="width: 100%;padding:0 24px;background:#fff">
                 <el-table
                :data="dataList"
                highlight-current-row
                >

       
            <el-table-column
              prop="templateNo"
              label="模板编号"
              align="center"
            />
              <el-table-column
              prop="name"
              label="模板名称"
              align="center"
            />
              <el-table-column
              prop="version"
              label="版本"
              align="center"
            />
            <el-table-column
              prop="type"
              label="模板类型"
              align="center"
              :formatter="msgtype"
            />
                  <el-table-column      
              label="启用状态"
              align="center"
 
            >     
            		<template slot-scope="scope">
								<span :class="[scope.row.state == 'on' ? 'success-color' : 'danger-color']">{{ scope.row.state=="on" ? "启用" : "停用" }}</span>
							</template>
            </el-table-column>
        <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
              min-width="150"
            />
            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="addnewmsg(scope.row)" >编辑</el-button>

                  <!-- <el-button type="text" size="small" @click.native.prevent="getmsg(scope.row)">查看</el-button> -->


                </div>
              </template>
            </el-table-column>
          </el-table>
          </div>
         
        </data-list>
      </page-template>
              <el-dialog
  title="短信模板详情"
  :visible.sync="dialogVisible"
  width="1000px"
  :close-on-click-modal='false'
  :close-on-press-escape='false'
 >
   <el-form ref="financeInfoTable3" :model="user" label-width="140px" style="text-align:left;margin-bottom:20px;background:#fff" >
        
                                 <el-row>
                                        <el-col :span="12">
                                        <el-form-item label="模板类型 : " prop='name' >
                                            <span>{{msgtype(user)}}</span>
                                        </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                        <el-form-item label="模板编号 : " 
                                      
                                         >
                                            <span>{{user.templateNo}}</span>
                                    
                                        
                                        </el-form-item>
                                        </el-col>
                      </el-row>
                               <el-row>
                        <el-col :span="12">
                          <el-form-item label="发送节点 : " prop='name' >
                            <span>{{user.remark}}</span>
                         
                           
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="更新人 : " >
                            <span>{{user.updateUsername}}</span>
                            
                          </el-form-item>
                        </el-col>
                      </el-row>
                               <el-row>
                        <el-col :span="12">
                          <el-form-item label="更新时间 : " prop='name' >
                            <span>{{user.updateTime}}</span>
                          
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="状态 : " >
                            <span>{{msgnode(user)}}</span>

                          </el-form-item>
                        </el-col>
                      </el-row>
                                <el-row>
                        <el-col :span="12">
                          <el-form-item label="内容 : " prop='name' >
                            <span>{{user.content}}</span>
                           
                          
                          </el-form-item>
                        </el-col>
                      </el-row>
                                                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="备注 : " prop='name' >
                            <span>{{user.remark}}</span>
                            
                          
                          </el-form-item>
                        </el-col>
                      </el-row>
   </el-form>
  <span slot="footer" class="dialog-footer">

    <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
  </span>
</el-dialog>

        <el-dialog
  :title="diagmsg"
  :visible.sync="dialogVisible2"
  width="1000px"
  :close-on-click-modal='false'
  :close-on-press-escape='false'
  id="addmb"
 >
   <el-form ref="financeInfoTable2" :model="user2" label-width="140px" style="text-align:left;margin-bottom:20px;background:#fff" :rules="rules">
        
                                 <el-row>
                                        <el-col :span="12">
                                        <el-form-item label="模板类型 : " >
                                            <el-select v-model="user2.type" placeholder="请选择活动区域">
                                                <el-option label="找回密码" value="RETRIEVE_PASSWORD"></el-option>
                                                <el-option label="修改密码" value="UPDATE_PASSWORD"></el-option>
                                                <el-option label="征信申请-辅助授信" value="CREDIT_APPLICATION"></el-option>
                                                <el-option label="用信审批" value="CREDIT_APPROVAL"></el-option>
                                                <el-option label="用信审批失败" value="CREDIT_APPROVAL_FAIL"></el-option>
                                                <el-option label="提额审批" value="INCREASE_APPROVAL"></el-option>
                                                <el-option label="贷后风险审批" value="LWC_AUDIT_APPROVAL"></el-option>
                                                <el-option label="抵质押工单" value="PLEDGE_ORDER"></el-option>
                                                <el-option label="远程面签工单" value="LOAN_FACESIGN_ORDER"></el-option>
                                                <el-option label="贷后维系工单" value="LOAN_MAINTAIN_ORDER"></el-option>
                                                <el-option label="调查工单" value="SURVEY_ORDER"></el-option>
                                                <el-option label="开户工单" value="OPEN_ORDER"></el-option>
                                                <el-option label="常规检查工单" value="LCC_ORDER"></el-option>
                                                <el-option label="贷后突击检查工单" value="LWC_ORDER"></el-option>
                                                <el-option label="营销工单" value="MARKET_ORDER"></el-option>
                                                <el-option label="注册" value="REGISTER"></el-option>
                                                <el-option label="征信审批" value="BCI_AUDIT"></el-option>
                                                <el-option label="企业征信工单" value="C_BCI_ORDER"></el-option>
                                                <el-option label="个人征信工单" value="P_BCI_ORDER"></el-option>
                                                <el-option label="会计用信" value="ACCOUNTANT_APPLICATION"></el-option>

                                                <el-option label="用信签约通知" value="LOAN_SIGN_NOTICE"></el-option>


                                                </el-select>
                                            
                                        </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                        <el-form-item label="模板编号 : " prop="templateNo">
                                             <el-input v-model="user2.templateNo" :disabled="diagmsg=='编辑模板'"></el-input>                                
                                        </el-form-item>
                                        </el-col>
                      </el-row>
                            <el-row>
                                        <el-col :span="12">
                                        <el-form-item label="模板名称 : " prop='name' >
                                                 <el-input v-model="user2.name" ></el-input>                                

                                        </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                        <el-form-item label="模板版本 : " prop="version">
                                             <el-input v-model="user2.version" ></el-input>                                
                                        </el-form-item>
                                        </el-col>
                      </el-row>
                               <el-row>
                  
                        <el-col :span="12">
                          <el-form-item label="状态 : " >
                            <el-select v-model="user2.state" placeholder="请选择活动区域">
                                                <el-option label="启用" value="on"></el-option>
                                                <el-option label="停用" value="off"></el-option>
                                                </el-select>

                          </el-form-item>
                        </el-col>
                      </el-row>
                                <el-row>
                        <el-col :span="24">
                          <el-form-item label="内容 : " prop='content'
                          :rules="[
                            { required: true, message: '请输入内容', trigger: 'blur' },
                            { max: 300, message: '请输入300个以内的字符', trigger: ['blur', 'change']}
                            ]"
                           >
                              <el-input type="textarea" v-model="user2.content" :autosize={minRows:6}></el-input>
                            
                           
                          
                          </el-form-item>
                        </el-col>
                      </el-row>
                                                      <!-- <el-row>
                        <el-col :span="24">
                          <el-form-item label="备注 : " prop='remark'
                          :rules="[
                            { max: 300, message: '请输入300个以内的字符', trigger: ['blur', 'change']}
                            ]"
                           >
                           <el-input type="textarea" v-model="user2.remark" :autosize={minRows:6}></el-input>
                            
                          
                          </el-form-item>
                        </el-col>
                      </el-row> -->
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('financeInfoTable2')">取 消</el-button>
    <el-button type="primary" @click="btnform('financeInfoTable2')">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
  import PageTemplate from '@/components/page-template'
  import DataList from '@/components/data-list/data-list'
  import api from '@/api-authority'
  import moment from "moment"
  import * as types from '@/store/mutation-types'

  export default {
    data () {
     
      return {
            user:{},
            user2:{
                type:'RETRIEVE_PASSWORD',
                state:'off',
                templateNo:'',
                content:'',
                name:'',
                version:'',
            },
        dialogVisible:false,
        dialogVisible2:false,
        dataList: [ ],
        bclick:false,
        total: 0,
        filters: [
          
    {
            label: "模板状态 : ",
            type: "select",
            field: "state",
            options: [
              { label: "全部", value: "" },
              { label: "启用", value: "on" },
              { label: "停用", value: "off" },
            ]
          },
          {
            label: false,
            placeholder: '模板名称',
            type: 'input',
            field: 'templateName'
          },  
        
      ],
        positionPath: [ {name: '短信管理'}, {name: '短信模板管理'}],
        diagmsg:'新增模板',
        rules:{
          templateNo:[
                 { required: true, message: '请输入模板编号', trigger: 'blur' },
                { max: 14, message: '请输入14个以内的字符', trigger: 'blur'}
          ],
          name:[
                 { required: true, message: '请输入模板名称', trigger: 'blur' },
                { max: 15, message: '请输入15个以内的字符', trigger: 'blur'}

          ],
          version:[
                    { required: true, message: '请输入模板版本', trigger: 'blur' },
                { max: 15, message: '请输入15个以内的字符', trigger: 'blur'}
          ]
        }


      }
    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
        btnform(formName){
              this.$refs[formName].validate((valid) => {
                    if (valid) {
                      if(this.bclick){
                        return
                      }
                      this.bclick=true
                            const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

                      api.addtmsg(this.user2).
                            then((res) => {
                              loading.close()
                            if (res.data.code == '0') {
                                    this.dialogVisible2=false;
                                    this.$message.success('操作成功')
                                    this.getData({pageNum:this.$store.state.pagenum,pageSize:10})
                            

                            } else {
                                this.$message.error(res.data.message)
                                this.bclick=false
                            }
                            }).catch((err) => {
                            this.bclick=false
                            })
                    }
                });
        
        },
        resetForm(formName){
            this.$refs[formName].clearValidate();
            this.dialogVisible2=false;
        },
        addnewmsg(data){
          this.bclick=false
            if(!data){
                    this.user2.id='';
                    this.user2.templateNo='';
                    this.user2.content='';
                    this.user2.remark='';
                    this.user2.type='RETRIEVE_PASSWORD';
                    this.user2.state='off'
                    this.user2.version=''
                    this.user2.name=''

                    this.diagmsg='新增模板'

                
            }else{
                  this.user2.id=data.id;
                    this.user2.templateNo=data.templateNo;
                    this.user2.content=data.content;
                    this.user2.remark=data.remark;
                    this.user2.type=data.type;
                    this.user2.state=data.state
                    this.user2.name=data.name
                    this.user2.version=data.version
                    this.diagmsg='编辑模板'

            }
                this.dialogVisible2=true;
        },
    getmsg(data){
        this.dialogVisible=true;
        this.user=data;
    },
   credtinfo(){
       this.$router.push('/repayment-info')
   },
      moment: moment,
      getData (params) {
        api.shortmsglist(params).
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
                 case 'ACCOUNTANT_APPLICATION':
           types='会计用信'           
             break;
                                      

             
         }
         return types
       },
       msgnode(node){
          var types='';
     
         switch (node.state) {
           case 'on':
           types='启用'
             
             break;
         case 'off':
           types='停用'
             
             break;

         }
         return types

       },
       contentfn(content){
        
          if(content.content.length>10){
            return content.content.substring(0,10)+'...'
          }else{
            return content.content
          }
       },
       remarkfn(remark){
              if(remark.remark.length>10){
            return remark.remark.substring(0,10)+'...'
          }else{
            return remark.remark
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
#addmb{
  .el-dialog__body{
padding-right:114px;
  }

}
}
</style>