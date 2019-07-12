<template>
	<el-dialog :title="selectUserDialogTitle" :visible.sync="showUserDialog" width="800px" :close-on-click-modal="false">
      <el-input size="small" v-model.trim="userRealName" placeholder="输入姓名" @keyup.enter.native="search"></el-input>
      <div class="select-user-list" v-loading="loading">
	      <el-table
	        ref="singleTable"
	        :data="userList"
	        highlight-current-row
	        @current-change="handleCurrentChange"
	        style="width: 100%">
	       
	        <el-table-column
	          prop="realName"
	          label="姓名"
	          width="120">
	        </el-table-column>
	        <el-table-column
	          prop="username"
	          label="工号"
	          width="120">
	        </el-table-column>
	        <el-table-column
	          prop="orgName"
	          label="部门">
	        </el-table-column>
	        <el-table-column
	          prop="roleName"
	          label="角色">
	        </el-table-column>
	      </el-table>
	      <my-pagination @paginationChange="getUserList" ref="my-pagination" :total="total"></my-pagination>
	    </div>
      <div slot="footer">
          <el-button @click="showUserDialog = false">取 消</el-button>
          <el-button type="primary" @click="submit()" :disabled="!currnetRow">确定</el-button>
      </div>
    </el-dialog>
</template>
<script>
	import myPagination from "@/components/views/myPagination";
	import api from "@/api-authority";
	export default {
		components: { myPagination },
		props: {
			selectUserDialogTitle:{
				type: String,
				default(){
					return '选择用户'
				}
			}
		},
		data(){
			return {
				showUserDialog: false,
				userList: [],
				currnetRow: null,
				userRealName: '',
				total: 0,
				loading: false
			}
		},
		methods: {
			handleCurrentChange(row){
				this.currnetRow = row
			},
			submit(){
				this.$emit('comfirm', this.currnetRow)
				this.showUserDialog = false
			},
			search(){
        this.$refs.singleTable.setCurrentRow();
				this.$refs['my-pagination'].reset({
					pageNum: 1
				});
			},
			getUserList(paginationData={pageNum:1,pageSize:10}){
				let params = {}
				if(paginationData){
					params = Object.assign(params, paginationData)
				}
				if(this.userRealName){
					params.realName = this.userRealName
				}
				this.loading = true
				api.getUserInfo(params)
        .then((res) => {
        	this.loading = false
          if (res.data.code == '1') {
            this.userList = res.data.data.list;
            this.userList.forEach(item => {
            	if(item.roleList && item.roleList.length >0){
            		item.roleName = item.roleList.reduce((total, current, index) => {
            			let prev = index ==0?'':','
            			return total + prev + current.roleName 
            		}, '')
            	}
            })
            this.total = res.data.data.total;
          }
          else{
          	this.userList = []
          	this.total = 0
          }
        })
			},
			openDialog(){
				this.showUserDialog = true
				this.currnetRow = null
				if(this.userRealName || this.userList.length == 0){
					this.userRealName = ''
				}
				this.$nextTick(() => {
					this.$refs.singleTable.setCurrentRow();
					this.$refs['my-pagination'].reset({
						pageNum: 1,
						pageSize: 10
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>