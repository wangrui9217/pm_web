
import moment from 'moment'

const datetoday=function(item){
     return moment(item).format("YYYY-MM-DD")=='Invalid date'?'无':moment(item).format("YYYY-MM-DD")
}

export default {
    datetoday
}
