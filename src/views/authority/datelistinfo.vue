<template>
  <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" pageTitle="日志管理">
        <data-list
          :count-undo="total"
          ref="dataList"

          >
          <div style="width: 100%;padding:0 24px;background:#fff">
                           <el-form ref="financeInfoTable" :model="dataList" label-width="140px" style="text-align:left;margin-bottom:10px;background:#fff" >

                    <el-row>
                        <el-col :span="6">
                          <el-form-item label="操作人 : " >
                            <span>{{dataList.operName}}</span>
                        
                          </el-form-item>
                        </el-col>
                         <el-col :span="6">
                          <el-form-item label="操作IP地址 : " >
                            <span>{{dataList.operUserip}}</span>
                        
                          </el-form-item>
                        </el-col>
                        <el-col :span="8" >
                          <el-form-item label="操作时间 : ">
                            <span>{{dataList.operTime}}</span>
                         
                    
                          </el-form-item>
                        </el-col>
                      </el-row>

                    <el-row>
                        <el-col :span="6">
                          <el-form-item label="输入参数 : " >
                            <span>{{dataList.operParams}}</span>
                        
                          </el-form-item>
                        </el-col>
                      </el-row>
                       <el-row>
                        <el-col :span="6">
                          <el-form-item label="输出参数 : " >
                            <span>{{dataList.operResult}}</span>
                        
                          </el-form-item>
                        </el-col>
                      </el-row>
                           </el-form>
          </div>
         
        </data-list>
      </page-template>
      
  </div>
</template>

<script>
  import PageTemplate from '@/components/page-template'
  import DataList from '@/components/data-list/data-list'
  export default {
    data () {
      return {
        dialogVisible:false,   
        dataList: {},
        total: 0,
        positionPath: [{name: '系统管理'}, {name: '日志管理'},{name: '查看'}],
      }
    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
 


    },
    created(){
        this.dataList=JSON.parse(this.$route.query.result)

    }
  }
</script>

<style lang="scss">
.common-list-page.basedCost{
  padding:0;
  .el-table {
    .cell{
    font-size: 14px;
    color: rgba(0,0,0,0.85);
    letter-spacing: 0;
    line-height: 22px;
    .of-hidden.actList .el-button--small{
        font-size: 14px;
        color: #1890FF;
        line-height: 22px;
      }
    }
   
  }
  .el-table--enable-row-transition .el-table__body td{
     font-size: 14px;
     letter-spacing: 0;
    line-height: 14px;
    padding-top:10px;
    padding-bottom:9px;
    border-right:none;
  }
  .el-table__body tr.current-row > td ,.el-table__body tr:hover > td {
    background-color: #E6F7FF;
  }

}
</style>