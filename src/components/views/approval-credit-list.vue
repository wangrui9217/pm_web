<template>
  <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='handleTabClick' :routeName="$route.name">
    <div style="width: 100%;padding:0 24px;background:#fff" v-loading.fullscreen="loading">
      <el-table :data="tableData1" highlight-current-row stripe v-show="showTab==1">
        <el-table-column prop="loanAuditNumber" label="业务编号" align="center" />
        <el-table-column prop="compName" label="客户名称" align="center" />
        <el-table-column prop="legalName" label="法人名称" align="center" />
        <el-table-column prop="legalNo" label="身份证" align="center">
        </el-table-column>
        <el-table-column prop="legalPhone" label="手机" align="center"  />
        <el-table-column prop="creditAmount" label="授信金额" align="center" />
        <el-table-column prop="creditValidTime" label="授信有效期" align="center" :formatter="formatTime"/>
        <el-table-column prop="productName" label="用信产品" align="center" />
        <el-table-column prop="loanAmount" label="用信金额" align="center" />
        <el-table-column prop="loanTerm" label="期限" align="center"/>
        <el-table-column prop="status" label="用信审批状态" align="center" >
        </el-table-column>
        <el-table-column prop="applyTime" label="用款申请时间" align="center" />
        <el-table-column prop="auditType" label="用信类型" align="center" :formatter="row => api.getAuditType(row.auditType)">
        </el-table-column>
        <el-table-column align="center" width="50" label="操作">
          <template slot-scope="scope">
            <div class="of-hidden actList">
              <el-button type="text" size="small" @click.native.prevent="approvalInfo(scope.row)">处理</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData2" highlight-current-row stripe v-show="showTab==2">
        <el-table-column prop="loanAuditNumber" label="业务编号" align="center" />
        <el-table-column prop="compName" label="客户名称" align="center" />
        <el-table-column prop="legalName" label="法人名称" align="center" />
        <el-table-column prop="legalNo" label="身份证" align="center">
        </el-table-column>
        <el-table-column prop="legalPhone" label="手机" align="center"  />
        <el-table-column prop="creditAmount" label="授信金额" align="center" />
        <el-table-column prop="creditValidTime" label="授信有效期" align="center" :formatter="formatTime"/>
        <el-table-column prop="productName" label="用信产品" align="center" />
        <el-table-column prop="loanAmount" label="用信金额" align="center" />
        <el-table-column prop="loanTerm" label="期限" align="center"/>
        <el-table-column prop="status" label="用信审批状态" align="center" >
        </el-table-column>
        <el-table-column prop="applyTime" label="用款申请时间" align="center" />
        <el-table-column prop="auditType" label="用信类型" align="center" :formatter="row => api.getAuditType(row.auditType)">
        </el-table-column>
        <el-table-column align="center" width="50" label="操作">
          <template slot-scope="scope">
            <div class="of-hidden actList">
              <el-button type="text" size="small" @click.native.prevent="approvalInfo(scope.row, 'readonly')">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </data-list>
</template>
<script>
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'

export default {
  props: {
    creditType: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      api,
      tableData1: [],
      tableData2: [],
      loading: false,
      total: 0,
      filters: [{
          label: false,
          placeholder: '法人名称/身份证/手机',
          field: 'condition',
          type: "input"
        },
      ],
      tabOptions: [
        { label: "待办工作", value: "1"},
        { label: "已办工作", value: "2"}
      ],
      showTab: 1,
      statusArr: {'11': '已申请', '21': '业务经理审核通过', '22': '经理审批拒绝', '31': '信贷审批通过', '32': '信贷审批拒绝', '41': '签字审批通过',
       '42': '签字审批异常','43': '签字审批拒绝', '51':'合同审批通过', '52': '合同审批拒绝'}
    }
  },
  components: {
    'data-list': DataList
  },
  methods: {
    handleTabClick(val){
      this.showTab=val;
      this.getData({pageSize:10, pageNum:1})
    },
    approvalInfo(data, tag) {
      let obj = Object.assign({}, data)
      obj.creditType = this.creditType
      if(tag && tag === 'readonly'){
        obj.readonly = true
      }
      sessionStorage.setItem('approvalInfo', JSON.stringify(obj))
      if(this.creditType == 21){
        this.$router.push({ name: '信贷部用信审批详情', query: {auditType: data.auditType}})
      }
      else if(this.creditType == 31){
        this.$router.push({ name: '签字岗用信审批详情', query: {auditType: data.auditType} })
      }
      else if(this.creditType == 41){
        this.$router.push({ name: '合同岗用信审批详情', query: {auditType: data.auditType} })
      }

    },
    getData(params) {
      this.loading = true;
      let data = Object.assign({type: this.creditType}, params)
      if(this.showTab == 1){
        Object.assign(data, {

        })
        api.getCreditApprovalNotDoList(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData1 = res.data.message.list
            this.total = res.data.message.total
            this.tableData1.forEach(item => {
              if(item.status){
                item.status = this.statusArr[item.status]
              }
              if(item.loanTermType){
                let o = {'MON':'个月', 'YEAR':'年', 'DAY':'天' }
                item.loanTerm = item.productTerm + o[item.loanTermType]
              }
            })
          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error(res.data.message)
          }
        })
      }
      else{
        Object.assign(data, {

        })
        api.getCreditApprovalDoneListt(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData2 = res.data.message.list
            this.total = res.data.message.total
            this.tableData2.forEach(item => {
              if(item.status){
                item.status = this.statusArr[item.status]
              }
              if(item.loanTermType){
                let o = {'MON':'月', 'YEAR':'年', 'DAY':'天' }
                item.loanTerm = item.productTerm + o[item.loanTermType]
              }
            })

          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error(res.data.message)
          }
        })
      }

    },
    formatTime(row){
      return row.creditValidTime?('' +row.creditValidTime).substring(0,10):''
    }
  },
  created(){
    this.showTab = this.$route.params.state
  }
}

</script>
<style lang="scss">
.common-list-page.basedCost {
  padding: 0;

  .el-table {
    .cell {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.85);
      letter-spacing: 0;
      line-height: 22px;

      .of-hidden.actList .el-button--small {
        font-size: 14px;
        color: #1890FF;
        line-height: 22px;
      }
    }

  }

  .el-table--enable-row-transition .el-table__body td {
    font-size: 14px;
    letter-spacing: 0;
    line-height: 14px;
    padding-top: 10px;
    padding-bottom: 9px;
    border-right: none;
  }

  .el-table__body tr.current-row>td,
  .el-table__body tr:hover>td {
    background-color: #E6F7FF;
  }

}

</style>
