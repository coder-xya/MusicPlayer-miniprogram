
// 过滤数组中符合条件的项
function itemsInArray(array,condition){
 let groupid= array.filter(item => {
    return item.name===condition
  });
  return groupid
}




export {itemsInArray}