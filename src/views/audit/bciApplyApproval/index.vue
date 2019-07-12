<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='handleTabClick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff" v-loading.fullscreen="loading">
          <el-table :data="tableData1" highlight-current-row stripe v-show="showTab==1">
            <el-table-column type="index" label="序号" align="center" :index="indexMethod"/>
            <el-table-column prop="applyNum" label="授信编号" align="center" />
            <el-table-column prop="compNaRme" label="客户名称" align="center"  />
            <el-table-column prop="applyUserName" label="申请人名称" align="center"  />
            <el-table-column prop="roleName" label="申请人角色" align="center" />
            <el-table-column prop="applyUserIdNo" label="申请人身份证" align="center" />
            <el-table-column prop="applyUserPhone" label="手机" align="center"  />
            <el-table-column prop="applyEvent" label="申请事件" align="center" />
            <el-table-column prop="applyTime" label="申请时间" align="center" />
            <el-table-column align="center" width="50" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button size="mini" type="text" @click.native.prevent="approvalInfo(scope.row)">处理</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableData2" highlight-current-row stripe v-show="showTab==2">
            <el-table-column type="index" label="序号" align="center" :index="indexMethod"/>
            <el-table-column prop="applyNum" label="授信编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center"  />
            <el-table-column prop="applyUserName" label="申请人名称" align="center"  />
            <el-table-column prop="roleName" label="申请人角色" align="center" />
            <el-table-column prop="applyUserIdNo" label="申请人身份证" align="center" />
            <el-table-column prop="applyUserPhone" label="手机" align="center"  />
            <el-table-column prop="auditResult" label="审批结果" align="center" />
            <el-table-column prop="rejectReason" label="拒绝原因" align="center" />
            <el-table-column prop="applyTime" label="申请审批时间" align="center" />
            <el-table-column prop="auditTime" label="审批完毕时间" align="center" />
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
      positionPath: [{ name: '审批管理' }, { name: '央行征信审批' }],
      tableData1: [],
      tableData2: [],
      loading: false,
      total: 0,
      filters: [{
        label: false,
        placeholder: '法人名称/手机/身份证',
        field: 'condition',
        type: "input",

      }, ],
      roleNameArr: ['未认证角色','法人','法人配偶','自然人股东','企业股东','会计'],
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
      this.$router.push({ name: '央行征信审批详情' })
    },
    getData(params) {
      this.loading = true;
      let data = Object.assign({}, params)
      data.status = this.$route.params.state
      if (this.showTab == 1) {

        api.getBciApplyList(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData1 = res.data.message.list
            this.total = res.data.message.total
            this.tableData1.forEach(item => {
              item.roleName = this.roleNameArr[item.roleName]
            })
          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error(res.data.message)
          }
        })
      } else {

        api.getBciApplyList(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData2 = res.data.message.list
            this.total = res.data.message.total
            this.tableData2.forEach(item => {
              item.roleName = this.roleNameArr[item.roleName]
              item.auditResult = item.auditResult==1?'通过':'拒绝'
            })

          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error(res.data.message)
          }
        })
      }

    },
    indexMethod(index) {
      return (this.$store.state.pagenum-1)%this.$store.state.pagesizes*this.$store.state.pagesizes+(index+1)
    },
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
