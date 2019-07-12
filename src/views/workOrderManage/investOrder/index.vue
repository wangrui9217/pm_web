<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="1" v-if="showtab==1" v-loading.fullscreen="loading">
            <el-table-column prop="surveyNumber" label="工单编号" align="center" :formatter="el=>el.surveyNumber.indexOf('||')=='-1'?el.surveyNumber:el.surveyNumber.split('||')[1]" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <!-- <el-table-column prop="firstIndustry" label="行业归属" align="center" /> -->
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <!-- <el-table-column prop="orgName" label="所属支行" align="center" /> -->
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="preCreditAmount" label="预授信金额" align="center" />
            <el-table-column prop="totalCreditAmount" label="正式授信金额" align="center" />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="gotoInvestSheetInfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="2" v-if="showtab==2" v-loading.fullscreen="loading">
            <el-table-column prop="surveyNumber" label="工单编号" align="center" :formatter="el=>el.surveyNumber.indexOf('||')=='-1'?el.surveyNumber:el.surveyNumber.split('||')[1]"/>
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <el-table-column prop="firstIndustry" label="行业归属" align="center" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="preCreditAmount" label="预授信金额" align="center" />
            <el-table-column prop="totalCreditAmount" label="正式授信金额" align="center" />
            <el-table-column prop="surveyUserName" label="调查人员" align="center" />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="gotoInvestSheetInfo(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <el-table :data="dataList" highlight-current-row ref="multipleTable" key="3" v-if="showtab==3" v-loading.fullscreen="loading">
            <el-table-column prop="surveyNumber" label="工单编号" align="center" :formatter="el=>el.surveyNumber.indexOf('||')=='-1'?el.surveyNumber:el.surveyNumber.split('||')[1]" />
            <el-table-column prop="compName" label="客户名称" align="center" />
            <el-table-column prop="creditNo" label="统一社会信用编码" align="center" />
            <el-table-column prop="firstIndustry" label="行业归属" align="center" />
            <el-table-column prop="areaName" label="地区归属" align="center" />
            <el-table-column prop="orgName" label="所属支行" align="center" />
            <el-table-column prop="compCreditLevel" label="客户信用评级" align="center" />
            <el-table-column prop="preCreditAmount" label="预授信金额" align="center" />
            <el-table-column prop="totalCreditAmount" label="正式授信金额" align="center" />
            <el-table-column prop="surveyUserName" label="调查人员" align="center" />
            <el-table-column prop="guaranteeType" label="保证方式" align="center" />
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="gotoInvestSheetInfo(scope.row)">详情</el-button>
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
    }
  },
  data() {
    return {
      loading: true,
      dataList: [],
      total: 0,
      tabOptions: [
        { label: "待抢单", value: "1" },
        { label: "调查中", value: "2" },
        { label: "已完成", value: "3" }
      ],
      positionPath: [{ name: '工单管理' }, { name: '调查工单' }],
      showtab: 0
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
      let data = { pageSize: this.$store.state.pagesizes, pageNum: 1, status: val }
      api.getInvestOrderList(data).
      then((res) => {
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.dataList.forEach((item,i) => {
            item.index = i+1 + data.pageSize*(data.pageNum-1)
            //item.guaranteeType = item.guaranteeType?['','保证','抵押','质押','定金'][item.guaranteeType]:''
          })
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
      api.getInvestOrderList(params).
      then((res) => {
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.dataList.forEach((item,i) => {
            item.index = i+1 + params.pageSize*(params.pageNum-1)
          })
          this.total = res.data.message.total
          this.loading = false

        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loading = false
      })
    },
    gotoInvestSheetInfo(row) {
      sessionStorage.setItem('investInfo', JSON.stringify(row))
      this.$router.push({ name: '调查工单详情'})
    }

  },
  created() {
    this.showtab = this.$route.params.state
  }
}

</script>
<style scoped lang="scss">
</style>
