<template>
  <div class="common-list-page">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="协议签署记录">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row>
            <el-table-column prop="index" label="序号" align="center" width="50" />
            <el-table-column prop="signComp" label="客户名称" align="center" />
            <el-table-column prop="signName" label="签署人名称" align="center" />
            <el-table-column prop="protocolName" label="协议名称" align="center" />
            <el-table-column prop="protocolType" label="协议类型" align="center" >
            </el-table-column>
            <el-table-column prop="protocolVersion" label="协议版本号" align="center"/>
            <el-table-column prop="signCodeName" label="签署节点" align="center" />
            <el-table-column prop="signPhone" label="手机号码" align="center" />
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

export default {
  data() {
    return {
      dataList: [],
      total: 0,
      filters: [{
          label: false,
          placeholder: '请输入手机号码',
          type: 'input',
          field: 'signPhone',
        },
      ],
      positionPath: [{ name: '协议管理' }, { name: '协议签署记录' }],
    }

  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  methods: {
    getData(params) {
      api.getProtocolRecordList(params).
      then((res) => {
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.dataList.forEach((item,i) => {
              item.index = i+1 + params.pageSize*(params.pageNum-1)
            })
          this.total = res.data.message.total
        } else {
          this.$message.error('请求失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}

</script>
<style lang="scss">
</style>
