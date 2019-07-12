<template>
	<table align="center" style="width: 100%;">
		<tr>
      <td width="1"><span>客户名称：</span>{{data.compName}}</td>
      <td width="1"><span>法人名称：</span>{{data.legalName}}</td>
      <td width="1"><span>身份证：</span> {{data.legalNo}}</td>
    </tr>
		<template v-if="data.loanApplyType == 1 || data.loanApplyType == 2|| data.loanApplyType == 5">
	    <tr>
	      <td><span>申请产品：</span>{{data.productName}}</td>
	      <td><span>申请金额（元）：</span>{{data.loanAmount}}</td>
	      <td><span>申请期限：</span>{{data.productTerm}} {{data.loanTermType|getTermType}}</td>
	    </tr>
	    <tr>
	      <td><span>利率：</span>{{data.proInterestCost}}‰</td>
	      <td><span>收款账户：</span>{{data.accountNo}}</td>
        <td width="1"><span>用信类型：</span>{{auditType}}</td>
	    </tr>
		</template>

		<template v-else-if="data.loanApplyType == 3">

	    <tr>
	      <td><span>申请产品：</span>{{data.productName}}</td>
	      <td><span>申请金额（元）：</span>{{data.loanAmount}}</td>
	      <td><span>利率：</span>{{data.proInterestCost}}‰</td>
	    </tr>
	    <tr>
	      <td><span>票据号码：</span>{{data.noteNum}}</td>
	      <td><span>承兑银行：</span>{{data.acceptBank}}</td>
	      <td><span>票面金额（元）：</span>{{data.acceptAmount }}</td>
	    </tr>
	    <tr>
	      <td><span>出票人全称：</span>{{data.outNoteName }}</td>
	      <td><span>接票人全称：</span>{{data.receiveNoteName }}</td>
	      <td><span>汇票到期日：</span>{{data.noteExpireTime }}</td>
	    </tr>
	    <tr>
	      <td><span>收款账户：</span>{{data.accountNo}}</td>
        <td width="1"><span>用信类型：</span>{{auditType}}</td>
	    </tr>
		</template>
		<template v-else-if="data.loanApplyType == 4">

	    <tr>
	      <td><span>申请产品：</span>{{data.productName}}</td>
	      <td><span>申请金额（元）：</span>{{data.loanAmount}}</td>
	      <td><span>收款账户：</span>{{data.accountNo}}</td>

	    </tr>
	    <tr>
	      <td><span>开立金额（元）：</span>{{data.loanAmount}}</td>
	      <td><span>保证方式：</span>{{data.guaranteeType | getGuarantee}}</td>
        <td width="1"><span>用信类型：</span>{{auditType}}</td>
	    </tr>
		</template>
    <template v-else-if="data.loanApplyType == 6">

	    <tr>
	      <td><span>申请产品：</span>{{data.productName}}</td>
	      <td><span>申请金额（元）：</span>{{data.loanAmount}}</td>
	      <td><span>保证期限：</span>{{data.lgTerm}} {{data.lgTermType|getTermType}}</td>
	    </tr>
	    <tr>
	      <td><span>利率：</span>{{data.proInterestCost}}‰</td>
	      <td><span>收款企业名称：</span>{{data.lgCompName }}</td>
	      <td><span>收款账户：</span>{{data.accountNo}}</td>
	    </tr>
      <tr>
        <td width="1"><span>用信类型：</span>{{auditType}}</td>
      </tr>
		</template>
  </table>
</template>
<script>
  import api from '@/api-authority'
	export default {
		props: {
			data: {
				type: Object,
				default: {}
			},
		},
		date(){
			return {

			}
		},
    computed:{
      auditType () {
        return api.getAuditType(this.$route.query.auditType)
      }
    },
		filters: {
			getGuarantee(v){
				v = Number(v)
				if(/\d/.test(v)){
					return ['', '保证', '抵押', '质押', '定金'][v]
				}
				else{
					return ''
				}
			},
			getTermType(v){
				let o = {'MON':'个月', 'YEAR':'年', 'DAY':'天' }
        return o[v]
			}
		},
	}
</script>
