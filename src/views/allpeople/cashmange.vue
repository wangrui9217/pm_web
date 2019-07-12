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
              prop="applyNumber"
              label="申请编号"
              align="center"
            />
            <el-table-column
              prop="withdramalName"
              label="客户姓名"
              align="center"
            />
             <el-table-column

              label="银行卡号"
              align="center"
              min-width="120"
              prop="withdramalCardno"
            />
            
            <el-table-column
              prop="orgName"
              label="开卡支行"
              align="center"
              :formatter="el=>'泗阳商业银行'"
       
            >
            </el-table-column>
        
     
               <el-table-column
              prop="withdramalUserPhone"
              label="手机号码"
              align="center"
       
            >
            </el-table-column>
               <el-table-column
              prop="totalWithdramalAmount"
              label="可提现额度"
              align="center"

            >
            </el-table-column>
               <el-table-column
              prop="withdramalAmount"
              label="本次提现额度"
              align="center"
        
            >
            </el-table-column>
                   <el-table-column
              prop="time"
              label="剩余度"
              align="center"
           
              :formatter="el=>el.totalWithdramalAmount-el.withdramalAmount"
              
              />
                  <el-table-column
              prop="registerTime"
              label="注册日期"
              align="center"
              min-width="140" />
                   <el-table-column
              :formatter="el=>el.status==2?'已提现':'待提现'"
              label="提现状态"
              align="center" />
       

         
            <el-table-column
              align="center"
              width="180"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden ">
                  <el-button type="text" size="small" @click="credtinfo(scope.row)" :disabled="scope.row.status==2">确认提现</el-button>
                  <el-button type="text" size="small" @click="credtinfo2(scope.row)">获取明细</el-button>
 
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
        dialogVisible:false,    
       
     
          ruleForm2:{
                name:'',
                id:''
          },
        dataList: [ ],
        total: 0,
        filters: [
          {
            label: false,
            placeholder: '客户姓名/手机号',
            type: 'input',
            field: 'params',
         
          },  
           {
              label:'状态 : ',
            type: 'select',
            field: 'status',
            options:[{
                label:'待提现',
                value:'1'
              },{
                label:'已提现',
                value:'2'
              }]
         
          }, 
        
      ],
        positionPath: [{name: '全民营销'}, {name: '提现管理'}],
             showAddDialog:false,
             bclick:false,
             dataRule:{
                 amount:[
                      { required: true, message: '请输入金额', trigger: 'blur' },

                 ]
             }
            
            
      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
   credtinfo(data){
       
      this.$router.push({ name: '确认提现', params: { id: JSON.stringify(data) }})
   },

   credtinfo2(data){
       
      this.$router.push({ name: '全民营销获取明细', params: { id: JSON.stringify(data) }})
   },

      moment: moment,
      getData (params) {
        api.searchWithdramalList(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message.list
            this.total=res.data.message.total

          
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