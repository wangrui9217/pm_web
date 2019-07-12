<template>
  <div id="top-nav-bar">
    <div class="logo-title">
      <img src="../../assets/img/logo.png" >
      </div>
      <span class="logo-title-cont">企业金融信贷管理平台</span>
      <div class="right">
        <el-popover
          placement="bottom"
          min-width="100"
          trigger="click"
          popper-class="popper-style"
          >
          <el-button type="text" size="mini" @click="centerDialogVisible2=true">修改密码</el-button>
          <span slot="reference" style="cursor: pointer;">{{sysuser}}<i class="el-icon-caret-bottom" style="color: #999"></i></span>
        </el-popover>
        
        
        <a class="cursor-hand" >
          <img src="../../assets/img/out.png" width="16" heihgt="16" class="r20" @click="logoutHandle()">
        </a>
      </div>
      <el-dialog title="修改密码" :visible="centerDialogVisible2" :close-on-click-moda='false' width="30%" :modal-append-to-body='false' :close-on-press-escape='false' :show-close='false' center>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原始密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm2.newPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:right">
          <span slot="footer" class="dialog-footer">
            <el-button @click="closefn('ruleForm2')">取 消</el-button>
            <el-button type="primary" @click="changepwd('ruleForm2')">确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import UpdatePassword from './update-password'
import { mapMutations } from 'vuex'
import api from '@/api-authority'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass) {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {

      console.log(value == '')
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value != this.ruleForm2.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      updatePassowrdVisible: false,
      sysuser: '',
      ruleForm2: {
        newPassword: '',
        password: '',
        checkPass: ''
      },
      userId: JSON.parse(localStorage.userinfo).id,
      username: JSON.parse(localStorage.userinfo).username,
      centerDialogVisible2: false,
      rules2: {
        password: [{
          required: true,
          message: '请输入原始密码',
          trigger: 'blur',

        }],
        newPassword: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, trigger: 'blur' }

        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, trigger: 'blur' }


        ],
      }

    }
  },
  components: {
    UpdatePassword
  },
  computed: {
    navbarClasses() {
      let type = this.$store.state.navbarLayoutType
      return [
        !/\S/.test(type) || type === 'default' ? '' : `site-navbar--${type}`
      ]
    }
  },
  mounted() {
    let userinfo = _.get(localStorage, 'userinfo') ? JSON.parse(localStorage.userinfo) : { realname: '' }
    this.sysuser = userinfo.realName
  },
  methods: {

    // 切换侧边栏, 水平折叠收起状态
    switchSidebarCollapseHandle() {
      this.SWITCH_SIDEBAR_COLLAPSE({ collapse: !this.$store.state.sidebarCollapse })
    },
    closefn(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible2 = false;
    },
    // 修改密码
    updatePasswordHandle() {
      this.updatePassowrdVisible = true
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init()
      })
    },
    // 退出
    logoutHandle() {

      this.$confirm(`确定进行[退出]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        sessionStorage.removeItem('Authorization');
        this.$router.replace({ name: 'login' })
      }).catch(() => {})
    },

    //修改密码
    changepwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          var publicKey = this.PublicKey;
          this.$JSEncrypt.setPrivateKey(publicKey);
          let params = {
            userId: this.userId,
            username: this.username
          }
          params.password = this.$JSEncrypt.encrypt(this.ruleForm2.password)
          params.newPassword = this.$JSEncrypt.encrypt(this.ruleForm2.newPassword)
          params.checkPass = this.$JSEncrypt.encrypt(this.ruleForm2.checkPass)
          api.changrpwd(params).then((res) => {
            loading.close();
            if (res.data.code == '1') {
              vm.$message({
                type: 'success',
                message: res.data.message
              });
              this.ruleForm2.newPassword = '';
              this.ruleForm2.password = ''
              this.ruleForm2.checkPass = ''
              this.centerDialogVisible2 = false;
              sessionStorage.removeItem('Authorization');
              this.$router.replace({ name: 'login' })
            } else {
              vm.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return false;
        }
      });

    },
    ...mapMutations(['SWITCH_SIDEBAR_COLLAPSE', 'DELETE_CONTENT_TABS'])

  }
}

</script>
<style lang="css" scoped>
#top-nav-bar {
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #dce3e9;
  float: left;
  text-align: left;
  background: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.logo-title {
  padding-left: 20px;
  padding-right: 20px;
  line-height: 60px;
  display: inline-block
}

.logo-title-cont {
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  color: #363D4D;
  letter-spacing: 0;
  line-height: 20px;
}

#top-nav-bar img {
  vertical-align: middle;
  display: inline-block;
}

.right {
  float: right;
}

.el-button.el-button--text {
  font-size: 14px;
  color: #475167;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
}

.el-button--text {
  border: none;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}

.cursor-hand {
  cursor: pointer;
}

#top-nav-bar .r20 {
  margin: 0 20px;
}

</style>
