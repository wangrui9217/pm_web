<template>
  <div class="el-card__body menuList">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="部门管理">
         <data-list
          ref="dataList"
          @get-add-menu="getAddMenu"
          :toolFilterReceive="true"
          :addMenu="true"
          :filters="filters"
          >
          <div style="width: 100%;padding:0 10px;background:#fff;border-bottom: 1px solid #e9eaec;">
              <zk-table
        v-loading = "loading"
        ref="table"
        sum-text="sum"
        index-text="#"
        :cell-style="props.cellstyle"
        :data="TreeRowLists"
        :columns="TreeColLists"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType">
        <template slot-scope="scope" slot="action">
          <el-button type="text" size="medium" @click.native="updateFunction(scope.row)">修改</el-button>
          <el-button type="text" size="medium" @click="read(scope.row)">查看</el-button>
        </template>
      </zk-table>
          </div>
        </data-list>
    </page-template>
    <!-- 新增部门弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="showAddDialog" width="800px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form :model="addform" label-width="120px" label-position="right" ref="addform" class="style-dept" size="small">
          <el-form-item label="部门排序号：" prop="orderNum" :rules="rules.orderNum" >
              <el-input v-model="addform.orderNum" :maxLength="10"></el-input><span>非负整数，用于同一级次部门排序</span>
          </el-form-item>
          <el-form-item label="部门名称：" prop="name" :rules="rules.orgName">
              <el-input v-model.trim="addform.name" :maxLength="50"></el-input>
          </el-form-item>
          <el-form-item label="上级部门：" prop="parantId" :rules="rules.parantDept">
            <el-input v-model="addform.parantId" type="hidden" style="display: none"></el-input>
            <el-cascader
              :options="parantDepts"
              v-model="selectedOptions"
              :props="cascaderProps"
              filterable
              change-on-select
              clearable
              @change="getParantDept"
              style="width: 250px;"
              readOnly="readOnly"
            ></el-cascader>
            
          </el-form-item>
          <el-form-item label="部门类型：" prop="orgType" :rules="rules">
              <el-select v-model="addform.orgType" placeholder="请选择" style="width: 250px;">
                <el-option label="事业部" value="1"></el-option>
                <el-option label="行方机构" value="2"></el-option>
                <el-option label="部门" value="3"></el-option>
                <!-- 1 事业部  2 行方机构 3部门 -->
              </el-select>
          </el-form-item>
          <el-form-item label="部门主管：" prop="custodianName" :rules="rules.custodianName">
              <el-input v-model.trim="addform.custodianName" readOnly="readOnly"></el-input>
              <span class="g-link" @click="openSelectUser('选择部门主管')"><i class="el-icon-circle-plus-outline"></i>添加</span>
          </el-form-item>
          <el-form-item label="部门助理：" >
              <el-input v-model.trim="addform.assistantName" readOnly="readOnly"></el-input>
              <span class="g-link" @click="openSelectUser('选择部门助理')"><i class="el-icon-circle-plus-outline"></i>添加</span>
          </el-form-item>
          <el-form-item label="所属区域：" prop="areaId" :rules="rules.areaId">
            <el-select v-model="addform.areaId" placeholder="请选择" style="width: 250px;">
                <el-option v-for="item in areas" :label="item.areaName" :value="item.id" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- <el-form-item label="状态：" v-if="dialogTitle === '修改部门'">
            <el-select v-model="addform.status" style="width: 250px;">
              <el-option label="启用" value="NOL" ></el-option>
              <el-option label="停用" value="STP" ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="电话号码：" prop="tel" :rules="rules.tel">
              <el-input v-model.trim="addform.tel"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email" :rules="rules.emailRule">
              <el-input v-model.trim="addform.email"></el-input>
          </el-form-item>
          <el-form-item label="地址：" >
              <el-input v-model.trim="addform.address" :maxLength="100"></el-input>
          </el-form-item>
          <el-form-item label="部门职能：" >
              <el-input type="textarea" :rows="3" :maxLength="100" placeholder="请输入内容" v-model="addform.orgFunction"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" >
        <el-button type="primary" @click="submitAddForm('addform')">保存并提交</el-button>
        <el-button @click="showAddDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <select-user-dialog @comfirm="confirmCheckUser" ref="select-user-dialog" :select-user-dialog="selectUserDialogTitle"></select-user-dialog>
    <!-- 新增部门弹出框 -->
    <el-dialog title="查看部门" :visible.sync="showReadDialog" width="800px" :close-on-click-modal="false">
      <el-form label-width="120px" size="small">
          <el-form-item label="部门名称：">
            <span>{{readForm.name}}</span>
          </el-form-item>
          <el-form-item label="上级部门：" >
            <span>{{readForm.parantName}}</span>
          </el-form-item>
          <el-form-item label="部门类型：" >
              <span>{{readForm.orgType}}</span>
          </el-form-item>
          <el-form-item label="部门主管：">
              <span>{{readForm.custodianName}}</span>
          </el-form-item>
          <el-form-item label="部门助理：" >
              <span>{{readForm.assistantName}}</span>
          </el-form-item>
          <el-form-item label="所属区域：">
            <span>{{readForm.areaName}}</span>
          </el-form-item>
          <el-form-item label="电话号码：" >
              <span>{{readForm.tel}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱：">
            <span>{{readForm.email}}</span>
          </el-form-item>
          <el-form-item label="地址：" >
            <span>{{readForm.address}}</span>
          </el-form-item>
          <el-form-item label="部门职能：" >
            <span>{{readForm.orgFunction}}</span>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from "@/api-authority";
import arrayToTree from "array-to-tree";
import Rules from "@/const/formRules";
import selectUserDialog from "@/components/views/selectUserDialog";
export default {
  name: "function-list",
  components:{
     'data-list': DataList,
      PageTemplate,
      selectUserDialog
  },
  data() {
    return {
      showAddDialog: false,
      showReadDialog: false,
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
        cellstyle: {
          padding: "0"
        }
      },
      TreeColLists: [
        {
          label: "部门名称",
          prop: "name",
          headerAlign: "left",
          align: "center",
          minWidth: '200px'
        },
        {
          label: "部门排序号",
          prop: "orderNum",
          align: "center",
          headerAlign: "center",
          minWidth: "120px"
        },
        {
          label: "部门主管",
          prop: "custodianName",
          align: "center",
          headerAlign: "center",
          minWidth: "120px"
        },
        {
          label: "部门助理",
          prop: "assistantName",
          align: "center",
          headerAlign: "center",
          minWidth: "120px"
        },
        {
          label: "操作",
          minWidth: "120px",
          prop: "action",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "action"
        }
      ],
      addform: {
        orgType: "1",
        orgId: "",
        name: "",
        parantId: '',
        parantName: '',
        status: "NOL",
        custodianName: "",
        custodianId: '',
        assistantId: '',
        assistantName: '',
        orderNum: '',
        areaId: '',
        areaName: '',
        email: '',
        tel: '',
        orgFunction: ''
      },
      readForm: {},
      positionPath: [{name: '系统管理'}, {name: '部门管理'}],
      filters: [],//筛选框配置
      rules: Rules,
      parantMenuName: "",
      selectedOptions: [],
      cascaderProps: {
        children: "children",
        label: "name",
        value: 'orgId'
      },
      lists: [],
      dialogTitle: "新增部门",
      loading: false,
      expandOnClickNode: false,
      parantDepts: [],
      //areas: [],
      userList: [],
      userRealName: '',
      selectUserDialogTitle: ''
    };
  },
  mounted() {
    this.renderLists({}, "flag");
    //this.getAreas()
  },
  computed: {
    TreeRowLists() {
      return arrayToTree(this.lists, {
        parentProperty: "parantId",
        customID: "orgId"
      });
    },
    areas() {
      return this.$store.state.areas
    }
  },
  methods: {
    openSelectUser(titleName){
      this.$refs['select-user-dialog'].openDialog()
      this.selectUserDialogTitle = titleName
    },
    renderLists(params, flag) {
      api.getAllDepts(params)
        .then(res => {
          if (res.data.code == '1') {
            let lists = res.data.data.depts
            lists.forEach(item => {
              if(!item.status){
                item.status = 'NOL'
              }
              if(item.parantId === null){
                item.parantId = 0
              }
            })
            this.lists = lists
            let depts = [{
              parantId: 0,
              orgId: '无',
              name: '无'
            }]
            lists.forEach(item => {
              depts.push(Object.assign({},item))
            })
            if (flag) {
              this.parantDepts = arrayToTree(depts, {
                parentProperty: "parantId",
                customID: "orgId"
              });
            }
          }
        })
        .catch(err => {
          
        });
    },
    confirmCheckUser(row){
      if(this.selectUserDialogTitle === '选择部门主管'){
        this.addform.custodianName = row.realName
        this.addform.custodianId = row.id
      }
      else if(this.selectUserDialogTitle === '选择部门助理'){
        this.addform.assistantName = row.realName
        this.addform.assistantId = row.id  
      }
    },     
    getAddMenu() {
      this.dialogTitle = "新增部门";
      this.showAddDialog = true;
      for(let k in this.addform){
          this.addform[k] = ''
        }
      this.addform.orgType = '1'
      this.selectedOptions = []
      this.$nextTick(() => {
        this.$refs["addform"].clearValidate();
      })
    },
    // emptyform(formName) {
    //   this.showMenuTree = false;
    //   this.$refs[formName].resetFields();
    // },
    getParantDept(arr=''){
      console.log(arr)
      if (arr !== '') {
        let orgId = arr[arr.length - 1]
        let obj = this.lists.find(b => { return b.orgId === orgId })
        if(obj){
          this.addform.parantId = obj.orgId
          this.addform.parantName = obj.name
        }
        else{
          if(arr.length != 0){
            this.addform.parantId = arr[0]
          }
          else{
            this.addform.parantId = ''
          }
          this.addform.parantName = ''
        }
      }
    },
    handleClose() {
      this.showAddDialog = false;
    },
    submitAddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.addform.parantId === '无'){
            this.addform.parantId = 0
          }
          else{
            if(this.addform.parantId == this.addform.orgId){
              this.$message.error('上级部门不能与当前部门一样，请重新选择')
              return false
            }
          }
          if(this.addform.areaId && !this.addform.areaName){
            let o = this.areas.find(item => {return item.id == this.addform.areaId})
            this.addform.areaName = o.areaName
          }
          let params = Object.assign({}, this.addform)
          //if(params.)
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api
            .addOrUpdateDept(params)
            .then(res => {
             loading.close()
              if (res.data.code == '1') {
                this.$message.success("操作成功");
                this.showAddDialog = false;
                this.$refs[formName].resetFields();
                this.renderLists({}, "flag");
              }
              else{
                this.$message.error(res.data.message)
              }
            })
        }
      });
    },
    updateFunction(item) {
      this.dialogTitle = "修改部门";
      let parantObj = this.lists.find(listItem => { return listItem.menuId == item.parantId})
      if(parantObj){
        this.parantMenuName = parantObj.name  
      }
      if (item.parantId === 0) {
        
      } else {
        
      }
      this.addform = Object.assign(this.addform, item)
      // if(item.status === 'NOL'){
      //   this.addform.status = '1'
      // }
      // else {
      //   this.addform.status = '0'
      // }
      if(this.addform.parantId){
        let idArray = this.getParantArray(this.addform.parantId)
        this.selectedOptions = idArray.reverse()
      }
      else{
        this.selectedOptions = ['无']
      }
      this.showAddDialog = true;
      this.$nextTick(() => {
        this.$refs['addform'].clearValidate();
      })
    },
    // 从子节点查询到根节点
    getParantArray(orgId){
      let options = [orgId]
      let o = this.lists.find(v => {
        return v.orgId === orgId
      })
      if(o && o.parantId != 0){
        options = options.concat(this.getParantArray(o.parantId))
      }
      return options
    },
    read(row){
      let readObj = Object.assign({}, row)
      if(readObj.status === 'NOL'){
        readObj.status = '启用'
      }
      else if(readObj.status === 'STP'){
        readObj.status = '停用'
      }
      else{
        readObj.status = '删除'
      }
      // 1 事业部  2 行方机构 3部门
      let orgArr = ['', '事业部', '行方机构', '部门']
      readObj.orgType = orgArr[readObj.orgType]
      if(readObj.parantId && readObj.parantId != 0){
        readObj.parantName = this.lists.find(item => {
          return item.orgId == readObj.parantId
        }).name
      }
      else{
        readObj.parantName = ''
      }
      this.readForm = Object.assign(this.readForm, readObj)
      this.showReadDialog = true
    }
  }
};
</script>

