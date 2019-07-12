<template>
 <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
     <maininfo  />
     </page-template>
    
</template>
<script>
/* eslint-disable */
import maininfo from '@/components/maininfo.vue'
  import PageTemplate from '@/components/page-template'
import '@/less/data-list.less'

export default {
  data () {
    return {
      pageNum: 1,
       positionPath: [ {name:this.$route.query.paths==1?'营销工单':this.$route.query.paths==2?'企业名录':'高管驾驶舱'},{name:this.$route.query.paths==1?'营销工单详情':this.$route.query.paths==2?'企业名录详情':'企业全景图'}],
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
      maininfo
    },
    created(){
      console.log(this.$route,778)
    }
}
</script>

<style lang="less">
.clear{clear:both; height: 0; line-height: 0; font-size: 0}
</style>
