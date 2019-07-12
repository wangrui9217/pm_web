<template>
    <div class="common-list-page product_add">
        <page-template :position-path="positionPath">
           <div class="tool-title">
              <h2>编辑产品</h2>
              <div class="tool-save-next">
                <!-- <el-button size="medium" class="tool-save">保存</el-button> -->
                <el-button type="primary" size="medium" class="tool-next" @click="handleAddUpdate()">保存</el-button>
              </div>
              <div style="clear:both;"></div>
          </div>
        </page-template>

        <el-tabs v-model="activeName2"  style="padding:3px 0 0;background:#fff;">
            <el-tab-pane label="基本信息" name="first">   
                        <div class="title"><h3>产品基本信息</h3></div>
                <el-form  label-width="120px" :model="dataForm" :rules="dataRule" ref="dataForm" class="formBlock1">                  
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="产品名称：" prop="name">
                                  <el-input v-model.trim="dataForm.name" minlength="1" maxlength="10"></el-input>
                                </el-form-item>
                              </el-col>
                                <el-col :span="16">
                                <el-form-item label="产品类型：" prop='productType'>
                                     <el-col :span="9" style="padding:0">
                                                   
                                                              <el-select v-model="dataForm.productType" placeholder="请选择活动区域">
                                                                  <el-option label="流动资金贷" value="CASH"></el-option>
                                                                  <el-option label="固定资产贷" value="ASSETS"></el-option>
                                                                  <el-option label="保函" value="GUARANTEE"></el-option>
                                                                  <el-option label="承兑汇票" value="MONEYORDER"></el-option>
                                                                  <el-option label="票据贴现" value="BILL"></el-option>
                                                      
                                                                </el-select>
                                                 
                                                        </el-col>
                                </el-form-item>
                              </el-col>
                          
                            </el-row>

                            <el-row > 
                                 <el-col :span="8">
                                <el-form-item label="产品代码：" prop="code">
                                  <el-input v-model.trim="dataForm.code" minlength="1" maxlength="30"></el-input>
                                </el-form-item>
                              </el-col>                              
                              <el-col :span="16">
                                <el-form-item label="产品额度：" >
                                  <el-col :span="9" style="padding:0">
                                    <el-form-item prop="minQuota">
                                      <el-input placeholder="最小额度(10,000)" v-model.number="dataForm.minQuota" style="width: 100%;"></el-input>
                                    </el-form-item>
                                  </el-col>
                                  <el-col class="line" :span="2" style="padding:0;text-align:center">&nbsp;元&nbsp;—&nbsp;</el-col>
                                  <el-col :span="10" style="padding:0">
                                    <el-form-item prop="maxQuota" >
                                      <el-input placeholder="最大额度(29,000,000)" v-model.number="dataForm.maxQuota" style="width: 100%;"></el-input>
                                    </el-form-item>
                                  </el-col>
                                  <el-col class="line" :span="2" style="padding:0">&nbsp;元&nbsp;</el-col>
                                </el-form-item>
                              </el-col>
                              
             
                      
                            </el-row>

                           <el-row >
                              <el-col :span="8">
                                    <el-form-item label="产品标签：" prop="prductTitle">
                                       <el-input v-model.trim="dataForm.prductTitle" placeholder="标签之间使用,进行分割"></el-input><span></span>
                                     </el-form-item>
          
                              </el-col>
                            </el-row>
                              <el-row >
                              <el-col :span="16">
                                    <el-form-item label="简要说明" prop="shortName">
                                       <el-input v-model.trim="dataForm.shortName" minlength="1" maxlength="15" placeholder="请输入15个以内的字符"></el-input><span></span>
                                     </el-form-item>
          
                              </el-col>
                            </el-row>
                            <el-row>

                                   <el-col :span="24" >
                                      <el-form-item label="借款期限：" prop="loanTremType">  
                                      
                                    <el-select v-model="dataForm.loanTremType"  class="selmy" @change='loanTremTypechange'>
                                        <el-option label="月" value="MON"></el-option>
                                        <el-option label="年" value="YEAR"></el-option>
                                      </el-select>                                                                            
                                               <el-radio-group v-model="dataForm.loanTrem2" class="inline" v-if="dataForm.loanTremType=='MON'" @change='loanTremradiofn'>
                                                <el-radio label="1">1个月</el-radio>
                                                <el-radio label="3">3个月</el-radio>
                                                <el-radio label="6">6个月</el-radio>
                                                <el-radio label="12">12个月</el-radio>
                                                <el-radio label="18">18个月</el-radio>
                                                <el-radio label="24">24个月</el-radio>
                                              </el-radio-group>    
                                                <el-radio-group v-model="dataForm.loanTrem2" class="inline" v-if="dataForm.loanTremType=='YEAR'" @change='loanTremradiofn'>
                                                <el-radio label="1">1年</el-radio>
                                                <el-radio label="3">3年</el-radio>
                                                <el-radio label="6">6年</el-radio>
                                                <el-radio label="9">9年</el-radio>
                                                <el-radio label="12">12年</el-radio>                          
                                              </el-radio-group>              
                                                             <el-input v-model.trim="dataForm.year" placeholder="自定义值"  class="zdyy" @change="yearfn"/>                      
                                      </el-form-item>
                              </el-col>
                            </el-row>
                          <el-row :gutter="30">
                            <el-col :span="16" :row="30">
                              <el-form-item label="详细介绍：" prop="proDescribe">
                                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 4}" v-model="dataForm.proDescribe" minlength="1"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                           <el-row :gutter="30">
                              <el-col :span="16">        
                              <el-form-item label="产品示例 : "  prop="proExample">
                                <el-input v-model="dataForm.proExample2" v-show="false" ></el-input>
                                <vue-ueditor-wrap v-model="dataForm.proExample" :config="myConfig" ></vue-ueditor-wrap>

                                    <!-- <quill-editor 
                                v-model="dataForm.proExample" 
                                ref="myQuillEditor" 
                                :options="editorOption" 
                                @change="onEditorChange($event)">
                                </quill-editor> -->
                              </el-form-item>
                            </el-col>
                           </el-row>
                </el-form>                                 
            </el-tab-pane>
                   
            <el-tab-pane label="费用配置" name="second">                   
                                   <div class="title"><h3>产品费用信息</h3></div>

                                    <div class="cost-cont">
                                           <div class="cost_type_title"><h4>利息：(还款时扣除-后收)</h4></div>

                                        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" :rules="dataRule2" label-width="100px" class="demo-dynamic">
                                          <el-row>
                                                <el-col :span="24">
                                                  <el-form-item                                               
                                                    label="费用名称: "
                                                  >
                                                    <span>基准利率</span>
                                                  </el-form-item>
                                                </el-col>
                                              
                                                    <el-col :span="16">
                                               
                                                        <el-col :span="8" style="padding:0">
                                                          <el-form-item label="一年期: " >
                                                           <span>{{rateScope.one}}%</span>
                                                          </el-form-item>
                                                        </el-col>
                                                       <el-col :span="8" style="padding:0">
                                                          <el-form-item label="一至五年期: " >
                                                           <span>{{rateScope.two}}%</span>
                                                          
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8" style="padding:0">
                                                          <el-form-item label="五年期以上: " >
                                                           <span>{{rateScope.three}}%</span>
                                                          
                                                          </el-form-item>
                                                        </el-col>
                                        
                                                    </el-col>
                                              </el-row>
                                               <el-row>
                                                <el-col :span="8">
                                                  <el-form-item                                               
                                                    label="费用名称: "
                                                  >
                                                    <span>常规利息</span>
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                  <el-form-item                                               
                                                    label="用户类型: "
                                                  >
                                                    <span>未认证用户</span>
                                                  </el-form-item>
                                                </el-col>
                                                 <el-col :span="8">
                                                  <el-form-item                                               
                                                    label="基准利率类型: "
                                                  >
                                                    <span>年化比率</span>
                                                  </el-form-item>
                                                </el-col>
                                                    <el-col :span="16">
                                               
                                                        <el-col :span="8" style="padding:0">
                                                          <el-form-item prop="rateInterval" label="浮动比率: ">
                                                            <el-input placeholder="浮动比率" v-model.number="dynamicValidateForm.rateInterval" style="width: 100%;" />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col class="line" :span="1" style="padding:0 ;text-align:center;line-height:40px;">%</el-col>
                                                        <el-col :span="8" style="padding:0" class="tlft">
                                                          <el-form-item prop="rateInterval2"  label="~" >
                                                            <el-input placeholder="浮动比率" v-model.number="dynamicValidateForm.rateInterval2" style="width: 100%;" />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col class="line" :span="1" style="padding:0;line-height:40px;margin-left:-50px;">%</el-col>
                                                  
                                                    </el-col>
                                              </el-row>
                                                <el-row
                                                  v-for="(domain) in dynamicValidateForm.domains"
                                           
                                                  :key="domain.id"
                                              
                                                
                                                >
                                              
                                                  <el-col :span="8">
                                                      <el-form-item                                               
                                                        label="费用名称: "
                                                      >
                                                        <span>特定利息</span>
                                                      </el-form-item>
                                                    </el-col>
                                      
                                                <el-col :span="8">
                                                  <el-form-item                                               
                                                    label="信用等级: "
                                                  >
                                                    <span>{{domain.levelName}}</span>
                                                  </el-form-item>
                                                </el-col>
                                             
                                                  <!-- <el-col :span="16">
                                 
                                                  <el-col :span="8" style="padding:0">
                                                          <el-form-item                               label="浮动比率: "
                                                        :prop="'specifics.' + index + '.value' " :rules="[{ validator: formvalid.isInteger,  trigger: 'blur' },{ required: true, message: '', trigger: 'blur' }]"      >
                                                         <el-input v-model.trim="domain.value" minlength="1" maxlength="50" placeholder="费用比率" />
                                                          </el-form-item>
                                                        </el-col>
                                                          <el-col :span="1" style="text-align:center;line-height:40px;">
                                                    %
                                                        </el-col>
                             
                                           
                                                                     
                                                </el-col> -->
                                                     <el-col :span="16">   
                                                       <el-col :span="8" style="padding:0">
                                                          <el-form-item label="浮动比率: " >
                                                            <el-input placeholder="浮动比率" v-model.number="domain.minvalue" style="width: 100%;"  :readonly="true"/>
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col class="line" :span="1" style="padding:0 ;text-align:center;line-height:40px">%</el-col>
                                                        <el-col :span="8" style="padding:0"  class="tlft">
                                                          <el-form-item  label="~"  >
                                                            <el-input placeholder="浮动比率" v-model.number="domain.maxvalue" style="width: 100%;"  :readonly="true"/>
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col class="line" :span="1" style="padding:0;line-height:40px;margin-left:-50px;">%</el-col>
                                                        <el-col :span="6" style="padding:0"  class="tlft">
                                                            <el-button type="primary" @click="openinfo(domain)">详细定价等级</el-button>
                                                        </el-col>                                       
                                                    </el-col>
                                              </el-row>
                                           <div class="cost_type_title"><h4>服务费：(放款时-扣除)</h4></div>
                                                <el-row>
                                                <el-col :span="8">
                                                  <el-form-item                                               
                                                    label="费用名称: "
                                                  >
                                                    <span>服务费</span>
                                                  </el-form-item>
                                                </el-col>
                      
                                                 <el-col :span="8">
                                                  <el-form-item                                               
                                                    label="费用值类型: "
                                                  >
                                                    <span>固定数值</span>
                                                  </el-form-item>
                                                </el-col>
                                                     <el-col :span="16">
                                                       <el-col :span="8" style="padding:0">
                                                          <el-form-item prop="fixednum" label="费用(元): ">
                                                            <el-input placeholder="费用比率" v-model.number="dynamicValidateForm.fixednum" style="width: 100%;" />
                                                          </el-form-item>
                                                        </el-col>
                                                    </el-col>
                                              </el-row>

                                              </el-form>

                                    </div>                                    
                       
            </el-tab-pane>
            <el-tab-pane label="合同模板" name="three">
                                   <div class="title"><h3><span style="color:#f56c6c;font-size:12px;"></span>合同模板选择</h3></div>
                                    <div class="cost-cont">
              <el-table
                :data="dataList"
                highlight-current-row
                 @selection-change="handleSelectionChange"
                  ref="tempref"
                >
             <el-table-column
      type="selection"
      :reserve-selection="true"
      width="55">
       </el-table-column>
         <el-table-column
                        prop="templateNo"
                        label="合同编号"
                        align="center"
                      />
                      <el-table-column
                        prop="contractName"
                        label="合同名称"
                        align="center"
                      />
                      <el-table-column
                        prop="contractVersion"
                        label="合同版本"
                        align="center"
                      />
                      <el-table-column
                        prop="type"
                        label="合同类型"
                        align="center"
                        min-width="120"
                        :formatter="temptype"
                      />
                    </el-table>
                                    </div>
            </el-tab-pane>
        </el-tabs>
            <el-dialog :title="pricetitle" :visible.sync="showAddDialog" :close-on-click-modal="false" :show-close='false' >
          <el-form :model="fromData" ref="from">
                  <el-table
                      :data="fromData.domains"
                      style="width: 100%">
                          <el-table-column
                          type="index"
                          label="编号"
                          width="50" />
                      <el-table-column
                        prop="compCreidtLevel"
                        label="客户信用等级"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="compRateLevel"
                        label="定价等级"
                       >
                      </el-table-column>

                         <el-table-column
                            label="浮动比率">
                              <template slot-scope="scope">
                                <el-form-item :prop="'domains.'+scope.$index+'.cost'"  :rules="fromaDataRules.cost">
                                  <el-input v-model="scope.row.cost"></el-input>
                                </el-form-item>
                              </template>
                          </el-table-column>
                     
                    </el-table>
          </el-form>
                     <span slot="footer" class="dialog-footer">
                        <el-button @click="offpricefn('from')">取 消</el-button>
                        <el-button type="primary" @click="formpricefn('from')">确 定</el-button>
                      </span>
      </el-dialog>  
        

    </div>    
