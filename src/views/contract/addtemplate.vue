<template>
  <div class="common-list-page basedCost">
    <page-template :position-path="positionPath" :toolTitle="true" pageTitle="合同模板明细">
    </page-template>
    <el-form ref="financeInfoTable" :model="user" :rules="rules" label-width="140px" style="text-align:left;margin-bottom:20px;background:#fff;padding-top:20px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="模板编号 : " prop='templateNo'>
            <el-input v-model="user.templateNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同版本 : " prop="contractVersion">
            <el-input v-model="user.contractVersion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同名称 : " prop='contractName'>
            <el-input v-model="user.contractName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型 : ">
            <el-select v-model="user.type" placeholder="请选择活动区域">
              <el-option label="借款协议" value="1"></el-option>
              <el-option label="咨询管理协议" value="2"></el-option>
              <el-option label="自动代扣授权协议" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="合同内容 : " prop="contractContent">
            <el-input v-model="user.contractContent" v-show="false" />
            <!-- <quill-editor v-model="user.contractContent" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)"> -->
            <!-- </quill-editor> -->
            <vue-ueditor-wrap v-model="user.contractContent" :config="myConfig" ></vue-ueditor-wrap>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" style="text-align:center;padding-bottom:25px;">
          <el-button type="primary" @click="offgo" style="margin-right:60px">取消</el-button>
          <el-button type="primary" :disabled="bclick" @click="addtempform('financeInfoTable')">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      user: {
        type: '1',

        templateNo: '',
        contractContent: '',
        contractVersion: '',
        contractName: '',

      },
      bclick: false,
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 540,
        // 初始容器宽度
        initialFrameWidth: '100%',
        UEDITOR_HOME_URL: '/static/UEditor/'
      },
      positionPath: [{ name: '合同管理' }, { name: '合同模板管理' }, { name: this.$route.query.id ? '编辑模板' : '新增模板' }],
      rules: {
        templateNo: [{ required: true, message: "模板编号不能为空", trigger: "blur" },
          { max: 14, message: "请输入14个以内的字符", trigger: "blur" }

        ],
        contractName: [{ required: true, message: "合同名称不能为空", trigger: "blur" },
          { max: 50, message: "请输入50个以内的字符", trigger: "blur" }

        ],
        contractContent: [{ required: true, message: "内容不能为空", trigger: "change" }],
        contractVersion: [{ required: true, message: "合同版本不能为空", trigger: "blur" },
          { max: 50, message: "请输入50个以内的字符", trigger: "blur" }

        ],

      },

    }
  },
  components: {
    PageTemplate, VueUeditorWrap
  },
  mounted(){
    
  },
  created() {
    console.log(this.$route, 77, _.cloneDeep(this.$route.query))
    if (this.$route.query.id) {
      console.log(this.$route.query)
      Object.keys(_.cloneDeep(this.$route.query)).map(el => {
        this.user[el] = _.cloneDeep(this.$route.query)[el]
      })


      //    this.user=this.$route.query
      this.user.type = '' + this.user.type;
      this.user.contractContent = this.user.contractContent
    }
  },
  methods: {
    offgo() {
      this.$router.push('/contract-template')

    },
    
    credtinfo() {
      this.$router.push('/repayment-info')
    },
    addtempform(formName) {

      if (!this.user.contractContent) {
        this.$message.error('请输入合同内容')
        return

      }

      this.user.contractContent = this.user.contractContent.replace(/(?=[^>]*(?=<))\s/g, '\u00a0').replace(/<table>/g,'<table style="width:100%">').replace(/&nbsp;/g, '\u00a0')
      if (this.user.id) {

        this.$refs[formName].validate((valid) => {
          console.log(valid)

          if (valid) {
            this.bclick = true;
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            api.edittemp(this.user).
            then((res) => {
              this.bclick = false;
              loading.close()
              if (res.data.code == '0') {
                this.$router.push({ name: '合同模板管理' })


              } else {
                this.$message.error(res.data.message)
              }
            }).catch((err) => {
              console.log(err)
              this.bclick = false;

            })
          } else {
            console.log('error submit!!');


            return false;
          }
        });

      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bclick = true;
            api.addtemp(this.user).
            then((res) => {
              this.bclick = false;

              if (res.data.code == '0') {
                this.$router.push({ name: '合同模板管理' })

              } else {
                this.$message.error(res.data.message)
              }
            }).catch((err) => {
              console.log(err)
              this.bclick = false;

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }


    }
  }
}

</script>
<style lang="scss">
.common-list-page.basedCost {
  padding: 0;

  .el-table {
    .cell {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      letter-spacing: 0;
      line-height: 22px;

      .of-hidden.actList .el-button--small {
        font-size: 14px;
        color: #1890FF;
        line-height: 22px;
      }
    }

  }

  .el-table--enable-row-transition .el-table__body td {
    font-size: 14px;
    letter-spacing: 0;
    line-height: 14px;
    padding-top: 10px;
    padding-bottom: 9px;
    border-right: none;
  }

  .el-table__body tr.current-row>td,
  .el-table__body tr:hover>td {
    background-color: #E6F7FF;
  }

  .ql-container {
    height: 440px;
  }

}

</style>
