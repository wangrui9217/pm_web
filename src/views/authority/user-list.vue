<template>
  <div class="common-list-page userList">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="用户管理">
    	<div class="user-container">
    		<div class="user-aside">
    			<el-tree :data="treeData" :props="{children: 'children',label: 'name'}" @node-click="handleNodeClick" :expand-on-click-node="false" :highlight-current="true"></el-tree>
    		</div>
    		<div class="user-center">
    			<data-list class="list-container" @get-add-user="getAddUser({},'add')" @data-refresh="handleRefresh" :toolFilterReceive="true" :addUser="true" :filters="filters" :total="total" :pagination-options="paginationOptions" ref="datalist">
		        <div style="width: 100%;padding:0 24px;background:#fff">
		          <el-table v-loading="loading" :data="userList" highlight-current-row style="width: 100%">
		            <!-- <el-table-column type="index" align="center" min-width="80">
		            </el-table-column> -->
		            <el-table-column prop="username" label="工号" align="center">
		            </el-table-column>
		            <el-table-column prop="realName" label="姓名" align="center">
		            </el-table-column>
		            <el-table-column prop="orgName" label="部门" align="center">
		            </el-table-column>
		            <el-table-column prop="roleName" label="角色" align="center">
		            </el-table-column>
		            <el-table-column align="center" width="260" label="操作">
		              <template slot-scope="scope">
		                <div class="of-hidden actList">
		                  <el-button @click="getAddUser(scope.row,'edit')" type="text" size="medium">编辑</el-button>
                      <el-button @click="resetPWD(scope.row)" type="text" size="medium">重置密码</el-button>
                      <el-button @click="resetMobile(scope.row)" type="text" size="medium">重置手机设备</el-button>

		                  <el-button class="danger-color" @click="deleteUser(scope.row)" type="text" size="medium">删除</el-button>
		                </div>
		              </template>
		            </el-table-column>
		          </el-table>
		        </div>
		      </data-list>
    		</div>
    	</div>
      
    </page-template>
    <el-dialog :close-on-click-modal="false" ref="dialogAddModify" @close="evClose" :before-close="beforeClose" :title="dialogName" class="common-dialog userAddUpdate-dia" :visible="diaAddModVisable">
      <el-form ref="currentItem" :model="currentItem" label-width="100px">
        <el-form-item label="工号：" prop="username" :rules="rules.username">
          <el-input v-model.trim="currentItem.username" :disabled="dialogName == '用户信息修改'"/>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName" :rules="rules.realnameRule">
          <el-input v-model.trim="currentItem.realName" />
        </el-form-item>
        <el-form-item label="部门：" prop="orgId" :rules="rules.parantDept">
          <el-input v-model.trim="currentItem.orgId" style="display: none" ></el-input>
          <el-cascader
              :options="treeData"
              v-model="selectedOptions"
              :props="cascaderProps"
              filterable
              change-on-select
              clearable
              @change="getParantDept"
              style="width: 250px;"
              readonly="readonly"
            ></el-cascader>
        </el-form-item>
        <el-form-item class="item fpjs" label="角色：" prop="roleList" :rules="rules.roleList">
					<el-checkbox-group v-model="currentItem.roleList">
						<el-checkbox v-for="(role) in myRoleList" :label="role.roleId" :key="role.roleId" name="">{{role.roleName}}</el-checkbox>
				  </el-checkbox-group>
				 </el-form-item>
        <el-form-item label="手机号码：" prop="phone" :rules="rules.phoneRule">
          <el-input class="item" v-model.trim="currentItem.phone" />
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button @click.native.stop="diaAddModVisablefn">取消</el-button>
          <el-button type="primary" @click.native.stop="handleAddUpdate()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api-authority'
