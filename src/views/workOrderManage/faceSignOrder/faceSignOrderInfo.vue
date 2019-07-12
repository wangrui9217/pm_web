<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <table align="center" style="width: 100%;">
                <tr>
                  <td><span>客户名称：</span>{{detailInfo.compName}}</td>
                  <td><span>所属支行：</span>{{detailInfo.orgName}}</td>
                  <td><span>股东姓名：</span>{{detailInfo.roleUserName}}</td>
                </tr>
                <tr>
                  <td><span>手机号码：</span>{{detailInfo.roleUserPhone}}</td>
                  <td colspan="2"><span>地址：</span> {{detailInfo.roleAddr}}</td>
                </tr>
                <tr>
                  <td><span>执行者：</span>{{detailInfo.executors}}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </section>
      <!-- 概览 -->
      <div class="detail-item">
        <div v-for="(item1,index1) in files" :key="index1">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item2,index2) in item1" :key="index2">
              <h4 class="style-h4">{{item2.fileName}}</h4>
              <div class="img-box">
                <video :src="item2.filepath" controls  width="50%" height="300" v-if="item2.fileType=='mp4'"></video>
                <img v-else :src="item2.filepath" alt="" width="50%" preview="0" :preview-text="item2.fileName">
              </div>
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
      positionPath: [ {name: '工单管理'},{name: '面签工单详情'}],
      files: []
    }
  },
  computed: {

  },
  methods: {
    getFaceSignFiles() {
      api.getFaceSignFiles({
        loanFacesignObjectId: this.detailInfo.loanApplyId,
        orderId: this.detailInfo.id
      }).then(({ data }) => {
        if (data.code === 0) {
          let message = data.message
          if(message.length >0){
            message.forEach(item1 => {
              if(Array.isArray(item1)){
                item1.forEach(item2 => {
                  if(item2.fileCategory){
                    item2.fileName = Files[item2.fileCategory]
                    item2.filepath = api.getImgURL(window.encodeURIComponent(item2.filepath))
                  }
                })
              }
            })
            this.files = message
            console.log(this.files,77777)
          }
        } else {
          this.$message.error('请求失败')
        }
      })
    },
  },
  created() {
    let str = sessionStorage.getItem('faceSignOrderInfo')
    if (str) {

      this.detailInfo = JSON.parse(str)
      this.getFaceSignFiles()
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
.img-box{
  min-width: 260px;
  text-align: center;
  border-radius: 6px;
  overflow: auto;
  border: dashed 1px #d1d1d1;
  img{
    width: 100%;
    height: auto;
  }
}
.style-h4 {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
