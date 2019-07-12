<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="评价管理">
      <data-list :count-undo="total" ref="dataList" @data-refresh="getData" :filters="filters" :total="total" :toolFilterReceive="true"  :tabOptions="tabOptions" @tabclick='tabclick' :routeName="$route.name">
        <div style="width: 100%;padding:0 24px;background:#fff">
          <el-table :data="dataList" highlight-current-row ref="multipleTable"   key="0" v-if="showtab!='4'"  v-loading.fullscreen="loading" >
            <el-table-column prop="userName" label="员工编号" align="center"  width="100" />
            <el-table-column prop="realName" label="员工姓名" align="center"  width="120" />
            <el-table-column prop="eventType" label="事件类型" align="center"  width="80"/>
            <el-table-column prop="serveAttridute" label="服务态度（星级）" align="center" width="120" />
            <el-table-column prop="serveQuality" label="服务质量（星级）" align="center" width="120"  />
            <el-table-column label="着装得体（星级)" align="center" prop="attire" width="120" />
            <el-table-column  label="用语规范（星级）" align="center" prop="wording"  width="120"/>
            <el-table-column prop="remark" label="评价" align="center"  />

          </el-table>

          <el-table :data="dataList" highlight-current-row ref="multipleTable"   key="0" v-if="showtab=='4'"  v-loading.fullscreen="loading" >
            <el-table-column prop="userName" label="员工编号" align="center"  width="100" />
            <el-table-column prop="realName" label="员工姓名" align="center" width="120" />
            <el-table-column prop="eventType" label="事件类型" align="center"  width="130"/>
            <el-table-column prop="efficiency" label="办事效率（星级）" align="center" width="120" />
            <el-table-column prop="professionalLevel" label="专业水平（星级）" align="center"  width="120"  />
       
            <el-table-column prop="remark" label="评价" align="center"  />

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
import formvalid from '@/utils/formvalidate.js'
import { getDate } from '@/utils/st.js'

export default {
computed:{

    filters(){
    var arr=[{
        label: "员工名称：",
        type: "input",
        field: "userName"
      }, {
        label: "事件类型: ",
        type: 'select',
        field: 'eventType',
        options:[
   
            {
          label:'营销',
          value:'1'
        },{
          label:'提额调查',
          value:'2'
        }]
      }],
      arr2=[{
        label: "员工名称：",
        type: "input",
        field: "userName"
      }]
            if(this.$route.params.state==4){
                    return arr2
            }else{
                      return arr
            }
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
        { label: "客户评价", value: "1,2,3", path: '/evaluation/1,2,3'},
        { label: "员工评价", value: "4", path: '/evaluation/4' },
      ],
      positionPath: [{ name: '评价管理' }],
      rules: {
        remark: [
          { validator: formvalid.remark, trigger: 'change' }
        ]
      },
      showtab:'1,2,3',
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
     api.getEvaluateByType({pageSize:this.$store.state.pagesizes,pageNum:1,eventType:val}).
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
    getData(params) {
    console.log(params,123,this.$route.params)
        if(params.eventType){
                params.eventType=params.eventType
        }else{
          params.eventType=this.$route.params.state
        }
     
      api.getEvaluateByType(params).
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

    

  },
  created(){

   this.showtab=this.$route.params.state
 

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
