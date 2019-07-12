<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="">
    <div class="common-report-page">
      <section class="common-report-base">
        <div class="base_message">
          <section class="detailInfo_message">
            <div class="detailInfo_message_tit">
              <table align="center" style="width: 100%;">
                <tr>
                  <td width="10"><span>客户名称：</span>{{obj.compName}}</td>
                  <td width="10"><span>组织机构代码证：</span>{{detailInfo.creditNo}}</td>
                  <td width="10"><span>法人名称：</span>{{detailInfo.legalName}}</td>
                </tr>
                <tr>
                  <td><span>注册资本金：</span> {{detailInfo.registerAmount}}</td>
                  <td><span>企业（机构）类型：</span> {{detailInfo.compNature}}</td>
                  <td><span>名单归属：</span>{{detailInfo.compRiskLevel}}</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </section>
      <!-- 概览 -->
      <div class="detail-item">
        <h4 class="style-h4">营业执照</h4>
        <div v-if="detailInfo.businessLicenseUrl">
          <img :src="detailInfo.businessLicenseUrl" preview="0" preview-text="营业执照">
        </div>
        <h4 class="style-h4">法人身份信息</h4>
        <el-row>
          <el-col :span="12">
            <div v-if="detailInfo.legalIdNoFrontUrl">
              <img :src="detailInfo.legalIdNoFrontUrl" preview="0" preview-text="法人身份证" >
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="detailInfo.legalIdNoBackUrl">
              <img :src="detailInfo.legalIdNoBackUrl" preview="0" preview-text="法人身份证" >
            </div>
          </el-col>
        </el-row>
        <h4 class="style-h4">加盖公章公司章程</h4>
        <div v-if="detailInfo.articlesAssociationUrl">
          <img :src="detailInfo.articlesAssociationUrl" preview="0" preview-text="加盖公章公司章程" >
        </div>
        <h4 class="style-h4">股东身份信息</h4>
        <el-row v-for="(item,index) in holderInfos" :key="index">
          <el-col :span="12">
            <div>
              <img :src="item.shareholderIdNoFrontUrl" preview="0" preview-text="股东身份证" >
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <img :src="item.shareholderIdNoBackUrl" preview="0" preview-text="股东身份证" >
            </div>
          </el-col>
        </el-row>
        <h4 class="style-h4">双录资料</h4>
        <el-row>
          <el-col :span="12">
            <div v-if="detailInfo.openAccountVideoUrl">
              <video :src="detailInfo.openAccountVideoUrl" controls  width="480" height="320"/>
            </div>
            
          </el-col>
          <el-col :span="12">
            <div v-if="detailInfo.voiceFrequencyUrl">
              <audio :src="detailInfo.voiceFrequencyUrl" controls width="480" height="320"/>
            </div>
          </el-col>
        </el-row>
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
      obj: {},
      positionPath: [ {name: '工单管理'},{name: '对公开户工单详情'}],
      params: {
        "compId": 0,
        "compName": "",
        "orderId": 0,
        "pageNum": 1,
        "pageSize": 100,
        "status": 3
      },
      holderInfos: []
    }
  },
  computed: {

  },
  methods: {
    getOpenOrderDetail() {
      api.getOpenOrderDetail(this.params).
      then(({ data }) => {
        if (data.code === 0) {
          let message = data.message
          if(!message) {return false}
          let detailInfo = message
          this.getImgUrl(detailInfo,['businessLicenseUrl','legalIdNoBackUrl', 'legalIdNoFrontUrl', 'openAccountVideoUrl', 'voiceFrequencyUrl', 'articlesAssociationUrl'])
          this.detailInfo = detailInfo
          let holderInfos = message.holderInfos
          if(holderInfos){
            holderInfos.forEach(item => {
              item.shareholderIdNoBackUrl = api.getImgURL(window.encodeURIComponent(item.shareholderIdNoBackUrl))
              item.shareholderIdNoFrontUrl = api.getImgURL(window.encodeURIComponent(item.shareholderIdNoFrontUrl))
            })
            this.holderInfos = holderInfos  
          }
          
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    getImgUrl(object, keyArr){
      for(let i = 0,len = keyArr.length; i<len; i++){
        if(object[keyArr[i]]){
          let path = object[keyArr[i]]
          path = window.encodeURIComponent(path)
          object[keyArr[i]] = api.getImgURL(path)
          // api.IOReadFile({
          //   filePath: object[keyArr[i]]
          // }).then(res => {
          //   if (res.data instanceof Blob) {
          //     object[keyArr[i]] = window.URL.createObjectURL(res.data);
          //   }
          // })
        }
      }
    }
  },
  created() {
    let str = sessionStorage.getItem('openOrderInfo')

    if (str) {
      this.obj = JSON.parse(str)
      this.params.compId = this.obj.compId
      this.params.orderId = this.obj.id
      this.params.compName = this.obj.compName
      this.getOpenOrderDetail()
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
  img{
    max-width: 100%;
    height: auto;
  }
}

.style-h4 {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
