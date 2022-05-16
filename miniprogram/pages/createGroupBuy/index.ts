// pages/createGroupBuy/index.ts
interface SkuList {
  name: string
  imgSrc: string
  price: number
  numbers: number
}
const SKU_TEMPLATE = {
  name: '',
  imgSrc: '',
  price: null,
  numbers: null
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      name: '无',
      address: '',
      latitude: null,
      longitude: null
    },
    buyTitle: '',
    buyDesc: '',
    skuList: [{...SKU_TEMPLATE}],
    timeOpened: false,
    timeType: 'start',
    startDatetime: new Date().getTime(),
    endDatetime: new Date(new Date().getTime()+2*24*3600*1000).getTime(),
    condition: {
      value: 0,
      type: 'price' // 'price' | 'numbers'
    }
  },

  buyTitleChanged(e: any): void {
    const title = e.detail
    this.setData({buyTitle: title})
  },

  buyDescChanged(e: any): void {
    const html = e.detail.html
    this.setData({buyDesc: html})
  },

  addSku(): void {
    const newSkuList = [...this.data.skuList]
    newSkuList.push({...SKU_TEMPLATE})
    this.setData({skuList: newSkuList})
  },

  moveSku(e: any): void {
    const {index, direction} = e.currentTarget.dataset
    const nextIndex = index + direction
    let newSkuList = [...this.data.skuList]
    newSkuList[index] = newSkuList.splice(nextIndex, 1, newSkuList[index])[0]
    this.setData({skuList: newSkuList})
  },
  deleteSku(e: any): void {
    const self = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success (res) {
        if (res.confirm) {
          const {index} = e.currentTarget.dataset
          let newSkuList = [...self.data.skuList]
          if (newSkuList.length <= 1) {
            newSkuList = [{...SKU_TEMPLATE}]
          } else {
            newSkuList.splice(index, 1)
          }
          self.setData({skuList: newSkuList})
        }
      }
    })
  },
  addSkuImg(e: any): void {
    const index = e.currentTarget.dataset.index
    const self = this
    const newSkuList = [...this.data.skuList]
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: function (res) {
        newSkuList[index].imgSrc = res.tempFiles[0].tempFilePath
        self.setData({skuList: newSkuList})
      }
    });
  },
  deleteSkuImg(e: any): void {
    const self = this
    wx.showModal({
      title: '提示',
      content: '确认删除商品图片？',
      success (res) {
        if (res.confirm) {
          const {index} = e.currentTarget.dataset
          let newSkuList = [...self.data.skuList]
          newSkuList[index].imgSrc = ''
          self.setData({skuList: newSkuList})
        }
      }
    })
  },
  previewSkuImg(e: any): void {
    const imgSrc = e.currentTarget.dataset.imgsrc
    console.log(e)
    const sources: any[] = [{
      url: imgSrc,
      type: 'image'
    }]
    wx.previewMedia({
      sources: sources,
      current: 0,
      url: imgSrc,
      showmenu: true
    })
  },
  skuChanged(e: any): void {
    let value = e.detail.value
    const {type, index} = e.currentTarget.dataset
    const newSkuList: any = [...this.data.skuList]
    if (type === 'numbers' || type === 'price') {
      value = value !== "" ? Number(value) : null
    }
    if (value !== newSkuList[index][type]) {
      newSkuList[index][type] = value
      this.setData({skuList: newSkuList})
    }
  },

  selectLocation(): void {
    const self = this
    wx.choosePoi({
      success(res: any) {
        self.setData({location: res})
      },
      fail(res: any) {
        console.log(res, '失败回调')
      }
    })
  },

  showTimePicker(e: any): void {
    const timeType = e.currentTarget.dataset.timetype
    this.setData({
      timeType: timeType,
      timeOpened: true
    })
  },

  timePickerClosed(e: any): void {
    const selectedDate = e.detail.selectedDate
    if (selectedDate) {
      const data = this.data.timeType === "start"
      ? {startDatetime: selectedDate}
      : {endDatetime: selectedDate}
      this.setData(data)
    }

  },

  conditionTypeChanged(e: any): void {
    const newCondition = {...this.data.condition}
    newCondition.type = e.detail
    this.setData({condition: newCondition})
  },

  conditionValueChanged(e: any): void {
    const newCondition = {...this.data.condition}
    newCondition.value = Number(e.detail)
    console.log(this.data.condition)
    this.setData({condition: newCondition})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})