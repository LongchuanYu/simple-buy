// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        label: '首页',
        value: 'home',
        iconName: 'home-o',
        path: '/pages/home/index'
      },{
        label: '订单',
        value: 'order',
        iconName: 'orders-o',
        path: '/pages/order/index'
      },{
        label: '我的',
        value: 'user',
        iconName: 'user-o',
        path: '/pages/personalPage/index'
      }
    ],
    active: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e: any) {
      this.setData({ active: Number(e.detail) });
      wx.switchTab({
        url: this.data.list[Number(e.detail)].path,
      })
    }
  },
  ready() {
  }

})