</template>

<script>
  import PageTemplate from '@/components/page-template'
  import DataNewList from '@/components/data-list/data-new-list'
  import api from "@/api-authority";
import  formvalid from '@/utils/formvalidate'
import VueUeditorWrap from 'vue-ueditor-wrap'


export default {
  data() {
    var minQuota=(rule, value, callback)=>{
          if (value === '') {
            callback(new Error('请输入最小值'));
          }else if(!Number.isInteger(parseFloat(value))||value<10000){
              callback(new Error('请输入自然数,且最小值为10000'));
          } else {
            if (this.dataForm.checkPass !== '') {
              this.$refs.dataForm.validateField('maxQuota');
            }
            callback();
          }
        }
       var maxQuota=(rule, value, callback)=>{
            if (value === '') {
              callback(new Error('请输入最大值'));
            } else if(value<=this.dataForm.minQuota){
              callback(new Error('最大值要比最小值大'));
          }else if(!Number.isInteger(parseFloat(value))||value>29000000){
              callback(new Error('请输入自然数,且最大值为29000000'));
           } else {
              callback();
            }
        }
         var rateInterval=(rule, value, callback)=>{
          if (value === '') {
            callback(new Error('请输入利息最小值'));
          }else if(!/^\d+(\.\d+)?$/g.test(value)){
              callback(new Error('请输入自然数'));            
          }else {
            if (this.dynamicValidateForm.rateInterval2 !== '') {
              this.$refs.dynamicValidateForm.validateField('rateInterval2');
            }
            callback();
          }
        }
       var rateInterval2=(rule, value, callback)=>{
            if (value === '') {
              callback(new Error('请输入利息最大值'));
            } else if(value<=this.dynamicValidateForm.rateInterval ){
              callback(new Error('最大值要比最小值大'));
          }else if(!/^\d+(\.\d+)?$/g.test(value)){
              callback(new Error('请输入自然数'));
           } else {
              callback();
            }
        }
              var  checkProName=(rule, value, callback) =>{
   
        if (value === '') {
              callback(new Error('请输入产品名称'));
            }else if(value.length>10){
              callback(new Error('请输入10个字符以内'));
              
            }else{
              if(value==this.originalvalue){
                            callback();

              }else{
                     api.checkProName({name:value}).
                    then((res) => {
                        if(res.data.message){
                   callback(new Error('产品名称已经存在,请更换'));

                        }else{
                            callback();

                        }

                    }).catch((err) => {
                      console.log(err)
                    })
              }
               
            }
               
        }
             var  checkNum=(rule, value, callback) =>{
   
            if (!/^(-)?\d+(\.\d{2})?$/.test(value)) {
                  callback(new Error('请输入两位小数的数字'));
            }else{
                 callback();

            }
        }
    return {
          getRowKeys(row) {
       
            return row.id;
        },
      rateScope:{one:'',two:'',three:''},//基准利率

        select_orderId:[],
        selecteds:'',
         pricetitle:'',      //弹出框 标题
      showAddDialog:false,    //弹出框显示 隐藏
      fromData:{
        domains:[]
      },                //详细定价等级
        dynamicValidateForm: {
          domains: [],
          rateInterval: '',
          rateInterval2:'',
          fixednum:"",
          lvInterestarr:[]
        },
        lvInterestarr:[],
      formvalid:formvalid,
        dataList:[],
      positionPath: [{name: '产品管理'}, {name: '产品信息管理'}, {name: '增加产品'}],//路径信息
      activeName2: "first",//tab切换值
      dataForm: {
          name:'',
          code:'',
          minQuota:'',
         maxQuota:'', 
         prductTitle:'',
         proDescribe:'',
         shortName:'',
          productType:'CASH',
          loanTremType:"MON",
          loanTrem2:['1'],
          loanTrem:[],
          proExample:'',
          proExample2:'',
          year:''


      },//产品表单信息
      dataForm2:{
        creditLevelist:[{levelName:''}],
      },
            myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 540,
        // 初始容器宽度
        initialFrameWidth: '100%',
        UEDITOR_HOME_URL: '/static/UEditor/'
      },
      fromaDataRules:{        //产品费用配置 弹出框 表格验证
          cost:[{ required: true, message: '请输入利率', trigger: 'blur' },
          { validator: checkNum, trigger: "blur" },      
          ],
        }, 
      multipleSelection:[],
     
      dataRule: {
         name: [
             { required: true, message: "产品名称不能为空", trigger: "blur" },
          { validator: checkProName, trigger: "blur" },
        


        ],
          productType:[
          { required: true, message: "产品类型不能为空", trigger: "blur" },

        ],
        shortName: [
          { required: true, message: "产品简称不能为空", trigger: "blur" },
          { min: 1, max: 15, message: '最长为15个字符', trigger: 'blur' }
        ],
        prductTitle:[
          { required: true, message: "产品标签不能为空", trigger: "blur" },
          { min: 1, max: 30, message: '最长为30个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: "产品代码不能为空", trigger: "blur" },
          { min: 1, max: 30, message: '最长为30个字符', trigger: "blur"}
        ],
        proDescribe:[
          { required: true, message: "详细介绍不能为空", trigger: "blur" },
          { min: 1, max: 300, message: '最长为300个字符', trigger: 'blur' }
        ],
        minQuota: [{ validator:minQuota, trigger: "blur" },
          { required: true, message: "", trigger: "blur" },
        
        ],
        maxQuota: [{ validator: maxQuota,trigger: "blur" }],
        loanTremType:[
          { required: true, message: "", trigger: "blur" },

        ],
        proExample:[{ required: true, message: "内容不能为空", trigger: "change" }],
        loanTrem2:[{ required: true, message: "请选择借款期限", trigger: "change" }]

   
      },
      dataRule2:{
        rateInterval: [{ validator:rateInterval, trigger: "blur" },
          { required: true, message: "", trigger: "blur" },
        
        ],
        rateInterval2: [{ validator: rateInterval2,trigger: "blur" }],
        fixednum:[{ validator:formvalid.isInteger, trigger: "blur" },
          { required: true, message: "", trigger: "blur" },

        
        ]
      },
      submitFlag:false,
      originalvalue:'',
          editorOption:{
                      modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'header': [1, 2, 3, 4, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean']
            ],
                      },
          placeholder:'请输入内容'
        }

    };
  },
  components: {
    PageTemplate,VueUeditorWrap
  },
  methods: {
        loanTremradiofn(val){
      this.dataForm.year='';
        console.log(val,222,this.dataForm.year)
    },
    yearfn(){
        this.dataForm.loanTrem2=''
    },
     rateList(){   //基准利率展示
         api.rateList().
                          then((res) => {
                          
                           if (res.data.code == '0') {
                              res.data.message.map(el=>{
                                   if(el.rateScope==1){
                                        this.rateScope.one=el.rate
                                   }else if(el.rateScope==2){
                                        this.rateScope.two=el.rate

                                   }else{
                                        this.rateScope.three=el.rate
                                     
                                   }
                              })
                                                                                  
                            } else {
                              this.$message.error(res.data.message)
                            }
                          }).catch((err) => {
                            console.log(err)
                          })
  

 },

        onEditorChange(dd){//内容改变事件
            this.dataForm.proExample2=this.dataForm.proExample;
    
            },
             openinfo(val){    ///打开详细定价等级
                  this.showAddDialog=true
                  this.fromData.domains=[]
                  this.pricetitle=val.levelName+'详细定价等级'
                   	_.cloneDeep(this.dynamicValidateForm.lvInterestarr).map(el=>{
                         if(el.compCreidtLevel==val.levelName){
                                this.fromData.domains.push(el)
                          }

                  })

             //   console.log(this.lvInterestarr,88,this.fromData.domains)

            },
            formpricefn(formName){      //更新费用配置信息
            this.$refs[formName].validate((valid) => {
                  if (valid) {
                           var sortarr=[]                   
                  this.fromData.domains.map(el=>{
                          this.dynamicValidateForm.lvInterestarr.map(ele=>{
                                if(ele.compCreidtLevel==el.compCreidtLevel&&ele.compRateLevel==el.compRateLevel){
                                      ele.cost=el.cost
                                }
                          })
                  })
                  sortarr=this.fromData.domains.sort((a,b)=>{   //排序获取最小值 最大值
                        return a.cost-b.cost
                    })
           
                  this.dynamicValidateForm.domains.map(el=>{//更新最小值 最大值
                      if(el.levelName==this.fromData.domains[0].compCreidtLevel){
                            el.minvalue=sortarr[0].cost
                            el.maxvalue=sortarr[sortarr.length-1].cost
                      }
                  })
                    this.showAddDialog=false;
                  }
                });
       

            },
            offpricefn(formName){     //不保存

            this.$refs[formName].clearValidate();
                this.showAddDialog=false;
            },
  
       searchContactTemplateList(){
        api.getTempList({
            "pageNum": 1,
            "pageSize": 1000,
            "status": "NOL",
          }).
          then((res) => {
          // console.log("data:"+JSON.stringify(res.data))
            if (res.data.code == '0') {
                this.dataList=res.data.message.list
                     this.getdetalinfo()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch((err) => {
            console.log(err)
          })

       },
       loanTremTypechange(val){
            this.dataForm.loanTrem2='1'
            this.dataForm.year=''
       },
       temptype(data){
          var str=''
          switch (data.type) {
            case 1:
              str='借款'
              break;
             case 2:
              str='咨询管理'
              break;
             case 3:
              str='自动代扣授权协议 '
              break;
          }
          return str
       },

        toggleSelection(ar){     
            var arr=[];   
              this.dataList.map(el=>{
                  ar.map(ele=>{
                    if(ele==el.id){
                    arr.push(el)
                    }
                  })
                
              })
              console.log(arr,'合同模板默认被勾选')
            arr.forEach(row => {
            this.$refs.tempref.toggleRowSelection(row);
          });  
    },
  
              handleSelectionChange(rows) {
                this.select_orderId = [];
                if (rows) {
                    rows.forEach(row => {
                        if (row) {
                            this.select_orderId.push(row.id);
                        }
                    });
                }
       },
       //获取数据
       getdetalinfo(){
             const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
             api.getdetalinfo({id:this.$route.query.id}).then((res) => {
          loading.close()

                if (res.data.code==0) {
                      var data=res.data.message;
                      this.originalvalue=data.product.name
                      Object.keys(data.product).map(el=>{
                        this.dataForm[el]=data.product[el]
                      })
                    this.dataForm.loanTrem2=this.dataForm.loanTrem
                    if(this.dataForm.loanTremType=='MON'){
                     
                            if(['1','3','6','12','18','24'].indexOf( this.dataForm.loanTrem2)==-1){
                              this.dataForm.year=this.dataForm.loanTrem
                            }
                                    
                    }else{
                   
                            if(['1','3','6','9','12'].indexOf(this.dataForm.loanTrem2)==-1){
                              this.dataForm.year=this.dataForm.loanTrem
                            }
                     
                    }
                     api.searchCreditLevelist().
                          then((res) => {
                          
                            if (res.data.code == '0') {
                                this.dynamicValidateForm.domains=res.data.message
                                this.dynamicValidateForm.domains.map(el=>el.children=[])
                                this.dynamicValidateForm.lvInterestarr.map(el=>{
                                   this.dynamicValidateForm.domains.map(ele=>{
                                       if(el.compCreidtLevel==ele.levelName){
                                            ele.children.push(el)

                                       }
                                   })
                                })
                                this.dynamicValidateForm.domains.map(el=>{
                                  el.children=el.children.sort((a,b)=>a.cost-b.cost)
                                 if(el.children.length){
                                    el.minvalue=el.children[0].cost;
                                  el.maxvalue=el.children[el.children.length-1].cost
                                 }
                                })
                                                        
                              
                            } else {
                              this.$message.error(res.data.message)
                            }
                          }).catch((err) => {
                            console.log(err)
                          })
      
                  data.costs.map(el=>{
                    el.value=el.cost
                       if(el.interestType==1){
                          this.dynamicValidateForm.lvInterestarr.push(el)
                       }else if(el.interestType==2){
               
                          this.dynamicValidateForm.rateInterval=el.rateInterval.split('-')[0]
                          this.dynamicValidateForm.rateInterval2=el.rateInterval.split('-')[1]
                          this.dynamicValidateForm.rateIntervalid=el.id

                       }else if(el.costType==2){
                            this.dynamicValidateForm.fixednum=el.cost
                            this.dynamicValidateForm.fixid=el.id
                       }
                  })
                  console.log(this.dynamicValidateForm,111)
                    console.log(this.dataForm)
              this.selecteds=_.cloneDeep(data.product.templateId.split(',')) 
             this.toggleSelection(this.selecteds)  
                } else {
                  this.$message.error("请求失败")
                }
              }).catch((err) => {
          loading.close()

                console.log(err)
              })
       },
    //保存数据
    handleAddUpdate(){
      if(this.dataForm.year&&!/^[1-9]\d*$/.test(this.dataForm.year)){
            this.$message.warning("借款期限自定义值必须为正整数")
               return
      }

     if(this.dataForm.year){
          this.dataForm.loanTrem2=this.dataForm.year
      }
        if(!this.dataForm.loanTrem2){
               this.$message.warning("请选择借款期限")
               return
        }
        //  if(!this.dataForm.year&&this.dataForm.loanTremType=='MON'){
        //     this.dataForm.loanTrem2.map((el,index)=>{
        //        if(['1','3','6','12','18','24'].indexOf(el)==-1){
        //           this.dataForm.loanTrem2.splice(index,1)
        //        }
        //     })
        // }
        //   if(this.dataForm.year&&this.dataForm.loanTremType=='MON'){
        //     this.dataForm.loanTrem2.map((el,index)=>{
        //        if(['1','3','6','12','18','24',this.dataForm.year].indexOf(el)==-1){
        //           this.dataForm.loanTrem2.splice(index,1)
        //        }
        //     })
        // }

      //    if(!this.dataForm.year&&this.dataForm.loanTremType=='YEAR'){
      //       this.dataForm.loanTrem2.map((el,index)=>{
      //          if(['1','3','6','9','12'].indexOf(el)==-1){
      //             this.dataForm.loanTrem2.splice(index,1)
      //          }
      //       })
      //   }
      //     if(this.dataForm.year&&this.dataForm.loanTremType=='YEAR'){
      //       this.dataForm.loanTrem2.map((el,index)=>{
      //          if(['1','3','6','9','12',this.dataForm.year].indexOf(el)==-1){
      //             this.dataForm.loanTrem2.splice(index,1)
      //          }
      //       })
      //   }
      //    console.log(this.dataForm.loanTrem2.length,99,this.dataForm.loanTrem2,this.dataForm.year)
      //   if(this.dataForm.loanTrem2.length>1){
      //          this.$message.warning("借款期限 最多选择1种")
      //             return
      //   }
      //     if(!this.select_orderId.length){
      //          this.$message.warning("请选择模板")
      //          return


      // }
  
      let params={};   

      this.$refs["dataForm"].validate(valid => {
        if (valid) {
            var tempid=[]
              this.select_orderId.map(el=>{
                tempid.push(el)
              })
          this.$refs["dynamicValidateForm"].validate(valid2 => {
               params ={
                 product:Object.assign(this.dataForm,{templateId:tempid.join(',')}),
                 costs:[]
               }
           
              if(valid2){

           this.dataForm.loanTrem=  this.dataForm.loanTrem2
           this.dataForm.proExample=this.dataForm.proExample.replace(/(?=[^>]*(?=<))\s/g,'\u00a0') 
                        this.dynamicValidateForm.lvInterestarr.map(el=>{                          
                            el.cost=el.cost
                            params.costs.push(el)
                          })

                          params.costs.push({
                            costType:1,
                            costValueType:2,
                            interestType:2,
                            rateInterval:this.dynamicValidateForm.rateInterval+'-'+this.dynamicValidateForm.rateInterval2,
                            compCreidtLevel:'未认证用户',
                            id:this.dynamicValidateForm.rateIntervalid            
                          })
                            params.costs.push({
                               costType:2,
                            costValueType:1,
                            cost:this.dynamicValidateForm.fixednum,  
                            id:this.dynamicValidateForm.fixid
                          });
                          
                          console.log(params,3333)
                   
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                          });
                          if(this.submitFlag){
                                    return
                          }
                          this.submitFlag=true;
                          api
                            .addPro(params)
                            .then(res => {          
                              loading.close()    
                              this.submitFlag=false
                              if (res.data.code==0) {
                                this.$message.success("操作成功");
                                this.$router.push({ path: '/product-info', query: {} })
                              } else {
                                  

                                this.$message.error(res.data.message);
                              }
                            }).catch( (error)=> {
                              this.submitFlag=false

                                loading.close() 
                              });
     
              }else{
               this.$message.warning("费用配置里的值不正确")

              }
            
          })
      
        } else {
               this.$message.warning("基本信息里的值不正确")
  
        }
      });      
    },


   
  },
  created(){

     this.searchContactTemplateList()
     this.rateList()

  }
 
   
}
</script>

