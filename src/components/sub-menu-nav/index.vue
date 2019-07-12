<template>
  <el-submenu
    v-if="menuNav.children && menuNav.children.length >= 1"
    :data-idx="menuNav.menuId + ''"
    :index="menuNav.menuId + ''">
    <template slot="title">
      <i :class="['site-sidebar__menu-icon', menuNav.icon ? menuNav.icon : 'icon_none']"></i>
      <span>{{ menuNav.name }}</span>
    </template>
    <sub-menu-nav
      v-for="item in menuNav.children" 
      :key="item.menuId"
      :menu-nav="item">
    </sub-menu-nav>
  </el-submenu>
  <el-menu-item
    v-else
    :index="menuNav.menuId + ''"
    :data-idx="menuNav.menuId + ''"
    @click="gotoRouteHandle(menuNav.url)"
    style="padding:0 50px 0 10px;"
    >
     <i :class="['site-sidebar__menu-icon', menuNav.icon ? menuNav.icon : 'icon_none']"></i>
    <span>{{ menuNav.name }}</span>
  </el-menu-item>
</template>

<script>
  import SubMenuNav from '../sub-menu-nav'
  import { getRouteNameByUrl } from '@/utils'
  export default {
    name: 'sub-menu-nav',
    props: {
      menuNav: Object,
      required: true
    },
    components: {
      SubMenuNav
    },
    methods: {
      // 跳转到菜单导航对应路由
      gotoRouteHandle (url) {
        if (url.indexOf('insert-iframe') > -1) {
          this.$router.push({path: url})
        } else {
         /*  var routeName = getRouteNameByUrl(url)
          console.log('routeName==>', routeName)
          if (/\S/.test(routeName)) {
            this.$router.push({ name: routeName })
          } */
          console.log("url=>",url)
          this.$router.push({ path: url })
        }
      }
    }
  }
</script>
<style lang="less">
.icon_none{
    display: inline-block;
    width: 18px;
    height: 18px;
}
.icon_audit{
    background: url(../../assets/img/icon_audit.png) no-repeat;
    display: inline-block;
    width: 18px;
    height: 18px;
}
.icon_financial{
    background: url(../../assets/img/icon_financial.png) no-repeat;
    display: inline-block;
    width: 18px;
    height: 18px;
}
.icon_product{
    background: url(../../assets/img/icon_product.png) no-repeat;
    display: inline-block;
    width: 18px;
    height: 18px;
}
.icon_system{
    background: url(../../assets/img/icon_system.png) no-repeat;
    display: inline-block;
    width: 18px;
    height: 18px;
}
</style>

