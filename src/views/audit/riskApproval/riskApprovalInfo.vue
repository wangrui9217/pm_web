<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" v-loading.fullscreen = "loading" :showReturn="true">
      <el-tabs type="border-card">
        <el-tab-pane label="检查报告">
          <div class="detail-item">
            <div class="title"><h3>贷后检查详情</h3>
            </div>
            <el-row class="style-key-value" :gutter="10">
              <el-col :span="6"><span>人员工号:</span>{{lwcOrderUserResponse.userName}}</el-col>
              <el-col :span="6"><span>人员姓名:</span>{{lwcOrderUserResponse.realName}}</el-col>
              <el-col :span="6"><span>接单时间:</span>{{detailInfo.startTime}}</el-col>
              <el-col :span="6"><span>提交时间:</span>{{detailInfo.finishTime}}</el-col>
            </el-row>
            <table class="style-table border center" cellpadding="0" cellspacing="0" v-for="(item,index) in resultList" >
              <tr>
                <th>信号编号</th>
                <th>预警等级</th>
                <th>检查项</th>
              </tr>
              <tr>
                <td>{{item.warnNumber}}</td>
                <td>{{item.signalType}}</td>
                <td>{{item.signalItems}}-{{item.signalContent}}</td>
              </tr>
              <tr>
                <th colspan="3">检查结果</th>
              </tr>
              <tr>
                <td colspan="3">
                  <signal-item :options="item"></signal-item>
                </td>
              </tr>
              <tr>
                <th colspan="3">解决方案</th>
              </tr>
              <tr>
                <td colspan="3" style="text-align: left;height: 100px">{{item.managerSolution || '无'}}</td>
              </tr>
              <tr v-if="!item.readonly">
                <th colspan="3">操作</th>
              </tr>
              <tr v-if="!item.readonly">
                <td colspan="3" style="height: 60px">
                  <el-button type="primary" size="mini" @click="handleClick(1,item)">同意</el-button>
                  <el-button type="primary" size="mini" @click="handleClick(3,item)">无需处理</el-button>
                  <el-button type="primary" size="mini" @click="handleClick(2,item)">不同意</el-button>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批记录">
          <!-- 概览 -->
          <div class="detail-item">
            <div class="title"><h3>审批历史</h3></div>
            <template v-if="showDetail">
              <el-table :data="recordDetail">
                <el-table-column prop="lwcAuditUserName" label="审批人">
                </el-table-column>
                <el-table-column prop="createTime" label="审批时间" >
                </el-table-column>
                <el-table-column prop="auditResult" label="方案审批结果" />
                <el-table-column prop="releaseStatus" label="是否消除信号" >
                </el-table-column>
                <el-table-column prop="auditOpinion" label="解决方案">
                </el-table-column>
              </el-table>
              <div style="text-align: center;margin-top: 20px;">
                <el-button type="primary" size="small" @click="showDetail = false">返回</el-button>  
              </div>
            </template>
            <el-table :data="records" v-else>
              <el-table-column prop="warnNumber" label="信号编号" align="center">
              </el-table-column>
              <el-table-column prop="signalType" label="信号等级" align="center">
              </el-table-column>
              <el-table-column prop="lastTime" label="最后审批时间" align="center" />
              <el-table-column label="方案审批结果" align="center" prop="auditResult">
              </el-table-column>
              <el-table-column label="信号是否解除" align="center" prop="auditReleaseStatus">
              </el-table-column>
              <el-table-column label="操作" align="center" prop="updateTime">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click.native.prevent="read(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </el-tab-pane>
      </el-tabs>
      <el-dialog :title="dialogTitle" :visible.sync="showApprovalDialog" width="800px" :close-on-click-modal="false" >
        <el-form :model="approvalForm" ref="approval-form" :rules="rules">
          <el-form-item :label="opinionLabel" prop="auditOpinion" >
            <el-input v-model="approvalForm.auditOpinion" type="textarea" :rows="4" :maxLength="2000">
            </el-input>
          </el-form-item>
          <el-form-item label="处置后信号是否解除：" prop="releaseStatus" >
            <el-radio-group v-model="approvalForm.releaseStatus" size="medium">
              <el-radio label="0">处置完毕后信号解除</el-radio>
              <el-radio label="1">处置完毕后信号不解除</el-radio>
            </el-radio-group>
          </el-form-item>
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
import signalItem from './signalItem'
export default {
  components: { PageTemplate, signalItem},
  data() {
    return {
      detailInfo: {},
      approvalForm: {
        auditOpinion: '',
        releaseStatus: ''
      },
      showApprovalDialog: false,
      loading: false,
      positionPath: [{ name: '审批管理' }, { name: '风险评估审批-贷审会详情' }],
      records: [],
      resultList: [],
      orderWarnId: '',
      auditResult: '',
      opinionLabel: '审批意见：',
      rules: {
        auditOpinion: {required: true, message: '请输入审批建议或处置方式', trigger:'change'},
        releaseStatus: {required: true, message: '请选择是否解除信号', trigger:'change'}
      },
      dialogTitle: '',
      lwcOrderUserResponse: {},
      recordDetail: [],
      showDetail: false,
      
    }
  },
  methods: {
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
            "auditId": this.detailInfo.auditId,
            "auditOpinion": '',
            "auditResult": this.auditResult,
            "lwcOrderWarnId": this.orderWarnId,
            "orderId": this.detailInfo.orderId,
            "releaseStatus": ''
          }, this.approvalForm)
          this.loading = true
          api.submitApprovalRisk(params).
          then((res) => {
            this.loading = false
            this.getCheckResult()  // 刷新数据
            this.getAuditHistory() // 刷新数据
            this.showApprovalDialog = false
            if (res.data.code == 0) {
              this.$message.success('操作成功')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    getCheckResult(){
      api.getCheckResult({
        orderId: this.detailInfo.orderId
      }).then(({data}) => {
        if(data.code == 0){
          let resultList = data.message.checkResult
          let orderWarnIds = data.message.orderWarnIds
          resultList.forEach(item => {
            let results = {}
            item.signalType = item.signalType==1?'红灯':'黄灯'
            if(orderWarnIds.indexOf(item.orderWarnId) > -1){
              item.readonly = true
            }
            if(item.checkResult){
              results = JSON.parse(item.checkResult)
            }
            if(results instanceof Array === false){
              results = [results]
            }
            item.results = results
          })
          this.resultList = resultList
          this.lwcOrderUserResponse = data.message.lwcOrderUserResponse || {}
        }
      })
    },
    getAuditHistory(){
      api.getAuditHistory({
        auditId: this.detailInfo.auditId
      }).then(({data}) => {
        if(data.code == 0){
          let records = data.message
          records.forEach(item => {
            item.signalType = item.signalType==1?'红灯':'黄灯'
            if(item.auditReleaseStatus || item.auditReleaseStatus == 0){
              item.auditReleaseStatus = item.auditReleaseStatus==0?'消除':'不消除'
            }
            else{
              item.auditReleaseStatus = '(审批中)'
            }
            if(item.auditResult == 1){
              item.auditResult = '同意'
            }
            else if(item.auditResult == 2){
              item.auditResult = '不同意'
            }
            else if(item.auditResult == 3){
              item.auditResult = '无需处理'
            }
            else{
              item.auditResult = '(审批中)'
            }
          })
          this.records = records
        }
      })
    },
    handleClick(val, row){
      if(val === 1){
        this.dialogTitle = '同意'
        this.opinionLabel = '审批意见：'
      }
      else if(val === 2){
        this.dialogTitle = '不同意'
        this.opinionLabel = '审批建议处置方式：'
      }
      else if(val === 3){
        this.dialogTitle = '无需处理'
        this.opinionLabel = '审批意见：'
      }
      this.showApprovalDialog = true
      this.orderWarnId = row.orderWarnId
      this.auditResult = val
      this.resetFormData()
      this.$nextTick(() => {
        this.$refs['approval-form'].clearValidate()
      })
    },
    read(row){
      if(row.recordDetail){  // 用缓存的
        this.recordDetail = row.recordDetail
        this.showDetail = true
      }
      else{
        let params = {
          warnOrderId: row.warnOrderId,
          auditId: this.detailInfo.auditId
        }
        this.showDetail = true
        this.getAuditHistoryDetail(params, row)
      }
    },
    getAuditHistoryDetail(params, obj){
      this.recordDetail = []
      api.getAuditHistoryDetail(params)
      .then(({data}) => {
        if(data.code == 0){
          let recordDetail = data.message
          recordDetail.forEach(item => {
            item.releaseStatus = item.releaseStatus==0?'消除':'不消除'
            if(item.auditResult == 1){
              item.auditResult = '同意'
            }
            else if(item.auditResult == 2){
              item.auditResult = '不同意'
            }
            else if(item.auditResult == 3){
              item.auditResult = '无需处理'
            }
          })
          this.recordDetail = recordDetail
          obj.recordDetail = recordDetail  // 缓存下来
        }
      })
    }
    
  },
  created() {
    let str = sessionStorage.getItem('approvalInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.getCheckResult()
      this.getAuditHistory()
    }
  }
}

</script>
<style lang="less" scoped>
.el-tabs{
  margin-left: 20px;
}
.detail-item .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
  margin-bottom: 20px;
}

.style-key-value {
  margin-top: 10px;
  line-height: 20px;
  font-size: 13px;

  span {
    margin-bottom: 10px;
    display: inline-block;
    width: 80px;
    color: #000;
    font-weight: bold;
  }
}
.detail-item .title h3 {
  font-size: 18px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}
.style-h4 {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.style-table {
  margin-top: 20px;
  width: 600px;
  border-collapse: collapse;
  th {
    font-weight: bold;
    background: #eee;
  }

  td,
  th {
    padding: 5px;
    vertical-align: middle;
    word-break: break-all;
    font-size: 13px;
    height: 30px;
  }

  &.border {
    td,
    th {
      border: solid 1px #ddd;
    }
  }

  &.center {
    width: 100%;
    table-layout: fixed;
    td,
    th {
      text-align: center;
    }
  }
  .style-table{
    margin-top: 0;
    td,th{
      border: none;  
    }
  }
}
</style>
