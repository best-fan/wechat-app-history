// pages/other/other.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userinfor:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userinfor: app.globalData.userInfo,
    });
   
  console.log("我加载了")
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
    console.log("我出现了")
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
  //天气预报
  bindViewWeather:function(){
    // 跳转到详情页
    wx.navigateTo({
      url: '../weather/weather'
    });
    
  },
  //快递查询
  bindViewkdcx:function(){
    // 跳转到详情页
    wx.navigateTo({
      url: '../kdselect/kdselect'
    });

  },
  //微信热门文章
  bindViewwxwz:function(){

    // 跳转到详情页
    wx.navigateTo({
      url: '../wxarticle/wxarticle'
    });
  }
})