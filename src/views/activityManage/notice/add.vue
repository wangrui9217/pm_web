<template>
  <div class="common-list-page" v-loading.fullscreen="loading">
    <page-template :position-path="positionPath">
      <div class="act-title">
        <div class="act-tit">公告基本信息</div>
        <el-button type="default" size="small" class="tool-back" @click="$router.go(-1)">返回</el-button>
      </div>
    </page-template>
    <div class="activity-form">
      <el-form :model="form" ref="form" label-width="100px" :rules="rules">
        <el-form-item label="公告标题：" prop="contentTitle" style="width: 430px;">
          <el-input v-model="form.contentTitle" :maxLength="50"></el-input>
        </el-form-item>
        <el-form-item label="公告类型：" style="width: 430px;">
          <el-select v-model="form.noticeType" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告详情：" prop="contentDescription" style="width: 1000px;">
          <vue-ueditor-wrap v-model="form.contentDescription" :config="myConfig" @beforeInit="addCustomButtom" @ready="ready"></vue-ueditor-wrap>
          <!-- <quill-editor v-model="form.contentDescription" ref="myQuillEditor" :options="editorOption">
          </quill-editor> -->
          <input type="file" style="display: none;width:0" id="iviewUp" accept="image/jpeg,image/png,image/gif" @change="handleFileInput">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from "@/api-authority";
import VueUeditorWrap from 'vue-ueditor-wrap'
let EditorInstance = null
export default {
  props: {
    actType: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data() {
    return {
      loading: false,
      positionPath: [{ name: '公告管理' }, { name: '新增公告' }], //路径信息
      imageUrl: '',
      id: '',
      form: {
        contentType: 3,
        noticeType: '1',
        contentDescription: '',
        contentTitle: '',
        img: ''
      },
      
      options2: [{
        label: '内部公告',
        value: '1'
      }, {
        label: '外部公告',
        value: '2'
      }],
      rules: {
        contentTitle: { required: true, message: '请输入公告标题' },
        contentDescription: { required: true, message: '请输入公告详情' }
      },
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 540,
        // 初始容器宽度
        initialFrameWidth: '100%',
        UEDITOR_HOME_URL: '/static/UEditor/'
      },
    };
  },
  components: {
    PageTemplate,VueUeditorWrap
  },
  methods: {
    handleFileChange(file, fileList){
     this.file = file
     this.imageUrl = URL.createObjectURL(file.raw);
     this.form.img = 'true'
    },
    ready(editorInstance){
      EditorInstance = editorInstance
    },
    addCustomButtom(editorId){
      console.log(editorId)
      window.UE.registerUI('uploadImg', function (editor, uiName) {
      // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
      editor.registerCommand(uiName, {
        execCommand: function () {
          editor.execCommand('inserthtml', ``)
        }
      })

      // 创建一个 button
      var btn = new window.UE.ui.Button({
        // 按钮的名字
        name: uiName,
        // 提示
        title: '上传图片',
        // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
        cssRules: "background-image: url('./static/UEditor/themes/default/images/icons.png') !important;background-position: -380px 0px;",
        // 点击时执行的命令
        onclick: function () {
          document.querySelector('#iviewUp').click()
        }
      })

      // 当点到编辑内容上时，按钮要做的状态反射
      editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiName)
        if (state === -1) {
          btn.setDisabled(true)
          btn.setChecked(false)
        } else {
          btn.setDisabled(false)
          btn.setChecked(state)
        }
      })

      // 因为你是添加 button，所以需要返回这个 button
      return btn
    }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
    },
    handleFileInput(e){
      let file = e.target.files[0]
      if(file.size > 10*1024*1024){
        this.$message.error('请上传小于10M的图片')
        return false;
      }
      this.uploadImage(file)
    },
    uploadImage(file){
      let data = new FormData()
      data.append('file', file)
      this.loading = true
      api.upload(data).then((res) => {
        this.loading = false
        if (res.data.code == 0 && res.data.message) {
          let encryptStr = window.encodeURIComponent(res.data.message)
          let url = api.getImgURL(encryptStr)
          EditorInstance.execCommand('inserthtml', `<img src="${url}">`);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false
      })
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let data = new FormData()
          let content = this.form.contentDescription||''
          content = content.replace(/(?=[^>]*(?=<))\s/g,'&nbsp;')
          data.append('file', null)
          data.append('contentTitle', this.form.contentTitle)
          data.append('contentDescription', content)
          data.append('contentType', this.form.contentType)
          data.append('noticeType', this.form.noticeType)
          let params = {
            // contentTitle: this.form.contentTitle,
            // contentDescription: this.form.contentDescription,
            // contentType: this.form.contentType,
            // noticeType: this.form.noticeType
          }
          if (this.id) {
            // params.id = this.id
            data.append('id', this.id)
          }
          this.loading = true

          api.addOrUpdateEvent(data, params).then((res) => {
            this.loading = false
            if (res.data.code == 0) {
              this.$message.success("操作成功");
              this.$router.go(-1);
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.loading = false
          })
        }
      })
    },
    reset() {
      this.$refs['form'].resetFields()
      this.form.contentType = 3
      this.form.noticeType = '1'
    }
  },
  created() {
    if (this.actType === 'edit') {
      this.positionPath = [{ name: '公告管理' }, { name: '修改公告' }]
      let activityInfo = JSON.parse(sessionStorage.getItem('activityInfo'))
      if (activityInfo.contentDescription) {
        this.form.contentDescription = activityInfo.contentDescription
      }
      this.form.contentTitle = activityInfo.contentTitle
      this.form.noticeType = '' + activityInfo.noticeType
      this.id = activityInfo.id
    }
  }
}

</script>
<style lang="less" scoped>
.act-title {
  overflow: hidden;
  padding: 0 24px 10px;
}

.tool-back {
  float: right;
}

.act-tit {
  float: left;
  font-size: 18px;
  line-height: 32px;
  color: #000;
}

.activity-form {
  padding-top: 20px;
  border-top: solid 1px #eee;
  margin-left: 24px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar-uploader-icon:hover {
  border-color: #409EFF;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