<style lang="less">
.tlft{

  .el-form-item__label{
    text-align: left;
      width: 30px !important;
  }
  .el-form-item__content{
    margin-left: 30px !important;
      width: calc(100% - 100px) !important

  
  }
}
.el-tabs{
  .el-tabs__content{
   
   padding-bottom: 30px;
  }
}
#pane-three{
  height: 500px;
  overflow-y: scroll;
}
.mar0{
  .el-form-item__content{
    margin-left: 0 !important;
  }
}
.inline{
  display: inline;
}
.zdyy{
  width: 100px;
  margin-left: 20px;
  .el-input__inner{
  width: 100px;
  height: 20px;
  line-height: 20px;
  position: relative;
      top: -4px;
  }

}
.wid40{
  width: 40%
}
 .ql-container{
    height: 440px;
  }
.formBlock1{
  .el-row{
    margin-bottom: 20px;
  }
}
.scrolmsg{
  height: 400px;
  overflow-y: scroll;
}

 .common-list-page.product_add{
  padding: 0;
  .el-radio + .el-radio{
    margin-left: 10px;
  }
  .tool-title{
    border:none;
    h2{
      float: left;
    }
    .tool-save-next{
          float: right;
          height:32px;
          .tool-save{
              border-radius: 4px;
              width:90px;
              height:32px;
              line-height:32px;
              padding:0;
              text-align: center;
          }
          .tool-next{
              background: #1890FF;
              border-radius: 4px;
              width:90px;
              height:32px;
              line-height:32px;
              padding:0;
              text-align: center;
          }
    }
  }
  .el-tabs__header{
    margin:0;
    padding:0 32px;
  }
  .el-tabs__content{

    .title{
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: rgba(0,0,0,0.85);
      line-height: 24px;
      padding:16px 32px;
      border-bottom:1px solid #E9E9E9;
      font-weight:bold;
      margin-bottom: 20px;
    }
    .el-row{
      padding:0 32px;
    }
    .el-select{
      width:100%;
    }
    .el-select.selmy{
  display: inline-block;
  width: 62px;
}
    .el-form-item__label{
      font-size: 14px;
      color: rgba(0,0,0,0.85);
  

    }

    .el-form-item{
      margin-bottom:8px;
    }
  
 
    .cost-cont{
      padding: 24px 32px 0;
      .cost_type_title{
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        line-height: 22px;
        margin-bottom:16px;
      }
      .el-checkbox{
        text-align: left;
        .el-checkbox__inner{
          width:16px;
          height:16px;
        }
        .el-checkbox__label{
           font-size: 14px;
            color: rgba(0,0,0,0.85);
            line-height: 22px;
        }
      }
      .cost_info_item{
        .cost_info_title{
          padding:24px 0 16px;
          font-size: 14px;
          color: rgba(0,0,0,0.85);
          line-height: 22px;
          font-weight:bold;
        }
      }
      .el-card__header{
        padding:11px 24px;
        .clearfix{
          font-size: 14px;
          color: rgba(0,0,0,0.85);
          line-height: 22px;
          span{
            font-size: 14px;
            color: rgba(0,0,0,0.65);
            line-height: 22px;
          }
        }
      }
      .el-card__body{
          padding:0px 24px;
          .el-form-item{
            margin-bottom:48px;
          }
      }
    }
    .cost_info_btn{
      width:100%;
      height:32px;
      line-height: 32px;
      border-radius: 4px;
      border:1px dashed #D9D9D9;
      text-align: center;
      background: #FFFFFF;
      margin-top:10px;
      .cost_info_btn_center{
        height:22px;
        line-height:22px;
        display: inline-block;
        margin:4px 0;
        img{
          display: inline-block;
          width:12px;
          height:12px;
        }
        button{
           height:22px;
           line-height:22px;
        }
     
      }
    }
  }
    
  
} 


</style>