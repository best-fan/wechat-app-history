// pages/content/content.js
const app = getApp();
var Bmob = require('../../utils/bmob.js');
var WxParse = require('../../wxParse/wxParse.js');
var Zan = require('../../dist/index');
Page(Object.assign({}, Zan.TopTips, {

  /**
   * 页面的初始数据
   */
  data: {
    //标题
    Title: '',
    //用户信息
    userinfor: '',
    //页面内容
   // content: '',
    //是否点击评论
    releaseFocus: false,
    //评论数量
    num: '',
    //输入的评论
    pl: '',
    //数据库评论列表
    plresult: ''
  },

  /**
   * 生命周期函数--监听页面加载+
   */
  onLoad: function (options) {

    var that = this;
    // 获取传参
    if (options != null) {
      if (app.globalData.wztype=='0'){
        var article = app.globalData.data[options.index].content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
         // content: app.globalData.data[options.index].content,
          userinfor: app.globalData.userInfo,
          Title: app.globalData.data[options.index].title,
        });
        wx.setNavigationBarTitle({
          title: app.globalData.data[options.index].title,
        })
      }else{
        console.log(app.globalData.wxlist)
        var article = app.globalData.wxlist[options.index].content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          //content: app.globalData.wxlist[options.index].content,
          userinfor: app.globalData.userInfo,
          Title: app.globalData.wxlist[options.index].title,
        });
        wx.setNavigationBarTitle({
          title: app.globalData.wxlist[options.index].title,
        })
      }
      
      //console.log('options不为空')
    } else {

      //console.log('options为空')
    }
  

    that.getcontent();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
* 点击回复
  **/
  bindReply: function (e) {
    this.setData({
      releaseFocus: true
    })
  },
  //获取评论内容
  getplnr: function (e) {
    this.setData({
      pl: e.detail.value
    })
  },
  // 点击发送
  bindsubmit: function () {

    ////console.log(this.data.pl)
    this.putcontent();
    this.getcontent();
  },

  //获取评论
  getcontent: function () {
    var that = this;
    var Diary = Bmob.Object.extend("comment");
    var query = new Bmob.Query(Diary);
    query.equalTo("title", that.data.Title);
    query.descending("createdAt");
    // 查询所有数据
    query.find({
      success: function (results) {
        //console.log("共查询到 " + results.length + " 条记录");
        that.setData({
          num: results.length,
          plresult: results,
        })

      },
      error: function (error) {
        //console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },
  //上传评论
  putcontent: function () {
    var that = this;
    if (that.data.pl.length == 0) {
      ////console.log('评论为空');
      that.showZanTopTips('评论不能为空，提交失败');
      that.setData({
        releaseFocus: false
      })

    } else {
      var Diary = Bmob.Object.extend("comment");
      var diary = new Diary();
      diary.set("title", that.data.Title);
      diary.set("content", that.data.pl);
      diary.set("nickname", that.data.userinfor.nickName);
      diary.set("side", that.data.userinfor.city);
      diary.set("imgsrc", that.data.userinfor.avatarUrl);
      //添加数据，第一个入口参数是null
      diary.save(null, {
        success: function (result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          //console.log("日记创建成功, objectId:" + result.id);
          that.showZanTopTips('评论提交成功');
        },
        error: function (result, error) {
          // 添加失败
          //console.log('创建日记失败');

        }
      });
      that.setData({
        releaseFocus: false,
        pl: '',
      })
    }

  }


  //})
}));