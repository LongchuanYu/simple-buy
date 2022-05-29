const baseUrl = "http://localhost:8080/api"
const http = (options: any) =>{
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: options.header || {
        'content-type':'application/json'
      },
      success: resolve,
      fail: reject
    })
  })
}
export default http