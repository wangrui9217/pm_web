<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="0" v-if="showtab==0" v-loading.fullscreen="loading">
            <el-table-column prop="marketNumber" label="工单编号" align="center" min-width="120" />
            <el-table-column prop="compName" label="客户名称" align="center" min-width="100" />
            <el-table-column prop="compLegalName" label="法人名称" align="center" min-width="120" />
            <el-table-column prop="areaName" label="地区归属" align="center" min-width="100" />
            <el-table-column label="名单属性" align="center" width="100">
              <template slot-scope="scope">
                <span>{{(scope.row.compRiskLevel)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="areaDivision(scope.row)" v-if="mark_dqhf">支行划分</el-button>
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="1" v-if="showtab==1" v-loading.fullscreen="loading">
            <el-table-column prop="marketNumber" label="工单编号" align="center" min-width="120" />
            <el-table-column prop="compLegalName" label="法人名称" align="center" min-width="80" />
            <el-table-column prop="compName" label="客户名称" align="center" min-width="80" />
            <el-table-column prop="areaName" label="地区归属" align="center" min-width="100" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" min-width="100" /> -->
            <el-table-column label="名单属性" align="center" width="100">
              <template slot-scope="scope">
                <span>{{(scope.row.compRiskLevel)}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100" label="归属支行" align="center">
              <template slot-scope="scope">
                <span>{{(scope.row.orgName)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="60" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="success" size="small" @click.native.prevent="usersearchfn" v-if="showtab==2&&mark_paifa" style="margin-bottom:10px">任务派发</el-button>
          <el-table :data="dataList" :row-key="getRowKeys" highlight-current-row ref="multipleTable" @selection-change="handleSelectionChange" key="2" v-if="showtab==2" v-loading.fullscreen="loading">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="marketNumber" label="工单编号" align="center" min-width="80" />
            <el-table-column prop="compLegalName" label="法人名称" align="center" min-width="70" />
            <el-table-column prop="compName" label="客户名称" align="center" min-width="60" />
            <el-table-column prop="areaName" label="地区归属" align="center" min-width="60" />
            <el-table-column label="名单属性" align="center" width="80">
              <template slot-scope="scope">
                <span>{{(scope.row.compRiskLevel)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="orderDivision(scope.row)" v-if="mark_paifa">工单派发</el-button>
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="4" v-if="showtab==4" v-loading.fullscreen="loading">
            <el-table-column prop="compNumber" label="工单编号" align="center" min-width="80" />
            <el-table-column prop="compName" label="客户名称" align="center" min-width="70" />
            <el-table-column prop="compLegalName" label="法人名称" align="center" min-width="60" />
            <el-table-column prop="areaName" label="地区归属" align="center" min-width="60" />
            <el-table-column prop="compRiskLevel" label="名单属性" align="center" min-width="60" />
            <el-table-column prop="orgName" label="归属支行" align="center" min-width="100" />
            <el-table-column align="center" width="60" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="6" v-if="showtab==6" v-loading.fullscreen="loading">
            <el-table-column prop="marketNumber" label="工单编号" align="center" />
            <el-table-column prop="compLegalName" label="法人名称" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center">
            </el-table-column>
            <el-table-column label="名单属性" align="center" prop="compRiskLevel" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column align="center" width="60" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </data-list>
    </page-template>
    <el-dialog title="企业区域划分" :visible.sync="dialogVisible" width="400px">
      <el-form ref="formInline" :model="formInline" label-width="80px" :rules="rules">
        <el-form-item label="客户名称" prop="remark">
          <el-input v-model="formInline.compName" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="归属支行">
          <el-select v-model="formInline.orgId" placeholder="请选择">
            <el-option v-for="item in breanchlist" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="postareaDivision()" :disabled="flag">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="营销人员指派" :visible.sync="dialogVisible2" width="400px">
      <el-form ref="formInline2" :model="formInline2" label-width="80px" :rules="rules">
        <div class="usermar">
          请为<i>{{usernum}}</i>家企业指派营销人员
        </div>
        <el-form-item label="营销人员: ">
          <el-select v-model="formInline2.userId" placeholder="请选择">
            <el-option v-for="item in $store.state.usersearch" :key="item.id" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="postorderDivisions()" :disabled="flag">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="营销人员指派" :visible.sync="dialogVisible3" width="400px">
      <el-form ref="formInline3" :model="formInline3" label-width="80px" :rules="rules">
        <el-form-item label="客户名称" prop="remark">
          <el-input v-model="formInline3.compName" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="营销人员: ">
          <el-select v-model="formInline3.userId" placeholder="请选择">
            <el-option v-for="item in $store.state.usersearch" :key="item.id" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="postorderDivision()" :disabled="flag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'
import formvalid from '@/utils/formvalidate.js'

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
        arr.push({ label: el.levelName, value: el.id })

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
        label: "名单属性: ",
        type: 'select',
        field: 'compRiskLevel',
        options: [{
            label: '红名单',
            value: '1'
          }, {
            label: '白名单',
            value: '2'
          }, {
            label: '灰名单',
            value: '3'
          }

        ]
      }]
    },
    tabOptions(){
      let authData = this.$store.state.authData
      let menu = authData.find(item => {return item.name==='营销工单'})
      if(!menu) return []
      let menuId = menu.menuId
      let names = []
      authData.forEach(item => {
        if(item.parantId==menuId){
          names.push(item.perms)
        }
      })
      let options = this.tabArray.filter(item => {
        return names.indexOf(item.code) > -1
      })
      return options
    },
    mark_dqhf(){
      let authData = this.$store.state.authData
      return !!authData.find(item => {return item.perms==='mark-dqhf'})
    },
    mark_paifa(){
      let authData = this.$store.state.authData
      return !!authData.find(item => {return item.perms==='mark-paifa'})
    }
  },
  watch: {
    // 刷新页面的时候，权限数据会异步重新加载，tab会延迟显示
    tabOptions(newValue){
      if(newValue.length > 0){
        let values = newValue.map(item => {return item.value})
        if(values.indexOf(this.$route.params.state) == -1){
          this.$router.replace({name:this.$route.name, query:this.$route.query,params:{state: newValue[0].value}})
        }
        else{
          this.showtab = this.$route.params.state
        }
      }
    }
  },
  data() {
    return {
      getRowKeys(row) {
        return row.id;
      },
      flag: false,
      loading: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      formInline: {
        id: '',
        orgId: ''
      },
      formInline2: {
        ids: [],
        userId: ''
      },
      formInline3: {
        userId: '',
        id: ''
      },
      dataList: [],
      breanchlist: [],
      total: 0,
      tabArray: [
        { label: "待分发", value: "0", path: '/marketingworkorder/0',code:'mark-wait2' },
        { label: "待抢单", value: "1", path: '/marketingworkorder/1',code:'mark-qiang' },
        { label: "待派发", value: "2", path: '/marketingworkorder/2',code:'mark-wait' },
        { label: "营销中", value: "4", path: '/marketingworkorder/4',code:'mark-ing' },
        { label: "已完成", value: "6", path: '/marketingworkorder/6',code:'mark-finish' }
      ],
      positionPath: [{ name: '工单管理' }, { name: '营销工单' }],
      rules: {
        remark: [
          { validator: formvalid.remark, trigger: 'change' }
        ]
      },
      showtab: 0,
      select_orderId: [],
      usernum: ''
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
      this.dataList = []
      this.tabOptions.length
      console.log(this.tabOptions.length)
      api.searchMarketOrderList({ pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }).
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
    usersearchfn() {
      this.dialogVisible2 = true
      this.flag = false

      this.formInline2.ids = []
      this.formInline2.userId = this.$store.state.usersearch[0].id
      this.usernum = this.select_orderId.length
      this.select_orderId.map(el => this.formInline2.ids.push(el))
    },
    postorderDivisions() {
      if (!this.formInline2.ids.length) {
        this.$message.warning('请选择任务')
        return
      }
      if (this.flag) {
        return
      }
      this.flag = true
      api.orderDivisions(this.formInline2).
      then((res) => {
        if (res.data.code == '0') {
          this.$message.success('派发成功')
          this.dialogVisible2 = false;
          this.select_orderId = []
          this.$router.push(this.$route.path)


        } else {
          this.flag = false
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.flag = false
        console.log(err)
      })

    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows;
      this.select_orderId = [];
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.id);
          }
        });
      }

    },
    customerinfo(id) {
      this.$router.push({ name: '工单详情', query: { id: id.compId, ismange: 2,paths:1 } })
    },
    areaDivision(data) {
      this.dialogVisible = true
      this.formInline.compName = data.compName
      this.formInline.id = data.id
      this.flag = false

      api.searchOrgByArea({ areaId: data.areaId }).
      then((res) => {
        if (res.data.code == '0') {

          this.breanchlist = res.data.message
          this.formInline.orgId = this.breanchlist[0].id
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    orderDivision(data) {
      this.dialogVisible3 = true
      this.formInline3.compName = data.compName
      this.formInline3.id = data.id
      this.formInline3.userId = this.$store.state.usersearch[0].id
      this.flag = false
    },
    getData(params) {
         // this.loading = false
      params.status = this.$route.params.state
      if(params.status == '' || this.tabOptions.length ==0){
        return false;
      }
      api.searchMarketOrderList(params).
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
    postareaDivision() {
      if (this.flag) {
        return
      }
      this.flag = true
      api.areaDivision(this.formInline).
      then((res) => {
        if (res.data.code == '0') {
          this.$message.success('操作成功')
          this.$router.push(this.$route.path)

          this.dialogVisible = false

        } else {
          this.flag = false

          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.flag = false

        console.log(err)
      })
    },
    postorderDivision() {
      if (this.flag) {
        return
      }
      this.flag = true

      api.orderDivision(this.formInline3).
      then((res) => {
        if (res.data.code == '0') {
          this.$message.success('派发成功')
          this.dialogVisible3 = false
          this.$router.push(this.$route.path)

        } else {
          this.$message.error(res.data.message)
          this.flag = false
        }
      }).catch((err) => {
        this.flag = false

        console.log(err)
      })
    },

  },
  created() {
    if(this.tabOptions.length > 0){
      let values = this.tabOptions.map(item => {return item.value})
      if(values.indexOf(this.$route.params.state) == -1){
        this.$router.replace({name:this.$route.name, query:this.$route.query,params:{state: this.tabOptions[0].value}}) 
      }
      this.showtab = this.$route.params.state
    }
    else{
      this.showtab = ''
    }
  }
}

</script>
<style scoped lang="scss">
.usermar {
  margin: 0 0 10px 80px;

  i {
    color: red
  }
}

.common-list-page.basedCost {
  padding: 0;

  .el-table {
    .cell {
      font-size: 14px;
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
