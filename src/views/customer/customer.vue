<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="企业名录">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true"  :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row ref="multipleTable"   key="0" v-if="showtab=='红'"  v-loading.fullscreen="loading" >
            <el-table-column prop="compNumber" label="企业编号" align="center" min-width="120" />
            <el-table-column prop="name" label="客户名称" align="center" min-width="120" />
            <el-table-column prop="creditNo" label="统一社会信用号码" align="center" min-width="100" />
            <el-table-column prop="legalName" label="法人名称" align="center" min-width="100" />
            <el-table-column prop="registerAddress" label="注册地址" align="center"  min-width="100" />
            <el-table-column label="企业性质" align="center" width="100" prop="compNature" />
            <el-table-column width="100" label="注册资本金" align="center" prop="registerAmount" />
            <el-table-column prop="islisted" label="是否上市" align="center" :formatter="el=>el.islisted==1?'上市':'未上市'" />
            <el-table-column width="100" label="营销次数" align="center" prop="epoch" />

            <el-table-column prop="establishTime" label="成立日期" align="center" width="140" :formatter="el=>getDate(el.establishTime)"/>
            <el-table-column align="center" width="60" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">查看</el-button>
                  
                </div>
              </template>
            </el-table-column>
          </el-table>

           <el-table :data="dataList" highlight-current-row ref="multipleTable"   key="1" v-if="showtab=='白'" v-loading.fullscreen="loading" >     
               <el-table-column prop="compNumber" label="企业编号" align="center" min-width="120" />
            <el-table-column prop="name" label="客户名称" align="center" min-width="120" />
            <el-table-column prop="creditNo" label="统一社会信用号码" align="center" min-width="100" />
            <el-table-column prop="legalName" label="法人名称" align="center" min-width="100" />
            <el-table-column prop="registerAddress" label="注册地址" align="center"  min-width="100" />
            <el-table-column label="企业性质" align="center" width="100" prop="compNature" />
            <el-table-column width="100" label="注册资本金" align="center" prop="registerAmount" />
            <el-table-column prop="islisted" label="是否上市" align="center" :formatter="el=>el.islisted==1?'上市':'未上市'" />
            <el-table-column width="100" label="营销次数" align="center" prop="epoch" />

            <el-table-column prop="establishTime" label="成立日期" align="center" width="140" :formatter="el=>getDate(el.establishTime)"/>
            <el-table-column align="center" width="60" label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">查看</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

      
 
        <el-table :data="dataList" highlight-current-row ref="multipleTable"   key="4" v-if="showtab=='灰'" v-loading.fullscreen="loading" >
          <el-table-column prop="compNumber" label="企业编号" align="center" min-width="120" />
                <el-table-column prop="name" label="客户名称" align="center" min-width="120" />
                <el-table-column prop="creditNo" label="统一社会信用号码" align="center" min-width="100" />
                <el-table-column prop="legalName" label="法人名称" align="center" min-width="100" />
                <el-table-column prop="registerAddress" label="注册地址" align="center"  min-width="100" />
                <el-table-column label="企业性质" align="center" width="100" prop="compNature" />
                <el-table-column width="100" label="注册资本金" align="center" prop="registerAmount" />
                <el-table-column prop="islisted" label="是否上市" align="center" :formatter="el=>el.islisted==1?'上市':'未上市'" />
                <el-table-column prop="isadmittance  " label="准入状态" align="center" :formatter="el=>el.isadmittance==1?'已准入':'未准入'" />
            <el-table-column width="100" label="营销次数" align="center" prop="epoch" />

                <el-table-column prop="establishTime" label="成立日期" align="center" width="140" :formatter="el=>getDate(el.establishTime)"/>
                <el-table-column align="center" width="120" label="操作">
                  <template slot-scope="scope">
                    <div class="of-hidden actList">
                      <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">查看</el-button>
                      <el-button type="text" size="small" @click.native.prevent="admittance(scope.row)">准入</el-button>
                    </div>
                  </template>
                </el-table-column>
          </el-table>
            <el-table :data="dataList" highlight-current-row ref="multipleTable"   key="6"  v-if="showtab=='黑'" v-loading.fullscreen="loading" >
                <el-table-column prop="compNumber" label="企业编号" align="center" min-width="120" />
                <el-table-column prop="name" label="客户名称" align="center" min-width="120" />
                <el-table-column prop="creditNo" label="统一社会信用号码" align="center" min-width="100" />
                <el-table-column prop="legalName" label="法人名称" align="center" min-width="100" />
                <el-table-column prop="registerAddress" label="注册地址" align="center"  min-width="100" />
                <el-table-column label="企业性质" align="center" width="100" prop="compNature" />
                <el-table-column width="100" label="注册资本金" align="center" prop="registerAmount" />
                <el-table-column prop="islisted" label="是否上市" align="center" :formatter="el=>el.islisted==1?'上市':'未上市'" />
                <el-table-column prop="establishTime" label="成立日期" align="center" width="140" :formatter="el=>getDate(el.establishTime)"/>
                <el-table-column align="center" width="60" label="操作">
                  <template slot-scope="scope">
                    <div class="of-hidden actList">
                      <el-button type="text" size="small" @click.native.prevent="customerinfo(scope.row)">查看</el-button>
                    </div>
                  </template>
                </el-table-column>
          </el-table>
        </div>
      </data-list>
    </page-template>
    <el-dialog title="企业区域划分" :visible.sync="dialogVisible" width="400px">
      <el-form ref="formInline" :model="formInline" label-width="80px" :rules="rules">
      
        <el-form-item label="客户名称" prop="remark">
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
import formvalid from '@/utils/formvalidate.js'
import { getDate } from '@/utils/st.js'

