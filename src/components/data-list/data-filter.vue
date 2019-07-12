<!-- <template>
	<div class="data-filter">
				<div class="filter-list" v-if="showAll">
					<form ref="filterForm" action="javascript:;">
						<div v-for="(item,index) in filterList" :key="index" style="display: inline-block;">
						
										<div class="filter-item" v-if="item.type === 'input'">
											<div style="display: inline-block;">{{item.label}}</div>
                      <el-input class="item-content" :style="{width: item.width}"
												clearable
												:name="item.field"
												:placeholder="item.placeholder"
												:value="item.value"
												on-input="this.handleInput.bind(this,index)">
											</el-input>
										</div>
										<div class="filter-item" v-else-if="item.type === 'select'">
											<label>{{item.label}}</label>
											<el-select
												class="item-content"
												clearable
												on-input="this.handleInput.bind(this,index)"
												:name="item.field"
												:value="item.value"
												placeholder="请选择">
												<el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value" />
											</el-select>
										</div>
										<div class="filter-item" v-else-if="item.type === 'tree'">
											<label>{{item.label}}</label>
											<el-cascader
												:options="item.options"
												:show-all-levels=false
												:value="item.value"
												:props="item.props"
												on-input="this.handleCascaderSelect.bind(this,index)"
											></el-cascader>
										</div>
										<div class="filter-item datepad" v-else-if="item.type === 'date'">
											<label>{{item.label}}</label>
											<el-date-picker
												class="item-content"
												:editable = false
												type="date"
												on-input="this.handleDateInput.bind(this,index)"								
												:value="item.value"
												:picker-options="item.option||{}"
												placeholder="选择日期">
											</el-date-picker>
										</div>
					
										<div class="filter-item" v-else-if="item.type === 'year'">
											<label>{{item.label}}</label>
											<el-date-picker
												
												:editable = false
												type="year"
												on-input="this.handleYearInput.bind(this,index)"								
												:value="item.value"
												
												placeholder="选择年">
											</el-date-picker>
										</div>
									
										<div class="filter-item" v-else-if="item.type === 'daterange'">
											<label>{{item.label}}</label>
											<el-date-picker
												:editable = "false"
												:value="item.value"
												type="daterange"
												start-placeholder="开始日期"
												end-placeholder="结束日期"
												placeholder="选择日期范围"
												range-separator=" ~ "
												on-input="this.handleDateRangeInput.bind(this,index)"
											>
											</el-date-picker>
										</div>
									
										<div class="filter-item" v-else-if="item.type === 'datetimerange'">
											<label>{{item.label}}</label>
											<el-date-picker
												:editable = false
												:value="item.value"
												type="datetimerange"
												value-format="yyy-MM-dd HH:mm:ss"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												placeholder="选择时间范围"
												range-separator=" 至 "
												on-input="this.handleDateTimeRangeInput.bind(this,index)"
											>
											</el-date-picker>
										</div>
						</div>			
						<el-button v-if="!showButtons" type="primary" class="btn-doFilter" @click="handleFilter">查询</el-button>
					

					</form>
					<div class="btn-list">
					</div>
				</div>
				<div v-if="showButtons">
					<el-button type="primary" class="btn-doFilter" @click="this.handleFilter">查询</el-button>
					<el-button type="primary" class="btn-doFilter" @click="this.handleReset">重置</el-button>
				</div>		
			</div>
</template> -->

