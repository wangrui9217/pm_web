import * as types from '@/store/mutation-types'
import api from '@/api-authority'
export default {
	//添加/更新-用户
	[types.ADD_UPDATE_USER]({ commit, state }, params) {
		return new Promise((resolve, reject) => {
		
			api.addOrUpdateUser(params).then((res) => {
				console.log('ADD_UPDATE_USER@', res)
				if (res.data.success) {
					// if(params.pasword){
					// 	res.data.message="重置成功 新密码为888888"

					// }
					vm.$message({
						type: 'success',
						message: res.data.message
					});
				} else {
					vm.$message({
						type: 'error',
						message: res.data.message
					});
				}
				resolve(res)
			}).catch((err) => {
				reject(err)
				console.log(err)
			})
		})
	},
	//获取用户列表-分页
	[types.GET_USERS]({ commit, state }, params) {
		api.getUserInfo(params).then((res) => {
			console.log('res', res)
			if (res.data.success) {
				commit(types.GET_USERS, {
					data: res.data.data.emps,
					total: res.data.total
				})
			} else {
				vm.$message({
					type: 'error',
					message: res.data.message
				});
			}
		}).catch((err) => {
			console.log(err)
		})
	},
	//获取角色列表
	// [types.GET_ROLE_LIST]({ commit, state }, params) {
	// 	api.getUserInfo(params).then((res) => {
	// 		if (res.data.success) {
	// 			commit(types.UPDATE_ROLE_LIST, {
	// 				data: res.data.data.roles,
	// 				total: res.data.total
	// 			})
	// 		} else {
	// 			vm.$message({
	// 				type: 'error',
	// 				message: res.data.message
	// 			});
	// 		}
	// 	}).catch((err) => {
	// 		console.log(err)
	// 	})
	// },
	// 请求区域数据
	[types.Get_areas]({ commit }) {		
		api.getAllAreas().then((res)=>{
			if(res.data.code==1){
				commit(types.UPDATE_areas,res.data.data.basicAreas)
			}else{
			 vm.$message({
				 type: 'error',
				 message: res.data.msg
			 });
			}
	 }).catch((err)=>{
		 console.log(err)
	 })

	},
		// 请求信用等级数据
		[types.Get_credit]({ commit }) {		
			api.searchCreditLevelist().then((res)=>{
				if(res.data.code==0){
					commit(types.UPDATE_credit,res.data.message)
				}else{
				 vm.$message({
					 type: 'error',
					 message: res.data.msg
				 });
				}
		 }).catch((err)=>{
			 console.log(err)
		 })
	
		},
		// 请求\员工派发数据
		[types.Get_usersearch]({ commit }) {		
			api.searchUserByArea().then((res)=>{
				if(res.data.code==0){
					if(Array.isArray(res.data.message)){
						commit(types.UPDATE_usersearch,res.data.message)	
					}
				}else{
					vm.$message({
						type: 'error',
						message: res.data.msg
					});
				}
			}).catch((err)=>{
				console.log(err)
			})
		},
		// 获取协议类型列表
		[types.PROTOCOL_TYPE_LIST]({ commit }) {
			api.getProtocolTypeList().then((res)=>{
				if(res.data.code==0){
					if(Array.isArray(res.data.message)){
						commit(types.PROTOCOL_TYPE_LIST,res.data.message)	
					}
				}else{
					vm.$message({
						type: 'error',
						message: res.data.msg
					});
				}
			}).catch((err)=>{
				console.log(err)
			})
		},

}
