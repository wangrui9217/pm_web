<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <loan-info :data="loanInformation"></loan-info>
            </div>
          </section>
        </div>
      </section>
      <el-tabs type="border-card">
        <el-tab-pane label="借款信息">
          <div class="detail-item">
            <div class="title"><h3>客户基本信息</h3>
            </div>
            <el-row class="style-key-value flex-wrap" :gutter="10">
              <el-col :span="12"><span>客户名称:</span>{{detailInfo.legalName}}</el-col>
              <el-col :span="12"><span>身份证:</span>{{detailInfo.legalNo}}</el-col>
              <el-col :span="12"><span>手机:</span>{{detailInfo.legalPhone}}</el-col>
              <el-col :span="12"><span>婚姻状况:</span>{{detailInfo.ismarry==1?'已婚':(detailInfo.ismarry==2?'未婚':'')}}</el-col>
              <el-col :span="12"><span>企业注册地址：</span>{{detailInfo.regAddr}}</el-col>
            </el-row>
            <div class="title"><h3>相关业务合同凭证</h3>
            </div>
            <div v-for="(item,index) in files" :key="index" class="img-wrap">
              <p style="margin-top: 10px;"><b>{{item.fileName}}：</b></p>
              <el-row :gutter="10">
                <el-col :span="6" v-if="item.fileCategory != 'liveness_image'">
                  <img :src="item.url" alt="" preview="0" :preview-text="item.fileName">
                </el-col>
                <el-col :span="6" v-else>
                  <video> :src="item.url" controls></video>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批历史">
          <!-- 概览 -->
          <div class="detail-item">
            <div class="title"><h3>审批历史</h3></div>
            <el-table ref="multipleTable" :data="recordsArr">
              <el-table-column prop="loanAuditNumber" label="编号" align="center">
              </el-table-column>
              <el-table-column label="审批人" prop="auditUserName" align="center">
              </el-table-column>
              <el-table-column prop="auditTime" label="审批时间" align="center" />
              <el-table-column label="审批结果" align="center" prop="result">
              </el-table-column>
              <el-table-column label="授信产品" align="center" prop="productName">
              </el-table-column>
              <el-table-column label="授信金额(元)" align="center" prop="creditAmount">
              </el-table-column>
              <el-table-column label="授信有效期" align="center" prop="creditValidTime" :formatter="el=>el.creditValidTime&&el.creditValidTime.split(' ')[0]">
              </el-table-column>
              <el-table-column label="拒绝原因" align="center" prop="rejectMsg">
              </el-table-column>
              <el-table-column label="备注" align="center" prop="auditMsg">
              </el-table-column>
            </el-table>
          </div>

        </el-tab-pane>
        <!-- <el-tab-pane label="合同信息">
          <el-row :gutter="10">
            <el-col :span="6"><img :src="loanContract.filePath" alt=""></el-col>
          </el-row>
          
        </el-tab-pane> -->
      </el-tabs>
      <div id="approval-container" v-if="readonly">
        <div class="approval-wrapper">
          <span @click="openApproval">批复</span>
        </div>
      </div>
      <el-dialog title="审批结果" :visible.sync="showApprovalDialog" width="800px" :close-on-click-modal="false" v-loading.fullscreen="loading">
        <el-form :model="approvalForm" class="approval-form" label-width="120px" ref="approval-form" label-position="left" size="small">
          <el-form-item label="签字结果：" prop="result" required>
            <el-radio-group v-model="approvalForm.result" @change="handleResultChange">
              <el-radio label="1">合同签署正常</el-radio>
              <el-radio label="-1">合同签署异常</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="approvalForm.result==1">
            <h3>合同信息</h3>
            <el-row>
              <el-col :span="12">
                <p><span>合同金额（大写）：</span>{{detailInfo.loanAmount}}</p>
              </el-col>
              <el-col :span="12">
                <p><span>期限：</span>{{detailInfo.loanTerm}}</p>
              </el-col>
            </el-row>
            <h3>签署信息结果</h3>
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="签字备注：" prop="auditMsg" :rules="rules.auditMsg">
                  <el-input v-model="approvalForm.auditMsg" type="textarea" :rows="3" placeholder="合同已经打印，占股比例超过25%的股东全员到场签字。法人到场签字。合同生效">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-form-item label="异常原因：" prop="rejectMsg" :rules="rules.rejectMsg">
              <el-row>
                <el-col :span="6">
                  <el-select v-model="approvalForm.rejectMsg" placeholder="请选择">
                    <el-option v-for="item in rejectMsgArr" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" :rules="rules.remark">
              <el-input v-model="approvalForm.remark" type="textarea" :maxLength="2000" :rows="5" placeholder="需要签字的股东没有到齐，需要进行远程面签。">
              </el-input>
            </el-form-item>
            <el-form-item label="未到场股东：">
              <el-checkbox-group v-model="checklist" >
                <el-checkbox v-for="item in roleList" :label="item.id" :key="item.id" :disabled="item.canFaceSign === false">{{item.roleUserName}}</el-checkbox>
              </el-checkbox-group>
              <el-button type="primary" @click="initiateFaceSignOrder()" :disabled="checklist.length == 0">发起远程面签工单</el-button>
            </el-form-item>
            <el-form-item label="抵质押方式：">
             <div><span>抵押/质押</span></div>
             <el-button type="primary" @click="initiatePledgeOrder()" :disabled="canPledgeOrder===false">发起抵质押工单</el-button>
            </el-form-item>
          </template>
        </el-form>
        <div slot="footer" style="text-align: center;">
          <el-button type="primary" @click="submit()" style="margin: 0 50px 0 0;">{{buttonName}}</el-button>
          <el-button @click="showApprovalDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import myPagination from "@/components/views/myPagination";
