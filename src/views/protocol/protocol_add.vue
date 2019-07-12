<template>
  <div class="common-list-page">
    <page-template :position-path="positionPath" :toolTitle="true">
      <el-form ref="financeInfoTable" :model="formData" :rules="rules" label-width="140px" style="text-align:left;margin-bottom:20px;background:#fff;padding-top:20px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="协议模板编号：" prop='protocolNo'>
              <el-input v-model="formData.protocolNo" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议版本：" prop="version">
              <el-input v-model="formData.version" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="协议名称：" prop='protocolName'>
              <el-input v-model="formData.protocolName" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议类型：" prop='type'>
              <el-select v-model="formData.type" placeholder="请选择" size="small">
                <el-option v-for="item in protocolTypeList" :label="item" :value="item" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="协议节点：" prop='checkList'>
              <el-checkbox-group v-model="formData.checkList">
                <el-checkbox v-for="(item,index) in protocolCodeList" :label="item.codeNo" :key="index">{{item.codeName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="协议内容：" prop="content" style="width: 1000px;height: 650px" v-loading="loading">
              <vue-ueditor-wrap v-model="formData.content" :config="myConfig" @beforeInit="addCustomButtom" @ready="ready"></vue-ueditor-wrap>
              <input type="file" style="display: none;width:0" id="iviewUp" accept="image/jpeg,image/png,image/gif" @change="handleFileInput">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item>
              <el-button type="default" @click="back" style="margin-right:30px">取消</el-button>
              <el-button type="primary" :disabled="bclick" @click="addtempform('financeInfoTable')">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </page-template>
  </div>
</template>
<script>
import PageTemplate from '@/components/page-template'
import api from '@/api-authority'
import VueUeditorWrap from 'vue-ueditor-wrap'
let EditorInstance = null
export default {
  data() {
    return {
      loading: false,
      formData: {
        type: '',
        protocolNo: '',
        content: '',
        version: '',
        protocolName: '',
        checkList: []
      },
      oldCheckList: [],
      bclick: false,
      positionPath: [{ name: '协议管理' }, { name: '协议模板管理' }, { name: this.$route.query.id ? '编辑模板' : '新增模板' }],
      rules: {
        protocolNo: [{ required: true, message: "模板编号不能为空", trigger: "blur" },
          { max: 14, message: "请输入14个以内的字符", trigger: "blur" }

        ],
        protocolName: [{ required: true, message: "协议名称不能为空", trigger: "blur" },
          { max: 50, message: "请输入50个以内的字符", trigger: "blur" }

        ],
        type: { required: true, message: "'请选择协议类型"},
        checkList: { type: 'array', required: true, message: '请至少选择一个协议节点', trigger: 'change'},
        content: { required: true, message: "内容不能为空", trigger: "change" },
        version: [{ required: true, message: "协议版本不能为空", trigger: "blur" },
          { max: 50, message: "请输入50个以内的字符", trigger: "blur" }
        ]
      },
      protocolCodeList: [],
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 540,
        // 初始容器宽度
        initialFrameWidth: '100%',
        UEDITOR_HOME_URL: '/static/UEditor/'
      },

    }
  },
  components: {
    PageTemplate,VueUeditorWrap
  },
  computed: {
    protocolTypeList(){
      return this.$store.state.protocolTypeList
    }
  },
  created() {
    if(this.protocolCodeList.length== 0){
      this.getAllCodeList()  
    }
    if (this.$route.query.hasOwnProperty('id')) {
      let data = JSON.parse(sessionStorage.getItem('protocolInfo'))
      this.formData.id = data.id
      this.formData.state = data.state
      this.formData.type = data.type
      this.formData.protocolNo = data.protocolNo
      this.formData.version = data.version
      this.formData.protocolName = data.protocolName
      if(data.content){
        this.formData.content = data.content
      }
      this.getProtocolCodeList(this.formData.id)
    }
  },
  mounted(){

  },
  methods: {
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
      console.log(EditorInstance)
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
    back() {
      this.$router.go(-1)
    },
    addtempform(formName) {
      
      let params = Object.assign({}, {
        "state": "OFF",
        "status": "",
      }, this.formData)
      params.list = this.protocolCodeList.filter(item => {
        return params.checkList.indexOf(item.codeNo) > -1
      })
      params.list.forEach(item => {
        item.type = 1
      })
      params.content = params.content||''
      if (params.id) {
        this.orginCheckList.forEach(item1 => {
          if(params.checkList.indexOf(item1.codeNo) == -1){
            item1.type = 2
            params.list.push(item1)
          }
          else{
            let obj = params.list.find(item2 => {return item2.codeNo == item1.codeNo})
            obj.type = ''
          }
        })
        params.list = params.list.filter(item => {return item.type != ''})
        delete params.checkList
        params.content = params.content.replace(/(?=[^>]*(?=<))\s/g,'&nbsp;')
        params.content += '<style>.ql-align-center{text-align:center}.ql-align-right{text-align:right}</style>'
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bclick = true;
            api.updateProtocol(params).
            then((res) => {
              this.bclick = false;
              if (res.data.code == '0') {
                this.$message.success('保存成功')
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message)
              }
            }).catch((err) => {
              console.log(err)
              this.bclick = false;

            })
          } else {
            return false;
          }
        });

      } else {
        
        delete params.checkList
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.bclick = true;
            api.addProtocol(params).
            then((res) => {
              this.bclick = false;
              if (res.data.code == '0') {
                this.$message.success('保存成功')
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message)
              }
            }).catch((err) => {
              console.log(err)
              this.bclick = false;

            })
          } else {
            return false;
          }
        });
      }
    },
    getProtocolCodeList(protocolId){
      let params = {}
      if(protocolId){
        params.protocolId = protocolId
      }
      api.getProtocolCodeList(params).then(({data}) => {
        if(data.code == 0){
          if(protocolId){
            this.formData.checkList = data.message.map(item => {
              return item.codeNo
            })
            this.orginCheckList = data.message
          }
          else this.protocolCodeList = data.message
        }
      })
    },
    getAllCodeList(){
      api.getAllCodeList({})
      .then(({data}) => {
        if(data.code == 0){
          this.protocolCodeList = data.message
          this.$refs['financeInfoTable'].clearValidate()
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped="">
</style>
