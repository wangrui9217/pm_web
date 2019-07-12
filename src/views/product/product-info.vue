<template>
  <div class="common-list-page product_info" >
      <page-template :position-path="positionPath" :toolTitle="true" pageTitle="产品信息管理">
        <data-list
          ref="dataList"
          @data-refresh="getData"
          @stop-useing="stopUseing"
          @start-useing="startUseing"
          :toolFilterReceive="true"
          :filters="filters"
          :addProduct="true"
          :total="total"
          :pids="pids"
          >
          <div style="width: 100%;padding:0 24px;background:#fff">
              <el-table
            ref="multipleTable"
            :data="dataList"
            @selection-change="handleSelectionChange"
            >
                <el-table-column
      type="selection"
      width="55"/>
            <el-table-column
              min-width="120"
              label="产品名称"
              align="center"
            >
               <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>

            <el-table-column
              min-width="120"
              label="产品代码"
              align="center"
            >
              <template slot-scope="scope">
                  {{scope.row.code}}
              </template>
            </el-table-column>

            <el-table-column
              min-width="100"
              label="产品金额"
              align="center"
            >
              <template slot-scope="scope">
                {{(scope.row.minQuota && scope.row.maxQuota)? (scope.row.minQuota+'-'+scope.row.maxQuota) : ''}}
              </template>
            </el-table-column>
            <el-table-column
              min-width="80"
              label="产品类型"
              align="center"
              prop="productType"
              :formatter="classtype"
            >
            </el-table-column>
            <el-table-column
              min-width="80"
              label="启用状态"
              align="center"
            >
              <template slot-scope="scope">
                  <span :class="[scope.row.state != 'on' ? 'danger-color' : 'success-color']">{{scope.row.state=='on'?'启用':'停用'}}</span>
              </template>
            </el-table-column>
             <el-table-column
              min-width="65"
              prop="updateBy"
              label="更新人"
              align="center"
            />
            <el-table-column
              min-width="150"
              label="更新时间"
              align="center"
              prop="updateTime"
            >
            </el-table-column>
            <el-table-column
              min-width="60"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native="dealwith(scope.row.id)">编辑</el-button>
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
  import _ from "lodash";

  export default {
    data () {
      return {
        positionPath: [{name: '产品管理'}],//路径信息
        filters: [
          {
            label: "启用状态：",
            type: "select",
            field: "state",
            options: [
              { label: "全部", value: "" },
              { label: "启用", value: "on" },
              { label: "停用", value: "off" },
            ]
          },
          {
            label: false,
            placeholder: '产品名称',
            type: 'input',
            field: 'name'
          },     
        ],//筛选配置
        total: 0,//总数
        multipleSelection: [] ,//复选框勾选的数组对象
        pids: [] ,//复选框勾选的值
        pidsStatus: [] ,//复选框勾选的启用状态
        dataList: [],
        LoanUnit:[],//借款单位
        LoanCycle1:[],//借款数据月
        LoanCycle2:[],//借款数据天
        RepaymentMethod:[],//还款方式
        productClass:[],//产品分类
      }
    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    watch:{
      multipleSelection(val){
        this.pids.splice(0,this.pids.length);//清空数组
        this.pidsStatus.splice(0,this.pidsStatus.length);//清空数组
        val.filter(item=>{
          this.pids.push(item.id) //重新赋值
          this.pidsStatus.push(item.status)
        })
        this.pidsStatus=_.uniqBy(this.pidsStatus)
        console.log('pids',this.pids)
        console.log('pidsStatus',this.pidsStatus)
      },
   
    },
    activated(){
      this.getLoanUnit();
      this.getLoanCycleD();
      this.getLoanCycleM();
      this.getRepaymentMethod();
      this.getproductClass();
    },
    methods: {

      moment: moment,
      getData (params) {
        

        //产品列表
        api.searchProList(params).then((res) => {
          console.log(res.data)
          if (res.data.code==0) {
            this.dataList = res.data.message.list
            this.total = res.data.message.total
            console.log(this.dataList)
          } else {
            this.$message.error("请求失败")
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      
      handleSelectionChange(val) {
        var _this=this;
         //复选框赋值
         _this.multipleSelection=val
        console.log(_this.multipleSelection);
      },

      toggleSelection(rows) {
        //选择和取消勾选
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      //开始停用
      stopUseing(){
        if(this.pidsStatus.length==0){
          //没有数据
          this.$message.error("请选择需要启动的产品信息！")
          return;
        }else if(this.pidsStatus.length>1){
          //有其他的数据
          this.$message.error("选中数据有已启动产品，请重新选择!")
           return;
        }
      console.log(this.pids)
        var params={
          ids:this.pids,
          state:'off'
        }
        api.proStop(params).then((res) => {
  
          if (res.data.code==0) {
            this.$message.success("操作成功");
          // this.getData({pageNum:1,pageSize:"10"})
          // this.getData({pageNum:1,pageSize:this.$router.query.pageSize})
            this.$router.push(this.$route.path)
          
          } else {
            this.$message.error("操作失败");
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      //开始启用
      startUseing(){
        if(this.pidsStatus.length==0){
          //没有数据
          this.$message.error("请选择需要启动的产品信息！")
          return;
        }else if(this.pidsStatus.length>1){
          //有其他的数据
          this.$message.error("选中数据有已启动产品，请重新选择!")
           return;
        }
        var params={
           ids:this.pids,
           state:'on'
        }
        api.proStart(params).then((res) => {
          console.log(res.data)
          if (res.data.code==0) {
            this.$message.success("操作成功");
         //  this.getData({pageNum:1,pageSize:this.$router.query.pageSize})
            this.$router.push(this.$route.path)

          } else {
            this.$message.error("操作失败");
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      dealwith (id) {
        //处理
       this.$router.push({path: '/product-edit', query: {id: id}})
      },

      // 借款单位列表
      getLoanUnit() {
        let para = {
          code: "LoanUnit"
        };
        api.searchDictList(para).then(res => {
          this.LoanUnit = res.data.message;
        });
    },

    // 借款期限月列表
    getLoanCycleM() {  
      let para = {
        code: "LoanCycleM"
      };
      api.searchDictList(para).then(res => {
        this.LoanCycle1 = res.data.message;
      });
    },

    // 借款期限天列表
    getLoanCycleD() {
      let para = {
        code: "LoanCycleD"
      };
      api.searchDictList(para).then(res => {
        this.LoanCycle2 = res.data.message;
      });
    },

      // 还款方式列表
      getRepaymentMethod() {
        let para = {
          code: "RepaymentMethod"
        };
        api.searchDictList(para).then(res => {
          this.RepaymentMethod = res.data.message;
        });
    },

      //根据接口值返回汉字
      setRepayWayName(name,Arr){
        //console.log(name,Arr)
        if(Arr.length>0){
          for(let k in Arr){
            if(Arr[k].key==name){
                return Arr[k].value
            }
          }
        }
      },

      //根据接口值返回汉字
      setRepayWayName2(name,type){        
        if(type=="LU001"){
          if(this.LoanCycle1.length>0){
            for(let k in this.LoanCycle1){
              if(this.LoanCycle1[k].key==name){
                return this.LoanCycle1[k].value
              }
            }
          }
        }else if(type=="LU002"){
          if(this.LoanCycle2.length>0){
            for(let k in this.LoanCycle2){
              if(this.LoanCycle2[k].key==name){
                return this.LoanCycle2[k].value
              }
            }
          }
        }    
      },

      // 产品分类列表
      getproductClass() {
        let para = {
          code: "productClass"
        };
        api.searchDictList(para).then(res => {
          this.productClass = res.data.message;
        });
      },
      classtype(productClassify){
          var str="";
          switch (productClassify.productType) {
           case 'CASH':
              str='流动资金贷'
              break;
             case 'ASSETS':
              str='固定资产贷'
              break;
             case 'GUARANTEE':
              str='保函 '
              break;
             case 'MONEYORDER':
              str='承兑汇票 '
              break;
             case 'BILL':
              str='票据贴现'
              break;
          }
          return str
      },
      repayWaystage(repayWay){
          var state="";
          switch (repayWay.repayWay) {
            case "1":
              state='等额本息'
              break;
          case "2":
              state='等额本金'
              break;
              case "3":
              state='等本等息'
              break;
              case "4":
              state='先息后本'
              break;
              case "5":
              state='一次性还本付息'
              break;
          }
          return state
      }

    }
  }
</script>

<style lang="less">
.common-list-page.product_info{
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