<script>
/* eslint-disable */
import * as weapon from '@/utils/weapon.js'
import '@/less/data-filter.less'
import moment from 'moment'
export default {
	name:'data-filter',
	data(){
		return {
      value6:"",
			showAll:true,
			usedFilter:[],
			date:"",
			filterForm:{},
			filterAnimateType:false,
			filtersIsShow:true,
			_usedFilterIsShow:false,
			emitAvailable:false,
			paramsFilter:{}//查询参数
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
		},
		state:{
			type:Number
		},
		showButtons: {
			type: Boolean,
			default: false
		},
		showResetButton: {
			type: Boolean,
			default: false
		}
	},
	watch:{
	  "$route":{
			handler(to, from){

				if(to.path!=from.path){
					
					this.handleReset(true)
				}
			},
		  deep:true
		},
		// filterList:{
		// 	handler(newData){
		// 		var filter={}
		// 		newData.forEach((item,index)=>{
		// 			if(item.value){
		// 				if(Array.isArray(item.field)){
		// 					item.field.forEach((key,index)=>{
		// 						filter[key]=item.value[index]
		// 					})
		// 				} else {
		// 					filter[item.field]=item.value
		// 				}
		// 			}
		// 		})
		// 		this.paramsFilter=filter
		// 		console.log("filterList change ", this.paramsFilter)
		// 		if(this.emitAvailable){
					
		// 			this.$emit("do-filter",this.paramsFilter)
		// 			this.emitAvailable=false
		// 		}
		// 	},
		// 	deep:true
		// }
	},
	computed:{
		filterList(){
			console.log(this.filters)
			// console.log(this.filters,3333)
		//	return 	_.cloneDeep(res.data.message) 
			// return	_.cloneDeep(this.filters) 
			let _list = []
			this.filters.forEach((item)=>{
				_list.push(
					Object.assign({
						value: ''
					}, item)
				)
				
			})
			return _list
		//	_.cloneDeep(this.filters) 
			// return	this.filters
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
		handleDateTimeRangeInput(index,arr){
			var dateFormate=[],tem='';
			// console.log("handleDateTimeRangeInput",arr);
			if(Array.isArray(arr)){
				arr.forEach((item)=>{
					if(item){
						tem=moment(item).format("YYYY-MM-DD HH:mm:ss")
						dateFormate.push(tem)
					} else {
						this.$set(this.filterList[index],'value',[])
					}
				})
				this.$set(this.filterList[index],'value',dateFormate)
			}
		},
		handleDateRangeInput(index,arr){
			var dateFormate=[],tem=''
			if(Array.isArray(arr)){
				arr.forEach((item)=>{
					if(item){
						tem=moment(item).format("YYYY-MM-DD")
						dateFormate.push(tem)
					}else{
						this.$set(this.filterList[index],'value',[])
					}
				})
				this.$set(this.filterList[index],'value',dateFormate)
			}
		},
		handleYearInput(index,val){
		 if(val){
				if(this.filterList[index].dateType == "year"){
					this.$set(this.filterList[index],'value',new Date(val).getFullYear())
				} else {
					var dateFormate=moment(val).format("YYYY");
					this.$set(this.filterList[index],'value',dateFormate)
				}
			} else {
				this.$set(this.filterList[index],'value','')
			}
		},
		handleDateInput(index,val){
			
			if(val){
				if(this.filterList[index].dateType == "month"){
					this.$set(this.filterList[index],'value',[new Date(val).getFullYear(), new Date(val).getMonth()+1]);
        } else {
					var dateFormate=moment(val).format("YYYY-MM-DD")
					this.$set(this.filterList[index],'value',dateFormate)
					
				}
			} else {
				this.$set(this.filterList[index],'value','')
			}
      				this.$forceUpdate()
		
		},		
		handleFilter(){	
			var filter={}
		
				this.filterList.forEach((item,index)=>{
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
			this._usedFilterIsShow=true;
			this.usedFilter=[];
			this.filterList.forEach((item,index)=> {
				if(this.filterForm[item.prop] != ""){
					this.usedFilter.push(item)
				}
				this.filterForm[item.prop]=item.value
			});
			sessionStorage.setItem(this.sessionStorageFilterKey,JSON.stringify(this.usedFilter))
		//	console.log(this.paramsFilter,888)
			this.$emit("do-filter",this.paramsFilter)
		},
		handleReset(justReset=false){
			for(let prop in this.filterForm){
				this.filterForm[prop]=""
			}
			this.usedFilterIsShow=false;
			this.filterList.forEach((item,index)=>{
				
				this.$set(item,'value',"")
			this.$forceUpdate()

			});
			if(!justReset){
				this.$emit("do-filter",this.paramsFilter)
			}
			//sessionStorage.setItem(this.sessionStorageFilterKey,JSON.stringify(this.usedFilter));
		},
		handleInput(index,val){	
			this.$set(this.filterList[index], 'value', val)
			this.$forceUpdate()
		},
		handleCascaderSelect(index,val){
			this.$set(this.filterList[index], 'value', val)
		},
		handleHidefilters(){
			this.filterAnimateType=false
		},
		animationEnd1(){
			this.filtersIsShow=this.filterAnimateType
		},
		handelFilterDel(index){
			this.emitAvailable=true;
			this.$set(this.filterList[index], 'value', "")
		}
	},
	render(h){
		return(
			<div class="data-filter">
				<div class={["filter-list",{showAll:this.showAll}]}>
					<form ref="filterForm" action="javascript:;">
						{weapon.arrayEach(this.filterList,(item,index)=>{
							switch(item.type){
								case "input":
									return(
										<div class="filter-item"><label>{item.label}</label>
                      						<el-input class="item-content" style={"width:"+item.width}
												clearable={true}
												name={item.field}
												placeholder={item.placeholder}
												value={item.value}
												on-input={this.handleInput.bind(this,index)}>
											</el-input>
										</div>
									)
									break;
								case "select":
									return(
										<div class="filter-item">
											<label>{item.label}</label>
											<el-select
												class="item-content"
												clearable={true}
												on-input={this.handleInput.bind(this,index)}
												name={item.field}
												value={item.value}
												key={item.value}
												placeholder="请选择">
												{item.options ? weapon.arrayEach(item.options,(option,index)=>{
													let label=null,value=null;
													if(_.isObject(option)){
														label = option.label
														value = option.value
													}else{
														label = option
														value = option
													}
													return(
														<el-option label={label} value={value} key={value} />
													)
												}):''}
											</el-select>
										</div>
									)
									break;
                				case "tree":
									return(
										<div class="filter-item">
											<label>{item.label}</label>
											<el-cascader
												options={item.options}
												show-all-levels={false}
												value={item.value}
												props={item.props}
												on-input={this.handleCascaderSelect.bind(this,index)}
											></el-cascader>
										</div>
									)
									break;
								case "date":
									return(
										<div class="filter-item datepad">
											<label>{item.label}</label>
											<el-date-picker
												class="item-content"
												editable = {false}
												type={item.dateType || "date"}
												on-input={this.handleDateInput.bind(this,index)}												
												value={item.value}
												picker-options={ item.option || {} }
												placeholder="选择日期">
											</el-date-picker>
										</div>
									)
									break;
								case "year":
									return(
										<div class="filter-item">
											<label>{item.label}</label>
											<el-date-picker
												editable = {false}
												value={item.value}
												type={item.dateType || "year"}
												on-input={this.handleYearInput.bind(this,index)}
												placeholder="选择年">
											</el-date-picker>
										</div>
									)
									break;
								case "daterange":
									return(
										<div class="filter-item">
											<label>{item.label}</label>
											<el-date-picker
												editable = {false}
												value={item.value}
												type="daterange"
												start-placeholder="开始日期"
												end-placeholder="结束日期"
												placeholder="选择日期范围"
												range-separator=" ~ "
												on-input={this.handleDateRangeInput.bind(this,index)}
											>
											</el-date-picker>
										</div>
									)
									break;
								case "datetimerange":
									return(
										<div class="filter-item">
											<label>{item.label}</label>
											<el-date-picker
												editable = {false}
												value={item.value}
												type="datetimerange"
												value-format="yyy-MM-dd HH:mm:ss"
												start-placeholder="开始时间"
												end-placeholder="结束时间"
												placeholder="选择时间范围"
												range-separator=" 至 "
												on-input={this.handleDateTimeRangeInput.bind(this,index)}
											>
											</el-date-picker>
										</div>
									)
									break;
								default:
									break;
							}
						})}
						<el-button style={"display:"+ (this.showButtons?"none":"block")} type="primary" class="btn-doFilter" on-click={this.handleFilter}>查询</el-button>
				

					</form>
					<div class="btn-list">
					</div>
				</div>
				<div style={"display:"+ (this.showButtons?"block":"none")}>
					<el-button type="primary" class="btn-doFilter" on-click={this.handleFilter}>查询</el-button>
					<el-button type="primary" class="btn-doFilter" on-click={this.handleReset}>重置</el-button>
				</div>		
			</div>
		)
	}
}
</script>

<style lang="scss">
.data-filter .filter-item.datepad{
	.el-date-editor{
		.el-input__inner{
			padding-left: 28px;
		}
		.el-input__icon{
			line-height: 34px;
		}
	}
}

</style>
