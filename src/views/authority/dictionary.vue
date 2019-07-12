<template>
    <div class="">
      <div class="list-container">
       <page-template :position-path="positionPath" :toolTitle="true" pageTitle="角色管理列表">
            <div class="dictionarycont">
                <div :class="{ widp: activeName!='three',widb: activeName=='three' }">
                         <div class="boxbtn">
                                          <el-button type="primary" @click="addField('addform')" v-if="activeName=='first'">新增值</el-button>
                                          <el-button type="primary" @click="addField2('addform2')" v-if="activeName=='second'">新增值</el-button>
                                          <el-button type="primary" @click="addField3('addform3')" v-if="activeName=='three'">新增值</el-button>



                            </div>
                     <el-tabs v-model="activeName">
                        <el-tab-pane label="信用等级" name="first">
                              <el-table
                                    ref="multipleTable"
                                    :data="datalist"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                 >
                           
                                     <el-table-column
                                    type="index"
                                    label="序号"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    label="字段值"
                                    prop="levelName"
                                    align="center"
                                     />
                                 <el-table-column                       
                                    label="操作"
                                    width="120">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="addField('addform',scope.row)">修改</el-button>
                                        <el-button type="text" size="small" @click="leaveldeleteById(scope.row.id)">删除</el-button>

                                    </template>
                                    </el-table-column>
                                </el-table>


                        </el-tab-pane>
                        <el-tab-pane label="区域" name="second">
                                 <el-table
                                    ref="multipleTable2"
                                    :data="datalist2"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                  >
                           
                                     <el-table-column
                                    type="index"
                                    label="序号"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    label="字段值"
                                    prop="areaName"
                                    align="center"

                                     />
                                 <el-table-column                       
                                    label="操作"
                                    width="120">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="addField2('addform2',scope.row)">修改</el-button>
                                        <el-button type="text" size="small" @click="leaveldeleteById2(scope.row.id)">删除</el-button>

                                    </template>
                                    </el-table-column>
                                </el-table>

                        </el-tab-pane>
                          <el-tab-pane label="拒绝原因" name="three">
                                 <el-table
                                    ref="multipleTable3"
                                    :data="datalist3"
                                    tooltip-effect="dark"
                                    style="width: 49%"
                                    highlight-current-row
                                     @current-change="handleCurrentChange"
                                     class="left"
                                  >
                           
                                     <el-table-column
                                    type="index"
                                    label="序号"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    label="字段值"
                                    prop="reasonName"
                                    align="center"

                                     />
                             
                                </el-table>
                                           <el-table
                                    ref="multipleTable4"
                                    :data="datalist4"
                                    tooltip-effect="dark"
                                    style="width: 49%"
                                     class="right"

                               
                                  >
                           
                                     <el-table-column
                                    type="index"
                                    label="序号"
                                    width="50">
                                    </el-table-column>
                                    <el-table-column
                                    label="字段值"
                                    prop="reasonName"
                                    align="center"

                                     />
                                       <el-table-column                       
                                    label="操作"
                                    width="120">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="addField3('addform3',scope.row)">修改</el-button>
                                        <el-button type="text" size="small" @click="leaveldeleteById3(scope.row.id)">删除</el-button>

                                    </template>
                                    </el-table-column>
                             
                                </el-table>

                        </el-tab-pane>
                    </el-tabs>
                     
                </div>
           
            </div>

         </page-template>
      </div>
      <!-- 弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="showAddDialog" :close-on-click-modal="false" :before-close="handleClose">
          <el-form :model="addform" label-width="80px" label-position="right" ref="addform" :rules="dataRule">
            <el-form-item label="字段值" prop="levelName">
                <el-input v-model.trim="addform.levelName" auto-complete="off"></el-input>
            </el-form-item>
       
          </el-form>
      
          <div slot="footer" class="dialog-footer">
              <el-button @click="offsubmit('addform')">取 消</el-button>
              <el-button type="primary" @click="submitAddForm('addform')" :disabled="bclick">确 定</el-button>
          </div>
        </el-dialog>
         <el-dialog :title="dialogTitle2" :visible.sync="showAddDialog2" :close-on-click-modal="false" :before-close="handleClose">
          <el-form :model="addform2" label-width="80px" label-position="right" ref="addform2" :rules="dataRule2">
            <el-form-item label="字段值" prop="areaName"   >
                <el-input v-model.trim="addform2.areaName" auto-complete="off"></el-input>
            </el-form-item>
       
          </el-form>
      
          <div slot="footer" class="dialog-footer">
              <el-button @click="offsubmit2('addform2')">取 消</el-button>
              <el-button type="primary" @click="submitAddForm2('addform2')" :disabled="bclick">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :title="dialogTitle3" :visible.sync="showAddDialog3" :close-on-click-modal="false" :before-close="handleClose">
          <el-form :model="addform3" label-width="120px" label-position="right" ref="addform3" :rules="dataRule3">
                <el-form-item label="当前原因分类 "   >
                        <span>{{currentName}}</span>
            </el-form-item>
            <el-form-item label="拒绝原因" prop="reasonName"   >
                <el-input v-model.trim="addform3.reasonName" auto-complete="off"></el-input>
            </el-form-item>
       
          </el-form>
      
          <div slot="footer" class="dialog-footer">
              <el-button @click="offsubmit3('addform3')">取 消</el-button>
              <el-button type="primary" @click="submitAddForm3('addform3')" :disabled="bclick">确 定</el-button>
          </div>
        </el-dialog>
        
    </div>
