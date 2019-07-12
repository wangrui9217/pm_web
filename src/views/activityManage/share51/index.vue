<template>
  <div class="common-list-page product_info" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath" :toolTitle="true" >
      <data-list ref="dataList" @data-refresh="getData" @stop-useing="stopUseing" @start-useing="startUseing" @to-add-activity="toAddActivity" :toolFilterReceive="true" :filters="filters" :addActivity="true" :total="total">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table ref="multipleTable" :data="dataList" @selection-change="handleSelectionChange" row-key="id">
            <el-table-column type="selection" width="50" :reserve-selection="true"/>
            <el-table-column label="活动标题" align="center">
              <template slot-scope="scope">
                {{scope.row.contentTitle}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="启用状态">
              <template slot-scope="scope">
                <span :class="[scope.row.status == '1' ? 'success-color' : 'danger-color']">{{ scope.row.status=="1" ? "启用" : "停用" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="updateName" label="更新人" align="center" />
            <el-table-column label="更新时间" align="center" prop="updateTime">
            </el-table-column>
            <el-table-column width="100" align="center" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native="dealwith(scope.row)">编辑</el-button>
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
import _ from "lodash";

export default {
  data() {
    return {
      loading: false,
      positionPath: [{ name: '活动管理' }, { name: '我要分享' }], //路径信息
      filters: [{
          label: "启用状态：",
          type: "select",
          field: "status",
          options: [
            { label: "全部", value: "" },
            { label: "启用", value: "1" },
            { label: "停用", value: "0" },
          ]
        },
        {
          label: false,
          placeholder: '活动标题',
          type: 'input',
          field: 'contentTitle'
        },
      ], //筛选配置
      total: 0, //总数
      multipleSelection: [], //复选框勾选的数组对象
      pids: [], //复选框勾选的值
      pidsStatus: [], //复选框勾选的启用状态
      dataList: []
    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  watch: {
    multipleSelection(val) {
      this.pids.splice(0, this.pids.length); //清空数组
      this.pidsStatus.splice(0, this.pidsStatus.length); //清空数组
      val.filter(item => {
        this.pids.push(item.id) //重新赋值
        this.pidsStatus.push(item.status)
      })
      this.pidsStatus = _.uniqBy(this.pidsStatus)
    },
  },
  activated() {
    
  },
  methods: {
    getData(params) {

      let data = Object.assign({
        //"contentTitle": "",
        "contentType": 1,
        //"noticeType": 0,
        //"pageNum": 0,
        //"pageSize": 0,
        //"status": "string"
      }, params)
      //产品列表
      api.getEventList(data).then((res) => {
        if (res.data.code == 0) {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    handleSelectionChange(val) {
      var _this = this;
      //复选框赋值
      _this.multipleSelection = val
    },

    toggleSelection(rows) {
      //选择和取消勾选
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //停用
    stopUseing() {
      if (this.pidsStatus.length == 0) {
        //没有数据
        this.$message.warning("请选择需要停用的活动！")
        return;
      }
      var params = {
        ids: this.pids,
        status: 0,
        contentType: 1
      }
      this.changeEventStatus(params)
    },
    //启用
    startUseing() {
      if (this.pidsStatus.length == 0) {
        //没有数据
        this.$message.warning("请选择需要启动的活动！")
        return;
      }
      var params = {
        ids: this.pids,
        status: 1,
        contentType: 1
      }
      this.changeEventStatus(params)
    },
    changeEventStatus(params){
      this.loading = true
      api.changeEventStatus(params).then((res) => {
        this.loading = false
        if (res.data.code == 0) {
          this.$message.success("操作成功");
          this.$refs.multipleTable.clearSelection();
          this.$router.push(this.$route.path)
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    toAddActivity(){
      this.$router.push({ path: '/add-share51' })
    },
    dealwith(row) {
      //处理
      sessionStorage.setItem('activityInfo', JSON.stringify(row))
      this.$router.push({ path: '/edit-share51'})
    }

  }
}

</script>
<style lang="less" scoped>
</style>
