<template>
  <div class="common-list-page">
      <page-template :position-path="positionPath" :toolTitle="true" >
          <data-list :tabOptions="tabOptions">
               <riskbase v-if="$route.params.state=='riskbase'"></riskbase>
               <businessdevelopment v-if="$route.params.state=='businessdevelopment'"></businessdevelopment>
               <riskwarning v-if="$route.params.state=='riskwarning'"></riskwarning>
               <industryanalysis v-if="$route.params.state=='industryanalysis'"></industryanalysis>
               <panoramic  v-if="$route.params.state=='panoramic'"></panoramic>
          </data-list>
      </page-template>

      
  </div> 
</template>

<script>
  import PageTemplate from '@/components/page-template'
  import DataList from '@/components/data-list/data-list'
  import riskbase from './riskbase.vue'
  import businessdevelopment from './businessdevelopment'

  import api from '@/api-authority'
  import moment from "moment"
  import riskwarning from './riskwarning.vue'
  import industryanalysis from './industryanalysis.vue'
  import panoramic from './panoramic.vue'


  export default {
    data () {
  
 
      return {  
     
             tabOptions: [
        { label: "风险底数分析", value: "riskbase", path: '/executivecar/riskbase'},
        { label: "业务发展趋势", value: "businessdevelopment", path: '/executivecar/businessdevelopment' },
        { label: "风险预警", value: "riskwarning", path: '/executivecar/riskwarning' },
        { label: "行业分析", value: "industryanalysis", path: '/executivecar/industryanalysis'},
        { label: "客户全景图", value: "panoramic", path: '/executivecar/panoramic'},
        
      ],
   
      showtab:'0',

        
            
            
      }

    },
    computed:{
        positionPath:function () {
            var str=''
              switch (this.$route.params.state) {
                  case 'riskbase':
                   str='风险底数分析'
                      break;
                 case 'businessdevelopment':
                   str='业务发展趋势'
                      break;
                 case 'riskwarning':
                   str='风险预警'
                      break;
                 case 'industryanalysis':
                   str='行业分析'
                      break;
                case 'panoramic':
                   str='企业全景图'
                      break;
  
              }
            return [{name: '高管驾驶舱'}, {name:str}]
              
          }
    },
    components: {
      'data-list': DataList,
      PageTemplate,
      riskbase,
      businessdevelopment,
      riskwarning,
      industryanalysis,
      panoramic
    },
    methods: {
        
    }
  }
</script>

<style lang="scss">
</style>