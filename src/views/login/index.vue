<template>
  <div class="container login_page">
    <div class="login_tittle">
      <div class="logo_img">
        <img src="../../assets/img/logo.png" alt="">
        <div class="login_line"></div>
        <span class="logo-title-cont">企业金融信贷管理平台</span>
      </div>
    </div>
    <div class="bg_img">
      <div class="inner_container">
        <div class="login_right_img">
          <img src="../../assets/img/chatu.png" alt="">
          <div class="login-main">
            <!-- <el-tabs v-model="activeName2" type="card" @tab-click="handleClick"> -->
              <!-- <el-tab-pane label="扫码下载" name="first">
                      <div class="l_wrap">
                          <div class="binCode_wrap">
                            <div class="binCode">
                                <img src="../../assets/img/loginCode.png" alt="扫码登录">
                            </div>
                        </div>
                      </div>
                        
                      <p class="tipWords">扫描二维码,下载APP</p>

                    </el-tab-pane> -->
              <!-- <el-tab-pane label="账户登录" name="second"> -->
                <div class="login_password">
                  <h2>企业金融信贷管理平台</h2>
                  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
                    <el-form-item prop="userName">
                      <i class="register" style="position:absolute;left:5px;top:50%;transform:translateY(-50%);z-index:1000"></i>
                      <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <i class="password" style="position:absolute;left:9px;top:50%;transform:translateY(-50%);z-index:1000"></i>
                      <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                      <el-row :gutter="20">
                        <el-col :span="14">
                          <i class="uuid" style="position:absolute;left:20px;top:50%;transform:translateY(-50%);z-index:1000"></i>
                          <el-input type="text" v-model="dataForm.captcha" placeholder="验证码">
                          </el-input>
                        </el-col>
                        <el-col :span="10" class="login-captcha">
                          <img :src="captchaPath" @click="getCaptcha()" alt="">
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()" :loading="loginLoading">登录</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              <!-- </el-tab-pane>
            </el-tabs> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="login_footer">
             <p>上海指旺信息科技有限公司 版权所有</p>
             <p>京公网安备11000002000001号</p>
        </div> -->
  </div>
</template>
<script>
import api from '@/api-authority'
import { getUUID } from '@/utils'
import * as types from '@/store/mutation-types'
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
        return false;
      } else {
        callback();
        return true;
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
        return false;
      } else {
        callback();
        return true;
      }
    };
    var validatePictureCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
        return false;
      } else {

        callback();
        return true;
      }
    };
    return {
      dataForm: {
        userName: '',
        password: '',
        type: '',
        uuid: '',
        captcha: '',
      },
      dataRule: {
        userName: [
          { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        captcha: [
          { required: true, validator: validatePictureCode, trigger: 'blur' }
        ]
      },
      activeName2: 'second',
      captchaPath: '',
      loginLoading: false
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 提交表单
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var publicKey = this.PublicKey;
          this.$JSEncrypt.setPrivateKey(publicKey);
          

          var params = {
            "username": this.dataForm.userName,
            //   "password":this.dataForm.password,
            "password": this.$JSEncrypt.encrypt(this.dataForm.password),

            "type": 1,
            "uuid": this.dataForm.uuid,
            "verifyCode": this.dataForm.captcha
          }
          this.loginLoading = true
          sessionStorage.removeItem('Authorization')
          localStorage.clear() // 清空之前的用户信息
          api.login(params).then(({ data }) => {
            
            if (data.code == 0) {
              // this.$cookie.set('Authorization', ('' + data.tokenResponse.access_token), {
              //   expires: 60 * 60 // 一小时
              // })
              sessionStorage.setItem('Authorization', data.tokenResponse.access_token)
              delete data.tokenResponse.token_type
              delete data.tokenResponse.access_token
              localStorage.userinfo = JSON.stringify(data.tokenResponse.user);
              this.$store.commit(types.UPDATE_userinfo, data.tokenResponse.user)
              this.getMenuNavigation()
            } else {
              this.loginLoading = false
              if(data.code == -1){
                this.$message.error(data.message)
              }
              else{
                this.$message.error('登录失败')
              }
              this.getCaptcha()
            }
          }).catch((err) => {
            this.loginLoading = false
          })
        }
      })
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID()
      this.captchaPath = api.verifycode(this.dataForm.uuid)
    },
    //获取菜单导航
    getMenuNavigation() {
      api.getNavigation({}).then(({ data }) => {
        this.loginLoading = false
        if (data.success && data.data) {
          let menus = data.data.filter(item => {
            return item.type != 2
          })
          this.$store.commit(types.AUTH_DATA, data.data)
          this.$store.commit(types.UPDATE_NAVIGATION, menus)
          // localStorage.mudules = JSON.stringify(data.data);
          this.$router.replace({ path: '/customer/红',query:{pageNum:1,pageSize:10} })
        } else {
          this.$message.error(data.message)
        }
      }).catch((err) => {
        this.loginLoading = false
      })
    }
  }
}

