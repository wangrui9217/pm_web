<template>
  <div class="common-list-page basedCost" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" key="1" v-if="showtab==1" >
            <el-table-column prop="orderNumber" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center"/>
            <el-table-column prop="orgName" label="所属支行" align="center"  />
            <el-table-column prop="legalName" label="法人名称" align="center"  />
            <el-table-column prop="legalPhone" label="联系电话" align="center" />
            <el-table-column prop="registerAddr" label="地址" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center"  />
            <el-table-column align="center" label="操作" width="80">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="openAssignment(scope.row)">工单派发</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="2" v-if="showtab==2">
            <el-table-column prop="orderNumber" label="工单编号" align="center"/>
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <el-table-column prop="industryCategory" label="行业归属" align="center" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="creditAmount" label="授信金额" align="center" />
            <el-table-column prop="loanAmount" label="用信金额" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center"  />
            <el-table-column prop="userRealname" align="center" label="执行人">
            </el-table-column>
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="gotoInfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="3" v-if="showtab==3">
            <el-table-column prop="orderNumber" label="工单编号" align="center"/>
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <el-table-column prop="industryCategory" label="行业归属" align="center" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="creditAmount" label="授信金额" align="center" />
            <el-table-column prop="loanAmount" label="用信金额" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center"  />
            <el-table-column prop="startTime" label="工单开始时间" align="center"  />
            <el-table-column prop="finishTime" label="工单完成时间" align="center"  />
            <el-table-column prop="userRealname" align="center" label="执行人">
            </el-table-column>
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="gotoInfo(scope.row)">检查报告</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </data-list>
    </page-template>
    <el-dialog title="工单派发" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
      <el-form ref="ruleForm" label-width="100px">
        <el-form-item label="客户名称：">
          <span>{{formData.compName}}</span>
        </el-form-item>
        <el-form-item label="营销人员：">
          <el-select v-model="worker" placeholder="请选择营销人员" clearable>
            <el-option v-for="item in workers" :label="item.realname" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" style="text-align: center;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'
export default {
  computed: {
    areas() {
      var arr = []
      this.$store.state.areas.map(el => {
        arr.push({ label: el.areaName, value: el.id })
      })
      return arr
    },
    credit() {
      var arr = []
      this.$store.state.credit.map(el => {
        arr.push({ label: el.levelName, value: el.levelName })

      })
      return arr
    },
    filters() {
      return [{
        label: "客户名称：",
        type: "input",
        field: "compName"
      }, {
        label: "地区归属: ",
        type: 'select',
        field: 'areaId',
        options: this.areas
      }, {
        label: "信用等级: ",
        type: 'select',
        field: 'compCreditLevel',
        options: this.credit
      }]
    },
    workers() {
      return this.marketUsers
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: true,
      dataList: [],
      total: 0,
      tabOptions: [
        { label: "待派发", value: "1" },
        { label: "执行中", value: "2" },
        { label: "已执行", value: "3" }
      ],
      positionPath: [{ name: '工单管理' }, { name: '贷后常规检查工单' }],
      showtab: 0,
      formData: {},
      worker: '',
      marketUsers: []
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  methods: {
    tabclick(val) {
      this.showtab = val;
      this.loading = true
      api.getLccOrderList({ pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }).
      then((res) => {
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
          this.loading = false
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loading = false
      })
    },
    getData(params) {
      params.status = this.$route.params.state
      api.getLccOrderList(params).
      then((res) => {
        if (res.data.code == '0') {
          let data = res.data.message.list
          this.dataList = data
          this.total = res.data.message.total
          this.loading = false

        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loading = false
      })
    },
    gotoInfo(row) {
      sessionStorage.setItem('lccOrderInfo', JSON.stringify(row))
      this.$router.push({ name: '贷后常规检查工单详情', query: { id: row.id } })
    },
    openAssignment(row) {
      this.formData = row
      this.worker = ''
      this.dialogVisible = true
      this.marketUsers = []
      this.getMarketUsers(row)
    },
    getMarketUsers(row){
      api.getMarketUsers({
        orgId: row.orgId
      }).then(({data}) => {
        if(data.code == 0){
          this.marketUsers = data.message
        }
      })
    },
    submit() {
      if (!this.worker) {
        this.$message.error('请选择营销人员')
        return false;
      }
      let marketUser = {}
      for (let i = 0, len = this.workers.length; i < len; i++) {
        if (this.workers[i].id == this.worker) {
          marketUser = {
            marketUserId: this.workers[i].id,
            marketUserRealname: this.workers[i].realname,
          }
          break;
        }
      }
      let data = {
        "marketUser": marketUser,
        "orderId": this.formData.id
      }
      this.loading = true
      api.assignmentUserLcc(data).then(({ data }) => {
        this.loading = false
        if (data.code == '0') {
          this.$router.push(this.$route.path)
          this.dialogVisible = false
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      })
    }
  },
  created() {
    this.showtab = this.$route.params.state
  }
}

</script>
<style scoped lang="scss">
</style>
