<template>
  <div class="iframe-view" element-loading-text="拼命加载中">
    <iframe ref="iframe" class="iframe" width="100%" height="100%" src="" ></iframe>
  </div>
</template>

<script>
  // import API from '@/api'
  // import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        loading: false
      }
    },
    components: {
    },
    computed: {
    },
    watch: {
      $route () {
        this.changeIframeSrc()
      }
    },
    created () {
      this.changeIframeSrc()
    },
    methods: {
      changeIframeSrc () {
        this.$nextTick(() => {
          let authorityBaseUrl = 'http://192.168.22.189:8080/renren-admin'
          this.$refs.iframe.setAttribute('src', authorityBaseUrl + this.$route.query.url)
        })
      }
    }
  }
</script>
<style lang="css" scoped>
.iframe{
    width:100%;
    height:100%;
    border:none;
}
.iframe-view{
    height:100%;
}
</style>