</template>

<script>
import PageTemplate from '@/components/page-template'
import DataList from '@/components/data-list/data-list'
import api from '@/api-authority';
import * as weapon from '@/utils/weapon';
import arrayToTree from "array-to-tree";

export default {
  components: {
    'data-list': DataList,
     PageTemplate
  },
  data() {
      
     var  checkProName=(rule, value, callback) =>{
   
        if (value === '') {
              callback(new Error('请输入字段名称'));
            }else if(value.length>30){
              callback(new Error('请输入30个字符以内'));
              
            }else{
                if(this.dialogTitle=='新增信用等级'){
                          api.checkLevelName({name:value}).
                    then((res) => {
                        if(res.data.message){
                   callback(new Error('字段名称已经存在,请更换'));

                        }else{
                            callback();

                        }

                    }).catch((err) => {
                      console.log(err)
                    })
                }else{

                    if(value==this.originalvalue){
                            callback();

                        }else{
                                api.checkProName({name:value}).
                                then((res) => {
                                    if(res.data.message){
                            callback(new Error('字段名称已经存在,请更换'));

                                    }else{
                                        callback();

                                    }

                                }).catch((err) => {
                                console.log(err)
                                })
                        }
                }
          
               
            }
               
        }
        var  checkarealName=(rule, value, callback) =>{
   
        if (value === '') {
              callback(new Error('请输入字段名称'));
            }else if(value.length>30){
              callback(new Error('请输入30个字符以内'));
              
            }else{
                if(this.dialogTitle2=='新增区域'){
                          api.checkarealName({name:value}).
                    then((res) => {
                        if(res.data.message){
                   callback(new Error('字段名称已经存在,请更换'));

                        }else{
                            callback();

                        }

                    }).catch((err) => {
                      console.log(err)
                    })
                }else{
                    if(value==this.originalvalue){
                            callback();

                        }else{
                                api.checkarealName({name:value}).
                                then((res) => {
                                    if(res.data.message){
                            callback(new Error('字段名称已经存在,请更换'));

                                    }else{
                                        callback();

                                    }

                                }).catch((err) => {
                                console.log(err)
                                })
                        }
                }
          
               
            }
               
        }
    return {
      positionPath: [{name: '系统管理'}, {name: '数据字典'}],
      datalist:[],
      datalist2:[],
      datalist3:[],
      datalist4:[],
      showAddDialog:false,
      showAddDialog2:false,
      showAddDialog3:false,

      addform:{
levelName:''
      },
      addform2:{

      },
      addform3:{
          reasonName:''
      },
      activeName:'first',
      dialogTitle:'新增信用等级',
      dialogTitle2:'新增区域',
      dialogTitle3:'新增拒绝原因',

      bclick:false,
      ischange:false,
         dataRule: {
         levelName: [
          { validator: checkProName, trigger: "blur" },

        ]},
          dataRule2: {
         areaName: [
          { validator: checkarealName, trigger: "blur" },

        ]},
            dataRule3: {
         reasonName: [
          { required: true,message:'请输入拒绝原因', trigger: "blur" },

        ]},
        originalvalue:'',
        currentRow:'',
        currentId:'',
        currentName:''
        
      


    };
  },
  mounted() {
     //this.renderLists({}, "flag");
     this.searchCreditLevelist()
     this.searchArealist()
     this.searchReasonList({pageNum:1,pageSize:10000,parentId:0})
  },
  methods: {
   handleClose(){

   },
   submitAddForm(formName){
           this.$refs[formName].validate((valid) => {
            if(valid){
                      if(this.activeName=='first'){
                          if(this.bclick){
                                return
                          }
                          this.bclick=true;
                          var params={};
                          if(this.ischange){
                              params={levelName:this.addform.levelName,id:this.addform.id}
                          }else{
                              params={levelName:this.addform.levelName}
                          }
                     api.createOrupdateCreditLeve(params).
                        then((res) => {
                                if(res.data.code==0){
                                this.$refs[formName].resetFields();
                                this.$message.success('操作成功')

                                    this.showAddDialog=false;
                                    this.searchCreditLevelist()

                                }else{
                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
                        console.log(err)
                        })
                  
                    }else{

                }
            }
           })
   },
   submitAddForm2(formName){
           this.$refs[formName].validate((valid) => {
            if(valid){
                     
                          if(this.bclick){
                                return
                          }
                          this.bclick=true;
                          var params={};
                          if(this.ischange){
                              params={areaName:this.addform2.areaName,id:this.addform2.id}
                          }else{
                              params={areaName:this.addform2.areaName}
                          }
                     api.createOrupdateArea(params).
                        then((res) => {
                                if(res.data.code==0){
                                this.$refs[formName].resetFields();
                                this.$message.success('操作成功')
                                    this.showAddDialog2=false;
                                 this.searchArealist()
                                }else{
                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
                        console.log(err)
                        })
                  
               
            }
           })
   },
    submitAddForm3(formName){
           this.$refs[formName].validate((valid) => {
            if(valid){
                     
                          if(this.bclick){
                                return
                          }
                          this.bclick=true;
                          var params={};
                          if(this.ischange){
                              params={parentId:this.currentId,id:this.addform3.id,reasonName:this.addform3.reasonName}
                          }else{
                              params={parentId:this.currentId,reasonName:this.addform3.reasonName}
                          }
                     api.createOrUpdateReason(params).
                        then((res) => {
                                if(res.data.code==0){
                                this.$refs[formName].resetFields();
                                this.$message.success('操作成功')
                                    this.showAddDialog3=false;
                        this.searchReasonList2({pageNum:1,pageSize:10000,parentId:this.currentId})

                        
                                }else{
                                    this.$message.error(res.data.message)
                                }
                        }).catch((err) => {
                        console.log(err)
                        })
                  
               
            }
           })
   },
   addField(formName,row){
       this.showAddDialog=true;    
       this.bclick=false
       if(row){
      this.originalvalue=this.addform.levelName=row.levelName
         this.addform.id=row.id
         this.ischange=true;
         this.dialogTitle='修改信用等级'
       }else{
           this.dialogTitle='新增信用等级'
        this.ischange=false;
       }
 
               
    
   },
   addField2(formName,row){
       this.showAddDialog2=true;    
       this.bclick=false
       this.ischange=false;
       if(row){
         this.originalvalue=this.addform2.areaName=row.areaName
         this.addform2.id=row.id
         this.ischange=true;
           this.dialogTitle2='修改区域'

       }else{
           this.dialogTitle2='新增区域'
        this.ischange=false;


       }
 
               
    
   },
   addField3(formName,row){
       this.showAddDialog3=true;    
       this.bclick=false
       this.ischange=false;
       console.log(row,444)
       if(row){
         this.originalvalue=this.addform3.reasonName=row.reasonName
         this.addform3.id=row.id
         this.ischange=true;
           this.dialogTitle3='修改拒绝原因'

       }else{
           this.dialogTitle3='新增拒绝原因'
        this.ischange=false;


       }
 
               
    
   },
   
   searchCreditLevelist(){
          api.searchCreditLevelist({pageNum:1,pageSize:10000}).
                    then((res) => {
                        this.datalist=res.data.message
                    }).catch((err) => {
                    console.log(err)
          })
   },
    searchArealist(){
          api.searchArealist().
                    then((res) => {
                        this.datalist2=res.data.message
                    }).catch((err) => {
                    console.log(err)
          })
   },
      searchReasonList(params){

          api.searchReasonList(params).
                    then((res) => {
                        this.datalist3=res.data.message.list
                        if(this.datalist3.length){
         this.$refs.multipleTable3.setCurrentRow(this.datalist3[0]);
                        this.searchReasonList2({pageNum:1,pageSize:10000,parentId:this.datalist3[0].id})
                        this.currentId=this.datalist3[0].id
                        }
                
                    }).catch((err) => {
                    console.log(err)
          })
   },
      searchReasonList2(params){

          api.searchReasonList(params).
                    then((res) => {
                        this.datalist4=res.data.message.list
                    }).catch((err) => {
                    console.log(err)
          })
   },
   leaveldeleteById(id){
     this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                  api.leaveldeleteById({id}).
                    then((res) => {
                    if(res.data.code==0){
                        this.$message.success('删除成功')
                        this.searchCreditLevelist()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
          })
        })


      
   },
      leaveldeleteById2(id){
     this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                  api.areadeleteById({id}).
                    then((res) => {
                    if(res.data.code==0){
                        this.$message.success('删除成功')
                                 this.searchArealist()
                    
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
          })
        })


      
   },
      leaveldeleteById3(id){
     this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                  api.deleteByIds({ids:[id]}).
                    then((res) => {
                    if(res.data.code==0){
                        this.$message.success('删除成功')
                        this.searchReasonList2({pageNum:1,pageSize:10000,parentId:this.currentId})
                              
                    
                    }else{
                        this.$message.error(res.data.message)
                    }
                    }).catch((err) => {
                    console.log(err)
          })
        })


      
   },
   offsubmit(formName){
        this.$refs[formName].resetFields();
        this.showAddDialog=false
   },
   offsubmit2(formName){
        this.$refs[formName].resetFields();
        this.showAddDialog2=false
   },
    offsubmit3(formName){
        this.$refs[formName].resetFields();
        this.showAddDialog3=false
   },
   handleCurrentChange(val){
 this.currentId = val.id;
 this.currentName=val.reasonName
this.searchReasonList2({pageNum:1,pageSize:10000,parentId:val.id})

 console.log(this.currentRow,77777)
   }
 }
 };
</script>
<style scoped lang="less">
.dictionarycont{
    width: 100%;
    padding: 0 24px;
     display: flex;
   .widp{
       width: 50%;
   }
   .widb{
       width: 100%;
   }
      .item{
    
          .boxbtn{
              margin-bottom: 10px;
              height: 40px;
          }
          margin-right: 1px;
         
      }
.left{
    float: left;
}
.right{
    float:right;
}
      
}
</style>
