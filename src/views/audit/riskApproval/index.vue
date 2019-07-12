<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='handleTabClick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff" v-loading.fullscreen="loading">
          <el-table :data="tableData1" highlight-current-row stripe v-show="showTab==1">
            <el-table-column prop="auditNumber" label="业务编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center"  />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center"  />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="creditAmount" label="授信金额" align="center" />
            <el-table-column prop="loanAmount" label="用信金额" align="center"  />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button size="mini" type="text" @click.native.prevent="approvalInfo(scope.row)">检查报告</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableData2" highlight-current-row stripe v-show="showTab==2">
            <el-table-column prop="auditNumber" label="业务编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center"  />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center"  />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="creditAmount" label="授信金额" align="center" />
            <el-table-column prop="loanAmount" label="用信金额" align="center"  />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="finishTime" label="工单完成时间" align="center" />
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="approvalInfo(scope.row, 'readonly')">查看</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </data-list>
    </page-template>
  </div>
</template>
<script>
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'
import PageTemplate from '@/components/page-template'
export default {
  data() {
    return {
      positionPath: [{ name: '审批管理' }, { name: '风险评估管理委员会' }],
      tableData1: [],
      tableData2: [],
      loading: false,
      total: 0,
      filters: [{
        label: false,
        placeholder: '请输入客户名称',
        field: 'compName',
        type: "input",

      }, ],
      tabOptions: [
        { label: "待办工作", value: "1" },
        { label: "已办工作", value: "2" }
      ],
      showTab: 1
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  methods: {
    handleTabClick(val) {
      this.showTab = val;
      this.getData({ pageSize: 10, pageNum: 1 })
    },
    approvalInfo(data, tag) {
      let obj = Object.assign({}, data)
      if (tag && tag === 'readonly') {
        obj.readonly = true
      }
      sessionStorage.setItem('approvalInfo', JSON.stringify(obj))
      this.$router.push({ name: '风险评估审批-贷审会详情' })
    },
    getData(params) {
      this.loading = true;
      let data = Object.assign({}, params)
      data.status = this.$route.params.state
      if (this.showTab == 1) {

        api.getOrderListRisk(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData1 = res.data.message.list
            this.total = res.data.message.total
          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error('请求失败')
          }
        })
      } else {

        api.getOrderListRisk(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData2 = res.data.message.list
            this.total = res.data.message.total
            this.tableData2.forEach(item => {
              if (item.status) {
                item.status = this.statusArr[item.status]
              }
            })

          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error('请求失败')
          }
        })
      }

    }
  },
  created() {
    this.showTab = this.$route.params.state
  }
}

</script>
<style lang="scss" scoped="">
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
