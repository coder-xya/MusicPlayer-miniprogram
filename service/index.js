const BASE_URL = "http://localhost:3000";


   const request=(url,method,params={})=>{
        return new Promise((resolve,reject)=>{
         wx.request({
             url: BASE_URL+url,
             method:method,
             data:params,
             success(res){
                 resolve(res.data)
             },
             fail(error){
              reject(error)
             }
           })
        })
     }



export {request}