import api from '@/api-authority'
import Rules from "@/const/formRules";
import Files from "@/const/files";
import loanInfo from "./loanInfo";
export default {
  components: { PageTemplate, myPagination, loanInfo},
  data() {
    return {
      detailInfo: {},
      tabPosition: 'top',
      approvalForm: {
        result: '1',
        auditMsg: '',
        rejectMsg: '',
        remark: ''
      },
      roleList: [],
      roles: '',
      checklist: [],
      files: [],
      loanApplyId: '', // 审批id
      compId: '',
      showApprovalDialog: false,
      rules: Rules,
      loading: false,
      rejectMsgArr: [{ value: '到场面签人员不齐', label: '到场面签人员不齐' },
      { value: '签字人员不是法人', label: '签字人员不是法人' },
      { value: '签字人没有代理人信息', label: '签字人没有代理人信息' }],
      readonly: true,
      status: '审批中',
      positionPath: [{ name: '审批管理' }, { name: '签字岗用信审批详情' }],
      records: {},
      recordsArr: [],
      dataList: [],
      // canFaceSign: true,
      canPledgeOrder: true,
      buttonName: '提 交',
      loanContract: {},
      loanInformation: {},
    }
  },
  filters: {
    
  },
  methods: {
    getLoanApplyInfo(){

      api.getLoanApplyInfo({applyId:this.loanApplyId}).then(res => {
        if(res.data.code == 0 && res.data.message){
          this.loanInformation = res.data.message
        }
      })
    },
    openApproval() {
      this.showApprovalDialog = true
      this.buttonName = "提 交"
      if(this.records && Object.keys(this.records).length == 0){
        this.resetFormData()
        this.$nextTick(() => {
          this.$refs['approval-form'].clearValidate()
        })
      }
    },
    resetFormData() {
      for (let k in this.approvalForm) {
        if (k === 'result') {
          this.approvalForm[k] = '1'
        } else {
          this.approvalForm[k] = ''
        }
      }
    },
    submit() {
      this.$refs['approval-form'].validate(valid => {
        if (valid) {
          let params = Object.assign({
            "auditMsg": "",
            "auditNode": 3,  // 节点
            // "auditUserId": 0,
            // "auditUserName": "",
            // "id": 0,
            "loanApplyId": this.loanApplyId,
            "rejectMsg": "",
            "result": ''
          }, this.approvalForm)
          if (params.result == '-1') {
            params.auditMsg = params.remark
          } else {
            
          }
          this.loading = true
          delete params.remark
          api.submitCreditApproval(params).
          then((res) => {
            this.loading = false
            this.showApprovalDialog = false
            if (res.data.code == 0) {
              this.$message.success('操作成功')
              this.detailInfo.readonly === true
              this.readonly = false
              sessionStorage.setItem('approvalInfo', JSON.stringify(this.detailInfo))
              this.$router.go(-1)
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    getCreditProof(){
      api.getCreditProof({
        "loanApplyId": this.loanApplyId
      }).
      then(res => {
        if (res.data.code == 0) {
          let data = res.data.message
          data.forEach(item => {
            item.fileName = Files[item.fileCategory]
          })
          // let loanContract = data.find(item => {
          //   return item.fileCategory == 'loan_contract'
          // })
          // if(loanContract){
          //   loanContract.filePath = api.getImgURL(window.encodeURIComponent(loanContract.filepath))
          //   this.loanContract = loanContract
          // }
          this.files = data
          this.files.forEach(item => {
            item.url = api.getImgURL(window.encodeURIComponent(item.filepath))
          })
          
        } else {
          
        }
      })
    },
    companyRoleList(){
      api.companyRoleList({
        "compId": this.compId
      }).
      then(res => {
        if (res.data.code == 0) {
          let data = res.data.message
          this.roleList = data
          let arr = this.roleList.map(item => {
            return item.roleUserName
          })
          if(this.roleList.length > 0){
            this.roles =  arr.join(',')
          }
          else{
            this.roles = ''
          }
        } else {
          
        }
        this.getRoleListByApplyId()
      })
    },
    handleResultChange(val) {
      this.approvalForm.auditMsg = ''
      this.approvalForm.rejectMsg = ''
      this.approvalForm.remark = ''
      this.$refs['approval-form'].clearValidate()
      if(val == '1'){
        this.buttonName = "提 交"
      }
      else{
        this.buttonName = "保 存"
      }
    },
    initiateFaceSignOrder(){
      this.loading = true
      api.initiateFaceSignOrder({
        loanApplyId: this.loanApplyId,
        list: this.roleList.filter(item => {
          return this.checklist.indexOf(item.id) > -1
        })
      }).then(res => {
        this.loading = false
        if(res.data.code == 0){
          this.$message.success('操作成功')
          let arr = []
          this.roleList.forEach(item => {
            if(this.checklist.indexOf(item.id) > -1){
              item.canFaceSign = false
            }
            else{
              arr.push(item.roleUserName)
            }
          })
          if(arr.length > 0){
            this.roles = arr.join(',')
          }
          else{
            this.roles = ''
          }
          this.checklist = []
        }
        else{
          this.$message.error(res.data.message)
        }
      })
    },
    initiatePledgeOrder(){
      this.loading = true
      api.initiatePledgeOrder({
        loanIncrCreditAuditId: this.detailInfo.loanIncrCreditAuditId,
        compName: this.detailInfo.compName,
        legalName: this.detailInfo.legalName,
        legalPhone: this.detailInfo.legalPhone,
        compCreditNo: this.detailInfo.compCreditNo,
        registerAddr: this.detailInfo.regAddr
      }).then(res => {
        this.loading = false
        if(res.data.code == 0){
          this.$message.success('操作成功')
          this.canPledgeOrder = false
        }
        else{
          if(res.data.message){
            this.$message.error(res.data.message)
          }
          else this.$message.error('操作失败')
        }
      })
    },
    getApprovalRecord(){
      api.getApprovalRecord({
        loanApplyId: this.loanApplyId,
        auditNode: 3
      }).then(res => {
        if(res.data.code == 0 && res.data.message){
          this.records = res.data.message
          res.data.message.result = res.data.message.result == 1?'通过':'拒绝';
          this.recordsArr = [Object.assign({}, res.data.message)]
          this.approvalForm.rejectMsg = this.records.rejectMsg
          this.approvalForm.result = '' + this.records.result
          if(this.approvalForm.result == '1'){
            this.approvalForm.auditMsg = this.records.auditMsg
          }
          else{
            this.approvalForm.remark = this.records.auditMsg
          }
        }
      })
    },
    getRoleListByApplyId(){
      api.getRoleListByApplyId({
        loanApplyId: this.loanApplyId
      }).then(res => {
        if(res.data.code == 0){
          let checklist = res.data.message.map(item => {
            return item.id
          })
          if(checklist && checklist.length > 0){
            let arr = []
            this.roleList.forEach(item => {
              if(checklist.indexOf(item.id) > -1){
                item.canFaceSign = false
              }
              else{
                arr.push(item.roleUserName)
              }
            })
            if(arr.length > 0){
              this.roles =  arr.join(',')
            }
            else{
              this.roles = ''
            }
          }
        }
      })
    },
    checkPledgeInfo(){
      api.checkPledgeInfo({
        loanApplyId: this.loanApplyId
      }).then(res => {
        if(res.data.code == 0){
          if(res.data.message && Object.keys(res.data.message).length > 0){
            this.canPledgeOrder = false
          }
        }
      })
    },
    
  },
  created() {
    let str = sessionStorage.getItem('approvalInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      //console.log(this.detailInfo)

      if (this.detailInfo.readonly === true) { // 已审批，隐藏按钮
        this.readonly = false
      }
      this.loanApplyId = this.detailInfo.id
      this.compId = this.detailInfo.compId
    }
    this.getLoanApplyInfo()
    this.getCreditProof()
    this.companyRoleList()
    this.getApprovalRecord()
    this.checkPledgeInfo()
    
  }
}

</script>
<style lang="less" scoped>
.common-report-page {
  padding: 0 30px 82px;
  min-width: 1200px;
}

/*详情头部*/
.common-report-base {
  font-size: 12px;
  padding: 0px;
  margin: 0px;
  background: #fff;
  border: none;

  .base_message {
    margin-bottom: 30px;
    .detailInfo_message {
      position: relative;
      line-height: 37px;
    }
  }
}

/*详情内容*/
.common-report-page  .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
}

.common-report-page  .title h3 {
  font-size: 18px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}

.common-report-page .el-form-item {
  margin-bottom: 15px;
}

.detailInfo_message_tit {
  background: #e4e4e4;
  padding: 0 15px;
  position: relative;
  padding-top: 5px;
  border: solid 1px rgba(204, 204, 204, 1);

  tr span {
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
}
.detail-item {
  margin-top: 20px;

  .style-key-value {
    margin-top: 10px;
    line-height: 20px;
    font-size: 13px;

    span {
      margin-bottom: 10px;
      display: inline-block;
      width: 160px;
      min-width: 160px;
    }

    &.flex-wrap .el-col {
      display: flex;
    }
  }

  .el-radio-group {
    margin-top: 10px;
  }

  p {
    line-height: 20px;
    font-size: 13px;
  }
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

.approval-form {
  h3 {
    color: #333;
    border-bottom: solid 1px #eee;
    line-height: 30px;
    margin-bottom: 10px;
  }

  p {
    line-height: 30px;

    span {
      display: inline-block;
      width: 140px;
      color: #777;
      padding-right: 10px;
      text-align: right;
    }
  }
}
.img-wrap img{
  min-width: 100px;
  min-height: 100px;
  border: dashed 1px #d1d1d1;
}
</style>
