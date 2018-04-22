//app.js

const Bmob = require('utils/bmob.js');
Bmob.initialize("你的Application ID", "你的REST API Key");
App({
  onLaunch: function () {
    var that=this;
        // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.globalData.userInfo = userInfo
        console.log(userInfo)
      }
    })

  },
  globalData: {
    userInfo: null,
    //历史事件数据
    data:'',
    //微信文章数据
    wxlist:'',
//判断文章类型 0 历史 1 微信
    wztype:'',

  }
})