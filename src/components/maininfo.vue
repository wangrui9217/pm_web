<template>
  <div class="common-list-page caseDetail">
    <div class="padcontent">
      <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;margin-bottom:10px;" class="bcf5">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称: ">
              <span>{{customerbaseinfo.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立时间: " class="marlft20">
              <span>{{customerbaseinfo.establishTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业性质: " class="marlft20">
              <span>{{customerbaseinfo.compNature}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本金(万元): " class="marlft20">
              <span>{{customerbaseinfo.registerAmount/10000}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业注册地址: " class="marlft20">
              <span>{{customerbaseinfo.registerAddress}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="以往营销等级: ">
              <span>{{customerbaseinfo.compRiskLevel}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="营销次数: ">
              <span>{{customerbaseinfo.marketTimes}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行内状态: ">
              <span >{{inBankobj.inBankStatus}}</span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="当前营销等级: ">
              <span >{{inBankobj.level_market}}</span>
            </el-form-item>
          </el-col>
        </el-row>
               <el-row>
          <el-col :span="24">
            <el-form-item label="原因描述: ">
              <span>{{inBankobj.desc_market}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="modelclass">
        <div class="title bcf5"><h3>分析与提示</h3>
        </div>
        <div class="wid90">
          <div class="title"><h3>工商信息</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="changeInfos" highlight-current-row :data="changeInfos">
              <el-table-column prop="changeType" label="变更类型" align="left" />
              <el-table-column prop="contentBefore" label="变更前" align="left" />
              <el-table-column prop="contentAfter" label="变更后" align="left" />
              <el-table-column prop="changeTime" label="变更时间" align="left" />
            </el-table>
          </div>
          <div class="title"><h3>司法信息</h3>
          </div>
          <el-form ref="financeInfoTable" :model="customerbaseinfo" label-width="130px" style="text-align:left;margin-bottom:10px;" class="bcf5">
            <el-row>
              <el-col :span="8">
                <el-form-item label="被告信息条数: ">
                  <span>{{accusedCount}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="被执行标的总额: ">
                  <span>{{execMoney}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="title"><h3>经营信息</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="indexnews" highlight-current-row :data="indexnews">
              <el-table-column prop="title" label="新闻标题" align="left" />
              <el-table-column prop="website" label="来源" align="left" />
              <el-table-column prop="time" label="时间" align="left" />
            </el-table>
          </div>
          <div class="title"><h3>行内信息: <span>{{inBankobj.infoInBank}}</span></h3>
          </div>
        </div>
      </div>
      <div class="modelclass">
        <div class="title bcf5"><h3>营销记录</h3>
        </div>
        <div class="wid90">
          <div class="marketingRecord">
            <el-table ref="marketingRecord" highlight-current-row :data="marketingrecord">
              <el-table-column prop="marketUserRealname" label="客户经理" align="left" width="140" />
              <el-table-column prop="marketTime" label="营销时间" align="left" width="140" />
              <el-table-column prop="businessAddress" label="实际经营地址" align="left" :formatter="el=>subtext(el.businessAddress)" min-width="200px" />
              <el-table-column prop="marketResult" label="营销结果总结" align="left" :formatter="el=>subtext(el.marketResult)" min-width="200px" />
              <el-table-column prop="submitTime" label="提交时间" width="140" align="left" />
              <el-table-column align="left" width="100" label="操作">
                <template slot-scope="scope">
                  <div class="of-hidden actList">
                    <el-button type="text" size="small" @click.native.prevent="gorecordinfo(scope.row)">查看完整记录</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div>
        <div class="title bcf5"><h3>工商信息</h3>
        </div>
        <div class="wid90">
          <div class="title"><h3>基本信息</h3>
          </div>
          <el-form ref="financeInfoTable2" :model="gsbaseinfo" label-width="160px" style="text-align:left;margin-bottom:10px;" class="">
            <el-row>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码: " class="marlft20">
                  <span>{{gsbaseinfo.creditCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营状态: ">
                  <span>{{gsbaseinfo.regStatus}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工商登记机关: " class="marlft20">
                  <span>{{gsbaseinfo.regInstitute}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="行业名称: ">
                  <span>{{gsbaseinfo.industry}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法定代表人: " class="marlft20">
                  <span>{{gsbaseinfo.legalPersonName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="经营开始时间: " class="marlft20">
                  <span>{{gsbaseinfo.fromTime|datetoday}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营结束时间: " class="marlft20">
                  <span>{{gsbaseinfo.toTime|datetoday}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="经营范围: " class="marlft20">
                  <span>{{gsbaseinfo.businessScope}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="title"><h3>股东信息</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="holders" highlight-current-row :data="holders">
              <el-table-column prop="name" label="股东姓名" align="left" />
              <el-table-column label="认缴出资额（万元）" align="left" :formatter="el=>el.capital[0]&&el.capital[0].amomon" />
              <el-table-column label="出资比率" align="left" :formatter="el=>el.capital[0]&&el.capital[0].percent" />
              <el-table-column label="出资时间" align="left" :formatter="el=>el.capital[0]&&el.capital[0].time" />
            </el-table>
          </div>
          <div class="title"><h3>高管信息</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="staffs" highlight-current-row :data="staffs">
              <el-table-column prop="name" label="姓名" align="left" />
              <el-table-column label="职位" align="left" :formatter="el=>el.typeJoin[0]" />
            </el-table>
          </div>
          <div class="title"><h3>对外投资</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="inversts" highlight-current-row :data="inversts">
              <el-table-column prop="name" label="企业名称" align="left" />
              <el-table-column label="法定代表人" align="left" prop="legalPersonName" />
              <el-table-column label="注册资本金（万元）" align="left" prop="regCapital" />
              <el-table-column prop="percent" label="出资比例" align="left" />
              <el-table-column label="成立时间" align="left" prop="estiblishTime" :formatter="el=>moment(+el.estiblishTime).format('YYYY-MM-DD')" />
              <el-table-column prop="regStatus" label="状态" align="left" />
            </el-table>
          </div>
          <div class="title"><h3>分支机构</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="branches" highlight-current-row :data="branches">
              <el-table-column prop="name" label="机构名称" align="left" />
              <el-table-column label="负责人" align="left" prop="legalPersonName" />
              <el-table-column label="注册时间" align="left" prop="estiblishTime" :formatter="el=>moment(+el.estiblishTime).format('YYYY-MM-DD')" />
              <el-table-column prop="regStatus" label="状态" align="left" />
            </el-table>
          </div>
          <div class="title"><h3>关联关系图谱<span style="color: #999" v-if="!(this.companyReleations.nodes&&this.companyReleations.nodes.length)">（暂无数据）</span></h3>
          </div>
          <div id="main4" style="height:600px;width: 1200px;margin: auto; border: solid 1px #ddd; padding: 10px;" v-show="(this.companyReleations.nodes&&this.companyReleations.nodes.length)"></div>
        </div>
        <div class="title bcf5"><h3>司法信息</h3>
        </div>
        <div class="wid90">
          <div class="title"><h3>法院公告</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="courtAnnouncements" highlight-current-row :data="courtAnnouncements">
              <el-table-column label="公告时间" align="left" :formatter="el=>moment(el.publishdate).format('YYYY-MM-DD')" />
              <el-table-column label="上诉方" align="left" prop="party1" />
              <el-table-column label="被诉方" align="left" prop="party2" />
              <el-table-column label="公告类型" align="left" prop="bltntypename" />
              <el-table-column prop="courtcode" label="法院" align="left" />
              <el-table-column label="公告内容" align="left" prop="content" :formatter="el=>el.content.length>20?el.content.substr(0,20)+'...':el.content" />
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="opencont(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="title"><h3>裁判文书</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="lawSuits" highlight-current-row :data="courtWenShus">
              <el-table-column label="案号" align="left" prop="caseno" />
              <el-table-column label="案由" align="left" prop="reason" />
              <el-table-column prop="content" label="裁判文书" align="left" :formatter="el=>el.content.length>20?el.content.substr(0,20)+'...':el.content" />
              <el-table-column label="审结时间" align="left" prop="publishdate" />
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="opencont(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="title"><h3>开庭公告</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="ktannouncements" highlight-current-row :data="ktannouncements">
              <el-table-column label="案号" align="left" prop="court" />
              <el-table-column label="法院名称" align="left" prop="court" />
              <el-table-column label="案由" align="left" prop="caseReason" />
              <el-table-column label="原告" align="left" :formatter="el=>offdh(el,'defendant')" />
              <el-table-column label="被告" align="left" :formatter="el=>offdh(el,'plaintiff')" />
              <el-table-column label="当事人" align="left" prop="litigant" />
              <el-table-column label="开庭日期" align="left" :formatter="el=>moment(+el.startDate).format('YYYY-MM-DD HH:mm:ss')" />
            </el-table>
          </div>
          <div class="title"><h3>执行公告</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="zhixinginfos" highlight-current-row :data="zhixinginfos">
              <el-table-column label="案号" align="left" prop="caseCode" />
              <el-table-column label="法院名称" align="left" prop="execCourtName" />
              <el-table-column label="立案时间" align="left" :formatter="el=>moment(+el.caseCreateTime).format('YYYY-MM-DD')" />
              <el-table-column label="执行标的" align="left" prop="execMoney" />
            </el-table>
          </div>
          <div class="title"><h3>失信公告</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="dishonests" highlight-current-row :data="dishonests">
              <el-table-column label="案号" align="left" prop="casecode" />
              <el-table-column label="执行法院名称" align="left" prop="courtname" />
              <el-table-column label="执行依据文号" align="left" prop="gistid" />
              <el-table-column label="立案时间" align="left" :formatter="el=>moment(+el.regdate).format('YYYY-MM-DD')" />
              <el-table-column label="履行状态" align="left" prop="performance" />
            </el-table>
          </div>
        </div>
        <div class="title bcf5"><h3>上市信息</h3>
        </div>
        <div class="wid90">
          <el-table ref="listedCompanyinfo" highlight-current-row :data="listedCompanyinfo">
            <el-table-column label="证券号码" align="left" prop="bondNum" />
            <el-table-column label="证券简称" align="left" prop="bondName" />
            <el-table-column label="上市板块" align="left" prop="bondType" />
          </el-table>
        </div>
        <div class="title bcf5"><h3>舆情信息</h3>
        </div>
        <div class="wid90">
          <div class="marketingRecord">
            <el-table ref="newsSetarray" highlight-current-row :data="newsSetarray">
              <el-table-column label="信息标题" align="left" prop="title" />
              <el-table-column label="信息来源" align="left" prop="website" />
              <el-table-column label="发布日期" align="left" prop="time" />
            </el-table>
          </div>
        </div>
        <div class="title bcf5"><h3>知识产权信息</h3>
        </div>
        <div class="wid90">
          <div class="title"><h3>商标信息</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="tms" highlight-current-row :data="tms">
              <el-table-column label="名称" align="left" prop="tmName" />
              <el-table-column label="状态" align="left" prop="category" />
              <el-table-column label="申请时间" align="left" :formatter="el=>moment(+el.appDate).format('YYYY-MM-DD')" />
              <el-table-column label="注册号" align="left" prop="regNo" />
              <el-table-column label="国际分类" align="left" prop="intCls" />
            </el-table>
          </div>
          <div class="title"><h3>专利信息</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="patents" highlight-current-row :data="patents">
              <el-table-column label="专利名称" align="left" prop="patentName" />
              <el-table-column label="专利号" align="left" prop="patentNum" />
              <el-table-column label="申请时间" align="left" prop="applicationTime" />
              <el-table-column label="类型" align="left" prop="patentType" />
            </el-table>
          </div>
          <div class="title"><h3>著作权</h3>
          </div>
          <div class="marketingRecord">
            <el-table ref="copyRegs" highlight-current-row :data="copyRegs">
              <el-table-column label="名称" align="left" prop="fullname" />
              <el-table-column label="版本号" align="left" prop="version" />
              <el-table-column label="发布日期" align="left" prop="" :formatter="el=>moment(+el.publishtime).format('YYYY-MM-DD')" />
              <el-table-column label="软件简称" align="left" prop="simplename" />
              <el-table-column label="登记号" align="left" prop="regnum" />
              <el-table-column label="登记批准日期" align="left" :formatter="el=>moment(+el.eventTime).format('YYYY-MM-DD')" />
            </el-table>
          </div>
        </div>
        <div class="title bcf5"><h3>行内信息</h3>
        </div>
        <div class="wid90">
          <div class="title"><h3>企业行内数据报表</h3>
          </div>
          <table cellpadding="0" cellspacing="0" class="tabcenter tabborder" v-if="$route.query.ismange==1">
            <tr>
              <th colspan="3">企业账户</th>
            </tr>
            <tr>
              <td>分类</td>
              <td>指标</td>
              <td>数值</td>
            </tr>
            <tr>
              <td rowspan="2" width='30%'>存款</td>
              <td>存款分类</td>
              <td width='30%'>{{companyAccount.v02}}</td>
            </tr>
            <tr>
              <td>日均存款余额</td>
              <td>{{companyAccount.v03}}</td>
            </tr>
            <tr>
              <td>结算</td>
              <td>销售归行</td>
              <td>{{companyAccount.v04}}</td>
            </tr>
            <tr>
              <td rowspan="8">信贷</td>
              <td>信贷分类</td>
              <td>{{companyAccount.v05}}</td>
            </tr>
            <tr>
              <td>授信额度</td>
              <td>{{companyAccount.v06}}</td>
            </tr>
            <tr>
              <td>授信期限</td>
              <td>{{companyAccount.v07}}</td>
            </tr>
            <tr>
              <td>当前贷款余额</td>
              <td>{{companyAccount.v08}}</td>
            </tr>
            <tr>
              <td>当前信贷到期日</td>
              <td>{{companyAccount.v09}}</td>
            </tr>
            <tr>
              <td>当前贷款状态</td>
              <td>{{companyAccount.v11}}</td>
            </tr>
            <tr>
              <td>当前贷款五级分类</td>
              <td>{{companyAccount.v10}}</td>
            </tr>
            <tr>
              <td>结息状态</td>
              <td>{{companyAccount.v12}}</td>
            </tr>
            <tr>
              <td rowspan="5">担保</td>
              <td>当前担保余额</td>
              <td>{{companyAccount.v13}}</td>
            </tr>
            <tr>
              <td>当前担保户数</td>
              <td>{{companyAccount.v14}}</td>
            </tr>
            <tr>
              <td>单户最大担保余额</td>
              <td>{{companyAccount.v15}}</td>
            </tr>
            <tr>
              <td>当前担保五级分类</td>
              <td>{{companyAccount.v16}}</td>
            </tr>
            <tr>
              <td>历史担保记录</td>
              <td>{{companyAccount.v17}}</td>
            </tr>
            <tr>
              <td>理财</td>
              <td>投资理财日均余额</td>
              <td>{{companyAccount.v18}}</td>
            </tr>
            <tr>
              <td rowspan="4">代发工资</td>
              <td>代发工资</td>
              <td>{{companyAccount.v19}}</td>
            </tr>
            <tr>
              <td>代发工资人数</td>
              <td>{{companyAccount.v20}}</td>
            </tr>
            <tr>
              <td>代发工资月均总额</td>
              <td>{{companyAccount.v21}}</td>
            </tr>
            <tr>
              <td>相关日均存款余额</td>
              <td>{{companyAccount.v22}}</td>
            </tr>
            <tr>
              <td rowspan="3">产品</td>
              <td>代缴电费</td>
              <td>{{companyAccount.v23}}</td>
            </tr>
            <tr>
              <td>代缴水费</td>
              <td>{{companyAccount.v24}}</td>
            </tr>
            <tr>
              <td>企业网银</td>
              <td>{{companyAccount.v25}}</td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" class="tabcenter tabborder" v-if="$route.query.ismange==2">
            <tr>
              <th colspan="3">企业账户</th>
            </tr>
            <tr>
              <td>分类</td>
              <td>指标</td>
              <td>数值</td>
            </tr>
            <tr>
              <td width='30%'>存款</td>
              <td>存款分类</td>
              <td width='30%'>{{companyAccount.v02}}</td>
            </tr>
            <tr>
              <td rowspan="4">信贷</td>
              <td>信贷分类</td>
              <td>{{companyAccount.v05}}</td>
            </tr>
            <tr>
              <td>当前贷款状态</td>
              <td>{{companyAccount.v11}}</td>
            </tr>
            <tr>
              <td>当前贷款五级分类</td>
              <td>{{companyAccount.v10}}</td>
            </tr>
            <tr>
              <td>结息状态</td>
              <td>{{companyAccount.v12}}</td>
            </tr>
            <tr>
              <td rowspan="2">担保</td>
              <td>当前担保五级分类</td>
              <td>{{companyAccount.v16}}</td>
            </tr>
            <tr>
              <td>历史担保记录</td>
              <td>{{companyAccount.v17}}</td>
            </tr>
            <tr>
              <td>代发工资</td>
              <td>代发工资</td>
              <td>{{companyAccount.v19}}</td>
            </tr>
            <tr>
              <td rowspan="3">产品</td>
              <td>代缴电费</td>
              <td>{{companyAccount.v23}}</td>
            </tr>
            <tr>
              <td>代缴水费</td>
              <td>{{companyAccount.v24}}</td>
            </tr>
            <tr>
              <td>企业网银</td>
              <td>{{companyAccount.v25}}</td>
            </tr>
          </table>
          <div class="title"><h3>企业行内数据关联人报表</h3>
          </div>
          <table cellpadding="0" cellspacing="0" class="tabcenter tabborder" v-if="$route.query.ismange==1">
            <tr>
              <th colspan="3">关联人账户（企业版)</th>
            </tr>
            <tr>
              <td rowspan="2" width='30%'>身份</td>
              <td>名称</td>
              <td width='30%'>{{affiliateReportee.v01}}</td>
            </tr>
            <tr>
              <td>与企业关系</td>
              <td>{{affiliateReportee.v02}}</td>
            </tr>
            <tr>
              <td rowspan="2">存款</td>
              <td>存款分类</td>
              <td>{{affiliateReportee.v03}}</td>
            </tr>
            <tr>
              <td>日均存款余额</td>
              <td>{{affiliateReportee.v04}}</td>
            </tr>
            <tr>
              <td rowspan="8">信贷</td>
              <td>信贷分类</td>
              <td>{{affiliateReportee.v06}}</td>
            </tr>
            <tr>
              <td>授信额度</td>
              <td>{{affiliateReportee.v07}}</td>
            </tr>
            <tr>
              <td>授信期限</td>
              <td>{{affiliateReportee.v08}}</td>
            </tr>
            <tr>
              <td>当前贷款余额</td>
              <td>{{affiliateReportee.v09}}</td>
            </tr>
            <tr>
              <td>当前信贷到期日</td>
              <td>{{affiliateReportee.v10}}</td>
            </tr>
            <tr>
              <td>当前贷款状态</td>
              <td>{{affiliateReportee.v12}}</td>
            </tr>
            <tr>
              <td>当前贷款五级分类</td>
              <td>{{affiliateReportee.v11}}</td>
            </tr>
            <tr>
              <td>结息状态</td>
              <td>{{affiliateReportee.v13}}</td>
            </tr>
            <tr>
              <td rowspan="5">担保</td>
              <td>当前担保余额</td>
              <td>{{affiliateReportee.v14}}</td>
            </tr>
            <tr>
              <td>当前担保户数</td>
              <td>{{affiliateReportee.v15}}</td>
            </tr>
            <tr>
              <td>单户最大担保余额</td>
              <td>{{affiliateReportee.v16}}</td>
            </tr>
            <tr>
              <td>当前担保五级分类</td>
              <td>{{affiliateReportee.v17}}</td>
            </tr>
            <tr>
              <td>历史担保记录</td>
              <td>{{affiliateReportee.v18}}</td>
            </tr>
            <tr>
              <td>理财</td>
              <td>投资理财日均余额</td>
              <td>{{affiliateReportee.v19}}</td>
            </tr>
            <tr>
              <td rowspan="4">代发工资</td>
              <td>代发工资</td>
              <td>{{affiliateReportee.v20}}</td>
            </tr>
            <tr>
              <td>代发工资人数</td>
              <td>{{affiliateReportee.v21}}</td>
            </tr>
            <tr>
              <td>代发工资月均总额</td>
              <td>{{affiliateReportee.v22}}</td>
            </tr>
            <tr>
              <td>相关日均存款余额</td>
              <td>{{affiliateReportee.v23}}</td>
            </tr>
            <tr>
              <td rowspan="3">产品</td>
              <td>代缴电费</td>
              <td>{{affiliateReportee.v24}}</td>
            </tr>
            <tr>
              <td>代缴水费</td>
              <td>{{affiliateReportee.v25}}</td>
            </tr>
            <tr>
              <td>企业网银</td>
              <td>{{affiliateReportee.v26}}</td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" class="tabcenter tabborder" v-if="$route.query.ismange==2">
            <tr>
              <th colspan="3">关联人账户（企业版)</th>
            </tr>
            <tr>
              <td rowspan="2" width='30%'>身份</td>
              <td>名称</td>
              <td width='30%'>{{affiliateReportee.v01}}</td>
            </tr>
            <tr>
              <td>与企业关系</td>
              <td>{{affiliateReportee.v02}}</td>
            </tr>
            <tr>
              <td>存款</td>
              <td>存款分类</td>
              <td>{{affiliateReportee.v03}}</td>
            </tr>
            <tr>
              <td rowspan="4">信贷</td>
              <td>存款分类</td>
              <td>{{affiliateReportee.v06}}</td>
            </tr>
            <tr>
              <td>当前贷款五级分类</td>
              <td>{{affiliateReportee.v11}}</td>
            </tr>
            <tr>
              <td>当前贷款状态</td>
              <td>{{affiliateReportee.v12}}</td>
            </tr>
            <tr>
              <td>结息状态</td>
              <td>{{affiliateReportee.v13}}</td>
            </tr>
            <tr>
              <td rowspan="2">担保</td>
              <td>当前担保五级分类</td>
              <td>{{affiliateReportee.v17}}</td>
            </tr>
            <tr>
              <td>历史担保记录</td>
              <td>{{affiliateReportee.v18}}</td>
            </tr>
            <tr>
              <td>代发工资</td>
              <td>代发工资</td>
              <td>{{affiliateReportee.v20}}</td>
            </tr>
            <tr>
              <td rowspan="3">产品</td>
              <td>代缴电费</td>
              <td>{{affiliateReportee.v24}}</td>
            </tr>
            <tr>
              <td>代缴水费</td>
              <td>{{affiliateReportee.v25}}</td>
            </tr>
            <tr>
              <td>企业网银</td>
              <td>{{affiliateReportee.v26}}</td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" class="tabcenter tabborder mart10" v-if="$route.query.ismange==1">
            <tr>
              <th colspan="3">关联人账户（个人版)</th>
            </tr>
            <tr>
              <td rowspan="2" width='30%'>身份</td>
              <td>名称</td>
              <td width='30%'>{{affiliateReportpe.v01}}</td>
            </tr>
            <tr>
              <td>与企业关系</td>
              <td>{{affiliateReportpe.v02}}</td>
            </tr>
            <tr>
              <td rowspan="2">存款</td>
              <td>存款分类</td>
              <td>{{affiliateReportpe.v03}}</td>
            </tr>
            <tr>
              <td>日均存款余额</td>
              <td>{{affiliateReportpe.v04}}</td>
            </tr>
            <tr>
              <td rowspan="8">信贷</td>
              <td>贷款分类</td>
              <td>{{affiliateReportpe.v09}}</td>
            </tr>
            <tr>
              <td>授信额度</td>
              <td>{{affiliateReportpe.v10}}</td>
            </tr>
            <tr>
              <td>授信期限</td>
              <td>{{affiliateReportpe.v11}}</td>
            </tr>
            <tr>
              <td>当前贷款余额</td>
              <td>{{affiliateReportpe.v12}}</td>
            </tr>
            <tr>
              <td>当前信贷到期日</td>
              <td>{{affiliateReportpe.v13}}</td>
            </tr>
            <tr>
              <td>当前贷款状态</td>
              <td>{{affiliateReportpe.v15}}</td>
            </tr>
            <tr>
              <td>当前贷款五级分类</td>
              <td>{{affiliateReportpe.v14}}</td>
            </tr>
            <tr>
              <td>结息状态</td>
              <td>{{affiliateReportpe.v16}}</td>
            </tr>
            <tr>
              <td rowspan="3">担保</td>
              <td>当前担保余额</td>
              <td>{{affiliateReportpe.v17}}</td>
            </tr>
            <tr>
              <td>当前担保五级分类</td>
              <td>{{affiliateReportpe.v18}}</td>
            </tr>
            <tr>
              <td>历史担保记录</td>
              <td>{{affiliateReportpe.v19}}</td>
            </tr>
            <tr>
              <td>理财</td>
              <td>投资理财日均余额</td>
              <td>{{affiliateReportpe.v20}}</td>
            </tr>
            <tr>
              <td rowspan="3">信用卡</td>
              <td>信用卡最高额度</td>
              <td>{{affiliateReportpe.v05}}</td>
            </tr>
            <tr>
              <td>额度使用率</td>
              <td>{{affiliateReportpe.v06}}</td>
            </tr>
            <tr>
              <td>风险提示</td>
              <td>{{affiliateReportpe.v08}}</td>
            </tr>
            <tr>
              <td rowspan="4">产品</td>
              <td>个人网银</td>
              <td>{{affiliateReportpe.v21}}</td>
            </tr>
            <tr>
              <td>手机银行</td>
              <td>{{affiliateReportpe.v22}}</td>
            </tr>
            <tr>
              <td>三方支付绑定</td>
              <td>{{affiliateReportpe.v23}}</td>
            </tr>
            <tr>
              <td>收银宝</td>
              <td>{{affiliateReportpe.v24}}</td>
            </tr>
          </table>
          <table cellpadding="0" cellspacing="0" class="tabcenter tabborder mart10" v-if="$route.query.ismange==2">
            <tr>
              <th colspan="3">关联人账户（个人版)</th>
            </tr>
            <tr>
              <td rowspan="2" width='30%'>身份</td>
              <td>名称</td>
              <td width='30%'>{{affiliateReportpe.v01}}</td>
            </tr>
            <tr>
              <td>与企业关系</td>
              <td>{{affiliateReportpe.v02}}</td>
            </tr>
            <tr>
              <td>存款</td>
              <td>存款分类</td>
              <td>{{affiliateReportpe.v03}}</td>
            </tr>
            <tr>
              <td rowspan="4">信贷</td>
              <td>信贷分类</td>
              <td>{{affiliateReportpe.v09}}</td>
            </tr>
            <tr>
              <td>当前贷款五级分类</td>
              <td>{{affiliateReportpe.v14}}</td>
            </tr>
            <tr>
              <td>当前贷款状态</td>
              <td>{{affiliateReportpe.v15}}</td>
            </tr>
            <tr>
              <td>结息状态</td>
              <td>{{affiliateReportpe.v16}}</td>
            </tr>
            <tr>
              <td rowspan="2">担保</td>
              <td>当前担保五级分类</td>
              <td>{{affiliateReportpe.v18}}</td>
            </tr>
            <tr>
              <td>历史担保记录</td>
              <td>{{affiliateReportpe.v19}}</td>
            </tr>
            <tr>
              <td rowspan="3">信用卡</td>
              <td>信用卡最高额度</td>
              <td>{{affiliateReportpe.v05}}</td>
            </tr>
            <tr>
              <td>额度使用率</td>
              <td>{{affiliateReportpe.v06}}</td>
            </tr>
            <tr>
              <td>风险提示</td>
              <td>{{affiliateReportpe.v08}}</td>
            </tr>
            <tr>
              <td rowspan="4">产品</td>
              <td>个人网银</td>
              <td>{{affiliateReportpe.v21}}</td>
            </tr>
            <tr>
              <td>手机银行</td>
              <td>{{affiliateReportpe.v22}}</td>
            </tr>
            <tr>
              <td>三方支付绑定</td>
              <td>{{affiliateReportpe.v23}}</td>
            </tr>
            <tr>
              <td>收银宝</td>
              <td>{{affiliateReportpe.v24}}</td>
            </tr>
          </table>
        </div>
        <div class="title bcf5"><h3>企业担保圈</h3>
        </div>
        <div class="wid90">
          <div class="title">
            <h3>关系图谱
                                          <span style="color: #999" v-if="!(this.guarantee.nodes&&this.guarantee.nodes.length)">（暂无数据）</span>
                                        </h3>
          </div>
          <div id="main" style="height:600px;width: 1200px;margin: auto; border: solid 1px #ddd; padding: 10px;" v-show="(this.guarantee.nodes&&this.guarantee.nodes.length)"></div>
        </div>
        <div class="title bcf5"><h3>行业交易圈</h3>
        </div>
        <div class="wid90">
          <div class="title"><h3>
                                      关系图谱
                                      <span style="color: #999" v-if="!(this.bank.nodes&&this.bank.nodes.length)">（暂无数据）</span>
                                    </h3>
          </div>
          <div id="main2" style="height:600px;width: 1200px;margin: auto; border: solid 1px #ddd; padding: 10px;" v-show="(this.bank.nodes&&this.bank.nodes.length)"></div>
        </div>
        <div class="title bcf5"><h3>相关人关系</h3>
        </div>
        <div class="wid90">
          <div class="title">
            <h3>关系图谱
                                         <span style="color: #999" v-if="!(this.people.nodes&&this.people.nodes.length)">（暂无数据）</span>
                                     </h3>
          </div>
          <div id="main3" style="height:600px;width: 1200px;margin: auto; border: solid 1px #ddd; padding: 10px;" v-show="(this.people.nodes&&this.people.nodes.length)"></div>
        </div>
      </div>
    </div>
    <el-dialog title="内容" :visible.sync="opencontshow" width="30%">
      <span>{{opencontinfo}}</span>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="opencontshow = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import '@/less/data-list.less'
import api from '@/api-authority'
import { baseURLDownloads } from '../api-authority/config.js'
import { subtext } from '@/utils/st.js'
import moment from "moment"



export default {
  name: 'personinfo-list',
  data() {
    return {
      moment: moment,
      opencontinfo: '',
      opencontshow: false,
      subtext: subtext,
      id: this.$route.query.id,
      baseURLDownloads: baseURLDownloads,
      customerbaseinfo: {},
      marketingrecord: [],
      gsbaseinfo: {}, //工商信息开始
      holders: [],
      staffs: [],
      inversts: [],
      branches: [],
      companyReleations: {}, //关联关系图谱
      courtAnnouncements: [], //司法记录开始
      lawSuits: [],
      ktannouncements: [],
      zhixinginfos: [],
      courtWenShus: [],
      dishonests: [], //司法记录结束
      listedCompanyinfo: [], //上市信息
      newsSetarray: [], //舆情列表信息
      tms: [], //知识产权开始
      patents: [],
      copyRegs: [], //知识产权结束
      guarantee: [], //企业关系圈
      bank: [], //行业关系圈
      people: [], // 相关人关系,
      changeInfos: [], //分析与提示  工商信息
      accusedCount: '', //被告信息条数
      execMoney: '', //被执行标的总额
      indexnews: [], //经营信息
      companyAccount: {}, //行内信息 企业行内数据报表   企业名录
      affiliateReportee: {}, //行内信息    企业行内数据关联人报表   企业版本
      affiliateReportpe: {}, //个人版本
      inBankobj: { //行内状态 信息
        inBankStatus: '',
        infoInBank: '',
        level_market:'',
        desc_market:''
      },
      loadindex: 0,
      loading: ''
    }
  },
  watch: {
    loadindex: {
      handler(newName, oldName) {
        //当前有9个接口  掉数据 所以是9 
        if (newName == 9) {
          this.loading.close()
        }

      },

    }
  },
  props: {

    creditif: {
      type: Boolean,
      default () {
        return false
      }
    },



  },
  computed: {
  },
  methods: {
    closefn() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //如果有接口太慢 等待最长20秒 关闭loading
      var timer = 0;
      var closetimer = setInterval(el => {
        timer++
        if (timer == 20) {
          this.loading.close()
          clearInterval(closetimer)
        }
      }, 1000)

    },
    opencont(data) {
      this.opencontshow = true
      this.opencontinfo = data.content
    },
    offdh(data, sa) {
      var str = ''
      data[sa].map((el, index) => {
        if (data[sa].length - 1 == index) {
          str += el.name
        } else {
          str += el.name + ','
        }
      })
      return str
    },
    loanindexfn() {

      api.loanindex({ id: this.id }).
      then((res) => {
        this.loadindex++
        if (res.data.code == '0') {
          this.changeInfos = res.data.message.changeInfos || []
          this.accusedCount = res.data.message.accusedCount
          this.execMoney = res.data.message.execMoney
          this.indexnews = res.data.message.news || []

        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })

    },
    getQjBankInfoAdmin() {
      api.getQjBankInfoAdmin({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          this.companyAccount = res.data.message.companyAccount
          if (Object.keys(res.data.message.affiliateReport).length) {
            this.affiliateReportee = res.data.message.affiliateReport.ee || {}
            this.affiliateReportpe = res.data.message.affiliateReport.pe || {}
          }

          this.inBankobj.inBankStatus = res.data.message.inBankStatus
          this.inBankobj.infoInBank = res.data.message.infoInBank
          this.inBankobj.desc_market=res.data.message.desc_market
     
          switch (res.data.message.level_market) {
    
            case 'a':
              this.inBankobj.level_market='红'
              break;
          
           case 'b':
              this.inBankobj.level_market='白'
              break;
           case 'c':
              this.inBankobj.level_market='灰'
              break;
           case 'd':
              this.inBankobj.level_market='黑'
              break;
            default:
            this.inBankobj.level_market='其他'
              break;
          }


        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })

    },
    getQjBankInfoCustomer() {
      api.getQjBankInfoCustomer({ id: this.id }).
      then((res) => {
        this.loadindex++
 
        if (res.data.code == '0') {
          this.companyAccount = res.data.message.companyAccount
          this.affiliateReportee = res.data.message.affiliateReport.ee || {}
          this.affiliateReportpe = res.data.message.affiliateReport.pe || {}
          this.inBankobj.inBankStatus = res.data.message.inBankStatus
          this.inBankobj.infoInBank = res.data.message.infoInBank
        this.inBankobj.desc_market=res.data.message.desc_market
     
          switch (res.data.message.level_market) {
    
            case 'a':
              this.inBankobj.level_market='红'
              break;
          
           case 'b':
              this.inBankobj.level_market='白'
              break;
           case 'c':
              this.inBankobj.level_market='灰'
              break;
           case 'd':
              this.inBankobj.level_market='黑'
              break;
            default:
            this.inBankobj.level_market='其他'
              break;
          }



        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })

    },


    marketDetal() {
      console.log(this.$route, 222)
      // var id='';
      // if(this.$route.query.detaid){
      //     id=this.$route.query.detaid
      // }else{
      //     id=this.$route.query.id
      // }
      api.companydetail({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          this.customerbaseinfo = res.data.message.company || { name: '', }
          this.marketingrecord = res.data.message.recordLists
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    baseinfoSet() {
      api.baseinfoSet({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          var myChart4 = echarts.init(document.getElementById("main4"));

          this.gsbaseinfo = res.data.message.baseInfo
          this.holders = res.data.message.holders
          this.staffs = res.data.message.staffs
          this.inversts = res.data.message.inversts
          this.branches = res.data.message.branches
          //关联关系图谱
          let diagram = res.data.message.companyReleations
          this.companyReleations = diagram
          var labels = []
          var nodes = diagram.nodes.map(el => {
            labels.push(el.labels[0])
            return {
              name: el.id,
              label: el.properties.name,
              category: el.labels[0],
              value: 1
            }
          })
          var links = diagram.relationships.map(el => {
            return {
              source: el.startNode,
              target: el.endNode,
              name: el.properties.labels[0],
              weight: 1
            }
          })
          labels = Array.from(new Set(labels))
          var labelsname = []
          labels.map(el => {
            labelsname.push({ name: el })
          })
          nodes.forEach(item => {
            item.category = labels.indexOf(item.category)
          })
          //                     this.companyReleations=res.data.message.companyReleations
          //                     var labels=[]    
          //                                 var nodes=this.companyReleations.nodes.map(el=>{
          //                                     labels.push(el.labels[0])
          //                                 return {
          //                                     id:el.id,
          //                                     label:{show:true},
          //                                     name:el.properties.name,
          //                                     draggable: true,
          //                                     symbolSize:20,
          //                                     category:el.labels[0]
          //                                     }
          //                                 }) 
          //                                 var links=this.companyReleations.relationships.map(el=>{
          //                                     return {
          //                                         source:el.endNode,
          //                                         target:el.startNode,
          //                                         label: {
          //                                             normal: {
          //                                             show: true,
          //                                             formatter:el.properties.labels.join(',')
          //                                             }
          //                                             },

          //                                     }
          //                                 })
          //                         labels=Array.from(new Set(labels))  
          //                         var labelsname=[]
          //                           labels.map(el=>{
          //       labelsname.push({name:el})

          //   })
          myChart4.setOption({

            tooltip: {
              trigger: 'item',
              formatter: '{b}'
            },
            legend: {
              data: labels,
              x: 'center'
            },
            series: [{
              name: '企业关联图谱',
              type: 'force',
              symbolSize: 10,
              nodes: nodes,
              links: links,
              categories: labelsname,
              roam: 'move',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    textStyle: {
                      color: '#333'
                    }
                  },
                  nodeStyle: {
                    brushType: 'both',
                    borderColor: 'rgba(255,215,0,0.4)',
                    borderWidth: 1
                  },
                  linkStyle: {
                    type: 'curve'
                  }
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              useWorker: false,
              minRadius: 15,
              maxRadius: 25,
              gravity: 1.1,
              scaling: 1.1,
            }]
          });
          //   var option = {
          //     title: {
          //         text: ''
          //     },
          //     tooltip: {},
          //     animationDurationUpdate: 1500,
          //     animationEasingUpdate: 'quinticInOut',
          //     label: {
          //         normal: {
          //             show: true,
          //             textStyle: {
          //                 fontSize: 12
          //             },
          //         }
          //     },
          //          legend: {
          //                data:labels,
          //                   x: 'center'        
          //          },
          //     series: [

          //         {
          //             type: 'graph',
          //             layout: 'force',
          //             edgeSymbol: ['arrow'],
          //             symbolSize: 30,
          //             focusNodeAdjacency: true,
          //             roam: 'move',
          //             categories:labelsname,
          //             label: {
          //                 normal: {
          //                     show: true,
          //                     textStyle: {
          //                         fontSize: 12
          //                     },
          //                 }
          //             },
          //             force: {
          //                 repulsion: 1000
          //             },
          //             edgeSymbolSize: [4, 50],
          //             edgeLabel: {
          //                 normal: {
          //                     show: true,
          //                     textStyle: {
          //                         fontSize: 10
          //                     },
          //                     formatter: "{c}"
          //                 }
          //             },
          //             data:nodes,
          //             links:links,
          //             lineStyle: {
          //                 normal: {
          //                     opacity: 0.9,
          //                     width: 1,
          //                     curveness: 0
          //                 }
          //             }
          //         }
          //     ]
          // };
          //myChart4.setOption(option)




        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    judicialSet() {
      api.judicialSet({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          this.courtAnnouncements = res.data.message.courtAnnouncements
          this.lawSuits = res.data.message.lawSuits
          this.ktannouncements = res.data.message.ktannouncements
          this.zhixinginfos = res.data.message.zhixinginfos
          this.dishonests = res.data.message.dishonests
          this.courtWenShus = res.data.message.courtWenShus
          console.log(this.courtAnnouncements)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    listedCompany() {
      api.listedCompany({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          this.listedCompanyinfo.push(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    newsSet() {
      api.newsSet({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          this.newsSetarray = res.data.message
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    knowleageList() {
      api.knowleageList({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {
          this.tms = res.data.message.tms
          this.patents = res.data.message.patents
          this.copyRegs = res.data.message.copyRegs
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    businessRelation() {
      api.businessRelation({ id: this.id }).
      then((res) => {
        this.loadindex++

        if (res.data.code == '0') {

          this.guarantee = res.data.message.guarantee
          this.bank = res.data.message.bank
          this.people = res.data.message.people
          var myChart = echarts.init(document.getElementById("main"));
          var myChart2 = echarts.init(document.getElementById("main2"));
          var myChart3 = echarts.init(document.getElementById("main3"));
          if (this.guarantee.nodes && this.guarantee.nodes.length) {
            let diagram = this.guarantee

            var labels = []
            var nodes = diagram.nodes.map(el => {
              labels.push(el.labels[0])
              return {
                name: el.id,
                label: el.properties.customername,
                category: el.labels[0],
                value: 1
              }
            })
            var links = diagram.relationships.map(el => {
              return {
                source: el.startNode,
                target: el.endNode,
                name: el.properties.labels[0],
                weight: 1
              }
            })
            labels = Array.from(new Set(labels))
            var labelsname = []
            labels.map(el => {
              labelsname.push({ name: el })
            })

            nodes.forEach(item => {
              item.category = labels.indexOf(item.category)
            })


            myChart.setOption({

              tooltip: {
                trigger: 'item',
                formatter: '{b}'
              },
              legend: {
                data: labels,
                x: 'center'
              },
              series: [{
                name: '企业关联图谱',
                type: 'force',
                symbolSize: 10,
                nodes: nodes,
                links: links,
                categories: labelsname,
                roam: 'move',
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      textStyle: {
                        color: '#333'
                      }
                    },
                    nodeStyle: {
                      brushType: 'both',
                      borderColor: 'rgba(255,215,0,0.4)',
                      borderWidth: 1
                    },
                    linkStyle: {
                      type: 'curve'
                    }
                  },
                  emphasis: {
                    label: {
                      show: true
                    }
                  }
                },
                useWorker: false,
                minRadius: 15,
                maxRadius: 25,
                gravity: 1.1,
                scaling: 3,
              }]
            });



          }

          if (this.bank.nodes && this.bank.nodes.length) {
            let diagram2 = this.bank

            var labels2 = []
            var nodes2 = diagram2.nodes.map(el => {
              labels2.push(el.labels[0])
              return {
                name: el.id,
                label: el.properties.name,
                category: el.labels[0],
                value: 1
              }
            })
            var links2 = diagram2.relationships.map(el => {
              return {
                source: el.startNode,
                target: el.endNode,
                name: el.properties.labels[0],
                weight: 1
              }
            })
            labels2 = Array.from(new Set(labels2))
            var labelsname2 = []
            labels2.map(el => {
              labelsname2.push({ name: el })
            })

            nodes2.forEach(item => {
              item.category = labels2.indexOf(item.category)
            })
            console.log(labels2, labelsname2, nodes2, links2)

            myChart2.setOption({

              tooltip: {
                trigger: 'axis',
                formatter: '{b}'
              },
              legend: {
                data: labels2,
                x: 'center'
              },
              series: [{
                name: '企业关联图谱',
                type: 'force',
                symbolSize: 10,
                nodes: nodes2,
                links: links2,
                categories: labelsname2,
                roam: true,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      textStyle: {
                        color: '#333'
                      }
                    },
                    nodeStyle: {
                      brushType: 'both',
                      borderColor: 'rgba(255,215,0,0.4)',
                      borderWidth: 1
                    },
                    linkStyle: {
                      type: 'curve'
                    }
                  },
                  emphasis: {
                    label: {
                      show: true
                    }
                  }
                },
                useWorker: false,
                minRadius: 15,
                maxRadius: 25,
                gravity: 1.1,
                scaling: 5,
              }]
            });






          }

          if (this.people.nodes && this.people.nodes.length) {


            let diagram3 = this.people

            var labels3 = []
            var nodes3 = diagram3.nodes.map(el => {
              labels3.push(el.labels[0])
              return {
                name: el.id,
                label: el.properties.customername,
                category: el.labels[0],
                value: 1
              }
            })
            var links3 = diagram3.relationships.map(el => {
              return {
                source: el.startNode,
                target: el.endNode,
                name: el.properties.labels[0],
                weight: 1
              }
            })
            labels3 = Array.from(new Set(labels3))
            var labelsname3 = []
            labels3.map(el => {
              labelsname3.push({ name: el })
            })

            nodes3.forEach(item => {
              item.category = labels3.indexOf(item.category)
            })


            myChart3.setOption({

              tooltip: {
                trigger: 'item',
                formatter: '{b}'
              },
              legend: {
                data: labels3,
                x: 'center'
              },
              series: [{
                name: '企业关联图谱',
                type: 'force',
                symbolSize: 10,
                nodes: nodes3,
                links: links3,
                categories: labelsname3,
                roam: 'move',
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      textStyle: {
                        color: '#333'
                      }
                    },
                    nodeStyle: {
                      brushType: 'both',
                      borderColor: 'rgba(255,215,0,0.4)',
                      borderWidth: 1
                    },
                    linkStyle: {
                      type: 'curve'
                    }
                  },
                  emphasis: {
                    label: {
                      show: true
                    }
                  }
                },
                useWorker: false,
                minRadius: 15,
                maxRadius: 25,
                gravity: 1.1,
                scaling: 3,
              }]
            });

          }

        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.loadindex++

        console.log(err)
      })
    },
    gorecordinfo(id) {
      this.$router.push({ name: '营销记录详情', query: { id: id.id } })
    }


  },
  created() {
    this.marketDetal()
    this.baseinfoSet()
    this.judicialSet()
    this.listedCompany()
    this.newsSet()
    this.knowleageList()
    this.businessRelation()
    this.loanindexfn()
    if (this.$route.query.ismange == 1) {
      this.getQjBankInfoAdmin() //行内信息管理者版本

    } else if (this.$route.query.ismange == 2) {
      this.getQjBankInfoCustomer()
    }
    this.closefn()

  },
  mounted() {
    //  this.echartinit()
  }
}

</script>
<style lang="less">
.clear {
  clear: both;
  height: 0;
  line-height: 0;
  font-size: 0
}

.bcf5 {
  background: #f5f5f5;
}

.common-list-page.caseDetail {
  padding: 0 0px 62px;
}

.spaceheight {
  background: #fff;
  height: 10px;
}

.padcontent {
  margin: 0 1%;


  .el-form-item {
    margin-bottom: 0;
  }

  .el-table th,
  .el-table td {
    padding: 4px 0;
  }

  .marketingRecord {
    max-height: 400px;
    overflow-y: scroll;
  }

  .el-form-item__label {
    font-weight: bold;
    color: #0F131A;
  }


  .el-table tr {
    background: #fff;

    th {
      background: #f9f9f9;

    }
  }

  .wid90 {
    width: 98%;
    margin-left: 1%;
  }

  .mart10 {
    margin-top: 10px;
  }


}

/*详情内容*/
.common-list-page.caseDetail .title {
  padding: 0 32px;
  height: 32px;
  margin: 10px 0;
}

.common-list-page.caseDetail .title h3 {
  font-size: 12px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 32px;

  span {
    font-weight: 400;
    color: #383838;
  }
}

.common-list-page.caseDetail .line {
  width: 100%;
  height: 2px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.tabcenter {
  width: 100%;
  border-collapse: collapse;

  tr {

    th,
    td {
      text-align: center;
      height: 28px;
    }
  }
}

.tabborder {
  table-layout: fixed;

  th,
  td {
    border: 1px solid #999;
  }
}

.modelclass {
  .title.bcf5 {
    padding: 20px 0 10px 0;
    height: auto;

    h3 {
      font-size: 22px;
    }
  }

  .wid90 {
    .title {
      border-bottom: solid 2px #949494;

      h3 {
        font-size: 18px;
      }
    }

  }
}

</style>
