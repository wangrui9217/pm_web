<template>
  <div class="common-list-page basedCost">
      <page-template  :toolTitle="true" >
        <data-list
        
          :count-undo="total"
          ref="dataList"
          @data-refresh="getData"
       
          :total="total"
          :toolFilterReceive="true"
       

          >
          <div style="width: 100%;padding:0 24px;background:#fff">
                 <el-table
                :data="dataList"
                highlight-current-row
                >
            <el-table-column
              prop="compName"
              label="企业名称"
              align="center"
            />
            <el-table-column
              prop="epoch"
              label="营销次数"
              align="center"
            />
            <el-table-column
              prop="industryCategory"
              label="行业分类"
              align="center"
            />
            
             <el-table-column
              prop="compCreditLevel"
              label="信用等级"
              align="center"
              min-width="120"
            />
            
            <el-table-column
              prop="totalCreditAmount"
              label="授信额度"
              align="center"
              min-width="150"
            >
            </el-table-column>
              <el-table-column
              prop="orgName"
              label="所属支行"
              align="center"
              width="150"
            />
            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="credtinfo(scope.row.id)">查看报告</el-button>
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
      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
   credtinfo(id){
     
      this.$router.push({ name: '工单详情', query: {id:id,ismange:1}})
     
      
   },
      moment: moment,
      getData (params) {
        api.queryCustomerInfo(params).
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