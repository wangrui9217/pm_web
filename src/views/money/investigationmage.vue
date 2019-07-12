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
              prop="username"
              label="工号"
              align="center"
            />
            <el-table-column
              prop="realname"
              label="员工姓名"
              align="center"
            />
             <el-table-column

              label="手机号码"
              align="center"
              min-width="120"
              prop="phone"
            />
            
            <el-table-column
              prop="orgName"
              label="所属支行"
              align="center"
       
            >
            </el-table-column>
        
     
               <el-table-column
              prop="areaName"
              label="所属区域"
              align="center"
       
            >
            </el-table-column>
               <el-table-column
              prop="amountMon"
              label="当月佣金"
              align="center"

            >
            </el-table-column>
               <el-table-column
              prop="amountAll"
              label="累计佣金"
              align="center"
        
            >
            </el-table-column>
                   <el-table-column
              prop="time"
              label="更新日期"
              align="center"
              min-width="150" />
       

         
            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="credtinfo(scope.row)">查看</el-button>
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
    computed:{
        areas(){
      var arr=[]
      this.$store.state.areas.map(el=>{
        arr.push({label:el.areaName,value:el.id})
      
      })
       return arr
    },
           filters(){
      return [{
        label: "所属支行: ",
        type: 'select',
        field: 'orgId',
        options:this.allbanks
      },{
        label: "所属区域: ",
        type: 'select',
        field: 'areaId',
        options:this.areas
      },{
            label: false,
            placeholder: '工号/员工姓名',
            type: 'input',
            field: 'params',
         
          }
      
      ]
    }
    },
    data () {
      
  
 
      return {
        dialogVisible:false,    
       
     
          ruleForm2:{
                name:'',
                id:''
          },
        dataList: [ ],
        total: 0,
        positionPath: [{name: '佣金管理'}, {name: '调查佣金管理'}],
             showAddDialog:false,
             bclick:false,
             dataRule:{
                 amount:[
                      { required: true, message: '请输入金额', trigger: 'blur' },

                 ]
             },
             allbanks:[]
            
            
      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
   credtinfo(data){
       
      this.$router.push({ name: '调查佣金管理详情', params: { id: data.id }})
   },
      moment: moment,
      getData (params) {
        api.searchRecordSurveyList(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message.list
          
          } else {
            this.$message.error('请求失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      countTypefn(data){
          var str=''
          switch (data.countType) {
              case '1':
                  str='每人次'
                  break;
             case '2':
                  str='每笔次'
                  break;
                   case '3':
                  str='用信元/万元'
                  break;
                   case '4':
                  str='每月'
                  break;
                   case '5':
                  str='每人次'
                  break;

          }
          return str
      },
      submitAddForm(formName){
                if(this.bclick){
                                return
                          }
                          this.bclick=true;
                 api.editmarketorder(this.ruleForm2).
                        then((res) => {
                                if(res.data.code==0){
                                        this.$router.push(this.$route.path)
                                this.$message.success('操作成功')

                                    this.showAddDialog=false;
                                

                                }else{
                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
                        console.log(err)
                        })
      },
      getAllBanks(){
             api.getAllBanks().
                        then((res) => {
                                if(res.data.code==1){
                                   var data=res.data.data.depts;
                                   data.map(el=>{
                                     this.allbanks.push({label:el.name,value:el.orgId})
                                   })
                                

                                }else{
                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
                        console.log(err)
                        })
      }
    },
    created(){
      this.getAllBanks()
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