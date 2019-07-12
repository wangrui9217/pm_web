<template>
  <div class="common-list-page product_info" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="用信记录">
      <data-list ref="dataList" @data-refresh="getData" :toolFilterReceive="true" :filters="filters" :total="total">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table ref="multipleTable" :data="dataList" >
            <el-table-column label="业务编号" prop="loanNo" align="center" min-width="50"/>
            <el-table-column label="客户名称" prop="compName" align="center" min-width="50"/>
            <el-table-column label="法人名称" prop="legalName" align="center" width="60"/>
            <el-table-column label="法人身份证" prop="legalIdno" align="center" min-width="50"/>
            <el-table-column label="电子合同编号" prop="ownContractNo" align="center" min-width="50"/>
            <el-table-column label="借据号" prop="outContractNo" align="center" min-width="50"/>
            <el-table-column label="手机" prop="legalPhone" align="center" min-width="50"/>
            <el-table-column label="授信金额" prop="creditAmount" align="center" min-width="50"/>
            <el-table-column label="授信有效期" prop="creditValidTime" align="center" min-width="50"/>
            <el-table-column label="用信金额" prop="loanAmount" align="center" min-width="50"/>
            <el-table-column label="期限" prop="productLoanTrem" align="center" width="70"/>
            <el-table-column label="用信状态" prop="status" align="center" width="80" :formatter="getStatus"/>
            <el-table-column label="放款金额" prop="actualLoanAmount" align="center" min-width="50"/>
            <el-table-column label="放款时间" prop="loanTime" align="center" width="75"/>
            <el-table-column label="异常原因" prop="loanFailReason" align="center" min-width="50"/>
            <el-table-column label="用款申请时间" prop="applyTime" align="center" width="75"/>
            <el-table-column label="操作" align="center" width="70">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.outContractNo" type="text" size="small" @click.native.prevent="openDialog(scope.row)">借据号</el-button>
                <el-button type="text" size="small" @click.native.prevent="getProCostByProId(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </data-list>
    </page-template>
    <el-dialog title="借据号录入" :visible.sync="showDialog" width="600px" :close-on-click-modal="false">
      <el-row>
        <el-col :span="10">
          <span>业务编号：</span><b>{{recordObj.loanNo}}</b>
        </el-col>
        <el-col :span="14">
          <span>客户名称：</span><b>{{recordObj.compName}}</b>
        </el-col>
        <el-col :span="10">
          <span>贷款金额：</span><b>{{recordObj.loanAmount}}</b>
        </el-col>
        <el-col :span="14">
          <span>贷款期限：</span><b>{{recordObj.productLoanTrem}}</b>
        </el-col>
        <el-col :span="20" style="margin-top: 10px;">
          <el-form :model="form" ref="form" label-width="130px" >
            <el-form-item label="借据号" prop="number" :rules="{required: true, message: '请输入借据号'}">
              <el-input v-model="form.number" :maxLength="50" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div style="text-align: center;">
        <el-button type="default" @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'

export default {
  data() {
    return {
      loading: false,
      positionPath: [{ name: '用信记录' }, { name: '贷款用信记录' }], //路径信息
      filters: [{
          label: "放款状态：",
          type: "select",
          field: "status",
          options: [
            { label: "全部", value: "" },
            { label: "待放款", value: "1" },
            { label: "放款中", value: "2" },
            { label: "放款成功", value: "3" },
            { label: "放款失败", value: "4" },
            { label: "放款异常", value: "5" }
          ]
        },
        {
          label: false,
          placeholder: '法人名称/手机/身份证',
          type: 'input',
          field: 'condition'
        },
      ], //筛选配置
      total: 0, //总数
      dataList: [],
      showDialog: false,
      form: {
        number: ''
      },
      recordId: '',
      recordObj: {}
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  watch: {
    
  },
  activated() {
    
  },
  methods: {
    getData(params) {

      let data = Object.assign({
      }, params)
      api.getLoanRecordList(data).then((res) => {
        if (res.data.code == 0) {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
        } else {
          this.$message.error("请求失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getProCostByProId(row) {
      //处理
      sessionStorage.setItem('loanRecordsInfo', JSON.stringify(row))
      this.$router.push({ path: '/loanRecordsInfo'})
    },
    getStatus(row,column,value){
      return ['', '待放款','放款中','放款成功','放款失败','放款异常'][value]
    },
    openDialog(row){
      this.form.number = ''
      this.recordObj = row
      this.recordId = row.id
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    submit(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          this.loading = true
          api.updateContractNo({
            "outContractNo": this.form.number,
            "recordId": this.recordId
          }).then(({data}) => {
            this.loading = false
            if(data.code == 0){
              this.$message.success('操作成功')
              this.showDialog = false
              this.$router.replace(this.$route.path)
            }
            else{
              this.$message.error(data.message)
            }
          })
        }
      })
      
    }

  }
}

</script>
<style lang="less" scoped>
.el-col{
  padding: 15px 0;
  span{
    padding-left: 5px;
    color: #000;
  }
  b{
    color: #666;
    font-weight: normal;
  }
}
</style>
