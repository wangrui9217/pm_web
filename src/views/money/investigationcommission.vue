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
              prop="name"
              label="费用名称"
              align="center"
            />
            <el-table-column
              prop="commissionCalculateName"
              label="奖励节点"
              align="center"
            />
             <el-table-column

              label="获取类型"
              align="center"
              min-width="120"
              :formatter="countTypefn"
            />
            
            <el-table-column
              prop="amount"
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
                  <el-button type="text" size="small" @click="credtinfo(scope.row.id)">编辑</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </div>
         
        </data-list>
      </page-template>
            <!-- 弹窗 -->
      <el-dialog title="编辑调查佣金配置" :visible.sync="showAddDialog" :close-on-click-modal="false" width='1000px'>
          <el-form :model="ruleForm2" label-width="120px" label-position="right" ref="addform" :rules="dataRule">
              <el-row>
                <el-col :span="8">
                           <el-form-item label="费用名称: ">
                            <span>{{ruleForm2.name}}</span>
                            </el-form-item>
                </el-col>
                <el-col :span="8" >
                    <el-form-item label="费用发放类型: " class="marlft20">
                    <span>{{ruleForm2.countType}}</span>
            
                    </el-form-item>
                </el-col>
                <el-col :span="8" >
                    <el-form-item label="奖励节点: " class="marlft20">
                    <span>{{ruleForm2.commissionCalculateName}}</span>
            
                    </el-form-item>
                </el-col>
                </el-row>
                    <el-row
                     v-for="(domain, index) in ruleForm2.calculates"
                   
                        :key="index"                    
                    >
                        <el-col :span="9">
                                <el-form-item label="工单完成时间: ">
                                    <span>{{timeIntervalfn(domain.timeInterval)}}</span>
                                    </el-form-item>
                        </el-col>
                        <el-col :span="7"  v-if="domain.timeInterval!=4">
                            <el-form-item label="佣金基数(元): " 
                             :prop="'calculates.' + index + '.basicAmount'"
                                :rules="[{
                                required: true, message: '佣金基数不能为空', trigger: 'blur'},
                                  { type: 'number', message: '请输入数字',trigger: 'blur' },
                                  {pattern:/^[\d,.]*$/,message:'请输入自然数',trigger: 'blur'}
                                ]"
                            
                            >
                        <el-input v-model.number="domain.basicAmount" type="number"></el-input>
                    
                            </el-form-item>
                        </el-col>
                         <el-col :span="7"  v-if="domain.timeInterval==4">
                            <el-form-item label="佣金(元): " 
                             :prop="'calculates.' + index + '.basicAmount'"
                                :rules="[{
                                required: true, message: '佣金基数不能为空', trigger: 'blur'},
                                  { type: 'number', message: '请输入数字',trigger: 'blur' }

                                ]"
                            
                            >
                        <el-input v-model.number="domain.basicAmount" type="number"></el-input>
                    
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" >
                            <el-form-item label="奖励比例: " class="marlft20" v-if="domain.timeInterval!=4"
                             :prop="'calculates.' + index + '.ratio'"
                                :rules="[{
                                required: true, message: '奖励比例不能为空', trigger: 'blur'},
                                  { type: 'number', message: '请输入数字',trigger: 'blur' }

                                ]"
                            
                            >
                            <el-input v-model.number="domain.ratio"  style='width:90%'/>%
                    
                            </el-form-item>
                        </el-col>
                </el-row>
                    <el-row v-if="ruleForm2.countType=='每人次(+增量元/万元)'">
                <el-col :span="8">
                           <el-form-item label="授信额度: ">
                            <span>增加</span>
                            </el-form-item>
                </el-col>
                <el-col :span="8" >
                    <el-form-item label="费用发放类型: " class="marlft20">
                    <span>每万元</span>
            
                    </el-form-item>
                </el-col>
                <el-col :span="8" >
                    <el-form-item label="佣金: " class="marlft20"  prop="incrBasicAmount"
                 

                    >
                            <el-input v-model.number="ruleForm2.incrBasicAmount"  style='width:90%'/>
                 
            
                    </el-form-item>
                </el-col>
                </el-row>
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
                name:'',
                id:'',
                amount:'',
                calculates:[]
          },
        dataList: [ ],
        total: 0,
        filters: [
          {
            label: false,
            placeholder: '费用名称',
            type: 'input',
            field: 'name',
         
          },  
        
      ],
        positionPath: [{name: '佣金管理'}, {name: '调查佣金配置'}],
             showAddDialog:false,
             bclick:false,
             dataRule:{
                 amount:[
                      { required: true, message: '请输入金额', trigger: 'blur' },

                 ],
                 incrBasicAmount:[{
                                required: true, message: '佣金基数不能为空', trigger: 'blur'},
                                  // { type: 'number', message: '请输入数字',trigger: 'blur' },
                                  // {pattern:/^[\d,.]*$/,message:'请输入自然数',trigger: 'blur'}
                                ]
             }
            
            
      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
   credtinfo(id){
       this.showAddDialog=true;
        this.bclick=false
             api.dcCommissionorder({id}).
                    then((res) => {
                    // console.log("data:"+JSON.stringify(res.data))
                    if (res.data.code == '0') {
                        var data=res.data.message
                        this.ruleForm2.name=data.config.name;
                        this.ruleForm2.countType=this.countTypefn(data.config)
                        this.ruleForm2.commissionCalculateName=data.config.commissionCalculateName
                        this.ruleForm2.id=data.config.id
                        this.ruleForm2.calculates=[];
                        this.ruleForm2.incrBasicAmount=data.config.incrBasicAmount
                        
                        data.calculates.map(el=>this.ruleForm2.calculates.push(el))
                    
                    } else {
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
                    })
      
   },
      moment: moment,
      getData (params) {
        api.dcCommissionMarketList(params).
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
                  str='每人次(+增量元/万元)'
                  break;

          }
          return str
      },
        timeIntervalfn(data){
          var str=''
          switch (data) {
              case 1:
                  str='小于等于24小时'
                  break;
             case 2:
                  str='大于24小时小于等于48小时'
                  break;
                   case 3:
                  str='大于48小时小于等于72小时'
                  break;
                   case 4:
                  str='大于72小时'
                  break;

          }
          return str
      },
      submitAddForm(formName){
        if(this.ruleForm2.countType=='每人次(+增量元/万元)'&&!this.ruleForm2.incrBasicAmount){
  this.$message.error('请输入佣金')
                                return
        }        
        if(this.ruleForm2.countType=='每人次(+增量元/万元)'&&!/^[\d,.]*$/.test(this.ruleForm2.incrBasicAmount)){
                                this.$message.error('佣金请输入自然数')
                                return
            
        }
            this.$refs[formName].validate((valid) => {
            if(valid){
                if(this.bclick){
                                return
                          }
                          this.bclick=true;
                    
                 api.editdcorder(this.ruleForm2).
                        then((res) => {
                                if(res.data.code==0){
                                        this.$router.push(this.$route.path)
                                this.$message.success('操作成功')

                                    this.showAddDialog=false;
                                

                                }else{
                                   this.bclick=false

                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
        this.bclick=false

                        console.log(err)
                        })
            }
            })
      },
      offsubmit(formName){
            this.showAddDialog=false
        this.$refs[formName].clearValidate();

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