<style lang="scss" scoped>
.style-dept{
    .el-input{
        width: 250px;
        margin-right: 10px;
    }
}
.el-card__body.menuList{
  padding:0px;
  .zk-table{
    border: none;
    .zk-table__header-wrapper{
      .zk-table__header-row{
          background:#fafafa;
          .zk-table__header-cell{
            font-weight:normal;
            text-align:center;

          }
          .zk-table--border-cell:not(:last-of-type){
            border-right:none;
            font-size: 14px;
            letter-spacing: 0;
            line-height: 14px;
            padding-top: 16px;
            padding-bottom: 16px;
            .zk-table--firstProp-header-inner{
              line-height: 23px;
              padding:0 10px;
              white-space: normal;
              word-break: break-all;
              color: #475266;
              
            }
            .zk-table__cell-inner{
              line-height: 23px;
              padding:0 10px;
              white-space: normal;
              word-break: break-all;
              color: #475266;
              }
          }
          .zk-table--border-cell{
            border-right:none;
            font-size: 14px;
            letter-spacing: 0;
            line-height: 14px;
            padding-top: 16px;
            padding-bottom: 16px;
            .zk-table--firstProp-header-inner{
              line-height: 23px;
              padding:0 10px;
              white-space: normal;
              word-break: break-all;
              color: #475266;
              
            }
            .zk-table__cell-inner{
              line-height: 23px;
              padding:0 10px;
              white-space: normal;
              word-break: break-all;
              color: #475266;
              }
          }
          
      }
    }
    .zk-table__body-wrapper{
      .zk-table__body{
        font-size:14px;
        color:#606266;
        .zk-table__body-row{
          .zk-table--border-cell:not(:last-of-type){
            border-right:none;
          }
      }
      }
      
    }
  }
}

</style>