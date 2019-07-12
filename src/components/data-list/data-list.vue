<template>
  <div class="data-list-common">
  
    <div class="common-tabs" v-if="tabOptions.length > 0">
      <ul>
        <li v-for="(item,index) in tabOptions" :key="item.value" :class="{'active':item.value==isactive }" @click="activefn(item)">{{item.label}}</li>
        <!-- <router-link :to="item.path">{{item.label}}</router-link> -->
      </ul>
    </div>
    <div class="tool-filter-receive" v-if="toolFilterReceive">
      <div style="padding-bottom: 5px;">
        <div class="tool-filter">
          <data-filter ref="datafilter" v-if="filters.length!=0" :filters="filters" :state="state" :showButtons="showButtons" :showResetButton="showResetButton" @do-filter="doFilter" />
        </div>
        <!-- alignRightFilters -->
        <div class="tool-receive" v-if="alignRightFilters.length > 0">
          <el-input style="width: 200px;float: left;margin-right: 10px;" v-for="item in alignRightFilters" :key="item.field" v-model="item.value" :placeholder="item.placeholder" size="small"></el-input>
          <el-button type="primary" size="medium" class="tool-receive-btn" @click="handleQuery">查询</el-button>
        </div>
        <template v-if="toolReceive">
          <div class="tool-receive">
            <el-button type="primary" size="medium" class="tool-receive-btn" @click="getTask">领取任务</el-button>
          </div>
        </template>
        <template v-if="addProduct">
          <div class="tool-add-product">
            <el-button size="medium" class="tool-disable" @click="stopUseing()">停用</el-button>
            <el-button size="medium" class="tool-able" @click="startUseing()">启用</el-button>
            <el-button type="primary" size="medium" class="tool-add" @click="toAddProduct()">新增</el-button>
          </div>
        </template>
        <template v-if="addActivity">
          <div class="tool-add-product">
            <el-button size="medium" class="tool-disable" @click="stopUseing()">停用</el-button>
            <el-button size="medium" class="tool-able" @click="startUseing()">启用</el-button>
            <el-button type="primary" size="medium" class="tool-add" @click="toAddActivity()">新增</el-button>
          </div>
        </template>
        <template v-if="contractTemplate">
          <div class="tool-add-product">
            <el-button size="medium" class="tool-disable" @click="stpotemp()">停用</el-button>
            <el-button size="medium" class="tool-able" @click="starttemp()">启用</el-button>
            <el-button type="primary" size="medium" class="tool-add" @click="toAddTelmplate()">新增</el-button>
          </div>
        </template>
        <template v-if="add_on_off">
          <div class="tool-add-product">
            <el-button size="medium" class="tool-disable" @click="stpotemp()">停用</el-button>
            <el-button size="medium" class="tool-able" @click="starttemp()">启用</el-button>
            <el-button type="primary" size="medium" class="tool-add" @click="add()">新增</el-button>
          </div>
        </template>
        <template v-if="newProduct">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click.native.stop="add()">新增</el-button>
          </div>
        </template>
        <template v-if="addMenu">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click="getAddMenu">新增</el-button>
          </div>
        </template>
        <template v-if="addDept">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click="getAddMenu">新增</el-button>
          </div>
        </template>
        <template v-if="addRole">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click="getAddRole">新增</el-button>
          </div>
        </template>
        <template v-if="addUser">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click="getAddUser">新增用户</el-button>
            <!-- <el-button type="primary" size="medium" class="tool-add" @click="getDeleteUser">删除用户</el-button> -->
          </div>
        </template>
        <template v-if="customerchange">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click="getCustomer()">名单更新</el-button>
          </div>
        </template>
        <template v-if="addmsg">
          <div class="tool-add-product">
            <el-button type="primary" size="medium" class="tool-add" @click="getAddmsg">新增</el-button>
          </div>
        </template>
        <div class="clear"></div>
      </div>
      <template v-if="toolReceive">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待办任务" name="first"></el-tab-pane>
          <el-tab-pane label="已办任务" name="second"></el-tab-pane>
        </el-tabs>
        <div class="tool-receive-cont" v-if="activeName=='first'">
          <div class="tool-receive-cont-info">
            <!-- {{countCanGet}} -->
            <h3>待处理&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{total?total:0}}</span>条/30条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资源池&nbsp;&nbsp;:&nbsp;&nbsp;<span>{{fcount}}</span>条&nbsp;&nbsp;&nbsp;(一次领取最多10条)</h3>
            <!-- <h3><span>{{total?total:0}}</span>条待处理任务,一次最多可领取10个任务，待办任务最多<span>30</span>个,还能领取<span>{{30-total}}</span>个</h3> -->
          </div>
        </div>
      </template>
    </div>
    <slot />
    <el-pagination layout="total, sizes, prev, pager, next, jumper" v-if="total" background :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes" :page-size="pageSize" style="text-align:center;background:#fff">
    </el-pagination>
  </div>
