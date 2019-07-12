<template>
  <div class="common-list-page basedCost" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" key="1" v-if="showtab==1" >
            <el-table-column prop="orderNum" label="工单编号" align="center" />
            <el-table-column prop="applyNum" label="授信编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center"/>
            <el-table-column prop="applyUserName" label="申请人" align="center"/>
            <el-table-column prop="roleName" label="申请人角色" align="center" :formatter="getRoleName"/>
            <el-table-column prop="applyUserIdNo" label="申请人身份证" align="center"/>
            <el-table-column prop="applyUserPhone" label="联系电话" align="center" />
            <el-table-column prop="createTime" label="工单生成时间" align="center"  />
            <!-- <el-table-column prop="createTime" label="工单开始时间" align="center">
              <template slot-scope="scope">-</template>
            </el-table-column> -->
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="gotoInfo(scope.row)">数据录入</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="dataList" key="2" v-if="showtab==2">
            <el-table-column prop="orderNum" label="工单编号" align="center" />
            <el-table-column prop="applyNum" label="授信编号" align="center" />
            <el-table-column prop="compName" label="客户名称" align="center"/>
            <el-table-column prop="applyUserName" label="申请人" align="center"/>
            <el-table-column prop="roleName" label="申请人角色" align="center" :formatter="getRoleName"/>
            <el-table-column prop="applyUserIdNo" label="申请人身份证" align="center"/>
            <el-table-column prop="applyUserPhone" label="联系电话" align="center" />
            <el-table-column prop="createTime" label="工单生成时间" align="center"  />
            <!-- <el-table-column prop="createTime" label="工单开始时间" align="center"  /> -->
            <el-table-column prop="finishTime" label="工单完成时间" align="center"  />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="gotoInfo(scope.row, 'readonly')">详情</el-button>
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
export default {
  computed: {

  },
  data() {
    return {
      loading: true,
      dataList: [],
      total: 0,
      tabOptions: [
        { label: "未执行", value: "1" },
        { label: "已执行", value: "2" }
      ],
      roleNameArr: ['未认证角色','法人','法人配偶','自然人股东','企业股东','会计'],
      positionPath: [{ name: '工单管理' }, { name: '个人央行征信录入工单' }],
      showtab: 0,
      filters: [{
        label: "客户名称：",
        type: "input",
        field: "compName",
        placeholder: '请输入客户名称'
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
      api.getOrderListBciPerson({ pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }).
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
      this.loading = false
      params.status = this.$route.params.state
      api.getOrderListBciPerson(params).
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
    getRoleName(row,column,v){
      return this.roleNameArr[v]
    },
    gotoInfo(row, type) {
      if(type){
        row.readonly = true
      }
      sessionStorage.setItem('centralBankOrderInfo', JSON.stringify(row))
      this.$router.push({ name: '个人央行征信录入工单详情', query: { id: row.id } })
    },
  },
  created() {
    this.showtab = this.$route.params.state
  }
}

</script>
<style scoped lang="scss">
</style>
