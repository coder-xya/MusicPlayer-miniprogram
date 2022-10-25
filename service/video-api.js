import {request} from "./index"

// 获取topmv(全部MV)
 function getTopMVs(offset,limit=10){
    return request("/mv/all","GET",{offset,limit})
}   
//获取mv数据
function getMVsData(id){
    return request("/mv/detail","GET",{mvid:id})
    }
// 获取mv地址
function getMVsAddress(id){
    return request("/mv/url","GET",{id:id})
    }
// 相似MV 
function getMVsRelated(id){
    return request("/related/allvideo","GET",{id:id})
    }





export {getTopMVs,getMVsData,getMVsAddress,getMVsRelated}