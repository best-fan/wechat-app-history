// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  weatherinfor:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getlocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  //获取位置信息
  getlocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        //天气请求
        wx.request({
          url: 'https://api.jisuapi.com/weather/query', //仅为示例，并非真实的接口地址
          data: {
            appkey: 'appkey',
            location: latitude+','+longitude
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data.result)
            that.setData({
              weatherinfor: res.data.result,
      
            })
          }
        })
      }
    })

  },
})