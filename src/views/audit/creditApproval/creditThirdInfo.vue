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
      <div id="approval-container" v-if="readonly">
        <div class="approval-wrapper">
          <span @click="openApproval">批复</span>
        </div>
      </div>
      <el-dialog title="审批结果" :visible.sync="showApprovalDialog" width="800px" :close-on-click-modal="false" v-loading.fullscreen="loading">
        <el-form :model="approvalForm" class="approval-form" label-width="120px" ref="approval-form" label-position="left" size="small">
          <el-form-item label="审核结果：" prop="result" required>
            <el-radio-group v-model="approvalForm.result" @change="handleResultChange">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="approvalForm.result==1">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="审批意见：" prop="auditMsg" :rules="rules.auditMsg">
                  <el-input v-model="approvalForm.auditMsg" type="textarea" :rows="3" :maxLength="2000">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-form-item label="拒绝原因：" prop="rejectMsg" :rules="rules.rejectMsg">
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
              <el-input v-model="approvalForm.remark" type="textarea" :rows="3" :maxLength="2000">
              </el-input>
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
import api from '@/api-authority'
import Rules from "@/const/formRules";
import loanInfo from "./loanInfo";
export default {
  components: { PageTemplate, loanInfo},
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
      checklist: [],
      files: [],
      loanApplyId: '', // 审批id
      compId: '',
      showApprovalDialog: false,
      rules: Rules,
      loading: false,
      rejectMsgArr: [{ value: '签署名字错误', label: '签署名字错误' },
      { value: '签署位置错误', label: '签署位置错误' },
      { value: '签署日期错误', label: '签署日期错误' }],
      readonly: true,
      status: '审批中',
      positionPath: [{ name: '审批管理' }, { name: '合同岗用信审批详情' }],
      dataList: [],
      pledgeInfos: '',
      buttonName: '提 交',
      loanInformation: {}
    }
  },
  filters: {
    getGuaranteeType(v){
      v = v||0
      return ['','保证','抵押','质押','定金'][v]
    }
  },
  methods: {
    
    openApproval() {
      this.showApprovalDialog = true
      this.buttonName = "提 交"
      this.resetFormData()
      this.$nextTick(() => {
        this.$refs['approval-form'].clearValidate()
      })
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
    getPledgeInfos(){
      api.getPledgeInfos({
        loanApplyId: this.loanApplyId
      }).then(({data}) => {
        if(data.code == 0){
          this.pledgeInfos = data.message
        }
      })
    },
    submit() {
      this.$refs['approval-form'].validate(valid => {
        if (valid) {
          let params = Object.assign({
            "auditMsg": "",
            "auditNode": 4,  // 节点
            // "auditUserId": 0,
            // "auditUserName": "",
            // "id": 0,
            "loanApplyId": this.loanApplyId,
            "rejectMsg": "",
            "result": ''
          }, this.approvalForm)
          if (params.result == '0') {
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
    handleResultChange(val) {
      this.$refs['approval-form'].clearValidate()
      if(val == '1'){
        this.buttonName = "提 交"
      }
      else{
        this.buttonName = "保 存"
      }
    },
    getLoanApplyInfo(){

      api.getLoanApplyInfo({applyId:this.loanApplyId}).then(res => {
        if(res.data.code == 0 && res.data.message){
          this.loanInformation = res.data.message
        }
      })
    },
  },
  created() {
    let str = sessionStorage.getItem('approvalInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      if (this.detailInfo.readonly === true) { // 已审批，隐藏按钮
        this.readonly = false
      }
      this.loanApplyId = this.detailInfo.id
      this.compId = this.detailInfo.compId
      this.getLoanApplyInfo()
      this.getPledgeInfos()
    }
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
</style>
