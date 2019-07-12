import arrayToTree from "array-to-tree";
export default {
  //导航节点树
  menuTree(state) {
    return arrayToTree(state.navigation, {
      parentProperty: "parantId",
      customID: "menuId"
    });
  },
  //部门节点树
  deptTree(state) {
    return weapon.paseToNodeTree(state.deptData, { id: 'deptId', pId: 'parantId' })
  },
  // 字典对照 obj
  dict(state) {
    var dict = {}
    state.dictList.forEach((item) => {
      dict[item.id] = item.value
    })
    return dict
  },
  // 协议类型select数组
  protocolTypeListSelect(state) {
    var arr = [{
        label: '全部',
        value: ''
    }]
    return arr.concat(state.protocolTypeList.map((item) => {
      return {
        label: item,
        value: item
      }
    }))
     arr
  }
}
