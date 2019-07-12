<template>
	<div class="el-card__body menuList">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="菜单管理列表">
         <data-list
          ref="dataList"
          @get-add-menu="getAddMenu"
          :toolFilterReceive="true"
          :addMenu="true"
          :filters="filters"
          @data-refresh="renderLists"
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
        <template slot-scope="scope" slot="status">
          <span v-bind:class="[scope.row.status == 'NOL' ? 'success-color' : 'danger-color']">{{ scope.row.status=="NOL" ? "启用" : "停用" }}</span>
        </template>
        <template slot-scope="scope" slot="action">
          <el-button type="text" :disabled="!(scope.row.status=='NOL')" size="medium" @click.native="updateFunction(scope.row)">修改</el-button>
          <!-- <el-button :class="[scope.row.status == 'STP' ? 'success-color' : 'danger-color']" type="text" size="medium" @click="stopOrOpenFunction(scope.row)">{{ scope.row.status == 'NOL' ? '停用' : '启用' }}</el-button> -->
        </template>
      </zk-table>
          </div>
          
        </data-list>
    </page-template>

    <!-- 新增功能弹出框 -->
    <el-dialog :title="dialogTitle"  :visible="showAddDialog" size="tiny" :close-on-click-modal="false" :before-close="handleClose" @close="emptyform('addform')">
      <el-form :model="addform" label-width="80px" label-position="right" ref="addform" :rules="rules">
          <el-form-item label="菜单名称" prop="name">
              <el-input v-model.trim="addform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单等级" prop="level" v-if="dialogTitle!='修改菜单'">
              <el-select v-model="level" placeholder="请选择" @change="handleLevelChange">
                <el-option label="一级菜单" value="0"></el-option>
                <el-option label="次级菜单" value="1"></el-option>
                <el-option label="按钮" value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item v-if="level!=0" label="父级菜单" prop="parantId">
              <input v-model="parentMenuName" class="el-input__inner" auto-complete="off" @focus="showTree()" placeholder="请选择" readonly="readonly" style="cursor:pointer;background: #eee;" />
          </el-form-item>
          <el-form-item label="菜单路径" prop="url" v-if="level!=2">
              <el-input v-model.trim="addform.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="按钮标识" prop="perms" v-else>
              <el-input v-model.trim="addform.perms" auto-complete="off" :disabled="dialogTitle=='修改菜单'"></el-input>
          </el-form-item>
          <el-form-item label="icon" prop="icon" >
              <el-input v-model.trim="addform.icon" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="菜单状态" prop="status" v-if="dialogTitle=='修改菜单'" >
              <el-select v-model="addform.status" placeholder="请选择">
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
          </el-form-item> -->
          <el-form-item label="菜单排序" prop="orderNum">
              <el-input v-model.trim="addform.orderNum" auto-complete="off"></el-input>
          </el-form-item>
      </el-form>
      <el-tree class="dept-tree" ref="menuTree" v-show="showMenuTree" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="treeFilter" :expand-on-click-node="expandOnClickNode"></el-tree>
      
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
import api from "@/api-authority";
// import * as weapon from "@/utils/weapon";
import arrayToTree from "array-to-tree";
export default {
  name: "function-list",
  components:{
     'data-list': DataList,
      PageTemplate
  },
  data() {
    return {
      showAddDialog: false,
      showMenuTree: false,
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
          label: "菜单名称",
          prop: "name",
          headerAlign: "left",
          align: "center",
          minWidth: '140px'
        },
        {
          label: "路径",
          prop: "url",
          align: "center",
          headerAlign: "center",
          minWidth: "200px"
        },
        {
          label: "创建时间",
          prop: "createTime",
          align: "center",
          headerAlign: "center",
          minWidth: "120px"
        },
        {
          label: "更新时间",
          prop: "updateTime",
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
        icon: "",
        menuId: "",
        name: "",
        parantId: 0,
        status: "1",
        url: "",
        orderNum: 0,
        type: 1
      },

      cleanform: {
        menuId: "",
        name: "",
        parantId: 0,
        status: "1",
        url: "",
        orderNum: 0,
        type: 1
      },
      positionPath: [{name: '系统管理'}, {name: '菜单管理'}],
      filters: [
        {
          label: false,
          placeholder: '菜单名称',
          type: 'input',
          field: 'menuName'
        },
      ],//筛选框配置
      rules: {
        name: [
          { required: true, message: "菜单名称不能为空" },
          { max: 255, message: "长度不能超过255" }
        ],
        url: [{ required: true, message: "菜单路径不能为空" }],
        perms: [{ required: true, message: "按钮标识不能为空" }],
      },

      level: "0",
      parentMenuName: "",

      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      lists: [],
      dialogTitle: "新增菜单",
      loading: false,
      expandOnClickNode: false
    };
  },
  mounted() {
    this.renderLists({}, "flag");
  },
  computed: {
    TreeRowLists() {
      return arrayToTree(this.lists, {
            parentProperty: "parantId",
            customID: "menuId"
          });
    },
  },
  methods: {
    treeFilter(value, data, node){
      if(this.level == '1'){  // 当类型不是按钮，那么tree只显示目录（一级菜单且没有设置url）
        return data.parantId == 0
      }
      else{
        return true
      }
    },
    renderLists(params, flag) {
      api.getAllMenus(params)
        .then(res => {
          if (res.data.code == '1') {
            this.lists = res.data.data.menus
            let menus = []
            res.data.data.menus.forEach(item => {
              if(item.type != 2){
                menus.push(Object.assign({},item))
              }
            })
            if (flag) {
              this.treeData = arrayToTree(menus, {
                parentProperty: "parantId",
                customID: "menuId"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
          
    getAddMenu() {
      this.dialogTitle = "新增菜单";
      this.parentMenuName = "";
      this.showAddDialog = true;
      this.level = "0";
      this.addform = Object.assign({}, this.cleanform);
      this.$nextTick(() => {
        this.$refs["addform"].clearValidate();
      })
    },
    emptyform(formName) {
      this.showMenuTree = false;
      this.$refs[formName].resetFields();
      
    },
    handleClose() {
      this.showAddDialog = false;
    },
    submitAddForm(formName) {

      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.level == "0") {
            this.addform.parantId = 0;
          }
          else if (this.level == "2") {
            this.addform.url = '/#';
            this.addform.type = 2
          }
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api
            .addOrUpdateMenu(Object.assign({}, this.addform))
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
            }).catch(err => {
              console.log(err);
            });
        }
      });
    },

    handleNodeClick(data,node) {
      if(this.level == 2 && node.childNodes.length>0){  // 当类型为按钮且当前点击为目录（有子菜单）时，不选择
        return false
      }
      if (data.status == "STP") {
        this.$message.error("改菜单已停用，无法选择");
      } else {
        this.parentMenuName = data.name;
        this.addform.parantId = data.menuId;
      }
    },
    updateFunction(item) {
      //var that = this;
      // alert(that.treeData instanceof Array)
      this.dialogTitle = "修改菜单";
      // this.lists = this.lists.filter(el=>el.menuId != item.menuId);
      // that.treeData = weapon.paseToNodeTree(
        
      //   that.treeData.filter(function(el){el.menuId != item.menuId}),
      //   { id: "menuId", pId: "parantId" }
      // ).nodeTree;
      //console.log(that.treeData)
      
      let parentObj = this.lists.find(listItem => { return listItem.menuId == item.parantId})
      console.log(parentObj)
      if(parentObj){
        this.parentMenuName = parentObj.name  
      }
      if (item.parantId === 0) {
        this.level = "0";
        this.showMenuTree = false;
      } else {
        if(item.type == 2){
          this.level = "2";
        }
        else{
          this.level = "1"; 
        }
        this.handleLevelChange(this.level, 'init')
        // this.showMenuTree = true;
        // this.$nextTick(() => {
        //   this.$refs['menuTree'].filter('');  
        // })
      }
      this.addform = Object.assign(this.addform, item)
      if(item.status === 'NOL'){
        this.addform.status = '1'
      }
      else {
        this.addform.status = '0'
      }
      
      this.showAddDialog = true;
    },
    stopOrOpenFunction(item) {
      let obj = this.lists.find(el => item.menuId == el.menuId)
      if (item.status == "NOL") {
        var tmp = Object.assign({}, obj);
        tmp.status = 'STP';
        this.$confirm("您确定停用该功能模块?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            api
              .addOrUpdateMenu(tmp)
              .then(res => {
                if (res.data.code == '1') {
                  this.$message.success("操作成功");
                  this.renderLists({}, "flag");
                }
                else{
                  this.$message.error(res.data.message);
                }
              })
          }).catch(() => {});
      } else if (item.status == "STP") {
        if (
          item.parantId &&
          this.lists.find(el => item.parantId == el.menuId).status == 'STP'
        ) {
          this.$message.error("上级菜单被停用,请先启用上级菜单");
          return;
        }
        var tmp = Object.assign({}, obj);
        tmp.status = 'NOL';
        this.$confirm("您确定重新启用此菜单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            api
              .addOrUpdateMenu(tmp)
              .then(res => {
                if (res.data.success) {
                  this.$message.success("操作成功");
                  this.renderLists({}, "flag");
                }
                else{
                  this.$message.error(res.data.message);
                }
              })
          }).catch(() => {});
      }
    },
    handleLevelChange(val, init){
      if(val == '0'){
        this.showMenuTree = false
      }
      else{
        if(val == '1'){
          this.expandOnClickNode = false
        }
        else{
          this.expandOnClickNode = true
        }
        if(!init){
          this.parentMenuName = '';
          this.addform.parantId = '';
        }
        this.$nextTick(() => {
          this.$refs['menuTree'].filter('');  
        })
      }      
    },
    showTree(){
      this.showMenuTree = true
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-card__body {
    padding: 0;
  }
.data-list-emmy .data-filter {
    float: left;
}

  .data-filter .filter-list {
    margin-right: 5px;
}
.data-list-emmy .act-list {
    margin-bottom: -40px;
}
.data-list-emmy .act-list .el-button .tool-add .el-button--primary{
    margin-top:-100px;
}

</style>
<style lang="scss" >
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