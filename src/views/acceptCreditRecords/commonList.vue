<template>
  
      <data-list ref="dataList" @data-refresh="getData" :toolFilterReceive="true" :filters="filters" :total="total">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table ref="multipleTable" :data="dataList">
            <el-table-column prop="creditNumber" label="授信编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="compCreditNo" label="统一社会信用号码" align="center" />
            <el-table-column prop="legalName" label="法人名称" align="center" />
            <template v-if="type==1">
              <el-table-column prop="creditAmount" label="预授信额度" align="center" />
              <el-table-column prop="validTime" label="授信有效期" align="center" />
              <el-table-column prop="rejectReason" label="拒绝原因" align="center" />
            </template>
            <template v-else-if="type==2">
              <el-table-column prop="creditAmount" label="正式授信额度" align="center" />
              <el-table-column prop="validTime" label="授信有效期" align="center" />
              <el-table-column prop="rejectReason" label="拒绝原因" align="center" />
              <el-table-column prop="creditTime" label="授信日期" align="center" />
              <el-table-column prop="applyTime" label="申请日期" align="center" />
            </template>
            <template v-else-if="type==3">
              <el-table-column prop="creditAmount" label="正式授信额度" align="center" />
              <el-table-column prop="lowRiskCreditAmount" label="贴现额度" align="center" />
              <el-table-column prop="validTime" label="授信有效期" align="center" />
              <el-table-column prop="rejectReason" label="拒绝原因" align="center" />
              <el-table-column prop="creditTime" label="授信日期" align="center" />
              <el-table-column prop="applyTime" label="申请日期" align="center" />
            </template>
          </el-table>
        </div>
      </data-list>
    
</template>
<script>
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'

export default {
  props: {
    type: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      filters: [
        {
          label: false,
          placeholder: '客户名称/统一社会信用编码',
          type: 'input',
          field: 'condition',
          width: '260px'
        },
      ], //筛选配置
      total: 0, //总数
      dataList: []
    }
  },
  components: {
    'data-list': DataList
  },
  methods: {
    getData(params) {
      let data = Object.assign({type: this.type}, params)
      api.getAcceptCreditRecord(data).then((res) => {
        if (res.data.code == 0) {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}

</script>
<style lang="less" scoped>
</style>
