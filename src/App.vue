<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  import * as types from '@/store/mutation-types'
  import api from '@/api-authority'
  export default {
    data(){
      return{
       
      }
    },
    created () {
      var userinfo=null
      if(localStorage.getItem("userinfo")){
        userinfo=JSON.parse(userinfo)
        this.$store.commit(types.UPDATE_userinfo, userinfo)
          

        if(!/login/.test(location.href)){
         this.getMenuNavigation()
          
        }
      }


    },
    methods: {
      //获取菜单导航
      getMenuNavigation(){
        api.getNavigation({}).then(({data}) => {
          if (data.success && data.data) {
            // localStorage.mudules=JSON.stringify(data.data);
            let menus = data.data.filter(item => {
              return item.type != 2
            })
            this.$store.commit(types.AUTH_DATA, data.data)
            this.$store.commit(types.UPDATE_NAVIGATION, menus)
          }else{
            this.$message.error(data.messsage)
          }
        }) 
        
      }
    }
  }
</script>