</template>
<script>
/* eslint-disable */
import DataFilter from '@/components/data-list/data-filter.vue'
import '@/less/data-list.less'
import _ from 'lodash'
  import * as types from '@/store/mutation-types'

import api from '@/api-authority'

/* import {
  mapGetters,
  mapActions
} from 'vuex' */
export default {
  name: 'data-list',
  data() {
    return {
      pageNum: 1,
      defaultPageSize: 10,
      pageSize: 10,
      pageSizes: [2, 10, 20, 30],
      paramsFilter: {},
      activeName: 'first',
      state: 0,
      isactive: 0

    }
  },
  props: {
    tabOptions: {
      type: Array,
      default () {
        return []
      }
    },
    toolFilterReceive: {
      type: Boolean,
      default () {
        return false
      }
    },
    contractTemplate: {
      type: Boolean,
      default () {
        return false
      }
    },
    toolReceive: {
      type: Boolean,
      default () {
        return false
      }
    },
    addProduct: {
      type: Boolean,
      default () {
        return false
      }
    },
    addActivity: {
      type: Boolean,
      default () {
        return false
      }
    },
    newProduct: {
      type: Boolean,
      default () {
        return false
      }
    },
    addMenu: {
      type: Boolean,
      default () {
        return false
      }
    },
    addDept: {
      type: Boolean,
      default () {
        return false
      }
    },
    addRole: {
      type: Boolean,
      default () {
        return false
      }
    },
    addUser: {
      type: Boolean,
      default () {
        return false
      }
    },
    addmsg: {
      type: Boolean,
      default () {
        return false
      }
    },
    customerchange: {
      type: Boolean,
      default () {
        return false
      }
    },
    countUndo: {
      type: Number,
      default () {
        return 0
      }
    },
    countCanGet: {
      type: Number,
      default () {
        return 0
      }
    },
    filters: {
      type: Array,
      default () {
        return []
      }
    },
    alignRightFilters: {
      type: Array,
      default () {
        return []
      }
    },
    fields: {
      type: Object,
      default () {
        return {
          PAGE_SIZE: 'pageSize',
          PAGE_NUMBER: 'pageNum'
        }
      }
    },
    total: {
      type: Number,
      default: 0
    },
    fcount: {
      type: Number,
      default: 0
    },
    showButtons: {
      type: Boolean,
      default: false
    },
    showResetButton: {
      type: Boolean,
      default: false
    },
    routeName: {
      type: String,
      default: ''
    },
    add_on_off: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'data-filter': DataFilter
  },
  computed: {},
  watch: {
    $route: {
      handler(to, from) {
        this.isactive = to.params.state
        if (to.path !== from.path) {
          this.paramsFilter = {}
        } else {
          this.handleRoute(to)
        }
      },
      deep: true
    },
    // 处理刷新页面时候的tab显隐
    tabOptions(newValue){
      if(newValue.length > 0){
        this.isactive = this.$route.params.state
        this.handleRoute({ name: this.routeName,query:{pageNum:1,pageSize:10 }})
      }
    }
  },
  mounted() {

    if(this.tabOptions.length > 0){
      this.isactive = this.$route.params.state
      if(this.isactive != '' && this.isactive != undefined){
        this.handleRoute({ name: this.routeName,query:{pageNum:1,pageSize:10 }})
      }
    }
    else{
      this.handleRoute(this.$route)
    }
  },
  created() {
    
  },

  methods: {
    activefn(data) {
      if(/type/.test(data.path)){
         var arr=data.path.match(/type=(\d)/)[1]
      }
      this.isactive = data.value
      this.$router.push({ name: this.routeName, params: { state: data.value },query:{pageNum:1,pageSize:10,type:arr }})
      this.pageNum=1;
      this.$emit('tabclick', data.value)

    },
    add() {
      this.$emit("addEvent", true);
    },
    stopUseing() {
      //停用
      this.$emit('stop-useing')
    },
    startUseing() {
      //启用
      this.$emit('start-useing')
    },
    getTask() {
      this.$emit('get-task')
    },
    getAddMenu() {
      this.$emit('get-add-menu')
    },
    getAddRole() {
      this.$emit('get-add-role')
    },
    getAddUser() {
      this.$emit('get-add-user')
    },
    getDeleteUser() {
      this.$emit('get-delete-user')
    },
    getAddmsg() {
      this.$emit('getaddmsg')
    },

    getCustomer() {
      this.$emit("changecustomer", true);
    },
    toAddProduct() {
      this.$router.push({ path: '/product-add' })
    },
    toAddTelmplate() {
      this.$router.push({ path: '/template-add' })
    },
    toAddActivity(){
      this.$emit('to-add-activity')
    },
    stpotemp() {
      this.$emit("changgestate", 1);

    },
    starttemp() {
      this.$emit("changgestate", 0);
    },
    handleQuery() {
      let data = {
        pageSize: this.pageSize || this.defaultPageSize,
        pageNum: this.pageNum
      }
      this.alignRightFilters.forEach(item => {
        if (item.value) {
          data[item.field] = item.value
        }
      })
      this.$emit('data-refresh', data)
    },
    refresh() {
      var data = Object.assign({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }, this.paramsFilter)
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNum
      delete data.pageSizes
      delete data.pageNum
      this.$emit('data-refresh', data)
    },
    doFilter(paramsFilter) {

      this.paramsFilter = paramsFilter
      var data = Object.assign({
        pageSize: this.pageSize,
        pageNum: 1
      }, this.paramsFilter)
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNum
      delete data.pageSizes
      console.log(data,222)
      this.$emit('data-refresh', data)
    },
    handleSizeChange(val) {
      this.pageSize = val
            this.$store.commit(types.UPDATE_pagrsizes,val)
      var data = Object.assign({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }, this.paramsFilter)
      
      this.$emit('data-refresh', data)
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = Object.assign({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }, this.paramsFilter)
      console.log(data,77)
      this.$store.commit(types.UPDATE_pagenum,val)
      
      this.$emit('data-refresh', data)
    },
    handleRoute(route) {
      this.$store.commit(types.UPDATE_pagrsizes,10)
      this.$store.commit(types.UPDATE_pagenum,1)

      var pgsizeSting = this.pageSizes.toString()
     
      var page = Object.assign({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }, route.query)
      page.pageNum = Number(page.pageNum)
      if (!page.pageNum || !_.isNumber(page.pageNum)) {
        page.pageNum = this.pageNum
      } else {
        this.pageNum = Number(page.pageNum)
      }

      if (!page.pageSize || !_.isNumber(page.pageSize)) {
       
        if (pgsizeSting.indexOf(page.pageSize) === -1) {
          page.pageSize = this.defaultPageSize
          this.$router.replace({
            name: route.name,
            query: Object.assign({}, this.$route.query, {
              pageSize: page.pageSize,
              pageNum: page.pageNum
            })
          })
       return false;
        } else {
          this.pageSize = Number(page.pageSize)
        }
      } else {
        this.pageSize = Number(page.pageSize)
      }
      console.log(route.query)
      if (isNaN(route.query.pageSize) || isNaN(route.query.pageNum)) {
        this.$router.replace({
          name: route.name,
          query: Object.assign({}, this.$route.query, {
            pageSize: page.pageSize,
            pageNum: page.pageNum
          })
        })
       return false;
      }
      var data = Object.assign({
        pageSize: page.pageSize,
        pageNum: page.pageNum
      }, this.paramsFilter)
      data[this.fields.PAGE_SIZE] = data.pageSize
      data[this.fields.PAGE_NUMBER] = data.pageNum
      delete data.pageSizes
      // delete data.pageNum
      delete data.node
    
      this.$emit('data-refresh', data)
    },
    handleClick(tab, event) {
      this.$emit('statename', this.activeName)
      this.state = this.activeName == 'first' ? 0 : 1
    },
    handleInput(field) {
      this.$set(this.filterList[index], 'value', val)
      this.$forceUpdate()
    },
    // executeFilt () {
    //   this.$refs.datafilter.handleFilter()
    // }
  }
}

</script>
<style lang="less">
.clear {
  clear: both;
  height: 0;
  line-height: 0;
  font-size: 0
}

</style>
