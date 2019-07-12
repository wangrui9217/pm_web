<template>
  <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" >
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
            <!-- <el-table-column
              type="index"
              label="序号"
              align="center"
              min-width="80"
            /> -->
            <el-table-column
              prop="customerNumber"
              label="客户编号"
              align="center"
              min-width="100"
            />
            <el-table-column
              prop="username"
              label="注册手机号码"
              align="center"
       
            />
             <el-table-column
              prop="referrer"
              label="推荐人ID"
              align="center"
           
   
            />
            
            <el-table-column
              prop="createTime"
              label="注册日期"
              align="center"
              min-width="150"
            >
            </el-table-column>
              <el-table-column
              prop="cardNo"
              label="个人银行卡号"
              align="center"
            />
              <el-table-column
              prop="bankName"
              label="银行卡开户行"
              align="center"
            />
              <el-table-column
              prop="phone"
              label="银行预留手机号码"
              align="center"
       
              width="150"

            />
       
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
            user:{},
        dialogVisible:false,
        dataList: [ ],
        total: 0,
        filters: [
          {
            label: false,
            placeholder: '注册手机号码',
            type: 'input',
            field: 'mobile'
          },  
        
      ],
        positionPath: [ {name: '注册用户管理'}],


      }
    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
    getmsg(data){
        this.dialogVisible=true;
        this.user=data;
    },
   credtinfo(){
       this.$router.push('/repayment-info')
   },
      moment: moment,
      getData (params) {
        api.searchCustomerList(params).
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
       msgtype(type){
         var types='';
     
         switch (type.type) {
           case 'RETRIEVE_PASSWORD':
           types='找回密码'
             
             break;
         case 'REGISTER("':
           types='注册'
             
             break;
         }
         return types
       },
       msgnode(node){
          var types='';
     console.log(node,2222)
         switch (node) {
           case 'SUCCESS':
           types='发送成功'
             
             break;
         case 'FAIL':
           types='发送失败'
             
             break;
          case 'SENDING':
           types='发送中'
             
             break;

         }
         return types

       },
       contentfn(content){
        if(content.content){           
          if(content.content.length>10){
            return content.content.substring(0,10)+'...'
          }else{
            return content.content
          }

        }
          
       
       }
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