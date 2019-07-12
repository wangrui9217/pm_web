<template>
  <div class="common-list-page product_info" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="内容管理">
      <data-list ref="dataList" @data-refresh="getData" :toolFilterReceive="true" :filters="filters" :total="total">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table ref="multipleTable" :data="dataList">
            <el-table-column prop="index" label="序号" width="50" align="center"/>
            <el-table-column prop="audioNumber" label="业务编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="legalName" label="法人名称" align="center" width="70"/>
            <el-table-column prop="legalNo" label="身份证" align="center" />
            <el-table-column prop="legalPhone" label="手机" align="center" width="85"/>
            <el-table-column prop="productName" label="申请产品" align="center" />
            <el-table-column prop="loanAmount" label="申请金额" align="center" />
            <el-table-column prop="productTerm" label="申请期限" align="center" width="70"/>
            <el-table-column prop="status" label="审批状态" align="center" :formatter="getStatus" width="70"/>
            <el-table-column prop="applyTime" label="申请时间" align="center" min-width="75"/>
            <el-table-column prop="finishTime" label="完成时间" align="center" min-width="75"/>
          </el-table>
        </div>
      </data-list>
    </page-template>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'
import _ from "lodash";

export default {
  data() {
    return {
      loading: false,
      positionPath: [{ name: '审批管理' }, { name: '系统审批记录' }], //路径信息
      filters: [
        {
          label: false,
          placeholder: '法人名称/手机/身份证',
          type: 'input',
          field: 'condition'
        },
      ], //筛选配置
      total: 0, //总数
      dataList: []
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  methods: {
    getData(params) {

      let data = Object.assign({}, params)
      api.getRecordList(data).then((res) => {
        if (res.data.code == 0) {
          this.dataList = res.data.message.list
          this.dataList.forEach((item,i) => {
            item.index = i+1 + data.pageSize*(data.pageNum-1)
          })
          this.total = res.data.message.total
        } else {
          this.$message.error("请求失败")
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getStatus(row,column,value){
      return ['审批拒绝', ' 审批通过'][Number(value)]
    },
  }
}

</script>
<style lang="less" scoped>
</style>
