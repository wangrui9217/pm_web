<script>
/* eslint-disable */
import * as weapon from '@/utils/weapon.js'
import '@/less/data-filter.less'
export default {
	name:'data-filter',
	data(){
		return {
      value6:"",
			showAll:false,
			usedFilter:[],
			date:"",
			filterForm:{},
			filterAnimateType:false,
			filtersIsShow:true,
			_usedFilterIsShow:false,
			emitAvailable:false
		}
	},
	props:{
		filters:{
			type:Array,
			default:[]
		},
		filterAction:{
			type:null,
			default:""
		},
		sessionStorageFilterKey:{
			type:String
		}
	},
	watch:{
	  
		'filterList':{
			handler(newData){
				var filter={}
				newData.forEach((item,index)=>{
					if(item.value){
						if(Array.isArray(item.field)){
							item.field.forEach((key,index)=>{
								filter[key]=item.value[index]
							})
						} else {
							filter[item.field]=item.value
						}
					}
				})
				this.paramsFilter=filter
				if(this.emitAvailable){
					this.$emit("do-filter",this.paramsFilter)
					this.emitAvailable=false
				}
			},
			deep:true
		}
	},
	computed:{
		filterList(){
			return this.filters
		}
	},
	created(){

	},
	beforeMount(){
		var usedFilter;
		if( usedFilter= sessionStorage.getItem(this.sessionStorageFilterKey)){
			this.usedFilter=JSON.parse(usedFilter)
		}
		for(let index in this.usedFilter){
			this.$set(this.filterForm,this.usedFilter[index].prop,this.usedFilter[index].value)
		}
	},
	methods:{	
		handleFilter(){			
			this._usedFilterIsShow=true;
			this.usedFilter=[];
			this.filterList.forEach((item,index)=> {
				if(this.filterForm[item.prop] != ""){
					this.usedFilter.push(item)
				}
				this.filterForm[item.prop]=item.value
			});
			sessionStorage.setItem(this.sessionStorageFilterKey,JSON.stringify(this.usedFilter))
			this.$emit("do-filter",this.paramsFilter)
		},
		handleReset(justReset=false){
			for(let prop in this.filterForm){
				this.filterForm[prop]=""
			}
			this.usedFilterIsShow=false;
			this.filterList.forEach((item,index)=>{
				this.$set(item,'value',"")
			});
			if(!justReset){
				this.$emit("do-filter",this.paramsFilter)
			}
		},
		handleInput(index,val){			
			this.$set(this.filterList[index], 'value', val)
		},
	
	
	},
	render(h){
		return(
			<div class="data-filter">
				<div class={["filter-list",{showAll:this.showAll}]}>
					<form ref="filterForm">
						{weapon.arrayEach(this.filterList,(item,index)=>{
							switch(item.type){
								case "input":
									return(
										<div class="filter-item">
											<label>{item.label}</label>
                      						<el-input class="item-content"
												clearable={true}
												name={item.field}
												placeholder={item.placeholder}
												value={item.value}
												on-input={this.handleInput.bind(this,index)}>
											</el-input>
										</div>
									)
									break;
								default:
									break;
							}
						})}
					</form>
					<div class="btn-list">
					</div>
				</div>
				 <el-button type="primary" class="btn-doFilter" on-click={this.handleFilter}>查询</el-button>
			</div>
		)
	}
}
</script>

<style lang="scss">
</style>