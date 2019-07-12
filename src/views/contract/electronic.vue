<template>
  <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" pageTitle="电子合同管理">
        <data-list
        
          :count-undo="total"
          ref="dataList"
          @data-refresh="getData"
          :filters="filters"
          :total="total"
          :toolFilterReceive="true"
       

          >
          <div style="width: 100%;padding:0 24px;background:#fff">
                 <el-table
                :data="dataList"
                highlight-current-row
                >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              min-width="80"
              :index="indexMethod"

            />
            <el-table-column
              prop="businessNo"
              label="业务编号"
              align="center"
            />
            <el-table-column
              prop="ownContractNo"
              label="银行合同编号"
              align="center"
            />
             <el-table-column
              prop="contractName"
              label="合同名称"
              align="center"
              min-width="120"
            />
            
            <el-table-column
              prop="compName"
              label="客户名称"
              align="center"
              min-width="150"
            >
            </el-table-column>
              <el-table-column
              prop="contractAmount"
              label="合同金额"
              align="center"
              width="150"
            />
              <el-table-column
              prop="legalName"
              label="法人名称"
              align="center"
            />
               <el-table-column
              prop="legalPhone"
              label="手机号码"
              align="center"
            />
                <el-table-column
              prop="outContractNo"
              label="借据号"
              align="center"
            />
                <el-table-column
              prop="signTime"
              label="签订日期"
              align="center"
            />
            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="credtinfo(scope.row.contactNo)">下载</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </div>
         
        </data-list>
      </page-template>
      
  </div>
</template>

<script>
  import PageTemplate from '@/components/page-template'
  import DataList from '@/components/data-list/data-list'
  import api from '@/api-authority'
  import moment from "moment"
  import {baseURLDownloads} from '../../api-authority/config.js'

  export default {
    data () {
  
 
      return {
baseURLDownloads:baseURLDownloads,
        flag:false,
        dialogVisible:false,    
        textarea: '',
         formInline: {
          name: '',
          costNo:'',
          },
          ruleForm2:{

          },
        dataList: [ ],
        total: 0,
        filters: [
          {
            label: false,
            placeholder: '关键字查询',
            type: 'input',
            field: 'condition',
         
          },  
        
      ],
        positionPath: [{name: '合同管理'}, {name: '合同记录'}],
      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
   credtinfo(id){
     
        location.href=this.baseURLDownloads+'/loan/contract/downLoadContract?contracId='+id
      
   },
      moment: moment,
      getData (params) {
        api.searchrecordTemplateList(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message.list
            this.total = res.data.message.total
          } else {
            this.$message.error('请求失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      indexMethod(index) {
        return (this.$store.state.pagenum-1)%this.$store.state.pagesizes*this.$store.state.pagesizes+(index+1)
      },
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