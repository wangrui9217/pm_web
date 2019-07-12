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
              label="排名"
              align="center"
              min-width="30"
              :index="indexMethod"
            />
         
            <el-table-column
              prop="username"
              label="工号"
              align="center"
            />
            <el-table-column
              prop="realname"
              label="姓名"
              align="center"
            />
             <el-table-column

              label="所属事业部"
              align="center"
              min-width="120"
                   prop="sbName"
            />
            
            <el-table-column
                 prop="buName"
    
              label="所属支行"
              align="center"
           
       
            >
            </el-table-column>
        
     
               <el-table-column
              prop="num"
              label="营销客户数量"
              align="center"
       
            >
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
            label: '姓名: ',
            placeholder: '姓名',
            type: 'input',
            field: 'realname',
         
          },  
            {
            label: '工号: ',
            placeholder: '工号',
            type: 'input',
            field: 'username',
         
          }
        
      ],
        positionPath: [{name: '客户经理营销记录'}],
            
            
      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
       indexMethod(index) {
        return (this.$store.state.pagenum-1)%this.$store.state.pagesizes*this.$store.state.pagesizes+(index+1)
      },

      moment: moment,
      getData (params) {
                if(this.$route.query.type==1){
                        api.queryMakerRecordHead(params).
                    then((res) => {
                    if (res.data.code == '0') {
                        this.dataList = res.data.message.list
                        this.total=res.data.message.total
                    
                    } else {
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
                    })
                }else if(this.$route.query.type==2){
                           api.queryMakerRecordCareer(params).
                    then((res) => {
                    if (res.data.code == '0') {
                        this.dataList = res.data.message.list
                        this.total=res.data.message.total

                    
                    } else {
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
                    })
                }else{
                       api.queryMakerRecordBranch(params).
                    then((res) => {
                    if (res.data.code == '0') {
                        this.dataList = res.data.message.list
                        this.total=res.data.message.total

                    
                    } else {
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
                    })
                }
        
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