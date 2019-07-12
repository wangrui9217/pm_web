<template>
  <div class="page-warp">
    <div class="current-position" v-if="positionPath.length">
      <span>
        所在位置：
      <span v-for='(item, index) in positionPath' :key="index" :class="[index+1===positionPath.length ? 'nowPage' : '']">
        <span>{{item.name}}</span>
        <span class="separator" v-if="positionPath.length-1 !== index">/&nbsp;</span>
      </span>
      </span>
      <el-button type="primary" class="btn-return" @click="$router.go(-1)" v-if="showReturn">返回</el-button>
    </div>
    <!-- <h2 class="page-title">{{pageTitle}}</h2> -->


    <slot></slot>
  </div>
</template>

<script>
  import '@/less/page-template.less'
  export default {
    name: 'page-template',
    props: {
      showReturn: {
        type: Boolean,
        default: false
      },
      positionPath: {
        type: Array,
        default () {
          return []
        }
      },
      toolTitle:{
        type: Boolean,
        default () {
          return false
        }
      },
      pageTitle: {
        type: String,
        default () {
          return '页面标题'
        }
      },
    },
    
    created () {}
  }
</script>
<style lang="less" scoped>
  /deep/.btn-return{
    padding: 0px 17px;
    height: 32px;
    line-height: 32px;
    background: #1890FF;
    border-radius: 4px;
  }
</style>

<style lang="less">
/*只有标题*/
.tool-title{
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: rgba(0,0,0,0.85);
  line-height: 28px;
  font-weight: bold;
  padding:0 32px 16px;
  border-bottom:1px solid #E9E9E9;
  background:#ffffff;
}
.current-position{
  display: flex;
  justify-content: space-between;
  align-items: center;
  &>span>span{
    font-weight: bold;
    font-size: 14px;
    color: #999;
    font-weight: normal;
  }
  .nowPage{
    span{
     color: #333;
     font-weight: normal;
    }
  }
}
</style>
