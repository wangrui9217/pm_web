<template>
  <div class="common-list-page basedCost">
      <page-template :position-path="positionPath" :toolTitle="true" pageTitle="合同模板管理">
        <data-list

          :count-undo="total"
          ref="dataList"
          @data-refresh="getData"
          :filters="filters"
          :total="total"
          :toolFilterReceive="true"
          :contractTemplate='true'
          @changgestate="changestate"

          >
          <div style="width: 100%;padding:0 24px;background:#fff">
                 <el-table
                :data="dataList"
                ref="multipleTable"
                highlight-current-row
                :row-key="getRowKeys"
                @selection-change="handleSelectionChange"

                >
             <el-table-column
      type="selection"
      :reserve-selection="true"
      width="55">
       </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              min-width="30"
              :index="indexMethod"
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
     
            <el-table-column
						
							min-width="100"
							align="center"
							label="启用状态">
							<template slot-scope="scope">
								<span :class="[scope.row.status == 'NOL' ? 'success-color' : 'danger-color']">{{ scope.row.status=="NOL" ? "启用" : "停用" }}</span>
							</template>
						</el-table-column>

              <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
            />

            <el-table-column
              align="center"
              min-width="80"
              label="操作">
              <template slot-scope="scope">
                <div class="of-hidden actList">
                  <el-button type="text" size="small" @click.native.prevent="edittemp(scope.row)">编辑模板</el-button>
                  <el-button type="text" size="small" @click.native.prevent="downloadFile(scope.row)">模板下载</el-button>

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
  import {baseURLDownloads} from '../../api-authority/config.js'
  function openDownloadDialog(url, saveName) {
    // for ie 10 and later
    if (window.navigator.msSaveBlob) {

        try {
            window.navigator.msSaveBlob(url, saveName);
        }
        catch (e) {
            console.log(e);
        }
    }
    // 谷歌浏览器 创建a标签 添加download属性下载
    else {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) {
            event = new MouseEvent('click');
        }
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    }
}
  export default {
    data () {
      return {
         getRowKeys(row) {
            return row.id;
        },
        baseURLDownloads:baseURLDownloads,
        flag:false,
        dialogVisible:false,
        dialogVisible2:false,     
        textarea: '',
         formInline: {
          name: '',
          costNo:'',
          },
          ruleForm2:{

          },
        dataList: [ ],
        total: 0,
        filters: [
               {
            label: "合同类型 : ",
            type: "select",
            field: "type",
            options: [
              { label: "全部", value: "" },
              { label: "借款协议", value: "1" },
              { label: "咨询管理协议", value: "2" },
              { label: "自动代扣授权协议", value: "3" },


            ]
          },
          {
            label: false,
            placeholder: '合同名称',
            type: 'input',
            field: 'contractName'
          },  
        
      ],
        positionPath: [ {name: '合同管理'}, {name: '合同模板管理'}],
  


      }
    },
    created(){

    },
    components: {
      'data-list': DataList,
      PageTemplate
    },
    methods: {
        handleSelectionChange(rows) {
                this.multipleSelection = rows;
                this.select_orderId = [];
                if (rows) {
                    rows.forEach(row => {
                        if (row) {
                            this.select_orderId.push(row.id);
                        }
                    });
                }
       },
       temptype(type){
          var types='';
           switch (type.type) {
             case 1:
               types='借款协议'
               break;
            case 2:
               types='咨询管理协议'
               break;
             case 3:
               types='自动代扣授权协议'
               break;
               
           }
  
           return types;
       },
       changestate(state){
          console.log(state,22,this.select_orderId)
          if(!this.select_orderId){
             this.$message({
                message: '请选择一条模板',
                type: 'warning'
              });
              return
          }
        if(state==1){
           this.$confirm("此操作将停用此模板, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then( () => {
            api.changetempstate({ids:this.select_orderId,status:'STP'})
            .then( res => {
                // console.log("data:"+JSON.stringify(res.data))
                  if (res.data.code == 0) {
                         this.$message({
                            message: '停用成功',
                            type: 'success'
                          });
                this.$refs.multipleTable.clearSelection();
          //    this.getData({pageNum:1,pageSize:10})
            this.$router.push(this.$route.path)

                  }else{
                       this.$message({
                        message: res.data.message,
                        type: 'warning'
                      });
                  }
              }).catch(err => {
                console.log(err);
                // console.log("dataList:"+JSON.stringify(this.dataList));
              });
          })
        }else{

  api.changetempstate({ids:this.select_orderId,status:'NOL'})
            .then( res => {
                // console.log("data:"+JSON.stringify(res.data))
                  if (res.data.code == 0) {
                     this.$message({
                            message: '启用成功',
                            type: 'success'
                          });
                          this.$refs.multipleTable.clearSelection();
             // this.getData({pageNum:1,pageSize:10})
            this.$router.push(this.$route.path)

                  }else{
                       this.$message({
                        message: res.data.message,
                        type: 'warning'
                      });
                  }
              }).catch(err => {
                console.log(err);
                // console.log("dataList:"+JSON.stringify(this.dataList));
              });

        }
     
   

       },
       edittemp(data){
           this.$router.push({name: '新增模板合同',query:data})
       },
   credtinfo(id){
        location.href=this.baseURLDownloads+'/loan/contract/downLoadContractTemplate?id='+id
   },
      moment: moment,
      getData (params) {
        api.getTempList(params).
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
      indexMethod(index) {
        return (this.$store.state.pagenum-1)%this.$store.state.pagesizes*this.$store.state.pagesizes+(index+1)
      },
 
      downloadFile(data){
                api.downloadFile({filePath:data.contractPdfUrl}).
                  then((res) => {
                    
                    try{
                      var foo = res.data

                      var fileName = `${data.contractName}.pdf`;
                      openDownloadDialog(foo, fileName)
                      
                    }catch(err){
                      console.log(err)
                    }
                    
                  }).catch((err) => {
                    console.log(err)
                  })
      },
     downloadFile2 (blob, fileName){
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;

          //此写法兼容可火狐浏览器
          document.body.appendChild(link);

          var evt = document.createEvent("MouseEvents");
          evt.initEvent("click", false, false);
          link.dispatchEvent(evt);

          document.body.removeChild(link);
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