import * as types from '@/store/mutation-types'
import * as _const from '@/const'
import * as weapon from '@/utils/weapon'
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import arrayToTree from "array-to-tree";
import Rules from "@/const/formRules";
function UserParams() {
  // this.roleId="",
  	this.id = ""
    this.realName = ''
    this.username = ''
    this.phone = ''
    this.email = ''
    this.roleList = []
    this.orgId = ''  // 父级部门id
    this.unit = ''  // 顶级部门id
}
export default {
  components: {
    'data-list': DataList,
    PageTemplate
  },
  data() {
    return {
      positionPath: [{ name: '系统管理' }, { name: '用户管理' }],
      filters: [], //筛选框配置
      // testRole: 60,
      // juseroleid: [],
      // checklist: [],
      myRoleList: [],
      departments: [],
      userList: [],
      rules: Rules,
      dialogName: '',
      currentItem: new UserParams(),
      diaDeptChoose: false,
      diaAddModVisable: false,
      total: 0,
      paginationOptions: {},
      deptTreeProps: {
        label: "name",
        label: "myRoleList"
      },
      loading: false,
      treeData: [],
      selectedOptions: [],
      cascaderProps: {
        children: "children",
        label: "name",
        value: 'orgId'
      },
      deptsList: []
    }

  },
  
  created() {
    this.getAllDepts()
  },
  methods: {
  	getParantDept(arr=''){
      if (arr !== '') {
        let orgId = arr[arr.length - 1]
        let obj = this.deptsList.find(b => { return b.orgId === orgId })
        if(obj){
          this.currentItem.orgId = obj.orgId
          this.currentItem.parantName = obj.name
          this.currentItem.unit = arr[0]
        }
        else{
	      	this.currentItem.orgId = ''
	        this.currentItem.parantName = ''
          this.currentItem.unit = ''
	      }
      }
      else{
      	this.currentItem.orgId = ''
        this.currentItem.parantName = ''
        this.currentItem.unit = ''
      }
    },
    diaAddModVisablefn() {
      this.diaAddModVisable = false;
      //this.checklist = [];
    },
    renderLists(params) {
    	this.loading = true
      api.getUserInfo(params)
      .then((res) => {
      	this.loading = false
        if (res.data.code == '1') {
          this.userList = res.data.data.list;
          this.userList.forEach(item => {
            if (item.roleList && item.roleList.length > 0) {
              item.roleName = item.roleList.map(role => {return role.roleName}).join(',')
            }
          })
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
          this.userList = []
          this.total = 0
        }
      })
    },
    getAllRoles(){
    	api.queryAllRoles().then((res) => {
	      if (res.data.code == '1') {
	        this.myRoleList = res.data.data.roles
	      } else {
	        this.$message.error(res.data.message);
	      }
	    })
    },
    getAllDepts(){
    	api.getAllDepts({}).then((res) => {
	      if (res.data.code == '1') {
	        let lists = res.data.data.depts
	        let depts = []
	        this.deptsList = lists
	        lists.forEach(item => {
            if(item.status != 'DEL' && item.status != 'STL'){
              depts.push(Object.assign({},item))  
            }
          })
        console.log(depts)
	       this.treeData = arrayToTree(depts, {
            parentProperty: "parantId",
            customID: "orgId"
          });
	      } else {
	        this.$message.error(res.data.message);
	      }
	    })
    },
    handleNodeClick(data) {
      let deptIds = getAllId(data, 'orgId')
      if(deptIds.length > 0){
	      this.$refs.datalist.doFilter({
	      	deptIds: deptIds
	      })
      }
      function getAllId(obj, id){
        let ids = [obj[id]]
        if(obj.children && obj.children.length > 0){
          obj.children.forEach(item => {
            ids = ids.concat(getAllId(item, id))
          })
        }
        return ids
      }
    },
    beforeClose() {
      this.diaAddModVisable = false
    },
    evClose() {
      this.$refs.currentItem.resetFields()
      this.currentItem = new UserParams()
      this.position = ""
    },
    //执行新增或修改按钮
    getAddUser(userObj, act) {
    	if(this.myRoleList.length == 0){
    		this.getAllRoles()
    	}
      this.currentItem = new UserParams()
      this.diaAddModVisable = true;
      if (act == 'add') {
        this.dialogName = "新增用户"
        this.selectedOptions = []
      }
      if (act == 'edit') {
        Object.assign(this.currentItem, {
        	id: userObj.id,
			    realName: userObj.realName,
			    username: userObj.username,
			    phone: userObj.phone,
			    email: userObj.email,
			    orgId: userObj.orgId,
          unit: userObj.unit
        })
        //	this.currentItem.myRole = this.currentItem.roleList[0].roleId
        this.dialogName = "用户信息修改"
        this.currentItem.roleList = userObj.roleList.map(item => {
        	return item.roleId
        })
        if(this.currentItem.orgId){
	        let idArray = this.getParantArray(this.currentItem.orgId)
	        this.selectedOptions = idArray.reverse()
	      }
      }
      this.$nextTick(() => {
      	this.$refs.currentItem.clearValidate()
      })
    },
    // 从子节点查询到根节点
    getParantArray(orgId){
      let options = [orgId]
      let o = this.deptsList.find(v => {
        return v.orgId === orgId
      })
      if(o && o.parantId != 0){
        options = options.concat(this.getParantArray(o.parantId))
      }
      return options
    },
    deleteUser(row){
    	var tmp = Object.assign({}, row)
      tmp.status = 'DEL'
    	this.$confirm("您确定删除用户 ”" + row.realName + "“ 吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .addOrUpdateUser(tmp)
            .then(res => {
              if (res.data.code == '1') {
                this.$message.success("操作成功");
                this.$refs.datalist.handleRoute(this.$route)
              }
            })
        })
        .catch(() => {});
    },
    resetPWD(row){
      var tmp = Object.assign({}, row)
      this.$confirm("您确定重置用户 ”" + row.realName + "“ 的密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .addOrUpdateUser(tmp)
            .then(res => {
              if (res.data.code == '1') {
                this.$message.success("操作成功");
                this.$refs.datalist.handleRoute(this.$route)
              }
              else{
                this.$message.error(res.data.message);
              }
            })
        })
        .catch(() => {});
    },
    resetMobile(row){
            var tmp = Object.assign({}, row)
      this.$confirm("您确定重置用户 ”" + row.realName + "“ 的手机设备吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .initUserPid({id:row.id})
            .then(res => {
              if (res.data.code == '1') {
                this.$message.success("操作成功");
                this.$refs.datalist.handleRoute(this.$route)
              }
              else{
                this.$message.error(res.data.message);
              }
            })
        })
        .catch(() => {});

    },
    handleAddUpdate() {
      this.$refs.currentItem.validate((valid) => {
        if (valid) {
          let params = Object.assign({},this.currentItem);
          let roleList = []
          if(params.roleList.length > 0){
          	this.myRoleList.forEach(item => {
          		if(params.roleList.indexOf(item.roleId) > -1){
          			roleList.push({
          				roleId: item.roleId,
          				roleName: item.roleName,
          				roleCode: item.roleCode
          			})
          		}
          	})
          }
          params.roleList = roleList
          params.status = 'NOL'
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          api.addOrUpdateUser(params)
            .then((res) => {
              loading.close()
              if (res.data.code == "1") {

                this.dialogVisible = false;
                this.$router.push(this.$route.path)
              } else {
                vm.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
            }).catch((err) => {
              console.log(err)
            })
          this.diaAddModVisable = false
        } else {
          return false;
        }
      });
    },
    handleRefresh(params) {
      this.renderLists(params);
    }
  },
  mounted() {
    //this.renderLists({}, "flag");
  },
}

</script>
<style lang="less">
// .data-filter {
//     float: left;
// }
// .data-list-emmy .act-list .el-button .tool-add .el-button--primary{
//     margin-top:-100px;
// }
.common-list-page.userList {
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

@media screen and (max-width: 1680px) {
  .common-list-page.userList .data-filter .filter-item .item-content {
    width: 180px;
  }
}

@media screen and (max-width: 1600px) {
  .common-list-page.userList .data-filter .filter-item .item-content {
    width: 160px;
  }
}

@media screen and (max-width: 1440px) {
  .common-list-page.userList .data-filter .filter-item .item-content {
    width: 140px;
  }
}

@media screen and (max-width: 1400px) {
  .common-list-page.userList .data-filter .filter-item .item-content {
    width: 120px;
  }
}

@media screen and (max-width: 1366px) {
  .common-list-page.userList .data-filter .filter-item .item-content {
    width: 120px;
  }
}
.user-container{
	min-width: 1200px;
  display: flex;
	.user-aside{
    padding-top: 10px;
    margin-top: 38px;
		float: left;
		width: 220px;
		min-height: 500px;
		border: solid 1px #dcdcdc;
		margin-left: 20px;
	}
	.user-center{
		flex: 1;
	}
}
</style>
