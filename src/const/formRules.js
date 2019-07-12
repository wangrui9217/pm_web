const rules = {
  orderNum: [
    { required: true, trigger: 'blur', message: '请输入部门排序号' },
    { pattern: /^(0|([1-9]\d*))$/, trigger: 'blur', message: '格式错误' }
  ],
  orgName: [
    { required: true, trigger: 'blur', message: '请输入部门名称' }
  ],
  parantDept: [
    { required: true, trigger: 'change', message: '请选择部门' }
  ],
  custodianName: [
    { required: true, trigger: 'change', message: '请选择部门主管' }
  ],
  areaId:[
    { required: true, trigger: 'change', message: '请选择所属区域' }
  ],
  roleList: { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' },
  tel:{ pattern: /^\d{7,}$/, trigger: 'blur', message: '电话格式错误' },
  username: { required: true, trigger: 'blur', message: '请输入工号' },
  phoneRule: [
    { required: true, trigger: 'blur', message: '请录入手机号' },
    { pattern: /^1\d{10}$/, trigger: 'blur', message: '手机号格式错误' }
  ],
  passwordRule: { required: true, trigger: 'blur', message: '请填写密码' },
  cityRule: { required: true, trigger: 'change', message: '请选择城市地址' },
  addressRule: [
    { required: true, trigger: 'blur', message: '请填写地址' },
    { max: 100, message: '100个字符以内', trigger: 'blur' }
  ],
  auditMsg: { required: true, trigger: 'blur', message: '请填写审批意见' },
  rejectMsg: { required: true, trigger: 'change', message: '请选择原因' },
  remark: { required: true, trigger: 'blur', message: '请填写备注' },
  coIdnum: [
    { required: true, message: '请填写企业统一信用代码' },
    { pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/, message: '统一信用代码格式错误',trigger: 'blur' }
  ],
  zipcodeRule: [
    { pattern: /^\d{6}$/, trigger: 'blur', message: '邮编格式错误，请录入正确的邮编' },
  ],
  realnameRule: [
    { required: true, trigger: 'blur', message: '请填写姓名' },
    { max: 50, message: '50个字符以内', trigger: 'blur' }
  ],
  emailRule: [
    { type: 'email', message: '邮箱格式错误，请录入正确的邮箱', trigger: 'blur' },
  ],
  idnumRule: [
    { required: true, trigger: 'blur', message: '请填写身份证号码' },
    { pattern: /^[1-9]\d{5}(((19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[xX\d])|(\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}))$/, trigger: 'blur', message: '身份证号格式错误' }
  ],
  agentJobRule: [
    { required: true, trigger: 'blur', message: '请输入职务' }
  ]
}
export default rules