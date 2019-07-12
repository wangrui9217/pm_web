<template>
  <div class="common-list-page basedCost" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" key="1" v-if="showtab==1" :span-method="spanMethod" >
            <el-table-column prop="orderNum" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="roleUserName" label="股东姓名" align="center" />
            <el-table-column prop="roleUserPhone" label="联系电话" align="center" />
            <el-table-column prop="roleAddr" label="地址" align="center" />
            <el-table-column prop="createTime" label="工单生成时间" align="center" />
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="openAssignment(scope.row)">工单派发</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="2" v-if="showtab==2">
            <el-table-column prop="orderNum" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="roleUserName" label="股东姓名" align="center" />
            <el-table-column prop="roleUserPhone" label="联系电话" align="center" />
            <el-table-column prop="roleAddr" label="地址" align="center" />
            <el-table-column prop="createTime" label="工单生成时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="executors" align="center" label="执行人">
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="3" v-if="showtab==3">
            <el-table-column prop="orderNum" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="roleUserName" label="股东姓名" align="center" />
            <el-table-column prop="roleUserPhone" label="联系电话" align="center" />
            <el-table-column prop="roleAddr" label="地址" align="center" />
            <el-table-column prop="createTime" label="工单生成时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="finishTime" label="工单完成时间" align="center" />
            <el-table-column prop="executors" align="center" label="执行人">
            </el-table-column>
            <el-table-column align="center" width="50" label="操作">
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
          <el-row :gutter="5">
            <el-col :span="10">
              <el-select v-model="worker1" placeholder="请选择营销人员1" clearable>
                <el-option v-for="worker in workers1" :label="worker.realname" :value="worker.id" :key="worker.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-select v-model="worker2" placeholder="请选择营销人员2" clearable>
                <el-option v-for="worker in workers2" :label="worker.realname" :value="worker.id" :key="worker.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
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
      positionPath: [{ name: '工单管理' }, { name: '远程面签代办工单' }],
      showtab: 0,
      filters: [{
        label: "客户名称：",
        type: "input",
        field: "compName",
        placeholder: '请输入客户名称'
      }],
      formData: {},
      worker1: '',
      worker2: '',
      oldMarketUser: [],
      spanArr: [],
      marketUsers: []
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  computed: {
    workers1() {
      return this.marketUsers.filter(item => {
        return item.id != this.worker2
      })
    },
    workers2() {
      return this.marketUsers.filter(item => {
        return item.id != this.worker1
      })
    }
  },
  methods: {
    tabclick(val) {
      this.showtab = val;
      this.loading = true
      this.spanArr = []
      api.getFaceSignOrderList({ pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }).
      then((res) => {
        if (res.data.code == '0') {
          let data = res.data.message.list
          data.sort(function(prev, next) {
            return next.id-prev.id
          })
          this.getSpanArr(data)
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
    getData(params) {
      this.spanArr = []
      params.status = this.$route.params.state
      api.getFaceSignOrderList(params).
      then((res) => {
        if (res.data.code == '0') {
          let data = res.data.message.list
          data.sort(function(prev, next) {
            return next.id-prev.id
          })
          this.getSpanArr(data)
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
    getSpanArr(data) {
      let pos = 0;
      for (let i = 0,len=data.length; i < len; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].id === data[i - 1].id) {
            this.spanArr[pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            pos = i;
          }
        }
      }
      
    },
    gotoInfo(row) {
      sessionStorage.setItem('faceSignOrderInfo', JSON.stringify(row))
      this.$router.push({ name: '远程面签代办工单详情', query: { id: row.id } })
    },
    openAssignment(row) {
      this.formData = row
      this.getMarketUserList()
      this.worker1 = ''
      this.worker2 = ''
      this.oldMarketUser = {}
      this.dialogVisible = true
      if(this.workers1.length == 0){
        this.getMarketUsers()
      }
    },
    getMarketUsers(){
      api.getMarketUsers({
        type: 1
      }).then(({data}) => {
        if(data.code == 0 && data.message.length>0){
          this.marketUsers = data.message
        }
      })
    },
    submit() {
   
      if (!this.worker1 ||!this.worker2) {
        this.$message.error('请选择营销人员')
        return
      }
      
      let newList = []
      for (let i = 0, len = this.workers1.length; i < len; i++) {
        if (this.workers1[i].id == this.worker1) {
          newList.push({
            marketUserId: this.workers1[i].id,
            marketUserRealname: this.workers1[i].realname,
          })
          break;
        }
      }
      for (let i = 0, len = this.workers2.length; i < len; i++) {
        if (this.workers2[i].id == this.worker2) {
          newList.push({
            marketUserId: this.workers2[i].id,
            marketUserRealname: this.workers2[i].realname,
          })
          break;
        }
      }
      let data = {
        "newList": newList,
        "oldMarketUser": {},
        "orderId": this.formData.id
      }
      if (this.oldMarketUser.length > 0) {
        data.oldMarketUser = this.oldMarketUser[0]
      }
   
      this.loading = true
      api.assignmentUserFaceSign(data).then(({ data }) => {
        this.loading = false
        if (data.code == '0') {
          this.$router.push(this.$route.path)
          this.dialogVisible = false
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      })

    },
    getMarketUserList() {
      api.getMarketUserList({
        loanFacesignObjectId: this.formData.loanApplyId,
        orderId: this.formData.id
      }).then(res => {
        if (res.data.code == '0') {
          this.oldMarketUser = res.data.message
          
          if(this.oldMarketUser.length > 0){
           this.worker1 = this.oldMarketUser[0].marketUserId
           if(this.marketUsers.length == 0){  // 防止marketUsers无数据
              this.marketUsers = [{
                id: this.oldMarketUser[0].marketUserId,
                realname: this.oldMarketUser[0].marketUserRealname
              }]
            }
          }
        }
      })
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 3 || columnIndex == 7) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  },
  created() {
    this.showtab = this.$route.params.state
  }
}

</script>
<style scoped lang="scss">
</style>
