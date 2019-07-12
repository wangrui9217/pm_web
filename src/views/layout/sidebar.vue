<template>
  <aside class="site-sidebar" :class="sidebarClasses">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuNavActiveName"
        :collapse="$store.state.sidebarCollapse"
        :collapseTransition="false"
        class="site-sidebar__menu">
         <el-menu
          class=""
          mode="horizontal">
          <el-menu-item class="site-navbar__switch" index="0" @click="switchSidebarCollapseHandle()">
             <i class="zhedie"></i>
          </el-menu-item>
        </el-menu>
        
        <sub-menu-nav
          v-for="menuNav in $store.getters.menuTree" 
          :key="menuNav.menuId"
          :menu-nav="menuNav">
        </sub-menu-nav>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenuNav from '@/components/sub-menu-nav'
  // import API from '@/api'
  import { mapMutations } from 'vuex'
  import { getRouteNameByUrl } from '@/utils'
  import isEmpty from 'lodash/isEmpty'
  export default {
    data () {
      return {
      }
    },
    components: {
      SubMenuNav
    },
    computed: {
      menuTree () {
        return this.$store.getters.menuTree
      },
      menuNavActiveName: {
        get () {
          let name = this.$store.state.menuNavActiveName
          return /\S/.test(name) ? name : '1-1'
        },
        set (name) {
          this.UPDATE_MENU_NAV_ACTIVE_NAME({ name })
        }
      },
      sidebarClasses () {
        let skin = this.$store.state.sidebarLayoutSkin
        return [
          !/\S/.test(skin) || skin === 'light' ? '' : `site-sidebar--${skin}`
        ]
      }
    },
    watch: {
      $route: 'routeHandle',
      menuTree (v) {
        console.log('menuTree=>',v)
      }
    },
    created () {
      // this.getMenuNavList().then(() => {
      //   this.routeHandle(this.$route)
      // })
    },
    methods: {
       // 切换侧边栏, 水平折叠收起状态
      switchSidebarCollapseHandle () {
        this.SWITCH_SIDEBAR_COLLAPSE({ collapse: !this.$store.state.sidebarCollapse })
      },
      // 获取菜单导航列表 / 权限
      getMenuNavList () {
        // return API.menu.nav().then(({data}) => {
        //   if (data && data.code === 0) {
        //     this.UPDATE_MENU_NAV_LIST(data.menuList)
        //     sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        //   } else {
        //     this.UPDATE_MENU_NAV_LIST([])
        //     sessionStorage.setItem('permissions', '[]')
        //   }
        // })
      },
      // 路由操作
      routeHandle (route) {
        if (route.meta && route.meta.isTab) {
          var tab = this.$store.state.contentTabs.filter(item => item.name === route.name)[0]
          // tab不存在, 先添加
          if (isEmpty(tab)) {
            var menuNav = this.getMenuNavByRouteName(route.name, this.$store.state.menuNavList)
            if (!isEmpty(menuNav)) {
              tab = {
                id: menuNav.menuId,
                name: route.name,
                title: menuNav.name,
                type: (window.SITE_CONFIG.nestIframeRouteNameList || []).indexOf(route.name) !== -1 ? 'iframe' : 'module',
                url: menuNav.url
              }
              this.ADD_CONTENT_TAB(tab)
            } else {
              return console.error('未能找到可用tab标签页！')
            }
          }
          this.menuNavActiveName = tab.id + ''
          this.UPDATE_CONTENT_TABS_ACTIVE_NAME({ name: route.name })
        }
      },
      // 获取菜单导航, 根据路由名称
      getMenuNavByRouteName (name, menuNavList) {
        var temp = []
        for (var i = 0; i < menuNavList.length; i++) {
          if (menuNavList[i].list && menuNavList[i].list.length >= 1) {
            temp = temp.concat(menuNavList[i].list)
          } else if (getRouteNameByUrl(menuNavList[i].url) === name) {
            return menuNavList[i]
          }
        }
        return temp.length >= 1 ? this.getMenuNavByRouteName(name, temp) : []
      },
      ...mapMutations(['UPDATE_MENU_NAV_LIST', 'UPDATE_MENU_NAV_ACTIVE_NAME', 'ADD_CONTENT_TAB', 'UPDATE_CONTENT_TABS_ACTIVE_NAME','SWITCH_SIDEBAR_COLLAPSE', 'DELETE_CONTENT_TABS'])
    }
  }
</script>

<style lang="css" scoped>
.el-menu--horizontal{
  margin: 0;
  padding:0;
  border: none;
}
.el-menu--horizontal > .el-menu-item{
  width: 180px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.zhedie{
   background: url(../../assets/img/iconclo.png) no-repeat;
    display: inline-block;
  width:20px;height:13px;fill: currentColor;
}

</style>

