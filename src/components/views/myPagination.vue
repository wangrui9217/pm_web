<template>
  <el-pagination layout="total, sizes, prev, pager, next, jumper" v-if="total"
  background
  :total="total"
  @size-change="handleSizeChange"
  @current-change="handlePageNumChange"
  :current-page="pageNum"
  :page-sizes="[10, 20, 30, 50]"
	:page-size="pageSize"
  style="text-align:center;background:#fff;margin-top:20px;"
  >
	</el-pagination>
</template>
<script>
	export default {
		props: {
			total: {
				type: Number,
				default() {
					return 0
				}
			}
		},
		data(){
			return {
				pageSize: 10,
				pageNum: 1
			}
		},
		methods: {
			handlePageNumChange(val){
				this.pageNum = val
				this.paginationChange()
			},
			handleSizeChange (val) {
				this.pageSize = val
	      this.paginationChange()
	    },
	    paginationChange(){
	    	this.$emit('paginationChange', {
					pageSize: this.pageSize,
					pageNum: this.pageNum
				})
	    },
	    reset(obj){
	    	this.pageNum = obj.pageNum
	    	if(obj.pageSize){
	    		this.pageSize = obj.pageSize
	    	}
	    	this.paginationChange()
	    }
		}
	}
</script>
<style lang="scss" scoped>

</style>