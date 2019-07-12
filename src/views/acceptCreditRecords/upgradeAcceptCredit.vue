<template>
  <div class="common-list-page product_info">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
      <common-list type='3'></common-list>
    </page-template>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import commonList from './commonList.vue'
export default {
  data() {
    return {
      positionPath: [{ name: '授信记录' }, { name: '提额后授信记录' }], //路径信息
    }
  },
  components: {
    PageTemplate,
    commonList
  },
  methods: {
    
  }
}

</script>
<style lang="less" scoped>
</style>
