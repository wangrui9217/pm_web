<template>
  <div class="site-wrapper" :class="siteWarpperClasses"  element-loading-text="拼命加载中">
    <template v-if="!loading">
      <navbar></navbar>
      <sidebar></sidebar>
      <div class="site-content__wrapper" :style="siteContentWarpperStyles">
        <main class="site-content" :class="{ 'site-content--tabs': routeIsTab }" style="overflow-y:auto;background:#fff"  :style="contentViewStyles">

          <router-view></router-view>
          <!-- <el-card v-if="!routeIsTab">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-card> -->

           <!-- <template v-if="!routeIsTab">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </template> -->
          <!-- tab标签页, 内容展示方式 -->
          <!-- <content-tabs v-else></content-tabs> -->
        </main>
      </div>
    </template>
  </div>
</template>

<script>
  import Navbar from './navbar'
  import Sidebar from './sidebar'
  import ContentTabs from './content-tabs'
  // import API from '@/api'
  import { mapMutations } from 'vuex'
  import * as types from '@/store/mutation-types'

  export default {
    data () {
      return {
        loading: true
      }
    },
    components: {
      Navbar,
      Sidebar,
      ContentTabs
    },
    computed: {
      siteWarpperClasses () {
        return [
          { 'site-sidebar--collapse': this.$store.state.sidebarCollapse }
        ]
      },
      siteContentWarpperStyles () {
        return [
          { 'minHeight': this.$store.state.documentClientHeight + 'px' }
        ]
      },
      routeIsTab () {
        return this.$route.meta && this.$route.meta.isTab
      },
      contentViewStyles () {
        var height = this.$store.state.documentClientHeight
        // height -= 50 // site-topbar
        height -= 0 // site-content padding-top
        height -= 0 // site-content padding-bottom
        height -= 0  // el-card border-top border-bottom
        height -= 60  // 头部高度
        
        height += 'px'
        return [
          { height: height }
        ]
      }
    },
    created () {
      this.getUserInfo()
      this.$store.dispatch(types.Get_areas)
      this.$store.dispatch(types.Get_credit)
      this.$store.dispatch(types.Get_usersearch)

    },
    mounted () {
      this.resetDocumentClientHeight()
      window.onresize = () => {
        this.resetDocumentClientHeight()
      }
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        this.UPDATE_DOCUMENT_CLIENT_HEIGHT({ height: document.documentElement['clientHeight'] })
      },
      // 获取当前管理员信息
      getUserInfo () {
        this.loading = false // --for dev
        // API.user.info().then(({data}) => {
        //   if (data && data.code === 0) {
        //     this.loading = false
        //     this.DELETE_CONTENT_TABS()
        //     this.UPDATE_USER_ID({ id: data.user.userId })
        //     this.UPDATE_USER_NAME({ name: data.user.username })
        //   }
        // })
      },
      ...mapMutations(['UPDATE_DOCUMENT_CLIENT_HEIGHT', 'UPDATE_USER_ID', 'UPDATE_USER_NAME', 'DELETE_CONTENT_TABS'])
    }
  }
</script>
