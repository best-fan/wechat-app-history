//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
//index.js
Page({
  data: {
    //日历选择
    multiArray: [],
    //日历底标
    multiIndex: [0, 0],
    //历史数据
    datas: '',
    //月份
    months: [],
    //天数31
    days: [],
    //天数30
    day: [],
    //天数 28
    dday: [],
    //显示日历
    showtext: '',
    //天气数据
    weatherinfor: '',
    //展示天氣信息
    msgList: '',

  },
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function () {
    this.setData({
      showtext: util.formatTime()[0] + '月' + util.formatTime()[1] + '日',
    })
    //console.log(util.formatTime()[0])
    //console.log(util.formatTime()[1])
    //获取历史信息
    this.getinfor(util.formatTime()[0], util.formatTime()[1])
    //获取天气信息
    this.getweater();



  },
  onReady: function () {
    // //console.log(util.getnum(0));
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      months: this.data.months,
      days: this.data.days,
      day: this.data.day,
      dday: this.data.dday
    };
    data.months = util.getnum(0),
      data.days = util.getnum(1),
      data.day = util.getnum(2),
      data.dday = util.getnum(3),
      data.multiArray[0] = data.months;
    data.multiArray[1] = data.days;

    this.setData(data);

  },

  //提交日期
  bindMultiPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var month = e.detail.value[0] + 1
    var day = e.detail.value[1] + 1
    this.setData({
      multiIndex: e.detail.value,
      showtext: month + '月' + day + '日'
    })
    this.getinfor(month, day)
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 1000
    })
    //console.log(month + '月：' + day + '日');
  },
  //日期选择
  bindMultiPickerColumnChange: function (e) {
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0] + 1) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            data.multiArray[1] = this.data.days;
            break;
          case 2:
            data.multiArray[1] = this.data.dday;
            break;
          case 4:
          case 6:
          case 9:
            data.multiArray[1] = this.data.day;
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },

  //点击某个列表跳转，页面传参
  showDetail: function (e) {
    var that = this;
    // // 获取wxml元素绑定的index值
    // var index = e.currentTarget.dataset.index;
    // console.log(index);
    // // 取出objectId
    // var title = that.data.datas[index].content;
    app.globalData.wztype = '0';
    //console.log(title)
    ////console.log("1111111" + objectId);
    // 跳转到详情页
    wx.navigateTo ({
      url: '../content/content?index=' + e.currentTarget.dataset.index
    });
  },

  /**
   * 获取信息
   */
  getinfor: function (month, day) {
    var that = this;
    wx.request({
      url: 'https://api.jisuapi.com/todayhistory/query', //仅为示例，并非真实的接口地址
      data: {
        appkey: 'appkey',
        month: month,
        day: day
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.result)
        that.setData({
          datas: res.data.result
        })
        app.globalData.data = res.data.result;
      }
    })

  },

  getweater: function () {
    var that = this;
    //天气请求
    wx.request({
      url: 'https://api.jisuapi.com/weather/query', //仅为示例，并非真实的接口地址
      data: {
        appkey: 'appkey',
        city: '新乡'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.result)
        that.setData({
          weatherinfor: res.data.result,
          msgList: [
            { title: "新乡今日天气：" + res.data.result.weather + ',' + res.data.result.winddirect + ':' + res.data.result.windpower },
            { title: "最高温度:" + res.data.result.temphigh + "°C最低温度：" + res.data.result.templow + "°C平均温度：" + res.data.result.temp+"°C" },
            { title: "空调指数:" + res.data.result.index[0].ivalue + ";" },
            { title: res.data.result.index[0].detail },
            { title: "运动指数:" + res.data.result.index[1].ivalue + ";" },
            { title: res.data.result.index[1].detail },
            { title: "紫外线指数:" + res.data.result.index[2].ivalue + ";" },
            { title: res.data.result.index[2].detail },
            { title: "感冒指数:" + res.data.result.index[3].ivalue + ";" },
            { title: res.data.result.index[3].detail },
            { title: "洗车指数:" + res.data.result.index[4].ivalue + ";" },
            { title: res.data.result.index[4].detail },
            { title: "空气污染扩散指数:" + res.data.result.index[5].ivalue + ";" },
            { title: res.data.result.index[5].detail },
            { title: "穿衣指数:" + res.data.result.index[6].ivalue + ";" },
            { title: res.data.result.index[6].detail }]
        })
      }
    })
  }



})
