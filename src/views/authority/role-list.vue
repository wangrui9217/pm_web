<template>
    <div class="">
      <div class="list-container">
       <page-template :position-path="positionPath" :toolTitle="true" pageTitle="角色管理列表">
            <data-list  
              ref="dataList"
              @get-add-role="getAddRole"
              @data-refresh="handleRefresh"
              :toolFilterReceive="true"
              :addRole="true"
              :total="total"
              :filters="filters"  
              :pagination-options="paginationOptions"
              >
              <div  id="rolemange"   style="width: 100%;padding:0 24px;background:#fff">
              <el-table                
                :cell-style="{textAlign:'center'}"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  align="center"
                  label="序号"
                  type="index"
                  :index="indexMethod"
                  width="50">
                </el-table-column>
                <el-table-column
                  align="center"
                  property="roleName"
                  min-width="120"
                  label="角色名称">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="150"
                  property="createTime"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="150"
                  property="updateTime"
                  label="更新时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  property="status"
                  width="80"
                  label="状态">
                  <template slot-scope="scope">
                    <span :class="[scope.row.status == 'NOL' ? 'success-color' : 'danger-color']">
                      {{ scope.row.status=="NOL" ? "启用" : "停用" }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  min-width="160"
                  property="remark"
                  label="备注">
                </el-table-column>
                <el-table-column
                  align="center"
                  width="100"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="medium" :disabled="!(scope.row.status == 'NOL')" @click="updateRole(scope.row)">修改</el-button>
                    <el-button :class="[scope.row.status == 'NOL' ? 'danger-color' : 'success-color']" type="text" size="medium" @click.native="StopOrOpenRole(scope.row)">
                      {{ scope.row.status == 'NOL' ? '停用' : '启用' }}
                      </el-button>
           

                  </template>
                </el-table-column>
              </el-table>
              </div>
            </data-list>

         </page-template>
      </div>
      <!-- 弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="showAddDialog" :close-on-click-modal="false" :before-close="handleClose" >
        <div v-loading="loading">
          <el-form :model="addform" label-width="80px" label-position="right" ref="addform" :rules="rules" >
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model.trim="addform.roleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限code" prop="roleCode">
              <el-input v-model.trim="addform.roleCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限分配">
                <div class="quanian" auto-complete="off">
                  <el-tag v-for="item in TagLists" size="small" :key="item.id" type="danger">{{ item.name }}</el-tag>
                </div>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="addform.remark" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="dept-tree">
            <el-tree ref="tree" @check-change="handleNodeClick" node-key="menuId" :default-checked-keys="menuIdList" show-checkbox :data="treeData" :props="defaultProps" :check-strictly="true"></el-tree>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submitAddForm('addform')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority';
import * as weapon from '@/utils/weapon';
import arrayToTree from "array-to-tree";

export default {
  name: "role-list",
  components: {
    'data-list': DataList,
     PageTemplate
  },
  data() {
    return {
      loading: false,
      filterform: {
        roleName: "",
        status: ""
      },
      dialogTitle:"",
      total: 0,
      paginationOptions: {},
      showAddDialog:false,
      // showMenuTree:false,
      chosen:"",
      tableData: [],
      addform:{
        roleName:"",
        roleCode: '',
        status:"NOL",
        remark:"",
        menuIdList:[]
      },
      tempform:{
        roleName:"",
        status:"NOL",
        roleCode: '',
        remark:"",
        menuIdList:[]
      },
      menuIdList: [],
      positionPath: [{name: '系统管理'}, {name: '角色管理'}],
      filters: [
                {
            label: "状态：",
            type: "select",
            field: "status",
            options: [
              { label: "全部", value: "" },
              { label: "启用", value: "NOL" },
              { label: "停用", value: "STP" },
            ]
          },
          {
            label: false,
            placeholder: '角色名称',
            type: 'input',
            field: 'roleName'
          },
   
        ],//筛选框配置
      rules:{
        roleName:[
          {required:true,message:'角色名称不能为空'},
          {max: 255, message: "长度不能超过255"}
        ],
        roleCode: {required:true,message:'权限code不能为空'},
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      TagLists:[],
      lists:[],
      allProcess:[],
      pageNo: 0,
      pageSize: 0
    };
  },
  mounted() {
     //this.renderLists({}, "flag");
  },
  methods: {
    renderLists(params){
      params.pageNo = params.pageNum
      this.pageNo = params.pageNo
      this.pageSize = params.pageSize
      api.getAllRoles(params)
      .then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
  
      }).catch(err => {
        console.log(err);
      });
    },
    getAllMenus(){
      api.getAllMenus({}).then((res)=>{
        if(res.data.code == '1'){
          this.lists = res.data.data.menus;
          this.treeData = arrayToTree(this.lists, {
            parentProperty: "parantId",
            customID: "menuId"
          });
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    //执行新增按钮
    getAddRole(){
      if(this.treeData.length == 0){
        this.getAllMenus()
      }
      this.dialogTitle='新增角色';
      this.showAddDialog = true;
      this.addform = Object.assign({},this.tempform);
      this.$nextTick(() => {
        this.$refs['addform'].clearValidate();
        this.$refs.tree.setCheckedKeys([]);
      })
      this.TagLists.length = 0;
    },
    handleRefresh(params) {
      this.renderLists(params);
    },
    handleClose(){
      this.showAddDialog = false;
      this.menuIdList = [];
      this.TagLists = [];
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          var updateForm = Object.assign({},this.addform);
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api.addOrUpdateRole(updateForm).then((res)=>{
             loading.close()
            if(res.data.code == '1'){
              this.handleClose()
              this.$router.push(this.$route.path);//重新定向到当前页面以此来刷新新增的数据
              this.$message.success("操作成功");
              this.$refs.dataList.handleRoute(this.$route);
              this.TagLists = [];
            }else{
              this.$message.error(res.data.message);
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
      })
    },
    handleNodeClick(){
      let tempArr = this.$refs.tree.getCheckedKeys()
      let halfArr = this.$refs.tree.getHalfCheckedKeys()
      tempArr = tempArr.concat(halfArr)
      this.addform.menuIdList = weapon.unique(tempArr);
      //更改tags
      this.ChangeTags();
    },
    ChangeTags(){
      this.TagLists = [];
      this.addform.menuIdList.map((item)=>{
        if(this.lists.filter(el=>el.menuId == item).length!=0){
          this.TagLists.push({id: item,name: this.lists.filter(el=>el.menuId == item)[0].name})
        }
      })
    },
    StopOrOpenRole(item){
      if(item.status == "NOL"){
        var tmp = {
          roleId: Object.assign({},item).roleId,
          status:"STP"
        }
        this.$confirm('您确定停用该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.addOrUpdateRole(tmp).then((res)=>{
              if(res.data.code == '1'){
                  this.$router.push(this.$route.path)
                  this.$refs.dataList.refresh()
                  this.$message.success("停用角色成功");
                  
                  this.$refs.dataList.handleRoute(this.$route);
              }else{
                this.$message.error(res.data.message);
              }
          }).catch((err)=>{
              // this.$message.error("操作失败");
          })
        }).catch(() => {

        });
      }
      else if(item.status == "STP"){
        var tmp = {
          roleId: Object.assign({},item).roleId,
          status:"NOL"
        }
        api.addOrUpdateRole(tmp).then((res)=>{
          if(res.data.code == '1'){      
              this.$router.push(this.$route.path)
              this.$message.success("启用角色成功");
          }else{
            this.$message.error('请求失败');
          }
        }).catch((err)=>{
          this.$message.error("操作失败");
        })
      }
    },
    updateRole(item){
      if(this.treeData.length == 0){
        this.getAllMenus()
      }
      this.loading = true
      this.showAddDialog = true;
      this.$nextTick(() => {
        this.$refs['addform'].clearValidate();
        this.$refs.tree.setCheckedKeys([]);
      })
      this.dialogTitle = "修改角色";
      api.getRoleById(Object.assign({},item).roleId).then((res)=>{
        if(res.data.code == '1'){
          this.$router.push(this.$route.path)
          this.addform = res.data.data.role;
          let menuIdList = [].concat(this.addform.menuIdList);
          this.menuIdList = menuIdList
          this.TagLists.length = 0;
          this.loading = false
          this.ChangeTags();
        }
      }).catch((err)=>{
         console.log(err);
      })
     },
     indexMethod(index){
      return index+1 + this.pageSize*(this.pageNo-1)
     }
    }
 };
</script>
<style scoped lang="less">
  .quanian{
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    min-height: 34px;
    line-height: 0;
    .el-tag{
      margin:5px;
    }
  }
 .data-filter {
    float: left;
}
.data-list-emmy .act-list .el-button .tool-add .el-button--primary{
    margin-top:-100px;
}
</style>
