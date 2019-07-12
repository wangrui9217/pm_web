<template>
  <page-template :position-path="positionPath" :toolTitle="true" pageTitle="" v-loading.fullscreen="loading" :showReturn="true">
    <div class="wrap">
      <el-row :gutter="10">
        <el-col :span="8">
          <span>客户名称：</span><b>{{detailInfo.compName}}</b>
        </el-col>
        <el-col :span="8">
          <span>申请人姓名：</span><b>{{detailInfo.applyUserName}}</b>
        </el-col>
        <el-col :span="8">
          <span>手机号码：</span><b>{{detailInfo.applyUserPhone}}</b>
        </el-col>
        <el-col :span="8">
          <span>注册地址：</span><b>{{detailInfo.roleCompRegisterAddr}}</b>
        </el-col>
        <el-col :span="8">
          <span>执行者：</span><b>{{detailInfo.orderUserRealname}}</b>
        </el-col>
      </el-row>
      <el-form :model="form" ref="form" label-position="left" :inline="true" v-if="!detailInfo.readonly">
        <div class="report-item">
          <h2 class="report-title">企业当前信贷记录</h2>
          <div class="title"><h3>贷款五级分类</h3>
          </div>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr style="height: 40px;">
              <th colspan="2">正常</th>
              <th colspan="2">关注</th>
              <th colspan="2">不良/违约</th>
            </tr>
            <tr>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
            </tr>
            <tr>
              <td>
                <el-form-item prop="bci1" :rules="rules.number">
                  <el-input size="small" v-model="form.bci1" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci2" :rules="rules.number">
                  <el-input size="small" v-model="form.bci2" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci3" :rules="rules.number">
                  <el-input size="small" v-model="form.bci3" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci4" :rules="rules.number">
                  <el-input size="small" v-model="form.bci4" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci5" :rules="rules.number">
                  <el-input size="small" v-model="form.bci5" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci6" :rules="rules.number">
                  <el-input size="small" v-model="form.bci6" />
                </el-form-item>
              </td>
            </tr>
          </table>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              <el-form-item label="正常还款次数" label-width="130px" prop="bci22" :rules="{ pattern: /^(0|([1-9]\d*))$/, message: '请输入整数数字' }">
                <el-input size="small" v-model="form.bci22" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单家最高额度(元)" label-width="130px" prop="bci18" :rules="rules.number">
                <el-input size="small" v-model="form.bci18" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最近一次贷款到期日" label-width="140px">
                <el-date-picker
                  v-model="form.bci20"
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
          <div class="report-title">企业历史信贷记录</div>
          <div class="title"><h3>贷款五级分类</h3>
          </div>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr style="height: 40px;">
              <th colspan="2">正常</th>
              <th colspan="2">关注</th>
              <th colspan="2">不良/违约</th>
            </tr>
            <tr>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
            </tr>
            <tr>
              <td>
                <el-form-item prop="bci7" :rules="rules.number">
                  <el-input size="small" v-model="form.bci7" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci8" :rules="rules.number">
                  <el-input size="small" v-model="form.bci8" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci9" :rules="rules.number">
                  <el-input size="small" v-model="form.bci9" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci10" :rules="rules.number">
                  <el-input size="small" v-model="form.bci10" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci11" :rules="rules.number">
                  <el-input size="small" v-model="form.bci11" />
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="bci12" :rules="rules.number">
                  <el-input size="small" v-model="form.bci12" />
                </el-form-item>
              </td>
            </tr>
          </table>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              <el-form-item label="首次信贷记录距今" label-width="130px" prop="bci17" :rules="rules.number">
                <el-input size="small" v-model="form.bci17" /><i style="padding-left: 5px;">年</i>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单家最高额度(元)" label-width="130px" prop="bci19" :rules="rules.number">
                <el-input size="small" v-model="form.bci19" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最近一次贷款到期日" label-width="140px">
                <el-date-picker
                  v-model="form.bci21"
                  type="date"
                  :editable="false"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <div class="report-title">对外担保业务余额</div>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              <el-form-item label="正常(元)" label-width="130px" prop="bci14" :rules="rules.number">
                <el-input size="small" v-model="form.bci14" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关注(元)" label-width="140px" prop="bci15" :rules="rules.number">
                <el-input size="small" v-model="form.bci15" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="不良(元)" label-width="140px" prop="bci16" :rules="rules.number">
                <el-input size="small" v-model="form.bci16" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <div class="report-title">综合</div>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              <el-form-item label="未结清欠息余额(元)" label-width="140px" prop="bci13" :rules="rules.number">
                <el-input size="small" v-model="form.bci13" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="正常还款次数" label-width="140px" prop="bci24" :rules="{ pattern: /^(0|([1-9]\d*))$/, message: '请输入整数数字' }">
                <el-input size="small" v-model="form.bci24" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="获取授信最初年份" label-width="140px" >
                <el-date-picker
                  v-model="form.bci23"
                  type="year"
                  :editable="false"
                  value-format="yyyy"
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
        <div class="report-item">
          <!--<el-button type="primary" size="medium" @click="$router.go(-1)" style="float: right;">返回</el-button>-->
          <h2 class="report-title">企业当前信贷记录</h2>
          <div class="title"><h3>贷款五级分类</h3>
          </div>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr style="height: 40px;">
              <th colspan="2">正常</th>
              <th colspan="2">关注</th>
              <th colspan="2">不良/违约</th>
            </tr>
            <tr>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
             
              <td>笔数</td>
              <td>余额(元)</td>
            
            </tr>
            <tr>
              <td>
                {{form.bci1}}
              </td>
              <td>
                {{form.bci2}}
              </td>
              <td>
                {{form.bci3}}
              </td>
              <td>
                {{form.bci4}}
              </td>
              <td>
                {{form.bci5}}
              </td>
              <td>
                {{form.bci6}}
              </td>
            </tr>
          </table>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              正常还款次数：<i>{{form.bci22}}</i>
            </el-col>
            <el-col :span="8">
              单家最高额度(元)：<i>{{form.bci18}}</i>
            </el-col>
            <el-col :span="8">
              最近一次贷款到期日：<i>{{form.bci20&&form.bci20.split(' ')[0]}}</i>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <div class="report-title">企业历史信贷记录</div>
          <div class="title"><h3>贷款五级分类</h3>
          </div>
          <table class="style-table border center" cellpadding="0" cellspacing="0">
            <tr style="height: 40px;">
              <th colspan="2">正常</th>
              <th colspan="2">关注</th>
              <th colspan="2">不良/违约</th>
            </tr>
            <tr>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
              <td>笔数</td>
              <td>余额(元)</td>
            </tr>
            <tr>
              <td>
                {{form.bci7}}
              </td>
              <td>
                {{form.bci8}}
              </td>
              <td>
                {{form.bci9}}
              </td>
              <td>
                {{form.bci10}}
              </td>
              <td>
                {{form.bci11}}
              </td>
              <td>
                {{form.bci12}}
              </td>
            </tr>
          </table>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              首次信贷记录距今(年)：<i>{{form.bci17}}</i>
            </el-col>
            <el-col :span="8">
              单家最高额度(元)：<i>{{form.bci19}}</i>
            </el-col>
            <el-col :span="8">
              最近一次贷款到期日：<i>{{form.bci21&&form.bci21.split(' ')[0]}}</i>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <div class="report-title">对外担保业务余额</div>
          
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">
              正常(元)：<i>{{form.bci14}}</i>
            </el-col>
            <el-col :span="8">
              关注(元)：<i>{{form.bci15}}</i>
            </el-col>
            <el-col :span="8">
              不良(元)：<i>{{form.bci16}}</i>
            </el-col>
          </el-row>
        </div>
        <div class="report-item">
          <div class="report-title">综合</div>
          <el-row :gutter="2" class="input-width">
            <el-col :span="8">未结清欠息余额(元)：<i>{{form.bci13}}</i>
              
            </el-col>
            <el-col :span="8">正常还款次数：<i>{{form.bci24}}</i>
            </el-col>
            <el-col :span="8">
              获取授信最初年份：<i>{{form.bci23}}</i>
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
export default {
  components: { PageTemplate },
  data() {
    return {
      loading: false,
      detailInfo: {},
      positionPath: [{ name: '工单管理' }, { name: '企业央行征信录入工单详情' }],
      form: {
        "bci1": "",
        "bci10": "",
        "bci11": "",
        "bci12": "",
        "bci13": "",
        "bci14": "",
        "bci15": "",
        "bci16": "",
        "bci17": "",
        "bci18": "",
        "bci19": "",
        "bci2": "",
        "bci20": "",
        "bci21": "",
        "bci22": "",
        "bci23": "",
        "bci3": "",
        "bci4": "",
        "bci5": "",
        "bci6": "",
        "bci7": "",
        "bci8": "",
        "bci9": "",
        "bci24": ""
      },
      id: '',
      rules: {
        number: { pattern: /^(0|([1-9]\d*))(\.\d+)?$/, message: '请输入数字' }
      }
    }
  },
  computed: {

  },
  methods: {
    getOrderDetailBciApply() {
      api.getOrderDetailBciApply({
        bciOrderId: this.detailInfo.id
      }).then(res => {
        if (res.data.code == 0) {
          let data = res.data.message
          if(this.detailInfo.readonly){
            
          }
          if(data){
            this.id = data.id
            for (let k in this.form) {
              this.form[k] = data[k]
            }
          }
        }
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
          api.saveInfoBciApply(params).then(({ data }) => {
            this.loading = false;
            if (data.code == 0) {
              this.$message.success(data.message)
              this.$router.go(-1)
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    }
  },
  created() {
    let str = sessionStorage.getItem('centralBankOrderInfo')
    if (str) {
      this.detailInfo = JSON.parse(str)
      this.getOrderDetailBciApply()
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

  .tit {
    border-bottom: solid 1px #ddd;
    padding-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }

  .el-row {
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

  .el-form-item {
    margin-bottom: 15px;
  }
}

.report-item {
  padding: 20px;
  border: solid 1px #949494;
  margin-top: 20px;
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
  font-size: 20px;
  font-weight: bold;
}

// }
.style-table {
  margin-top: 10px;
  width: 600px;
  border-collapse: collapse;

  th {
    font-weight: bold;
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
      border: solid 1px #999;
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

.input-width {
  .el-input {
    width: 150px;
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
