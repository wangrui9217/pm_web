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
            />
            <el-table-column
          
              label="佣金类型"
              align="center"
              :formatter="el=>el.generalizeCalculateCode=='CM_OPEN_ACCOUNT'?'开户成功佣金':el.generalizeCalculateCode=='CM_CREDIT_GRANTING'?'正式授信成功佣金':'用信成功佣金'"
            />
       
             <el-table-column

              label="获取类型"
              align="center"
              min-width="120"
              :formatter="countTypefn"
            />
            
            <el-table-column
              prop="generalizeAmount"
              label="佣金额度"
              align="center"
              min-width="150"
            >
            </el-table-column>
       

         
            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click="credtinfo(scope.row)">编辑</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </div>
         
        </data-list>
      </page-template>
            <!-- 弹窗 -->
      <el-dialog title="编辑佣金配置" :visible.sync="showAddDialog" :close-on-click-modal="false" >
          <el-form :model="ruleForm2" label-width="120px" label-position="right" ref="addform" :rules="dataRule">
            <el-form-item label="佣金类型: ">
               <span>{{ruleForm2.generalizeCalculateCode}}</span>
            </el-form-item>
             <el-form-item label="佣金额度(元): " prop="generalizeAmount">
                <el-input v-model.trim="ruleForm2.generalizeAmount" auto-complete="off" type="number"></el-input>
            </el-form-item>
          </el-form>
      
          <div slot="footer" class="dialog-footer">
              <el-button @click="offsubmit('addform')">取 消</el-button>
              <el-button type="primary" @click="submitAddForm('addform')" :disabled="bclick">确 定</el-button>
          </div>
        </el-dialog>
      
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
                generalizeCalculateCode:'',
                id:'',
                generalizeAmount:'',
          },
        dataList: [ ],
        total: 0,
        filters: [
  
        
      ],
        positionPath: [{name: '全民营销'}, {name: '全民营销佣金配置'}],
             showAddDialog:false,
             bclick:false,
             dataRule:{
                 generalizeAmount:[
                      { required: true, message: '请输入金额', trigger: 'blur' },
                       {pattern:/^[\d,.]*$/,message:'请输入自然数',trigger: 'blur'}


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
       this.showAddDialog=true;
        this.bclick=false
        this.ruleForm2.generalizeCalculateCode=data.generalizeCalculateCode=='CM_OPEN_ACCOUNT'?'开户成功佣金':data.generalizeCalculateCode=='CM_CREDIT_GRANTING'?'正式授信成功佣金':'用信成功佣金'
        this.ruleForm2.id=data.id
        this.ruleForm2.generalizeAmount=data.generalizeAmount
      
   },
      moment: moment,
      getData (params) {
        api.searchConfigList(params).
        then((res) => {
        // console.log("data:"+JSON.stringify(res.data))
          if (res.data.code == '0') {
            this.dataList = res.data.message
          
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
            this.$refs[formName].validate((valid) => {
            if(valid){
                if(this.bclick){
                                return
                          }
                          this.bclick=true;
                          delete this.ruleForm2.generalizeCalculateCode
                 api.updateConfig(this.ruleForm2).
                        then((res) => {
                       
                                if(res.data.code==0){
                                    console.log(this.$router.push,33)
                                        this.$router.push(this.$route.path)
                                this.$message.success('操作成功')

                                    this.showAddDialog=false;
                                

                                }else{
                                    this.bclick=false
                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
                                    this.bclick=false

                        })
            }
            })
      },
      offsubmit(formName){
            this.showAddDialog=false
        this.$refs[formName].resetFields();

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