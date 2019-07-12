<template>
  <el-dialog title="创建/编辑/复制引擎" :visible="visible" size="tiny"
             :show-close=false>
    <el-form ref="form"
             :model="formData"
             :rules="formRules">
      <el-form-item label="引擎编码：" prop="code">
        <el-input v-model="formData.code" :disabled="!!formData.id"></el-input>
      </el-form-item>
      <el-form-item label="引擎名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="引擎描述：" prop="description">
        <el-input type="textarea" v-model="formData.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="ok">确定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/babel">
  import validateRules from '../../../scripts/validate-rules';

  export default {
    props: {
      engine: {
        type: Object,
        default() {
          return {};
        }
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formData: _.cloneDeep(this.engine),
        formRules: {
          code: validateRules.code,
          name: validateRules.name,
          description: validateRules.description
        }
      }
    },
    watch: {
      engine() {
        this.formData = _.cloneDeep(this.engine);
      }
    },
    methods: {
      ok() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$emit('ok', this.formData);
          }
        });
      },
      cancel() {
        this.$emit('cancel');
      }
    }
  }
</script>
<style lang="scss">

</style>
