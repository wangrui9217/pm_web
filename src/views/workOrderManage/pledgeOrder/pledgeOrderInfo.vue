<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <table align="center" style="width: 100%;">
                <tr>
                  <td width="10"><span>客户名称：</span>{{detailInfo.compName}}</td>
                  <td width="10"><span>法人姓名：</span>{{detailInfo.legalName}}</td>
                </tr>
                <tr>
                  <td><span>手机号码：</span>{{detailInfo.legalPhone}}</td>
                  <td colspan="2"><span>地址：</span> {{detailInfo.registerAddr}}</td>
                </tr>
                <tr>
                  <td><span>执行者：</span>{{detailInfo.userRealname}}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </section>
      <!-- 概览 -->
      <div class="detail-item">
        <div v-for="(item1,index1) in files" :key="index1">
          <el-row :gutter="10">
            <el-col :span="6" v-for="(item2,index2) in item1" :key="index2">
              <h4 class="style-h4">{{item2.fileName}}</h4>
              <div style="height:20px;">
                <p v-if="item2.busiessName">抵押物名称：{{item2.busiessName}}</p>  
              </div>
              <img v-if="item2.fileCategory != 'liveness_image'" :src="item2.filepath" alt=""  width="100%" preview="0" :preview-text="item2.fileName">
            </el-col>
          </el-row>
        </div>
        
        
      </div>
    </div>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
import Files from "@/const/files";
export default {
  components: { PageTemplate},
  data() {
    return {
      loading: false,
      detailInfo: {},
      positionPath: [ {name: '工单管理'},{name: '抵质押工单详情'}],
      files: []
    }
  },
  computed: {

  },
  methods: {
    getPledgeFiles() {
      api.getPledgeFiles({
        loanFacesignObjectId: this.detailInfo.loanApplyId,
        orderId: this.detailInfo.id
      }).then(({ data }) => {
        if (data.code === 0) {
          let message = data.message
          if(message.length >0){
            message.forEach(item1 => {
              if(Array.isArray(item1)){
                item1.sort(function(a,b){
                  if(b.busiessName){
                    return -1
                  }
                  else{
                    return 1
                  }
                })
                item1.forEach(item2 => {
                  if(item2.fileCategory){
                    item2.fileName = Files[item2.fileCategory]
                    item2.filepath = api.getImgURL(window.encodeURIComponent(item2.filepath))
                  }
                })
              }
            })
            this.files = message
          }
        } else {
          this.$message.error('请求失败')
        }
      })
    },
  },
  created() {
    let str = sessionStorage.getItem('pledgeOrderInfo')
    if (str) {

      this.detailInfo = JSON.parse(str)
      this.getPledgeFiles()
    }
  },
  mounted() {
    
  }
}

</script>
<style lang="less" scoped>
.common-report-page {
  padding: 0 30px 82px;
  min-width: 1200px;
}

/*详情头部*/
.common-report-base {
  font-size: 12px;
  padding: 0px;
  margin: 0px;
  background: #fff;
  border: none;

  .base_message {
    height: 148px;

    .detailInfo_message {
      position: relative;
      line-height: 37px;
    }
  }
}

/*详情内容*/
.common-report-page  .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
}

.common-report-page  .title h3 {
  font-size: 18px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}

.detailInfo_message_tit {
  background: #e4e4e4;
  padding: 0 15px;
  position: relative;
  padding-top: 10px;
  border: solid 1px rgba(204, 204, 204, 1);

  tr span {
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
}
.detail-item {
  margin-top: 20px;
  p {
    line-height: 20px;
    font-size: 13px;
  }
}

.style-h4 {
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 20px;
}
.style-h4+div{
  margin-bottom: 5px;
}
</style>
