<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="日志管理">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row>
            <el-table-column type="index" label="序号" align="center" :index="indexMethod"/>
            <el-table-column prop="operTitle" label="日志标题" align="center" />
            <el-table-column prop="operUserip" label="操作IP地址" align="center" />
            <el-table-column prop="operUri" label="请求URI" align="center" min-width="120" />
            <el-table-column prop="operParams" label="输入参数" align="center" min-width="150">
            </el-table-column>
            <!-- <el-table-column
              prop="result"
              label="输出参数"
              align="center"
            /> -->
            <el-table-column prop="operName" label="操作人" align="center" />
            <el-table-column prop="operTime" label="操作时间" align="center" />
            <el-table-column align="center" min-width="60" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native="credtinfo(scope.row)">查看</el-button>
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
  data() {
    return {
      dialogVisible: false,
      dataList: [],
      total: 0,
      filters: [{
          label: false,
          placeholder: '日志标题/操作IP地址',
          type: 'input',
          field: 'condition'
        },

      ],
      positionPath: [{ name: '系统管理' }, { name: '日志管理' }],
      pageSize: 0,
      pageNo: 0
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  methods: {
    credtinfo(data) {

      this.$router.push({ name: '日志管理详情', query: { result: JSON.stringify(data) } })
    },
    getData(params) {
      this.pageSize = params.pageSize
      this.pageNo = params.pageNum
      api.dateLogList(params).
      then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
        } else {
          this.$message.error('请求失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    indexMethod(index){
      return index+1 + this.pageSize*(this.pageNo-1)
    }
  }
}

</script>
<style lang="scss">
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
