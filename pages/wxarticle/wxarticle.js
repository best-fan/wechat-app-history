const app = getApp();
// pages/wxarticle/wxarticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //微信文章
  list:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinfor(0);
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
//获取微信文章
 getinfor:function(startnum){
   var that=this;
   //网络请求
   wx.request({
     url: 'https://api.jisuapi.com/weixinarticle/get', //仅为示例，并非真实的接口地址
     data: {
       appkey: 'appkey',
       channelid:'0',
       start: startnum,
       num:'10',
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     success: function (res) {
       console.log(res.data.result)
       that.setData({
         list: res.data.result.list,
       })
       app.globalData.wxlist = res.data.result.list;
     }
   })
 },
 bindViewNewsList:function(e){

   var that = this;
   app.globalData.wztype = '1';
   // 跳转到详情页
   wx.navigateTo({
     url: '../content/content?index=' + e.currentTarget.dataset.index
   });
 }
})