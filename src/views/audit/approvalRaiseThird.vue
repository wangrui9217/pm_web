<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" >
      <approval-raise-list :raise-state="3"></approval-raise-list>
    </page-template>
  </div>

</template>
<script>
import PageTemplate from '@/components/page-template'
import ApprovalRaiseList from '@/components/views/approval-raise-list'
export default {
  data() {
    return {
      positionPath: [{ name: '审批管理' }, { name: '提额审批' }],
    }
  },
  components: {
    PageTemplate,
    ApprovalRaiseList
  },
  methods: {

  }
}

</script>
<style lang="scss">

</style>
