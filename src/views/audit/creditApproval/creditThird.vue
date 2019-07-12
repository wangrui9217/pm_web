<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="提额审批">
      <approval-credit-list :credit-type="41"></approval-credit-list>
    </page-template>
  </div>
  
</template>
<script>
import PageTemplate from '@/components/page-template'
import ApprovalCreditList from '@/components/views/approval-credit-list'
export default {
  data() {
    return {
      positionPath: [{ name: '审批管理' }, { name: '合同岗用信审批' }],
    }
  },
  components: {
    PageTemplate,
    ApprovalCreditList
  },
  methods: {
    
  }
}

</script>
<style lang="scss">

</style>
