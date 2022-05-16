// components/datetime-picker/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    timeType: {
      type: String,
      value: 'start'
    },
    startDatetime: Number,
    endDatetime: Number
  },

  observers: {
    'show': function(show: Boolean) {
      if (show) {
        let selectedDate = this.data.selectedDate
        let maxDatetime = new Date(2025, 1, 1).getTime()
        let minDatetime = new Date(2020, 1, 1).getTime()
        if (this.properties.timeType === 'start') {
          selectedDate = this.properties?.startDatetime || selectedDate
          maxDatetime = this.properties?.endDatetime || maxDatetime
        } else {
          selectedDate = this.properties?.endDatetime || selectedDate
          minDatetime = this.properties?.startDatetime || minDatetime
        }
        this.setData({
          selectedDate: selectedDate,
          maxDatetime: maxDatetime,
          minDatetime: minDatetime
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedDate: new Date().getTime(),
    maxDatetime: new Date(2025, 1, 1).getTime(),
    minDatetime: new Date(2020, 1, 1).getTime()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeTimePicker(data: Object = {}) {
      this.setData({show: false})
      this.triggerEvent('closed', data)
    },
    confirm() {
      this.closeTimePicker({selectedDate: this.data.selectedDate})
    },
    cancel() {
      this.closeTimePicker()
    },
    timeChanged(e: any) {
      this.setData({
        selectedDate: e.detail
      });
    }
  }
})
