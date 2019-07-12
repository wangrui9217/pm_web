export function getTreenum(data, type, num) {
  var obj;
  if(Array.isArray(data)) {
    data.map(el=>{
      if(el[type] == num) {
          obj=el;
       }else{
         if(el.hasOwnProperty("children")){
           getTreenum(el.children, type, num);
         }

       }
    })
    return obj
  }

}
export   function recursion(
  obj,
  children = "children",
  convertor = defaultFn,
  parent
) {
  if (Array.isArray(obj)) {
    return obj.map(item => recursion(item, children, convertor));
  } else if (obj[children]) {
    obj[children] = obj[children].map(item =>
      recursion(item, children, convertor, obj)
    );
  }
  return convertor(obj, parent);
}

export   function getItem (obj, id, cfg = { id: "id", pid: "pid" })  {
  let res;
  recursion(obj, "children", item => {
    if (item[cfg.id] === id) {
      res = item;
    }
    return item;
  });
  return res;
}
export  function deleteItem (obj, delId, cfg = { id: "id", pid: "pid" }) {
  const item = getItem(obj, delId, cfg);
  if (item[cfg.pid]) {
    let parent = getItem(obj, item[cfg.pid], cfg);
    parent.children = parent.children.filter(
      item => item[cfg.id] !== delId
    );
  } else {
    obj.splice(obj.findIndex(t => t[cfg.id] === delId), 1);
  }
}
export function treedata(obj,fn){
  if (Array.isArray(obj)) {
     obj.map(item => fn(item));
  } else if (obj[children]) {
     obj[children].map(item =>
      fn(item)
    );
  }

}
export function addzero(obj){
  return obj<10?'0'+obj:obj
}
export function gettimer(obj){
  obj=new Date(obj);
  return obj.getFullYear()+'-'+addzero((obj.getMonth()+1))+'-'+addzero(obj.getDate())+' '+addzero(obj.getHours())+':'+addzero(obj.getMinutes())+':'+addzero(obj.getSeconds())

}
export function getparentid(arr,cid,id='id',parantId='parantId'){
        let obj={};
          arr.map(el=>obj[el[id]]=el);
          let arrid=[];
        while(obj[cid]){
            arrid.unshift(cid);
            cid=obj[cid][parantId]
        }
        return arrid
}
 // 深度拷贝函数
 export  function deepCopy(data) {
  var t = type(data),
      o, i, ni;
  if (t === 'array') {
      o = [];
  } else if (t === 'object') {
      o = {};
  } else {
      return data;
  }
  if (t === 'array') {
      for (i = 0, ni = data.length; i < ni; i++) {
          o.push(deepCopy(data[i]));
      }
      return o;
  } else if (t === 'object') {
      for (i in data) {
          o[i] = deepCopy(data[i]);
      }
      return o;
  }
}
export function type(obj) {
  var toString = Object.prototype.toString;
  var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
export function kxzero(num){
   num=+num||0;
  var rere=/(\d{1,3})(?=(\d{3})+($|\.))/g ;

	return num.toFixed(2).replace(rere, '$1,');//使用正则替换，每隔三个数加一个','

}
export function subtext(str){
  var str=str
  if(str&&str.length>20){
    str=str.substr(0,20)+'...'
  }
  return str


}
export function getDate(str){
  if(str){
    str=str.split(' ')[0]
  }
  return str
}