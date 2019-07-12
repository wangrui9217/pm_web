<template>
  <div class="common-list-page basedCost" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" key="1" v-if="showtab==1">
            <el-table-column prop="orderNumber" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="legalName" label="法人名称" align="center" />
            <el-table-column prop="legalPhone" label="联系电话" align="center" />
            <el-table-column prop="registerAddr" label="地址" align="center" />
            <el-table-column prop="createTime" label="工单生成时间" align="center" />
            <el-table-column align="center" label="操作" width="80">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="openAssignment(scope.row)">工单派发</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="2" v-if="showtab==2">
            <el-table-column prop="orderNumber" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <el-table-column prop="industryCategory" label="行业归属" align="center" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="creditAmount" label="授信金额" align="center" />
            <el-table-column prop="loanAmount" label="用信金额" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="surveyUserNames" align="center" width="200" label="执行人">
            </el-table-column>
            <el-table-column align="center" label="操作" width="50">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="gotoInfo(scope.row)">详情</el-button>
                  <!-- <el-button type="text" size="small" @click.native.prevent="openAssignment(scope.row)">工单派发</el-button> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="3" v-if="showtab==3">
            <el-table-column prop="orderNumber" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <el-table-column prop="industryCategory" label="行业归属" align="center" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="creditAmount" label="授信金额" align="center" />
            <el-table-column prop="loanAmount" label="用信金额" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="finishTime" label="工单完成时间" align="center" />
            <el-table-column prop="surveyUserNames" align="center" width="200" label="执行人">
            </el-table-column>
            <el-table-column align="center" label="操作" width="50">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="gotoInfo(scope.row)">详情</el-button>
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
        <el-form-item label="调查人员：">
          <el-select v-model="surveyWorker" placeholder="请选择调查人员" clearable>
            <el-option v-for="item in surveyWorkers" :label="item.realname" :value="item.id" :key="item.id"></el-option>
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
      positionPath: [{ name: '工单管理' }, { name: '贷后突击检查工单' }],
      showtab: 0,
      filters: [{
        label: "客户名称：",
        type: "input",
        field: "compName",
        placeholder: '请输入客户名称'
      }],
      formData: {},
      worker: '',
      surveyWorker: '',
      surveyWorkers: [],
      workers: [],
      oldMarketUser: {},
      oldSurveyUser: []
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
      api.getLwcOrderList({ pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }).
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
      api.getLwcOrderList(params).
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
      sessionStorage.setItem('lwcOrderInfo', JSON.stringify(row))
      this.$router.push({ name: '贷后突击检查工单详情', query: { id: row.id } })
    },
    openAssignment(row) {
      this.formData = row
      this.worker = ''
      this.surveyWorker = ''
      this.oldSurveyUser = {}
      this.oldMarketUser = {}
      this.getUserListByOrderIdLwc()
      this.dialogVisible = true
      this.workers = []
      this.getMarketUsers()
      
      this.surveyWorkers = []
      this.getSurveyUserList()
      
    },
    getMarketUsers(){
      api.getMarketUsers({
        type: 2,
        orgId: this.formData.orgId
      }).then(({data}) => {
        if(data.code == 0){
          this.workers = data.message
        }
      })
    },
    getUserListByOrderIdLwc() {
      api.getUserListByOrderIdLwc({
        //orgId: this.formData.orgId,
        orderId: this.formData.id
      }).then(res => {
        if (res.data.code == '0') {
          let data = res.data.message
          if(data && data.length > 0){
            data.forEach(item => {
              if(item.surveyUserType == 1){
                this.oldSurveyUser = {
                  surveyUserId: item.surveyUserId,
                  surveyUserName: item.surveyUserName
                }
                this.surveyWorker = item.surveyUserId
              }
              else{
                this.oldMarketUser = {
                  marketUserId: item.surveyUserId,
                  marketUserName: item.surveyUserName
                }
                this.worker = item.surveyUserId
              }
            })
          }
        }
      })
    },
    // getMarketUserListLwc(){
    //   api.getMarketUserListLwc({
    //     orderId: 0,
    //     orgId: 0
    //   }).then(({ data }) => {
    //     if (data.code == '0') {
    //       this.workers = data.message
    //     } else {
    //       this.$message.error('操作失败')
    //     }
    //   })
    // },
    getSurveyUserList(){
      api.getSurveyUserList({
        orgId: this.formData.orgId,
        orderId: this.formData.id
      }).then(({ data }) => {
        if (data.code == '0') {
          this.surveyWorkers = data.message
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    submit() {
      if (!this.worker || !this.surveyWorker) {
        this.$message.error('请选择营销或调查人员')
        return false;
      }
      let data = {
        "orgId": this.formData.orgId,
        "orderId": this.formData.id
      }
      for (let i = 0, len = this.workers.length; i < len; i++) {
        if (this.workers[i].id == this.worker) {
          data.marketUserId = this.workers[i].id
          data.marketUserName = this.workers[i].realname
          break;
        }
      }
      for (let i = 0, len = this.surveyWorkers.length; i < len; i++) {
        if (this.surveyWorkers[i].id == this.surveyWorker) {
          data.surveyUserId = this.surveyWorkers[i].id
          data.surveyUserName = this.surveyWorkers[i].realname
          break;
        }
      }
      this.loading = true
      api.assignmentUserLwc(data).then(({ data }) => {
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
