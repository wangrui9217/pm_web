<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" v-loading.fullscreen="loading" :showReturn="true">
    <div class="wrap">
      <el-row :gutter="10" class="wrap-header">
        <el-col :span="8">
          <span>客户名称：</span><b>{{detailInfo.compName}}</b>
        </el-col>
        <el-col :span="8">
          <span>申请人姓名：</span><b>{{detailInfo.applyUserName}}</b>
        </el-col>
        <el-col :span="8">
          <span>申请人角色：</span><b>{{roleName}}</b>
        </el-col>
        <el-col :span="8">
          <span>手机号码：</span><b>{{detailInfo.applyUserPhone}}</b>
        </el-col>
        <el-col :span="8">
          <span>身份证号码：</span><b>{{detailInfo.applyUserIdNo}}</b>
        </el-col>
        <el-col :span="8">
          <span></span><b></b>
        </el-col>
        <el-col :span="8">
          <span>执行者：</span><b>{{detailInfo.orderUserRealname}}</b>
        </el-col>
      </el-row>
      <el-form :model="form" ref="form" label-position="left" label-width="240px" size="medium" v-if="!detailInfo.readonly">
        <div class="report-item">
          <h2 class="report-title">贷款信息</h2>
          <el-row :gutter="20" class="input-width">
            <el-col :span="11" v-for="formItem in formArray1" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-if="formItem.type==='select'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-select v-model="form[formItem.field]" :clearable="true">
                  <el-option v-for="opt in formItem.options" :value="opt.value" :label="opt.label" :key="opt.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" :rules="formItem.rule" v-else-if="formItem.type==='input'">
                <el-tooltip effect="light" placement="bottom" >
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                    <!-- <img src="../../../assets/img/example1.png" > -->
                  </div>
                  <img v-if="formItem.content" src="../../../assets/img/tip_icon.png" >
                  <span v-else style="width: 13px;display: inline-block;height: 13px;"></span>
                </el-tooltip>
                <el-input v-model="form[formItem.field]" />
                <span v-if="formItem.unit">{{formItem.unit}}</span>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-else-if="formItem.type==='date'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-date-picker
                  v-model="form[formItem.field]"
                  :editable="false"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <h2 class="report-title">担保信息</h2>
          <el-row :gutter="20" class="input-width">
            <el-col :span="11" v-for="formItem in formArray2" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-if="formItem.type==='select'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-select v-model="form[formItem.field]" :clearable="true">
                  <el-option v-for="opt in formItem.options" :value="opt.value" :label="opt.label" :key="opt.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" :rules="formItem.rule" v-else-if="formItem.type==='input'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-input v-model="form[formItem.field]" />
                <span v-if="formItem.unit">{{formItem.unit}}</span>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-else-if="formItem.type==='date'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-date-picker
                  v-model="form[formItem.field]"
                  :editable="false"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <h2 class="report-title">贷记卡信息</h2>
          <el-row :gutter="20" class="input-width">
            <el-col :span="11" v-for="formItem in formArray3" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-if="formItem.type==='select'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-select v-model="form[formItem.field]" :clearable="true">
                  <el-option v-for="opt in formItem.options" :value="opt.value" :label="opt.label" :key="opt.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" :rules="formItem.rule" v-else-if="formItem.type==='input'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-input v-model="form[formItem.field]" />
                <span v-if="formItem.unit">{{formItem.unit}}</span>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-else-if="formItem.type==='date'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-date-picker
                  v-model="form[formItem.field]"
                  :editable="false"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <h2 class="report-title">征信报告查询记录</h2>
          <el-row :gutter="20" class="input-width">
            <el-col :span="11" v-for="formItem in formArray4" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-if="formItem.type==='select'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-select v-model="form[formItem.field]" :clearable="true">
                  <el-option v-for="opt in formItem.options" :value="opt.value" :label="opt.label" :key="opt.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" :rules="formItem.rule" v-else-if="formItem.type==='input'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-input v-model="form[formItem.field]" />
                <span v-if="formItem.unit">{{formItem.unit}}</span>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-else-if="formItem.type==='date'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-date-picker
                  v-model="form[formItem.field]"
                  :editable="false"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="report-item" v-if="formArray5.length > 0">
          <h2 class="report-title">其他风险信息</h2>
          <el-row :gutter="20" class="input-width">
            <el-col :span="11" v-for="formItem in formArray5" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-if="formItem.type==='select'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-select v-model="form[formItem.field]" :clearable="true">
                  <el-option v-for="opt in formItem.options" :value="opt.value" :label="opt.label" :key="opt.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" :rules="formItem.rule" v-else-if="formItem.type==='input'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-input v-model="form[formItem.field]" />
                <span v-if="formItem.unit">{{formItem.unit}}</span>
              </el-form-item>
              <el-form-item :label="formItem.label + '：'" :prop="formItem.field" v-else-if="formItem.type==='date'">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <div v-html="formItem.content"></div>
                  </div>
                  <img src="../../../assets/img/tip_icon.png" >
                </el-tooltip>
                <el-date-picker
                  v-model="form[formItem.field]"
                  :editable="false"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="style-submit">
          <el-button @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="onSubmit(2)">保存</el-button>
          <el-button type="primary" @click="onSubmit(3)">提交</el-button>
        </div>
      </el-form>
      <div v-else>

        <el-form label-width="240px" label-position="left" size="medium">
          <div class="report-item">
            <!--<el-button type="primary" size="medium" @click="$router.go(-1)" style="float: right;">返回</el-button>-->
            <h2 class="report-title">贷款信息</h2>
            <el-row :gutter="20">
              <el-col :span="11" v-for="formItem in formArray1" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
                <el-form-item :label="formItem.label + '：'">
                  <span>{{formItem.value}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="report-item">
            <h2 class="report-title">担保信息</h2>
            <el-row :gutter="20">
              <el-col :span="11" v-for="formItem in formArray2" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
                <el-form-item :label="formItem.label + '：'">
                  <span>{{formItem.value}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="report-item">
            <h2 class="report-title">贷记卡信息</h2>
            <el-row :gutter="20">
              <el-col :span="11" v-for="formItem in formArray3" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
                <el-form-item :label="formItem.label + '：'">
                  <span>{{formItem.value}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="report-item">
            <h2 class="report-title">征信报告查询记录</h2>
            <el-row :gutter="20">
              <el-col :span="11" v-for="formItem in formArray4" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
                <el-form-item :label="formItem.label + '：'">
                  <span>{{formItem.value}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="report-item" v-if="formArray5.length>0">
            <h2 class="report-title">其他风险信息</h2>
            <el-row :gutter="20">
              <el-col :span="11" v-for="formItem in formArray5" :key="formItem.field" :class="{'long-label':formItem.longLabel}">
                <el-form-item :label="formItem.label + '：'">
                  <span>{{formItem.value}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
       
      </div>
    </div>
  </page-template>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
export default {
  components: { PageTemplate },
  data() {
    let rules = {
      int: { pattern: /^(0|([1-9]\d*))$/, message: '请输入自然数数字' },
      number: { pattern: /^(0|([1-9]\d*))(\.\d+)?$/, message: '请输入非负数字' }
    }
    return {
      loading: false,
      detailInfo: {},
      positionPath: [{ name: '工单管理' }, { name: '个人央行征信录入工单详情' }],
      form: {
        "bcip1": '',
        "bcip10": "",
        "bcip11": "",
        "bcip12": "",
        "bcip13": "",
        "bcip14": '',
        "bcip15": "",
        "bcip16": "",
        "bcip17": "",
        "bcip18": "",
        "bcip19": "",
        "bcip2": "",
        "bcip20": '',
        "bcip21": "",
        "bcip22": "",
        "bcip23": '',
        "bcip24": "",
        "bcip25": "",
        "bcip26": '',
        "bcip27": "",
        "bcip28": "",
        "bcip29": "",
        "bcip3": "",
        "bcip30": "",
        "bcip31": '',
        "bcip32": "",
        "bcip33": "",
        "bcip34": "",
        "bcip35": "",
        "bcip36": "",
        "bcip37": "",
        "bcip38": "",
        "bcip39": "",
        "bcip4": "",
        "bcip40": "",
        "bcip41": "",
        "bcip42": "",
        "bcip43": "",
        "bcip44": "",
        "bcip45": "",
        "bcip46": "",
        "bcip47": "",
        "bcip48": "",
        "bcip5": '',
        "bcip6": "",
        "bcip7": "",
        "bcip8": "",
        "bcip9": "",
        "bcip49": ""
      },
      id: '',
      rules: rules,
      formArray1: [
        {
          type: 'select',
          label:'历史是否有房贷',
          field: 'bcip1',
          content: '个人信用报告 —> 二 信息概要 —>（一）信用提示  —>住房贷款笔数。<br />若住房笔数>0 ，则填写“是”，否则填写“否”',
          options: [
            {label: '是',value: '1'},
            {label: '否',value: '0'}
          ]
        },{
          type: 'input',
          label:'除泗阳农商行历史贷款最高授信额度',
          longLabel: true,
          field: 'bcip2',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别每一笔非泗阳农商行发放的贷款的发放金额 ，取最大值',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'当前贷款余额',
          field: 'bcip3',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要<br /> —>未结清贷款信息汇总 —>余额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'除泗阳农商行当前贷款余额',
          field: 'bcip4',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别除泗阳农商行外发放的每一笔贷款的本金余额',
          unit: '元',
          rule: rules.number
        },{
          type: 'select',
          label:'除泗阳农商行当前贷款五级分类',
          field: 'bcip5',
          // longLabel: true,
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别每一笔除泗阳农商行发放外贷款的五级分类，取五级分类状态最差的（状态良好程度：正常>关注>次级>可疑>损失）',
          options: [
            {label: '正常',value: '1'},
            {label: '关注',value: '2'},
            {label: '次级',value: '3'},
            {label: '可疑',value: '4'},
            {label: '损失',value: '5'}
          ]
        },{
          type: 'input',
          label:'房产月供金额',
          field: 'bcip6',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别贷款种类为住房贷款的或公积金住房贷款的贷款信息的本月应还额，即为房产月供金额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'房产仍需按揭期数',
          field: 'bcip7',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别贷款种类为住房贷款的或公积金住房贷款的贷款信息，取剩余期数。<br />若剩余期数大于36，取做36。否则，取实际数值',
          unit: '期',
          rule: rules.int
        },{
          type: 'input',
          label:'每月应还利息',
          field: 'bcip8',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别贷款种类为住房贷款的或公积金住房贷款的贷款信息，识别其是抵押担保还是保证担保，<br />即为房产月供金额保证类贷款年息7%，抵押类贷款年息5%，月息用年息除以12',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'贷款近12个月最高逾期期数',
          field: 'bcip9',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷款—> <br />以所有有还款记录的贷款为样本，统计12个月的还款记录，若均为N，则填写0，<br />否则填写最大的，如右侧示例，填写2。若客户名下有多笔贷款，填写所有贷款中最大的逾期值',
          unit: '期',
          rule: rules.int
        },{
          type: 'input',
          label:'数字解读',
          field: 'bcip48',
          rule: rules.int
        },{
          type: 'date',
          label:'最早获得个人贷款时间',
          field: 'bcip10',
          content: '个人信用报告 —> 二 信息概要 —>（一）信用提示  —><br />首笔贷款发放月份'
        },{
          type: 'input',
          label:'贷款逾期单月最高逾期总额',
          field: 'bcip11',
          content: '个人信用报告 —> 二 信息概要 —>（二）逾期（透支）信息汇总 —>贷款逾期 —><br />单月最高逾期总额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'未结清贷款信息汇总合同总额',
          field: 'bcip12',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要 —><br />未结清贷款信息汇总 —>合同总额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'贷款近24个月逾期次数',
          field: 'bcip13',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷款—> <br />以还款记录的非按揭贷款为样本，统计24个月的还款记录，若均为N，则填写0，<br />否则统计每一笔非按揭贷款还款记录有数字的数字个数，加总，即为贷款逾期次数',
          unit: '次',
          rule: rules.int
        },{
          type: 'select',
          label:'当前贷款五级分类',
          field: 'bcip14',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款 —><br />识别每一笔贷款的五级分类 ，取五级分类状态最差的<br />（状态良好程度：正常>关注>次级>可疑>损失）',
          options: [
            {label: '正常',value: '1'},
            {label: '关注',value: '2'},
            {label: '次级',value: '3'},
            {label: '可疑',value: '4'},
            {label: '损失',value: '5'}
          ]
        },{
          type: 'input',
          label:'历史贷款逾期最长月份数',
          field: 'bcip15',
          content: '个人信用报告 —> 二 信息概要 —>（二）逾期（透支）信息汇总 <br />—>贷款逾期 —>最长逾期月数',
          unit: '月',
          rule: rules.int
        },{
          type: 'input',
          label:'未结清贷款信息汇总最近6个月平均应还款金额',
          longLabel: true,
          field: 'bcip16',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要<br /> —>未结清贷款信息汇总 —>最近6个月平均应还款',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'贷款当前逾期金额',
          field: 'bcip17',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款<br /> —>当前逾期金额  加总所有贷款的当前逾期金额，即为贷款当前逾期金额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'历史最高贷款额度',
          field: 'bcip18',
          content: '个人信用报告 —> 三 信贷交易信息明细—>（三）贷款<br /> —>识别每一笔贷款的发放金额 ，取最大值',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'未结清贷款笔数',
          field: 'bcip19',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要<br /> —>未结清贷款信息汇总 —>合同总额',
          unit: '笔',
          rule: rules.int
        }
      ],
      formArray2: [
        {
          type: 'select',
          label:'当前是否有对外担保',
          field: 'bcip20',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（六）担保信息<br />—>对外担保信息—> 担保贷款本金余额。若有记录且担保贷款本金余额 >0 ,则填写“是”，否则，填写“否”',
          options: [
            {label: '是',value: '1'},
            {label: '否',value: '0'}
          ]
        },{
          type: 'input',
          label:'对外担保余额',
          field: 'bcip21',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要<br /> —>（六）担保信息—>对外担保信息 —>担保本金余额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'除泗阳农商行对外担保余额',
          field: 'bcip22',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要<br /> —>（六）担保信息—>对外担保信息 —>担保贷款本金余额。<br />寻找除泗阳农商行外的担保信息，将担保贷款本金余额加总',
          unit: '元',
          rule: rules.number
        },{
          type: 'select',
          label:'除泗阳农商行对外担保状态',
          field: 'bcip23',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（六）担保信息—>对外担保信息 <br />—>担保贷款五级分类。选取除泗阳农商行外的担保贷款的信息。<br />若有多笔担保贷款，五级分类选取状态最差的（状态良好程度：正常>关注>次级>可疑>损失）',
          options: [
            {label: '正常',value: '1'},
            {label: '关注',value: '2'},
            {label: '次级',value: '3'},
            {label: '可疑',value: '4'},
            {label: '损失',value: '5'}
          ]
        },{
          type: 'input',
          label:'除泗阳农商行对外担保贷款最高授信额度',
          longLabel: true,
          field: 'bcip24',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（六）担保信息—>对外担保信息 <br />—>担保贷款合同金额。查找除泗阳农商行发放外的担保贷款。<br />若有多笔担保贷款，取合同金额最大值',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'当前对外担保笔数',
          field: 'bcip25',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（六）担保信息<br />—>对外担保信息—> 有多少条担保的记录，就是多少，没有的话，录入0',
          unit: '笔',
          rule: rules.int
        },{
          type: 'select',
          label:'当前对外担保贷款五级分类',
          field: 'bcip26',
          content: '个人信用报告 —> 三 信贷交易信息明细 —><br />（六）担保信息—>对外担保信息 —>担保贷款五级分类。<br />若有多笔担保贷款，五级分类选取状态最差的（状态良好程度：正常>关注>次级>可疑>损失）',
          options: [
            {label: '正常',value: '1'},
            {label: '关注',value: '2'},
            {label: '次级',value: '3'},
            {label: '可疑',value: '4'},
            {label: '损失',value: '5'}
          ]
        }
      ],
      formArray3: [
        {
          type: 'input',
          label:'未销户贷记卡最高额度',
          field: 'bcip27',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—>除泗阳农商行发放的贷记卡的授信额度的最大值（去除已经销户的贷记卡记录）',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'除泗阳农商行贷记卡最高授信额度',
          // longLabel: true,
          field: 'bcip28',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—>贷记卡下的每条记录的授信额度的最大值（去除已经销户的贷记卡记录）',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'个人贷款授信总额度',
          field: 'bcip29',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要<br /> —>未结清贷款信息汇总—>合同总额',
          unit: '元',
          rule: rules.number
        },{
          type: 'input',
          label:'贷记卡授信总额度',
          field: 'bcip30',
          content: '个人信用报告 —> 二 信息概要 —>（三）授信及负债信息概要 <br />—>未销户贷记卡信息汇总—>授信总额',
          unit: '元',
          rule: rules.number
        },{
          type: 'select',
          label:'除泗阳农商行当前贷记卡状态',
          field: 'bcip31',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—>当前逾期期数  取对未销户除泗阳农商行发放的贷记卡下的每条记录的当前逾期期数的最大值，<br />若该值>0，则返回“逾期”，否则，返回“正常”',
          options: [
            {label: '正常',value: '1'},
            {label: '逾期',value: '2'},
          ]
        },{
          type: 'input',
          label:'未销户贷记卡最近6个月额度使用率',
          field: 'bcip32',
          longLabel: true,
          content: '计算公式：最近6个月平均额度/授信总额<br /> 个人信用报告—> 二 信息概要 —>(三) 授信及负债信息概要 <br />—>未销户贷记卡信息汇总—>最近6个月平均使用额度； 个人信用报告—><br /> 二 信息概要 —>(三) 授信及负债信息概要 <br />—>未销户贷记卡信息汇总—>授信总额；',
          rule: rules.number,
          unit: '%',
        },{
          type: 'input',
          label:'额度使用率超过80%的信用卡的张数',
          longLabel: true,
          field: 'bcip33',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—>贷记卡下的每条记录的最近6个月平均使用额度/该记录共享额度。统计占比>0.8的贷记卡数',
          rule: rules.int,
          unit: '张',
        },{
          type: 'input',
          label:'贷记卡当期逾期月数',
          field: 'bcip34',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—>贷记卡下的每条记录的当前逾期期数，若存在多笔贷记卡逾期信息，取所有贷记卡的当前逾期期数的最高值',
          rule: rules.int,
          unit: '月',
        },{
          type: 'input',
          label:'贷记卡逾期单月最高逾期总额',
          field: 'bcip35',
          content: '个人信用报告 —> 二 信息概要 —>（二）逾期及违约信息概要 <br /> —>逾期透支信息汇总 —> 单月最高逾期总额',
          rule: rules.number,
          unit: '元',
        },{
          type: 'date',
          label:'最早获得贷记卡时间',
          field: 'bcip49',
          content: '个人信用报告 —> 二 信息概要 <br />—>（一）信用提示  —>首张贷记卡发卡月份'
        },{
          type: 'input',
          label:'贷记卡近24个月逾期次数',
          field: 'bcip36',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—> 以还款记录的贷记卡为样本，统计24个月的还款记录，若均为N，则填写0，<br />否则统计每一笔贷记卡还款记录有数字的数字个数，加总，即为贷记卡逾期次数',
          rule: rules.int,
          unit: '次',
        },{
          type: 'input',
          label:'按揭贷款近24个月逾期次数',
          field: 'bcip37',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷款<br />—> 以还款记录的按揭贷款为样本，统计24个月的还款记录，若均为N，则填写0，<br />否则统计每一笔按揭还款有还款记录有数字的数字个数，加总，即为按揭还款逾期次数',
          rule: rules.int,
          unit: '次',
        },{
          type: 'input',
          label:'未销户贷记卡账户数',
          field: 'bcip38',
          content: '个人信用报告 —> 二 信息概要 —><br />（一）信用提示  —>贷记卡账户数',
          rule: rules.int,
          unit: '户',
        },{
          type: 'input',
          label:'未销户贷记卡平均额度',
          field: 'bcip39',
          content: '个人信用报告 —> 三 信贷交易信息明细 <br />—>（三）贷记卡—>共享额度  对未销户的贷记卡下的每条记录的共享额度加总，<br />后除以未销户的总贷记卡数，即为未销户卡平均额度（去除已经销户的贷记卡记录）',
          rule: rules.number,
          unit: '元',
        },{
          type: 'input',
          label:'贷记卡当前逾期金额',
          field: 'bcip40',
          content: '个人信用报告 —> 三 信贷交易信息明细 <br />—>（三）贷记卡—>当前逾期金额 <br />对未销户的贷记卡下的每条记录的当前逾期金额进行加总',
          rule: rules.number,
          unit: '元',
        },{
          type: 'input',
          label:'贷记卡历史最长逾期月份数',
          field: 'bcip41',
          content: '个人信用报告 —> 二 信息概要 —>（二）逾期（透支）信息汇总 <br />—>贷记卡逾期 —>最长逾期月数',
          rule: rules.int,
          unit: '月',
        },{
          type: 'input',
          label:'贷记卡近12个月逾期笔数',
          field: 'bcip42',
          content: '个人信用报告 —> 三 信贷交易信息明细 —>（三）贷记卡<br />—> 以所有有还款记录的贷记卡为样本，统计12个月的还款记录，若均为N，则填写0，<br />否则填写最大的，如右侧示例，填写2。<br />若客户名下有多张贷记卡，填写所有贷记卡中最大的逾期值。',
          rule: rules.int,
          unit: '笔',
        },{
          type: 'input',
          label:'未销户贷记卡最近6个月平均使用额度',
          longLabel: true,
          field: 'bcip43',
          content: '个人信用报告—> 二 信息概要 —>(三) 授信及负债信息概要<br /> —>未销户贷记卡信息汇总—>最近6个月平均使用额度',
          rule: rules.number,
          unit: '元',
        }
      ],
      formArray4:[
        {
          type: 'input',
          label:'最近6个月审批原因征信报告次数',
          // longLabel: true,
          field: 'bcip44',
          content: '个人信用报告—>七 查询记录—>信贷审批查询记录明细 <br />加总查询日期在距离当前时间近6个自然月之内的，<br />查询原因为“信用卡审批”或“贷款审批”的次数',
          rule: rules.int,
          unit: '次',
        },{
          type: 'input',
          label:'最近6个月征信报告本人查询次数',
          // longLabel: true,
          field: 'bcip45',
          content: '个人信用报告—>七 查询记录—>信贷审批查询记录明细加总查询<br />日期在距离当前时间近6个自然月之内的，查询原因为“本人查询”的次数',
          rule: rules.int,
          unit: '次',
        },{
          type: 'input',
          label:'最近6个月征信报告查询次数',
          field: 'bcip46',
          content: '个人信用报告—>七 查询记录—>信贷审批查询记录明细<br />加总查询日期在距离当前时间近6个自然月之内查询的次数',
          rule: rules.int,
          unit: '次',
        }
      ],
      formArray5:[
        {
          type: 'input',
          label:'保证人代偿及资产处置笔数',
          field: 'bcip47',
          content: '加总保证人代偿笔数和资产处置笔数：<br />个人信用报告—> 二  信息概要 —>（二）逾期及违约信息概要 —> 资产处置信息汇总—>笔数； <br />个人信用报告—>  二  信息概要 —>（二）逾期及违约信息概要 —> 保证人代偿信息汇总—>笔数',
          rule: rules.int,
          unit: '笔',
        }
      ]
    }
  },
  // computed: {

  // },
  methods: {
    getOrderDetailBciPerson() {
      api.getOrderDetailBciPerson({
        bciOrderId: this.detailInfo.id
      }).then(res => {
        if (res.data.code == 0) {
          let data = res.data.message
          if(data){
            this.id = data.id
            for (let k in this.form) {
              this.form[k] = data[k]?('' + data[k]):''
            }

            // 查看详情时
            if(this.detailInfo.readonly){
              this.getKey_value(this.formArray1)
              this.getKey_value(this.formArray2)
              this.getKey_value(this.formArray3)
              this.getKey_value(this.formArray4)
              this.getKey_value(this.formArray5)
            }
          }

        }
      })
    },
    getKey_value(resource){
      resource.forEach(item => {
        let value = ''
        if(item.type === 'select'){
          
          let obj = item.options.find(v => {return v.value== this.form[item.field]})
          value =  obj?obj.label:'未录入';
        }
        else if(item.type === 'date'){
          value = this.form[item.field].replace('00:00:00','')
          value =  value||'未录入';
        }
        else{
          value = this.form[item.field]?(this.form[item.field] + (item.unit||'')):'未录入'
        }
        this.$set(item, 'value', value) 
      })
    },
    onSubmit(type) {
      
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true;
          let params = Object.assign({
            creditApplyId: this.detailInfo.creditApplyId,
            bciApplyOrderId: this.detailInfo.id,
            compName: this.detailInfo.compName,
            roleName: this.detailInfo.roleName,
            applyNum: this.detailInfo.applyNum,
            applyUserId: this.detailInfo.applyUserId,
            applyUserName: this.detailInfo.applyUserName,
            submitType: type, //  2 保存 3 提交
            id: this.id
          }, this.form)
          api.saveInfoBciPerson(params).then(({ data }) => {
            this.loading = false;
            if (data.code == 0) {
              this.$message.success(data.message)
              this.$router.go(-1)
            } else {
              this.$message.error(data.message)
            }
          }).catch(() => {
            this.loading = false;
          })
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('centralBankOrderInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.roleName = ['未认证角色','法人','法人配偶','自然人股东','企业股东','会计'][this.detailInfo.roleName]
      if(this.roleName !== '法人'){
        this.formArray1 = this.formArray1.splice(0,10)
        this.formArray2 = this.formArray2.splice(0,5)
        this.formArray3 = this.formArray3.splice(0,9)
        this.formArray4 = this.formArray4.splice(0,2)
        this.formArray5 = []
      }
      this.getOrderDetailBciPerson()
    }
  },
  mounted() {

  }
}

</script>
<style lang="less" scoped>
.wrap {
  padding: 15px 15px 60px;
  border: solid 1px #ddd;
  margin: 0 20px;
  min-width: 1200px;

 .wrap-header{
  .el-col{
    padding: 10px;
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
}

.report-item {
  padding: 20px;
  border: solid 1px #949494;
  margin-top: 20px;
  .el-col{
    height: 58px;
    overflow: hidden;
  }
}

.report-item .title {
  padding: 20px 0 10px 0;
  border-bottom: solid 2px #949494;
}

.report-item .title h3 {
  font-size: 16px;
  font-weight: bold;
  color: #0F131A;
  letter-spacing: 0;
  line-height: 16px;
}
.report-title{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}


.input-width {
  .el-input,.el-select {
    width: 200px;
  }
}

.style-submit {
  text-align: center;
  margin-top: 20px;
  .el-button+.el-button {
    margin-left: 100px;
  }
}

</style>
