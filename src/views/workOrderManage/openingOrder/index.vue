<template>
  <div class="common-list-page">
    <page-template :position-path="positionPath" :toolTitle="true" >
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="1" v-if="showtab==1" v-loading.fullscreen="loading">
            <el-table-column prop="orderNo" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="customerPhone" label="手机号码" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="registerAddress" label="企业注册地址" align="center" />
          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="2" v-if="showtab==2" v-loading.fullscreen="loading">
            <el-table-column prop="orderNo" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="customerPhone" label="手机号码" align="center" />
            <el-table-column prop="registerAddress" label="企业注册地址" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="orderPerformer" label="工单执行者" align="center" />
            
          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="3" v-if="showtab==3" v-loading.fullscreen="loading">
            <el-table-column prop="orderNo" label="工单编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="customerPhone" label="手机号码" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="registerAddress" label="企业注册地址" align="center" />
            <el-table-column prop="createTime" label="工单创建时间" align="center" />
            <el-table-column prop="startTime" label="工单开始时间" align="center" />
            <el-table-column prop="orderFinishDate" label="工单结束时间" align="center" />
            <el-table-column align="center" width="200" label="操作">
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
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority'
import formvalid from '@/utils/formvalidate.js'

export default {
  computed: {
    
  },
  data() {
    return {
      loading: true,
      dataList: [],
      total: 0,
      tabOptions: [
        { label: "待抢单", value: "1" },
        { label: "执行中", value: "2" },
        { label: "已完成", value: "3" }
      ],
      positionPath: [{ name: '工单管理' }, { name: '对公开户工单' }],
      showtab: 0,
      filters: [{
        label: "客户名称：",
        type: "input",
        field: "compName"
      }]
      
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
      api.getOpenOrderList({ pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }).
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
      api.getOpenOrderList(params).
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
    gotoInfo(row) {
      sessionStorage.setItem('openOrderInfo', JSON.stringify(row))
      this.$router.push({ name: '开户工单详情', query: { id: row.id } })
    }

  },
  created() {
    this.showtab = this.$route.params.state
  }
}

</script>
<style scoped lang="scss">
</style>
