// pages/kdselect/kdselect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //快递单号
    expressnu:'',
    //查询结果
    expressInfo:'',
    status:'',
    //是否隐藏
    reply:true,
    steps: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
//查询快递
  btnClick:function(){
    var that=this;
    var content=[];
    //快递请求
    wx.request({
      url: 'https://api.jisuapi.com/express/query', //仅为示例，并非真实的接口地址
      data: {
        appkey: 'appkey',
        type: 'auto',
        number: that.data.expressnu
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.result)
        console.log( res.data.result.list.length)
        for (var i = 0; i <res.data.result.list.length; i++) {
          if (i == 0 && res.data.result.deliverystatus=='3')
          {
            var ss = {
              current: true,
              done: true,
              text: res.data.result.list[i].time,
              desc: res.data.result.list[i].status
            };
          }else{
            var ss = {
              current: false,
              done: false,
              text: res.data.result.list[i].time,
              desc: res.data.result.list[i].status
            };
          }

          content.push(ss)
        }
        console.log(content);
        that.status(res.data.result.deliverystatus);
        that.setData({
          expressInfo: res.data.result,
          steps:  content,
          reply:false
        });
       
      }
    })
  },
  status:function(i){
    switch(i){
      case '1':
        this.setData({
          status: '在途中 ',

        });
      break;
      case '2': 
        this.setData({
          status: '派件中  ',

        });
      break;
      case '3':
        this.setData({
          status: '已签收  ',

        });break;
      case '4':
        this.setData({
          status: '派送失败 ',

        });break;
    }
  },
  //快递单号赋值
  input: function (e) {
    this.setData({ expressnu: e.detail.value })
  },
})