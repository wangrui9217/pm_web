<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true" :add_on_off="true" @changgestate="changestate" @addEvent="add()">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" ref="multipleTable" highlight-current-row row-key="id" @selection-change="handleSelectionChange">
            <el-table-column type="selection" :reserve-selection="true" width="50" align="center">
            </el-table-column>
            <el-table-column prop="protocolNo" label="协议编号" align="center" />
            <el-table-column prop="protocolName" label="协议名称" align="center" />
            <el-table-column prop="version" label="版本" align="center" />
            <el-table-column prop="type" label="协议类型" align="center" />
            <el-table-column width="80" align="center" label="启用状态">
              <template slot-scope="scope">
                <span :class="[scope.row.state == 'ON' ? 'success-color' : 'danger-color']">{{ scope.row.state=="ON" ? "启用" : "停用" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" />
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="edittemp(scope.row)">编辑模板</el-button>
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
import * as types from '@/store/mutation-types'
export default {
  data() {
    return {
      dataList: [],
      total: 0,
      positionPath: [{ name: '协议管理' }, { name: '协议模板管理' }],
      select_orderId: []
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  computed: {
    filters() {
      return [{
          label: "协议类型 : ",
          type: "select",
          field: "type",
          options: this.$store.getters.protocolTypeListSelect
        },
        {
          label: false,
          placeholder: '请输入协议名称',
          type: 'input',
          field: 'protocolName'
        },
      ]
    }
  },
  methods: {
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
    changestate(state) {
      if (!this.select_orderId) {
        this.$message({
          message: '请选择一条模板',
          type: 'warning'
        });
        return
      }
      if (state == 1) {
        this.$confirm("此操作将停用此模板, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          api.protocolBatchChange({ ids: this.select_orderId, state: 'OFF' })
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: '停用成功',
                  type: 'success'
                });
                this.$refs.multipleTable.clearSelection();
                this.$router.push(this.$route.path)
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
              }
            }).catch(err => {
              console.log(err);
            });
        })
      } else {

        api.protocolBatchChange({ ids: this.select_orderId, state: 'ON' })
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '启用成功',
                type: 'success'
              });
              this.$refs.multipleTable.clearSelection();
              this.$router.push(this.$route.path)
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          }).catch(err => {
            console.log(err);
          });
      }
    },
    edittemp(data) {
      sessionStorage.setItem('protocolInfo', JSON.stringify(data))
      this.$router.push({ name: '新增协议模板', query: {id:data.id} })
    },
    add() {
      this.$router.push({ name: '新增协议模板' })
    },
    getData(params) {
      api.getProtocolList(params).
      then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
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
    }
  },
  created() {
    if (this.$store.state.protocolTypeList.length == 0) {
      this.$store.dispatch(types.PROTOCOL_TYPE_LIST)
    }
  }
}

</script>
<style lang="scss">
</style>
