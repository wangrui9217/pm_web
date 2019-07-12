/* 列表分页组件 */
<template>
  <div class="table-pagination">
      <slot />
      <el-pagination
        background
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
        layout="prev, pager, next"
        :total="total">
     </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageNo: 1,
        pageSize: 10
      }
    },
    props: {
      total: {
        type: Number,
        default () {
          return 0
        }
      }
    },
    components: {
    },
    created () {
    },
    methods: {
      pageSizeChange (v) {
        this.pageSize = v
        this.$emit('page-change',{pageNo,pageSize})
      },
      pageNoChange (v) {
        this.pageNo = v
        this.$emit('page-change',{pageNo,pageSize})
      }
    }
  }
</script>

<style>
</style>

