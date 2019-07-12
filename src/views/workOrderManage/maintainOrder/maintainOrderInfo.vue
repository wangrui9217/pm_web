<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <table align="center" style="width: 100%;">
                <tr>
                  <td width="1"><span>客户名称：</span>{{detailInfo.compName}}</td>
                  <td width="1"><span>法人名称：</span>{{detailInfo.legalName}}</td>
                </tr>
                <tr>
                  <td><span>手机号码：</span>{{detailInfo.legalPhone}}</td>
                  <td><span>注册地址：</span> {{detailInfo.registerAddr}}</td>
                </tr>
                <tr>
                  <td><span>执行者：</span>{{detailInfo.realName}}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </section>
      <!-- 概览 -->
      <div class="detail-item">
        <h4 class="style-h4">综合评价</h4>
        <p style="text-indent: 2em">{{detailInfo.remark}}</p>
        <h4 class="style-h4">现场定位</h4>
        <div v-for="(file,i) in files" :key="i">
          <img :src="file.url" width="600" preview="1" preview-text="现场定位">
        </div>
        
      </div>
    </div>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
export default {
  components: { PageTemplate},
  data() {
    return {
      loading: false,
      detailInfo: {},
      positionPath: [ {name: '工单管理'},{name: '客户维系工单详情'}],
      files: []
    }
  },
  computed: {

  },
  methods: {
    getLoanMaintainOrderFile(){
      api.getLoanMaintainOrderFile({
        orderId: this.detailInfo.id
      }).then(({data}) => {
        if(data.code == '0' && data.message){
          this.files = data.message
          this.files.forEach(item => {
            item.url = api.getImgURL(window.encodeURIComponent(item.filepath))
          })
          console
        }
        else{

        }
      }).catch((err) => {})
    }
    
  },
  created() {
    let str = sessionStorage.getItem('maintainOrderInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.getLoanMaintainOrderFile()
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
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
