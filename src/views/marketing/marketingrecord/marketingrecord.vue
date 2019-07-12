<template>
 <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
     <marketingrecordinfo  />
     </page-template>
    
</template>
<script>
/* eslint-disable */
import marketingrecordinfo from './marketingrecordinfo.vue'
  import PageTemplate from '@/components/page-template'
import '@/less/data-list.less'

export default {
  data () {
    return {
      pageNum: 1,
       positionPath: [ {name: '工单管理'},{name: '营销记录详情'}],
    }
  },
  props: {
    toolFilterReceive:{
      type: Boolean,
      default () {
        return false
      }
    },

  },
  computed: {
  },
  methods: {

  },
  components: {
      PageTemplate,
      marketingrecordinfo
    },
}
</script>

<style lang="less">
.clear{clear:both; height: 0; line-height: 0; font-size: 0}
</style>