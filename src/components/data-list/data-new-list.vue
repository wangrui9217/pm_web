<template>
	<div class="data-list-common">
    
    <div class="tool-filter-receive" v-if="toolFilterReceive">
        <div class="tool-filter">
             <data-new-filter
              ref="datafilter"
              v-if="filters.length!=0"
              :filters="filters"
              @do-filter="doFilter" />
        </div>      
    </div>
 
		<slot />
		<el-pagination layout="total, sizes, prev, pager, next, jumper"
        background
		    :total="total"
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    :current-page="pageNum"
		    :page-sizes="pageSizes"
      	:page-size="pageSize"
        style="text-align:center"
		    >
		</el-pagination>
	</div>
</template>
<script>
/* eslint-disable */
import DataNewFilter from '@/components/data-list/data-new-filter.vue'
import '@/less/data-list.less'
import _ from 'lodash'
export default {
  name: 'data-new-list',
  data () {
    return {
      pageNum: 1,
      defaultPageSize: 10,
      pageSize: 1,
      pageSizes: [5, 10, 20, 30],
      paramsFilter: {}
    }
  },
  props: {
    toolFilterReceive:{
      type: Boolean,
      default () {
        return false
      }
    },
  
    filters: {
      type: Array,
      default () {
        return []
      }
    },
    fields: {
      type: Object,
      default () {
        return {
          PAGE_SIZE: 'pageSize',
          PAGE_NUMBER: 'pageNo'
        }
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    'data-new-filter': DataNewFilter
  },
  computed: {
  },
  
  created(){
    this.pageSize=this.defaultPageSize
  },
  activated() {
  },
  methods: {
    refresh () {
      var data = Object.assign({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }, this.paramsFilter)
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNum
      delete data.pageSizes
      delete data.pageNum
      this.$emit('data-refresh', data)
    },

    doFilter (paramsFilter) {
      this.paramsFilter = paramsFilter
      var data = Object.assign({
        pageSize: this.pageSize,
        pageNum: 1
      }, this.paramsFilter)
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNum
      delete data.pageSizes
      delete data.pageNum
      this.$emit('data-refresh', data)
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.pageNum = val
    },


    
    executeFilt () {
      this.$refs.datafilter.handleFilter()
    }
  }
}
</script>

<style lang="less">

</style>