export default {
computed:{
    areas(){
      var arr=[]
      this.searchCompNatureListarr.map(el=>{
        arr.push({label:el,value:el})
      })
       return arr
    },
    credit(){
            var arr=[]
      this.$store.state.credit.map(el=>{
        arr.push({label:el.levelName,value:el.id})
      
      })
      console.log(this.$store.state,22)
       return arr
    },
    filters(){
      return [{
        label: "客户名称：",
        type: "input",
        field: "name"
      },{
        label: "注册地址: ",
        type: "input",
        field: "registerAddress"
      }, {
        label: "法人名称: ",
        type: "input",
        field: "legalName"
      },{
        label: "企业性质: ",
        type: 'select',
        field: 'compNature',
        options:this.areas
      },  {
        label: "是否上市: ",
        type: 'select',
        field: 'islisted',
        options:[{
          label:'是',
          value:'1'
        },{
          label:'否',
          value:'0'
        }]
      }]
    }
},
  data() {
    return {
      flag: false,
      loading:false,
      dialogVisible: false,
      formInline: {
          id:'',
          orgId:''
      },
      dataList: [],
      breanchlist:[],
      total: 0,
      tabOptions: [
        { label: "红名单", value: "红", path: '/customer/红'},
        { label: "白名单", value: "白", path: '/customer/白' },
        { label: "灰名单", value: "灰", path: '/customer/灰' },
        { label: "黑名单", value: "黑", path: '/customer/黑'},
      ],
      positionPath: [{ name: '企业名录' }],
      rules: {
        remark: [
          { validator: formvalid.remark, trigger: 'change' }
        ]
      },
      showtab:'红',
      getDate:getDate,
      searchCompNatureListarr:[]

    }
  },
  components: {
    'data-list': DataList,
    PageTemplate
  },
  methods: {
    tabclick(val){
        this.showtab=val;
        this.loading=true
     api.searchCompanyList({pageSize:this.$store.state.pagesizes,pageNum:1,compRiskLevel:val}).
      then((res) => {
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
    this.loading=false
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
    this.loading=false
     
      })
    
    },
    customerinfo(id) {
      this.$router.push({ name: '工单详情', query: {id:id.compId,ismange:1,paths:2}})
   

    },
    getData(params) {
    console.log(params,123)
 
      params.compRiskLevel=this.$route.params.state
      api.searchCompanyList(params).
      then((res) => {
        if (res.data.code == '0') {
          this.dataList = res.data.message.list
          this.total = res.data.message.total
          this.loading=false

        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
    this.loading=false
     
      })
    },
    admittance(data){
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    
        api.admittance({id:data.id}).
          then((res) => {
            loading.close()
            if (res.data.code == '0') {
                this.$message.success('准入成功')
                this.$router.push(this.$route.path)
       
            } else {
              this.$message.error(res.data.message)
            }
          }).catch((err) => {
            loading.close()
            console.log(err)
          })
    },
    searchCompNatureList(){
        api.searchCompNatureList().
          then((res) => {
         
            if (res.data.code == '0') {
                this.searchCompNatureListarr=res.data.message
       
            } else {
              this.$message.error(res.data.message)
            }
          }).catch((err) => {
            loading.close()
            console.log(err)
          })
    }

  },
  created(){

   this.showtab=this.$route.params.state
   this.searchCompNatureList()

  }
}

</script>
<style lang="scss">
.common-list-page.basedCost {
  padding: 0;

  .el-table {
    .cell {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      letter-spacing: 0;
      line-height: 22px;

      .of-hidden.actList .el-button--small {
        font-size: 14px;
        color: #1890FF;
        line-height: 22px;
      }
    }

  }

  .el-table--enable-row-transition .el-table__body td {
    font-size: 14px;
    letter-spacing: 0;
    line-height: 14px;
    padding-top: 10px;
    padding-bottom: 9px;
    border-right: none;
  }

  .el-table__body tr.current-row>td,
  .el-table__body tr:hover>td {
    background-color: #E6F7FF;
  }

}

</style>
