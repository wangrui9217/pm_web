<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" :showReturn="true">
    <div class="wrap">
      <div class="tit">合同信息</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>业务编号：</span><b>{{detailInfo.loanNo}}</b>
        </el-col>
        <el-col :span="8">
          <span>放款金额(元)：</span><b>{{detailInfo.loanAmount}}</b>
        </el-col>
        <el-col :span="8">
          <span>期限：</span><b>{{detailInfo.productLoanTrem}}个月</b>
        </el-col>
        <el-col :span="8">
          <span>申请产品：</span><b>{{detailInfo.productName}}</b>
        </el-col>
        <el-col :span="8">
          <span>申请时间：</span><b>{{detailInfo.applyTime}}</b>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>服务费类型：</span><b>{{detailInfo.proServiceCostValueType}}</b>
        </el-col>
        <el-col :span="8">
          <span>服务费(元)：</span><b>{{detailInfo.proServiceCost}}</b>
        </el-col>
        <el-col :span="8">
          <span>收取方式：</span><b>放款时-扣除</b>
        </el-col>
        <el-col :span="8">
          <span>利息类型：</span><b>{{detailInfo.proInterestValueType}}</b>
        </el-col>
        <el-col :span="8">
          <span>利率(年化)：</span><b>{{detailInfo.proInterestCost}}‰</b>
        </el-col>
        <el-col :span="8">
          <span>收取方式：</span><b>当期收取</b>
        </el-col>
      </el-row>
      <div class="tit">借款人信息</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>姓名：</span><b>{{detailInfo.legalName}}</b>
        </el-col>
        <el-col :span="8">
          <span>身份证：</span><b>{{detailInfo.legalIdno}}</b>
        </el-col>
        <el-col :span="8">
          <span>手机：</span><b>{{detailInfo.legalPhone}}</b>
        </el-col>
      </el-row>
      <div class="tit">放款账户信息</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <span>户名：</span><b>{{detailInfo.loamAccountUsername}}</b>
        </el-col>
        <el-col :span="8">
          <span>企业开户行：</span><b>{{detailInfo.loanBank || '泗阳农商行'}}</b>
        </el-col>
        <el-col :span="8">
          <span>账号：</span><b>{{detailInfo.loamAccountNum}}</b>
        </el-col>
        <el-col :span="8">
          <span>放款日期：</span><b>{{detailInfo.loanTime}}</b>
        </el-col>
      </el-row>
    </div>
    <el-tabs type="border-card" style="margin-left:20px;margin-top: 10px;">
      <el-tab-pane label="常规检查报告">
        <div class="report-item">
          <div class="title"><h3>企业常规信息检查</h3>
          </div>
          <h4 class="style-h4">1.企业基本信息</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="cData.C1">
            <tr style="height: 40px;">
              <th>调查大类</th>
              <th>调查事项</th>
              <th>选择</th>
              <th>补充说明</th>
            </tr>
            <tr v-for="(item,index) in cData.C1.list">
              <td v-if="index===0" :rowspan="cData.C1.len">人员信息调查</td>
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr v-for="(item,index) in cData.C2.list">
              <td v-if="index===0" :rowspan="cData.C2.len">生产经营信息调查</td>
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr v-for="(item,index) in cData.C3.list">
              <td v-if="index===0" :rowspan="cData.C3.len">宏观信息调查</td>
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr v-for="(item,index) in cData.C4.list">
              <td v-if="index===0" :rowspan="cData.C4.len">舆情信息调查</td>
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr v-for="(item,index) in cData.C5.list">
              <td v-if="index===0" :rowspan="cData.C5.len">担保及抵（质）押信息调查</td>
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
          </table>
          <h4 class="style-h4">2.新增或变更人员信息（自然人股东、高管、财务部门负责人及核心员工）</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr>
              <th>姓名</th>
              <th>与企业关系</th>
              <th>手机号</th>
              <th>身份证下载</th>
            </tr>
               <tr v-for="(item,index) in lccAlterInfoDatas">
              <td>{{item.alterName}}</td>
  
              <td>{{item.alterNameRelation}}</td>
              <td>{{item.alterPhone}}</td>
                <td>
                  <el-button type="text" size="small" @click.native.prevent="downloadFile(item)" :disabled="!item.householdRegisterUrl">户口本下载</el-button>

                  <el-button type="text" size="small" @click.native.prevent="downloadFile2(item)"  :disabled="!item.idnoBackUrl">身份证国微面下载</el-button>
                  <el-button type="text" size="small" @click.native.prevent="downloadFile3(item)"  :disabled="!item.idnoFrontUrl">身份证头像面下载</el-button>
                  <el-button type="text" size="small" @click.native.prevent="downloadFile4(item)"  :disabled="!item.marriageCertificateUrl">结婚证下载</el-button>


           </td>
            </tr>
          </table>
          <div class="title"><h3>贷款项目监控</h3>
          </div>
          <h4 class="style-h4">1.流动资金贷款监控</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="lData.L1">
            <tr>
              <th>项目</th>
              <th>选择</th>
              <th>判断原因</th>
            </tr>
            <tr v-for="(item,index) in lData.L1">
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr>
              <th colspan="3">调查人员补充信息填写（选填）</th>
            </tr>
            <tr>
              <td colspan="3" style="height: 100px;" v-if="lData.R1">{{lData.R1[0].remark}}</td>
              <td colspan="3" style="height: 100px;" v-else>未填写</td>
            </tr>
          </table>
          <!-- 2.固定资产贷款监控 -->
          <h4 class="style-h4">2.固定资产贷款监控</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="lData.L2">
            <tr>
              <th>项目</th>
              <th>选择</th>
              <th>判断原因</th>
            </tr>
            <tr v-for="(item,index) in lData.L2">
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
              <td>{{item.remark}}</td>
            </tr>
            <tr>
              <th colspan="3">调查人员补充信息填写（选填）</th>
            </tr>
            <tr>
              <td colspan="3" style="height: 100px;" v-if="lData.R1 && lData.R1.length>1">{{lData.R1[1].remark}}</td>
              <td colspan="3" style="height: 100px;" v-else>未填写</td>
            </tr>
          </table>
          <div class="title"><h3>定期填写信息</h3>
          </div>
          <h4 class="style-h4">1.财务信息（最新一季度）</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr>
              <th colspan="4">资产负债表（单位：元）</th>
            </tr>
            <tr>
              <td colspan="4">年份：{{incurDebts.year}} 月份：{{incurDebts.month}} 日期：{{incurDebts.day}}</td>
            </tr>
            <tr>
              <th>资产</th>
              <th>本期金额</th>
              <th>负债及所有者权益</th>
              <th>本期金额</th>
            </tr>
            <tr>
              <th colspan="2">流动资产</th>
              <th colspan="2">流动负债</th>
            </tr>
            <tr>
              <th>货币资金（必填）</th>
              <td>{{incurDebts.ba11||'-'}}</td>
              <td>短期借款</td>
              <td>{{incurDebts.bd10||'-'}}</td>
            </tr>
            <tr>
              <td>短期投资</td>
              <td>{{incurDebts.ba10||'-'}}</td>
              <td>应付票据</td>
              <td>{{incurDebts.bd11||'-'}}</td>
            </tr>
            <tr>
              <td>应收票据</td>
              <td>{{incurDebts.ba12||'-'}}</td>
              <td>应付账款</td>
              <td>{{incurDebts.bd12||'-'}}</td>
            </tr>
            <tr>
              <td>应收股利</td>
              <td>{{incurDebts.ba13||'-'}}</td>
              <td>预收账款</td>
              <td>{{incurDebts.bd13||'-'}}</td>
            </tr>
            <tr>
              <td>应收利息</td>
              <td>{{incurDebts.ba14||'-'}}</td>
              <td>应付工资</td>
              <td>{{incurDebts.bd14||'-'}}</td>
            </tr>
            <tr>
              <th>应收账款（必填）</th>
              <td>{{incurDebts.ba20||'-'}}</td>
              <td>应付福利费</td>
              <td>{{incurDebts.bd15||'-'}}</td>
            </tr>
            <tr>
              <td>其他应收款</td>
              <td>{{incurDebts.ba21||'-'}}</td>
              <td>应付股利</td>
              <td>{{incurDebts.bd16||'-'}}</td>
            </tr>
            <tr>
              <td>预付账款</td>
              <td>{{incurDebts.ba22||'-'}}</td>
              <td>应交税金</td>
              <td>{{incurDebts.bd17||'-'}}</td>
            </tr>
            <tr>
              <td>应收补贴款</td>
              <td>{{incurDebts.ba23||'-'}}</td>
              <td>其他应交款</td>
              <td>{{incurDebts.bd18||'-'}}</td>
            </tr>
            <tr>
              <th>存货（必填）</th>
              <td>{{incurDebts.ba30||'-'}}</td>
              <td>其他应付款</td>
              <td>{{incurDebts.bd19||'-'}}</td>
            </tr>
            <tr>
              <td>待摊费用</td>
              <td>{{incurDebts.ba31||'-'}}</td>
              <td>预提费用</td>
              <td>{{incurDebts.bd20||'-'}}</td>
            </tr>
            <tr>
              <td>一年内到期的长期债权投资</td>
              <td>{{incurDebts.ba32||'-'}}</td>
              <td>预计负债</td>
              <td>{{incurDebts.bd21||'-'}}</td>
            </tr>
            <tr>
              <td>其他流动资产</td>
              <td>{{incurDebts.ba33||'-'}}</td>
              <td>一年内到期的长期负债</td>
              <td>{{incurDebts.bd22||'-'}}</td>
            </tr>
            <tr>
              <th>流动资产合计（必填）</th>
              <td>{{incurDebts.ba34||'-'}}</td>
              <td>其他流动负债</td>
              <td>{{incurDebts.bd23||'-'}}</td>
            </tr>
            <tr>
              <th colspan="2">长期投资</th>
              <td>流动负债合计（必填）</td>
              <td>{{incurDebts.bd24||'-'}}</td>
            </tr>
            <tr>
              <td>长期股权投资</td>
              <td>{{incurDebts.ba40||'-'}}</td>
              <th colspan="2">长期负债</th>
            </tr>
            <tr>
              <td>长期债权投资</td>
              <td>{{incurDebts.ba41||'-'}}</td>
              <td>长期借款</td>
              <td>{{incurDebts.bd30||'-'}}</td>
            </tr>
            <tr>
              <td>长期投资合计</td>
              <td>{{incurDebts.ba42||'-'}}</td>
              <td>应付债券</td>
              <td>{{incurDebts.bd31||'-'}}</td>
            </tr>
            <tr>
              <th colspan="2">固定资产</th>
              <td>长期应付款</td>
              <td>{{incurDebts.bd32||'-'}}</td>
            </tr>
            <tr>
              <td>固定资产原价</td>
              <td>{{incurDebts.ba50||'-'}}</td>
              <td>专项应付款</td>
              <td>{{incurDebts.bd33||'-'}}</td>
            </tr>
            <tr>
              <td>减：累计折旧</td>
              <td>{{incurDebts.ba51||'-'}}</td>
              <td>其他长期负债</td>
              <td>{{incurDebts.bd34||'-'}}</td>
            </tr>
            <tr>
              <td>固定资产净值</td>
              <td>{{incurDebts.ba52||'-'}}</td>
              <td>长期负债合计</td>
              <td>{{incurDebts.bd35||'-'}}</td>
            </tr>
            <tr>
              <td>减：固定资产减值准备</td>
              <td>{{incurDebts.ba53||'-'}}</td>
              <th colspan="2">递延税项</th>
            </tr>
            <tr>
              <td>固定资产净额</td>
              <td>{{incurDebts.ba54||'-'}}</td>
              <td>递延税款贷项</td>
              <td>{{incurDebts.b40||'-'}}</td>
            </tr>
            <tr>
              <td>工程物资</td>
              <td>{{incurDebts.ba55||'-'}}</td>
              <th>负债合计（必填）</th>
              <td>{{incurDebts.b41||'-'}}</td>
            </tr>
            <tr>
              <td>在建工程</td>
              <td>{{incurDebts.ba56||'-'}}</td>
              <th colspan="2">所有者权益(或股东权益)</th>
            </tr>
            <tr>
              <td>固定资产清理</td>
              <td>{{incurDebts.ba57||'-'}}</td>
              <td>实收资本(或股本)</td>
              <td>{{incurDebts.b50||'-'}}</td>
            </tr>
            <tr>
              <td>固定资产合计</td>
              <td>{{incurDebts.ba58||'-'}}</td>
              <td>减：已归还投资</td>
              <td>{{incurDebts.b51||'-'}}</td>
            </tr>
            <tr>
              <th colspan="2">无形资产及其他资产</th>
              <td>实收资本(或股本)净额</td>
              <td>{{incurDebts.b52||'-'}}</td>
            </tr>
            <tr>
              <td>无形资产</td>
              <td>{{incurDebts.ba60||'-'}}</td>
              <td>资本公积</td>
              <td>{{incurDebts.b53||'-'}}</td>
            </tr>
            <tr>
              <td>长期待摊费用</td>
              <td>{{incurDebts.ba61||'-'}}</td>
              <td>盈余公积</td>
              <td>{{incurDebts.b54||'-'}}</td>
            </tr>
            <tr>
              <td>其他长期资产</td>
              <td>{{incurDebts.ba62||'-'}}</td>
              <td>其中：法定公益金</td>
              <td>{{incurDebts.b55||'-'}}</td>
            </tr>
            <tr>
              <td>无形资产及其他资产合计</td>
              <td>{{incurDebts.ba63||'-'}}</td>
              <td>未分配利润</td>
              <td>{{incurDebts.b56||'-'}}</td>
            </tr>
            <tr>
              <th colspan="2">递延税项</th>
              <td>所有者权益(或股东权益)合计</td>
              <td>{{incurDebts.b57||'-'}}</td>
            </tr>
            <tr>
              <td>递延税款借项</td>
              <td>{{incurDebts.ba71||'-'}}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>资产总计（必填）</th>
              <td>{{incurDebts.ba72||'-'}}</td>
              <td>负债和所有者权益(或股东权益)总计</td>
              <td>{{incurDebts.b58||'-'}}</td>
            </tr>
          </table>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr>
              <th colspan="2">利润表（单位：元）</th>
            </tr>
            <tr>
              <td colspan="2">年份： 月份： 日期：</td>
            </tr>
            <tr>
              <th>项目</th>
              <th>本期金额</th>
            </tr>
            <tr>
              <th>一、营业收入（必填）</th>
              <td>{{profit.p2||'-'}}</td>
            </tr>
            <tr>
              <th>减：营业成本（必填）</th>
              <td>{{profit.p3||'-'}}</td>
            </tr>
            <tr>
              <td>营业税金及附加</td>
              <td>{{profit.p4||'-'}}</td>
            </tr>
            <tr>
              <td>销售费用</td>
              <td>{{profit.p5||'-'}}</td>
            </tr>
            <tr>
              <td>管理费用</td>
              <td>{{profit.p6||'-'}}</td>
            </tr>
            <tr>
              <th>财务费用</th>
              <td>{{profit.p7||'-'}}</td>
            </tr>
            <tr>
              <td>资产减值损失</td>
              <td>{{profit.p8||'-'}}</td>
            </tr>
            <tr>
              <td>加：公允价值变动收益（损失以“－”号填列）</td>
              <td>{{profit.p9||'-'}}</td>
            </tr>
            <tr>
              <td>投资收益（损失以“－”号填列）</td>
              <td>{{profit.p10||'-'}}</td>
            </tr>
            <tr>
              <th>二、营业利润（亏损以“－”号填列）</th>
              <td>{{profit.p11||'-'}}</td>
            </tr>
            <tr>
              <td>加：营业外收入</td>
              <td>{{profit.p12||'-'}}</td>
            </tr>
            <tr>
              <td>减：营业外支出</td>
              <td>{{profit.p13||'-'}}</td>
            </tr>
            <tr>
              <td>其中：非流动资产处置损失</td>
              <td>{{profit.p14||'-'}}</td>
            </tr>
            <tr>
              <th>三、利润总额（亏损以“－”号填列）</th>
              <td>{{profit.p15||'-'}}</td>
            </tr>
            <tr>
              <td>减：所得税费用</td>
              <td>{{profit.p16||'-'}}</td>
            </tr>
            <tr>
              <th>四、净利润（净亏损以“－”号填列）（必填）</th>
              <td>{{profit.p17||'-'}}</td>
            </tr>
          </table>
          <h4 class="style-h4">2.他行银行流水余额（最新一季度）</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0" v-for="item in bankStatement">
            <tr>
              <th>期初日期</th>
              <td>{{item.startTime}}</td>
              <th>期末日期</th>
              <td>{{item.endTime}}</td>
            </tr>
            <tr>
              <th>银行账户</th>
              <th>期初余额</th>
              <th>期末余额</th>
              <th>计息金额</th>
            </tr>
            <tr>
              <td>{{item.account}}</td>
              <td>{{item.startTermAmount}}</td>
              <td>{{item.endTermAmount}}</td>
              <td>{{item.interestAccrual}}</td>
            </tr>
          </table>
          <h4 class="style-h4">3.税务发票信息（最新一季度）</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr>
              <th>时期</th>
              <th>有效进项发票金额</th>
              <th>有效销项发票金额</th>
            </tr>
            <tr v-for="item in taxInfo">
              <td>{{item.stage}}</td>
              <td>{{item.intoAmount}}</td>
              <td>{{item.outAmount}}</td>
            </tr>
          </table>
          <h4 class="style-h4">4.贸易行业补充信息（最新一期）</h4>
          <table class="style-table border center" cellpadding="0" cellspacing="0" v-for="item in tradeInfo">
            <tr>
              <th>项目</th>
              <th>最近季度金额</th>
            </tr>
            <tr>
              <td>仓库租赁</td>
              <td>{{item.warehouseRental}}</td>
            </tr>
            <tr>
              <td>物流费用</td>
              <td>{{item.logisticsFees}}</td>
            </tr>
          </table>
          <div class="title"><h3>行内业务提示信息</h3>
          </div>
          <table class="style-table border center" cellpadding="0" cellspacing="0" v-if="lData.L3">
            <tr>
              <th>项目</th>
              <th>企业完成情况</th>
            </tr>
            <tr v-for="item in lData.L3">
              <td>{{item.content}}</td>
              <td>{{item.result}}</td>
            </tr>
          </table>
        </div>

      </el-tab-pane>
      <el-tab-pane label="补充材料">
        <div class="detail-item">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in files" :key="index">
              <h4 class="style-h4">{{item.fileName}}</h4>
              <div class="img-box">
                <video :src="item.filepath" controls  width="50%" height="300" v-if="item.fileType=='mp4'"></video>
                <img v-else :src="item.filepath" preview="0" :preview-text="item.fileName">
              </div>
            </el-col>
          </el-row>
             <!-- <el-row :gutter="20">
            <el-col :span="12" > -->
              <h4 class="style-h4">银行流水</h4>
              <div class="img-box2">
                
                <img :src="item.filepath" alt="暂无图片" width="25%"  v-for="(item,index) in surveyRunningAccountList" :key="index" preview="0" preview-text="银行流水">


              </div>
            <!-- </el-col>
              <el-col :span="12" > -->
              <h4 class="style-h4">税务发票信息</h4>
              <div class="img-box2">
                
                <img preview="0" preview-text="税务发票" :src="item.filepath" alt="暂无图片" v-for="(item,index) in surveyTaxInvoiceList" :key="index" >


              </div>
            <!-- </el-col>
          </el-row> -->

              <h4 class="style-h4">贸易信息 </h4>
              <div class="img-box2">
                
                <img preview="0" preview-text="贸易信息" :src="item.filepath" alt="暂无图片" v-for="(item,index) in surveyTradeList" :key="index" >
       

              </div>
       
          
     
        
      </div>
      </el-tab-pane>
    </el-tabs>
    
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
import Files from "@/const/files";
  import {baseURLDownloads} from '../../../api-authority/config.js'
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
  components: { PageTemplate },
  data() {
    return {
      loading: false,
      detailInfo: {},
      positionPath: [{ name: '工单管理' }, { name: '贷后常规检查工单详情' }],
      cData: {},
      lData: {},
      incurDebts: {},  //资产负债 ,
      profit: {}, // 利润
      bankStatement: [], // 银行流水
      taxInfo: [], // 税务发票信息
      tradeInfo: {}, // 贸易信息
      costValueTypeArr: ['','固定数字','年化利率','单次比率'],
      interestTypeArr: ['','固定数字','年化利率','单次比率'],
      files: [],
      lccAlterInfoDatas:[],
      baseURLDownloads:baseURLDownloads,
      surveyRunningAccountList:[],
      surveyTaxInvoiceList:[],
      surveyTradeList:[]
    }
  },
  computed: {

  },
  methods: {
    getDetailLcc() {
      api.getDetailLcc({
        orderId: this.detailInfo.id
      }).then(({data}) => {
        if(data.code == 0){

          let lccResultInfoEntities = data.message.lccResultInfoEntities
          this.incurDebts = data.message.surveyBalanceSheetEntities[0] || {}
          this.profit = data.message.surveyProfitEntities[0] || {}
          this.bankStatement = data.message.surveyRunningAccountEntities
          this.taxInfo = data.message.surveyTaxInvoiceEntities
          this.tradeInfo = data.message.surveyTradeEntities
          this.lccAlterInfoDatas=data.message.lccAlterInfoDatas
          this.surveyRunningAccountList=data.message.surveyRunningAccountList || []
          this.surveyTaxInvoiceList=data.message.surveyTaxInvoiceList || []
          this.surveyTradeList=data.message.surveyTradeList || []

            this.surveyRunningAccountList.forEach(item => {
              item.filepath = api.getImgURL(window.encodeURIComponent(item.filepath))
            
          })
           this.surveyTaxInvoiceList.forEach(item => {
              item.filepath = api.getImgURL(window.encodeURIComponent(item.filepath))
            
          })
             this.surveyTradeList.forEach(item => {
              item.filepath = api.getImgURL(window.encodeURIComponent(item.filepath))
            
          })
          let cList = lccResultInfoEntities.filter(item => {
            return item.type == 1
          })
          let lList = lccResultInfoEntities.filter(item => {
            return item.type != 1
          })

          cList.forEach(item => {
            let obj = {
              result: item.checkResult==1?'是':'否',
              content: item.itemContent,
              remark: item.remark
            }
            let preKey = item.itemCode.substring(0, 2)
            if(!this.cData[preKey]){
              this.cData[preKey] = {
                len: 1,
                list: [obj]
              }
            }
            else{
              this.cData[preKey].len += 1
              this.cData[preKey].list.push(obj)
            }
          })
          
          lList.forEach(item => {
            let obj = {
              result: item.checkResult==1?'是':'否',
              content: item.itemContent,
              remark: item.remark
            }
            let preKey = item.itemCode.substring(0, 2)
            if(!this.lData[preKey]){
              this.lData[preKey] = [obj]
            }
            else{
              this.lData[preKey].push(obj)
            }
          })
        }
      }).catch(err => {})
    },
    getFileByOrderId(){
      api.getFileByOrderId({
        orderId: this.detailInfo.id
      }).then(({data}) => {
        if(data.code == 0 && data.message){
          this.files = data.message
          this.files.forEach(item => {
            if(item.fileCategory){
              item.fileName = Files[item.fileCategory]
              item.filepath = api.getImgURL(window.encodeURIComponent(item.filepath))
            }
          })
        }
        else{

        }
      }).catch(err => {})
    },
       downloadFile(data){
                api.downloadFile({filePath:data.householdRegisterUrl}).
                  then((res) => {
                    
                    try{
                      var foo = res.data

                      var fileName = `户口本.png`;
                      openDownloadDialog(foo, fileName)
                      
                    }catch(err){
                      console.log(err)
                    }
                    
                  }).catch((err) => {
                    console.log(err)
                  })
      },
       downloadFile2(data){
                api.downloadFile({filePath:data.idnoBackUrl}).
                  then((res) => {
                    
                    try{
                      var foo = res.data

                      var fileName = `身份证国微面.png`;
                      openDownloadDialog(foo, fileName)
                      
                    }catch(err){
                      console.log(err)
                    }
                    
                  }).catch((err) => {
                    console.log(err)
                  })
      },
        downloadFile3(data){
                api.downloadFile({filePath:data.idnoFrontUrl}).
                  then((res) => {
                    
                    try{
                      var foo = res.data

                      var fileName = `身份证头像面.png`;
                      openDownloadDialog(foo, fileName)
                      
                    }catch(err){
                      console.log(err)
                    }
                    
                  }).catch((err) => {
                    console.log(err)
                  })
      },
        downloadFile4(data){
                api.downloadFile({filePath:data.marriageCertificateUrl}).
                  then((res) => {
                    
                    try{
                      var foo = res.data

                      var fileName = `结婚证.png`;
                      openDownloadDialog(foo, fileName)
                      
                    }catch(err){
                      console.log(err)
                    }
                    
                  }).catch((err) => {
                    console.log(err)
                  })
      },
  },
  created() {
    let str = sessionStorage.getItem('lccOrderInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)

      this.getDetailLcc()
      this.getFileByOrderId()
      this.detailInfo.proServiceCostValueType = this.costValueTypeArr[this.detailInfo.proServiceCostValueType]
      this.detailInfo.proInterestValueType = this.interestTypeArr[this.detailInfo.proInterestValueType]
    }
  },
  mounted() {

  }
}

</script>
<style lang="less" scoped>
.wrap {
  padding: 15px;
  border: solid 1px #ddd;
  margin: 0 20px;

  .tit {
    border-bottom: solid 1px #ddd;
    padding-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }

  .el-row {
    margin-bottom: 30px;
    padding-top: 10px;
  }

  .el-col {
    padding: 10px 0;
    font-size: 13px;

    span {
      display: inline-block;
      width: 100px;
      color: #999;
    }

    b {
      font-weight: normal;
    }
  }
}

.report-item {
  padding: 20px;
}

.report-item .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
}

.report-item .title h3 {
  font-size: 18px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}

.style-h4 {
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
}

// }
.style-table {
  margin-top: 10px;
  width: 600px;
  border-collapse: collapse;

  th {
    font-weight: bold;
    background: #eee;
  }

  td,
  th {
    padding: 5px;
    vertical-align: middle;
    word-break: break-all;
    font-size: 13px;
    height: 30px;
  }

  &.border {
    td,
    th {
      border: solid 1px #ddd;
    }
  }

  &.center {
    width: 100%;
    table-layout: fixed;

    td,
    th {
      text-align: center;
    }
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
.img-box2{
  img{
    width: 24%;
    margin-right: 1%
  }
}
</style>