</script>
<style lang="scss">
.login_page {
  .el-input__inner {
    padding-left: 30px
  }
}

</style>
<style lang="scss" scoped>
.container {
  .login_line {
    width: 1px;
    height: 30px;
    background-color: #ddd;
    position: absolute;
    top: 25px;
    left: 420px;
  }

  .login_tittle {
    position: relative;
    width: 100%;
    height: 80px;

    .logo-title-cont {
      position: absolute;
      top: 32px;
      left: 440px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #666;
      letter-spacing: 0;
      line-height: 16px;
    }
  }

  .logo_img {
    padding: 8px 0 8px 100px;
  }

  .bg_img {
    position: relative;
    width: 100%;
    height: 760px;
    background: url(../../assets/img/Rectangle.png) no-repeat;
    background-size: cover;
    overflow: hidden;
  }

  .inner_container {
    width: 900px;
    height: 408px;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 5px;

    .login_right_img {
      position: relative;
    }
  }

  .login-main {
    position: absolute;
    top: 14px;
    right: 32px;
    float: right;
    width: 400px;
    height: 380px;
    background-color: #fff;
    border-radius: 0 8px 8px 0;

    .login-title {
      text-align: center;
      padding: 25px 0 30px 0;
      font-size: 18px;
      color: #525866;
    }

    .login_password {
      margin: 0 40px;
      h2{
        font-size: 18px;
        font-weight: normal;
        color: #797979;
        text-align: center;
        line-height: 80px;
      }
    }

    .register {
      background: url(../../assets/img/register.png) no-repeat left center;
      display: inline-block;
      width: 18px;
      height: 18px;
    }

    .password {
      background: url(../../assets/img/password.png) no-repeat left center;
      display: inline-block;
      width: 18px;
      height: 18px;
    }

    .uuid {
      background: url(../../assets/img/uuid.png) no-repeat left center;
      display: inline-block;
      width: 18px;
      height: 18px;
    }

  }

  .login-captcha {
    overflow: hidden;
    line-height: 0;
    &>img {
      width: 100%;
      cursor: pointer;
      height: 40px;
    }
  }

  .login-btn-submit {
    width: 100%;
  }

  .login-btn-prompt {
    width: 320px;
    background-color: #ffe5e5;
    outline: none;
  }

  .login_footer {
    text-align: center;
    margin: 62px 0 62px 0;
  }

  p {
    margin-bottom: 10px;
    color: #999;
    font-size: 12px;
  }
}

</style>
<style lang="less">
.container.login_page {
  .el-tabs--card>.el-tabs__header {
    border-bottom: none;
  }

  .el-tabs__header {
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    padding: 20px 0;
    margin: 0;

    .el-tabs__nav-wrap {
      margin: 0;
    }
  }

  .el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: none;
    height: 30px;
    width: 100%;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item {
    width: 50%;
    text-align: center;
    font-size: 18px;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #525866;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
    border-left: none;
  }

  .el-tabs__item {
    color: #525866;
  }

  .el-tabs__item.is-active {
    color: #55A8FD;
  }

  .el-tabs__content {
    padding-top: 5px;
  }

  .l_wrap {
    min-height: 250px;

    .binCode_wrap {
      padding-top: 40px;

      .binCode {
        border: 1px solid #f4f4f4;
        width: 180px;
        height: 180px;
        padding: 12px;
        margin: auto;
        transition: transform 0.3s ease-in, -webkit-transform 0.3s ease-in, -moz-transform 0.3s ease-in;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .tipWords {
    color: #525866;
    font-size: 14px;
    text-align: center;
  }

}

</style>
