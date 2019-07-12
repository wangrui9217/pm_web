<template>
  <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='handleTabClick' :routeName="$route.name">
    <div style="width: 100%;padding:0 24px;background:#fff" v-loading.fullscreen="loading">
      <el-table :data="tableData1" highlight-current-row stripe v-show="showTab==1">
        <el-table-column prop="index" label="序号" align="center" width="50"/>
        <el-table-column prop="applyNum" label="授信编号" align="center" :formatter="el=>el.applyNum.indexOf('||')=='-1'?el.applyNum:el.applyNum.split('||')[1]" />
        <el-table-column prop="compName" label="客户名称" align="center"  />
        <el-table-column prop="legalName" label="法人名称" align="center"  />
        <el-table-column prop="legalIdno" label="身份证" align="center" >
        </el-table-column>
        <el-table-column prop="legalPhone" label="手机" align="center" />
        <el-table-column prop="applyEvent" label="申请事件" align="center"  />
        <el-table-column prop="applyTime" label="申请时间" align="center" />
        <el-table-column align="center" label="操作" width="50">
          <template slot-scope="scope">
            <div class="of-hidden actList">
              <el-button type="text" size="small" @click.native.prevent="approvalInfo(scope.row)">处理</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData2" highlight-current-row stripe v-show="showTab==2">
        <el-table-column prop="index" label="序号" align="center" width="50"/>
        <el-table-column prop="applyNum" label="授信编号" align="center" :formatter="el=>el.applyNum.indexOf('||')=='-1'?el.applyNum:el.applyNum.split('||')[1]" />
        <el-table-column prop="compName" label="客户名称" align="center" />
        <el-table-column prop="legalName" label="法人名称" align="center" />
        <el-table-column prop="legalIdno" label="身份证" align="center" >
        </el-table-column>
        <el-table-column prop="legalPhone" label="手机" align="center" />
        <el-table-column prop="auditResult" label="审批结果" align="center" :formatter="getResult"/>
        <el-table-column prop="auditCreditAmount" label="授信金额" align="center" />
        <el-table-column prop="auditCreditValidTime" label="授信有效期" align="center" />
        <el-table-column prop="rejectMsg" label="拒绝原因" align="center" />
        <el-table-column prop="createTime" label="审批申请时间" align="center" />
        <el-table-column prop="auditTime" label="审批完毕时间" align="center" />
        <el-table-column align="center" label="操作" width="50">
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
    raiseState: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
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
      userId: JSON.parse(localStorage.userinfo).id,
      username: JSON.parse(localStorage.userinfo).username
    }
  },
  components: {
    'data-list': DataList
  },
  methods: {
    getResult(row){
      return ['拒绝','通过'][row.auditResult]
    },
    handleTabClick(val){
      this.showTab=val;
      this.getData({pageSize:10, pageNum:1})
    },
    approvalInfo(data, tag) {
      let obj = Object.assign({}, data)
      obj.raiseState = this.raiseState
      if(tag && tag === 'readonly'){
        obj.readonly = true
      }
      sessionStorage.setItem('approvalInfo', JSON.stringify(obj))
      this.$router.push({ name: '提额审批详情' })
    },
    getData(params) {
      this.loading = true;
      let data = Object.assign({state: this.raiseState}, params)
      if(this.showTab == 1){
        Object.assign(data, {
          "auditId": 0,
          "auditUserId": this.userId,
          "auditUserName": this.username,
          "compId": 0,
          "phone": ""
        })
        api.searchExamineNotDoList(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData1 = res.data.message.list
            this.tableData1.forEach((item,i) => {
              item.index = i+1 + data.pageSize*(data.pageNum-1)
            })
            this.total = res.data.message.total
          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error(res.data.message)
          }
        })
      }
      else{
        Object.assign(data, {
          "auditId": 0,
          "auditUserId": this.userId,
          "auditUserName": this.username,
          "compId": 0,
          "phone": "",
        })
        api.searchExamineDoneList(data).
        then((res) => {
          this.loading = false;
          if (res.data.code == '0') {
            this.tableData2 = res.data.message.list
            this.tableData2.forEach((item,i) => {
              item.index = i+1 + data.pageSize*(data.pageNum-1)
            })
            this.total = res.data.message.total
          } else {
            this.tableData2 = []
            this.total = 0
            this.$message.error(res.data.message)
          }
        })
      }
      
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
      padding-right: 5px;
      padding-left: 5px;
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
