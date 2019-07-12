<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" v-loading.fullscreen = "loading" :showReturn="true">
    <section class="detailInfo_msg">
      <table align="center" style="width: 100%;">
        <tr>
          <td width="10"><span>客户名称：</span>{{detailInfo.compName}}</td>
          <td width="10"><span>申请人名称：</span>{{detailInfo.applyUserName}}</td>
          <td width="10"><span>申请人角色：</span> {{detailInfo.roleName}}</td>
        </tr>
        <tr>
          <td><span>身份证：</span>{{detailInfo.applyUserIdNo}}</td>
          <td><span>申请事件：</span>{{detailInfo.applyEvent}}</td>
          <td><span>申请时间：</span>{{detailInfo.applyTime}}</td>
        </tr>
      </table>
    </section>
    <div class="detailInfo_content" style="padding-bottom: 70px;">
      <h3>央行企业征信查询授权书</h3>
  
      <div style="text-align: center;margin-top: 20px;" v-for="itme in imgUrls">
        <img :src="itme" alt="" preview="0" preview-text="授权书">
      </div>
      
    </div>
    <div id="approval-container" v-if="readonly">
      <div class="approval-wrapper">
        <span @click="openApproval">批复</span>
      </div>
    </div>
    <el-dialog title="审批结果" :visible.sync="showApprovalDialog" width="800px" :close-on-click-modal="false" >
      <el-form :model="approvalForm" ref="approval-form" :rules="rules">
        <el-form-item label="审核结果：" prop="auditResult" >
          <el-radio-group v-model="approvalForm.auditResult" size="medium" @change="handleResultChange">
            <el-radio label="1">通过</el-radio>
            <el-radio label="0">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="approvalForm.auditResult == '1'">
          <el-form-item label="审批意见：" prop="auditOpinion" >
            <el-input v-model="approvalForm.auditOpinion" type="textarea" :rows="4" :maxLength="2000">
            </el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="拒绝原因：" prop="rejectReason" >
            <el-select v-model="approvalForm.rejectReason" placeholder="请选择" style="width: 250px;">
              <el-option v-for="(option,index) in rejectMsgArr" :label="option.label" :value="option.label" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="remark" >
            <el-input v-model="approvalForm.remark" type="textarea" :rows="4" :maxLength="2000">
            </el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" @click="submit()" style="margin: 0 50px 0 0;">提 交</el-button>
        <el-button @click="showApprovalDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'

export default {
  components: { PageTemplate},
  data() {
    return {
      detailInfo: {},
      approvalForm: {
        rejectReason: '',
        auditResult: '1',
        remark: '',
        auditOpinion: ''
      },
      showApprovalDialog: false,
      loading: false,
      positionPath: [{ name: '审批管理' }, { name: '央行征信审批详情' }],
      rules: {
        auditOpinion: {required: true, message: '请输入审批建议'},
        rejectReason: {required: true, message: '请选择拒绝原因'},
        remark: {required: true, message: '请输入备注'}
      },
      readonly: true,
      imgUrls: [],
      rejectMsgArr: []
    }
  },
  methods: {
    resetFormData() {
      for (let k in this.approvalForm) {
        if (k !== 'auditResult') {
          this.approvalForm[k] = ''
        }
      }
      this.$nextTick(() => {
        this.$refs['approval-form'].clearValidate()
      })
    },
    submit() {
      this.$refs['approval-form'].validate(valid => {
        if (valid) {
          let params = {
            "compCustomerRoleId": this.detailInfo.compCustomerRoleId,
            "auditResult": this.approvalForm.auditResult,
            creditApplyId: this.detailInfo.creditApplyId,
            id: this.detailInfo.id,
            rejectReason: '',
            remark: ''
          }
          if(params.auditResult == '1'){
            params.remark = this.approvalForm.auditOpinion
          }
          else{
            params.rejectReason = this.approvalForm.rejectReason
            params.remark = this.approvalForm.remark
          }
          this.loading = true
          api.submitBciApply(params).
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
    getAuthorization(){
      api.getAuthorization({
        compCustomerRoleId: this.detailInfo.compCustomerRoleId,
        bciApplyAuditId: this.detailInfo.id
      }).then(({data}) => {
        if(data.code == 0){
          if(data.message){
            data.message.forEach(item => {
              this.imgUrls.push(api.getImgURL(window.encodeURIComponent(item.filepath)))
              
            })
          }
        }
      })
    },
    handleResultChange(result){
      this.resetFormData()
    },
    openApproval() {
      this.showApprovalDialog = true
      this.resetFormData()
    },
    searchReasons(){
      api.searchReasons({
        "reasonCode": "CREDIT_APPROVAL"
      }).then(res => {
        if(res.data.code == 0 && res.data.message){
            if(res.data.message.length){
                 this.rejectMsgArr=res.data.message.map(el=>{
                   return  {label:el.reasonName,value:el.reasonCode}
                 })
            }
       
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('approvalInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      if (this.detailInfo.readonly === true) { // 已审批，隐藏按钮
        this.readonly = false
      }
      this.getAuthorization()
      this.searchReasons()
    }
  }
}

</script>
<style lang="less" scoped>
.detailInfo_msg {
  background: #e4e4e4;
  margin-left: 24px;
  padding: 20px;
  span{
    font-weight: bold;
    color: #000;
    display: inline-block;
    width: 100px;
  }
  td{
    height: 36px;
  }
}
.detailInfo_content{
  margin-top: 30px;
  margin-left: 30px;
  h3{
    font-weight: normal;
    font-size: 16px;
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
.detailInfo_content img{
  max-width: 100%;
  height: auto;
}
</style>
