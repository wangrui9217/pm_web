export default {
        remark(rule, value, callback){
            if(value){
                if (value.replace(/\u4e00-\u9fa5/g,'**').length>300){               
                    callback(new Error('请输入300个以内的字符'));
                  }else{
                    callback();
                  } 
            }else {
                callback();
              }
          
        },
        isInteger(rule, value, callback){
        
          if (value == ''&&value!=0) {
            callback(new Error('请输入金额'));
          }else if(!/^\d+(\.\d+)?$/g.test(value)){
              callback(new Error('请输入自然数'));
          } else {
            callback();
          }
        
      },
 

        



}