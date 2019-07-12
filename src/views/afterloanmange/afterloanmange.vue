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
              <div style="margin-bottom:10px;">
               <el-button type="primary" size="mini" @click="showjc">常规检查设置</el-button> <el-button type="primary" size="mini" @click="showgd">维系工单设置</el-button>

              </div>
                 <el-table
                :data="dataList"
                highlight-current-row
                >

            <el-table-column
              prop="loanNo"
              label="业务编号"
              align="center"
            />
            <el-table-column
              prop="compName"
              label="客户名称"
              align="center"
            />
             <el-table-column

              label="统一社会信用编码"
              align="center"
            
              prop="creditNo"
            />
            
            <el-table-column
              prop="industryCategory"
              label="行业归属"
              align="center"
       
           />
    
        
     
               <el-table-column
              prop="areaName"
              label="地区归属"
              align="center"
       
            >
            </el-table-column>
               <el-table-column
              prop="loanBank"
              label="贷款银行"
              align="center"

            >
            </el-table-column>
               <el-table-column
              prop="compCreditLevel"
              label="客户信用评级"
              align="center"
              min-width="100"
        
            >
            </el-table-column>
                   <el-table-column
              prop="creditAmount"
              label="授信金额"
              align="center"
             />
                    <el-table-column
              prop="loanAmount"
              label="贷款金额"
              align="center"
             />
                    <el-table-column
              prop="loanTime"
              label="放款日期"
              align="center"
              />
                    <el-table-column
              prop="productLoanTrem"
              label="贷款期限"
              align="center"
           />
                    <!-- <el-table-column
              prop="time"
              label="到期日期"
              align="center"
              min-width="150" /> -->
       
             <el-table-column
              align="center"
              width="70"
              label="黄色预警">
              <template slot-scope="scope">
                <div class="of-hidden actList yellow">
                  <el-button type="text" size="small" @click="yellowwarning(scope.row)">{{scope.row.yellowSignalCount}}</el-button>
                </div>
              </template>
            </el-table-column>
             <el-table-column
              align="center"
              width="70"
              label="红色预警">
              <template slot-scope="scope">
                <div class="of-hidden actList red">
                  <el-button type="text" size="small" @click="redwwarning(scope.row)">{{scope.row.redSignalCount}}</el-button>
                </div>
              </template>
            </el-table-column>
                <el-table-column
              align="center"
              min-width="80"       
              label="是否允许检查">
              <template slot-scope="scope">
                <div class="of-hidden ">
                  <span   :class="[scope.row.isAllow ==0 ? 'success-color' : 'danger-color']">{{scope.row.isAllow==0?'允许':'不允许'}}</span>
                </div>
              </template>
        
            </el-table-column>
         
            <el-table-column
              align="center"
              min-width="160"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden ">
                  <el-button type="text" size="small" @click="credtinfo(scope.row)" :disabled="scope.row.isAllow==1">发起检查</el-button>
                  <el-button type="text" size="small" @click="areaDivision(scope.row)" :disabled="!!scope.row.areaName">所属支行划分</el-button>

                  <el-button type="text" size="small" @click="credtinfo2(scope.row)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          </div>
         
        </data-list>
      </page-template>
                 <!-- 弹窗 -->
      <el-dialog :title="ruleForm2.status==1?'常规贷后检查':'维系工单设置'" :visible.sync="showAddDialog" :close-on-click-modal="false" >
          <el-form :model="ruleForm2" label-width="120px" label-position="top" ref="addform" >
            <el-form-item :label="ruleForm2.status==1?'时间规则设置: ':'维系工单设置: ' ">
              贷后常规检查，从放款日开始计算，每<el-select v-model="ruleForm2.day" size="mini"  style="width:60px;">
      <el-option label="15" value="15"></el-option>
      <el-option label="30" value="30"></el-option>
      <el-option label="60" value="60"></el-option>
      <el-option label="90" value="90"></el-option>

    </el-select>天进行一次{{ruleForm2.status==1?'常规贷后检查':"客户维系"}}.
            </el-form-item>
   
          </el-form>
      
          <div slot="footer" class="dialog-footer">
              <el-button @click="showAddDialog=false">取 消</el-button>
              <el-button type="primary" @click="submitAddForm('addform')" :disabled="bclick">确 定</el-button>
          </div>
        </el-dialog>

           <el-dialog :title="rory==1?'红色预警详情':'黄色预警详情'" :visible.sync="showAddDialog2" :close-on-click-modal="false" >
            <div v-for="(item,index) in wanges" :key="index">
                <el-table
                        :data="wanges[index]"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="compName"
                        label="客户名称"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="warnNumber"
                        label="信号编号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        :formatter="el=>el.signalType==1?'红灯':'黄灯'"

                        label="信号等级">
                        </el-table-column>
                            <el-table-column
                        prop="signalItems"
                        label="预警事项">
                        </el-table-column>
                                 <el-table-column
                       :formatter="el=>el.releaseStatus==1?'未消除':'消除'"
                        label="信号消除状态">
                        </el-table-column>
                    
 
                    </el-table>
                         <el-input type="textarea" v-model="item[0].signalContent" :readonly="true"></el-input>
            </div>
                  <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10,20,30]"
              :page-size="pagesizes"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click='showAddDialog2=false'>确 定</el-button>
          </div>
        </el-dialog>
      
        <el-dialog title="业务所属支行划分" :visible.sync="dialogVisible" width="400px">
      <el-form ref="formInline" :model="formInline" label-width="80px" >
      <el-form-item label="业务编号">
          <el-input v-model="formInline.loanNo" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formInline.compName" :readonly="true">
          </el-input>
        </el-form-item>
          <el-form-item label="归属支行">
          <el-select v-model="formInline.orgId" placeholder="请选择">
            <el-option v-for="item in breanchlist" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="postareaDivision()" :disabled="flag">确 定</el-button>
      </span>
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
      computed:{
    areas(){
      var arr=[]
      this.$store.state.areas.map(el=>{
        arr.push({label:el.areaName,value:el.id})
      
      })
       return arr
    },
    credit(){
        var arr=[]
      this.$store.state.credit.map(el=>{
        arr.push({label:el.levelName,value:el.levelName})
      
      })
       return arr
 
    },
    filters(){
      return [{
        label: "客户名称: ",
        type: "input",
        field: "compName"
      }, {
        label: "地区归属: ",
        type: 'select',
        field: 'areaId',
        options:this.areas
      }, {
        label: "信用等级: ",
        type: 'select',
        field: 'level',
        options:this.credit
      }]
    }
},
    data () {
  
 
      return {
        showAddDialog:false,    
        showAddDialog2:false,
        dialogVisible:false,
        flag:false,
        rory:1,
       bclick:false,
     
          ruleForm2:{
                day:15,
                status:1
          },
        dataList: [ ],
        breanchlist:[],
        formInline:{
          orgId:'',
        },
        total: 0,
        positionPath: [{name: '贷后管理'}],  
        wanges:[] ,
        currentPage4:1,
        pagesizes:10,
        listid:'',   
        compName:'',
        total:0

      }

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
         handleSizeChange(val) {
        this.pagesizes=val;
        this.currentPage4=1
        this.getsearchWarnList({id:this.listid,rory:this.rory})

      },
      handleCurrentChange(val) {
        this.currentPage4=val;
        this.getsearchWarnList({id:this.listid,rory:this.rory})
     
      },
      getsearchWarnList(params){
        this.wanges=[]
                    const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
                 api.searchWarnList({id:params.id,status:params.rory,pageNum:this.currentPage4,pageSize:this.pagesizes}).
                    then((res) => {
            loading.close()
                      if (res.data.code == '0') {
                      
                                this.wanges=res.data.message.list

                                this.wanges.map(el=>el.compName=this.compName)
                            this.wanges= this.wanges.map(el=>{
                                  return  el=[el]
                                })
                              this.total=res.data.message.total
                      
                      } else {

                        this.$message.error(res.data.message)
                      }
                    }).catch((err) => {
            loading.close()

                      console.log(err)
                    })

      },
   credtinfo(data){

       this.$confirm('此操作将发起检查, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
               api.inspectionStart({id:data.id}).
        then((res) => {

          if (res.data.code == '0') {
                this.$message({
                    type: 'success',
                    message: '发起成功'
                });
                                        this.$router.push(this.$route.path)

          
          } else {

            this.$message.error(res.data.message)
          }
        }).catch((err) => {
          console.log(err)
        })
        })
  
 
   },
    areaDivision(data){
          this.dialogVisible=true
          this.formInline.compName=data.compName 
          this.formInline.loanNo=data.loanNo   
          this.formInline.creditNo=data.creditNo
            this.flag=false

          api.searchOrgByArea({areaId:data.id}).
              then((res) => {
                if (res.data.code == '0') {
         
                      this.breanchlist=res.data.message
                      this.formInline.orgId=this.breanchlist[0].id
                    
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch((err) => {
                console.log(err)
              })
    },
       postareaDivision(){
         if(this.flag){
            return
         }
         this.flag=true
        api.divisionBranch(this.formInline).
          then((res) => {
            if (res.data.code == '0') {
                this.$message.success('操作成功')
                  this.$router.push(this.$route.path)

                this.dialogVisible=false

            } else {
            this.flag=false

              this.$message.error(res.data.message)
            }
          }).catch((err) => {
            this.flag=false

            console.log(err)
          })
    },
   credtinfo2(data){
      this.$router.push({ name: '贷后管理详情', params: { id: data.id }})

   },
   yellowwarning(data){
       this.showAddDialog2=true;
       this.rory=2;
          this.listid=data.id
      this.currentPage4=1;
      this.pagesizes=10
      this.compName=data.compName
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
                 api.searchWarnList({id:data.id,status:2,pageNum:this.currentPage4,pageSize:this.pagesizes}).
        then((res) => {
loading.close()

          if (res.data.code == '0') {
          
                    this.wanges=res.data.message.list
                    this.wanges.map(el=>el.compName=data.compName)
                this.wanges= this.wanges.map(el=>{
                      return  el=[el]
                    })
                              this.total=res.data.message.total
               
          
          } else {

            this.$message.error(res.data.message)
          }
        }).catch((err) => {
loading.close()

          console.log(err)
        })

   },
   redwwarning(data){
    this.showAddDialog2=true;
       this.rory=1;
           const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.listid=data.id
                 api.searchWarnList({id:data.id,status:1,pageNum:this.currentPage4,pageSize:this.pagesizes}).
        then((res) => {
loading.close()
          if (res.data.code == '0') {
          
                    this.wanges=res.data.message.list
                    this.wanges.map(el=>el.compName=data.compName)
                         this.wanges= this.wanges.map(el=>{
                      return  el=[el]
                    })
                              this.total=res.data.message.total

          
          } else {

            this.$message.error(res.data.message)
          }
        }).catch((err) => {
loading.close()

          console.log(err)
        })
   },
      moment: moment,
      getData (params) {
        api.getLoanAfterList(params).
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

      submitAddForm(formName){
                if(this.bclick){
                                return
                          }
                          this.bclick=true;
                 api.setDay(this.ruleForm2).
                        then((res) => {
                                if(res.data.code==0){
                                        this.$router.push(this.$route.path)
                                this.$message.success('操作成功')

                                    this.showAddDialog=false;
                                

                                }else{
                                    this.$message.error(res.data.message)
                                    this.bclick=false
                                }
                        }).catch((err) => {
                                this.bclick=false
                        })
      },
      showjc(){
          this.showAddDialog=true
          this.bclick=false
          this.ruleForm2.status=1
      },
      showgd(){
           this.showAddDialog=true
          this.bclick=false
          this.ruleForm2.status=2
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
        line-height: 22px;
      }
    }
    .yellow.of-hidden.actList span{
        color: #f29d38;
    }
     .red.of-hidden.actList span{
        color: #FA5555;
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